
function startSort() {
  stopFlag = false;
  let arr = document.getElementById("inputArray").value.split(",").map(Number);
  steps = insertionSort(arr);
  animate();
}

function insertionSort(arr) {
  let a = [...arr];
  let s = [];

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;

    s.push({ array:[...a], active:[i], text:`Selecting key ${key}` });

    while (j >= 0 && a[j] > key) {
      s.push({ array:[...a], active:[j], text:`Comparing ${a[j]} > ${key}` });

      a[j + 1] = a[j];
      s.push({ array:[...a], shift:[j, j+1], text:`Shifting ${a[j]} to position ${j+1}` });

      j--;
    }

    a[j + 1] = key;
    s.push({ array:[...a], insert:[j+1], text:`Inserted ${key} at position ${j+1}` });
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
      if(step.shift && step.shift.includes(i)) bar.classList.add("shift");
      if(step.insert && step.insert.includes(i)) {
        bar.style.background = "#16a34a";
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
      bar.classList.add("sorted");
      bar.innerText = val;
      barsContainer.appendChild(bar);
    });

    document.getElementById("explanation").innerText = "Sorting Completed ✅";
  }
}