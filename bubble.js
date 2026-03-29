function startSort() {
  stopFlag = false;
  let arr = document.getElementById("inputArray").value.split(",").map(Number);
  steps = bubbleSort(arr);
  animate();
}

function bubbleSort(arr) {
  let a = [...arr];
  let s = [];

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {

      s.push({ array: [...a], active: [j, j+1], text: `Comparing ${a[j]} and ${a[j+1]}` });

      if (a[j] > a[j+1]) {
        [a[j], a[j+1]] = [a[j+1], a[j]];

        s.push({ array: [...a], swap: [j, j+1], text: `Swapped ${a[j]} and ${a[j+1]}` });
      }
    }
  }
  return s;
}

async function animate(){
  let barsContainer=document.getElementById("bars");

  for(let step of steps){
    if(stopFlag) break;

    barsContainer.innerHTML="";

    step.array.forEach((val,i)=>{
      let bar=document.createElement("div");
      bar.classList.add("bar");
      bar.style.height=val*30+"px";
      bar.innerText=val;

      if(step.active && step.active.includes(i)){
        bar.classList.add("active");
      }

      if(step.swap && step.swap.includes(i)){
        bar.classList.add("swap");
      }

      barsContainer.appendChild(bar);
    });

    document.getElementById("explanation").innerText=step.text;

    await new Promise(res=>setTimeout(res, delay));
  }

  if(!stopFlag && steps.length > 0){
    let finalArray = steps[steps.length - 1].array;
    barsContainer.innerHTML = "";

    finalArray.forEach(val => {
      let bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = val * 30 + "px";
      bar.style.background = "#22c55e";
      bar.innerText = val;
      barsContainer.appendChild(bar);
    });

    document.getElementById("explanation").innerText = "Sorting Completed ✅";
  }
}