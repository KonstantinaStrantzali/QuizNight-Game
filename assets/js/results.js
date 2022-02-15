    //get and display the score
    const recentScore = localStorage.getItem(`recentScore`);
    const finalScore = document.querySelector(`#quiz-finalscore`);
    finalScore.innerText = recentScore;
    // retrieve answers
    const userAnswers = localStorage.getItem("userAnswers");
    const userChoices = JSON.parse(userAnswers);
  
  
    //retrieve questions-correct_answers and display them
    const data = localStorage.getItem(`getAnswers`);
    let getAnswers = []
    if (data) {
        getAnswers = JSON.parse(data);
    }
    console.log(getAnswers);
    

  //build a table and display the data
    let myTable = document.querySelector('#table');
  
    let headers = ['Question', 'Correct Answer', 'User Choice'];
  
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
    getAnswers.forEach((obj, i) => {
        let objRow = document.createElement('tr');
        
        let cell1 = document.createElement('td');
        let cell2 = document.createElement('td');
        let cell3 = document.createElement('td');

        
        cell1.innerHTML = obj.question;
        cell2.innerHTML= obj.correct;
        cell3.innerHTML = userChoices[i];


        objRow.appendChild(cell1);
        objRow.appendChild(cell2);
        objRow.appendChild(cell3);

        table.appendChild(objRow);
        
    })
    
    myTable.appendChild(table);
    myTable.classList.add("table table-striped");