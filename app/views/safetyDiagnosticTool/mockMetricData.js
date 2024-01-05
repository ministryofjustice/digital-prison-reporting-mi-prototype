const prisonerInsights = [
  {
    id: '1',
    type: 'prisoners',
    title: 'Total Population',
    value: '6011',
    date: 'last 7 days',
    diff: {
      direction: 'up', // Up | Down
      value: '567',
      from: 'last week'
    }
  },
  {
    id: '2',
    type: 'prisoners',
    title: 'Average Viper Score',
    value: '6.4',
    date: 'last 7 days',
    diff: {
      direction: 'down', // Up | Down
      value: '0.2',
      from: 'last week'
    }
  },
  {
    id: '3',
    type: 'prisoners',
    title: 'Number of prisoners up for release',
    value: '36',
    date: 'last 7 days'
  },
  {
    id: '4',
    type: 'prisoners',
    title: 'Self Harmers in population',
    value: '36%',
    date: 'last 7 days'
  },
  {
    id: '5',
    type: 'prisoners',
    title: 'Number at risk of self harm',
    value: '205',
    date: 'last 7 days'
  },
  {
    id: '6',
    type: 'prisoners',
    title: 'Prisoners at risk of committing serious assault',
    value: '8%',
    date: 'last 7 days'
  },
  {
    id: '7',
    type: 'prisoners',
    title: 'Population split by gender',
    values: [
      {
        label: 'Male',
        value: '4572 prisoners'
      },
      {
        label: 'Female',
        value: '1439 prisoners'
      }
    ],
    date: 'last 7 days'
  },
  {
    id: '8',
    type: 'prisoners',
    title: 'Age range in population',
    values: [
      {
        label: 'Under 21',
        value: '1234 prisoners'
      },
      {
        label: '21 and over',
        value: '3013 prisoners'
      },
      {
        label: 'Over 50',
        value: '1439 prisoners'
      }
    ],
    date: 'last 7 days'
  }
]

const incidentsInsights = [
  {
    id: '10',
    type: 'incidents',
    title: 'Total Assaults',
    value: '139',
    date: 'last 7 days',
    href: '/safety-diagnostic-tool/v2/category/assaults/breakdown/assaults'
  },
  {
    id: '20',
    type: 'incidents',
    title: 'Total Finds',
    value: '369',
    date: 'last 7 days'
  },
  {
    id: '30',
    type: 'incidents',
    title: 'Total Self Harm',
    value: '323',
    date: 'last 7 days'
  },
  {
    id: '40',
    type: 'incidents',
    title: 'Total First time Self Harm',
    value: '35',
    date: 'last 7 days'
  },
  {
    id: '50',
    type: 'incidents',
    title: 'Repeat Self Harm',
    value: '13',
    date: 'last 7 days'
  },
  {
    id: '60',
    type: 'incidents',
    title: 'Total Disorder',
    value: '184',
    date: 'last 7 days'
  },
  {
    id: '70',
    type: 'incidents',
    title: 'Day most incidents occur',
    value: 'Monday',
    date: 'last 7 days'
  }
]

const assaultInsights = [
  {
    id: '11',
    type: 'assaults',
    title: 'Total Assaults',
    value: '139',
    date: 'last 7 days',
    href: '/safety-diagnostic-tool/v2/category/assaults/breakdown/assaults',
    diff: {
      direction: 'up', // up | down
      value: '12',
      from: 'last week'
    }
  },
  {
    id: '12',
    type: 'assaults',
    title: 'Total Serious Assaults',
    value: '89',
    date: 'last 7 days',
    href: '/safety-diagnostic-tool/v2/category/assaults/breakdown/assaults',
    diff: {
      direction: 'down', // up | down
      value: '6',
      from: 'last week'
    }
  },
  {
    id: '13',
    type: 'assaults',
    title: 'Serious on staff',
    value: '10',
    date: 'last 7 days',
    href: '/safety-diagnostic-tool/v2/category/assaults/breakdown/assaults'
  }
]

module.exports = [
  ...prisonerInsights,
  ...incidentsInsights,
  ...assaultInsights
]
