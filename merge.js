function startSort() {
  stopFlag = false;
  let arr = document.getElementById("inputArray").value.split(",").map(Number);
  steps = mergeSort(arr);
  animate();
}

function mergeSort(arr) {
  let a = [...arr];
  let s = [];

  function merge(l, m, r) {
    let left = a.slice(l, m+1);
    let right = a.slice(m+1, r+1);
    let i=0,j=0,k=l;

    while(i<left.length && j<right.length){
      s.push({array:[...a], active:[l+i, m+1+j], text:`Comparing ${left[i]} and ${right[j]}`});

      if(left[i]<=right[j]){
        a[k]=left[i];
        s.push({array:[...a], overwrite:[k], text:`Placed ${left[i]}`});
        i++;
      } else {
        a[k]=right[j];
        s.push({array:[...a], overwrite:[k], text:`Placed ${right[j]}`});
        j++;
      }
      k++;
    }

    while(i<left.length){
      a[k]=left[i];
      s.push({array:[...a], overwrite:[k], text:`Adding ${left[i]}`});
      i++; k++;
    }

    while(j<right.length){
      a[k]=right[j];
      s.push({array:[...a], overwrite:[k], text:`Adding ${right[j]}`});
      j++; k++;
    }
  }

  function sort(l,r){
    if(l>=r) return;
    let m=Math.floor((l+r)/2);
    s.push({array:[...a], text:`Dividing ${l} to ${r}`});
    sort(l,m);
    sort(m+1,r);
    merge(l,m,r);
  }

  sort(0,a.length-1);
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

      if(step.overwrite && step.overwrite.includes(i)){
        bar.style.background = "#3b82f6"; // BLUE
      }

      barsContainer.appendChild(bar);
    });

    document.getElementById("explanation").innerText=step.text;

    await new Promise(res=>setTimeout(res, delay));
  }

  // FINAL STATE (do not disappear)
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