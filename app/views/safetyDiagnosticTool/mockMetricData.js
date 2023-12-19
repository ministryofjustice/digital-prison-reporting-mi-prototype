const prisonerInsights = [
  {
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
    type: 'prisoners',
    title: 'Number of prisoners up for release',
    value: '36',
    date: 'last 7 days',
  }, 
  {
    type: 'prisoners',
    title: 'Self Harmers in population',
    value: '36%',
    date: 'last 7 days',
  },  
  {
    type: 'prisoners',
    title: 'Number at risk of self harm',
    value: '205',
    date: 'last 7 days',
  },
  {
    type: 'prisoners',
    title: 'Prisoners at risk of committing serious assault',
    value: '8%',
    date: 'last 7 days',
  }, 
  {
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
  },   
]

const incidentsInsights = [
  {
    type: 'incidents',
    title: 'Total Assaults',
    value: '139',
    date: 'last 7 days',
    href: '/safety-diagnostic-tool/v2/category/assaults/breakdown/assaults'
  },
  {
    type: 'incidents',
    title: 'Total Finds',
    value: '369',
    date: 'last 7 days',
  },
  {
    type: 'incidents',
    title: 'Total Self Harm',
    value: '323',
    date: 'last 7 days',
  },
  {
    type: 'incidents',
    title: 'Total First time Self Harm',
    value: '35',
    date: 'last 7 days',
  },
  {
    type: 'incidents',
    title: 'Repeat Self Harm',
    value: '13',
    date: 'last 7 days',
  },
  {
    type: 'incidents',
    title: 'Total Disorder',
    value: '184',
    date: 'last 7 days',
  },  
  {
    type: 'incidents',
    title: 'Day most incidents occur',
    value: 'Monday',
    date: 'last 7 days',
  },
]

const assaultInsights = [{
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
    type: 'assaults',
    title: 'Serious on staff',
    value: '10',
    date: 'last 7 days',
    href: '/safety-diagnostic-tool/v2/category/assaults/breakdown/assaults'
  }
]

  const homepageInsights = [
  {
    type: 'basic',
    title: 'Estimated total cost of crime in England and Wales',
    value: '£58.9bn',
    date: '2015/16',
    diff: {
      direction: 'up', // up | down
      value: '0.4 million',
      from: '2021/22'
    }
  },
  {
    type: 'basic',
    title: 'Estimated total cost of crime in England and Wales',
    value: '£58.9bn',
    date: '2015/16',
    diff: {
      direction: 'up', // up | down
      value: '0.4 million',
      from: '2021/22'
    }
  }
]

module.exports = [
  ...prisonerInsights,
  ...incidentsInsights,
  ...homepageInsights,
  ...assaultInsights
]

