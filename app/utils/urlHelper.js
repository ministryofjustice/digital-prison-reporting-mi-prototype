const querystring = require('querystring')

const createUrlForParameters = (currentQueryParams, prefix, updateQueryParams) => {
  const queryParams = {
    ...currentQueryParams
  }

  if (updateQueryParams) {
    Object.keys(updateQueryParams).forEach(q => {
      queryParams[prefix + q] = updateQueryParams[q]
    })
  } else {
    Object.keys(queryParams)
      .filter(key => key.startsWith(prefix))
      .forEach(key => {
        queryParams[key] = null
      })
  }

  return '?' + querystring.stringify(queryParams)
}

module.exports = {
  createUrlForParameters,

  getCreateUrlForParametersFunction: (currentQueryParams, prefix) => {
    return updateQueryParams => (createUrlForParameters(currentQueryParams, prefix, updateQueryParams))
  }
}
