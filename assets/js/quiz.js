//Global variables

const question = document.getElementById("question-content");
const answer1 = document.getElementById("option1");
const answer2 = document.getElementById("option2");
const answer3 = document.getElementById("option3");
const answer4 = document.getElementById("option4");
const quizAnswers = document.getElementsByClassName("answers");
const scoreCounter = document.getElementById("scoreCounter");
const audioElm = document.getElementById('myAudio'); 
audioElm.muted = !audioElm.muted;
const questionCounter = document.getElementById("questionCounter");
let data;
let round = 0;
let score = 0;
let questionNum = 1;
let answerClicked = true;
let userAnswers=[];

window.onload = sendApiRequest; 

[...quizAnswers].forEach((qa) => qa.addEventListener("click", clickButtonsListener));

// Run timer and when its out show the modal
let time = 90;
let interval = setInterval(function() {
    document.getElementById('timeCounter').innerHTML = `${String(Math.trunc(time / 60)).padStart(2,0)}:${String(time % 60).padStart(2,0)}`;
        time--;
        if (time === 0){
        clearInterval(interval);
        $("#gameOver-Modal").modal('show');  
        }
    }, 
    1000
); 
//Fetch API, store it in a variable using an asyncronous function and save its values to local Storage
async function sendApiRequest(){
    let response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    data = await response.json();
    
    let getAnswers = Object.values(data.results).map( el => {
        return {question: el.question, correct: el.correct_answer};
    });
    localStorage.setItem("getAnswers",JSON.stringify(getAnswers));
     displayApiData();  
}

//Display answers on HTML buttons
function displayApiData(){
    const results = data.results[round]; 
    let all_answers = results.incorrect_answers.concat(results.correct_answer);
    (shuffle(all_answers));
    question.innerHTML = results.question;
    answer1.innerHTML = all_answers[0];
    answer2.innerHTML = all_answers[1];
    answer3.innerHTML = all_answers[2];
    answer4.innerHTML = all_answers[3];
}

/* Shuffle the answers and randomize their positions 
   Fisher-Yates Shuffle found at https://javascript.info/task/shuffle#:~:text=Write%20the%20function%20shuffle(array,%2C%202%5D%20%2F%2F%20... */
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
/*For each answer when it's clicked check if the value is correct and change the background color, 
increase the score and go to the next question */
function clickButtonsListener(event) {
    if(!answerClicked) {
        return;
    }
    answerClicked = false;
    let userChoice = event.target.innerText;
    userAnswers.push(userChoice);
    let isCorrect = event.target.innerText === data.results[round].correct_answer;
    if (isCorrect) score+= 100;
    scoreCounter.innerText = score;
    event.target.style.backgroundColor = isCorrect ? "green" : "red";
    event.target.style.color="white";
      
    setTimeout (() =>{
        
        event.target.style.backgroundColor = "#F6F3E8ff";
        event.target.style.color="#1D3461";
        round++; 
        displayApiData();
        answerClicked = true;
        countQuestions();
    }, 2000);    
}

// When questions get to 10 finish the game and send the results to the results page.
function countQuestions(){
    questionNum++;
    questionCounter.innerText = questionNum;
    if(questionNum === 10) {
        setTimeout (() =>{
            
            localStorage.setItem('recentScore', score); 
            localStorage.setItem("userAnswers",JSON.stringify(userAnswers));
            window.location.href = 'results.html';
            
        }, 2000);         
    }   
}


