//get and display the score
const recentScore = localStorage.getItem(`recentScore`);
const finalScore = document.querySelector(`#quiz-finalscore`);
finalScore.innerText = recentScore;
// retrieve user answers 


//retrieve questions-correct_answers and display them
const data = localStorage.getItem(`getAnswers`);
let getAnswers= []
if(data){
getAnswers = JSON.parse(data);
}
console.log(getAnswers);
const questionsDisplay = document.getElementById("questions");
for(let i =0; i<getAnswers.length;  i++){
    let displayEl = document.createElement("h3");
    displayEl.innerHTML= `On question: ${getAnswers[i].question}  the correct
    answer is ${getAnswers[i].correct} and you picked ${userChoices[i]}`;
    questionsDisplay.appendChild(displayEl);
    
}
