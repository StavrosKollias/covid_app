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

// -----------Focused Functions-------------//
function filterDataGlobalTotalByCountry(data, filterCountryName) {
  const countries = data.Countries;
  const result = countries.filter(function (item) {
    return item.Country === filterCountryName;
  });

  return result[0];
}

function getSummuryDataFilterCountry(filterCountryName, idCanvas) {
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

function getSummuryData(idCanvas) {
  const summaryWorld = getDataCallApi(
    "GET",
    "https://api.covid19api.com/summary"
  ).then((data) => {
    const filteredData = data.Global;
    const date = data.Date;
    updateGlobalTotalChart(filteredData, idCanvas, date);
  });
}

function updateGlobalTotalChart(filteredData, idCanvas, date) {
  const chartCanvas = Object.filter(Chart.instances, function (instance) {
    return instance[1].chart.canvas.id === idCanvas;
  });
  var country = filteredData.Country;
  var newdate = date;
  newdate == undefined ? (newdate = filteredData.Date) : newdate;
  country == undefined ? (country = "Global") : country;

  const dataset = new Dataset(
    "Total " + country + " " + newdate,
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
  const labels = ["Confirmed", "Deaths", "Recovered"];
  updateChart(chartCanvas[0].chart, dataset, labels);
}
