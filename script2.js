//pagination
const itemsArray = [
  {
    image: "img/pets-katrine.png",
    text: "Katrine",
    buttonLabel: "Learn more",
    buttonClass: "custom-button",
  },
  {
    image: "img/pets-jennifer.png",
    text: "Jennifer",
    buttonLabel: "Learn more",
    buttonClass: "custom-button",
  },
  {
    image: "img/pets-woody.png",
    text: "Woody",
    buttonLabel: "Learn more",
    buttonClass: "custom-button",
  },
  {
    image: "img/pets-katrine(2).png",
    text: "Sophia",
    buttonLabel: "Learn more",
    buttonClass: "custom-button",
  },
  {
    image: "img/pets-timmy.png",
    text: "Timmy",
    buttonLabel: "Learn more",
    buttonClass: "custom-button",
  },
  {
    image: "img/pets-charly.png",
    text: "Charly",
    buttonLabel: "Learn more",
    buttonClass: "custom-button",
  },
  {
    image: "img/pets-scarlet.png",
    text: "Scarlett",
    buttonLabel: "Learn more",
    buttonClass: "custom-button",
  },
  {
    image: "img/pets-katrine(1).png",
    text: "Freddie",
    buttonLabel: "Learn more",
    buttonClass: "custom-button",
  },
];

const repeatedItems = [];
itemsArray.forEach((item) => {
  for (let i = 0; i < 6; i++) {
    repeatedItems.push(item);
  }
});

const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.querySelector(".pets_slider2");
const nextButton = document.getElementById("next-button");
const lastButton = document.getElementById("last-button");
const prevButton = document.getElementById("prev-button");
const firstButton = document.getElementById("first-button");

let paginationLimit = calculatePaginationLimit();
let pageCount = Math.ceil(repeatedItems.length / paginationLimit);
let currentPage = 1;

const disableButton = (button) => {
  if (button) {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
  }
};

const enableButton = (button) => {
  if (button) {
    button.classList.remove("disabled");
    button.setAttribute("disabled", true);
  }
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
    disableButton(firstButton);
  } else {
    enableButton(prevButton);
    enableButton(firstButton);
  }
  if (currentPage === pageCount) {
    disableButton(nextButton);
    disableButton(lastButton);
  } else {
    enableButton(nextButton);
    enableButton(lastButton);
  }
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const updateCurrentPageNumber = () => {
  const paginationNumbers = document.getElementById("pagination-numbers");
  if (paginationNumbers) {
    const currentNumber = paginationNumbers.querySelector(".current-number");
    if (currentNumber) {
      paginationNumbers.removeChild(currentNumber);
    }
    const currentNumberElement = document.createElement("button");
    currentNumberElement.className = "pagination-number current-number";
    currentNumberElement.innerHTML = currentPage;
    paginationNumbers.appendChild(currentNumberElement);
  }
};

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);
};

const getPaginationNumbers = () => {
  appendPageNumber(currentPage);
};

const setCurrentPage = (pageNum) => {
  if (pageNum === 1) {
    disableButton(prevButton);
    disableButton(firstButton);
  } else {
    enableButton(prevButton);
    enableButton(firstButton);
  }

  currentPage = pageNum;
  currentPageItems = [];

  if (currentPage > pageCount) {
    pageCount = currentPage;
  }

  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;
  paginatedList.innerHTML = "";
  while (currentPageItems.length < paginationLimit) {
    const randomIndex = Math.floor(Math.random() * itemsArray.length);
    const item = itemsArray[randomIndex];

    if (
      !currentPageItems.some((currentItem) => currentItem.image === item.image)
    ) {
      currentPageItems.push(item);
    }
  }

  currentPageItems.forEach((itemData) => {
    const card = document.createElement("div");
    card.className = "card";

    const image = document.createElement("img");
    image.src = itemData.image;
    card.appendChild(image);

    const text = document.createElement("p");
    text.textContent = itemData.text;
    card.appendChild(text);

    const button = document.createElement("button");
    button.textContent = itemData.buttonLabel;
    button.className = itemData.buttonClass;
    card.appendChild(button);

    paginatedList.appendChild(card);
  });

  updateCurrentPageNumber();
};

function calculatePaginationLimit() {
  if (window.innerWidth > 1250) {
    return 8;
  } else if (window.innerWidth > 775) {
    return 6;
  } else {
    return 3;
  }
}

window.addEventListener("load", () => {
  shuffleArray(itemsArray);
  setCurrentPage(1);
  handlePageButtonsStatus();
  updateButtonStyles();

  function updateButtonStyles() {
    if (currentPage === 1) {
      prevButton.classList.add("style-arrows");
      firstButton.classList.add("style-arrows");
      lastButton.classList.remove("style-arrows");
      nextButton.classList.remove("style-arrows");
    } else if (currentPage > 1) {
      prevButton.classList.remove("style-arrows");
      firstButton.classList.remove("style-arrows");
      lastButton.classList.remove("style-arrows");
      nextButton.classList.remove("style-arrows");
    }
    if (currentPage === pageCount) {
      prevButton.classList.remove("style-arrows");
      firstButton.classList.remove("style-arrows");
      lastButton.classList.add("style-arrows");
      nextButton.classList.add("style-arrows");
    }
  }
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      updateButtonStyles();
    }
  });

  firstButton.addEventListener("click", () => {
    if (currentPage > 1) {
      setCurrentPage(1);
      updateButtonStyles();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
      updateButtonStyles();
    }
  });

  lastButton.addEventListener("click", () => {
    if (currentPage < pageCount) {
      setCurrentPage(pageCount);
    }
    handlePageButtonsStatus();
    updateButtonStyles();
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });

  window.addEventListener("resize", () => {
    paginationLimit = calculatePaginationLimit();
    pageCount = Math.ceil(repeatedItems.length / paginationLimit);
    setCurrentPage(1);
    handlePageButtonsStatus();
    updateButtonStyles();
  });
});
