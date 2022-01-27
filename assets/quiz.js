let question = document.getElementById("question-content");
let answer1 = document.getElementById("option1");
let answer2 = document.getElementById("option2");
let answer3 = document.getElementById("option3");
let answer4 = document.getElementById("option4");
let quizAnswers = document.getElementsByClassName("answers");
let scoreCounter = document.getElementById("scoreCounter");

let data;
let questionCounter = document.getElementById("questionCounter");
let round = 0;
let score = 0;
let answerClicked = true;
let audio = document.getElementById("audio");
let sound = false;


async function sendApiRequest(){
    let response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    data = await response.json();
    console.log(data);
    displayApiData(data);
    
}
window.onload = sendApiRequest; 

function displayApiData(data){
    const results = data.results[round]; //data destructured 
    
    question.innerHTML = `${results.question}`;
    answer1.innerHTML = `${results.incorrect_answers[0]}`;
    answer2.innerHTML = `${results.incorrect_answers[1]}`;
    
    answer3.innerHTML = `${results.incorrect_answers[2]}`;
    answer4.innerHTML = `${results.correct_answer}`;
    
}


function selectAnswer(){
[...quizAnswers].forEach((qa) => qa.addEventListener("click", function(event) {
if(!answerClicked) return;
answerClicked = false
 
let isCorrect = event.target.innerText === data.results[round].correct_answer;
if (isCorrect) score+= 100;
scoreCounter.innerText = score;
event.target.style.backgroundColor = isCorrect ? "green" : "red";

setTimeout (() =>{
    
    event.target.style.backgroundColor = "grey"
    round++; 
    displayApiData(data)
    answerClicked = true
    countQuestions();
}, 2000);
if (questionTotal === questionNum){
    return window.location.assign(`index.html`);
} 
}));
}
function countQuestions(){
    questionNum++
    questionCounter.innerText = questionNum;
    
}


/*
var x = document.getElementById("myAudio");
function playAudio() {
    x.play();
  }


  $('#audio').click(function(){
	var ele = $('.iconChanged');
  if(ele.hasClass('fa-volume-up'))
        {
  	ele.removeClass('fa-volume-up')
       .addClass('fa-volume-mute')
  }else {
  	ele.addClass('fa-volume-up')
       .removeClass('fa-volume-mute')
  }
})
*/