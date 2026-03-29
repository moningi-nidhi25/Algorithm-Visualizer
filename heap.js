function startSort() {
  stopFlag = false;
  let arr = document.getElementById("inputArray").value.split(",").map(Number);
  steps = heapSort(arr);
  animate();
}

function heapSort(arr) {
  let a = [...arr];
  let s = [];
  let n = a.length;

  function heapify(n, i) {
    let largest = i;
    let l = 2*i + 1;
    let r = 2*i + 2;

    if (l < n) {
      s.push({ array:[...a], active:[i,l], heap:[i], text:`Compare ${a[l]} with root ${a[i]}` });
      if (a[l] > a[largest]) largest = l;
    }

    if (r < n) {
      s.push({ array:[...a], active:[largest,r], heap:[largest], text:`Compare ${a[r]} with ${a[largest]}` });
      if (a[r] > a[largest]) largest = r;
    }

    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      s.push({ array:[...a], swap:[i,largest], heap:[largest], text:`Swapped ${a[i]} and ${a[largest]}` });
      heapify(n, largest);
    }
  }

  // Build heap
  for (let i = Math.floor(n/2)-1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements
  for (let i = n-1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    s.push({ array:[...a], swap:[0,i], text:`Moved max to end` });
    heapify(i, 0);
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
      if(step.heap && step.heap.includes(i)) bar.classList.add("heap");

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