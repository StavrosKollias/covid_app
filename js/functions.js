


function changeTextToElement(element, txt) {
  element.innerText = txt;
}

function numbericStringConversion(number) {
  return number.toLocaleString();
}

function sortAplhabeticallyCountries(data) {
  return data.sort((a, b) => a.Country.localeCompare(b.Country));
}

function formatDateFromData(date) {
  const splitDateTime = date.split("T");
  const splitDate = splitDateTime[0].split("-");
  const newDate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
  return newDate;
}

function forEachInNodeListClassRemoveClass(list, className) {
  list.forEach((e, i) => {
    e.classList.remove(className);
  });
}

function forEachInNodeListClassAddClass(list, className) {
  list.forEach((e, i) => {
    e.classList.add(className);
  });
}


Object.filter = (obj, predicate) =>
  Object.fromEntries(Object.entries(obj).filter(predicate));

function checkValueUndIfined(date) {
  return date === undefined;
}

// ----------Generating Chart Functions --------//
function generateChart(type, canvas, data, options) {
  var chart = new Chart(canvas, {
    type: type,
    data: data,
    options: options,
  });
  addClickHandlerToChartData(canvas, chart);
  return chart;
}

function chartOptions(yAxisLabel, xAxisLabel) {
  const options = {
    bezierCurve: false,
    responsive: true,
    transitions: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0,
      },
    },
    aspectRatio: 1,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1200,
    },
    legend: {
      display: true,
      labels: {
        fontColor: "#0A0A23",
      },
      onClick: (e) => e.stopPropagation(),
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: xAxisLabel,
            fontColor: "#0A0A23",
          },
          gridLines: {
            display: false,
          },
          ticks: {
            fontSize: 15,
            fontColor: "#0A0A23", // this here
          },
        },
      ],
      yAxes: [
        {
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: yAxisLabel,
            fontColor: "#0A0A23",
          },
          display: true,
          gridLines: {
            display: false,
          },
          ticks: {
            maxTicksLimit: 5,
            fontSize: 15,
            fontColor: "#0A0A23", // this here
            beginAtZero: false,
          },
        },
      ],
    },
  };

  return options;
}

function generateChartData(labels, datasets) {
  const chartData = {
    labels: labels,
    datasets: datasets,
  };
  return chartData;
}

function addClickHandlerToChartData(element, chart) {
  element.onclick = function (evt) {
    var activePoints = chart.getElementsAtEvent(evt);
    if (activePoints[0]) {
      var chartData = activePoints[0]["_chart"].config.data;
      var idx = activePoints[0]["_index"];

      var label = chartData.labels[idx];
      var value = chartData.datasets[0].data[idx];

      var url = "http://example.com/?label=" + label + "&value=" + value;
      console.log(url);
    }
  };
}

function updateChart(chart, data, labels) {
  chart.data.labels = labels;
  chart.data.datasets[0] = data;
  chart.update();
}

// -----------------------------------------//
// -----------Focused Functions-------------//
//------------------------------------------//

async function getSummuryDataFilterCountry(filterCountryName) {
  const summaryWorld = await getDataCallApi(
    "https://api.covid19api.com/summary"
  );
    const filteredData = filterDataGlobalTotalByCountry(
      summaryWorld.Countries,
      filterCountryName
    );
    const isUndefined = checkValueUndIfined(filteredData);
    if (!isUndefined) {
      updateGlobalChart(filteredData, "total-global-stats");
      updateGlobalChart(filteredData, "new-global-stats");
    } else {
      openErrorPopUp("No Data Found For this Country");
    }
}

function filterDataGlobalTotalByCountry(data, filterCountryName) {
  const result = data.filter(function (item) {
    return item.Country === filterCountryName;
  });

  return result[0];
}

function getSummuryData() {
  const summaryWorld = getDataCallApi(
    "https://api.covid19api.com/summary"
  )

    const filteredData = summaryWorld.Global;
    const date = formatDateFromData(summaryWorld.Date);

    updateGlobalChart(filteredData, "total-global-stats", date);
    updateGlobalChart(filteredData, "new-global-stats", date);
}

function updateGlobalChart(filteredData, idCanvas, date) {
  var chartCanvas;

  Chart.helpers.each(Chart.instances, function (instance) {
    instance.chart.canvas.id == idCanvas
      ? (chartCanvas = instance.chart)
      : false;
  });

  returnDesirableChart(idCanvas);
  var country = checkValueUndIfined(filteredData.Country);
  var newDate = checkValueUndIfined(date);
  newDate ? (newDate = formatDateFromData(filteredData.Date)) : newDate;
  country ? (country = "Global") : (country = filteredData.Country);
  const dataset = generateTypeDatasetGlobalCharts(
    filteredData,
    idCanvas,
    country,
    newDate
  );
  const labels = ["Confirmed", "Deaths", "Recovered"];
  updateChart(chartCanvas, dataset, labels);
}

function generateTypeDatasetGlobalCharts(filteredData, type, country, newDate) {
  var dataset;
  if (type == "total-global-stats") {
    dataset = new Dataset(
      "Total " + country + " " + newDate,
      [
        filteredData.TotalConfirmed,
        filteredData.TotalDeaths,
        filteredData.TotalRecovered,
      ],
      "",
      [
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      0.5,
      true,
      true,
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
  } else {
    dataset = new Dataset(
      "New " + country + " " + newDate,
      [
        filteredData.NewConfirmed,
        filteredData.NewDeaths,
        filteredData.NewRecovered,
      ],
      "",
      [
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      0.5,
      true,
      true,
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
  }
  return dataset;
}

function returnDesirableChart(idCanvas) {
  var chartCanvas;
  Chart.helpers.each(Chart.instances, function (instance) {
    instance.chart.canvas.id == idCanvas
      ? (chartCanvas = instance.chart)
      : false;
  });
  console.log(chartCanvas);
}

function openErrorPopUp(txt) {
  const errorPopup = document.querySelector(".error-popup");
  const errorMessage = errorPopup.children[1];
  changeTextToElement(errorMessage, txt);
  const panelContainer = document.querySelector(".panel-container");
  errorPopup.classList.add("active-error-popup");
  panelContainer.classList.add("blur-item");
}
