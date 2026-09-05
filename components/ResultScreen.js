export function ResultScreen(state) {
    const previousTotal =
      state.workout.previous.reduce((a, b) => a + b, 0);
  
    const currentTotal =
      state.workout.current.reduce((a, b) => a + b, 0);
  
    const growth = currentTotal - previousTotal;
  
    return `
      <section id="resultScreen" class="screen">
  
        <div class="result-screen">
  
          <div class="record-icon">
            🔥
          </div>
  
  
          <span class="eyebrow">
            WORKOUT COMPLETE
          </span>
  
  
          <h1>
            최고 기록 갱신!
          </h1>
  
  
          <p class="result-message">
            지난번보다 더 강해졌어요.
          </p>
  
  
          <div class="result-main-card">
  
            <span>
              ${state.workout.exerciseName} 최고 기록
            </span>
  
  
            <div class="record-change">
  
              <span>
                8회
              </span>
  
              <b>
                →
              </b>
  
              <strong>
                9회
              </strong>
  
            </div>
  
  
            <div class="growth-pill">
              +1회 성장
            </div>
  
          </div>
  
  
          <div class="result-stats">
  
            <div class="result-stat">
              <span>지난번</span>
              <strong>${previousTotal}회</strong>
            </div>
  
  
            <div class="result-stat">
              <span>오늘</span>
              <strong>${currentTotal}회</strong>
            </div>
  
  
            <div class="result-stat">
              <span>성장</span>
              <strong>+${growth}회</strong>
            </div>
  
          </div>
  
  
          <button
            class="primary-button"
            id="viewGrowthBtn"
          >
            성장 확인
            <span>→</span>
          </button>
  
        </div>
  
      </section>
    `;
  }