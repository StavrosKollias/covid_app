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

function handleClickSideBarBtnItems(elemet) {
  const prevSelectedBtn = document.querySelector(".selected-btn");
  removeClassFromElement(prevSelectedBtn, "selected-btn");
  addClassToElement(element, ".selected-btn");
}

function handleFilterCountryGlobalChart(element) {
  const filterCountryValue = element.value;
  const filterCountryName = element.selectedOptions[0].innerText;

  console.log(filterCountryValue);
  filterCountryName == "Global"
    ? getSummuryData()
    : getSummuryDataFilterCountry(filterCountryName);
}

function handleCloseErrorPopup(element) {
  const popup = element.parentElement.parentElement;
  removeClassFromElement(popup, "active-error-popup");
  const bluredItem = document.querySelector(".blur-item");
  removeClassFromElement(bluredItem, "blur-item");
}
