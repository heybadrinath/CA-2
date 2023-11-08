const number = [];

window.onload = function () {
    generateNumber();
};

function generateNumber() {
    for (let i = 0; i < 10; i++) {
        const digit = Math.floor(Math.random() * 10);
        number.push(digit);
    }

    console.log("number:", number);
    createClues();
}

function createClues() {
    const sumOfOdd = number[0] + number[2] + number[4] + number[6] + number[8];
    const sumOfEven = number[1] + number[3] + number[5] + number[7] + number[9];
    const sumOfFirstFive = number[0] + number[1] + number[2] + number[3] + number[4];
    const sumOfLastFive = number[5] + number[6] + number[7] + number[8] + number[9];

    const clues = [
        `Sum of The Even Digits Of The Number is ${sumOfEven}`,
        `Sum Of The First Five Digits Of The Number is ${sumOfFirstFive}`,
        `Sum Of The Last Five Digits Of The Number is ${sumOfLastFive}`,
        `Sum Of The Odd Digits Of The Number is ${sumOfOdd}`
    ];

    printrandomClues(clues);
}

function printrandomClues(list) {
    const clueBox = document.getElementById("clueInput");
    const index = Math.floor(Math.random() * 4);
    clueBox.innerHTML = list[index]; 
}

let currentDigitIndex = 0;

document.getElementById("checkButton").addEventListener('click', checkIndex);

let tries = 3;
const triesBox = document.getElementById("triesLeft")
const liveClueBox = document.getElementById("liveClues")


const correctAnswerSound = document.getElementById("correctAnswerSound");
const wrongAnswerSound = document.getElementById("wrongAnswerSound");


function checkIndex() {
    const inputValue = document.getElementById("digitInput").value;
    const PhoneNumber = number.join("")
    localStorage.setItem("PhoneNumber", PhoneNumber)
    if (currentDigitIndex >= 9) {

        window.location.href = "./win.html";
    } else if (tries == 0) {
        if (inputValue === number[currentDigitIndex].toString()) {
            const numberBoxes = document.querySelectorAll(".digitEntry");
            numberBoxes[currentDigitIndex].innerHTML = inputValue;
            currentDigitIndex++;
            tries = 3;
            triesBox.textContent = tries;
            liveClueBox.textContent = "You Have Guessed The Correct Digit";
            liveImageCaption("good");
            resetTimer()
        } else {
            localStorage.setItem("index", currentDigitIndex);
            localStorage.setItem("tries", tries);
            window.location.href = "./lose.html";
        }
    } else if(tries>0 && currentDigitIndex <9 ){
        
        if (!correctAnswerSound.paused) {
            correctAnswerSound.pause();
            correctAnswerSound.currentTime = 0;
        }
        if (!wrongAnswerSound.paused) {
            wrongAnswerSound.pause();
            wrongAnswerSound.currentTime = 0;
        }
        if (inputValue === number[currentDigitIndex].toString()) {
            const numberBoxes = document.querySelectorAll(".digitEntry");
            numberBoxes[currentDigitIndex].innerHTML = inputValue;
            currentDigitIndex++;
            tries = 3
            triesBox.textContent = tries
            correctAnswerSound.play()
            liveClueBox.textContent = "You Have Guessed The Correct Digit"
            liveImageCaption("good")
            timerAudio.pause()
            timerAudio.currentTime = 0
            resetTimer()

            
        } else {
            tries--;
            triesBox.textContent = tries
            liveClue(number[currentDigitIndex], inputValue)
            wrongAnswerSound.play()
        }
    }
}


function liveClue(correctDigit,enteredDigit) {

    if(correctDigit>enteredDigit) {
        liveClueBox.textContent= "The Correct Digit Is Greater Than The Entered Digit"
    }else{
        liveClueBox.textContent="The Correct Digit Is Less Than The Entered Digit"
    }
    liveImageCaption("bad")


}


const imagesGood = ["./assets/congrats.png",
                    "./assets/sweet.png",
                    "./assets/you-did-it.png"]

const imagesBad = ["./assets/no.png",
                    "./assets/nope.png",
                    "./assets/oops.png"]


const liveImages = document.getElementById("liveImages")
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


function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
    timerAudio.play()
}

function updateTimer() {
    timerValue--;
    document.getElementById("timer").textContent = timerValue;

    if (timerValue <= 0) {
        clearInterval(timerInterval);
        window.location.href = "./lose.html";
    }
    localStorage.setItem("tries", tries);
    localStorage.setItem("index", currentDigitIndex);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerValue = 15;
    document.getElementById("timer").textContent = timerValue;
    timerAudio.play()
    startTimer();
}


startTimer()
