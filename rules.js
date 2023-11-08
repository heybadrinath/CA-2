document.getElementById("iDont").addEventListener(('click'),() => {
    window.location.href = "./index.html"
})

document.getElementById("ido").addEventListener(('click'), ()=>{
    window.location.href = "./game.html"
})
const music = new Audio("./assets/comic5-25269.mp3")
music.play();
music.loop = true