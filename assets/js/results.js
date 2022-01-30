const recentScore = localStorage.getItem(`recentScore`);
const data = localStorage.getItem(`getAnswers`);
let getAnswers= []
if(data){
getAnswers = JSON.parse(data);
}
console.log(getAnswers);
const finalScore = document.querySelector(`#quiz-finalscore`);

finalScore.innerText = recentScore;