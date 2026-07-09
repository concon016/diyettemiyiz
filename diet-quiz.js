const DIET_QUIZ = [
  {
    q: "Hafta sonu akşam yemeği planın nasıl olur?",
    options: [
      "Ne varsa ondan yerim, kısıtlama yapmam",
      "Zeytinyağlı bir sebze yemeği + salata",
      "Yüksek proteinli, düşük karbonhidratlı bir tabak",
      "Sebze ağırlıklı, et içermeyen bir tabak",
    ],
  },
  {
    q: "Alışveriş listende olmazsa olmaz nedir?",
    options: [
      "Neyi seveceğime göre değişir, sabit liste yapmam",
      "Zeytinyağı, sebze, balık",
      "Tavuk göğsü, yumurta, yeşil sebze",
      "Baklagil, tofu, kuruyemiş",
    ],
  },
  {
    q: "Ekmek/tahıl konusunda tavrın nedir?",
    options: [
      "Miktarı önemli değil, dengeyi başka yerden kurarım",
      "Tam tahıl, ölçülü şekilde severim",
      "Mümkün olduğunca azaltırım",
      "Tam tahıllı olsun yeter, miktarı dert etmem",
    ],
  },
  {
    q: "Bir arkadaşın seni akşam yemeğine davet etti, ne yaparsın?",
    options: [
      "Ne ikram edilirse yerim, keyfini çıkarırım",
      "Zeytinyağlı mezelere yönelirim",
      "Menüde proteine ve sebzeye odaklanırım, ekmekten kaçınırım",
      "Etsiz bir seçenek var mı diye sorarım",
    ],
  },
  {
    q: "Spor yapmadan önce/sonra genelde ne tüketirsin?",
    options: [
      "Elimde ne varsa",
      "Meyve + kuruyemiş",
      "Protein tozu veya yumurta beyazı",
      "Bitkisel protein shake veya baklagil",
    ],
  },
  {
    q: "Tatlı krizine nasıl yaklaşırsın?",
    options: [
      "Ölçülü yerim, günlük hedefime sığdırırım",
      "Meyve veya bal ile tatlı ihtiyacımı gideririm",
      "Mümkün olduğunca uzak dururum",
      "Vegan/bitkisel bir tatlı ararım",
    ],
  },
  {
    q: "Beslenmede en çok neye önem verirsin?",
    options: [
      "Sürdürülebilirlik ve esneklik",
      "Denge ve çeşitlilik",
      "Net kurallar ve disiplin",
      "Etik/çevresel kaygılar",
    ],
  },
  {
    q: "İdeal bir kahvaltı sence neye benzer?",
    options: [
      "Elde ne varsa hızlıca hazırlarım",
      "Zeytin, peynir, domates, tam tahıllı ekmek",
      "Yumurta + avokado, ekmeksiz",
      "Yulaf, bitkisel süt, meyve",
    ],
  },
];

const DIET_RESULTS = {
  esnek: {
    title: "Dengeli & Esnek",
    text: "Katı kurallardan çok sürdürülebilirliği önemsiyorsun. Esnek diyet (IIFYM) yaklaşımı — günlük makro hedeflerine uyduğun sürece besin seçiminde özgür olmak — sana uygun olabilir. Besin kalitesini de göz ardı etmemeye dikkat et.",
  },
  akdeniz: {
    title: "Akdeniz Ruhlusu",
    text: "Zeytinyağı, sebze ve dengeli çeşitlilik senin tarzın. Akdeniz diyeti, kısıtlayıcı olmayan ve sürdürülebilir yapısıyla tam sana göre olabilir.",
  },
  disiplinli: {
    title: "Disiplinli & Yapılandırılmış",
    text: "Net kurallar ve kontrol senin motivasyon kaynağın. Düşük karbonhidratlı beslenme yaklaşımı yapına uygun olabilir — başlamadan önce dengeli bir geçiş planı yapmayı unutma.",
  },
  bitki: {
    title: "Doğal & Bitki Dostu",
    text: "Etik ve doğal beslenme senin için önemli. Bitki bazlı (vejetaryen/vegan) beslenme sana uygun olabilir — özellikle B12, demir ve protein alımını dengeli planlamaya dikkat et.",
  },
};

const DIET_KEYS = ["esnek", "akdeniz", "disiplinli", "bitki"];

function renderDietQuiz() {
  const container = document.getElementById("quiz-form");
  if (!container) return;
  DIET_QUIZ.forEach((item, i) => {
    const block = document.createElement("div");
    block.className = "quiz-question";
    const optionsHtml = item.options
      .map(
        (opt, j) => `
      <label class="q-option">
        <input type="radio" name="q${i}" value="${j}">
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

function gradeDietQuiz() {
  const scores = { esnek: 0, akdeniz: 0, disiplinli: 0, bitki: 0 };
  let answered = 0;

  DIET_QUIZ.forEach((item, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected) {
      answered++;
      const idx = parseInt(selected.value, 10);
      scores[DIET_KEYS[idx]]++;
    }
  });

  if (answered === 0) return;

  let winner = DIET_KEYS[0];
  DIET_KEYS.forEach((key) => {
    if (scores[key] > scores[winner]) winner = key;
  });

  const result = DIET_RESULTS[winner];
  const resultBox = document.getElementById("quiz-result");
  resultBox.style.display = "block";
  resultBox.innerHTML = `<div class="r-title">${result.title}</div><p>${result.text}</p>`;
  resultBox.scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  renderDietQuiz();
  const btn = document.getElementById("grade-btn");
  if (btn) btn.addEventListener("click", gradeDietQuiz);
});
