let blur = document.querySelector(".blur");
let header_burger = document.querySelectorAll(".header_burger, .header_link");
let header_menu = document.querySelector(".header_menu");

blur.addEventListener("click", function () {
  header_menu.classList.remove("active");
  blur.classList.remove("show");
  header_burger.forEach(function (item) {
    item.classList.remove("active");
  });
  document.body.style.overflow = null;
});

header_burger.forEach(function (item) {
  item.onclick = function () {
    blur.classList.toggle("show");
    item.classList.toggle("active");
    header_menu.classList.toggle("active");
    document.body.style.overflow = "hidden";
    if (!header_menu.classList.contains("active")) {
      blur.classList.remove("show");
      document.body.style.overflow = null;
    }
  };
});

let header_links = document.querySelectorAll(".header_link, .header_link1");
header_links.forEach(function (link) {
  link.onclick = function () {
    header_burger.forEach(function (item) {
      item.classList.remove("active");
    });
    header_menu.classList.remove("active");
    blur.classList.remove("show");
    document.body.style.overflow = null;
  };
});

function ShowModal(index, params) {
  document.body.style.overflow = "hidden";
  let modal = document.querySelector(".modal");
  let blur = document.querySelector(".blur");
  modal.classList.add("show");
  blur.classList.add("show");

  document.querySelector(".modal-name").innerHTML = `<h2>${params.name}</h2>`;
  document.querySelector(".modal-type").innerHTML = `<p>${params.type}</p>`;
  let images = [
    "img/pets-katrine.png",
    "img/pets-jennifer.png",
    "img/pets-woody.png",
    "img/pets-katrine(2).png",
    "img/pets-timmy.png",
    "img/pets-charly.png",
    "img/pets-scarlet.png",
    "img/pets-katrine(1).png",
  ];
  let img = `<img src="${images[index]}" alt="${params.name}">`;
  document.querySelector(".modal-img").innerHTML = img;
  document.querySelector(
    ".modal-description"
  ).innerHTML = `<p>${params.description}</p>`;
  document.querySelector(
    ".modal-age"
  ).innerHTML = `<p> <span class="marker">&#9679;</span><span class="infotext">Age:</span> ${params.age}</p>`;
  document.querySelector(
    ".modal-inoculations"
  ).innerHTML = `<p> <span class="marker">&#9679;</span><span class="infotext">Inoculations:</span> ${params.inoculations}</p>`;
  document.querySelector(
    ".modal-diseases"
  ).innerHTML = `<p> <span class="marker">&#9679;</span><span class="infotext">Diseases:</span> ${params.diseases}</p>`;
  document.querySelector(
    ".modal-parasites"
  ).innerHTML = `<p> <span class="marker">&#9679;</span><span class="infotext">Parasites:</span> ${params.parasites}</p>`;
  modal.style.display = "flex";

  blur.classList.add("show");
  blur.addEventListener("click", () => {
    modal.style.display = "none";
    blur.classList.remove("show");
    document.body.style.overflow = "";
  });

  let close = document.querySelector(".close");
  if (close) {
    close.addEventListener("click", () => {
      modal.style.display = "none";
      blur.classList.remove("show");
      close.classList.remove("show");
      document.body.style.overflow = "";
    });
  }
}
function HideModal() {
  let modal = document.querySelector(".modal");
  let blur = document.querySelector(".blur");
  modal.classList.remove("show");
  blur.classList.remove("show");
}

const petsSlider = document.querySelectorAll(".pets_slider");
const preBtn = document.querySelectorAll(".arrow1");
const nxtBtn = document.querySelectorAll(".arrow2");
let containerWidth;
let isAnimating = false;

function shuffleCards(container) {
  for (let i = container.children.length; i >= 0; i--) {
    container.appendChild(container.children[(Math.random() * i) | 0]);
  }
}

petsSlider.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener("click", () => {
    if (!isAnimating) {
      isAnimating = true;
      item.style.transition = "transform 0.9s ease-in-out";
      item.style.transform = `translateX(-${containerWidth + 90}px)`;
      setTimeout(() => {
        shuffleCards(item);
        item.style.transition = "transform 0.9s ease-in-out";
        item.style.transform = "translateX(0)";
        isAnimating = false;
      }, 900);
    }
  });

  preBtn[i].addEventListener("click", () => {
    if (!isAnimating) {
      isAnimating = true;
      item.style.transition = "transform 0.9s ease-in-out";
      item.style.transform = `translateX(${containerWidth + 90}px)`;
      setTimeout(() => {
        shuffleCards(item);
        item.style.transition = "transform 0.9s ease-in-out";
        item.style.transform = "translateX(0)";
        isAnimating = false;
      }, 900);
    }
  });

  shuffleCards(item);
});

function resetSliderPosition() {
  petsSlider.forEach((item) => {
    item.style.transform = "translateX(0)";
  });
}
