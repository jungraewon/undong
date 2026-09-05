export function WorkoutScreen(state) {
    const { previous, target, current } = state.workout;
  
    const sets = target
      .map((targetCount, index) => {
        return `
          <div class="set-item">
  
            <div class="set-info">
              <span>SET ${index + 1}</span>
  
              <small>
                목표 ${targetCount}회
              </small>
            </div>
  
  
            <div class="set-counter">
  
              <button
                class="counter-button"
                data-set-index="${index}"
                data-action="decrease"
              >
                −
              </button>
  
  
              <strong>
                ${current[index]}
              </strong>
  
  
              <button
                class="counter-button"
                data-set-index="${index}"
                data-action="increase"
              >
                +
              </button>
  
            </div>
  
          </div>
        `;
      })
      .join("");
  
    return `
      <section id="workoutScreen" class="screen">
  
        <div class="screen-header">
  
          <button
            class="back-button"
            id="backToGrowth"
          >
            ←
          </button>
  
          <div>
            <span class="eyebrow">
              TODAY'S WORKOUT
            </span>
  
            <h1>
              ${state.workout.exerciseName}
            </h1>
          </div>
  
        </div>
  
  
        <div class="workout-summary">
  
          <div class="summary-item">
  
            <span>지난번</span>
  
            <strong>
              ${previous.join(" / ")}
            </strong>
  
            <small>
              총 ${previous.reduce((a, b) => a + b, 0)}회
            </small>
  
          </div>
  
  
          <div class="summary-arrow">
            →
          </div>
  
  
          <div class="summary-item highlight">
  
            <span>오늘 목표</span>
  
            <strong>
              ${target.join(" / ")}
            </strong>
  
            <small>
              총 ${target.reduce((a, b) => a + b, 0)}회
            </small>
  
          </div>
  
        </div>
  
  
        <div class="set-list" id="setList">
          ${sets}
        </div>
  
  
        <button
          class="primary-button workout-complete-button"
          id="completeWorkoutBtn"
        >
          운동 완료
          <span>→</span>
        </button>
  
      </section>
    `;
  }