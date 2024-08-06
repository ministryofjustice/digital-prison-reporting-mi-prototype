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
    { path: '/app/bookmark-toggle-v1', location: '/app/versions/operational-reporting/v1/components/bookmark-toggle/init.js' },
    { path: '/app/my-bookmark-v1', location: '/app/versions/operational-reporting/v1/components/my-bookmarks/init.js' },
    { path: '/app/mis-bookmarking.js', location: '/app/versions/mis/v1/components/bookmarkToggle/init.js' },
    { path: '/app/v2-search-box.js', location: '/app/versions/operational-reporting/v2/components/search-box/init.js' },
    { path: '/app/v3-search-box.js', location: '/app/versions/operational-reporting/v3/components/search-box/init.js' },
    { path: '/app/v10-async-card-group', location: '/app/versions/main-ui/v10/components/card-group-status/init.js' },
    { path: '/app/v10-async-card-recent', location: '/app/versions/main-ui/v10/components/card-group-recent/init.js' },
    { path: '/app/v11-search-box.js', location: '/app/versions/main-ui/v11/components/search-box/init.js' },
    { path: '/app/v11-filters.js', location: '/app/versions/main-ui/v11/components/filters/init.js' },
    { path: '/app/bookmark-toggle-v6', location: '/app/versions/operational-reporting/v6/components/bookmark-toggle/init.js' },
    { path: '/app/filtered-tags-v6', location: '/app/versions/operational-reporting/v6/components/filtered-tags/init.js' },
    { path: '/app/v6-search-box.js', location: '/app/versions/operational-reporting/v6/components/search-box/init.js' },
    { path: '/app/v6-view-toggle.js', location: '/app/versions/operational-reporting/v6/components/view-toggle/init.js' },
    { path: '/app/v12-search-box.js', location: '/app/versions/main-ui/v12/components/search-box/init.js' },
    { path: '/app/v13-relative-date-range.js', location: '/app/versions/main-ui/v13/components/relative-date-picker/init.js' }
  ],
  stylesheets: []
}

