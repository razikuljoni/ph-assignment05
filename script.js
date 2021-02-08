const showFood = () => {
    const searchInput = document.getElementById("search-box").value;
    const foodItems = document.getElementById("food-items");
    foodItems.innerHTML = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then((res) => res.json())
        .then((data) => {
            data.meals.forEach((foodItem) => {
                const foodBox = document.createElement("div");
                foodBox.className = "food-box";
                const thumb = foodItem.strMealThumb;
                const foodName = foodItem.strMeal;
                foodBox.innerHTML = `
                    <div class = "details" onclick="showDetails('${foodName}')">
                        <div class="food-icon">
                            <img src="${thumb}" alt="">
                        </div>
                        <h5 class="food-name">${foodName}</h5>
                    </div>
                `;
                foodItems.appendChild(foodBox);
            });
        })
        .catch((error) => alert("Please give a valid food name"));
};

const showDetails = (name) => {
    const container = document.getElementById("details");
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then((res) => res.json())
        .then((data) => {
            const item = data.meals[0];
            container.innerHTML = `
            <div class = "detail-modal">
                <p class = "detail-back" onclick="hideDetails()">&larr; &larr; Back to main page </p>
                <div class="detail-img-container">
                    <img class="detail-img" src="${item.strMealThumb}" alt="">
                </div>
                <h2 class="detail-heading">${item.strMeal}</h2>
                <h5 class="detail-heading-2">Ingredients</h5>
                <ul class="details-ul">
                    <li class="details-li">${item.strIngredient1}</li>
                    <li class="details-li">${item.strIngredient2}</li>
                    <li class="details-li">${item.strIngredient3}</li>
                    <li class="details-li">${item.strIngredient4}</li>
                    <li class="details-li">${item.strIngredient5}</li>
                    <li class="details-li">${item.strIngredient6}</li>
                    <li class="details-li">${item.strIngredient7}</li>
                    <li class="details-li">${item.strIngredient8}</li>
                    <li class="details-li">${item.strIngredient9}</li>
                    <li class="details-li">${item.strIngredient10}</li>
                </ul>
            </div>
            `;
        });
};

const btn = document.getElementById("search-btn");
btn.addEventListener("click", showFood);

const hideDetails = () => {
    document.querySelector(".detail-modal").style.display = "none";
};
