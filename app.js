/* =========================================
   운동 성장 기록 앱
   MVP Prototype
========================================= */


/* =========================================
   초기 데이터
========================================= */

const defaultExercises = [
  {
    id: "pullup",
    name: "풀업",
    englishName: "PULL UP",
    personalBest: 8,
    firstRecord: 6,
    growth: 3
  },
  {
    id: "pushup",
    name: "푸쉬업",
    englishName: "PUSH UP",
    personalBest: 32,
    firstRecord: 24,
    growth: 8
  },
  {
    id: "abs",
    name: "복근운동",
    englishName: "ABS",
    personalBest: 40,
    firstRecord: 30,
    growth: 10
  }
];


/* =========================================
   State
========================================= */

let exercises = loadExercises();

let currentWorkout = {
  exerciseId: "pullup",

  targets: [8, 8, 7],

  actuals: [null, null, null]
};


/* =========================================
   DOM
========================================= */

const growthScreen = document.getElementById("growthScreen");
const workoutScreen = document.getElementById("workoutScreen");
const resultScreen = document.getElementById("resultScreen");

const startWorkoutBtn = document.getElementById("startWorkoutBtn");
const backToGrowth = document.getElementById("backToGrowth");

const completeWorkoutBtn =
  document.getElementById("completeWorkoutBtn");

const viewGrowthBtn =
  document.getElementById("viewGrowthBtn");

const setList =
  document.getElementById("setList");

const personalBestList =
  document.getElementById("personalBestList");

const addExerciseBtn =
  document.getElementById("addExerciseBtn");

const exerciseModal =
  document.getElementById("exerciseModal");

const closeModalBtn =
  document.getElementById("closeModalBtn");

const saveExerciseBtn =
  document.getElementById("saveExerciseBtn");

const exerciseNameInput =
  document.getElementById("exerciseName");


/* =========================================
   Local Storage
========================================= */

function loadExercises() {
  const saved =
    localStorage.getItem("my-growth-exercises");

  if (!saved) {
    return defaultExercises;
  }

  try {
    return JSON.parse(saved);
  } catch {
    return defaultExercises;
  }
}


function saveExercises() {
  localStorage.setItem(
    "my-growth-exercises",
    JSON.stringify(exercises)
  );
}


/* =========================================
   화면 전환
========================================= */

function showScreen(screen) {

  document.querySelectorAll(".screen")
    .forEach(item => {
      item.classList.remove("active");
    });

  screen.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  updateNavigation(screen.id);
}


function updateNavigation(screenId) {

  document.querySelectorAll(".nav-item")
    .forEach(item => {
      item.classList.remove("active");
    });

  const active =
    document.querySelector(
      `.nav-item[data-screen="${screenId}"]`
    );

  if (active) {
    active.classList.add("active");
  }
}


/* =========================================
   성장 화면
========================================= */

function renderPersonalBest() {

  personalBestList.innerHTML = "";

  exercises.forEach(exercise => {

    const card =
      document.createElement("div");

    card.className = "exercise-card";

    const growth =
      exercise.personalBest -
      exercise.firstRecord;

    card.innerHTML = `
      <span class="exercise-title">
        ${exercise.englishName || exercise.name}
      </span>

      <strong>
        ${exercise.personalBest}회
      </strong>

      <span class="exercise-growth">
        +${growth}회 성장
      </span>
    `;

    personalBestList.appendChild(card);
  });
}


/* =========================================
   운동 시작
========================================= */

function startWorkout() {

  currentWorkout = {
    exerciseId: "pullup",

    targets: [8, 8, 7],

    actuals: [null, null, null]
  };

  renderWorkoutSets();

  showScreen(workoutScreen);
}


/* =========================================
   세트 UI
========================================= */

function renderWorkoutSets() {

  setList.innerHTML = "";

  currentWorkout.targets.forEach(
    (target, index) => {

      const card =
        document.createElement("div");

      card.className = "set-card";

      card.innerHTML = `
        <div class="set-info">
          <span>SET ${index + 1}</span>
          <strong>목표 ${target}회</strong>
        </div>

        <div class="set-target">
          실제
        </div>

        <input
          class="set-input"
          type="number"
          min="0"
          inputmode="numeric"
          placeholder="${target}"
          data-set="${index}"
        />
      `;

      setList.appendChild(card);
    }
  );


  document.querySelectorAll(".set-input")
    .forEach(input => {

      input.addEventListener(
        "input",
        event => {

          const index =
            Number(
              event.target.dataset.set
            );

          currentWorkout.actuals[index] =
            event.target.value === ""
              ? null
              : Number(event.target.value);
        }
      );

    });
}


/* =========================================
   운동 완료
========================================= */

function completeWorkout() {

  const inputs =
    document.querySelectorAll(".set-input");


  inputs.forEach(input => {

    const index =
      Number(input.dataset.set);

    currentWorkout.actuals[index] =
      input.value === ""
        ? currentWorkout.targets[index]
        : Number(input.value);

  });


  const actuals =
    currentWorkout.actuals;

  const total =
    actuals.reduce(
      (sum, value) => sum + value,
      0
    );

  const maxRep =
    Math.max(...actuals);


  const exercise =
    exercises.find(
      item =>
        item.id === currentWorkout.exerciseId
    );


  const previousBest =
    exercise.personalBest;


  const isNewRecord =
    maxRep > previousBest;


  if (isNewRecord) {

    exercise.personalBest =
      maxRep;

    saveExercises();

  }


  updateResultScreen(
    exercise,
    previousBest,
    maxRep,
    total
  );


  showScreen(resultScreen);
}


/* =========================================
   결과 화면
========================================= */

function updateResultScreen(
  exercise,
  previousBest,
  newBest,
  total
) {

  const resultTitle =
    document.querySelector(
      ".result-screen h1"
    );

  const resultMessage =
    document.querySelector(
      ".result-message"
    );

  const resultCard =
    document.querySelector(
      ".result-main-card"
    );

  const resultStats =
    document.querySelector(
      ".result-stats"
    );


  const isNewRecord =
    newBest > previousBest;


  if (isNewRecord) {

    resultTitle.textContent =
      "최고 기록 갱신!";

    resultMessage.textContent =
      "지난번보다 더 강해졌어요.";

  } else {

    resultTitle.textContent =
      "운동 완료!";

    resultMessage.textContent =
      "오늘도 운동을 완료했어요.";
  }


  resultCard.innerHTML = `
    <span>
      ${exercise.name} 최고 기록
    </span>

    <div class="record-change">

      <span>
        ${previousBest}회
      </span>

      <b>→</b>

      <strong>
        ${Math.max(previousBest, newBest)}회
      </strong>

    </div>

    <div class="growth-pill">
      ${
        isNewRecord
          ? `+${newBest - previousBest}회 성장`
          : "기록 유지"
      }
    </div>
  `;


  resultStats.innerHTML = `
    <div class="result-stat">
      <span>지난번</span>
      <strong>21회</strong>
    </div>

    <div class="result-stat">
      <span>오늘</span>
      <strong>${total}회</strong>
    </div>

    <div class="result-stat">
      <span>최고 기록</span>
      <strong>${Math.max(previousBest, newBest)}회</strong>
    </div>
  `;


  renderPersonalBest();
}


/* =========================================
   운동 추가 Modal
========================================= */

function openExerciseModal() {

  exerciseModal.classList.remove("hidden");

  setTimeout(() => {
    exerciseNameInput.focus();
  }, 100);
}


function closeExerciseModal() {

  exerciseModal.classList.add("hidden");

  exerciseNameInput.value = "";
}


function addExercise() {

  const name =
    exerciseNameInput.value.trim();


  if (!name) {

    exerciseNameInput.focus();

    return;
  }


  const id =
    `exercise-${Date.now()}`;


  exercises.push({

    id,

    name,

    englishName:
      name.toUpperCase(),

    personalBest: 0,

    firstRecord: 0,

    growth: 0

  });


  saveExercises();

  renderPersonalBest();

  closeExerciseModal();
}


/* =========================================
   이벤트
========================================= */

startWorkoutBtn.addEventListener(
  "click",
  startWorkout
);


backToGrowth.addEventListener(
  "click",
  () => showScreen(growthScreen)
);


completeWorkoutBtn.addEventListener(
  "click",
  completeWorkout
);


viewGrowthBtn.addEventListener(
  "click",
  () => showScreen(growthScreen)
);


addExerciseBtn.addEventListener(
  "click",
  openExerciseModal
);


closeModalBtn.addEventListener(
  "click",
  closeExerciseModal
);


saveExerciseBtn.addEventListener(
  "click",
  addExercise
);


exerciseModal
  .querySelector(".modal-backdrop")
  .addEventListener(
    "click",
    closeExerciseModal
  );


exerciseNameInput.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {
      addExercise();
    }

  });


/* =========================================
   하단 네비게이션
========================================= */

document.querySelectorAll(".nav-item")
  .forEach(item => {

    item.addEventListener(
      "click",
      () => {

        const screenId =
          item.dataset.screen;

        if (!screenId) {
          return;
        }


        const screen =
          document.getElementById(screenId);


        if (screen) {
          showScreen(screen);
        }

      }
    );

  });


/* =========================================
   초기화
========================================= */

renderPersonalBest();

showScreen(growthScreen);