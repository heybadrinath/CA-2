
document.getElementById("startButton").addEventListener(('click'),()=>{
    localStorage.clear()
    const user = document.getElementById("userName").value
    localStorage.setItem("userName",user)

    window.location.href = "./story.html"
})