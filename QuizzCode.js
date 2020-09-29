
// this is the data of quiz Questions, Options, and answers.

const quiz = [
	{
		qtn: "Which one of One Piece characters have eaten the Pyro-Fruit ?",
		options: ["Monkey D.Luffy","Roronoa Zoro","Portgas D.Ace","Sabo","Boa Hancock"],
		answer:2
	},
	{
		qtn: "In which arc Monkey D.Luffy lost his brother Portgas D.Ace ?",
		options: ["Arc Arlong Park","Arc Marine Ford","Arc Alabasta","Arc Zo","Arc Punk Hazard"],
		answer:1
	},
	{
		qtn: "The last fight between Luffy and Kaido it ended with a victory of Luffy",
		options: ["true","false"],
		answer:1
	},
	{
		qtn: "Luffy's crew consists of : ",
		options: ["5 Pirates","7 Pirates","3 Pirates","9 Pirates","10 Pirates"],
		answer:4
	},
	{
		qtn: "Who is the father of Monkey D.Luffy ?",
		options: ["The White Beard","Monkey D.Dragon","Shanks","Dracule Mihawk","Monkey D. Garp"],
		answer:1
	}	
]

// *********************** Now we will staret the Quiz function **********************

const questionsNum = document.querySelector(".question-num")
const questionsText = document.querySelector(".question-text")
const optionContainer = document.querySelector(".option-container")
const answerIndirectContainer= document.querySelector(".ans-indic")
const homeBox= document.querySelector(".home-box")
const quizBox= document.querySelector(".quiz-box")
const resultBox= document.querySelector(".res-box")
var qtnCounter=0;
var correctAns=0;
var attempt=0
var currentQtn;
var availableQtns=[];
var availableOptions=[];
 

function totAvailableQtns(){
	for (var i = 0; i < quiz.length; i++) {
		availableQtns.push(quiz[i])
	}
	
}

function getNewQtn(){
	
	questionsNum.innerHTML = "Question " + (qtnCounter + 1) + " of " + quiz.length;

	const qtnIndex= availableQtns[Math.floor(Math.random()*availableQtns.length)];
	currentQtn=qtnIndex;
	questionsText.innerHTML= currentQtn.qtn;
	const index = availableQtns.indexOf(qtnIndex);
	availableQtns.splice(index,1);
	for (var i = 0; i < currentQtn.options.length; i++) {
		availableOptions.push(i)
	}


	optionContainer.innerHTML= '' ;
	for (var i = 0; i < (currentQtn.options).length; i++) {
		var opIndex= availableOptions[Math.floor(Math.random()*availableOptions.length)];
		var index1= availableOptions.indexOf(opIndex);
		availableOptions.splice(index1,1)
		var option = document.createElement("div");
		option.innerHTML = currentQtn.options[opIndex];
		option.id=opIndex;
		option.className= "option";
		optionContainer.appendChild(option)
		option.setAttribute("onclick","getResult(this)")
	}
	qtnCounter++
}
function getResult(element){
	var id= Number(element.id);
	if(id===currentQtn.answer){
		element.classList.add("correct");
		updAnswerInd("correct");
		correctAns++;
	}
	else{
		element.classList.add("incorrect");
		updAnswerInd("incorrect");

		for (var i = 0; i < (optionContainer.children).length; i++) {
			if(Number(optionContainer.children[i].id)===currentQtn.answer){
				optionContainer.children[i].classList.add("correct");
			}
		}
	}
	attempt++;
	unclikableOption();
}

function unclikableOption(){
	for (var i = 0; i < (optionContainer.children).length; i++) {
		optionContainer.children[i].classList.add("answered");

	}
}
function answerInd(){
	answerIndirectContainer.innerHTML= '';
	for (var i = 0; i < quiz.length; i++) {
		var ind=document.createElement("div")
		answerIndirectContainer.appendChild(ind)
	}
}
function updAnswerInd(Newelement){
	answerIndirectContainer.children[qtnCounter-1].classList.add(Newelement)
};


function next(){
	if(qtnCounter===quiz.length){
		console.log("Quiz Over");
		quizOver();
	}
	else{
		getNewQtn();
	}
}
function quizOver(){
	quizBox.classList.add("hide");
	resultBox.classList.remove("hide");
	quizResult();
}
function quizResult(){
	resultBox.querySelector(".total-questions").innerHTML= quiz.length;
	resultBox.querySelector(".total-attempt").innerHTML= attempt;
	resultBox.querySelector(".total-correct").innerHTML= correctAns;
	resultBox.querySelector(".total-wrong").innerHTML= attempt - correctAns;
	resultBox.querySelector(".per").innerHTML=((correctAns/quiz.length)*100).toFixed(2) + "%"
	resultBox.querySelector(".total-score").innerHTML= correctAns+" / "+ quiz.length;

}

function resetQuiz(){
	attempt=0;
	qtnCounter=0;
	correctAns=0;
	
}

function tryAgain(){
	resultBox.classList.add("hide");
	quizBox.classList.remove("hide");
	resetQuiz();
	startQuiz();
}

function goToHome(){
	resultBox.classList.add("hide");
	homeBox.classList.remove("hide");
	resetQuiz();
}

function startQuiz(){
	homeBox.classList.add("hide");
	quizBox.classList.remove("hide")

	totAvailableQtns();

	getNewQtn();

	answerInd();
}




















