// ================= TASK VARIABLES =================

const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

let tasks = [];

// ================= ADD TASK =================

addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  const task = {
    text: taskText,
    completed: false
  };

  tasks.push(task);
  taskInput.value = "";

  renderTasks();
});

// ================= RENDER TASKS =================

function renderTasks() {
  taskList.innerHTML = "";
  let completedCount = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `<span>${task.text}</span>`;

    if (task.completed) {
      li.classList.add("completed");
      completedCount++;
    }

    // COMPLETE TASK ON CLICK
    li.addEventListener("click", function () {

      if (tasks[index].completed) return;

      tasks[index].completed = true;

      stopTimer();
      timerDisplay.classList.remove("running");

      let choice = confirm(
        "Great job! 🎉\n\n" +
        "Press OK to continue next task 🚀\n" +
        "Press Cancel to take 5 min break ☕"
      );

      if (!choice) {
        startBreak();
      }

      renderTasks();
    });

    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";

    deleteBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      tasks.splice(index, 1);
      renderTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completedCount;
}

// ================= TIMER SECTION =================

let timeLeft = 1500; // 25 minutes
let timerInterval = null;
let sessions = 0;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const sessionCount = document.getElementById("sessionCount");

function updateTimerDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  timerDisplay.textContent = minutes + ":" + seconds;
  if (timeLeft <= 10) {
  timerDisplay.style.color = "#ff4d4d";
} else {
  timerDisplay.style.color = "white";
}
}

startBtn.addEventListener("click", function () {
  if (timerInterval !== null) return;
 timerDisplay.classList.add("running");

  timerInterval = setInterval(function () {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;

      sessions++;
      sessionCount.textContent = sessions;

      alert("Study session completed! Take a short break ☕");

      timeLeft = 1500;
      updateTimerDisplay();
    }
  }, 1000);
});

resetBtn.addEventListener("click", function () {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = 1500;
  updateTimerDisplay();
  timerDisplay.classList.remove("running");
});

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function startBreak() {
  timeLeft = 300; // 5 minutes
  updateTimerDisplay();

  timerInterval = setInterval(function () {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;

      alert("Break over! Ready to study again? 🚀");

      timeLeft = 1500;
      updateTimerDisplay();
    }
  }, 1000);
}

updateTimerDisplay();
