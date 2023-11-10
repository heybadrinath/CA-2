const number = [];
// generating the random number on page loading
window.onload = function () {
    generateNumber();
};

// Function to generating the random mobile number
function generateNumber() {
    for (let i = 0; i < 10; i++) {
        const digit = Math.floor(Math.random() * 10);
        number.push(digit);
    }

    console.log("number:", number);
    createClues();
}

// creating clues for displaying in the game.
function createClues() {
    const sumOfOdd = number[0] + number[2] + number[4] + number[6] + number[8];
    const sumOfEven = number[1] + number[3] + number[5] + number[7] + number[9];
    const sumOfFirstFive = number[0] + number[1] + number[2] + number[3] + number[4];
    const sumOfLastFive = number[5] + number[6] + number[7] + number[8] + number[9];
// Adding them all to a array for getting a random one out of the clues
    const clues = [
        `Sum of The Even Digits Of The Number is ${sumOfEven}`,
        `Sum Of The First Five Digits Of The Number is ${sumOfFirstFive}`,
        `Sum Of The Last Five Digits Of The Number is ${sumOfLastFive}`,
        `Sum Of The Odd Digits Of The Number is ${sumOfOdd}`
    ];

    printrandomClues(clues);
}

// function to make one clue appear on the web page on random 
function printrandomClues(list) {
    const clueBox = document.getElementById("clueInput");
    const index = Math.floor(Math.random() * 4);
    clueBox.innerHTML = list[index]; 
}


let currentDigitIndex = 0; //current digit number that you have to find

document.getElementById("checkButton").addEventListener('click', checkIndex);

let tries = 3;
const triesBox = document.getElementById("triesLeft")
const liveClueBox = document.getElementById("liveClues")

// Buzzer Sounds for correct guess and wrong guess
const correctAnswerSound = document.getElementById("correctAnswerSound");
const wrongAnswerSound = document.getElementById("wrongAnswerSound");


function checkIndex() {

    const inputValue = document.getElementById("digitInput").value;

    // adding the phone number to the local storage for using in lose page 
    const PhoneNumber = number.join("")
    localStorage.setItem("PhoneNumber", PhoneNumber)

// if the user is on the last try then checking if he entered the correct digit or not and going to lose..html
    if (tries == 0) {

        if (inputValue === number[currentDigitIndex].toString()) {

            const numberBoxes = document.querySelectorAll(".digitEntry");
            numberBoxes[currentDigitIndex].innerHTML = inputValue;
            currentDigitIndex++;
            tries = 3;
            triesBox.textContent = tries;
            liveClueBox.textContent = "You Have Guessed The Correct Digit";
            correctAnswerSound.play()           //playing the correct answer sound for correct guess
            liveImageCaption("good");
            resetTimer()

        } else {
            // storing the number of tries and current digit number for further use in lose.html and going to lose.html
            localStorage.setItem("index", currentDigitIndex);
            localStorage.setItem("tries", tries);
            window.location.href = "./lose.html";
        }

    // if user has still tries left and not all the digits are guessed
    } else if(tries>=0 && currentDigitIndex <=9 ){
        
        // checking if the audio for correct guess is still playing or not if playing then reseting it bacause then may overlap
        if (!correctAnswerSound.paused) {

            correctAnswerSound.pause();
            correctAnswerSound.currentTime = 0;

        }
        // checking if the audio for wrong guess is still playing or not if playing then reseting it bacause then may overlap
        if (!wrongAnswerSound.paused) {

            wrongAnswerSound.pause();
            wrongAnswerSound.currentTime = 0;

        }
        // checking if the user entered digit is the correct digit or not
        if (inputValue === number[currentDigitIndex].toString()) {

            const numberBoxes = document.querySelectorAll(".digitEntry");
            numberBoxes[currentDigitIndex].innerHTML = inputValue;
            currentDigitIndex++;
            tries = 3
            triesBox.textContent = tries
            correctAnswerSound.play()           //playing the corrrect guess sound if guess is correct
            liveClueBox.textContent = "You Have Guessed The Correct Digit"
            liveImageCaption("good")
            timerAudio.pause()              //pausing the timer audio and reseting it back to play it again for the next digit
            timerAudio.currentTime = 0
            resetTimer()

            // if all the digits are guessed then go to win.html 
            if(currentDigitIndex==10){

                window.location.href = "./win.html"

            }
            
            // if the guessed digit is incorrect then reduce tries and change the live clue 
        } else {
            tries--;
            triesBox.textContent = tries
            liveClue(number[currentDigitIndex], inputValue)
            wrongAnswerSound.play()         //playing the wrong answer sound for wrong guesses
        }
    }
}

// generating a live clue for every guess the user does
function liveClue(correctDigit,enteredDigit) {

    if(correctDigit>enteredDigit) {
        liveClueBox.textContent= "The Correct Digit Is Greater Than The Entered Digit"
    }else{
        liveClueBox.textContent="The Correct Digit Is Less Than The Entered Digit"
    }
    liveImageCaption("bad")


}

// taking the image captions seperately for correct and wrong guessses.
const imagesGood = ["./assets/congrats.png",
                    "./assets/sweet.png",
                    "./assets/you-did-it.png"]

const imagesBad = ["./assets/no.png",
                    "./assets/nope.png",
                    "./assets/oops.png"]


const liveImages = document.getElementById("liveImages")


// function that will play a different image captions based on the result of the guess
function liveImageCaption(answer) {
    const indexForImages = Math.floor(Math.random()*3)
    if(answer == "good") {
        liveImages.innerHTML = `<img src="${imagesGood[indexForImages]}" alt="imageCaptions">`
    }else{
        liveImages.innerHTML = `<img src="${imagesBad[indexForImages]}" alt="imageCaptions">`
    
    }
}


let timerValue = 15;
let timerInterval;
const timerAudio = new Audio("./assets/ticking-clock_1-27477.mp3")
timerAudio.volume = 0.5

// function to start the timer and starting the timer audio as well
function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
    timerAudio.play()
}

// function to update the time value in the web page
function updateTimer() {
    timerValue--;
    document.getElementById("timer").textContent = timerValue;

    // if timer runs out going to lose.html
    if (timerValue <= 0) {
        clearInterval(timerInterval);
        window.location.href = "./lose.html";
    }
    localStorage.setItem("tries", tries);
    localStorage.setItem("index", currentDigitIndex);
}


// function to reset timer every time a corrrect digit is guessed
function resetTimer() {
    clearInterval(timerInterval);
    timerValue = 15;
    document.getElementById("timer").textContent = timerValue;
    timerAudio.play()
    startTimer();
}


startTimer()
