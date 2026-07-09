document.addEventListener("DOMContentLoaded", () => {
  const todayKey = () => new Date().toISOString().slice(0, 10);

  const RING_CIRC = 2 * Math.PI * 65; // 408.4

  function setRing(el, pct) {
    const clamped = Math.max(0, Math.min(1, pct));
    el.style.strokeDashoffset = RING_CIRC * (1 - clamped);
  }

  // ---- Water ----
  const waterGoalInput = document.getElementById("waterGoalInput");
  const waterRing = document.getElementById("waterRing");
  const waterCurrentEl = document.getElementById("waterCurrent");
  const waterGoalLabel = document.getElementById("waterGoalLabel");

  function waterState() {
    const goal = parseInt(localStorage.getItem("dtm_water_goal"), 10) || 2500;
    const current = parseInt(localStorage.getItem("dtm_water_" + todayKey()), 10) || 0;
    return { goal, current };
  }

  function renderWater() {
    const { goal, current } = waterState();
    waterCurrentEl.textContent = current;
    waterGoalLabel.textContent = goal;
    waterGoalInput.value = goal;
    setRing(waterRing, current / goal);
  }

  waterGoalInput.addEventListener("change", () => {
    const val = parseInt(waterGoalInput.value, 10);
    if (val > 0) {
      localStorage.setItem("dtm_water_goal", val);
      renderWater();
    }
  });

  document.querySelectorAll("[data-add-water]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const amount = parseInt(btn.dataset.addWater, 10);
      const { current } = waterState();
      localStorage.setItem("dtm_water_" + todayKey(), current + amount);
      renderWater();
    });
  });

  // ---- Calorie ----
  const calorieGoalInput = document.getElementById("calorieGoalInput");
  const calorieAddInput = document.getElementById("calorieAddInput");
  const calorieRing = document.getElementById("calorieRing");
  const calorieCurrentEl = document.getElementById("calorieCurrent");
  const calorieGoalLabel = document.getElementById("calorieGoalLabel");
  const addCalorieBtn = document.getElementById("addCalorieBtn");

  function calorieState() {
    const goal = parseInt(localStorage.getItem("dtm_calorie_goal"), 10) || 2000;
    const current = parseInt(localStorage.getItem("dtm_calorie_" + todayKey()), 10) || 0;
    return { goal, current };
  }

  function renderCalorie() {
    const { goal, current } = calorieState();
    calorieCurrentEl.textContent = current;
    calorieGoalLabel.textContent = goal;
    calorieGoalInput.value = goal;
    setRing(calorieRing, current / goal);
  }

  calorieGoalInput.addEventListener("change", () => {
    const val = parseInt(calorieGoalInput.value, 10);
    if (val > 0) {
      localStorage.setItem("dtm_calorie_goal", val);
      renderCalorie();
    }
  });

  addCalorieBtn.addEventListener("click", () => {
    const val = parseInt(calorieAddInput.value, 10);
    if (val > 0) {
      const { current } = calorieState();
      localStorage.setItem("dtm_calorie_" + todayKey(), current + val);
      calorieAddInput.value = "";
      renderCalorie();
    }
  });

  // ---- Reset ----
  document.getElementById("resetTracker").addEventListener("click", () => {
    localStorage.removeItem("dtm_water_" + todayKey());
    localStorage.removeItem("dtm_calorie_" + todayKey());
    renderWater();
    renderCalorie();
  });

  renderWater();
  renderCalorie();
});
