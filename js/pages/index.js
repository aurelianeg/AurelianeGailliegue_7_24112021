import { recipes } from "../../data/recipes.js";

// ============================== INITIALIZATION ==============================

/**
 * Add element (ingredient, apparel or utensil) only if it isn't already in the details list
 * @param {DOMElement} recipeElement 
 * @param {DOMElement} detailsListElements 
 */
function addElementNotAlreadyListed(recipeElement, detailsListElements) {

    // Check if recipe's element is already in details
    let isElementAlreadyListed = false;
    for (let j = 0; j < detailsListElements.children.length; j++) {
        if (detailsListElements.children[j].children[0].innerHTML == recipeElement.children[0].innerHTML) {
            isElementAlreadyListed = true;
        }
    }
    // Add element in details only if it isn't already in it
    if (isElementAlreadyListed == false) {
        detailsListElements.appendChild(recipeElement);
    }
    else {
        recipeElement.remove();
    }
}


/**
 * Display recipes, ingredients, apparels and utensils based on the filters
 * @param {list} recipes
 */
function displayRecipesIngredientsApparelsAndUtensils(recipes) {

    const recipesList = document.querySelector(".recipes_section");
    const detailsListIngredients = document.querySelector(".details_list--ingredients");
    const detailsListApparels = document.querySelector(".details_list--apparels");
    const detailsListUtensils = document.querySelector(".details_list--utensils");
    
    recipes.forEach(function(recipe) {
        let recipeModel = new Recipe(recipe);

        // Recipes
        let recipeCard = recipeModel.createCard;
        recipesList.appendChild(recipeCard);

        // Ingredients
        let recipeIngredients = recipeModel.createIngredients;
        recipeIngredients.forEach(function(recipeIngredient) {
            addElementNotAlreadyListed(recipeIngredient, detailsListIngredients);
        })
        // Apparels
        let recipeApparel = recipeModel.createApparel;
        addElementNotAlreadyListed(recipeApparel, detailsListApparels);
        // Utensils
        let recipeUtensils = recipeModel.createUtensils;
        recipeUtensils.forEach(function(recipeUtensil) {
            addElementNotAlreadyListed(recipeUtensil, detailsListUtensils);
        })
    })

    // Add a blank div for rendering recipes (not multiple of 3) on wide screens
    const recipeElements = document.querySelectorAll(".recipes");
    if (window.screen.width > 1239) {
        if (recipeElements.length % 3 == 2) {
            let blankDiv = document.createElement("div");
            recipesList.appendChild(blankDiv);
            blankDiv.style.width = "385px";
            blankDiv.style.height = "365px";
            blankDiv.style.marginBottom = "40px";
            blankDiv.style.order = recipeElements.length;
        }
    }
    
    const details = document.querySelectorAll(".details");
    const detailsLists = document.querySelectorAll(".details_list");
    const detailsWidths = [Math.ceil(document.querySelectorAll(".details_list_choice--ingredients").length/10), 
                           Math.ceil(document.querySelectorAll(".details_list_choice--apparels").length/10),
                           Math.ceil(document.querySelectorAll(".details_list_choice--utensils").length/10)];

    // Adapt details widths (based on the numbers of list elements) when opened or closed
    for (let i = 0; i < details.length; i++) {
        details[i].addEventListener("toggle", function(event) {
            if (!details[i].open) {
                details[i].style.width = "160px";
            }
            else {
                details[i].style.width = detailsWidths[i]*200 + "px";
                detailsLists[i].style.width = detailsWidths[i]*200 + "px";

                // Close opened details element if not selected
                for (let j = 0; j < details.length; j++) {
                    if (details[i] != details[j]) {
                        details[j].style.width = "160px";
                        details[j].open = false;
                    }
                }
            }
        })
    } 
}


/**
 * Page initialization
 */
function initPage() {

    displayRecipesIngredientsApparelsAndUtensils(recipes);
    console.log("Initialization done!");
}

initPage();



// ============================== FUNCTIONS AND EVENTS ==============================

/**
 * Filter recipes (with their name, description or ingredients) with user input on the main search
 * @param {list} recipe 
 * @param {string} value 
 * @returns {boolean}
 */
function filterRecipesWithInput(recipe, value) {

    // Get all fields when value is searched (name, description and all ingredients)
    let recipeFields = [recipe.name, recipe.description];
    for (let i = 0; i < recipe.ingredients.length; i++) {
        recipeFields.push(recipe.ingredients[i].ingredient);
    }

    // Return true if value is found in field
    for (let i = 0; i < recipeFields.length; i++) {
        if (recipeFields[i].toLowerCase().includes(value.toLowerCase())) {
            return true;
        }
    }
}


const researchFormInput = document.querySelector(".research_form_input");

researchFormInput.addEventListener("keyup", function() {

    const researchUserValue = researchFormInput.value;
    // Begin research when there are at least 3 characters
    if (researchUserValue.length >= 3) {
        
        // Filter recipes with user input value
        const filteredRecipes = recipes.filter((recipe) => (filterRecipesWithInput(recipe, researchUserValue)));
    
        const recipesList = document.querySelector(".recipes_section");
        const detailsListIngredients = document.querySelector(".details_list--ingredients");
        const detailsListApparels = document.querySelector(".details_list--apparels");
        const detailsListUtensils = document.querySelector(".details_list--utensils");
        // Empty recipes section and details
        recipesList.innerHTML = "";
        detailsListIngredients.innerHTML = "";
        detailsListApparels.innerHTML = "";
        detailsListUtensils.innerHTML = "";

        // Recreate only filtered recipes, ingredients, apparels and utensils
        displayRecipesIngredientsApparelsAndUtensils(filteredRecipes);

        if (recipesList.innerHTML == "") {
            recipesList.innerHTML = 'Aucune recette ne correspond à votre critère...<br>Vous pouvez chercher "tarte aux pommes", "poisson", etc.';
        }
    }
    else {
        displayRecipesIngredientsApparelsAndUtensils(recipes);
    }
})