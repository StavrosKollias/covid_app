window.addEventListener("load", (e) => {
  getCountriesData();
  getGlobalTotalDataInitial();
  getDataByCountryInitital();
  getDataByCountryInitital("uk");
});

function getCountriesData() {
  const countriesApi = getDataCallApi(
    "https://api.covid19api.com/countries"
  ).then((data) => addCountriesToSelectionBox(data));
}

function addCountriesToSelectionBox(data) {
  const selectFiltersCountry = document.querySelectorAll(".country-selector");
  data = sortAplhabeticallyCountries(data);
  selectFiltersCountry.forEach((e, i) => {
    const newOption = document
      .querySelectorAll(".type-selector")[0]
      .children[0].cloneNode(true);
    changeTextToElement(newOption, "Global");
    newOption.value = 0;
    e.appendChild(newOption);
    data.map((item, i) => {
      const newOption = document
        .querySelectorAll(".type-selector")[0]
        .children[0].cloneNode(true);
      changeTextToElement(newOption, item.Country);
      newOption.value = i + 1;
     e.appendChild(newOption);
    });
    if(e.id=="country-filter-line") e.removeChild(e.children[0]);
  });

  generateSelectComponents();
}

async function getGlobalTotalDataInitial() {
  const summaryWorld = await getDataCallApi("https://api.covid19api.com/summary");
  const dataGlobalDate = formatDateFromData(summaryWorld.Date);
   addDataToGlobalResultSpans(summaryWorld.Global);
   generateGlobalChartTotal(summaryWorld.Global, dataGlobalDate);
   generateGlobalChartNew(summaryWorld.Global, dataGlobalDate);
}

function addDataToGlobalResultSpans(data) {
  const newConfrimedSpan = document.getElementById("new-confirmed-global");
  const newDeathsSpan = document.getElementById("new-deaths-global");
  const newRecoveredSpan = document.getElementById("new-recovered-global");
  const totalConfirmedSpan = document.getElementById("total-confirmed-global");
  const totalDeathsSpan = document.getElementById("total-deaths-global");
  const totalRecoveredSpan = document.getElementById("total-recovered-global");

  const newConfirmed = numbericStringConversion(data.NewConfirmed);
  const newDeaths = numbericStringConversion(data.NewDeaths);
  const newRecovered = numbericStringConversion(data.NewRecovered);
  const totalConfirmed = numbericStringConversion(data.TotalConfirmed);
  const totalDeaths = numbericStringConversion(data.TotalDeaths);
  const totalRecovered = numbericStringConversion(data.TotalRecovered);

  changeTextToElement(newConfrimedSpan, newConfirmed);
  changeTextToElement(newDeathsSpan, newDeaths);
  changeTextToElement(newRecoveredSpan, newRecovered);
  changeTextToElement(totalConfirmedSpan, totalConfirmed);
  changeTextToElement(totalDeathsSpan, totalDeaths);
  changeTextToElement(totalRecoveredSpan, totalRecovered);
}

function generateGlobalChartTotal(data, date) {
  const totalGlobalChart = document.getElementById("total-global-stats");
  const options = chartOptions("Type", "Number Cases");
  const labels = ["Confirmed", "Deaths", "Recovered"];
  const dataset = new Dataset(
    `Total Global  ${date}`,
    [data.TotalConfirmed, data.TotalDeaths, data.TotalRecovered],
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
  const chartData = generateChartData(labels, [dataset]);
  const chart = generateChart(
    "horizontalBar",
    totalGlobalChart,
    chartData,
    options
  );
}

function generateGlobalChartNew(data, date) {
  const totalGlobalChart = document.getElementById("new-global-stats");
  const options = chartOptions("Type", "Number Cases");
  const labels = ["Confirmed", "Deaths", "Recovered"];
  const dataset = new Dataset(
    `New Global  ${date}`,
    [data.NewConfirmed, data.NewDeaths, data.NewRecovered],
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
  const chartData = generateChartData(labels, [dataset]);
  const chart = generateChart(
    "horizontalBar",
    totalGlobalChart,
    chartData,
    options
  );
}

 async function getDataByCountryInitital(country) {
  const summuryCountry = await getDataCallApi(
    `https://api.covid19api.com/live/country/${country}/status/confirmed`//https://api.covid19api.com/summary"
  );
  console.log(summuryCountry);
}

// -----------Country Global Example----//
// Country: "Afghanistan"
// CountryCode: "AF"
// Date: "2020-08-11T08:28:11Z"
// NewConfirmed: 108
// NewDeaths: 16
// NewRecovered: 268
// Premium: {}
// Slug: "afghanistan"
// TotalConfirmed: 37162
// TotalDeaths: 1328
// TotalRecovered: 26228
