import { Header } from "./components/Header.js";
import { BottomNav } from "./components/BottomNav.js";
import { GrowthScreen } from "./components/GrowthScreen.js";
import { WorkoutScreen } from "./components/WorkoutScreen.js";
import { ResultScreen } from "./components/ResultScreen.js";
import { ExerciseModal } from "./components/ExerciseModal.js";

const app = document.querySelector("#app");

const state = {
  currentScreen: "growthScreen",

  exercises: [
    {
      id: 1,
      name: "풀업",
      englishName: "PULL UP",
      record: "9회",
      previousRecord: "8회",
    },
    {
      id: 2,
      name: "스쿼트",
      englishName: "SQUAT",
      record: "80kg",
      previousRecord: "75kg",
    },
    {
      id: 3,
      name: "푸쉬업",
      englishName: "PUSH UP",
      record: "25회",
      previousRecord: "22회",
    },
  ],

  workout: {
    exerciseName: "풀업",
    previous: [8, 7, 6],
    target: [8, 8, 7],
    current: [0, 0, 0],
  },
};


// -------------------------
// Render
// -------------------------

function render() {
  app.innerHTML = `
    ${Header()}

    <main>
      ${GrowthScreen(state)}
      ${WorkoutScreen(state)}
      ${ResultScreen(state)}
    </main>

    ${BottomNav(state)}
    ${ExerciseModal()}
  `;

  bindEvents();
  updateScreen();
}


// -------------------------
// Screen
// -------------------------

function updateScreen() {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle(
      "active",
      screen.id === state.currentScreen
    );
  });

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle(
      "active",
      item.dataset.screen === state.currentScreen
    );
  });
}

function changeScreen(screenId) {
  state.currentScreen = screenId;
  updateScreen();
}


// -------------------------
// Events
// -------------------------

function bindEvents() {
  // 운동 추가 버튼
  document
    .querySelector("#addExerciseBtn")
    ?.addEventListener("click", () => {
      document
        .querySelector("#exerciseModal")
        ?.classList.remove("hidden");
    });

  // 모달 닫기
  document
    .querySelector("#closeModalBtn")
    ?.addEventListener("click", closeModal);

  document
    .querySelector(".modal-backdrop")
    ?.addEventListener("click", closeModal);

  // 운동 추가
  document
    .querySelector("#saveExerciseBtn")
    ?.addEventListener("click", addExercise);

  // 운동 시작
  document
    .querySelector("#startWorkoutBtn")
    ?.addEventListener("click", () => {
      changeScreen("workoutScreen");
    });

  // 성장 화면으로
  document
    .querySelector("#backToGrowth")
    ?.addEventListener("click", () => {
      changeScreen("growthScreen");
    });

  // 운동 완료
  document
    .querySelector("#completeWorkoutBtn")
    ?.addEventListener("click", completeWorkout);

  // 결과 → 성장
  document
    .querySelector("#viewGrowthBtn")
    ?.addEventListener("click", () => {
      changeScreen("growthScreen");
    });

  // 하단 네비게이션
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      const screen = item.dataset.screen;

      if (!screen) return;

      changeScreen(screen);
    });
  });

  // 세트 +/- 버튼
  document.querySelectorAll("[data-set-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.setIndex);
      const type = button.dataset.action;

      if (type === "increase") {
        state.workout.current[index]++;
      }

      if (type === "decrease") {
        state.workout.current[index] = Math.max(
          0,
          state.workout.current[index] - 1
        );
      }

      renderWorkoutOnly();
    });
  });
}


// -------------------------
// Workout
// -------------------------

function renderWorkoutOnly() {
  const workoutScreen = document.querySelector("#workoutScreen");

  if (!workoutScreen) return;

  workoutScreen.outerHTML = WorkoutScreen(state);

  document
    .querySelector("#backToGrowth")
    ?.addEventListener("click", () => {
      changeScreen("growthScreen");
    });

  document
    .querySelector("#completeWorkoutBtn")
    ?.addEventListener("click", completeWorkout);

  document.querySelectorAll("[data-set-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.setIndex);
      const type = button.dataset.action;

      if (type === "increase") {
        state.workout.current[index]++;
      }

      if (type === "decrease") {
        state.workout.current[index] = Math.max(
          0,
          state.workout.current[index] - 1
        );
      }

      renderWorkoutOnly();
    });
  });
}

function completeWorkout() {
  state.currentScreen = "resultScreen";
  render();
}


// -------------------------
// Exercise
// -------------------------

function addExercise() {
  const input = document.querySelector("#exerciseName");
  const name = input?.value.trim();

  if (!name) {
    input?.focus();
    return;
  }

  state.exercises.push({
    id: Date.now(),
    name,
    englishName: name.toUpperCase(),
    record: "0회",
    previousRecord: "0회",
  });

  closeModal();
  render();
}

function closeModal() {
  document
    .querySelector("#exerciseModal")
    ?.classList.add("hidden");
}


// -------------------------
// Initial Render
// -------------------------

render();