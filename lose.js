document.getElementById("startButton").addEventListener(('click'), ()=>{
    window.location.href = "./index.html"
})

const tries = localStorage.getItem("tries")
const index = localStorage.getItem("index")
const name = localStorage.getItem("userName")
const power = 10 - parseInt(index)
const probability  = Math.pow(10, power)

const triesBox = document.getElementById("tries")
const possibilities = document.getElementById("possibilities")

if(tries != 0) {
    triesBox.textContent = `You Should Have Guessed Something ${name},You Still Had ${tries} tries Left`
}
possibilities.textContent = probability

const Laughing = new Audio("./assets/cartoon-laughs-146627.mp3")
Laughing.play()
Laughing.loop = true