process.on("message", function (msg) {
  console.log(msg);
  var dummy_data = { Temp: 24.7048950195, Humi: 39.2150878906 }
  setTimeout(function() {
    process.send(dummy_data);
  }, 1000);
});
