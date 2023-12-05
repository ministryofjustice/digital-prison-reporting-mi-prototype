// Config for each chart card
// TODO: data + labels to be transformed from raw data for each chart card

const doughnutCharts = [
  {
    id:'chart1',
    type: 'doughnut',
    title: 'Find Totals',
    description: "Total finds during this time period",
    labels: ["Drugs","Phones","Weapons","Alcohol"],
    data: [141,130,37,47]
  },
  {
    id:'chart2',
    type: 'doughnut',
    title: 'Disorder Totals',
    description: "Total Disorder incidents during this time period",
    labels: ['IaH','Barricade','Indiscipline','Hostage','Damage','Fire'],
    data: [44,9,5,10,101,25]
  },
  {
    id:'chart3',
    type: 'doughnut',
    title: 'Population',
    description: "Total Population breakdown in this time period",
    labels: ['Entry','Enhanced','Standard','Basic','Super Enhanced'],
    data: [0,2270,3380,360,101,0]
  }
]

const pieCharts = [
  {
    id:'chart1',
    type: 'pie',
    title: 'Total Finds',
    description: "Total finds during this time period",
    labels: ["Drugs","Phones","Weapons","Alcohol"],
    data: [141,130,37,47]
  },
  {
    id:'chart2',
    type: 'pie',
    title: 'Total Disorder',
    description: "Total Disorder incidents during this time period",
    labels: ['IaH','Barricade','Indicipline','Hostage','Damage','Fire'],
    data: [44,9,5,10,101,25]
  },
  {
    id:'chart3',
    type: 'pie',
    title: 'Population',
    description: "Total Population breakdown in this time period",
    labels: ['Entry','Enhanced','Standard','Basic','Super Enhanced'],
    data: [0,2270,3380,360,101,0]
  }
]

const barCharts = [
  {
    id:'chart1',
    type: 'bar',
    title: 'Assault Totals',
    description: "Total assaults during this time period",
    labels: ["Serious","On Staff","Serious On Staff","On Prisoner","Serious On Prisoner" ],
    data: [19,36,3,104,16]
  },
  {
    id:'chart2',
    type: 'bar',
    title: 'Self Harm Totals',
    description: "Total Self Harm incidents during this time period",
    labels: ['Individuals','Incidents','Repeat (2+/week)','Dual harmers','First-time incidents'],
    data: [156,323,13,22,25]
  },
]

module.exports = [
  ...doughnutCharts,
  ...pieCharts,
  ...barCharts
]