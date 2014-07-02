
document.addEventListener("DOMContentLoaded", function() {

  // Initialize the calculator

  // NOTES:
  //
  // Change elements from divs to buttons
  // Make another solution using getElementById instead of a loop.
  //     Use this in the callback function
  // 

  var current = 0;
  var previous = undefined;
  var operator = undefined;
  var operatorJustPressed = false;

  var updateDisplay = function() {
  	document.getElementById('result_display_value').innerHTML = current;
  };

  var updateOperatorDisplay = function() {
    if (operator === undefined) {
      document.getElementById('operator_display').innerHTML = "";
    } else {
      document.getElementById('operator_display').innerHTML = operator;
    }
  };

  var clear = function() {
    current = 0;
  	previous = undefined;
  	operator = undefined;
    operatorJustPressed = false;
  	updateDisplay();
    updateOperatorDisplay();
  };

  var isNumber = function(value) {
  	return !(isNaN(Number(value)));
  };

  var isOperator = function(value) {
    return (value === '+' ||
            value === '-' ||
            value === '*' ||
            value === '/');
  };

  var handleNumberPress = function(num) {
    if (operatorJustPressed === true) {
      operatorJustPressed = false;
      previous = current;
      current = num;
    } else {
      current = (current * 10) + num;
    }

    updateDisplay(current);
  };

  var handleOperatorPress = function(newOperator) {
    operator = newOperator;
    operatorJustPressed = true;
    updateOperatorDisplay();
  };

  var performOperator = function(leftVal, rightVal, operatorVal) {
    var value = undefined;
    if (operatorVal === '+') {
      value = leftVal + rightVal;
    } else if (operatorVal === '-') {
      value = leftVal - rightVal;
    } else if (operatorVal === '*') {
      value = leftVal * rightVal;
    } else if (operatorVal === '/') {
      value = leftVal / rightVal;
    }

    return value;
  }

  var handleEnterPress = function() {
    if (previous !== undefined && operator !== undefined) {
      var result = performOperator(previous, current, operator);
      if (result !== undefined) {
        current = result;
        operator = undefined;
        previous = undefined;
      }
    }

    updateDisplay();
    updateOperatorDisplay();
  };

  clear();

  var buttons = document.querySelectorAll('.button');
  console.log(buttons);

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(event) {
 	    var buttonVal = event.target.innerHTML;
      if (buttonVal === "CLR") {
        clear();
      } else if (isNumber(buttonVal)) {
        handleNumberPress(Number(buttonVal));
      } else if (isOperator(buttonVal)) {
        handleOperatorPress(buttonVal);
      } else if (buttonVal === "ENT") {
        handleEnterPress();
      }

    	console.log(event);
    });
  }

}, false);


