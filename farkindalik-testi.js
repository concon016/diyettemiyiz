const FARK_QUIZ = [
  {
    q: "Öğün planlaması yapıyor musun?",
    options: [
      "Hiç düşünmem, aklıma ne gelirse yerim",
      "Bazen düşünürüm ama genelde anlık karar veririm",
      "Genelde günü kabaca planlarım",
      "Haftalık/günlük olarak öğünlerimi önceden planlarım",
    ],
  },
  {
    q: "Ürün etiketi okuma alışkanlığın var mı?",
    options: [
      "Hiç bakmam",
      "Nadiren, sadece kalori yazıyorsa bakarım",
      "Genelde şeker/yağ oranına bakarım",
      "Düzenli olarak içerik ve etiketi kontrol ederim",
    ],
  },
  {
    q: "Su tüketimine dikkat ediyor musun?",
    options: [
      "Susadığımda içerim, takip etmem",
      "Ara sıra düşünürüm",
      "Günde yaklaşık ne kadar içtiğimi bilirim",
      "Hedef koyar ve takip ederim",
    ],
  },
  {
    q: "Porsiyon miktarına dikkat eder misin?",
    options: [
      "Tabağım dolana kadar yerim",
      "Bazen fazla yediğimi fark ederim",
      "Genelde ölçülü yemeye çalışırım",
      "Porsiyonlarımı bilinçli şekilde ayarlarım",
    ],
  },
  {
    q: "İşlenmiş gıda tüketimine karşı tutumun nedir?",
    options: [
      "Fark etmez, pratik olan neyse onu yerim",
      "Ara sıra dikkat ederim",
      "Mümkün olduğunca az işlenmiş gıda tercih ederim",
      "Bilinçli olarak taze/az işlenmiş gıdaya yönelirim",
    ],
  },
  {
    q: "Kendi kalori/besin ihtiyacın hakkında fikrin var mı?",
    options: [
      "Hiç bilmiyorum",
      "Kabaca bir fikrim var",
      "Yaklaşık kalori ihtiyacımı biliyorum",
      "Kalori ve makro ihtiyacımı hesapladım/biliyorum",
    ],
  },
  {
    q: "Yemek yerken dikkatini nereye verirsin?",
    options: [
      "Telefon/TV ile dikkatim dağınık olur",
      "Bazen dikkatlice yerim",
      "Genelde yemeğe odaklanırım",
      "Bilinçli yeme (mindful eating) alışkanlığım var",
    ],
  },
  {
    q: "Sağlık/beslenme bilgini nereden güncel tutuyorsun?",
    options: [
      "Takip etmem",
      "Ara sıra sosyal medyada rastladıklarımı okurum",
      "Güvenilir kaynaklardan bilgi edinmeye çalışırım",
      "Düzenli olarak güvenilir kaynaklardan takip eder/danışırım",
    ],
  },
];

const FARK_RESULTS = [
  {
    max: 8,
    title: "Başlangıç Seviyesi",
    text: "Beslenme konusunda henüz çok fazla düşünmüyorsun, bu tamamen normal — herkes bir yerden başlar. Küçük adımlarla ilerlemek isteyebilirsin: Hesaplama Merkezi'nden günlük kalori ihtiyacını öğrenmek iyi bir ilk adım olabilir.",
  },
  {
    max: 16,
    title: "Orta Seviye",
    text: "Beslenmene zaman zaman dikkat ediyorsun ama bunu tutarlı bir alışkanlığa dönüştürmemişsin. Günlük Takip sayfasıyla su/kalori takibini düzene sokmayı deneyebilirsin.",
  },
  {
    max: 24,
    title: "İleri Seviye",
    text: "Beslenmen hakkında oldukça bilinçlisin ve bunu günlük alışkanlıklarına yansıtıyorsun. Bu farkındalığı korumak için Besin Veritabanı ve Diyet Türleri sayfalarındaki içerikleri keşfetmeye devam edebilirsin.",
  },
];

function renderFarkQuiz() {
  const container = document.getElementById("quiz-form-fark");
  if (!container) return;
  FARK_QUIZ.forEach((item, i) => {
    const block = document.createElement("div");
    block.className = "quiz-question";
    const optionsHtml = item.options
      .map(
        (opt, j) => `
      <label class="q-option">
        <input type="radio" name="q-fark-${i}" value="${j}">
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

function gradeFarkQuiz() {
  let score = 0;
  let answered = 0;

  FARK_QUIZ.forEach((item, i) => {
    const selected = document.querySelector(`input[name="q-fark-${i}"]:checked`);
    if (selected) {
      answered++;
      score += parseInt(selected.value, 10);
    }
  });

  if (answered === 0) return;

  const result = FARK_RESULTS.find((tier) => score <= tier.max);
  const resultBox = document.getElementById("quiz-result-fark");
  resultBox.style.display = "block";
  resultBox.innerHTML = `<div class="r-title">${result.title}</div><p>${result.text}</p>`;
  resultBox.scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFarkQuiz();
  const btn = document.getElementById("grade-btn-fark");
  if (btn) btn.addEventListener("click", gradeFarkQuiz);
});
