function startSort() {
  stopFlag = false;
  let arr = document.getElementById("inputArray").value.split(",").map(Number);
  steps = quickSort(arr);
  animate();
}

function quickSort(arr) {
  let a = [...arr];
  let s = [];

  function partition(low, high) {
    let pivot = a[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      s.push({ 
        array:[...a], 
        active:[j], 
        pivot:[high], 
        text:`Comparing ${a[j]} with pivot ${pivot}` 
      });

      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        s.push({ 
          array:[...a], 
          swap:[i, j], 
          pivot:[high], 
          text:`Swapped ${a[i]} and ${a[j]} (pivot = ${pivot})` 
        });
      }
    }

    [a[i+1], a[high]] = [a[high], a[i+1]];
    s.push({ 
      array:[...a], 
      swap:[i+1, high], 
      pivot:[i+1], 
      text:`Placed pivot ${pivot} at correct position` 
    });

    return i + 1;
  }

  function sort(low, high) {
    if (low < high) {
      let pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  }

  sort(0, a.length - 1);
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
      if(step.pivot && step.pivot.includes(i)) bar.classList.add("pivot");

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