// Use this file to change prototype configuration.

// Note: prototype config can be overridden using environment variables (eg on heroku)

module.exports = {
  // Service name used in header. Eg: 'Renew your passport'
  serviceName: 'Digital Prison Reporting MI Prototype',

  // Default port that prototype runs on
  port: '3000',

  // Enable or disable password protection on production
  useAuth: 'true',

  // Automatically stores form data, and send to all views
  useAutoStoreData: 'true',

  // Enable cookie-based session store (persists on restart)
  // Please note 4KB cookie limit per domain, cookies too large will silently be ignored
  useCookieSessionStore: 'false',

  // Enable or disable built-in docs and examples.
  useDocumentation: 'false',

  // Force HTTP to redirect to HTTPS on production
  useHttps: 'true',

  // Cookie warning - update link to service's cookie page.
  cookieText: 'GOV.UK uses cookies to make the site simpler. <a href="#">Find out more about cookies</a>',

  // Enable or disable Browser Sync
  useBrowserSync: 'true',

  scripts: [
    { path: '/app/jquery.min.js', location: '/node_modules/jquery/dist/jquery.min.js' },
    { path: '/app/data-table-layout.js', location: '/app/versions/main-ui/v1/components/data-table-layout/init.js' },
    { path: '/app/v3-dropdown.js', location: '/app/versions/main-ui/v3/components/dropdown-button/init.js' },
    { path: '/app/v6-remove-button.js', location: '/app/versions/main-ui/v6/components/remove-list-button/init.js' },
    { path: '/app/v9-card-loading.js', location: '/app/versions/main-ui/v9/components/card-group/init.js' },
    { path: '/app/v2-search-box.js', location: '/app/versions/operational-reporting/v2/components/search-box/init.js' }
  ],

  stylesheets: []
}
