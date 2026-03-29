let delay = 100;

function runAll(){
  let arr = document.getElementById("inputArray").value.split(",").map(Number);

  runAlgo("bubble", bubbleSort(arr));
  runAlgo("selection", selectionSort(arr));
  runAlgo("insertion", insertionSort(arr));
  runAlgo("merge", mergeSort(arr));
  runAlgo("quick", quickSort(arr));
  runAlgo("heap", heapSort(arr));
}

function runAlgo(id, result){
  animate(id, result.steps);
  document.getElementById(id+"Stats").innerText =
    'Comparisons: ' + result.comparisons + ' | Swaps: ' + result.swaps;
}

function animate(id, steps){
  let container = document.getElementById(id);

  steps.forEach((step,i)=>{
    setTimeout(()=>{
      container.innerHTML="";
      step.array.forEach((val, idx)=>{
        let bar=document.createElement("div");
        bar.className="bar";
        bar.style.height=val*10+"px";

        if(step.active && step.active.includes(idx)){
          bar.classList.add("active");
        }

        if(step.swap && step.swap.includes(idx)){
          bar.classList.add("swap");
        }

        container.appendChild(bar);
      });
    }, i*delay);
  });

  setTimeout(()=>{
    let final = steps[steps.length-1].array;
    container.innerHTML="";
    final.forEach(val=>{
      let bar=document.createElement("div");
      bar.className="bar sorted";
      bar.style.height=val*10+"px";
      container.appendChild(bar);
    });
  }, steps.length * delay);
}

// -------- ALGORITHMS --------

function bubbleSort(arr){
  let a=[...arr],steps=[],c=0,s=0;
  for(let i=0;i<a.length;i++){
    for(let j=0;j<a.length-i-1;j++){
      c++;
      if(a[j]>a[j+1]){
        s++;
        [a[j],a[j+1]]=[a[j+1],a[j]];
      }
      steps.push({array:[...a]});
    }
  }
  return {steps,comparisons:c,swaps:s};
}

function selectionSort(arr){
  let a=[...arr],steps=[],c=0,s=0;
  for(let i=0;i<a.length;i++){
    let min=i;
    for(let j=i+1;j<a.length;j++){
      c++;
      if(a[j]<a[min]) min=j;
      steps.push({array:[...a]});
    }
    if(min!==i){
      s++;
      [a[i],a[min]]=[a[min],a[i]];
    }
    steps.push({array:[...a]});
  }
  return {steps,comparisons:c,swaps:s};
}

function insertionSort(arr){
  let a=[...arr],steps=[],c=0,s=0;
  for(let i=1;i<a.length;i++){
    let key=a[i],j=i-1;
    while(j>=0 && a[j]>key){
      c++;
      a[j+1]=a[j];
      j--;
      s++;
      steps.push({array:[...a]});
    }
    a[j+1]=key;
    steps.push({array:[...a]});
  }
  return {steps,comparisons:c,swaps:s};
}

function mergeSort(arr){
  let a=[...arr],steps=[],c=0;

  function merge(l,m,r){
    let left=a.slice(l,m+1), right=a.slice(m+1,r+1);
    let i=0,j=0,k=l;
    while(i<left.length && j<right.length){
      c++;
      if(left[i]<=right[j]) a[k++]=left[i++];
      else a[k++]=right[j++];
      steps.push({array:[...a]});
    }
    while(i<left.length){ a[k++]=left[i++]; steps.push({array:[...a]}); }
    while(j<right.length){ a[k++]=right[j++]; steps.push({array:[...a]}); }
  }

  function sort(l,r){
    if(l<r){
      let m=Math.floor((l+r)/2);
      sort(l,m); sort(m+1,r); merge(l,m,r);
    }
  }

  sort(0,a.length-1);
  return {steps,comparisons:c,swaps:0};
}

function quickSort(arr){
  let a=[...arr],steps=[],c=0,s=0;

  function partition(l,h){
    let pivot=a[h],i=l-1;
    for(let j=l;j<h;j++){
      c++;
      if(a[j]<pivot){
        i++; s++;
        [a[i],a[j]]=[a[j],a[i]];
      }
      steps.push({array:[...a]});
    }
    [a[i+1],a[h]]=[a[h],a[i+1]];
    steps.push({array:[...a]});
    return i+1;
  }

  function sort(l,h){
    if(l<h){
      let p=partition(l,h);
      sort(l,p-1); sort(p+1,h);
    }
  }

  sort(0,a.length-1);
  return {steps,comparisons:c,swaps:s};
}

function heapSort(arr){
  let a=[...arr],steps=[],c=0,s=0,n=a.length;

  function heapify(n,i){
    let largest=i,l=2*i+1,r=2*i+2;
    if(l<n && a[l]>a[largest]){ largest=l; c++; }
    if(r<n && a[r]>a[largest]){ largest=r; c++; }
    if(largest!==i){
      s++;
      [a[i],a[largest]]=[a[largest],a[i]];
      steps.push({array:[...a]});
      heapify(n,largest);
    }
  }

  for(let i=Math.floor(n/2)-1;i>=0;i--) heapify(n,i);
  for(let i=n-1;i>0;i--){
    [a[0],a[i]]=[a[i],a[0]]; s++;
    steps.push({array:[...a]});
    heapify(i,0);
  }

  return {steps,comparisons:c,swaps:s};
}