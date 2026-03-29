let steps = [];
let delay = 700;
let stopFlag = false;

const slider = document.getElementById("speedSlider");
const speedText = document.getElementById("speedValue");

slider.addEventListener("input", function () {
  delay = 1600 - this.value;
  if (delay < 400) speedText.innerText = "Fast ⚡";
  else if (delay < 900) speedText.innerText = "Medium";
  else speedText.innerText = "Slow 🐢";
});

function stopSearch() { stopFlag = true; }

function resetAll() {
  stopFlag = true;
  document.getElementById("inputArray").value = "";
  document.getElementById("bars").innerHTML = "";
  document.getElementById("explanation").innerText = "";
}