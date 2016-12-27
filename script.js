$(function(){
//variables
  var mode = 0;//App mode
  var timeCounter = 0;//time counter
  var lapCounter = 0;//lap counter
  var action;//variable for setInterval
  var lapNumber = 0;//number of laps
  //minutes, seconds and centiseconds for time and lap
  var timeMinute, timeSecond, timeCentisecond, lapMinute, lapSecond, lapCentisecond;
  //on App load show show start and lap buttons
hideshowButtons("#startButton","#lapButton");

  //click on startButton
  $("#startButton").click(function(){
         //mode on
         mode = 1;
         //show stop and lap buttons
         hideshowButtons("#stopButton","#lapButton");
         //start counter
         startAction();
     });


     //click on stopButton
     $("#stopButton").click(function(){
         //show resume and reset buttons
     hideshowButtons("#resumeButton","#resetButton");
     //stop the counter
     clearInterval (action);
   });

   //click on resumeButton
   $("#resumeButton").click(function(){
       //show stop and lap buttons
   hideshowButtons("#stopButton","#lapButton");
   //start the counter
   startAction();
   });

//click on resetButton
$("#resetButton").click(function(){
  //reload the page
  location.reload();
});


//click on lapButton
$("#lapButton").click(function(){
  //if mode is ON
  if (mode){
    //stop action
    clearInterval(action);
    //resetLap and print lap details
    lapCounter = 0;
    addLap();
    //start action
    startAction();
  }
});
    //if mode is ON
      //stop action
      //resetLap and print lap details
      //start action

//functions

//function to hide all buttons and show 2 buttons
function hideshowButtons (x,y) {
  $(".controlButtons").hide();
  $(x).show();
  $(y).show();
}

//function to start the counter
function startAction (){
  action = setInterval (function(){
    timeCounter++;
    if (timeCounter == 100*60*100) {
      timeCounter = 0;
    }
    lapCounter++;
    if (lapCounter == 100*60*100){
      lapCounter = 0;
    }
    updateTime();
  },10);
}

//updateTime: convert counters to minutes, seconds and sentiseconds
function updateTime (){
  //1min=60*100centiseconds=6000centiseconds
  timeMinute = Math.floor(timeCounter/6000);
          //1sec=100centiseconds
  timeSecond = Math.floor((timeCounter%6000)/100);
  timeCentisecond = (timeCounter%6000)%100;
  $("#timeMinute").text(format(timeMinute));
  $("#timeSecond").text(format(timeSecond));
  $("#timeCentisecond").text(format(timeCentisecond));

  //1min = 60*100centiseconds=6000centiseconds
  lapMinute = Math.floor(lapCounter/6000);
  //1sec = 100 sentiseconds
  lapSecond = Math.floor((lapCounter%6000)/100);
  lapCentisecond = (lapCounter%6000)%100;
  $("#laptimeMinute").text(format(lapMinute));
  $("#lapSecond").text(format(lapSecond));
  $("#lapCentisecond").text(format(lapCentisecond));

}

//format nunbers
function format(number){
  if(number < 10){
    return "0" +number;
  }else{
    return number;
  }
}

//print lap details

function addLap () {
  lapNumber++;
    var myLapDetails =
    "<div class='lap'>" +
        "<div class='laptimeTitle'>" +
          "Lap " + lapNumber +
        "</div>" +
        "<div class='lapTime'>" +
            "<span>" + format(lapMinute) + "<span>" +
            ":<span>" + format(lapSecond) + "<span>" +
            ":<span>" + format(lapCentisecond) + "<span>"
        "</div>"
    "</div>";
  $(myLapDetails).prependTo("#laps");
}


});
