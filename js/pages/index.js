import { recipes } from "../../data/recipes.js";

// ============================== INITIALIZATION ==============================

/**
 * Add recipe only if it isn't already in the recipes list
 * @param {DOMElement} recipeElement 
 * @param {DOMElement} detailsListElements 
 */
 function addRecipeNotAlreadyListed(recipe, recipesList) {

    // Check if recipe is already in list
    let isRecipeAlreadyListed = false;
    for (let j = 0; j < recipesList.children.length; j++) {
        if (recipesList.children[j].getAttribute("id") == recipe.getAttribute("id")) {
            isRecipeAlreadyListed = true;
        }
    }
    // Add recipe in list only if it isn't already in it
    if (isRecipeAlreadyListed == false) {
        recipesList.appendChild(recipe);
    }
    else {
        recipe.remove();
    }
}


/**
 * Add element (ingredient, apparel or utensil) only if it isn't already in the details list
 * @param {DOMElement} recipeElement 
 * @param {DOMElement} detailsListElements 
 */
function addElementNotAlreadyListed(recipeElement, detailsListElements, tags) {

    let isElementAlreadyListed = false;
    // Check if recipe's element is already in tags
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].getAttribute("id") == recipeElement.getAttribute("id")) {
            isElementAlreadyListed = true;
        }
    }
    // Check if recipe's element is already in details
    for (let j = 0; j < detailsListElements.children.length; j++) {
        if (detailsListElements.children[j].getAttribute("id") == recipeElement.getAttribute("id")) {
            isElementAlreadyListed = true;
        }
    }
    // Add element in details only if it isn't already in details or tags
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

    // Empty recipes section and details
    const recipesList = document.querySelector(".recipes_section");
    const detailsListIngredients = document.querySelector(".details_list--ingredients");
    const detailsListApparels = document.querySelector(".details_list--apparels");
    const detailsListUtensils = document.querySelector(".details_list--utensils");
    recipesList.innerHTML = "";
    detailsListIngredients.innerHTML = "";
    detailsListApparels.innerHTML = "";
    detailsListUtensils.innerHTML = "";
    const tags = document.querySelectorAll(".tag");
    
    recipes.forEach(function(recipe) {
        let recipeModel = new Recipe(recipe);

        // Recipes
        let recipeCard = recipeModel.createCard;
        addRecipeNotAlreadyListed(recipeCard, recipesList);

        // Ingredients
        let recipeIngredients = recipeModel.createIngredients;
        recipeIngredients.forEach(function(recipeIngredient) {
            addElementNotAlreadyListed(recipeIngredient, detailsListIngredients, tags);
        })
        // Apparels
        let recipeApparel = recipeModel.createApparel;
        addElementNotAlreadyListed(recipeApparel, detailsListApparels, tags);
        // Utensils
        let recipeUtensils = recipeModel.createUtensils;
        recipeUtensils.forEach(function(recipeUtensil) {
            addElementNotAlreadyListed(recipeUtensil, detailsListUtensils, tags);
        })
    })

    if (recipesList.innerHTML == "") {
        recipesList.innerHTML = 'Aucune recette ne correspond à votre critère...<br>Vous pouvez chercher "tarte aux pommes", "poisson", etc.';
    }
    if (detailsListIngredients.innerHTML == "") {
        detailsListIngredients.innerHTML = 'Aucun autre ingrédient ne peut être rajouté.';
    }
    if (detailsListApparels.innerHTML == "") {
        detailsListApparels.innerHTML = 'Aucun autre appareil ne peut être rajouté.';
    }
    if (detailsListUtensils.innerHTML == "") {
        detailsListUtensils.innerHTML = 'Aucun autre ustensile ne peut être rajouté.';
    }

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
        details[i].addEventListener("toggle", function() {
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

    for (let k = 0; k < details.length; k++) {
        details[k].open = false;
    }

    // Listen to details list choices which are recreated at each filter
    listenToDetailsChoicesEvents();
    // Listen to tag icons which are created
    //listenToTagIconsEvents();
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
 * Filter recipes (with their name, description or ingredients) with a given value
 * @param {list} recipe 
 * @param {string} value 
 * @returns {boolean}
 */
function filterRecipes(recipe, value) {

    // Get all fields when value is searched (name, description and all ingredients
    // + appliance and all utensils or it can't work)
    let recipeFields = [recipe.name, recipe.description, recipe.appliance];
    for (let i = 0; i < recipe.ingredients.length; i++) {
        recipeFields.push(recipe.ingredients[i].ingredient);
    }
    for (let j = 0; j < recipe.utensils.length; j++) {
        recipeFields.push(recipe.utensils[j]);
    }

    // Return true if value is found in field
    for (let k = 0; k < recipeFields.length; k++) {
        if (recipeFields[k].toLowerCase().includes(value.toLowerCase())) {
            return true;
        }
    }
}

let filteredInputRecipes = [];
let filteredTagRecipes = [];

const researchFormInput = document.querySelector(".research_form_input");

researchFormInput.addEventListener("keyup", function() {

    const researchUserValue = researchFormInput.value;
    // Begin research when there are at least 3 characters
    if (researchUserValue.length >= 3) {
        
        // Filter recipes with user input value
        // If recipes were already filtered with a tag
        if (filteredTagRecipes.length != 0) {
            filteredInputRecipes = filteredTagRecipes.filter((recipe) => (filterRecipes(recipe, researchUserValue)));
            console.log("Filtered with tag");
        }
        // If recipes were not filtered with input search or with a tag
        else {
            filteredInputRecipes = recipes.filter((recipe) => (filterRecipes(recipe, researchUserValue)));
            console.log("Not filtered with tag");
        }

        // Empty and recreate only filtered recipes, ingredients, apparels and utensils
        displayRecipesIngredientsApparelsAndUtensils(filteredInputRecipes);

    }
    else {
        displayRecipesIngredientsApparelsAndUtensils(recipes);
    }
})

/**
 * Listen to details list choices events, which are recreated at each filter
 */
function listenToDetailsChoicesEvents() {

    const tagList = document.querySelector(".tag_section");
    const detailsListChoices = document.querySelectorAll(".details_list_choice");

    detailsListChoices.forEach(function(detailsListChoice) {
        detailsListChoice.addEventListener("click", function() {

            // Tag creation
            let tagName = detailsListChoice.innerHTML;
            let tagModel = new Tag(tagName);
            let tag;
            if (detailsListChoice.classList.contains("details_list_choice--ingredients")) {
                tag = tagModel.createIngredientTag;
            }
            else if (detailsListChoice.classList.contains("details_list_choice--apparels")) {
                tag = tagModel.createApparelTag;
            }
            else if (detailsListChoice.classList.contains("details_list_choice--utensils")) {
                tag = tagModel.createUtensilTag;
            }
            tagList.appendChild(tag);

            // Filter recipes with tag
            // If recipes were already filtered with input search
            if (filteredInputRecipes.length != 0) {
                filteredTagRecipes = filteredInputRecipes.filter((recipe) => (filterRecipes(recipe, tagName)));
                console.log("Filtered with input search");
            }
            // If recipes were not filtered with input search but were already filtered with a tag
            else if (filteredInputRecipes.length == 0 && filteredTagRecipes.length != 0) {
                filteredTagRecipes = filteredTagRecipes.filter((recipe) => (filterRecipes(recipe, tagName)));
                console.log("Not filtered with input search but filtered with tag");
            }
            // If recipes were not filtered with input search or with a tag
            else if (filteredInputRecipes.length == 0 && filteredTagRecipes.length == 0) {
                filteredTagRecipes = recipes.filter((recipe) => (filterRecipes(recipe, tagName)));
                console.log("Not filtered with input search or tag");
            }

            // Recreate only filtered recipes, ingredients, apparels and utensils
            displayRecipesIngredientsApparelsAndUtensils(filteredTagRecipes); 
        })
    })
}


/**
 * Listen to tag icons events
 */
function listenToTagIconsEvents() {

    const tagIcons = document.querySelectorAll(".tag_icon");

    tagIcons.forEach(function(tagIcon) {
        tagIcon.addEventListener("click", function() {
            // Tag removal
            tagIcon.parentElement.remove();
        })
    })
}