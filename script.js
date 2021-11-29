const randomMealListEl = document.getElementById("randomMeals");
const mealofthedayEl = document.getElementById("Day_meal_container");
const searchBtnEl = document.getElementById("searchBtn");
const searchTextEl = document.getElementById("searchText");
const randomHeaderEl = document.getElementById("randomHeader");



getRandomMeal(6)
getMealByID(52857);

searchBtnEl.addEventListener("click", () => {
    let text = searchTextEl.value;
    getMealBySearch(text);
})


async function getRandomMeal(num){
    let meals = '';
    
    for (let i = 0; i < num; i++) {
        const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await resp.json();
    const randomMealdata = respData.meals[0];
    ;
    meals += addMeal(randomMealdata)
    }
    
    randomMealListEl.innerHTML = meals
}

async function getMealByID(id){
    let meal ='';
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const respData = await resp.json();
    const idMealdata = respData.meals[0];
    meal = addmealbyid(idMealdata);

    mealofthedayEl.innerHTML = meal;
}



async function getMealBySearch(term){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);
    const respData = await resp.json();
    const randomMealDatas = respData.meals;

    let meals = "";

    for (let i = 0; i < randomMealDatas.length; i++) {
        let randomMealData = randomMealDatas[i];
        meals += addMeal(randomMealData);
    }

    randomMealListEl.innerHTML = "";
    randomMealListEl.innerHTML = meals;

    randomHeaderEl.innerText = "Search Results"
}


function addmealbyid(mealdata){
    const randomMealIns = slicingString(mealdata.strInstructions,30) + "...";

    let meal =`
    <div class="Day_meal_text">
                <h2>Recipe</h2>
                <div>of<br><span>the</span></div>
                <h2>Day</h2>
            </div>

    <div class="bottom_container">
                <img src="${mealdata.strMealThumb}" alt="${mealdata.strMeal}">

                <div class="right_container">
                    <h3 >${mealdata.strMeal}</h3>
                    <p >${randomMealIns} </p>
                    <div class="recipeBtn">
                    
                        <button class="btn1"><a href="${mealdata.strYoutube}" target="_blank" rel="noopener noreferrer">Get Recipe</a></button>
                        <button class="btn2">Add To Favorite</button>
                    </div>
                </div>
            </div>
    `;
    
    return meal;

}

function addMeal(Mealdata){
    const randomMealIns = slicingString(Mealdata.strInstructions,20) + "...";
    const randomMealName = slicingString(Mealdata.strMeal,4) ;

    let meal = `
    <li>
        <div class="top_container">
            <img src=${Mealdata.strMealThumb} alt="${randomMealName}">
        </div>
        <div class="bottom_container">
            <h2 class="name_of_the_dish">${randomMealName}</h2>
            <p class="discription">${randomMealIns}</p>
            <div>
                <button class="btn1"><a href="${Mealdata.strYoutube}" target="_blank" rel="noopener noreferrer">Get Recipe</a></button>
                <button class="btn2">Add To Favorite</button>
            </div>
        </div>
    </li>
    `;

    return meal

}

function slicingString(str, num) { 
    let temp = str.split(" ");
    let x = '';
    for (let i = 0; i < num; i++) {
        if(temp[i] == undefined){
            temp[i] = '';
        }
        x += temp[i] + " ";
        
    }
  return x
}