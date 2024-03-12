module.exports = {
  configureCurrentUrl: (req, res, next) => {
    req.renderOptions = {
      ...req.renderOptions,
      currentUrl: req.route.path,
      originalUrl: req.originalUrl
    }
    next()
  },

  configureNavigation: (req, res, next) => {
    req.renderOptions = {
      ...req.renderOptions,
      breadcrumbs: [],
      navigationOptions: [
        {
          text: 'Main UI',
          href: '/main-ui/',
          description: 'The main UI\'s prototypes.'
        },
        {
          text: 'Charts',
          href: '/charts/',
          description: 'Chart prototypes.'
        },
        {
          text: 'Metrics',
          href: '/metrics/',
          description: 'Metrics prototypes.'
        },
        {
          text: 'Safety Diagnostic Tool',
          href: '/safety-diagnostic-tool/',
          description: 'Safety Diagnostic Tool\'s prototypes.'
        }
      ]
    }
    next()
  }
}
