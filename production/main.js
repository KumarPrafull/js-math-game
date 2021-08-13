let problem = document.querySelector(".problem")
let ourField = document.querySelector(".ourField")
let ourForm = document.querySelector(".ourForm")
let point = document.querySelector(".point")
let attempt = document.querySelector(".attempt")
let progress = document.querySelector(".progress-inner")
let announcement = document.querySelector(".announce")
let playMore = document.querySelector(".playmore")

let state = {
  score: 0,
  mistake: 0
}

questionGenerator()

function questionGenerator(){
  state.question =elementGenerator()
  problem.innerHTML = `${state.question.num1} ${state.question.operator} ${state.question.num2}`
  ourField.value =""
  ourField.focus()
}


function randomInt(max){
 return  Math.floor(Math.random()*(max+1))
}

function elementGenerator (){
  return({
    num1: randomInt(9),
    num2: randomInt(9),
    operator: ['+', '-', 'x'][randomInt(2)]
  })
}

ourForm.addEventListener("submit", submitHandler)

function submitHandler (e){
  e.preventDefault()
  answerCh()
}

function answerCh(){
  let p = state.question 
 if(p.operator == "+") answer= p.num1 + p.num2
 if(p.operator == "-") answer= p.num1 - p.num2
 if(p.operator == "x") answer= p.num1 * p.num2
 
 if(answer == parseInt(ourField.value, 10)){
  state.score++
  point.textContent = state.score
  renderProgress()
  questionGenerator()
  console.log(state.score + "and" + state.mistake );

 } else {
  state.mistake++
  attempt.textContent = 3 - state.mistake
  questionGenerator()
  console.log(state.score + "and" + state.mistake );
 }
 results()
}

function renderProgress(){
 return  progress.style.transform = `scaleX(${state.score / 10})`
}

function results(){
  if(state.score == 10){
    announcement.textContent ="Congrats! You are winner";
    document.body.classList.add("overlay-is-active")
    setTimeout(() => {
      playMore.focus()
    }, 300);
  } 
  if (state.mistake == 3) {
    announcement.textContent ="Sorry! You lost.";
    document.body.classList.add("overlay-is-active")
    setTimeout(() => {
      playMore.focus()
    }, 300);
  }
}

playMore.addEventListener("click", resetGame)

function resetGame() {
  document.body.classList.remove("overlay-is-active")
  state.score=0
  state.mistake=0
  attempt.textContent =3
  point.textContent = 0
  questionGenerator()
  renderProgress()
}






