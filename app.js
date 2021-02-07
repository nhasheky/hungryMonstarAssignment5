//searchFoodItems Function
const searchFoodItems = (items) => {
  const foodMeals = items.meals;
  if (foodMeals) {
    items.meals.forEach((item) => {
      const itemName = item.strMeal;
      const itemImg = item.strMealThumb;
      const itemId = item.idMeal;
      const mealItemDiv = document.createElement("div");
      mealItemDiv.className = "col-md-3 item-colum";

      let foodHtml = `
                    <div onclick="foodInfo(${itemId})" class="card rounded-3 border-0" >
                        <img src="${itemImg}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h6 class="card-title food-title text-center">${itemName}</h6>
                        </div>
                    </div>
                  
                    `;
      mealItemDiv.innerHTML = foodHtml;

      const parentNode = document.getElementById("food-items");
      parentNode.appendChild(mealItemDiv);
    });
  }

  else {
    const notFoundDivison = document.getElementById("not-found-div");
    notFoundDivison.style.display = "block";
  }
};

// Searching event
document.getElementById("search").addEventListener("click", function () {
  const itemName = document.getElementById("input").value;

  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + itemName)
    .then((res) => res.json())
    .then((data) => {
      removeItems();
      searchFoodItems(data);
    });
    
    document.getElementById("input").value = "";
});


//removeItem Function
function removeItems() {
  document.getElementById("food-details").innerText = "";
  const notFoundDivison = document.getElementById("not-found-div");
  notFoundDivison.style.display = "none";
  const parentNode = document.getElementById("food-items");
  parentNode.innerText = "";
}

const foodInfo = (id) => {
  document.getElementById("food-details").innerText = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      const foods = Object.keys(meal);
      const foodArray = [];
      const strMeasureArray = [];
      foods.forEach((element) => {
        if (
          element.startsWith("strIngredient") &&
          meal[element] != null &&
          meal[element] != ""
        ) {
          foodArray.push(meal[element]);
        }
      });

      foods.forEach((element) => {
        if (
          element.startsWith("strMeasure") &&
          meal[element] != " " &&
          meal[element] != "" &&
          meal[element] != null
        ) {
          strMeasureArray.push(meal[element]);
        }
      });

      const showIngredient = document.getElementById(
        "food-details");
      const foodItem = document.createElement("div");

      const informationHtml = `
        <div class="row d-flex justify-content-center-flex justify-content-center">
                <div class="col-md-5 info">
                    <div class="info-image">
                        <img src="${meal.strMealThumb}" width="100%" alt="">
                    </div>
                  
                        <h1>${meal.strMeal}</h1><br>
                        <h5 >Ingredients</h5><br>
                    <div id="ingredient-list">
                  
                    </div>                  
                </div>
         </div>
    
        `;
      foodItem.innerHTML = informationHtml;
      showIngredient.appendChild(foodItem);

      const foodList = document.getElementById("ingredient-list");
      let foodInfo = " ";

      foodArray.forEach((ingredient, index) => {
        const measure = strMeasureArray[index];
        

        foodInfo += `
            <p><i class="fa fa-hand-o-right" aria-hidden="true"></i> ${measure} ${ingredient} </p>
            `;
      });

      foodList.innerHTML = foodInfo;
    });
};


