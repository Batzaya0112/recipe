require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./View/base";
import * as searchView from "./View/searchView";
import * as listView from "./View/listView";
import Recipe from "./Model/Recipe";
import List from "./Model/List";
import { renderRecipe, clearRecipe, highLightSelectedRecipe } from './View/recipeView'

/**
 * web app төлөв
 * - Хайлтын query, үр дүн
 * - Тухайн үзүүлж байгаа жор
 * - Таалагдсан жорууд
 * - Захиалж байгаа жорын найрлаганууд
 */
const state = {};
/*
* Хайлтын контроллер = Model ==> Controller/index.js/ <== View
*/
const controlSearch = async () => {
    //1. Вэбээс хайлтын түлхүүр үгийг гаргаж авна.
    const query = searchView.getInput();

    if (query) {
        //2. Шинэ хайлтын обьектыг үүсгэж өгнө.
        state.search = new Search(query);

        //3. Хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ.
        searchView.clearSearchQuery();
        searchView.clearSearchResult();
        renderLoader(elements.searchResultDiv);

        //4. Хайлтыг гүйцэтгэнэ.
        await state.search.doSearch();
        //5. Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
        clearLoader();
        if (state.search.result === undefined) alert('Хайлт илэрцгүй...');
        else searchView.renderRecipes(state.search.result);
    }


};
elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});
elements.pageButtons.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");

    if (btn) {
        const gotoPageNumber = parseInt(btn.dataset.goto, 10);
        searchView.clearSearchResult();
        searchView.renderRecipes(state.search.result, gotoPageNumber);
    }
});
/*
* Жорын контроллер
*/const controlRecipe = async () => {
    // 1. URL-аас ID-ийг салгана.
    const id = window.location.hash.replace('#', '');
    //URL дээр ID байгаа эсэхийг шалгана
    if (id) {
        // 2. Жорын моделыг үүсгэж өгнө.
        state.recipe = new Recipe(id);
        // 3. UI дэлгэцийг бэлтгэнэ.
        clearRecipe();
        renderLoader(elements.recieDiv);
        highLightSelectedRecipe(id);
        // 4. Жороо татаж авчирна.
        await state.recipe.getRecipe();
        // 5. Жорыг гүйцэтгэх хугацаа болон орцыг тооцоолно.
        clearLoader();
        state.recipe.calcTime();
        state.recipe.calcHuniiToo();
        // 6. Жорыг дэлгэцэнд гаргана.
        renderRecipe(state.recipe);
    }

}
//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
/**
 * Найрлаганы контроллер
 */
const controlList = () => {
    //найрлаганы моделийг үүсгэнэ.
    state.list = new List();
    //Өмнө харагдаж байгаа жорны бүх найрлагыг дэлгэцнээс цэвэрлэнэ
    listView.cleatItems();
    //Уг модел рүү одоо харагдаж байгаа жорны бүх найрлагыг авч хийнэ.
    state.recipe.ingredients.forEach(n => {
        //Тухайн найрлагыг модел рүү хийнэ
        const item = state.list.addItem(n);
        //Тухайн найрлагыг дэлгэцэнд гаргана
        listView.renderItem(item);
    });
};
elements.recieDiv.addEventListener('click', e => {
    if (e.target.matches(".recipe__btn, .recipe__btn *")) {
        controlList();
    }
});
elements.shoppingList.addEventListener('click', e => {
    //Клик хийсэн li  элементийн data-temid аттрибутыг шүүж гаргаж авах
    const id = e.target.closest(".shopping__item").dataset.itemid;
    //Олдсон ID-тэй орцыг моделоос устгана
    state.list.deleteItem(id);
    //Дэлгэцээс ийм ID-тэй орцыг олж бас устгана
    listView.deleteItem(id);
});