import playerData from "../../data/player.json";

/**
 * Returns ApexCharts config for CS:GO donut charts.
 * Includes the custom formatter that maps values to skill level names.
 * @returns {Object} ApexCharts config object
 */
export function getCSChartConfig() {
  const chart = JSON.parse(JSON.stringify(playerData.chart));
  chart.plotOptions.pie.donut.labels.value.formatter = (
    value,
    { config: { series } },
  ) => {
    const rate = value / (100 / series.length);
    for (let i = 0; i < playerData.level.length; ++i) {
      const { value: levelValue, name } = playerData.level[i];
      if (rate > levelValue) {
        return name;
      }
    }
  };
  return chart;
}

/**
 * Returns ApexCharts config for R6 radial bar chart.
 * @returns {Object} ApexCharts config object
 */
export function getR6ChartConfig() {
  const atkLabel = playerData.labelR6.attack;
  return {
    chart: {
      height: 300,
      type: "radialBar",
    },
    labels: atkLabel.map((item) => item.name),
    colors: atkLabel.map((item) => item.colorNegative),
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          background: "#333",
          startAngle: -135,
          endAngle: 135,
        },
        dataLabels: {
          name: { show: false },
          value: { fontSize: "30px", show: true },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: atkLabel.map((item) => item.colorPositive),
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "butt",
    },
  };
}
