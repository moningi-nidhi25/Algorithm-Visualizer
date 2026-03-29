let currentQ = 0;
let score = 0;
let questions = [];
let selected = null;

// ---------- QUESTION BANK (same as before) ----------
const quizData = {
  "bubble": [
{q:"Why is Bubble Sort considered a stable sorting algorithm?",o:["Uses recursion","Preserves order of equal elements","Fastest algorithm","Uses heap"],a:1},
{q:"Worst-case time complexity of Bubble Sort?",o:["O(n)","O(log n)","O(n²)","O(n log n)"],a:2},
{q:"Best case occurs when?",o:["Array sorted","Array reversed","Random data","Large data"],a:0},
{q:"Bubble Sort repeatedly compares?",o:["All elements","Adjacent elements","Random elements","Middle elements"],a:1},
{q:"Main drawback of Bubble Sort?",o:["Complex","Slow","Unstable","Uses memory"],a:1},
{q:"Number of passes required?",o:["n","n-1","log n","n²"],a:1},
{q:"Bubble Sort belongs to?",o:["Divide & conquer","Greedy","Comparison sort","DP"],a:2},
{q:"Optimization technique uses?",o:["Flag","Heap","Stack","Queue"],a:0},
{q:"Space complexity?",o:["O(n)","O(1)","O(log n)","O(n²)"],a:1},
{q:"Bubble Sort is suitable for?",o:["Large data","Small datasets","Graphs","Trees"],a:1}
],

"insertion": [
{q:"Insertion Sort builds?",o:["Heap","Sorted subarray","Tree","Graph"],a:1},
{q:"Best case complexity?",o:["O(n)","O(n²)","O(log n)","O(1)"],a:0},
{q:"Worst case occurs when?",o:["Sorted","Reversed","Random","Equal"],a:1},
{q:"Insertion Sort is?",o:["Stable","Unstable","Random","None"],a:0},
{q:"Main operation in insertion?",o:["Swapping","Shifting","Deleting","Searching"],a:1},
{q:"Adaptive nature means?",o:["Works for graphs","Efficient for nearly sorted data","Uses recursion","None"],a:1},
{q:"Space complexity?",o:["O(n)","O(1)","O(log n)","O(n²)"],a:1},
{q:"Best suited for?",o:["Large data","Small/nearly sorted","Graphs","Trees"],a:1},
{q:"Time complexity average?",o:["O(n)","O(n log n)","O(n²)","O(log n)"],a:2},
{q:"Insertion sort works like?",o:["Heap","Sorting cards","Divide array","Graph"],a:1}
],

"selection": [
{q:"Selection Sort selects?",o:["Max","Min element","Middle","Random"],a:1},
{q:"Time complexity?",o:["O(n)","O(n log n)","O(n²)","O(log n)"],a:2},
{q:"Stable or not?",o:["Stable","Unstable","Adaptive","None"],a:1},
{q:"Main advantage?",o:["Fast","Few swaps","Stable","Recursive"],a:1},
{q:"Number of comparisons?",o:["Fixed","Variable","Random","None"],a:0},
{q:"Space complexity?",o:["O(n)","O(1)","O(log n)","O(n²)"],a:1},
{q:"Selection Sort is?",o:["Adaptive","Non-adaptive","Recursive","Random"],a:1},
{q:"Best case complexity?",o:["O(n)","O(n²)","O(log n)","O(1)"],a:1},
{q:"Swapping occurs?",o:["Every time","Once per pass","Never","Random"],a:1},
{q:"Used when?",o:["Large data","Small data","Graphs","Trees"],a:1}
],

"merge": [
{q:"Merge Sort uses?",o:["Greedy","Divide & conquer","DP","Backtracking"],a:1},
{q:"Time complexity?",o:["O(n²)","O(n log n)","O(n)","O(log n)"],a:1},
{q:"Stable or not?",o:["Stable","Unstable","Adaptive","None"],a:0},
{q:"Extra space required?",o:["O(1)","O(n)","O(log n)","O(n²)"],a:1},
{q:"Splits array into?",o:["3 parts","2 halves","Random","None"],a:1},
{q:"Best for?",o:["Small data","Large datasets","Graphs","Trees"],a:1},
{q:"Merge combines?",o:["Sorted arrays","Unsorted","Heap","Tree"],a:0},
{q:"Recursion depth?",o:["n","log n","n²","1"],a:1},
{q:"Drawback?",o:["Slow","Extra space","Unstable","Complex"],a:1},
{q:"Always runs in?",o:["Same time","Different","Random","None"],a:0}
],

"quick": [
{q:"Quick Sort uses?",o:["Greedy","Divide & conquer","DP","Backtracking"],a:1},
{q:"Pivot is?",o:["Random element","Central element","Partition element","None"],a:2},
{q:"Best case complexity?",o:["O(n log n)","O(n²)","O(n)","O(log n)"],a:0},
{q:"Worst case?",o:["O(n log n)","O(n²)","O(n)","O(log n)"],a:1},
{q:"Quick Sort is?",o:["Stable","Unstable","Adaptive","None"],a:1},
{q:"In-place?",o:["Yes","No","Maybe","None"],a:0},
{q:"Partition divides?",o:["Heap","Array","Graph","Tree"],a:1},
{q:"Worst case when?",o:["Balanced pivot","Sorted array","Random","Small"],a:1},
{q:"Recursion used?",o:["Yes","No","Maybe","None"],a:0},
{q:"Faster in practice because?",o:["Less overhead","More swaps","Stable","None"],a:0}
],

"heap": [
{q:"Heap Sort uses?",o:["Graph","Heap","Stack","Queue"],a:1},
{q:"Heap type?",o:["Binary heap","AVL","BST","Graph"],a:0},
{q:"Time complexity?",o:["O(n²)","O(n log n)","O(n)","O(log n)"],a:1},
{q:"Stable or not?",o:["Stable","Unstable","Adaptive","None"],a:1},
{q:"Space complexity?",o:["O(1)","O(n)","O(log n)","O(n²)"],a:0},
{q:"Heap root contains?",o:["Min/Max","Random","None","Middle"],a:0},
{q:"Heapify takes?",o:["O(n)","O(log n)","O(n²)","O(1)"],a:1},
{q:"Complete tree?",o:["Yes","No","Maybe","None"],a:0},
{q:"Advantage?",o:["Stable","No extra space","Adaptive","None"],a:1},
{q:"Used for?",o:["Sorting","Searching","Graphs","Trees"],a:0}
],

"linear": [
{q:"Linear Search checks?",o:["Random","Sequential","Binary","Divide"],a:1},
{q:"Time complexity?",o:["O(1)","O(log n)","O(n)","O(n²)"],a:2},
{q:"Works on?",o:["Sorted only","Any list","Heap","Tree"],a:1},
{q:"Best case?",o:["O(1)","O(n)","O(log n)","O(n²)"],a:0},
{q:"Worst case?",o:["O(1)","O(n)","O(log n)","O(n²)"],a:1},
{q:"Simple because?",o:["No sorting needed","Uses heap","Uses recursion","None"],a:0},
{q:"Used for?",o:["Small data","Large sorted","Graphs","Trees"],a:0},
{q:"Comparison type?",o:["Sequential","Binary","Random","Divide"],a:0},
{q:"Efficiency?",o:["Low","High","Medium","None"],a:0},
{q:"Requires preprocessing?",o:["Yes","No","Maybe","None"],a:1}
],

"binary": [
{q:"Binary Search requires?",o:["Heap","Sorted array","Graph","Tree"],a:1},
{q:"Time complexity?",o:["O(n)","O(log n)","O(n²)","O(1)"],a:1},
{q:"Best case?",o:["O(1)","O(n)","O(log n)","O(n²)"],a:0},
{q:"Worst case?",o:["O(n)","O(log n)","O(n²)","O(1)"],a:1},
{q:"Search space reduces?",o:["Half","Quarter","One","Double"],a:0},
{q:"Uses?",o:["Divide & conquer","Greedy","DP","Backtracking"],a:0},
{q:"Needs random access?",o:["Yes","No","Maybe","None"],a:0},
{q:"Not suitable for?",o:["Array","Linked list","Sorted","None"],a:1},
{q:"Mid element used?",o:["Yes","No","Maybe","None"],a:0},
{q:"Faster than linear because?",o:["Less comparisons","More comparisons","Stable","None"],a:0}
],

"mixed 1": [
{q:"Which is stable?",o:["Heap","Quick","Merge","Selection"],a:2},
{q:"Best for nearly sorted?",o:["Insertion","Selection","Heap","Merge"],a:0},
{q:"Worst complexity Bubble?",o:["n","n²","log n","n log n"],a:1},
{q:"Binary search requires?",o:["Sorted","Heap","Graph","Tree"],a:0},
{q:"Quick sort pivot used for?",o:["Divide","Merge","Heap","Sort"],a:0},
{q:"Heap root contains?",o:["Max/Min","Random","None","Middle"],a:0},
{q:"Linear search works on?",o:["Any","Sorted","Tree","Heap"],a:0},
{q:"Merge uses?",o:["Divide","Greedy","DP","Backtracking"],a:0},
{q:"Selection sort swaps?",o:["Many","Few","None","Random"],a:1},
{q:"Insertion best case?",o:["n","n²","log n","1"],a:0}
],

"mixed 2": [
{q:"Fastest for sorted data?",o:["Binary","Linear","Heap","Merge"],a:0},
{q:"Unstable sort?",o:["Merge","Insertion","Selection","Bubble"],a:2},
{q:"Heap structure?",o:["Tree","Graph","Stack","Queue"],a:0},
{q:"Merge complexity?",o:["n²","n log n","n","log n"],a:1},
{q:"Quick worst case?",o:["n²","n","log n","1"],a:0},
{q:"Linear worst?",o:["n","1","log n","n²"],a:0},
{q:"Binary best?",o:["1","n","log n","n²"],a:0},
{q:"Insertion stable?",o:["Yes","No","Maybe","None"],a:0},
{q:"Bubble adaptive?",o:["Yes","No","Maybe","None"],a:0},
{q:"Selection adaptive?",o:["Yes","No","Maybe","None"],a:1}
]
};

// ---------- FUNCTIONS ----------
function startQuiz(topic){
  questions = quizData[topic];
  currentQ = 0;
  score = 0;
  selected = null;

  document.getElementById("quizBox").style.display = "block";
  document.getElementById("result").innerHTML = "";
  showQuestion();
}

function showQuestion(){
  let q = questions[currentQ];
  document.getElementById("question").innerText = q.q;

  let optionsHTML = "";
  q.o.forEach((opt, index)=>{
    optionsHTML += `<button onclick="selectAnswer(${index})">${opt}</button>`;
  });

  document.getElementById("options").innerHTML = optionsHTML;
  document.getElementById("nextBtn").style.display = "none";
}

function selectAnswer(ans){
  selected = ans;

  let buttons = document.querySelectorAll("#options button");

  buttons.forEach(btn => btn.classList.remove("selected"));

  buttons[ans].classList.add("selected");

  document.getElementById("nextBtn").style.display = "block";
}

function nextQuestion(){
  if(selected === questions[currentQ].a) score++;

  currentQ++;
  selected = null;

  if(currentQ < questions.length){
    showQuestion();
  } else {
    showResult();
  }
}

function showResult(){
  document.getElementById("question").innerText = "";
  document.getElementById("options").innerHTML = "";
  document.getElementById("nextBtn").style.display = "none";

  document.getElementById("result").innerHTML =
    `Your Score: ${score}/10 <br><br>
     <button onclick="resetQuiz()">Try Another Quiz</button>`;
}

function resetQuiz(){
  document.getElementById("quizBox").style.display = "none";
  document.getElementById("result").innerHTML = "";
}