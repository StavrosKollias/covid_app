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

// ----------Generating Chart Functions --------//
function generateChart(type, canvas, data, options) {
  var chart = new Chart(canvas, {
    type: type,
    data: data,
    options: options,
  });
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
    labels: labels, //["1", "2", "3", "4", "5", "6"],
    datasets: datasets,
    // datasets: [
    //   {
    //     label: "Mean",
    //     data: [], //[50, 50, 50, 50, 50, 50],
    //     type: "line",
    //     borderColor: "rgba(251, 255, 0)",
    //     fillOpacity: 0.5,
    //     steppedLine: true,
    //     showLine: true,
    //     fill: false,
    //     pointRadius: 0,
    //     pointBorderColor: "rgba(251, 255, 0)",
    //     pointBorderWidth: 1,
    //     cubicInterpolationMode: "default",
    //     backgroundColor: "rgba(251, 255, 0)",
    //   },
    //   {
    //     label: "USL",
    //     data: [], //[50, 50, 50, 50, 50, 50],
    //     type: "line",
    //     borderColor: "red",
    //     fillOpacity: 0.5,
    //     steppedLine: true,
    //     showLine: true,
    //     fill: false,
    //     pointRadius: 0,
    //     pointBorderColor: "red",
    //     pointBorderWidth: 1,
    //     cubicInterpolationMode: "default",
    //     backgroundColor: "red",
    //   },
    //   {
    //     label: "LSL",
    //     data: [],
    //     type: "line",
    //     borderColor: "green",
    //     fillOpacity: 0.5,
    //     steppedLine: true,
    //     showLine: true,
    //     fill: false,
    //     pointRadius: 0,
    //     pointBorderColor: "green",
    //     pointBorderWidth: 1,
    //     cubicInterpolationMode: "default",
    //     backgroundColor: "green",
    //   },
    //   {
    //     fillColor: "rgba(255, 0, 212)",
    //     fillOpacity: 0.5,
    //     borderColor: "rgba(255, 0, 212)",
    //     pointBorderColor: "rgba(255, 0, 212)",
    //     strokeColor: "rgba(255, 0, 212)",
    //     fill: false,
    //     borderWidth: 2,
    //     type: "line",
    //     steppedLine: false,
    //     showLine: true,
    //     pointRadius: 7,
    //     pointBorderWidth: 1,
    //     backgroundColor: "rgba(255, 0, 212)",
    //     hoverBackgroundColor: "rgba(255, 0, 212)",
    //     cubicInterpolationMode: "default",
    //     data: [],
    //     label: "Force Results",
    //   },
    // ],
  };
  return chartData;
}

class Dataset {
  constructor(
    label,
    data,
    type,
    borderColor,
    fillOpacity,
    steppedLine,
    showLine,
    fill,
    pointRadius,
    pointBorderColor,
    pointBorderWidth,
    cubicInterpolationMode,
    backgroundColor
  ) {
    this.label = label;
    this.data = data;
    this.type = type;
    this.borderColor = borderColor;
    this.fillOpacity = fillOpacity;
    this.steppedLine = steppedLine;
    this.showLine = showLine;
    this.fill = fill;
    this.pointRadius = pointRadius;
    this.pointBorderColor = pointBorderColor;
    this.pointBorderWidth = pointBorderWidth;
    this.cubicInterpolationMode = cubicInterpolationMode;
    this.backgroundColor = backgroundColor;
  }
}
