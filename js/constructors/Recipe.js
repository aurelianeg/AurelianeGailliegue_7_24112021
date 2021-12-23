class Recipe {

    /**
     * @param {array} recipe 
     */
    constructor(recipe) {
        this._id = recipe.id
        this._name = recipe.name
        this._servings = recipe.servings
        this._ingredients = recipe.ingredients
        this._time = recipe.time
        this._description = recipe.description
        this._appliance = recipe.appliance
        this._utensils = recipe.utensils
    }

    /**
     * Create recipe in HTML
     * @returns {DOMElement}
     */
    get createCard() {

        /*<article class="recipes">
            <div class="recipes_picture"></div>
            <div class="recipes_text">
                <div class="recipes_general">
                    <h1 class="recipes_title"></h1>
                    <div class="recipes_time">
                        <i class="recipes_time_icon far fa-clock"></i>
                        <h1 class="recipes_time_text"></h1>
                    </div>
                </div>
                <div class="recipes_details">
                    <ul class="recipes_ingredients">
                        <li class="recipes_ingredients_element"></li>
                        <li class="recipes_ingredients_element"></li>
                        <li class="recipes_ingredients_element"></li>
                    </ul>
                    <p class="recipes_steps"></p>
                </div>
            </div>
        </article>*/

        // Recipe
        const recipe = document.createElement("article");
        recipe.classList.add("recipes");
        recipe.setAttribute("id", `${this._name}`);

        // Picture
        const recipePicture = document.createElement("div");
        recipePicture.classList.add("recipes_picture");
        recipe.appendChild(recipePicture);

        // Text legend
        const recipeText = document.createElement("div");
        recipeText.classList.add("recipes_text");
        recipe.appendChild(recipeText);

        // Text legend first section (title and time)
        const recipeGeneral = document.createElement("div");
        recipeGeneral.classList.add("recipes_general");
        recipeText.appendChild(recipeGeneral);
        // Title
        const recipeTitle = document.createElement("h1");
        recipeTitle.classList.add("recipes_title");
        recipeTitle.innerHTML = `${this._name}`;
        recipeGeneral.appendChild(recipeTitle);
        // Time
        const recipeTime = document.createElement("div");
        recipeTime.classList.add("recipes_time");
        recipeGeneral.appendChild(recipeTime);
        const recipeTimeIcon = document.createElement("i");
        recipeTimeIcon.classList.add("recipes_time_icon", "far", "fa-clock");
        recipeTime.appendChild(recipeTimeIcon);
        const recipeTimeText = document.createElement("h1");
        recipeTimeText.classList.add("recipes_time_text");
        recipeTimeText.innerHTML = `${this._time} min`;
        recipeTime.appendChild(recipeTimeText);

        // Text legend second section (details)
        const recipeDetails = document.createElement("div");
        recipeDetails.classList.add("recipes_details");
        recipeText.appendChild(recipeDetails);
        // Ingredients
        const recipeIngredients = document.createElement("ul");
        recipeIngredients.classList.add("recipes_ingredients");
        for (let i = 0; i < this._ingredients.length; i++) {
            const recipeIngredientsElement = document.createElement("li");
            recipeIngredientsElement.classList.add("recipes_ingredients_element");
            if (this._ingredients[i].unit && this._ingredients[i].quantity) {
                recipeIngredientsElement.innerHTML = `<b>${this._ingredients[i].ingredient}</b> : ${this._ingredients[i].quantity} ${this._ingredients[i].unit}`;
            }
            else if (!this._ingredients.unit && this._ingredients.quantity) {
                recipeIngredientsElement.innerHTML = `<b>${this._ingredients[i].ingredient}</b> : ${this._ingredients[i].quantity}`;
            }
            else {
                recipeIngredientsElement.innerHTML = `<b>${this._ingredients[i].ingredient}</b>`;
            }
            recipeIngredients.appendChild(recipeIngredientsElement);
        }
        recipeDetails.appendChild(recipeIngredients);
        // Steps
        const recipeSteps = document.createElement("p");
        recipeSteps.classList.add("recipes_steps");
        recipeSteps.innerHTML = `${this._description}`;
        recipeDetails.appendChild(recipeSteps);

        return recipe
    }

    get createIngredients()
    {
        //<li><a class="details_list_choice details_list_choice--ingredients" id="XXX" role="option"></a></li>

        const recipeIngredients = [];

        for (let i = 0; i < this._ingredients.length; i++) {
            const recipeIngredient = document.createElement("li");
            recipeIngredient.classList.add("details_list_element", "details_list_element--ingredients");
            recipeIngredient.setAttribute("id", `${this._ingredients[i].ingredient}`);
            recipeIngredients.push(recipeIngredient);
            const recipeIngredientLink = document.createElement("a");
            recipeIngredientLink.classList.add("details_list_choice", "details_list_choice--ingredients");
            recipeIngredientLink.setAttribute("role", "option");
            recipeIngredientLink.innerHTML = `${this._ingredients[i].ingredient}`;
            recipeIngredient.appendChild(recipeIngredientLink);
        }

        return recipeIngredients
    }

    get createApparel()
    {
        //<li><a class="details_list_choice details_list_choice--apparels" id="XXX" role="option"></a></li>

        const recipeApparel = document.createElement("li");
        recipeApparel.classList.add("details_list_element", "details_list_element--apparels");
        recipeApparel.setAttribute("id", `${this._appliance}`);
        const recipeApparelLink = document.createElement("a");
        recipeApparelLink.classList.add("details_list_choice", "details_list_choice--apparels");
        recipeApparelLink.setAttribute("role", "option");
        recipeApparelLink.innerHTML = `${this._appliance}`;
        recipeApparel.appendChild(recipeApparelLink);

        return recipeApparel
    }

    get createUtensils()
    {
        //<li><a class="details_list_choice details_list_choice--utensils" id="XXX" role="option"></a></li>

        const recipeUtensils = [];

        for (let i = 0; i < this._utensils.length; i++) {
            const recipeUtensil = document.createElement("li");
            recipeUtensil.classList.add("details_list_element", "details_list_element--utensils");
            recipeUtensil.setAttribute("id", `${this._utensils[i]}`);
            recipeUtensils.push(recipeUtensil);
            const recipeUtensilLink = document.createElement("a");
            recipeUtensilLink.classList.add("details_list_choice", "details_list_choice--utensils");
            recipeUtensilLink.setAttribute("role", "option");
            recipeUtensilLink.innerHTML = `${this._utensils[i]}`;
            recipeUtensil.appendChild(recipeUtensilLink);
        }

        return recipeUtensils
    }
}