document.addEventListener("DOMContentLoaded", () => {

  // Tabs
  const tabs = document.querySelectorAll(".calc-tab");
  const panels = document.querySelectorAll(".calc-panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.target).classList.add("active");
    });
  });

  // Segmented control helper
  function setupSegmented(id) {
    const wrap = document.getElementById(id);
    if (!wrap) return { get: () => null };
    const buttons = wrap.querySelectorAll("button");
    let value = wrap.querySelector("button.active")?.dataset.val || buttons[0]?.dataset.val;
    buttons.forEach((b) => {
      b.addEventListener("click", () => {
        buttons.forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        value = b.dataset.val;
      });
    });
    return { get: () => value };
  }

  const kaloriCinsiyet = setupSegmented("kaloriCinsiyet");
  const idealCinsiyet = setupSegmented("idealCinsiyet");
  const makroHedef = setupSegmented("makroHedef");

  function fmt(n) {
    return Math.round(n).toLocaleString("tr-TR");
  }

  // KALORİ / TDEE — Mifflin-St Jeor
  const btnKalori = document.getElementById("btnKalori");
  if (btnKalori) {
    btnKalori.addEventListener("click", () => {
      const yas = parseFloat(document.getElementById("kaloriYas").value);
      const boy = parseFloat(document.getElementById("kaloriBoy").value);
      const kilo = parseFloat(document.getElementById("kaloriKilo").value);
      const aktivite = parseFloat(document.getElementById("kaloriAktivite").value);
      const cinsiyet = kaloriCinsiyet.get();

      if (!yas || !boy || !kilo) return;

      let bmr;
      if (cinsiyet === "erkek") {
        bmr = 10 * kilo + 6.25 * boy - 5 * yas + 5;
      } else {
        bmr = 10 * kilo + 6.25 * boy - 5 * yas - 161;
      }
      const tdee = bmr * aktivite;

      document.getElementById("resKaloriBMR").textContent = fmt(bmr);
      document.getElementById("resKaloriTDEE").textContent = fmt(tdee);
      document.getElementById("resKaloriLose").textContent = fmt(tdee - 500);
      document.getElementById("resKaloriGain").textContent = fmt(tdee + 500);
      document.getElementById("resultKalori").classList.add("show");

      // Prefill makro calculator with this TDEE for convenience
      const makroInput = document.getElementById("makroKalori");
      if (makroInput && !makroInput.value) makroInput.value = Math.round(tdee);
    });
  }

  // BMI
  const btnBmi = document.getElementById("btnBmi");
  if (btnBmi) {
    btnBmi.addEventListener("click", () => {
      const boy = parseFloat(document.getElementById("bmiBoy").value);
      const kilo = parseFloat(document.getElementById("bmiKilo").value);
      if (!boy || !kilo) return;

      const boyM = boy / 100;
      const bmi = kilo / (boyM * boyM);

      let label, color;
      if (bmi < 18.5) { label = "Zayıf"; color = "#ff8a5c"; }
      else if (bmi < 25) { label = "Normal aralık"; color = "#2f9e6e"; }
      else if (bmi < 30) { label = "Fazla kilolu"; color = "#ff8a5c"; }
      else { label = "Obez aralık"; color = "#e0453f"; }

      const valEl = document.getElementById("resBmiValue");
      valEl.textContent = bmi.toFixed(1);
      valEl.style.color = color;
      document.getElementById("resBmiLabel").textContent = label;
      document.getElementById("resultBmi").classList.add("show");
    });
  }

  // MAKRO
  const MAKRO_SPLITS = {
    ver: { protein: 0.35, carb: 0.35, fat: 0.30 },
    koru: { protein: 0.30, carb: 0.40, fat: 0.30 },
    al: { protein: 0.30, carb: 0.45, fat: 0.25 },
  };

  const btnMakro = document.getElementById("btnMakro");
  if (btnMakro) {
    btnMakro.addEventListener("click", () => {
      const kalori = parseFloat(document.getElementById("makroKalori").value);
      if (!kalori) return;
      const split = MAKRO_SPLITS[makroHedef.get()];

      const proteinG = (kalori * split.protein) / 4;
      const carbG = (kalori * split.carb) / 4;
      const fatG = (kalori * split.fat) / 9;

      document.getElementById("resMakroProtein").textContent = fmt(proteinG);
      document.getElementById("resMakroCarb").textContent = fmt(carbG);
      document.getElementById("resMakroFat").textContent = fmt(fatG);

      document.getElementById("macroBarProtein").style.width = split.protein * 100 + "%";
      document.getElementById("macroBarCarb").style.width = split.carb * 100 + "%";
      document.getElementById("macroBarFat").style.width = split.fat * 100 + "%";

      document.getElementById("resultMakro").classList.add("show");
    });
  }

  // İDEAL KİLO — Devine formülü
  const btnIdeal = document.getElementById("btnIdeal");
  if (btnIdeal) {
    btnIdeal.addEventListener("click", () => {
      const boy = parseFloat(document.getElementById("idealBoy").value);
      if (!boy) return;
      const cinsiyet = idealCinsiyet.get();

      const boyInch = boy / 2.54;
      const inchOver5ft = Math.max(0, boyInch - 60);
      const base = cinsiyet === "erkek" ? 50 : 45.5;
      const ideal = base + 2.3 * inchOver5ft;

      document.getElementById("resIdealValue").textContent = ideal.toFixed(1);
      document.getElementById("resultIdeal").classList.add("show");
    });
  }

  // SU
  const btnSu = document.getElementById("btnSu");
  if (btnSu) {
    btnSu.addEventListener("click", () => {
      const kilo = parseFloat(document.getElementById("suKilo").value);
      if (!kilo) return;
      const litre = (kilo * 33) / 1000;
      document.getElementById("resSuValue").textContent = litre.toFixed(1);
      document.getElementById("resultSu").classList.add("show");
    });
  }

});
