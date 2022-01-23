let question = document.getElementById("question-content");
let answer1 = document.getElementById("option1");
let answer2 = document.getElementById("option2");
let answer3 = document.getElementById("option3");
let answer4 = document.getElementById("option4");
let quizAnswers = document.getElementsByClassName("answers");
let data;



window.onload = sendApiRequest;

async function sendApiRequest(){
    let response = await fetch("https://opentdb.com/api.php?amount=10");
    data = await response.json();
    console.log(data);
    displayApiData(data);
}

const timeOut = function() {
    console.log("I am waiting");
}

function displayApiData(data){
    question.innerHTML = `${data.results[0].question}`;
    answer1.innerHTML = `${data.results[0].incorrect_answers[0]}`;
    answer2.innerHTML = `${data.results[0].incorrect_answers[1]}`;
    console.log(answer2);
    answer3.innerHTML = `${data.results[0].incorrect_answers[2]}`;
    answer4.innerHTML = `${data.results[0].correct_answer}`;
    }
//check if its correct or incorect property name

   /* quizAnswers.addEventListener("click", ()=>{
        for(i =0; i<quizAnswers.length; quizAnswers++){
            if(this.quizAnswers[i] === "correct_answer"){
                  quizAnswer[i].style.color = "green";
            }
        }
    })  */
    
for (let i = 0; i < quizAnswers.length; i++) {
    quizAnswers[i].addEventListener("click", function () {
        if(quizAnswers[i].textContent === data.results[0].correct_answer){
            quizAnswers[i].style.backgroundColor ="green";
        }
        else {
            quizAnswers[i].style.backgroundColor = "red";
        }  
    });
}

function newQuestion (questionData){
    for (let answer of quizAnswers){
        answer.style.backgroundColor= "grey"
    }
    let questionMap = new Map(quizAnswers.entries())
    let possibleAnswers = questionData.incorrect_answers
    possibleAnswers.push(questionData.correct_answer)
    const shuffledAnswers = possibleAnswers.sort(() => Math.random() - 0.5);
    console.log(shuffledAnswers);

    if (questionData.type === 'multiple'){
        question.textContent = questionData.question;
        for(i=0; i < shuffledAnswers.length; i++){
            quizAnswers[i].textContent = shuffledAnswers[i]
        }
    }
}