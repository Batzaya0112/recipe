import {elements} from "./View/base";
// private function
const renderRecipes = (recipe) =>{
    console.log(recipe.title);
}
// public function
export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes) =>{
    recipes.array.forEach(element => {
        //recipes.forEach(el => renderRecipes(el));
        recipes.forEach(renderRecipes);
    });
}