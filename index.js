const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");
const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";
let x = 1;
async function fetchImages(query) {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}
function createImageElement(result) {
  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add("search-result");
  const image = document.createElement("img");
  image.src = result.urls.small;
  image.alt = result.alt_description;
  const imageLink = document.createElement("a");
  imageLink.href = result.links.html;
  imageLink.target = "_blank";
  imageLink.textContent = result.alt_description;
  imageWrapper.appendChild(image);
  imageWrapper.appendChild(imageLink);
  return imageWrapper;
}
async function searchImages() {
  const inputData = searchInputEl.value;
  const results = await fetchImages(inputData);
  if (x === 1) {
    searchResultsEl.innerHTML = "";
  }
  results.forEach((result) => {
    const imageElement = createImageElement(result);
    searchResultsEl.appendChild(imageElement);
  });
  x++;
  if (results.length === 0) {
    showMoreButtonEl.style.display = "none";
  } else {
    showMoreButtonEl.style.display = "block";
  }
}
formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  page = 1;
  await searchImages();
});
showMoreButtonEl.addEventListener("click", async () => {
  await searchImages();
});
