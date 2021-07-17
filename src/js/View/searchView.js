import {elements} from "./base";
// private function
const renderRecipe = recipe =>{
    console.log(recipe);
    const markup = ` 
        <li>
            <a class="likes__link" href="#${recipe.recipe_id}">
                <figure class="likes__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${recipe.title}</h4>
                    <p class="likes__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>`
        // Ul ruugee nemne
        elements.searchResultList.insertAdjacentHTML("beforeend", markup);

};
// public function
export const clearSearchQuery = () => {
    elements.searchInput.value = '';
};
export const clearSearchResult = () => {
    elements.searchResultList.innerHTML = '';
}
export const getInput = () => elements.searchInput.value;
export const renderRecipes = recipes => {
    recipes.forEach(el => renderRecipe(el));
};