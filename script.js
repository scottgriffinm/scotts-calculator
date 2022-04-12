const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");
const soundWaves = document.getElementById("soundWaves");
let allButtons = Array.from(numberButtons)
allButtons = allButtons.concat(Array.from(operationButtons), equalsButton, allClearButton)


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
  img.style.transform = "scale(.8)";
  // Animation effect 
  img.style.transition = "transform 0.25s ease";
}

// Function to reset image size
function resetImg(img) {
  // Set image size to original
  img.style.transform = "scale(1)";
  img.style.transition = "transform 0.25s ease";
}



const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

allButtons.forEach(button => {
  button.onmousedown = function() {sizeImg(button.querySelectorAll('img')[0])}
  button.onmouseup = function() {resetImg(button.querySelectorAll('img')[0])}
  button.onclick = function() {soundWavesAppearFor(1000)}
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


