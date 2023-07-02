clearSound = document.querySelector("#clearSound");
tickSound = document.querySelector("#tickSound");
gameoverSound = document.querySelector("#gameoverSound");
mainSound = document.querySelector("#mainSound");

const startGame = () => {

    
    popup.style.display = "none";
    mainSound.play();
    mainSound.loop = true;
    
    // 制限時間
    let time = 15;

    let mathDisplay = document.querySelectorAll(".math-display");
    let answerDisplays = document.querySelector(".answer-displays");

    // 問題作り
    let layer_num_sub = level - Math.pow(layer_num, 2);
    let problem_num = Math.min(3 + layer_num_sub, 111);
    let problems = [];
    let problems_interval = 3 * 2*layer_num + 5*layer_num - layer_num_sub*3;
    for (let i=0; i<layer_num; i++) {
        let problem = [];
        for (let j=0; j<problem_num; j++) {
            let rand_num = Math.trunc(Math.random() * 9 + 1);
            problem.push(rand_num);
        }
        problems.push(problem);
    }

    // 答えを算出
    let correct_answer = [];
    for (let i=0; i<layer_num; i++) {
        let problem_cor = 0;
        for (let j=0; j<problem_num; j++) {
            problem_cor += problems[i][j];
        }
        correct_answer.push(problem_cor);
    }
    
    let problem_index = 0;
    let interval_index = 0;
    const showProblems = setInterval(() => {
        if(problem_index == problem_num) {
            showAnswerDisplay();
            clearInterval(showProblems);
        } else {
            if(interval_index == 0) {
                for(let i=0; i<layer_num; i++) {
                    mathDisplay[i].innerHTML = problems[i][problem_index];
                }
            }
            interval_index++;
            if(interval_index == problems_interval) {
                interval_index = 0;
                problem_index++;
                for(let i=0; i<layer_num; i++) {
                    mathDisplay[i].innerHTML = "";
                }
            }
        }
    }, 200);

    const showAnswerDisplay = () => {
        for(let i=0; i<layer_num; i++) {
            mathDisplay[i].innerHTML = "?";
        }
        answerDisplays.style.display = "flex";
        // レイヤーの個数分の回答箇所を用意
        for(let i=0; i<layer_num; i++) {
            let answerDisplayComponent = document.createElement("div");
            answerDisplayComponent.className = "answer-display";
            answerDisplayComponent.style.width = (100 / layer_num) + "%";
            let answerInputComponent = document.createElement("input");
            answerInputComponent.className = "answer-input";
            answerInputComponent.type = "number";
            answerDisplayComponent.appendChild(answerInputComponent);
            answerDisplays.appendChild(answerDisplayComponent);
        }

        userDisplay.style.display = "flex";
        let timeDisplay = document.querySelector(".time-display");
        timeDisplay.innerText = time;
        let answerInput = document.querySelectorAll(".answer-input");
        let answerButton = document.querySelector(".answer-button");
        let errorDisplay = document.querySelector(".error-display");

        answerButton.addEventListener("click", () => {
            let answers = [];
            for (let i=0; i<layer_num; i++) {
                let answer = answerInput[i].value;
                console.log(typeof(answer));
                answer = answer.trim();
                if(answer == "") {
                    errorDisplay.style.display = "block";
                    break;
                } else {
                    answers.push(Number(answer));
                }
            }

            if (answers.length == layer_num) {
                errorDisplay.style.display = "none";
                tickSound.volume = 0.0;
                mainSound.volume = 0.0;
                judge(answers);
                clearInterval(timeInterval);
            }
        })

        const timeInterval = setInterval(() => {
            time -= 1;
            timeDisplay.innerText = time;
            if(time == 5) {
                tickSound.volume = 0.0;
                tickSound.play();
                timeDisplay.style.color = "red";
            } else if (time < 5 && 0 < time) {
                tickSound.volume += 0.24;
            } else if (time == 0) {
                tickSound.volume = 0.0;
                mainSound.volume = 0.0;
                userDisplay.style.display = "none";
                let dummyAnswer = [];
                for (let i=0; i<layer_num; i++)[
                    dummyAnswer.push[-1]
                ]
                judge(dummyAnswer);
                clearInterval(timeInterval);
            }
        },1000);
    }
    
    const judge = (answers) => {
        let isClear = true;
        for (let i=0; i<layer_num; i++) {
            mathDisplay[i].innerHTML = correct_answer[i];
            mathDisplay[i].style.fontSize = "200px";
            if (answers[i] != correct_answer[i]) {
                isClear = false;
                mathDisplay[i].style.color = "red";
            }
        }
        if(isClear) {
            let clearDisplay = document.querySelector(".clear");
            clearDisplay.style.display = "block";
            clearSound.play();
            setInterval(() => {
                localStorage.setItem("level", level+1);
                let hiscore = 1;
                if(localStorage.getItem("hiscore")) {
                    hiscore = localStorage.getItem("hiscore");
                }
                hiscore = Math.max(hiscore, level+1);
                localStorage.setItem("hiscore", hiscore);
                window.location.reload();
            }, 3000)
        } else {
            let gameoverDisplay = document.querySelector(".gameover");
            gameoverDisplay.style.display = "block";
            gameoverSound.play();
            setInterval(() => {
                window.location.reload();
            }, 3000)
        }
    }
}
    
    
let gameDisplay = document.querySelector(".game-display");
let mathDisplays = document.querySelector(".math-displays");
    
    // レベル
let level = Number(localStorage.getItem("level"));

//何個同時の問題か
let layer_num = Math.trunc(Math.sqrt(level));
for (let i=0; i<layer_num; i++) {
    let mathDisplayComponent = document.createElement("div");
    mathDisplayComponent.className = "math-display";
    mathDisplayComponent.style.width = (100 / layer_num) + "%";
    mathDisplays.appendChild(mathDisplayComponent);
}

// タイムと回答は最初使わない。
let userDisplay = document.querySelector(".user-display");
//音楽を再生させるために一旦ユーザーから反応をもらう。
let popup = document.querySelector(".popup");
popup.style.display = "block";
let go = document.querySelector(".go");
let nowLevel = document.querySelector(".now-level");
nowLevel.innerHTML = "LEVEL: " + level;
go.addEventListener("click", startGame);
