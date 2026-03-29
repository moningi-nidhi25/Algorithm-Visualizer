function startSearch() {
  stopFlag = false;
  let arr = document.getElementById("inputArray").value.split(",").map(Number);
  let target = Number(document.getElementById("target").value);

  steps = binarySearch(arr, target);
  animate();
}


function binarySearch(arr, target) {
  let s = [];
  let low = 0, high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    s.push({
      array: [...arr],
      low, high,
      mid,
      text: `Checking middle element ${arr[mid]}`
    });

    if (arr[mid] === target) {
      s.push({
        array: [...arr],
        found: mid,
        text: `Found ${target} at index ${mid} ✅`
      });
      return s;
    }

    else if (target < arr[mid]) {
      high = mid - 1;
      s.push({
        array: [...arr],
        low, high,
        text: `Searching left half`
      });
    }

    else {
      low = mid + 1;
      s.push({
        array: [...arr],
        low, high,
        text: `Searching right half`
      });
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

      if(step.low !== undefined && i >= step.low && i <= step.high){
        bar.style.background = "#c5c522";   
        bar.style.border = "1px solid #c5c522";
      }

      if(step.mid === i){
        bar.style.background = "#ef4444";
        bar.style.border = "1px solid #ef4444";
      }

      if(step.found === i){
        bar.style.background = "#22c55e";
        bar.style.border = "1px solid #22c55e";
      }

      barsContainer.appendChild(bar);
    });

    document.getElementById("explanation").innerText = step.text;

    await new Promise(res=>setTimeout(res, delay));
  }
}