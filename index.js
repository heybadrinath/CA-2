
document.getElementById("startButton").addEventListener(('click'),()=>{
    localStorage.clear()
    const user = document.getElementById("userName").value
    localStorage.setItem("userName",user)

    window.location.href = "./story.html"
})

const music = new Audio("./assets/comic5-25269.mp3")
music.play();
music.loop = true