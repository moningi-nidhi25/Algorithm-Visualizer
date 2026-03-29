function startSort() {
  stopFlag = false;
  let arr = document.getElementById("inputArray").value.split(",").map(Number);
  steps = selectionSort(arr);
  animate();
}

function selectionSort(arr) {
  let a = [...arr];
  let s = [];

  for (let i = 0; i < a.length; i++) {
    let min = i;

    for (let j = i + 1; j < a.length; j++) {
      s.push({ array:[...a], active:[j], min:[min], text:`Comparing ${a[j]} with current min ${a[min]}` });

      if (a[j] < a[min]) {
        min = j;
        s.push({ array:[...a], min:[min], text:`New min found: ${a[min]}` });
      }
    }

    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      s.push({ array:[...a], swap:[i, min], text:`Swapped ${a[i]} and ${a[min]}` });
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

      if(step.active && step.active.includes(i)) bar.classList.add("active");
      if(step.swap && step.swap.includes(i)) bar.classList.add("swap");
      if(step.min && step.min.includes(i)) bar.classList.add("min");

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
      bar.classList.add("sorted");
      bar.innerText = val;
      barsContainer.appendChild(bar);
    });

    document.getElementById("explanation").innerText = "Sorting Completed ✅";
  }
}