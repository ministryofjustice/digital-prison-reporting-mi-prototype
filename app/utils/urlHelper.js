const querystring = require('querystring')

const createUrlForParameters = (currentQueryParams, prefix, updateQueryParams) => {
  const queryParams = {
    ...currentQueryParams
  }

  if (updateQueryParams) {
    Object.keys(updateQueryParams).forEach(q => {
      if (updateQueryParams[q] || updateQueryParams[q] === false) {
        queryParams[prefix + q] = updateQueryParams[q]
      } else {
        Object.keys(queryParams)
          .filter(key => key === (prefix + q) || key.startsWith(prefix + q + '.'))
          .forEach(key => {
            queryParams[key] = null
          })
      }
    })
  } else {
    Object.keys(queryParams)
      .filter(key => key.startsWith(prefix))
      .forEach(key => {
        queryParams[key] = null
      })
  }

  const nonEmptyQueryParams = {}

  Object.keys(queryParams)
    .filter(key => queryParams[key] || queryParams[key] === false)
    .forEach(key => {
      nonEmptyQueryParams[key] = queryParams[key]
    })

  return '?' + querystring.stringify(nonEmptyQueryParams)
}

module.exports = {
  createUrlForParameters,

  getCreateUrlForParametersFunction: (currentQueryParams, prefix) => {
    return updateQueryParams => (createUrlForParameters(currentQueryParams, prefix, updateQueryParams))
  }
}
