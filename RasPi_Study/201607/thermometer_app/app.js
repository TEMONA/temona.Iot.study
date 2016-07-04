var express = require('express');
var qrcode = require('qrcode-terminal');
var child_process = require('child_process');
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();


var app = express();
var port = 3031


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));//public配下は静的ファイルとして提供


var server = require('http').createServer(app)
var io = require('socket.io').listen(server);

server.listen(process.env.PORT||port)//動的ポート対応

var ngrok = require('ngrok');
var server_url = 'localhost:'+port
ngrok.connect({
	proto: 'http', // http|tcp|tls
	addr: port, // port or network address
	//auth: 'user:pwd', // http basic authentication for tunnel
	//subdomain: ngrok_domain, // only paid plan can use this
	//authtoken: '12345', // your authtoken from ngrok.com
	//region: 'us' // one of ngrok regions (us, eu, au, ap), defaults to us
}, function (err, url) {
  if (err) {
    console.error(err);
  }else {
    console.log("Temporary Internet Connection On :");
    console.log(url);

    qrcode.generate(url);
    server_url = url
  }
});

var hdc1000 = child_process.fork(__dirname+"/hdc1000/hdc1000.js");

setInterval(function () {
  hdc1000.send("requireData")
}, 2000);

hdc1000.on("message",function (res) {
  //console.log(res);
  try {
    io.sockets.emit('hdc1000',res)
    //data_list.push(res)
  } catch (e) {}
  //event.emit('hdc1000',res)
  //socket.emit('hdc1000',res);
})
/*
var data_list = []
var average_data_list = []
setInterval(function () {
  var temp_Temp = 0
  var temp_Humi = 0
  for (var i = 0; i < data_list.length; i++) {
    temp_Temp += data_list[i].Temp
    temp_Humi += data_list[i].Humi
  }
  temp_Temp = temp_Temp/data_list.length
  temp_Humi = temp_Humi/data_list.length
  console.log("Temp : "+temp_Temp);
  console.log("Humi : "+temp_Humi);
  average_data_list.push({
    Temp : temp_Temp,
    Humi : temp_Humi,
    Time : Date.now()
  })
  data_list = []
}, 20000);
*/

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Express Sample',
    server_url: server_url
 });
});

io.sockets.on('connection', function (socket) {
  //console.log(socket.request.connection);
  //var hdc1000 = child_process.fork(__dirname+"/hdc1000/hdc1000.js");
  console.log("connection on "+socket.request.connection.remoteAddress);
  //var eventlistener = event.on('hdc1000',function (res) {
  //  console.log("aaa");
  //  console.log(res);
  //  socket.emit('hdc1000',res);
  //})
  socket.on('other event', function (data) {
    console.log(data);
  });
  socket.on('disconnect',function() {
    console.log('User disconnected');
    //event.removeListener(eventlistener)
    //eventlistener = ""
  });
});
