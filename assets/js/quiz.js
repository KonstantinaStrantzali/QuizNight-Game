let question = document.getElementById("question-content");
let answer1 = document.getElementById("option1");
let answer2 = document.getElementById("option2");
let answer3 = document.getElementById("option3");
let answer4 = document.getElementById("option4");
let quizAnswers = document.getElementsByClassName("answers");
let scoreCounter = document.getElementById("scoreCounter");
var audioElm = document.getElementById('myAudio'); audioElm.muted = !audioElm.muted;
let data;
let questionCounter = document.getElementById("questionCounter");
let round = 0;
let score = 0;
let questionNum = 1;
let answerClicked = true;
let userAnswers=[];
console.log(userAnswers);
window.onload = sendApiRequest; 



$("#audio").click(function() {
    
    toggleAudio();
});
//get the API 
async function sendApiRequest(){
    let response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    data = await response.json();
    console.log(data);
    
    let getAnswers = Object.values(data.results).map( el => {
        return {question: el.question, correct: el.correct_answer};
    });
    localStorage.setItem("getAnswers",JSON.stringify(getAnswers));
    console.log(getAnswers);
    
    console.log(userAnswers);
    displayApiData();
    //data.results = the whole object
    // results = one object
}

//Display the API's data
function displayApiData(){
    const results = data.results[round]; //data destructured 
    let all_answers = results.incorrect_answers.concat(results.correct_answer);
    (shuffle(all_answers));
    question.innerHTML = `${results.question}`;
    answer1.innerHTML = all_answers[0];
    answer2.innerHTML = all_answers[1];
    answer3.innerHTML = all_answers[2];
    answer4.innerHTML = all_answers[3];
    
console.log(typeof Object.values(data.results));

}



/* Shuffle Deck
   Fisher-Yates Shuffle found at https://javascript.info/task/shuffle#:~:text=Write%20the%20function%20shuffle(array,%2C%202%5D%20%2F%2F%20... */
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
// for each answer when it's clicked check if the value is correct and change
// the background color, increase the score, go to the next question

[...quizAnswers].forEach((qa) => qa.addEventListener("click", function(event) {
if(!answerClicked) return;
answerClicked = false
 let userChoice = event.target.innerText;
 userAnswers.push(userChoice);
 console.log(userAnswers);
let isCorrect = event.target.innerText === data.results[round].correct_answer;
if (isCorrect) score+= 100;
scoreCounter.innerText = score;
event.target.style.backgroundColor = isCorrect ? "green" : "red";
event.target.style.color="white";


setTimeout (() =>{
    
    event.target.style.backgroundColor = "white";
    event.target.style.color="#1D3461";
    round++; 
    displayApiData();
    answerClicked = true
    countQuestions();
}, 2000);

}));


// countQuestions and when its 10 go an page taking the data with you.
function countQuestions(){
    questionNum++
    questionCounter.innerText = questionNum;
    if(questionNum === 10) {
        setTimeout (() =>{
            
            localStorage.setItem('recentScore', score); 
            localStorage.setItem("userAnswers",JSON.stringify(userAnswers));
            window.location.href = 'results.html';
            
        }, 2000);
         
    }
    
}

function toggleAudio() {
    let myAudio = document.getElementById("myAudio");
    const ele = $('.iconChanged');
    console.log(ele);
    if(ele.hasClass("fa-volume-up")){
        myAudio.pause();
        ele.removeClass('fa-volume-up').addClass('fa-volume-mute')
    } else{
        myAudio.play();
        ele.addClass('fa-volume-up').removeClass('fa-volume-mute')
    }
}
