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

function forEachInNodeListClass(list, operationFunction, className) {
  list.forEach((e, i) => {
    operationFunction(e, className);
  });
}

function handleFilterCountryGlobalChart(element) {
  const filterCountryValue = element.value;
  console.log(filterCountryValue);
  const filterCountryName = element.selectedOptions[0].innerText;
  // const chart = document.getElementById("total-global-stats");
  // console.log(chart.getContext("2d"));

  getSummuryDataFilter(filterCountryName);
}

function filterDataGlobalTotalByCountry(data, filterCountryName) {
  const countries = data.Countries;
  const result = countries.filter(function (item) {
    return item.Country === filterCountryName;
  });

  return result;
}

function getSummuryDataFilter(filterCountryName) {
  const summaryWorld = getDataCallApi(
    "GET",
    "https://api.covid19api.com/summary"
  ).then((data) => {
    const filteredData = filterDataGlobalTotalByCountry(
      data,
      filterCountryName
    );

    updateGlobalTotalChart(filteredData);
  });
}

function updateGlobalTotalChart(filteredData) {
  const chartCanvas = document.getElementById("total-global-stats");
  console.log(chartCanvas.getContext("2d"));
}
