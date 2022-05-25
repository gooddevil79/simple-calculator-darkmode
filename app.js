const historyContainer = document.querySelector('.result__history');
const historyValue = document.querySelector('.result__history--value');
const outputValue = document.querySelector('.result__output--value');
const clearBTN = document.querySelector('#clear');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const darkMode = document.querySelector('.darkmode');
class Calc {
  constructor() {
    this._eventHandler();
  }
  _getHistory() {
    return historyValue.innerText;
  }
  _setHistory(num) {
    historyValue.innerText = num;
  }
  _getOutput() {
    return outputValue.innerText;
  }
  _setOutput(num) {
    if (num == '') {
      outputValue.innerText = '';
    } else {
      outputValue.innerText = this._setFormattedNumber(num);
    }
  }
  _setFormattedNumber(num) {
    if (num == '-') {
      return '';
    }
    return Number(num).toLocaleString('en');
  }
  _reverseFormattedNumber(num) {
    let formatted = Number(num.replaceAll(',', ''));
    return formatted;
  }
  _clearOutput() {
    historyValue.innerText = '';
    outputValue.innerText = '';
  }
  _operatorHandler(op) {
    // console.log(`operator clicked ${op.id}`);

    if (op.matches('#clear')) {
      this._clearOutput();
    } else if (op.matches('#backspace')) {
      let output = this._reverseFormattedNumber(this._getOutput()).toString();
      if (output) {
        output = output.slice(0, output.length - 1);
        this._setOutput(output);
      } else {
        this._clearOutput();
      }
    } else {
      let history = this._getHistory();
      let output = this._getOutput();
      if (output == '' && history !== '') {
        if (isNaN(history[history.length - 1])) {
          history = history.slice(0, history.length - 1);
        }
      }
      if (output != '' || history != '') {
        output = output == '' ? output : this._reverseFormattedNumber(output);
        history = history + output;
        if (op.id == '=') {
          let result = eval(history);
          console.log(result);
          this._setOutput(result);
          this._setHistory('');
        } else {
          history = history + op.id;
          this._setHistory(history);
          this._setOutput('');
        }
      }
    }
  }
  _numberHandler(num) {
    let output = this._reverseFormattedNumber(this._getOutput());
    output = output + num.id;

    this._setOutput(output);
  }
  _toggleDarkMode() {
    document.body.classList.toggle('light__mode');
    if (document.body.classList.contains('light__mode')) {
      darkMode.querySelector('.icon_mode').classList.remove('fa-sun');
      darkMode.querySelector('.icon_mode').classList.add('fa-moon');
    } else {
      darkMode.querySelector('.icon_mode').classList.add('fa-sun');
      darkMode.querySelector('.icon_mode').classList.remove('fa-moon');
    }
  }
  _eventHandler() {
    operators.forEach(op => {
      op.addEventListener('click', this._operatorHandler.bind(this, op));
    });

    numbers.forEach(num => {
      num.addEventListener('click', this._numberHandler.bind(this, num));
    });
    darkMode.addEventListener('click', this._toggleDarkMode);
  }
}
const calculator = new Calc();
