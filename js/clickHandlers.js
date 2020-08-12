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

  getSummuryDataFilter(filterCountryName, "total-global-stats");
}

function filterDataGlobalTotalByCountry(data, filterCountryName) {
  const countries = data.Countries;
  const result = countries.filter(function (item) {
    return item.Country === filterCountryName;
  });

  return result;
}

function getSummuryDataFilter(filterCountryName, idCanvas) {
  const summaryWorld = getDataCallApi(
    "GET",
    "https://api.covid19api.com/summary"
  ).then((data) => {
    const filteredData = filterDataGlobalTotalByCountry(
      data,
      filterCountryName
    );

    updateGlobalTotalChart(filteredData, idCanvas);
  });
}

function updateGlobalTotalChart(filteredData, idCanvas) {
  Object.filter = (obj, predicate) =>
    Object.fromEntries(Object.entries(obj).filter(predicate));

  const chartCanvas = Object.filter(Chart.instances, function (instance) {
    return instance[1].chart.canvas.id === idCanvas;
  });

  // Chart.helpers.filter(Chart.instances, function (
  //   instance
  // ) {
  //   return instance.chart.canvas.id === idCanvas;
  // });

  console.log(filteredData[0]);
  // + filteredData[0].Country + " At" + filteredData[0].Date
  if (filteredData.length > 0) {
    const dataset = new Dataset(
      "Total ",
      [
        filteredData[0].TotalConfirmed,
        filteredData[0].TotalDeaths,
        filteredData[0].TotalRecovered,
      ],
      "bar",
      [
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      0.5,
      true,
      true,
      false,
      0,
      [
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      1,
      "default",
      [
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ]
    );
    const labels = ["Confirmed", "Deaths", "Recovered"];
    updateChart(chartCanvas[0].chart, dataset, labels);
  } else {
    alert("No Data for Country Selected");
  }
}
