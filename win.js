document.getElementById("startButton").addEventListener(('click'), ()=>{
    window.location.href = "./index.html"
})

const PhoneNumber = localStorage.getItem("PhoneNumber")
const phoneNumberData = document.getElementById("phoneNumber")
const userName = localStorage.getItem("userName")
phoneNumberData.textContent = `Give the Number a try ${userName} - (${PhoneNumber})`
let cheering = new Audio("./assets/crowd-cheer-ii-6263.mp3")
cheering.play()
cheering.loop = true