function handleClickSideBarBtn(element) {
  const elementClassListChild = getClassListLengthFromElement(
    element.children[0]
  );
  const sideBar = element.parentElement;

  if (elementClassListChild < 2) {
    addClassToElement(sideBar, "active-side-bar");
    addClassToElement(element.children[0], "btn-item-active");
    activateSideBarItems();
  } else {
    removeClassFromElement(sideBar, "active-side-bar");
    removeClassFromElement(element.children[0], "btn-item-active");
    deActivateSideBarItems();
  }
}

function activateSideBarItems() {
  const sidebarItems = document.querySelectorAll(".side-bar-item");
  forEachInNodeListClass(sidebarItems, addClassToElement, "active-item");
}

function deActivateSideBarItems() {
  const sidebarItems = document.querySelectorAll(".side-bar-item");
  forEachInNodeListClass(sidebarItems, removeClassFromElement, "active-item");
}

function forEachInNodeListClass(list, operationFunction, className) {
  list.forEach((e, i) => {
    operationFunction(e, className);
  });
}

window.addEventListener("load", (e) => {
  const countriesApi = getDataCallApi(
    "GET",
    "https://api.covid19api.com/countries"
  ).then((data) => addCountriesToSelections(data));
});

function addCountriesToSelectionBox(data) {
  const selectFiltersCountry = document.querySelectorAll(".country-selector");
  selectFiltersCountry.forEach((e, i) => {
    data.map((item, i) => {
      const newOption = document
        .querySelectorAll(".type-selector")[0]
        .children[0].cloneNode(true);
      changeTextToElement(newOption, item.Country);
      newOption.value = i;
      addChildToElement(e, newOption);
    });
  });
}
