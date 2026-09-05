export function GrowthScreen(state) {
    return `
      <section id="growthScreen" class="screen active">
  
        <div class="hero-card">
          <div class="hero-label">이번 주 성장</div>
          <div class="hero-value">+12%</div>
          <div class="hero-subtitle">
            지난주보다 더 강해지고 있어요.
          </div>
        </div>
  
  
        <div class="section-header">
          <div>
            <span class="section-eyebrow">PERSONAL BEST</span>
            <h2>최고 기록</h2>
          </div>
        </div>
  
  
        <div id="personalBestList" class="exercise-grid">
  
          ${state.exercises
            .map(
              (exercise) => `
                <div class="exercise-card">
  
                  <span class="exercise-card-name">
                    ${exercise.englishName}
                  </span>
  
                  <strong>
                    ${exercise.record}
                  </strong>
  
                  <small>
                    이전 ${exercise.previousRecord}
                  </small>
  
                </div>
              `
            )
            .join("")}
  
        </div>
  
  
        <div class="section-header growth-header">
          <div>
            <span class="section-eyebrow">PROGRESS</span>
            <h2>최근 성장</h2>
          </div>
        </div>
  
  
        <div class="chart-card">
  
          <div class="chart-top">
            <div>
              <span class="chart-exercise">PULL UP</span>
              <strong id="chartBest">9회</strong>
            </div>
  
            <span class="chart-growth">+3회</span>
          </div>
  
  
          <div class="chart">
  
            <div class="chart-grid grid-1"></div>
            <div class="chart-grid grid-2"></div>
            <div class="chart-grid grid-3"></div>
  
            <svg
              viewBox="0 0 320 150"
              preserveAspectRatio="none"
            >
  
              <defs>
                <linearGradient
                  id="chartGradient"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stop-color="#a3ff12"
                    stop-opacity=".25"
                  />
  
                  <stop
                    offset="100%"
                    stop-color="#a3ff12"
                    stop-opacity="0"
                  />
                </linearGradient>
              </defs>
  
  
              <path
                class="chart-area"
                d="
                  M0,120
                  L80,100
                  L160,82
                  L240,62
                  L320,35
                  L320,150
                  L0,150
                  Z
                "
              />
  
  
              <polyline
                class="chart-line"
                points="
                  0,120
                  80,100
                  160,82
                  240,62
                  320,35
                "
              />
  
  
              <circle cx="0" cy="120" r="5" />
              <circle cx="80" cy="100" r="5" />
              <circle cx="160" cy="82" r="5" />
              <circle cx="240" cy="62" r="5" />
              <circle cx="320" cy="35" r="6" />
  
            </svg>
  
  
            <div class="chart-labels">
              <span>1회차</span>
              <span>2회차</span>
              <span>3회차</span>
              <span>4회차</span>
              <span>5회차</span>
            </div>
  
          </div>
  
        </div>
  
  
        <div class="today-card">
  
          <div class="today-card-top">
  
            <div>
              <span class="section-eyebrow">
                TODAY'S CHALLENGE
              </span>
  
              <h2>오늘의 도전</h2>
            </div>
  
            <span class="challenge-badge">
              +2회
            </span>
  
          </div>
  
  
          <div class="today-exercise">
  
            <div>
              <span class="exercise-name">
                풀업
              </span>
  
              <span class="last-record">
                지난번 8 / 7 / 6
              </span>
            </div>
  
  
            <div class="today-target">
  
              <span>오늘 목표</span>
  
              <strong>
                8 / 8 / 7
              </strong>
  
            </div>
  
          </div>
  
  
          <button
            class="primary-button"
            id="startWorkoutBtn"
          >
            운동 시작
            <span>→</span>
          </button>
  
        </div>
  
      </section>
    `;
  }