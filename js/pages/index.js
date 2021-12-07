import { recipes } from "../../data/recipes.js";

// ============================== INITIALIZATION ==============================

/**
 * Display all recipes, ingredients, apparels and utensils
 */
function initPage() {

    const recipesList = document.querySelector(".recipes_section");
    const selectMenuListIngredients = document.querySelector(".select_menu_list--ingredients");
    const selectMenuListApparels = document.querySelector(".select_menu_list--apparels");
    const selectMenuListUtensils = document.querySelector(".select_menu_list--utensils");
    
    recipes.forEach(function(recipe) {
        let recipeModel = new Recipe(recipe);

        // Recipes
        let recipeCard = recipeModel.createCard;
        recipesList.appendChild(recipeCard);

        // Ingredients
        let recipeIngredients = recipeModel.createIngredients;
        for (let i = 0; i < recipeIngredients.length; i++) {
            let recipeIngredient = recipeIngredients[i];
            // Check if recipe's utensil is already in select
            let isIngredientAlreadyListed = false;
            for (let j = 0; j < selectMenuListIngredients.children.length; j++) {
                if (selectMenuListIngredients.children[j].children[0].innerHTML == recipeIngredient.children[0].innerHTML) {
                    isIngredientAlreadyListed = true;
                }
            }
            // Add apparel in select only if it isn't already in it
            if (isIngredientAlreadyListed == false) {
                selectMenuListIngredients.appendChild(recipeIngredient);
            }
            else {
                recipeIngredient.remove();
            }
        }

        // Apparels
        let recipeApparel = recipeModel.createApparel;
        // Check if recipe's apparel is already in select
        let isApparelAlreadyListed = false;
        for (let j = 0; j < selectMenuListApparels.children.length; j++) {
            if (selectMenuListApparels.children[j].children[0].innerHTML == recipeApparel.children[0].innerHTML) {
                isApparelAlreadyListed = true;
            }
        }
        // Add apparel in select only if it isn't already in it
        if (isApparelAlreadyListed == false) {
            selectMenuListApparels.appendChild(recipeApparel);
        }
        else {
            recipeApparel.remove();
        }

        // Utensils
        let recipeUtensils = recipeModel.createUtensils;
        for (let i = 0; i < recipeUtensils.length; i++) {
            let recipeUtensil = recipeUtensils[i];
            // Check if recipe's utensil is already in select
            let isUtensilAlreadyListed = false;
            for (let j = 0; j < selectMenuListUtensils.children.length; j++) {
                if (selectMenuListUtensils.children[j].children[0].innerHTML == recipeUtensil.children[0].innerHTML) {
                    isUtensilAlreadyListed = true;
                }
            }
            // Add apparel in select only if it isn't already in it
            if (isUtensilAlreadyListed == false) {
                selectMenuListUtensils.appendChild(recipeUtensil);
            }
            else {
                recipeUtensil.remove();
            }
        }
    })

    const selects = document.querySelectorAll(".select");
    const selectInputs = document.querySelectorAll(".select_input");
    const selectMenus = document.querySelectorAll(".select_menu");
    const selectMenuListChoicesIngredients = document.querySelectorAll(".select_menu_list_choice--ingredients");
    const selectMenuListChoicesApparels = document.querySelectorAll(".select_menu_list_choice--apparels");
    const selectMenuListChoicesUtensils = document.querySelectorAll(".select_menu_list_choice--utensils");
    const selectIngredientsWidth = Math.ceil(selectMenuListChoicesIngredients.length/40);
    const selectApparelsWidth = Math.ceil(selectMenuListChoicesApparels.length/10);
    const selectUtensilsWidth = Math.ceil(selectMenuListChoicesUtensils.length/10);
    const selectWidths = [selectIngredientsWidth, selectApparelsWidth, selectUtensilsWidth];
    
    // Adapt select menu widths (based on the numbers of list elements) when opened and close select if opened
    window.addEventListener("click", function(event) {
        for (let i = 0; i < selects.length; i++) {
            if (selectInputs[i].checked == true) {
                if (event.target == selectInputs[i])
                {
                    selects[i].style.width = selectWidths[i]*200 + "px";
                    selectMenus[i].style.width = selectWidths[i]*200 + "px";
                }
                else {
                    selectInputs[i].checked = false;
                    selects[i].style.width = "160px";
                }
            }
        }
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

    console.log("Initialization done!");
}

initPage();