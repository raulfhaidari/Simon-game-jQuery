let buttonColors =  ["red", "blue", "green", "yellow"];
gamePettern = [];
userClickedPattern = [];
let level = 0;
let started = false;

$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", function() {

    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] == gamePettern[currentLevel]) {
        if (userClickedPattern.length === gamePettern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
        } else {
            playSound("wrong")
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over")
            }, 100);

            $("#level-title").text("Game over! Press Any Key to Restart.");
            startOver()
        }
        
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level)

    let randomNumber = Math.floor(Math.random() * 4);
    randomChosenColors = buttonColors[randomNumber];

    gamePettern.push(randomChosenColors);
    $("#" + randomChosenColors).fadeOut(100).fadeIn(100);

    playSound(randomChosenColors);
    animatePress(randomChosenColors);
} 

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function startOver() {
    level = 0;
    gamePettern = [];
    started = false;
}