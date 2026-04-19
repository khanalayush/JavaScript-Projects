let results = document.querySelector(".result input");
const buttons = document.querySelectorAll(".row button");
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () =>{
  document.body.classList.toggle("dark-mode");
});

// Core function: handles any input (button or keyboard)
function handleInput(value) {
  const operators = ["+", "-", "*", "/", "%"];
  let lastChar = results.value.slice(-1);
  
  // CLEAR
  if (value === "AC" || value === "c" || value === "C") {
    // erase all
    results.value = "";
  }

  // DELETE
  else if (value === "DEL" || value === "Backspace") {
    // deletes last character
    results.value = results.value.slice(0, -1);
  }

  // EVALUATE
  else if (value === "=" || value === "Enter" || value === "NumpadEnter") {
    // evaluates only if not empty
    if (results.value.trim() == "") {
      alert("Please enter a number first");
    } else {
      // evaluate expression
      try {
        results.value = math.evaluate(results.value);
      } catch {
        alert("Invalid input");
      }
    }
  }

  // NUMBERS
  else if (!isNaN(value)) {
    // append clicked value
    results.value += value;
  }

  // DECIMAL POINT
  else if (value === ".") {
    // prevent multiple decimals in same numbers
    let parts = results.value.split(/[\+\-\/\*\%]/);
    let lastNumber = parts[parts.length - 1];

    if (!lastNumber.includes(".")) {
      results.value += value;
    }
  }

  // OPERATORS
  else if (operators.includes(value)) {
    // prevent starting with operator (except minus)
    if (results.value === "" && value !== "-") return;

    // replace last operator if already operator
    if (operators.includes(lastChar)) {
      results.value = results.value.slice(0, -1) + value;
    } else {
      results.value += value;
    }
  }

  results.scrollLeft = results.scrollWidth;
}

// Buttons Clicked
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    handleInput(e.target.value);
  });
});

// Keyboard Pressed
document.addEventListener("keydown", (e) => {
  // Map numpad codes to their actual characters
  const numpadMap = {
    Numpad0: "0",
    Numpad1: "1",
    Numpad2: "2",
    Numpad3: "3",
    Numpad4: "4",
    Numpad5: "5",
    Numpad6: "6",
    Numpad7: "7",
    Numpad8: "8",
    Numpad9: "9",
    NumpadDecimal: ".",
  };
  const input = numpadMap[e.code] || e.key;
  handleInput(input);
});
