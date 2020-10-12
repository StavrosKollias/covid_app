function handleClickSideBarBtn(element) {
  const elementClassListChild = element.children[0].classList.length

  const sideBar = element.parentElement;

  if (elementClassListChild < 2) {
    element.children[0].classList.add("btn-item-active");
    sideBar.classList.add("active-side-bar");
    activateSideBarItems();
  } else {
    sideBar.classList.remove("active-side-bar");
    element.children[0].classList.remove("btn-item-active");
    deActivateSideBarItems();
  }
}

function activateSideBarItems() {
  const sidebarItems = document.querySelectorAll(".side-bar-item");
  forEachInNodeListClassAddClass(sidebarItems, "active-item");


}

function deActivateSideBarItems() {
  const sidebarItems = document.querySelectorAll(".side-bar-item");
  forEachInNodeListClassRemoveClass(sidebarItems, "active-item");

}

function handleSideBarBtnItemClick(elemet) {
  const prevSelectedBtn = document.querySelector(".selected-btn");
  prevSelectedBtn.classList.remove("selected-btn");
  element.classList.add("selected-btn")
}

function handleFilterCountryGlobalChart(element) {
  const filterCountryValue = element.value;
  const filterCountryName = element.selectedOptions[0].innerText;

  console.log(filterCountryValue);
  filterCountryName == "Global"
    ? getSummuryData()
    : getSummuryDataFilterCountry(filterCountryName);
}


function handleFilterLineChartCountryChart(element){
  const filterCountryValue = element.value;
  const filterCountryName = element.selectedOptions[0].innerText;
  getDataByCountryInitital(filterCountryName); 
}




function handleCloseErrorPopup(element) {
  const popup = element.parentElement.parentElement;
  popup.classList.remove("active-error-popup")
  const bluredItem = document.querySelector(".blur-item");
  bluredItem.classList.remove("blur-item");
}
