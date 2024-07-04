const searchInput=document.getElementById("search");
const recipeContainer=document.getElementById('recipe_container');

searchInput.addEventListener('input',()=>{
    const query=searchInput.value;
    fetchRecipes(query);
})

async function fetchRecipes(query){
    recipeContainer.innerHTML="";
    const response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data=await response.json();

    if(data.meals){
        data.meals.forEach(meal =>{
            const recipeElement=document.createElement('div');
            recipeElement.classList.add('recipe')
            recipeElement.innerHTML=`
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h2>${meal.strMeal}</h2>
                <p>${meal.strInstructions.substring(0, 100)}...</p>
                <button onclick="viewRecipe(${meal.idMeal})">View Recipe</button>`;
                recipeContainer.appendChild(recipeElement);
        })
    }
    else{
        recipeContainer.innerHTML = '<p>No recipes found. Try another search.</p>';
    }
}
function viewRecipe(id) {
    window.location.href = `recipe.html?id=${id}`;
}

// Fetch initial recipes
fetchRecipes('');