document.getElementById("startButton").addEventListener(('click'), ()=>{
    window.location.href = "./index.html"
})

const tries = localStorage.getItem("tries")
const index = localStorage.getItem("index")

const power = 10 - parseInt(index)
const probability  = Math.pow(10, power)

const triesBox = document.getElementById("tries")
const possibilities = document.getElementById("possibilities")

if(tries != 0) {
    triesBox.textContent = `You Should Have Guessed You Still Had ${tries} Left`
}
possibilities.textContent = probability