const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");

let travelData = {};

fetch("./travel_recommendation_api.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch API Data");
    }
    return res.json();
  })
  .then((data) => {
    travelData = data;
  })
  .catch((err) => {
    console.error("Error: ", err.message);
  });

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const keywords = searchInput.value.trim().toLowerCase();
  searchResult.innerHTML = "";

  if (!keywords) return;

  if (keywords.includes("beach")) {
    showRecommendations(travelData.beaches, "Beaches");
  } else if (keywords.includes("temple")) {
    showRecommendations(travelData.temples, "Temples");
  } else {
    const matchedCountry = travelData.countries.find(
      (country) => country.name.toLowerCase() === keywords
    );
    if (matchedCountry) {
      showRecommendations(matchedCountry.cities, matchedCountry.name);
    } else {
      searchResult.innerHTML = `<p>No results found for "<strong>${keyword}</strong>"</p>`;
    }
  }
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";
  searchResult.innerHTML = "";
});

function showRecommendations(list, title) {
  let html = `<h2>Recommended ${title}</h2>`;
  html += `<div class="recommendation-grid">`;
  list.slice(0, 2).forEach((item) => {
    html += `<div class="recommendation-card">
          <img src="${item.imageUrl}" alt="${item.name}" />
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <button>View</button>
        </div>`;
  });
  html += `</div>`;
  searchResult.innerHTML = html;
}
