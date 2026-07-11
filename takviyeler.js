document.addEventListener("DOMContentLoaded", () => {

  // Tab switching
  const tabs = document.querySelectorAll(".supp-tab");
  const panels = document.querySelectorAll(".supp-panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.target).classList.add("active");
    });
  });

  // Supplement data
  const SUPPLEMENTS = [
    {
      ad: "Whey Protein (Konsantre)",
      icerik: "Süt bazlı, hızlı sindirilen protein tozu; genelde %70-80 protein içerir, az miktarda laktoz ve yağ barındırır.",
      yararlar: ["Kolay ve pratik protein kaynağı", "Kas onarımını ve toparlanmayı destekler", "Diğer türlere göre daha uygun fiyatlı"],
      dezavantajlar: ["Laktoz intoleransı olanlarda şişkinlik/rahatsızlık yapabilir", "Bazı ürünlerde şeker/tatlandırıcı oranı yüksek olabilir"],
      kullanim: "Antrenman sonrası veya güne yeterli protein eklemekte zorlananlar için — günlük toplam protein hedefine ulaşmaya yardımcı bir araçtır, tek başına bir 'çözüm' değildir.",
    },
    {
      ad: "Whey İzole",
      icerik: "Whey proteinin daha fazla filtrelenmiş hali; %90+ protein oranı, çok düşük laktoz ve yağ içerir.",
      yararlar: ["Laktoza duyarlı olanlar için daha uygun", "Konsantreye göre biraz daha hızlı emilir"],
      dezavantajlar: ["Konsantreye göre belirgin şekilde daha pahalıdır", "Sağladığı ekstra fayda çoğu kullanıcı için fiyat farkını her zaman karşılamayabilir"],
      kullanim: "Laktoz hassasiyeti olan veya antrenman sonrası en hızlı emilimi önemseyen kişiler için değerlendirilebilir.",
    },
    {
      ad: "Kazein (Casein)",
      icerik: "Süt bazlı, whey'in aksine çok yavaş sindirilen bir protein türü.",
      yararlar: ["Saatler süren yavaş amino asit salınımı sağlar", "Uzun süreli tokluk hissi verebilir"],
      dezavantajlar: ["Whey'e göre çok daha yavaş etki eder", "Antrenman sonrası acil ihtiyaç için ideal değildir"],
      kullanim: "Genellikle gece yatmadan önce, uzun süreli (uyku boyunca) protein desteği için tüketilir.",
    },
    {
      ad: "BCAA (Dallı Zincirli Amino Asitler)",
      icerik: "Lösin, izolösin ve valin — kasların yapı taşı olan 3 esansiyel amino asit.",
      yararlar: ["Antrenman sırasında/sonrasında kas yıkımını azaltmaya yardımcı olabileceği düşünülür"],
      dezavantajlar: ["Günlük yeterli protein (whey dahil) alan biri için ekstra faydası oldukça sınırlıdır", "Ayrı bir 'mucize' etkisi olduğu abartılıdır"],
      kullanim: "Sadece toplam protein alımı düşük olan veya aç karnına uzun süre antrenman yapan kişilerde anlamlı olabilir; yeterli protein alan çoğu kişi için gerekli değildir.",
    },
    {
      ad: "Kreatin (Creatine Monohydrate)",
      icerik: "Kaslarda hızlı enerji üretimine (ATP) katkı sağlayan doğal bir bileşik; kırmızı ette de az miktarda doğal olarak bulunur.",
      yararlar: ["En çok araştırılan ve güvenliği en iyi kanıtlanmış takviyelerden biri", "Kısa süreli patlayıcı güç ve performansa katkı sağlar", "Kas hacminde artışa yardımcı olabilir"],
      dezavantajlar: ["Kullanım başında hafif su tutulumu/şişkinlik hissi olabilir", "Böbrek rahatsızlığı olanlar mutlaka önce hekimine danışmalı"],
      kullanim: "Genellikle günlük 3-5g ile sürekli kullanılır; en çok fayda kuvvet ve patlayıcı güç odaklı sporcularda gözlenir.",
    },
    {
      ad: "Glutamin (L-Glutamine)",
      icerik: "Vücutta doğal olarak en bol bulunan amino asit.",
      yararlar: ["Bağırsak sağlığı ve bağışıklık sistemiyle ilişkilendirilir", "Yoğun antrenman sonrası toparlanmaya destek olabileceği düşünülür"],
      dezavantajlar: ["Sporcularda performans artışına dair kanıtlar BCAA/kreatine göre çok daha zayıftır", "Dengeli beslenen biri zaten yeterli glutamini gıdadan alır"],
      kullanim: "Kanıt düzeyi düşük olduğu için 'gerekli' bir takviye sayılmaz, isteğe bağlı ve düşük öncelikle değerlendirilebilir.",
    },
    {
      ad: "Kolajen (Collagen)",
      icerik: "Cilt, eklem ve bağ dokusunun yapı taşı olan bir protein türü; genelde hidrolize edilmiş 'kolajen peptidi' formunda satılır.",
      yararlar: ["Cilt elastikiyeti üzerine olumlu çalışmalar mevcuttur", "Eklem sağlığına destek olabileceği düşünülür"],
      dezavantajlar: ["Kas yapımı için 'tam' bir protein kaynağı değildir (bazı esansiyel amino asitler eksiktir)", "Whey'in yerine geçecek bir kas geliştirme takviyesi değildir"],
      kullanim: "Cilt/eklem desteği hedefleyenler için; kas geliştirmeyi hedefleyenlerin ana protein kaynağı olarak kullanmaması önerilir.",
    },
    {
      ad: "Omega-3 (Balık Yağı)",
      icerik: "EPA ve DHA içeren, vücudun kendi üretemediği çoklu doymamış yağ asitleri.",
      yararlar: ["Kalp-damar sağlığıyla ilişkilendirilir", "Beyin fonksiyonları ve iltihap dengesine katkı sağlayabilir"],
      dezavantajlar: ["Yüksek dozda hafif kan sulandırıcı etkisi olabilir"],
      kullanim: "Düzenli yağlı balık tüketmeyenler için değerlendirilebilir; kan sulandırıcı ilaç kullananlar hekimine danışmalı.",
    },
    {
      ad: "Multivitamin / Multimineral",
      icerik: "Birden fazla vitamin ve minerali bir arada içeren genel amaçlı takviye.",
      yararlar: ["Beslenmesi dengesiz olanlarda genel açıkları kapatmaya yardımcı olabilir"],
      dezavantajlar: ["Dengeli beslenen biri için genelde gereksizdir", "Yağda çözünen bazı vitaminlerin gereksiz yere fazla alınması birikim riski taşır"],
      kullanim: "Kan tahlilinde belirli bir eksiklik saptanmadan, sırf 'olur da eksiğim vardır' diyerek rastgele kullanılması önerilmez.",
    },
    {
      ad: "Beta-Alanin",
      icerik: "Kaslarda karnosin seviyesini artırarak asit birikimini geciktirmeye yardımcı olan bir amino asit.",
      yararlar: ["Yüksek yoğunluklu, 1-4 dakika süren egzersizlerde yorgunluğu geciktirmeye yardımcı olabilir"],
      dezavantajlar: ["Ciltte geçici karıncalanma hissi (parestezi) yapabilir — zararsızdır ama rahatsız edici olabilir"],
      kullanim: "Çoklu tekrarlı, yüksek yoğunluklu kuvvet antrenmanı yapanlarda değerlendirilebilir.",
    },
    {
      ad: "L-Karnitin",
      icerik: "Yağların hücrede enerjiye dönüştürülme sürecinde rol oynayan bir bileşik.",
      yararlar: ["'Yağ yakımını hızlandırır' iddiasıyla yaygın şekilde satılır"],
      dezavantajlar: ["Sağlıklı bireylerde belirgin bir yağ kaybı sağladığına dair bilimsel kanıt zayıftır", "Tek başına 'yağ yakıcı' olarak güvenilmemelidir"],
      kullanim: "Kalori dengesi ve düzenli egzersiz olmadan tek başına anlamlı bir etkisi beklenmemelidir.",
    },
    {
      ad: "Kafein / Pre-Workout",
      icerik: "Merkezi sinir sistemini uyaran bir bileşik; çoğu pre-workout ürününün ana etken maddesidir.",
      yararlar: ["Odaklanmayı artırır", "Algılanan yorgunluğu azaltarak antrenman performansına katkı sağlayabilir"],
      dezavantajlar: ["Fazla tüketimde çarpıntı, huzursuzluk, uyku bozukluğu yapabilir", "Düzenli kullanımda tolerans gelişebilir"],
      kullanim: "Antrenmandan 30-45 dakika önce alınması yaygındır; öğleden sonranın geç saatlerinde tüketimi uyku kalitesini bozabileceğinden dikkatli olunmalı.",
    },
  ];

  const grid = document.getElementById("suppGrid");
  if (grid) {
    grid.innerHTML = SUPPLEMENTS.map((s) => `
      <div class="supp-card">
        <h3>${s.ad}</h3>
        <p class="supp-desc">${s.icerik}</p>
        <div class="supp-section">
          <span class="supp-label good">YARARLARI</span>
          <ul>${s.yararlar.map((y) => `<li>${y}</li>`).join("")}</ul>
        </div>
        <div class="supp-section">
          <span class="supp-label warn">DİKKAT EDİLMESİ GEREKENLER</span>
          <ul>${s.dezavantajlar.map((d) => `<li>${d}</li>`).join("")}</ul>
        </div>
        <div class="supp-section">
          <span class="supp-label">NE ZAMAN KULLANILMALI</span>
          <p class="supp-usage">${s.kullanim}</p>
        </div>
      </div>`).join("");
  }

});
