export function ExerciseModal() {
    return `
      <div
        class="modal hidden"
        id="exerciseModal"
      >
  
        <div class="modal-backdrop"></div>
  
  
        <div class="modal-content">
  
          <div class="modal-header">
  
            <div>
  
              <span class="section-eyebrow">
                NEW EXERCISE
              </span>
  
              <h2>
                운동 추가
              </h2>
  
            </div>
  
  
            <button
              class="close-button"
              id="closeModalBtn"
            >
              ×
            </button>
  
          </div>
  
  
          <label for="exerciseName">
            운동 이름
          </label>
  
  
          <input
            id="exerciseName"
            type="text"
            placeholder="예: 딥스"
          />
  
  
          <button
            class="primary-button"
            id="saveExerciseBtn"
          >
            운동 추가
          </button>
  
        </div>
  
      </div>
    `;
  }