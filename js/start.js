let main = document.querySelector(".main");

if(localStorage.getItem(app_name + "level")) {
    let level = Number(localStorage.getItem(app_name + "level"));
    if (level != 1){
        let startButtonRestart = document.createElement("button");
        startButtonRestart.className = "start-button restart";
        startButtonRestart.innerHTML = "Start from Level " + level;
        main.appendChild(startButtonRestart);
        startButtonRestart.addEventListener("click", () => {
            window.location.href = 'game.html';
        })
    }
}else {
    localStorage.setItem(app_name + "level", 1);
}

let startButton = document.querySelector(".start-button");
startButton.addEventListener("click", () => {
    localStorage.setItem(app_name + "level", 1);
    window.location.href = 'game.html';
});

if(localStorage.getItem(app_name + "hiscore")) {
    let hiscore = document.createElement("p");
    hiscore.className = "hiscore";
    hiscore.innerHTML = "HI-SCORE: " + localStorage.getItem(app_name + "hiscore");
    main.appendChild(hiscore);
}
