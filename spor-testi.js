const SPOR_QUIZ = [
  {
    q: "Hangi antrenman türü seni daha çok heyecanlandırır?",
    options: [
      "Koşu, bisiklet gibi kalp atışını yükselten hareketler",
      "Ağırlık kaldırma, direnç egzersizleri",
      "Evde, ekipmansız hareket etmek",
      "Bir grupla birlikte yapılan aktiviteler",
    ],
  },
  {
    q: "Spor salonuna gitme konusunda ne düşünüyorsun?",
    options: [
      "Koşu bandı veya bisiklet bana yeter",
      "Ağırlık bölümünde saatlerce kalabilirim",
      "Salona gitmek şart değil, evde de yaparım",
      "Salon yerine grup dersi veya spor kulübünü tercih ederim",
    ],
  },
  {
    q: "Enerjini artırmak için tercih ettiğin hareket nedir?",
    options: [
      "Tempolu yürüyüş veya koşu",
      "Squat, şınav gibi kuvvet hareketleri",
      "Esneme/yoga tarzı ev egzersizleri",
      "Takım sporu veya dans",
    ],
  },
  {
    q: "Antrenman sonrası hangi hissi ararsın?",
    options: [
      "Nefes nefese kalmış, kalori yakmış hissi",
      "Kaslarımın çalıştığını hissetmek",
      "Rahatlamış, esnemiş bir his",
      "Keyifli vakit geçirmiş, motive olmuş hissi",
    ],
  },
  {
    q: "Spor ekipmanı konusunda tercihin nedir?",
    options: [
      "Koşu ayakkabısı yeterli",
      "Dambıl veya direnç bandı gibi ekipmanlar",
      "Ekipmansız, sadece kendi vücut ağırlığım",
      "Ekipmandan çok, birlikte yapacağım biri/grup önemli",
    ],
  },
  {
    q: "Bir haftalık spor programı yapsan neye öncelik verirsin?",
    options: [
      "Haftada birkaç gün kardiyo seansı",
      "Haftada birkaç gün kuvvet/direnç antrenmanı",
      "Kısa, evde yapılabilecek günlük rutin",
      "Grup dersleri veya bir arkadaşla birlikte antrenman",
    ],
  },
  {
    q: "Spor motivasyonun en çok neyden gelir?",
    options: [
      "Dayanıklılığımın arttığını görmekten",
      "Güçlendiğimi hissetmekten",
      "Zaman ve yer esnekliğinden",
      "Sosyal ortam ve birlikte hareket etmekten",
    ],
  },
  {
    q: "Hangi cümle sana daha yakın?",
    options: [
      "Kalbimin hızlandığını hissetmeyi severim",
      "Ağırlıkla çalışmak bana iyi geliyor",
      "Evimde kendi hızımda spor yapmayı tercih ederim",
      "Yalnız spor yapmak bana sıkıcı geliyor",
    ],
  },
];

const SPOR_RESULTS = {
  kardiyo: {
    title: "Kardiyo Sever",
    text: "Kalp atışını yükselten hareketler seni motive ediyor. Koşu, tempolu yürüyüş, bisiklet veya ip atlama gibi kardiyo ağırlıklı bir rutin sana uygun olabilir — Spor Rehberi'ndeki kardiyo/kuvvet karşılaştırmasına göz atabilirsin.",
  },
  kuvvet: {
    title: "Kuvvet Odaklı",
    text: "Direnç ve kuvvet antrenmanları sende daha çok karşılık buluyor. Squat, şınav gibi temel hareketlerle başlayan bir kuvvet programı sana uygun olabilir — form ve dinlenme sürelerine dikkat etmeyi unutma.",
  },
  ev: {
    title: "Ev Sporcusu",
    text: "Ekipmansız, kendi hızında ve evde antrenman yapmak sana daha rahat geliyor. Spor Rehberi'ndeki ev egzersizleri ve 3 günlük başlangıç programı tam sana göre olabilir.",
  },
  sosyal: {
    title: "Sosyal Sporcu",
    text: "Motivasyonun en çok başkalarıyla birlikte hareket etmekten geliyor. Grup dersleri, takım sporları veya bir arkadaşınla birlikte antrenman planı sürdürülebilirliğini artırabilir.",
  },
};

const SPOR_KEYS = ["kardiyo", "kuvvet", "ev", "sosyal"];

function renderSporQuiz() {
  const container = document.getElementById("quiz-form-spor");
  if (!container) return;
  SPOR_QUIZ.forEach((item, i) => {
    const block = document.createElement("div");
    block.className = "quiz-question";
    const optionsHtml = item.options
      .map(
        (opt, j) => `
      <label class="q-option">
        <input type="radio" name="q-spor-${i}" value="${j}">
        <span>${opt}</span>
      </label>
    `
      )
      .join("");
    block.innerHTML = `
      <p class="q-text"><span class="q-num">${i + 1}.</span>${item.q}</p>
      <div class="q-options">${optionsHtml}</div>
    `;
    container.appendChild(block);

    block.querySelectorAll(".q-option").forEach((label) => {
      label.addEventListener("click", () => {
        block.querySelectorAll(".q-option").forEach((l) => l.classList.remove("picked"));
        label.classList.add("picked");
      });
    });
  });
}

function gradeSporQuiz() {
  const scores = { kardiyo: 0, kuvvet: 0, ev: 0, sosyal: 0 };
  let answered = 0;

  SPOR_QUIZ.forEach((item, i) => {
    const selected = document.querySelector(`input[name="q-spor-${i}"]:checked`);
    if (selected) {
      answered++;
      const idx = parseInt(selected.value, 10);
      scores[SPOR_KEYS[idx]]++;
    }
  });

  if (answered === 0) return;

  let winner = SPOR_KEYS[0];
  SPOR_KEYS.forEach((key) => {
    if (scores[key] > scores[winner]) winner = key;
  });

  const result = SPOR_RESULTS[winner];
  const resultBox = document.getElementById("quiz-result-spor");
  resultBox.style.display = "block";
  resultBox.innerHTML = `<div class="r-title">${result.title}</div><p>${result.text}</p>`;
  resultBox.scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSporQuiz();
  const btn = document.getElementById("grade-btn-spor");
  if (btn) btn.addEventListener("click", gradeSporQuiz);
});
