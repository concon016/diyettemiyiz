document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("foodQuery");
  const resultsEl = document.getElementById("foodResults");
  const tabs = document.querySelectorAll(".food-search-tabs .calc-tab");
  if (!input || !resultsEl) return;

  let localFoods = [];
  let lastLocalMatches = [];
  let lastWorldMatches = [];
  let activeSource = "hepsi";
  let debounceTimer = null;
  let requestToken = 0;

  fetch("assets/data/turk-yemekleri.json")
    .then((r) => r.json())
    .then((data) => { localFoods = data; })
    .catch(() => { localFoods = []; });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      activeSource = tab.dataset.src;
      render();
    });
  });

  function turkishLower(str) {
    return str.replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase();
  }

  function searchLocal(query) {
    const q = turkishLower(query);
    return localFoods.filter((item) => turkishLower(item.ad).includes(q));
  }

  async function searchWorld(query) {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=8&fields=product_name,nutriments,brands`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("network");
    const data = await res.json();
    return (data.products || [])
      .filter((p) => p.product_name && p.nutriments && p.nutriments["energy-kcal_100g"])
      .map((p) => ({
        ad: p.product_name,
        brand: p.brands || "",
        kcal: Math.round(p.nutriments["energy-kcal_100g"]),
        protein: p.nutriments["proteins_100g"] != null ? Math.round(p.nutriments["proteins_100g"]) : null,
        karbonhidrat: p.nutriments["carbohydrates_100g"] != null ? Math.round(p.nutriments["carbohydrates_100g"]) : null,
        yag: p.nutriments["fat_100g"] != null ? Math.round(p.nutriments["fat_100g"]) : null,
        porsiyon: "100g",
      }));
  }

  function foodCard(item, source) {
    const sourceLabel = source === "turk" ? "Türk Mutfağı" : "Open Food Facts" + (item.brand ? " · " + item.brand : "");
    const macroBits = [];
    if (item.protein != null) macroBits.push(`P: ${item.protein}g`);
    if (item.karbonhidrat != null) macroBits.push(`K: ${item.karbonhidrat}g`);
    if (item.yag != null) macroBits.push(`Y: ${item.yag}g`);
    const macroLine = macroBits.length ? ` · ${macroBits.join(" · ")}` : "";
    return `
      <div class="food-result">
        <div>
          <div class="f-name">${item.ad}</div>
          <div class="f-source">${sourceLabel} · ${item.porsiyon}${macroLine}</div>
        </div>
        <div class="f-kcal">${item.kcal}<span> kcal</span></div>
      </div>
    `;
  }

  function render() {
    let combined = [];
    if (activeSource === "hepsi" || activeSource === "turk") {
      combined = combined.concat(lastLocalMatches.map((i) => ({ item: i, source: "turk" })));
    }
    if (activeSource === "hepsi" || activeSource === "dunya") {
      combined = combined.concat(lastWorldMatches.map((i) => ({ item: i, source: "dunya" })));
    }

    if (!input.value.trim()) {
      resultsEl.innerHTML = `<div class="food-empty">Aramaya başlamak için yukarıya bir besin adı yaz.</div>`;
      return;
    }
    if (combined.length === 0) {
      resultsEl.innerHTML = `<div class="food-empty">Sonuç bulunamadı, farklı bir arama dene.</div>`;
      return;
    }
    resultsEl.innerHTML = combined.map(({ item, source }) => foodCard(item, source)).join("");
  }

  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    const query = input.value.trim();

    if (!query) {
      lastLocalMatches = [];
      lastWorldMatches = [];
      render();
      return;
    }

    debounceTimer = setTimeout(async () => {
      const myToken = ++requestToken;
      lastLocalMatches = searchLocal(query);
      render();

      if (query.length < 2) return;
      resultsEl.insertAdjacentHTML("beforeend", `<div class="food-loading" id="foodLoading">Dünya veritabanında aranıyor...</div>`);

      try {
        const worldResults = await searchWorld(query);
        if (myToken !== requestToken) return;
        lastWorldMatches = worldResults;
        render();
      } catch (e) {
        if (myToken !== requestToken) return;
        const loadingEl = document.getElementById("foodLoading");
        if (loadingEl) loadingEl.remove();
      }
    }, 350);
  });
});
