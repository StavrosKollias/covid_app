window.addEventListener("load", (e) => {
  const countriesApi = getDataCallApi(
    "GET",
    "https://api.covid19api.com/countries"
  ).then((data) => addCountriesToSelectionBox(data));

  getGlobalTotalData();
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

function getGlobalTotalData() {
  const summaryWorld = getDataCallApi(
    "GET",
    "https://api.covid19api.com/summary"
  ).then((data) => {
    // console.log(data.Global);
    // const dataGlobalInTotal = data.Global;
    addDataToGlobalResultSpans(data.Global);
    console.log(data.Date);
    const dataGlobalDate = data.Date;
    // console.log(data.Countries);
    const dataGlobalbyCountries = data.Countries;
  });
}

// ----------Data Global in Total---------//
// NewConfirmed: 227941
// NewDeaths: 4913
// NewRecovered: 164695
// TotalConfirmed: 20088890
// TotalDeaths: 736223
// TotalRecovered: 12279869

function addDataToGlobalResultSpans(data) {
  const newConfrimedSpan = document.getElementById("new-confirmed-global");
  const newDeathsSpan = document.getElementById("new-deaths-global");
  const newRecoveredSpan = document.getElementById("new-recovered-global");
  const totalConfirmedSpan = document.getElementById("total-confirmed-global");
  const totalDeathsSpan = document.getElementById("total-deaths-global");
  const totalRecoveredSpan = document.getElementById("total-recovered-global");

  const newConfirmed = numberWithCommas(data.NewConfirmed);
  const newDeaths = numberWithCommas(data.NewDeaths);
  const newRecovered = numberWithCommas(data.NewRecovered);
  const totalConfirmed = numberWithCommas(data.TotalConfirmed);
  const totalDeaths = numberWithCommas(data.TotalDeaths);
  const totalRecovered = numberWithCommas(data.TotalRecovered);

  changeTextToElement(newConfrimedSpan, newConfirmed);
  changeTextToElement(newDeathsSpan, newDeaths);
  changeTextToElement(newRecoveredSpan, newRecovered);
  changeTextToElement(totalConfirmedSpan, totalConfirmed);
  changeTextToElement(totalDeathsSpan, totalDeaths);
  changeTextToElement(totalRecoveredSpan, totalRecovered);
}

// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
// }

// -----------Country Global Example----//
//     Country: "Afghanistan"
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
