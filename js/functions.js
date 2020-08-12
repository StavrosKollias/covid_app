function addClassToElement(element, className) {
  element.classList.add(className);
}

function removeClassFromElement(element, className) {
  element.classList.remove(className);
}

function getClassListLengthFromElement(element) {
  return element.classList.length;
}

function addChildToElement(element, child) {
  element.appendChild(child);
}

function removeChildFromElement(element, child) {
  element.removeChild(child);
}

function changeTextToElement(element, txt) {
  element.innerText = txt;
}

function numberWithCommas(number) {
  return number.toLocaleString();
}

function sortAplhabeticallyCountries(data) {
  return data.sort((a, b) => a.Country.localeCompare(b.Country));
}

Object.filter = (obj, predicate) =>
  Object.fromEntries(Object.entries(obj).filter(predicate));

function checkDateUndifined(date) {
  return date === undefined;
}

function checkCountryNameUndefined(country) {
  return country === undefined;
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
      animateScale: false,
      animateRotate: false,
      duration: 0,
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
function filterDataGlobalTotalByCountry(data, filterCountryName) {
  const countries = data.Countries;
  const result = countries.filter(function (item) {
    return item.Country === filterCountryName;
  });

  return result[0];
}

function getSummuryDataFilterCountry(filterCountryName) {
  const summaryWorld = getDataCallApi(
    "GET",
    "https://api.covid19api.com/summary"
  ).then((data) => {
    const filteredData = filterDataGlobalTotalByCountry(
      data,
      filterCountryName
    );

    updateGlobalChart(filteredData, "total-global-stats");
    updateGlobalChart(filteredData, "new-global-stats");
  });
}

function getSummuryData() {
  const summaryWorld = getDataCallApi(
    "GET",
    "https://api.covid19api.com/summary"
  ).then((data) => {
    const filteredData = data.Global;
    const date = data.Date;
    updateGlobalChart(filteredData, "total-global-stats", date);
    updateGlobalChart(filteredData, "new-global-stats", date);
  });
}

function updateGlobalChart(filteredData, idCanvas, date) {
  var chartCanvas;

  Chart.helpers.each(Chart.instances, function (instance) {
    instance.chart.canvas.id == idCanvas
      ? (chartCanvas = instance.chart)
      : false;
  });
  var country = checkCountryNameUndefined(filteredData.Country);
  var newDate = checkDateUndifined(date);
  newDate ? (newDate = filteredData.Date) : newDate;
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
  } else {
    dataset = new Dataset(
      "New " + country + " " + newDate,
      [
        filteredData.NewConfirmed,
        filteredData.NewDeaths,
        filteredData.NewRecovered,
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
  }
  return dataset;
}
