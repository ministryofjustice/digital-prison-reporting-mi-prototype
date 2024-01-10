# Adding new versions

1. Create a new folder for the next version (e.g. `v3`).
2. Copy across views/components/scripts that will be updated (or copy as you go), leaving the previous versions' files unchanged.
3. Add the new version's routes to the `main-ui/routes` (e.g. `app.use('/main-ui/v3', v3Routes)`).
4. Add a row to the `versions` array, rendered on the version summary page (e.g. `{ versionNumber: '3', status: 'Done', changeLogPath: 'main-ui/v3/views/changelog' }`).