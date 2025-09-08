const loadCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.categories);
  // Load all trees by default
  loadAllTrees(data.categories);
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = `
    <li id="all-tree" class="py-2 block hover:text-white hover:bg-[#1aa54d] cursor-pointer rounded pl-3 bg-[#15803D] text-white">
      All Tree
    </li>
  `;
  categories.forEach((category) => {
    categoriesContainer.innerHTML += `
      <li id="${category.id}" class="py-2 block hover:text-white hover:bg-[#1aa54d] cursor-pointer rounded pl-3">
        ${category.category_name}
      </li>
    `;
  });

  categoriesContainer.addEventListener("click", (e) => {
    const allLi = categoriesContainer.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("bg-[#15803D]", "text-white");
    });

    if (e.target.localName === "li") {
      e.target.classList.add("bg-[#15803D]", "text-white");
      if (e.target.id === "all-tree") {
        loadAllTrees(categories);
      } else {
        loadTreesByCategorie(e.target.id);
      }
    }
  });
};

const loadAllTrees = async (categories) => {
  let allPlants = [];
  for (const category of categories) {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/category/${category.id}`
    );
    const data = await res.json();
    if (data.plants) {
      allPlants = allPlants.concat(data.plants);
    }
  }
  displayPlantsByCategorie(allPlants);
};

const loadTreesByCategorie = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayPlantsByCategorie(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};

// display Plants
const displayPlantsByCategorie = (plants) => {
  const plantsContainer = document.getElementById("plants-container");
  plantsContainer.innerHTML = "";
  plants.forEach((plant) => {
    plantsContainer.innerHTML += `
      <div class="p-4 bg-white rounded-lg h-full flex flex-col justify-between">
        <img class="rounded-lg w-full h-full" src="${plant.image}" alt="plants-img">
        <h2 class="text-sm font-semibold my-3">${plant.name}</h2>
        <p class="text-xs">${plant.description}</p>
        <div id="${plant.id}" class="flex items-center justify-between">
          <button class="btn rounded-full border-none text-sm text-[#15803D] bg-[#DCFCE7] my-3">${plant.category}</button>
          <p>৳<span>${plant.price}</span></p>
        </div>
        <button class="btn border-none text-white bg-[#15803D] w-full rounded-full">Add to Cart</button>
      </div>
    `;
  });
};

// add to card event
const plantsContainer = document.getElementById("plants-container");
plantsContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    handleBookMarkCart(e);
  }
});

// card container
const CartContainer = document.getElementById("cart-container");
let bookMarks = [];
let totalPrice = 0;

// Add to cart handle
const handleBookMarkCart = (e) => {
  // console.log(e.target);
  const title = e.target.parentNode.children[1].innerText;
  const priceTarget = e.target.parentNode.children[3];
  const spanTagPrice = priceTarget.querySelector("span");
  const price = parseInt(spanTagPrice.innerText);

  const id = priceTarget.id;

  bookMarks.push({
    title: title,
    price: price,
    id: id,
  });

  showBookMarksCart(bookMarks);
};

// display card
const showBookMarksCart = (bookMarks) => {
  CartContainer.innerHTML = "";
  totalPrice = 0;
  bookMarks.forEach((bookMark, index) => {
    totalPrice += bookMark.price;
    CartContainer.innerHTML += `
      <div
        class="bg-[#F0FDF4] flex items-center justify-between px-3 py-2 my-3 rounded"
      >
        <div>
          <h5 class="text-sm font-semibold mb-1">${bookMark.title}</h5>
          <p class="text-[#8C8C8C]">৳${bookMark.price}</p>
        </div>
        <button class="cursor-pointer" onclick="handleDeleteBookmarkCart(${index})">
          <i class="fa-solid fa-x text-[#8C8C8C]"></i>
        </button>
      </div>
    `;
  });

  document.getElementById("total-price").innerText = `৳${totalPrice}`;
};

const handleDeleteBookmarkCart = (index) => {
  // delete item
  bookMarks.splice(index, 1);
  showBookMarksCart(bookMarks);
};

// loadCategories
loadCategories();
