const getRagStatus = (value, thresholdRules) => {
  if (!thresholdRules) {
    return 'none'
  }

  const matchingRule = thresholdRules.find(r => {
    switch (r.comparison) {
      case 'greaterThanOrEqualTo':
        return value >= r.value
      default:
        return true
    }
  })

  return matchingRule ? matchingRule.status : 'none'
}

const distinct = (values, value) => values.includes(value) ? values : values.concat(value)

module.exports = {
  getRagStatus,
  distinct
}
