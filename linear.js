let steps = [];
let delay = 700;
let stopFlag = false;

function startSearch() {
  stopFlag = false;
  let arr = document.getElementById("inputArray").value.split(",").map(Number);
  let target = Number(document.getElementById("target").value);
  steps = linearSearch(arr, target);
  animate();
}

function linearSearch(arr, target) {
  let s = [];

  for (let i = 0; i < arr.length; i++) {

    s.push({
      array: [...arr],
      active: [i],
      text: `Checking ${arr[i]}`
    });

    if (arr[i] === target) {
      s.push({
        array: [...arr],
        found: [i],
        text: `Found ${target} at index ${i} ✅`
      });
      return s;
    }
  }

  s.push({
    array: [...arr],
    text: `Element not found ❌`
  });

  return s;
}

async function animate(){
  let barsContainer = document.getElementById("bars");

  for(let step of steps){
    if(stopFlag) break;

    barsContainer.innerHTML = "";

    step.array.forEach((val,i)=>{
      let bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = val*30+"px";
      bar.innerText = val;

      if(step.active && step.active.includes(i)){
        bar.classList.add("active");
      }

      if(step.found && step.found.includes(i)){
        bar.style.background = "#22c55e";
        bar.style.border = "1px solid #22c55e";
      }

      barsContainer.appendChild(bar);
    });

    document.getElementById("explanation").innerText = step.text;

    await new Promise(res=>setTimeout(res, delay));
  }
}