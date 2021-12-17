class Tag {

    /**
     * @param {array} tag 
     */
    constructor(tag) {
        this._tag = tag
    }

    /**
     * Create ingredient tag in HTML
     * @returns {DOMElement}
     */
    get createIngredientTag() {

        /*<div class="tag tag--ingredients" id="XXX">
            <p class="tag_name"></p>
            <i class="tag_icon far fa-times-circle"></i>
        </div>*/

        // Tag
        const tag = document.createElement("div");
        tag.classList.add("tag", "tag--ingredients");
        tag.setAttribute("id", `${this._tag}`);
        tag.style.backgroundColor = "#3282F7";

        // Name
        const tagName = document.createElement("p");
        tagName.classList.add("tag_name");
        tagName.innerHTML = `${this._tag}`;
        tag.appendChild(tagName);

        // Icon
        const tagIcon = document.createElement("i");
        tagIcon.classList.add("tag_icon", "far", "fa-times-circle");
        tag.appendChild(tagIcon);

        return tag
    }

    /**
     * Create apparel tag in HTML
     * @returns {DOMElement}
     */
    get createApparelTag() {

        /*<div class="tag tag--apparels" id="XXX">
            <p class="tag_name"></p>
            <i class="tag_icon far fa-times-circle"></i>
        </div>*/

        // Tag
        const tag = document.createElement("div");
        tag.classList.add("tag", "tag--apparels");
        tag.setAttribute("id", `${this._tag}`);
        tag.style.backgroundColor = "#68D9A4";

        // Name
        const tagName = document.createElement("p");
        tagName.classList.add("tag_name");
        tagName.innerHTML = `${this._tag}`;
        tag.appendChild(tagName);

        // Icon
        const tagIcon = document.createElement("i");
        tagIcon.classList.add("tag_icon", "far", "fa-times-circle");
        tag.appendChild(tagIcon);

        return tag
    }

    /**
     * Create utensil tag in HTML
     * @returns {DOMElement}
     */
    get createUtensilTag() {

        /*<div class="tag tag--utensils" id="XXX">
            <p class="tag_name"></p>
            <i class="tag_icon far fa-times-circle"></i>
        </div>*/

        // Tag
        const tag = document.createElement("div");
        tag.classList.add("tag", "tag--utensils");
        tag.setAttribute("id", `${this._tag}`);
        tag.style.backgroundColor = "#ED6454";

        // Name
        const tagName = document.createElement("p");
        tagName.classList.add("tag_name");
        tagName.innerHTML = `${this._tag}`;
        tag.appendChild(tagName);

        // Icon
        const tagIcon = document.createElement("i");
        tagIcon.classList.add("tag_icon", "far", "fa-times-circle");
        tag.appendChild(tagIcon);

        return tag
    }
}