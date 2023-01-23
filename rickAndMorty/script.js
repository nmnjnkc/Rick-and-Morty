let currentPage = 1;
let maxPage = 0;

const wrapper = document.createElement("div");
wrapper.id = "wrapper";
document.body.prepend(wrapper);

const header = document.createElement("header");
wrapper.append(header);

const headerImg = document.createElement("img");
headerImg.src =
  "https://occ-0-1068-1723.1.nflxso.net/dnm/api/v6/TsSRXvDuraoJ7apdkH6tsHhf-ZQ/AAAABbtnw6C35mhluezr-K_FiP65TW93xpH0M3S6lKPv50_7eshzc1vosWxE3CxcnJ5-eVYmpcaQyra9yFLzQtsNx4odwYO-GtDDmDU0.png?r=47e";
header.append(headerImg);

const main = document.createElement("main");
wrapper.append(main);

const nav = document.createElement("nav");
wrapper.append(nav);

const btnMinus = document.createElement("button");
btnMinus.textContent = "<";
btnMinus.value = "-";
nav.append(btnMinus);

const buttonKeeper = document.createElement("div");
buttonKeeper.id = "btnKeeper";
nav.append(buttonKeeper);

const btnPlus = document.createElement("button");
btnPlus.textContent = ">";
btnPlus.value = "+";
nav.append(btnPlus);

for (let i = 1; i <= 5; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;

  btn.value = i;

  btn.classList = "pageBtn";
  buttonKeeper.append(btn);
  btn.addEventListener("click", changePage);
}

const btns = Array.from(document.getElementsByClassName("pageBtn"));

function buildPage() {
  fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
    .then((res) => res.json())
    .then((data) => handleResponse(data));
}

buildPage();

function handleResponse(data) {
  for (let key of data.results) {
    const card = document.createElement("div");
    const charImage = document.createElement("img");
    const infoSection = document.createElement("section");
    const charName = document.createElement("h2");
    const charStatus = document.createElement("p");
    const charGender = document.createElement("span");
    const charSpecies = document.createElement("span");

    card.classList = "card";
    charStatus.classList = "hidden";
    charGender.classList = "hidden";
    charSpecies.classList = "hidden";

    if (key.status === "Dead") {
      charStatus.classList.add("dead");
    }

    charImage.src = key.image;
    charImage.classList = key.status.toLowerCase();

    charName.textContent = key.name;
    charStatus.textContent = key.status;
    charGender.textContent = key.gender;
    charSpecies.textContent = key.species;

    card.append(charImage);
    card.append(infoSection);
    infoSection.append(charName);
    infoSection.append(charStatus);
    infoSection.append(charGender);
    infoSection.append(charSpecies);

    main.append(card);
    maxPage = data.info.pages;

    card.addEventListener("mouseenter", () => {
      charStatus.classList.remove("hidden");
      charGender.classList.remove("hidden");
      charSpecies.classList.remove("hidden");
    });

    card.addEventListener("mouseleave", () => {
      charStatus.classList.add("hidden");
      charGender.classList.add("hidden");
      charSpecies.classList.add("hidden");
    });
  }
}

btnMinus.addEventListener("click", changePage);
btnPlus.addEventListener("click", changePage);

function changePage() {
  main.innerHTML = "";

  if (this.value === "+" && currentPage < maxPage) {
    btns.forEach((btn) => {
      btn.textContent = parseInt(btn.textContent) + 1;
      btn.value = parseInt(btn.value) + 1;
    });
    currentPage++;
  } else if (this.value === "-" && currentPage > 1) {
    btns.forEach((btn) => {
      btn.textContent = parseInt(btn.textContent) - 1;
      btn.value = parseInt(btn.value) - 1;
    });
    currentPage--;
  } else {
    currentPage = this.value;
    if (currentPage >= 3 && currentPage <= maxPage - 2) {
      btns.forEach((btn, x) => {
        btn.textContent = parseInt(currentPage) + parseInt(x) - 2;
        btn.value = parseInt(currentPage) + parseInt(x) - 2;
        console.log(btn.textContent);
      });
    }
  }
  buildPage();
}

fetch("https://rickandmortyapi.com/api/character")
  .then((res) => res.json())
  .then((data) => console.log(data));
