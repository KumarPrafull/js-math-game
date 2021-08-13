let problem = document.querySelector(".problem")
let ourField = document.querySelector(".ourField")
let ourForm = document.querySelector(".ourForm")
let scorePoint = document.querySelector(".score")
let attempt = document.querySelector(".attempt")
let progressBar = document.querySelector(".progress-inner")
let endMessage = document.querySelector(".end-message")
let resetButton = document.querySelector(".reset-button")

let state = {
  score: 0,
  wrongAnswer: 0
}

function randomElement(max) {
 return  Math.floor(Math.random() * (max+1))
}

function problemElement(){
  return {
    firstNum: randomElement(10),
    secondNum: randomElement(10),
    operator: ['+', '-','x'][randomElement(2)]
  }
}

function problemGenerator(){
 state.problemData = problemElement()
 problem.innerHTML = (`${state.problemData.firstNum} ${state.problemData.operator} ${state.problemData.secondNum}`);
 ourField.value=""
 ourField.focus()
}
problemGenerator()

ourForm.addEventListener('submit', answerValidator)

function answerValidator(e){
  e.preventDefault();
  if(state.problemData.operator == "+") answer =state.problemData.firstNum + state.problemData.secondNum 
  if(state.problemData.operator == "-") answer =state.problemData.firstNum - state.problemData.secondNum
  if(state.problemData.operator == "x") answer =state.problemData.firstNum * state.problemData.secondNum
  if (answer == parseInt(ourField.value, 10)) {
    state.score++
    scorePoint.textContent = state.score
    problemGenerator()
    renderProgress()
    console.log("correct" + state.score + "incorrect" + state.wrongAnswer)
  } else {
    state.wrongAnswer++
    attempt.textContent = state.wrongAnswer
    problemGenerator()
    
    console.log("correct" + state.score + "incorrect" + state.wrongAnswer)
  }
  checkLogic()
}

function checkLogic(){
  if(state.wrongAnswer == 3){
    endMessage.textContent = "Congrats! you won."
    document.body.classList.add("overlay-is-open")
    setTimeout(() => {
      resetButton.focus()
    }, 331);
  } 
  
  if(state.score == 10) {
    endMessage.textContent = "Sorry! you lost."
    document.body.classList.add("overlay-is-open")
    setTimeout(() => {
      resetButton.focus()
    }, 331);
  }
}

resetButton.addEventListener("click", resetGame)

function resetGame(){
  document.body.classList.remove("overlay-is-open")
  problemGenerator()
  state.score=0
  state.wrongAnswer=0
  scorePoint.textContent=0
  attempt.textContent=3
  renderProgress()
}

function renderProgress() {
  progressBar.style.transform= `scaleX(${state.score / 10})`

}
