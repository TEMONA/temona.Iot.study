const child = require('child_process');

// sudo raspi-config (GUI)
// sudo nano /boot/config.txt => dtparam=i2c_arm=on
// sudo apt-get install python-smbus

var hdc1000 = child.spawn( 'python',['-u',__dirname+"/read_temp_hum.py"],{stdio:[ 'pipe',null,null, 'pipe' ]});
hdc1000.stdout.setEncoding('utf8');

process.stdin.on('data',function (data) {
	// body...
  data = data.toString().replace(/[\n\r]/g,"")
	hdc1000.stdin.write(data+"\n")
})

process.on("message", function (msg) {
  //console.log(msg);
  //var dummy_data = { Temp: 24.7048950195, Humi: 39.2150878906 }
  //setTimeout(function() {
  hdc1000.stdin.write(msg+"\n")
    //process.send(dummy_data);
  //}, 1000);
});

hdc1000.stdout.on('data', function (data) {
  data = data.toString().replace(/[\n\r]/g,"")
  //console.log('stdout: ' + data);
  try {
    data = JSON.parse(data)
    process.send(data);
  } catch (e) {

  }
  //console.log(data);
  //console.log(my_round(data.Temp,2));
});
hdc1000.stderr.on('data', function (data) {
  data = data.toString().replace(/[\n\r]/g,"")
  console.log('stderr: ' + data);
});

hdc1000.on('close', function (code) {
  data = data.toString().replace(/[\n\r]/g,"")
  console.log('Exited! '+code);
});

function my_round(num,exp) {
  exp = Math.pow(10,exp)
  //console.log((Math.round(num*exp)/exp));
  data = Math.round(num*exp)/exp
  return data
}
