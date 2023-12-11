// Config for each chart card
// TODO: data + labels to be transformed from raw data for each chart card

const doughnutCharts = [
  {
    id: 'chart1',
    chartType: 'doughnut',
    title: 'Finds Incidents',
    description: 'Total finds during this time period',
    labels: ['Drugs', 'Phones', 'Weapons', 'Alcohol'],
    data: [141, 130, 37, 47],
    total: [141, 130, 37, 47].reduce((a, c) => a + c, 0),
    date: '22/23',
    href: '#'
  },
  {
    id: 'chart2',
    chartType: 'doughnut',
    title: 'Population Overview',
    description: 'Total Population breakdown in this time period',
    labels: ['Entry', 'Enhanced', 'Standard', 'Basic', 'Super Enhanced'],
    data: [0, 2270, 3380, 360, 101, 0],
    total: [0, 2270, 3380, 360, 101, 0].reduce((a, c) => a + c, 0),
    href: '#'
  },
  {
    id: 'chart3',
    chartType: 'doughnut',
    title: 'Assault Incidents',
    description: 'Total assaults in this time period',
    labels: ['Serious', 'General'],
    data: [300, 467],
    total: [300, 467].reduce((a, c) => a + c, 0),
    date: '22/23'
  },
  {
    id: 'chart4',
    chartType: 'doughnut',
    title: 'Finds Incidents',
    description: 'Total finds during this time period',
    labels: ['Drugs', 'Phones', 'Weapons', 'Alcohol'],
    data: [141, 130, 37, 47],
    total: [141, 130, 37, 47].reduce((a, c) => a + c, 0)
  },
  {
    id: 'chart5',
    chartType: 'doughnut',
    title: 'Population Overview',
    description: 'Total Population breakdown in this time period',
    labels: ['Entry', 'Enhanced', 'Standard', 'Basic', 'Super Enhanced'],
    data: [0, 2270, 3380, 360, 101, 0],
    total: [0, 2270, 3380, 360, 101, 0].reduce((a, c) => a + c, 0)
  },
  {
    id: 'chart6',
    chartType: 'doughnut',
    title: 'Finds Incidents',
    description: 'Total finds during this time period',
    labels: ['Drugs', 'Phones', 'Weapons', 'Alcohol'],
    data: [141, 130, 37, 47],
    total: [141, 130, 37, 47].reduce((a, c) => a + c, 0)
  },
  {
    id: 'chart3',
    chartType: 'doughnut',
    title: 'Population Overview',
    description: 'Total Population breakdown',
    labels: ['Entry', 'Enhanced', 'Standard', 'Basic', 'Super Enhanced'],
    data: [0, 2270, 3380, 360, 101, 0],
    total: [0, 2270, 3380, 360, 101, 0].reduce((a, c) => a + c, 0)
  },
  {
    id: 'chart4',
    chartType: 'doughnut',
    title: 'Assault Incidents',
    description: 'Total assaults in this time period',
    labels: ['Serious', 'General'],
    data: [300, 467],
    total: [300, 467].reduce((a, c) => a + c, 0)
  },
  {
    id: 'chart1',
    chartType: 'doughnut',
    title: 'Finds Incidents',
    description: 'Total finds during this time period',
    labels: ['Drugs', 'Phones', 'Weapons', 'Alcohol'],
    data: [141, 130, 37, 47],
    total: [141, 130, 37, 47].reduce((a, c) => a + c, 0)
  }
]

const pieCharts = [
  {
    id: 'chart1',
    chartType: 'pie',
    title: 'Finds Incidents',
    description: 'Total finds during this time period',
    labels: ['Drugs', 'Phones', 'Weapons', 'Alcohol'],
    data: [141, 130, 37, 47],
    total: [141, 130, 37, 47].reduce((a, c) => a + c, 0)
  },
  {
    id: 'chart3',
    chartType: 'pie',
    title: 'Population Overview',
    description: 'Total Population breakdown in this time period',
    labels: ['Entry', 'Enhanced', 'Standard', 'Basic', 'Super Enhanced'],
    data: [0, 2270, 3380, 360, 101, 0],
    total: [0, 2270, 3380, 360, 101, 0].reduce((a, c) => a + c, 0)
  },
  {
    id: 'chart4',
    chartType: 'pie',
    title: 'Assault Incidents',
    description: 'Total Assaults in this time period',
    labels: ['Serious', 'General'],
    data: [300, 467],
    total: [300, 467].reduce((a, c) => a + c, 0)
  },
  {
    id: 'chart3',
    chartType: 'pie',
    title: 'Population Overview',
    description: 'Total Population breakdown in this time period',
    labels: ['Entry', 'Enhanced', 'Standard', 'Basic', 'Super Enhanced'],
    data: [0, 2270, 3380, 360, 101, 0],
    total: [0, 2270, 3380, 360, 101, 0].reduce((a, c) => a + c, 0)
  },
  {
    id: 'chart4',
    chartType: 'pie',
    title: 'Assault Incidents',
    description: 'Total Assaults in this time period',
    labels: ['Serious', 'General'],
    data: [300, 467],
    total: [300, 467].reduce((a, c) => a + c, 0)
  },
  {
    id: 'chart3',
    chartType: 'pie',
    title: 'Population Overview',
    description: 'Total Population breakdown in this time period',
    labels: ['Entry', 'Enhanced', 'Standard', 'Basic', 'Super Enhanced'],
    data: [0, 2270, 3380, 360, 101, 0],
    total: [0, 2270, 3380, 360, 101, 0].reduce((a, c) => a + c, 0)
  },
  {
    id: 'chart4',
    chartType: 'pie',
    title: 'Assault Incidents',
    description: 'Total Assaults in this time period',
    labels: ['Serious', 'General'],
    data: [300, 467],
    total: [300, 467].reduce((a, c) => a + c, 0)
  },
  {
    id: 'chart3',
    chartType: 'pie',
    title: 'Population Overview',
    description: 'Total Population breakdown in this time period',
    labels: ['Entry', 'Enhanced', 'Standard', 'Basic', 'Super Enhanced'],
    data: [0, 2270, 3380, 360, 101, 0],
    total: [0, 2270, 3380, 360, 101, 0].reduce((a, c) => a + c, 0)
  },
  {
    id: 'chart4',
    chartType: 'pie',
    title: 'Assault Incidents',
    description: 'Total Assaults in this time period',
    labels: ['Serious', 'General'],
    data: [300, 467],
    total: [300, 467].reduce((a, c) => a + c, 0)
  }
]

const lineChartData = [
  [100, 130, 80, 60, 99, 50, 65, 100, 130, 80, 60, 99, 50, 65],
  [60, 70, 50, 40, 5, 20, 43, 60, 70, 50, 40, 5, 20, 43],
  [18, 50, 45, 90, 120, 59, 72, 110, 32, 28, 57, 45, 80, 124],
  [5, 32, 23, 40, 70, 32, 43, 60, 7, 12, 8, 21, 50, 43]
]

const lineCharts = [
  {
    id: 'chart1',
    chartType: 'line',
    title: 'Prisoner on Prisoner Assaults',
    description: 'Prisoner on prisoner assault totals',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [
      {
        title: 'Assaults',
        data: lineChartData[0],
        total: lineChartData[0].reduce((a, c) => a + c, 0)
      },
      {
        title: 'Serious',
        data: lineChartData[1],
        total: lineChartData[1].reduce((a, c) => a + c, 0)
      }
    ]
  },
  {
    id: 'chart2',
    chartType: 'line',
    title: 'Prisoner on Staff Assaults',
    description: 'Prisoner on staff assault totals',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [
      {
        title: 'Assaults',
        data: lineChartData[2],
        total: lineChartData[2].reduce((a, c) => a + c, 0)
      },
      {
        title: 'Serious',
        data: lineChartData[3],
        total: lineChartData[3].reduce((a, c) => a + c, 0)
      }
    ]
  },
  {
    id: 'chart3',
    chartType: 'line',
    title: 'Self Harm Methods',
    description: 'Self harm methods over time',
    labels: ['Jan 21', 'Jan 22', 'jan 23'],
    data: [
      {
        title: 'Cutting',
        data: [20, 50, 60],
        total: [20, 50, 60].reduce((a, c) => a + c, 0)
      },
      {
        title: 'Suffocation',
        data: [10, 34, 40],
        total: [10, 34, 40].reduce((a, c) => a + c, 0)
      },
      {
        title: 'Ingestion',
        data: [4, 16, 23],
        total: [4, 16, 23].reduce((a, c) => a + c, 0)
      },
      {
        title: 'Other',
        data: [2, 4, 8],
        total: [2, 4, 8].reduce((a, c) => a + c, 0)
      }
    ]
  },
  {
    id: 'chart2',
    chartType: 'line',
    title: 'Prisoner on Staff Assaults',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [
      {
        title: 'Assaults',
        data: lineChartData[2],
        total: lineChartData[2].reduce((a, c) => a + c, 0)
      },
      {
        title: 'Serious',
        data: lineChartData[3],
        total: lineChartData[3].reduce((a, c) => a + c, 0)
      }
    ]
  },
  {
    id: 'chart3',
    chartType: 'line',
    title: 'Self Harm Methods',
    description: 'Self harm methods over time',
    labels: ['Jan 21', 'Jan 22', 'jan 23'],
    data: [
      {
        title: 'Cutting',
        data: [20, 50, 60],
        total: [20, 50, 60].reduce((a, c) => a + c, 0)
      },
      {
        title: 'Suffocation',
        data: [10, 34, 40],
        total: [10, 34, 40].reduce((a, c) => a + c, 0)
      },
      {
        title: 'Ingestion',
        data: [4, 16, 23],
        total: [4, 16, 23].reduce((a, c) => a + c, 0)
      },
      {
        title: 'Other',
        data: [2, 4, 8],
        total: [2, 4, 8].reduce((a, c) => a + c, 0)
      }
    ]
  }
]

const barCharts = [
  {
    id: 'chart1',
    chartType: 'bar',
    title: 'Finds Incidents',
    description: 'Total finds during this time period',
    labels: ['Drugs', 'Phones', 'Weapons', 'Alcohol'],
    data: [141, 130, 37, 47],
    total: [141, 130, 37, 47].reduce((a, c) => a + c, 0),
    date: '22/23',
    href: '#'
  },
  {
    id: 'chart2',
    chartType: 'bar',
    title: 'Assault Incidents',
    description: 'Total assaults in this time period',
    labels: ['Serious', 'General'],
    data: [300, 467],
    total: [300, 467].reduce((a, c) => a + c, 0),
    date: '22/23'
  },
  {
    id: 'chart3',
    chartType: 'bar',
    title: 'Population Overview',
    description: 'Total Population breakdown in this time period',
    labels: ['Entry', 'Enhanced', 'Standard', 'Basic', 'Super Enhanced'],
    data: [0, 2270, 3380, 360, 101, 0],
    total: [0, 2270, 3380, 360, 101, 0].reduce((a, c) => a + c, 0),
    href: '#'
  },
]

module.exports = [
  ...doughnutCharts,
  ...pieCharts,
  ...lineCharts,
  ...barCharts
]
