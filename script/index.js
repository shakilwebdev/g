const loadCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/categories`;
  const res = await fetch(url);
  const data = await res.json();
  //   console.log(data);
  //   console.log(data.categories);

  displayCategories(data.categories);
};

const displayCategories = (categories) => {
  //   console.log(categories);

  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = "";
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category", "transition", "duration-300", "py-2");
    categoryDiv.innerHTML = `
                    <button>
                      ${category.category_name}
                    </button>
              `;
    categoriesContainer.appendChild(categoryDiv);
  });
};

loadCategories();

const loadALlplants = async () => {
  const url = `https://openapi.programming-hero.com/api/plants`;
  const res = await fetch(url);
  const data = await res.json();
  //   console.log(data);
  console.log(data.plants);

  displayPlants(data.plants);
};

const displayPlants = (plants) => {
  const plantsContainer = document.getElementById("plants-container");
  plantsContainer.innerHTML = "";
  plants.forEach((plant) => {
    const plantsCard = document.createElement("div");
    plantsCard.innerHTML = `
      <div class="p-4 bg-white rounded-lg h-full flex flex-col justify-between">
        <img class="rounded-lg w-full h-full" src="${plant.image}" alt="plants-img">
        <h2 class="text-sm font-semibold my-3">${plant.name}</h2>
        <p class="text-xs">${plant.description}</p>
        <div class="flex items-center justify-between">
          <button class="btn rounded-full border-none text-sm text-[#15803D] bg-[#DCFCE7] my-3">${plant.category}</button>
          <p>৳${plant.price}</p>
        </div>
        <button class="btn border-none text-white bg-[#15803D] w-full rounded-full">Add to Cart</button>
      </div>
    `;
    plantsContainer.appendChild(plantsCard);
  });
};

loadALlplants();
