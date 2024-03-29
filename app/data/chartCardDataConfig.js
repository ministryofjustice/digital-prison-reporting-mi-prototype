// Config for each chart card
const doughnutCharts = [
  {
    card: {
      title: 'Finds Incidents',
      description: 'Total finds during this time period',
      date: '22/23',
      href: '#'
    },
    chart: [{
      id: 'chart1',
      type: 'doughnut',
      labels: ['Drugs', 'Phones', 'Weapons', 'Alcohol'],
      data: [141, 130, 37, 47],
      total: [141, 130, 37, 47].reduce((a, c) => a + c, 0)
    }]
  },
  {
    card: {
      title: 'Population Overview',
      description: 'Total Population breakdown',
      href: '#'
    },
    chart: [{
      id: 'chart2',
      type: 'doughnut',
      labels: ['Entry', 'Enhanced', 'Standard', 'Basic', 'Super Enhanced'],
      data: [0, 2270, 3380, 360, 101, 0],
      total: [0, 2270, 3380, 360, 101, 0].reduce((a, c) => a + c, 0)
    }]
  },
  {
    card: {
      title: 'Assault Incidents',
      description: 'Total assaults in this time period',
      date: '22/23'
    },
    chart: [{
      id: 'chart3',
      type: 'doughnut',
      labels: ['Serious', 'General'],
      data: [300, 467],
      total: [300, 467].reduce((a, c) => a + c, 0)
    }]
  }
]

const pieCharts = [
  {
    card: {
      title: 'Finds Incidents',
      description: 'Total finds during this time period'
    },
    chart: [{
      id: 'chart1',
      type: 'pie',
      labels: ['Drugs', 'Phones', 'Weapons', 'Alcohol'],
      data: [141, 130, 37, 47],
      total: [141, 130, 37, 47].reduce((a, c) => a + c, 0)
    }]
  },
  {
    card: {
      title: 'Population Overview',
      description: 'Total Population breakdown in this time period'
    },
    chart: [{
      id: 'chart2',
      type: 'pie',
      labels: ['Entry', 'Enhanced', 'Standard', 'Basic', 'Super Enhanced'],
      data: [0, 2270, 3380, 360, 101, 0],
      total: [0, 2270, 3380, 360, 101, 0].reduce((a, c) => a + c, 0)
    }]
  },
  {
    card: {
      title: 'Assault Incidents',
      description: 'Total Assaults in this time period'
    },
    chart: [{
      id: 'chart3',
      type: 'pie',
      labels: ['Serious', 'General'],
      data: [300, 467],
      total: [300, 467].reduce((a, c) => a + c, 0)
    }]
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
    card: {
      title: 'Prisoner on Prisoner Assaults',
      description: 'Prisoner on prisoner assault totals',
      width: 'half'
    },
    chart: [{
      id: 'chart1',
      type: 'line',
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
    }]
  },
  {
    card: {
      title: 'Prisoner on Staff Assaults',
      description: 'Prisoner on staff assault totals',
      width: 'half'
    },
    chart: [{
      id: 'chart2',
      type: 'line',
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
    }]
  },
  {
    card: {
      title: 'Self Harm Methods',
      description: 'Self harm methods over time',
      width: 'half'
    },
    chart: [{
      id: 'chart3',
      type: 'line',
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
    }]
  },
  {
    card: {
      title: 'Prisoner on Staff Assaults',
      width: 'half'
    },
    chart: [{
      id: 'chart4',
      type: 'line',
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
    }]
  },
  {
    card: {
      title: 'Self Harm Methods',
      description: 'Self harm methods over time',
      width: 'half'
    },
    chart: [{
      id: 'chart5',
      type: 'line',
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
    }]
  }
]

const barCharts = [
  {
    card: {
      title: 'Finds Incidents',
      description: 'Total finds during this time period',
      date: '22/23',
      href: '#',
      width: 'half'
    },
    chart: [{
      id: 'chart1',
      type: 'bar',
      labels: ['Drugs', 'Phones', 'Weapons', 'Alcohol'],
      data: [
        {
          title: 'Assaults',
          data: [141, 130, 37, 47]
        }
      ],
      indexAxis: 'x'
    }]
  },
  {
    card: {
      title: 'Assault Incidents',
      description: 'Total assaults in this time period',
      width: 'half'
    },
    chart: [{
      id: 'chart2',
      type: 'bar',
      labels: ['Serious', 'General'],
      data: [
        {
          title: 'Assaults',
          data: [300, 467]
        }
      ],
      indexAxis: 'x'
    }]
  },
  {
    card: {
      title: 'Population Overview',
      description: 'Total Population breakdown in this time period',
      href: '#',
      width: 'half'
    },
    chart: [{
      id: 'chart3',
      type: 'bar',
      labels: ['Entry', 'Enhanced', 'Standard', 'Basic', 'Super Enhanced'],
      data: [
        {
          title: 'Assaults',
          data: [0, 2270, 3380, 360, 101, 0]
        }
      ],
      axis: 'y'
    }]
  },
  {
    card: {
      title: 'Population Overview',
      description: 'Total Population breakdown in this time period',
      href: '#',
      width: 'half'
    },
    chart: [{
      id: 'chart4',
      type: 'bar',
      labels: ['Entry', 'Enhanced', 'Standard', 'Basic', 'Super Enhanced'],
      data: [
        {
          title: 'Assaults',
          data: [0, 2270, 3380, 360, 101, 0]
        }
      ],
      axis: 'y'
    }]
  },
  {
    card: {
      title: 'Prisoner on Staff Assaults',
      date: '22/23',
      href: '#',
      width: 'half'
    },
    chart: [{
      id: 'chart5',
      type: 'bar',
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
    }]
  },
  {
    card: {
      title: 'Prisoner on Staff Assaults',
      date: '22/23',
      href: '#',
      width: 'half'
    },
    chart: [{
      id: 'chart6',
      type: 'bar',
      axis: 'y',
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
    }]
  }
]

const generateHeatmapData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const data = []
  for (let day = 0; day < days.length; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const randomValue = Math.floor(Math.random() * 15)
      data.push({ y: days[day], x: hour + 1, v: randomValue })
    }
  }
  return data
}

const heatmapCharts = [
  {
    card: {
      title: 'Time and day of the week of Self Harm incidents',
      date: 'the last week',
      href: '#'
    },
    chart: [{
      id: 'chart1',
      type: 'heatmap',
      data: generateHeatmapData(),
      xLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      yLabels: [
        'Sun',
        'Sat',
        'Fri',
        'Thu',
        'Wed',
        'Tue',
        'Mon'
      ]
    }]
  },
  {
    card: {
      title: 'Time and day of the week of Self Harm incidents',
      date: 'the last week',
      href: '#'
    },
    chart: [{
      id: 'chart2',
      type: 'heatmap',
      data: generateHeatmapData(),
      xLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      yLabels: [
        'Sun',
        'Sat',
        'Fri',
        'Thu',
        'Wed',
        'Tue',
        'Mon'
      ]
    }]
  }
]

module.exports = [
  ...doughnutCharts,
  ...pieCharts,
  ...lineCharts,
  ...barCharts,
  ...heatmapCharts
]
