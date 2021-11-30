const randomMealListEl = document.getElementById("randomMeals");
const mealofthedayEl = document.getElementById("Day_meal_container");
const searchTextEl = document.getElementById("searchText");
const randomHeaderEl = document.getElementById("randomHeader");
const fav_meal_ulEl = document.getElementById("fav_meal_ul");
const randomMealsMoreContainerEl = document.getElementById("more_random_meal_container");

const get_more_Btn = document.getElementById("get_More_btn");
const searchBtnEl = document.getElementById("searchBtn");

let mealID = 52857;


addToFavorite();
displayRandomMeal(6, randomMealListEl)
getMealByID(mealID);

searchBtnEl.addEventListener("click", () => {
    let text = searchTextEl.value;
    getMealBySearch(text);
})

get_more_Btn.addEventListener("click", async () => {
    let data = await getRandomMeal(6)
    let x = `<section class="random_meal_container">
                <ul id="randomMealsMore">
                ${data}
                </ul>
            </section>
        `;

    randomMealsMoreContainerEl.innerHTML += x;
    
})


async function displayRandomMeal(num, ele){
    let temp = await getRandomMeal(num);

    ele.innerHTML =temp;
}

async function getRandomMeal(num){
    let meals = '';
    
    for (let i = 0; i < num; i++) {
        const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await resp.json();
    const randomMealdata = respData.meals[0];
    ;
    meals += addMeal(randomMealdata)
    }
    
    return meals
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
                    <h3 id="IdName">${mealdata.strMeal}</h3>
                    <p >${randomMealIns} </p>
                    <div class="recipeBtn">
                    
                        <button class="btn1"><a href="${mealdata.strYoutube}" target="_blank" rel="noopener noreferrer">Get Recipe</a></button>
                        <button onclick="addFromIDToLocalStorage(this)" class="btn2">Add To Favorite</button>
                    </div>
                </div>
            </div>
    `;


    return meal;

}


function addMeal(Mealdata){
    const randomMealIns = slicingString(Mealdata.strInstructions,16) + "...";
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
                <a href="${Mealdata.strYoutube}" target="_blank" rel="noopener noreferrer"><button class="btn1">Get Recipe</button></a>
                <button onclick="addToLocalStorage(this)" class="btn2">Add To Favorite</button>
            </div>
        </div>
    </li>
    `;

    return meal

}


function addToFavorite(){
    let meals = '';
    let getData = '';
    let dataKeys = Object.keys(localStorage);
    for (let i = 0; i < dataKeys.length; i++) {
        getData = JSON.parse(localStorage.getItem(dataKeys[i]));
        

        meals +=`
        <li>
            <a href="${getData.dishSrc}" target="_blank" rel="noopener noreferrer">
                <img src="${getData.dishImg}" alt="">
                <span>${getData.dishName}</span>
            </a>
            <button onclick="removeFromLocalStorage(this)" class="clsBtn">x</button>
        </li>
    
    `;
    }

    fav_meal_ulEl.innerHTML = meals; 
    
}

 

function removeFromLocalStorage(ele){
    let x = ele.parentNode.childNodes[1].childNodes[3].innerText;


    localStorage.removeItem(x);
    addToFavorite();
}

function addToLocalStorage(ele){
    let data={};
    let dishname = ele.parentNode.parentNode.childNodes[1].innerText;
    let dishimg = ele.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].src;
    let dishsrc = ele.parentNode.childNodes[1].href;
    data.dishName = dishname;
    data.dishImg = dishimg;
    data.dishSrc = dishsrc;

    data = JSON.stringify(data);

    
    localStorage.setItem(dishname, data);
    ele.style.color = "#fbc85b";
    ele.style.backgroundColor = "#4e534f";
    ele.style.border = "none";
    ele.style.cursor = "not-allowed";
    ele.innerText = "ADDED";
    ele.disable = true;

    addToFavorite();

}

function addFromIDToLocalStorage(ele){
    let data={};
    let dishname = ele.parentNode.parentNode.childNodes[1].innerText;
    let dishimg = ele.parentNode.parentNode.parentNode.childNodes[1].src;
    let dishsrc = ele.parentNode.childNodes[1].childNodes[0].href;
    data.dishName = dishname;
    data.dishImg = dishimg;
    data.dishSrc = dishsrc;

    data = JSON.stringify(data);
    
    
    localStorage.setItem(dishname, data);
    ele.style.color = "#fbc85b";
    ele.style.backgroundColor = "#4e534f";
    ele.style.border = "none";
    ele.style.cursor = "not-allowed";
    ele.innerText = "ADDED";
    ele.disable = true;
    addToFavorite();
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
