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
let questionNum = 1;
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
    console.log(answer2);
    answer3.innerHTML = `${results.incorrect_answers[2]}`;
    answer4.innerHTML = `${results.correct_answer}`; 
    
    all_answers = results.incorrect_answers.concat(results.correct_answer)
    console.log(all_answers)
    console.log("SHUFFLED: ", shuffle(all_answers))
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

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

function countQuestions(){
    questionNum++
    questionCounter.innerText = questionNum;
    
}






  