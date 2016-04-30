var calcArray = ["_"];

var isCalcBlank = function() {
  return calcArray[0] === "_";
};

var isLastCalcOp = function() {
  return ~"*/+-".indexOf(calcArray[calcArray.length - 1]);
};

var minNonNeg = function(x, y) {
  return Math.min(x, y) < 0 ? Math.max(x, y) : Math.min(x, y);
};

var parseExpr = function(expr) {
  if (~expr.indexOf("*") || ~expr.indexOf("/")) {
    while (~expr.indexOf("*") || ~expr.indexOf("/")) {
      var opIndex = minNonNeg(expr.indexOf("*"), expr.indexOf("/"));
      if (expr[opIndex] === "*") {
        expr = expr.slice(0, opIndex - 1)
                .concat([expr[opIndex - 1] * expr[opIndex + 1]])
                .concat(expr.slice(opIndex + 2, expr.length));
      } else {
        expr = expr.slice(0, opIndex - 1)
                .concat([expr[opIndex - 1] / expr[opIndex + 1]])
                .concat(expr.slice(opIndex + 2, expr.length));
      }
    }
  }

  if (~expr.indexOf("+") || ~expr.indexOf("-")) {
    while (~expr.indexOf("+") || ~expr.indexOf("-")) {
      var opIndex = minNonNeg(expr.indexOf("+"), expr.indexOf("-"));
      if (expr[opIndex] === "+") {
        expr = expr.slice(0, opIndex - 1)
                .concat([expr[opIndex - 1] + expr[opIndex + 1]])
                .concat(expr.slice(opIndex + 2, expr.length));
      } else {
        expr = expr.slice(0, opIndex - 1)
                .concat([expr[opIndex - 1] - expr[opIndex + 1]])
                .concat(expr.slice(opIndex + 2, expr.length));
      }
    }
  }

  return expr;
};

var calculator = {
  insertDigit: function(element) {
    if (isCalcBlank()) {
      calcArray[0] = parseInt(element.innerHTML);
    } else if (isLastCalcOp()) {
      calcArray[calcArray.length] = parseInt(element.innerHTML);
    } else {
      if (!isFinite(calcArray[0])) {
        return;
      } else {
        calcArray[calcArray.length - 1] = calcArray[calcArray.length - 1].toString();
        calcArray[calcArray.length - 1] += element.innerHTML;
        calcArray[calcArray.length - 1] = parseInt(calcArray[calcArray.length - 1]);
      }
    }
    document.querySelector(".screen").innerHTML = calcArray.join(" ");
  },
  insertOperator: function(element) {
    if (!isCalcBlank() && !isLastCalcOp()) {
      calcArray[calcArray.length] = element.innerHTML;
      document.querySelector(".screen").innerHTML = calcArray.join(" ");
    } else if (!isCalcBlank() && isLastCalcOp()) {
      calcArray[calcArray.length - 1] = element.innerHTML;
      document.querySelector(".screen").innerHTML = calcArray.join(" ");
    }
  },
  negateNumber: function(element) {
    if (!isCalcBlank() && !isLastCalcOp()) {
      calcArray[calcArray.length -1] *= -1;
      document.querySelector(".screen").innerHTML = calcArray.join(" ");
    }
  },
  clearCalc: function(element) {
    calcArray = ["_"];
    document.querySelector(".screen").innerHTML = calcArray.join(" ");
  },
  parseCalc: function(element) {
    if (!isCalcBlank() && !isLastCalcOp()) {
      calcArray = parseExpr(calcArray);
      document.querySelector(".screen").innerHTML = calcArray.join(" ");
    }
  }
};

var buttons = document.querySelectorAll("button");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function() {
    calculator[this.className](this);
  }
}
