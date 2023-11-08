document.getElementById("startButton").addEventListener(('click'), ()=>{
    window.location.href = "./rules.html"
})

const music = new Audio("./assets/comic5-25269.mp3")
music.play();
music.loop = true