const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");
const soundWaves = document.getElementById("soundWaves");
var backgroundMusic = new Audio('https://cdn.glitch.global/04acdea7-933d-42b4-b887-a53010fc0bc3/calculator%20music.wav?v=1650225150967')
var boopsNBeeps = [new Audio('https://cdn.glitch.global/04acdea7-933d-42b4-b887-a53010fc0bc3/boop1.wav?v=1650222133758'),
                  new Audio('https://cdn.glitch.global/04acdea7-933d-42b4-b887-a53010fc0bc3/beep1.wav?v=1650222118139'),
                  new Audio('https://cdn.glitch.global/04acdea7-933d-42b4-b887-a53010fc0bc3/boop2.wav?v=1650222134548'),
                  new Audio('https://cdn.glitch.global/04acdea7-933d-42b4-b887-a53010fc0bc3/beep2.wav?v=1650222120967'),
                  new Audio('https://cdn.glitch.global/04acdea7-933d-42b4-b887-a53010fc0bc3/boop3.wav?v=1650222137529'),
                  new Audio('https://cdn.glitch.global/04acdea7-933d-42b4-b887-a53010fc0bc3/beep3.wav?v=1650222123230'),
                  new Audio('https://cdn.glitch.global/04acdea7-933d-42b4-b887-a53010fc0bc3/boop4.wav?v=1650222139941'),
                  new Audio('https://cdn.glitch.global/04acdea7-933d-42b4-b887-a53010fc0bc3/beep4.wav?v=1650222125758'),
                  new Audio('https://cdn.glitch.global/04acdea7-933d-42b4-b887-a53010fc0bc3/boop5.wav?v=1650222142235'),
                  new Audio('https://cdn.glitch.global/04acdea7-933d-42b4-b887-a53010fc0bc3/beep5.wav?v=1650222128705'),
                  new Audio('https://cdn.glitch.global/04acdea7-933d-42b4-b887-a53010fc0bc3/boop1.wav?v=1650222133758'),
                  new Audio('https://cdn.glitch.global/04acdea7-933d-42b4-b887-a53010fc0bc3/beep1.wav?v=1650222118139'),
                  new Audio('https://cdn.glitch.global/04acdea7-933d-42b4-b887-a53010fc0bc3/boop2.wav?v=1650222134548'),
                  new Audio('https://cdn.glitch.global/04acdea7-933d-42b4-b887-a53010fc0bc3/beep2.wav?v=1650222120967')]
let allButtons = Array.from(numberButtons)
allButtons = allButtons.concat(Array.from(operationButtons), equalsButton, allClearButton)

class CalcButton {
  constructor(button, audio) {
    this.button = button;
    this.audio = audio;
  }
}

for (let iii = 0; iii < allButtons.length; iii++) {
  const temp = new CalcButton(allButtons[iii],boopsNBeeps[iii])
  allButtons[iii] = temp
}

const playMusicButton = new CalcButton(document.getElementById("playMusic"), new Audio('https://cdn.glitch.global/04acdea7-933d-42b4-b887-a53010fc0bc3/calculator%20music.wav?v=1650392910758'))


class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      default:
        return
    }
    this.currentOperand = computation.toFixed(1)
    this.operation = undefined
    this.previousOperand = ''
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
  
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }


}
// Function to sleep for ms number of milliseconds 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to show sound waves images for ms number of milliseconds
async function soundWavesAppearFor(ms) {
  soundWaves.style.opacity = '1';
  await sleep(ms)
  soundWaves.style.opacity = '0';
}

// Function to change image size
function sizeImg(img) {
  img.style.transform = "scale(.90)";
  // Animation effect 
  img.style.transition = "transform 0.01s";
}

// Function to reset image size
function resetImg(img) {
  // Set image size to original
  img.style.transform = "scale(1)";
  img.style.transition = "transform 0.01s";
}


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

allButtons.forEach(button => {
  button.button.onmousedown = function() {sizeImg(button.button.querySelectorAll('img')[0])}
  button.button.onmouseup = function() {resetImg(button.button.querySelectorAll('img')[0])}
  button.button.onclick = function() {soundWavesAppearFor(1000);
                                     button.audio.play();}
})

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})  

/* audio event - kid dancing */
var aud = document.getElementById("musicPlayer");
var kidDancing = document.getElementById("kidDancing");
aud.onplay = function() {
  kidDancing.style.opacity = 1;
};
aud.onpause = function() {
  kidDancing.style.opacity = 0;
}
