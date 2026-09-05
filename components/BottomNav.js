export function BottomNav(state) {
    return `
      <nav class="bottom-nav">
  
        <button
          class="nav-item ${
            state.currentScreen === "growthScreen" ? "active" : ""
          }"
          data-screen="growthScreen"
        >
          <span class="nav-icon">↗</span>
          <span>성장</span>
        </button>
  
        <button
          class="nav-item ${
            state.currentScreen === "workoutScreen" ? "active" : ""
          }"
          data-screen="workoutScreen"
        >
          <span class="nav-icon">○</span>
          <span>운동</span>
        </button>
  
        <button class="nav-item">
          <span class="nav-icon">≡</span>
          <span>기록</span>
        </button>
  
      </nav>
    `;
  }