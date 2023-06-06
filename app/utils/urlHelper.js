const querystring = require('querystring')

const createUrlForParameters = (currentQueryParams, prefix, updateQueryParams) => {
  const queryParams = {
    ...currentQueryParams
  }

  Object.keys(updateQueryParams).forEach(q => {
    queryParams[prefix + q] = updateQueryParams[q]
  })

  return '?' + querystring.stringify(queryParams)
}

module.exports = {
  createUrlForParameters,

  getCreateUrlForParametersFunction: (currentQueryParams, prefix) => {
    return updateQueryParams => (createUrlForParameters(currentQueryParams, prefix, updateQueryParams))
  }
}
