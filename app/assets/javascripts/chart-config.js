// Global styles for all chart types
Chart.register(ChartDataLabels)
Chart.defaults.font.family = 'GDS Transport'

const chartConfig = {
  colours: [
    '#1d70b8',
    '#5694ca',
    '#28a197',
    '#d53880',
    '#00703c',
    '#f499be',
    '#f47738',
    '#b58840'
  ],
  tooltip: {
    backgroundColor: '#FFF',
    bodyColor: '#000',
    bodyFontSize: 16,
    displayColors: true,
    borderWidth: 1,
    borderColor: "#b1b4b6",
    cornerRadius: 0,
    padding: 15,
  }
}