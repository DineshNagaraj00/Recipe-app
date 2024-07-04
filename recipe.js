const recipeDetails = document.getElementById("recipe-details");
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

async function fetchRecipeDetails(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    const meal = data.meals[0];

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    recipeDetails.innerHTML = `
    <div class="recipe-detail">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h2>${meal.strMeal}</h2>
        <p>${meal.strInstructions}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
    </div>`;
}

fetchRecipeDetails(recipeId);
