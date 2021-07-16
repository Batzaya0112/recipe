import {elements} from "./base";
// private function
const renderRecipe = recipe =>{
    console.log(recipe.title);
};
// public function
export const getInput = () => elements.searchInput.value;
export const renderRecipes = recipes => {
    recipes.forEach(el => renderRecipe(el));
};