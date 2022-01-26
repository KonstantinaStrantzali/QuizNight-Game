let question = document.getElementById("question-content");
let answer1 = document.getElementById("option1");
let answer2 = document.getElementById("option2");
let answer3 = document.getElementById("option3");
let answer4 = document.getElementById("option4");
let quizAnswers = document.getElementsByClassName("answers");
let scoreCounter = document.getElementById("scoreCounter");
let data;
let round = 0;
let score = 0;
let questionNum = 0;

async function sendApiRequest(){
    let response = await fetch("https://opentdb.com/api.php?amount=10");
    data = await response.json();
    console.log(data);
    displayApiData(data);
}
window.onload = sendApiRequest; 

function displayApiData(data){
    const results = data.results[round]; //data destructured 
    
    question.innerHTML = `${results.question}`;
    answer1.innerHTML = `${results.incorrect_answers}`;
    answer2.innerHTML = `${results.incorrect_answers[1]}`;
    console.log(answer2);
    answer3.innerHTML = `${results.incorrect_answers[2]}`;
    answer4.innerHTML = `${results.correct_answer}`;
}

[...quizAnswers].forEach((qa) => qa.addEventListener("click", function(event) {
    
let isCorrect = event.target.innerText === data.results[round].correct_answer;
if (isCorrect) score+= 100;
scoreCounter.innerText = score;

event.target.style.backgroundColor = isCorrect ? "green" : "red";


setTimeout (() =>{
    event.target.style.backgroundColor = "grey"
    round++;
    countQuestions()
    displayApiData(data)
}, 2000);

}));



function countQuestions () {
    let questionCounter = document.getElementById("questionCounter");
     questionCounter.innerText = questionNum++;
}