// Core dependencies
const path = require('path')
const url = require('url')

// NPM dependencies
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const express = require('express')
const nunjucks = require('nunjucks')
const sessionInCookie = require('client-sessions')
const sessionInMemory = require('express-session')

// Run before other code to make sure variables from .env are available
dotenv.config()

// Local dependencies
const middleware = [
  require('./lib/middleware/authentication/authentication.js')(),
  require('./lib/middleware/extensions/extensions.js')
]
const config = require('./app/config.js')
const documentationRoutes = require('./docs/documentation_routes.js')
const prototypeAdminRoutes = require('./lib/prototype-admin-routes.js')
const packageJson = require('./package.json')
const routes = require('./app/routes.js')
const addMainUiRoutes = require('./app/versions/main-ui/routes.js')
const addSdtRoutes = require('./app/versions/sdt/routes.js')
const addOperationalReportingRoutes = require('./app/versions/operational-reporting/routes.js')
const addIconsRoutes = require('./app/versions/icons/routes.js')
const addChartsRoutes = require('./app/versions/charts/routes.js')
const addMetricsRoutes = require('./app/versions/metrics/routes.js')
const addMisRoutes = require('./app/versions/mis/routes.js')
const utils = require('./lib/utils.js')
const extensions = require('./lib/extensions/extensions.js')

const app = express()
const documentationApp = express()

// Set up configuration variables
const releaseVersion = packageJson.version
const env = utils.getNodeEnv()
const useAutoStoreData = process.env.USE_AUTO_STORE_DATA || config.useAutoStoreData
const useCookieSessionStore = process.env.USE_COOKIE_SESSION_STORE || config.useCookieSessionStore
let useHttps = process.env.USE_HTTPS || config.useHttps

useHttps = useHttps.toLowerCase()

const useDocumentation = (config.useDocumentation === 'true')

// Promo mode redirects the root to /docs - so our landing page is docs when published on heroku
let promoMode = process.env.PROMO_MODE || 'false'
promoMode = promoMode.toLowerCase()

// Disable promo mode if docs aren't enabled
if (!useDocumentation) promoMode = 'false'

// Force HTTPS on production. Do this before using basicAuth to avoid
// asking for username/password twice (for `http`, then `https`).
const isSecure = (env === 'production' && useHttps === 'true')
if (isSecure) {
  app.use(utils.forceHttps)
  app.set('trust proxy', 1) // needed for secure cookies on heroku
}

// Add variables that are available in all views
app.locals.asset_path = '/public/'
app.locals.useAutoStoreData = (useAutoStoreData === 'true')
app.locals.useCookieSessionStore = (useCookieSessionStore === 'true')
app.locals.promoMode = promoMode
app.locals.releaseVersion = 'v' + releaseVersion
app.locals.serviceName = config.serviceName
app.locals.appScripts = config.scripts
app.locals.appStylesheets = config.stylesheets
// extensionConfig sets up variables used to add the scripts and stylesheets to each page.
app.locals.extensionConfig = extensions.getAppConfig()

// use cookie middleware for reading authentication cookie
app.use(cookieParser())

// Session uses service name to avoid clashes with other prototypes
const sessionName = 'govuk-prototype-kit-' + (Buffer.from(config.serviceName, 'utf8')).toString('hex')
const sessionHours = (promoMode === 'true') ? 20 : 4
const sessionOptions = {
  secret: sessionName,
  cookie: {
    maxAge: 1000 * 60 * 60 * sessionHours,
    secure: isSecure
  }
}

// Support session data in cookie or memory
if (useCookieSessionStore === 'true') {
  app.use(sessionInCookie(Object.assign(sessionOptions, {
    cookieName: sessionName,
    proxy: true,
    requestKey: 'session'
  })))
} else {
  app.use(sessionInMemory(Object.assign(sessionOptions, {
    name: sessionName,
    resave: false,
    saveUninitialized: false
  })))
}

// Authentication middleware must be loaded before other middleware such as
// static assets to prevent unauthorised access
middleware.forEach(func => app.use(func))

// Set up App
const appViews = extensions.getAppViews([
  path.join(__dirname, '/app/views/'),
  path.join(__dirname, '/lib/'),
  path.join(__dirname, '/app/components/'),
  path.join(__dirname, '/app/versions/')
])

const nunjucksConfig = {
  autoescape: true,
  noCache: true,
  watch: false // We are now setting this to `false` (it's by default false anyway) as having it set to `true` for production was making the tests hang
}

if (env === 'development') {
  nunjucksConfig.watch = true
}

nunjucksConfig.express = app

const nunjucksAppEnv = nunjucks.configure(appViews, nunjucksConfig)

// Add Nunjucks filters
utils.addNunjucksFilters(nunjucksAppEnv)

// Set views engine
app.set('view engine', 'html')

// Middleware to serve static assets
app.use('/public', express.static(path.join(__dirname, '/public')))

// Serve govuk-frontend in from node_modules (so not to break pre-extensions prototype kits)
app.use('/node_modules/govuk-frontend', express.static(path.join(__dirname, '/node_modules/govuk-frontend')))

// Serve MOJ front end assets
app.use('/moj/assets', express.static(path.join(__dirname, '/node_modules/@ministryofjustice/frontend/moj/assets')))

// Serve app JS and stylesheets
config.scripts.concat(config.stylesheets).forEach(s => {
  app.use(s.path, express.static(path.join(__dirname, s.location)))
})

let nunjucksDocumentationEnv

// Set up documentation app
if (useDocumentation) {
  const documentationViews = [
    path.join(__dirname, '/node_modules/govuk-frontend/'),
    path.join(__dirname, '/node_modules/govuk-frontend/components'),
    path.join(__dirname, '/docs/views/'),
    path.join(__dirname, '/lib/')
  ]

  nunjucksConfig.express = documentationApp
  nunjucksDocumentationEnv = nunjucks.configure(documentationViews, nunjucksConfig)
  // Nunjucks filters
  utils.addNunjucksFilters(nunjucksDocumentationEnv)

  // Set views engine
  documentationApp.set('view engine', 'html')
}

// Support for parsing data in POSTs
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

nunjucksAppEnv.addGlobal('getTodayIsoDate', () => {
  const date = new Date()
  return date.toISOString().substring(0, 10)
})

// Automatically store all data users enter
if (useAutoStoreData === 'true') {
  app.use(utils.autoStoreData)
  utils.addCheckedFunction(nunjucksAppEnv)
  if (useDocumentation) {
    utils.addCheckedFunction(nunjucksDocumentationEnv)
  }
}

// Load prototype admin routes
app.use('/prototype-admin', prototypeAdminRoutes)

// Redirect root to /docs when in promo mode.
if (promoMode === 'true') {
  console.log('Prototype Kit running in promo mode')

  app.get('/', function (req, res) {
    res.redirect('/docs')
  })

  // Allow search engines to index the Prototype Kit promo site
  app.get('/robots.txt', function (req, res) {
    res.type('text/plain')
    res.send('User-agent: *\nAllow: /')
  })
} else {
  // Prevent search indexing
  app.use(function (req, res, next) {
    // Setting headers stops pages being indexed even if indexed pages link to them.
    res.setHeader('X-Robots-Tag', 'noindex')
    next()
  })

  app.get('/robots.txt', function (req, res) {
    res.type('text/plain')
    res.send('User-agent: *\nDisallow: /')
  })
}

// Load routes (found in app/routes.js)
app.use('/', routes)
addMainUiRoutes(app)
addSdtRoutes(app)
addChartsRoutes(app)
addMetricsRoutes(app)
addOperationalReportingRoutes(app)
addMisRoutes(app)
addIconsRoutes(app)

if (useDocumentation) {
  // Clone app locals to documentation app locals
  // Use Object.assign to ensure app.locals is cloned to prevent additions from
  // updating the original app.locals
  documentationApp.locals = Object.assign({}, app.locals)
  documentationApp.locals.serviceName = 'Prototype Kit'

  // Create separate router for docs
  app.use('/docs', documentationApp)

  // Docs under the /docs namespace
  documentationApp.use('/', documentationRoutes)
}

// Strip .html and .htm if provided
app.get(/\.html?$/i, function (req, res) {
  let path = req.path
  const parts = path.split('.')
  parts.pop()
  path = parts.join('.')
  res.redirect(path)
})

// Auto render any view that exists

// App folder routes get priority
app.get(/^([^.]+)$/, function (req, res, next) {
  utils.matchRoutes(req, res, next)
})

if (useDocumentation) {
  // Documentation  routes
  documentationApp.get(/^([^.]+)$/, function (req, res, next) {
    if (!utils.matchMdRoutes(req, res)) {
      utils.matchRoutes(req, res, next)
    }
  })
}

// Redirect all POSTs to GETs - this allows users to use POST for autoStoreData
app.post(/^\/([^.]+)$/, function (req, res) {
  res.redirect(url.format({
    pathname: '/' + req.params[0],
    query: req.query
  })
  )
})

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error(`Page not found: ${req.path}`)
  err.status = 404
  next(err)
})

// Display error
app.use(function (err, req, res) {
  console.error(err.message)
  res.status(err.status || 500)
  res.send(err.message)
})

module.exports = app
