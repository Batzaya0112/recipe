export const elements = {
    searchForm: document.querySelector(".search"),
    searchInput: document.querySelector(".search__field"),
    searchResultDiv: document.querySelector(".results"),
    searchResultList: document.querySelector(".results__list"),
    pageButtons: document.querySelector(".results__pages"),
    recieDiv: document.querySelector(".recipe"),
    shoppingList: document.querySelector(".shopping__list"),

};
export const elemnetStrings = {
    loader: "loader"
}
export const clearLoader = () => {
    const loader = document.querySelector(`.${elemnetStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}
export const renderLoader = parent => {
    const loader =
        ` <div class = "${elemnetStrings.loader}">
            <svg>
                <use href = "img/icons.svg#icon-cw"</use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
};