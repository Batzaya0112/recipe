import {elements} from "./base";
// private function
const renderRecipe = recipe =>{
    const markup = ` 
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
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

export const clearSearchQuery = () => {
    elements.searchInput.value = '';
};
export const clearSearchResult = () => {
    elements.searchResultList.innerHTML = "";
    elements.pageButtons.innerHTML = "";
}
export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
    // Хайлтын үр дүнг хуудаслаж үзүүлэх
    // page = 2, start = 10, end = 20
    const start = (currentPage - 1) * resPerPage;
    const end = currentPage * resPerPage;

    recipes.slice(start, end).forEach(el => renderRecipe(el));
    // Хуудаслалтын товчнуудыг гаргаж ирэх
    const totalPages = Math.ceil(recipes.length / resPerPage);
    renderButtons(currentPage, totalPages);
};
// type ===> 'prev', 'next'
const createButton = (page, type, direction) => `<button class="btn-inline results__btn--${type}" data-goto = ${page}>
                                                        <span>Хуудас ${page}</span>
                                                        <svg class="search__icon">
                                                            <use href="img/icons.svg#icon-triangle-${direction}"></use>
                                                        </svg>
                                                    </button>`;
const renderButtons = (currentPage, totalPages) => {
    let buttonHtml;
    if(currentPage === 1 && totalPages > 1)
    {
        // 1-р хуудсан дээр байна. 2-р хуудас гэдэг товчийг гарга
        buttonHtml = createButton(2, "next", "right");
    }
    else  if(currentPage < totalPages)
    {
        // Өмнөх болон  дараачийн хуудас руу шилжих товчнуудыг үзүүлнэ.
        buttonHtml = createButton(currentPage - 1, "prev", "left");
        console.log(buttonHtml + " left");
        buttonHtml += createButton(currentPage + 1, "next", "right");
        console.log(buttonHtml + "right");

    }
    else if(currentPage === totalPages)
    {
        // хамгийн сүүлийн хуудас дээр байна. Өмнөх рүү шилжүүлэх товчийг үзүүлнэ.
        buttonHtml = createButton(currentPage - 1, "prev", "left");
    }
    elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHtml);
};
