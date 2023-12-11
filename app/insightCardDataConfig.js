const insightCardData = [
  {
    type: 'basic',
    title: 'Estimated total cost of crime in England and Wales',
    value: '£58.9bn',
    date: '2015/16',
    diff: {
      direction: 'Up', // Up | Down
      value: '0.4 million',
      from: '2021/22'
    }
  },
  {
    type: 'basic',
    title: 'Estimated total cost of crime in England and Wales',
    value: '£58.9bn',
    date: '2015/16'
  },
  {
    type: 'basic',
    title: 'Estimated total cost of crime in England and Wales',
    values: [
      {
        label: 'Male',
        value: '84,006 prisoners'
      },
      {
        label: 'Female',
        value: '3,570 prisoners'
      }
    ],
    date: '2015/16'
  },
  {
    type: 'basic',
    title: 'Estimated total cost of crime in England and Wales',
    value: '£58.9bn',
    date: '2015/16',
    diff: {
      direction: 'Up', // Up | Down
      value: '0.4 million',
      from: '2021/22'
    }
  },
  {
    type: 'basic',
    title: 'Estimated total cost of crime in England and Wales',
    values: [
      {
        label: 'Male',
        value: '84,006 prisoners'
      },
      {
        label: 'Female',
        value: '3,570 prisoners'
      }
    ],
    date: '2015/16'
  }
]

module.exports = [
  ...insightCardData
]