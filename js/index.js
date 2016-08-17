/****************************************************************************************************************************/

/*
Admittedly, this code is incredibly sloppy. There are far too many global variables that could be easily localized. For 
example, setSession() and setBreak() should probably take onSession as a parameter, since setSession() shouldonly be used 
when onSession == true and setBreak() when onSession == false. 

Also, using an alert() when the timer goes off isn't the best form, since pop-ups are typically annoying and can be disabled.

This project was rushed in order to complete the FCC Front-End course as fast as possible. 
*/

// Initialize global variables

var sessionLength = 25;
var breakLength = 5;
var mins = 25;
var secs = 0;
var onSession = true; // determines whether the session timer or break timer is enabled
var timerRunning = false;
var countdown; // for use with setInterval()

// Initialize colors (should match colors in SCSS)

var bodyColor = "#ECECEC";
var accentColor = "#337AB7";

// Helper functions 

function resetTimer() {
  mins = onSession ? sessionLength : breakLength;
  if (timerRunning) mins--; 
  secs = 0;
  clearInterval(countdown);
  document.getElementById("timerMin").innerHTML = mins < 10 ? "0" + mins : mins.toString();
  document.getElementById("timerSec").innerHTML = "00";
}

function setSession() { // change from break to session
  // enable session button
  document.getElementById("sessionButton").style.backgroundColor = accentColor;
  document.getElementById("sessionButton").style.color = bodyColor;
  // disable break button
  document.getElementById("breakButton").style.backgroundColor = bodyColor;
  document.getElementById("breakButton").style.color = accentColor;
  // reset timer 
  resetTimer();
}

function setBreak() { // change from session to break
  // enable break button
  document.getElementById("breakButton").style.backgroundColor = accentColor;
  document.getElementById("breakButton").style.color = bodyColor;
  // disable session button
  document.getElementById("sessionButton").style.backgroundColor = bodyColor;
  document.getElementById("sessionButton").style.color = accentColor;
  // reset timer 
  resetTimer();
}

function playOrPause() {
  if (timerRunning) {
    document.getElementById("playPause").innerHTML = "<i class=\"fa fa-pause\"></i>";
    countdown = setInterval(function() {
      secs--;
      if (secs < 0) {
        mins--;
        if (mins < 0) { // timer goes off
          onSession = !onSession; // change timer from session to break, or vice versa
          if (onSession) {
            alert("Time to work for " + sessionLength + " minutes!"); 
            setSession(); // runs resetTimer()
          }
          else {
            alert("Break time! Relax for " + breakLength + " minutes."); 
            setBreak(); // runs resetTimer()
          }
          playOrPause(); // rerun this function with new timer 
        }
        document.getElementById("timerMin").innerHTML = mins < 10 ? "0" + mins : mins.toString();
        secs = 59;
      }
      document.getElementById("timerSec").innerHTML = secs < 10 ? "0" + secs : secs.toString();
    }, 1000);
  } else {
    document.getElementById("playPause").innerHTML = "<i class=\"fa fa-play\"></i>";
    clearInterval(countdown);
  }
}

// Choose session or break timer 

document.getElementById("sessionButton").onclick = function() {
  if (timerRunning) return;
  onSession = true;
  setSession();
}

document.getElementById("breakButton").onclick = function() {
  if (timerRunning) return;
  onSession = false;
  setBreak();
}

// Change sessions & break lengths

document.getElementById("sessionDec").onclick = function() {
  if (sessionLength == 1 || timerRunning) return;
  sessionLength--;
  document.getElementById("sessionTime").innerHTML = sessionLength < 10 ? "0" + sessionLength : sessionLength.toString();
  resetTimer();
}

document.getElementById("sessionInc").onclick = function() {
  if (sessionLength == 99 || timerRunning) return;
  sessionLength++;
  document.getElementById("sessionTime").innerHTML = sessionLength < 10 ? "0" + sessionLength : sessionLength.toString();
  resetTimer();
}

document.getElementById("breakDec").onclick = function() {
  if (breakLength == 1 || timerRunning) return;
  breakLength--;
  document.getElementById("breakTime").innerHTML = breakLength < 10 ? "0" + breakLength : breakLength.toString();
  resetTimer();
}

document.getElementById("breakInc").onclick = function() {
  if (breakLength == 99 || timerRunning) return;
  breakLength++;
  document.getElementById("breakTime").innerHTML = breakLength < 10 ? "0" + breakLength : breakLength.toString();
  resetTimer();
}

// Manipulate timer

document.getElementById("playPause").onclick = function() {
  timerRunning = !timerRunning; // toggle timerRunning as true or false
  playOrPause(); 
}

document.getElementById("reset").onclick = function() {
  document.getElementById("playPause").innerHTML = "<i class=\"fa fa-play\"></i>";
  timerRunning = false;
  resetTimer();
}