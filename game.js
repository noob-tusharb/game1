var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickPattern=[];
var Level=0;
var check=true;
$(document).keypress(function()
{
while(check){
  $("h1").text("level is "+Level);
    nextsequence();
    check=false;
  }
});
$(".btn").click(function()
{
var userChosenColour= $(this).attr("id");
userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickPattern.length-1);
});
function checkAnswer(currentLevel)
{
  if(userClickPattern[currentLevel]==gamePattern[currentLevel])
  {
    console.log("success");
    if (userClickPattern.length === gamePattern.length){
      setTimeout(function () {
        nextsequence();
      }, 1000);
    }
  }
  else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function()
  {
    $("body").removeClass("game-over");
  },1000);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}
function nextsequence()
{
  userClickPattern=[];
    Level++;
    $("#level-title").text("Level " + Level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  //to choose a random color and add animation
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //to save the order of color
  gamePattern.push(randomChosenColour);
playSound(randomChosenColour);
}
function playSound(name)
{
  // alert("name");
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour)
{
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
              $("#" + currentColour).removeClass('pressed');

      }, 100);
}
function startOver()
{
  Level=0;
  gamePattern=[];
  check=true;
}
