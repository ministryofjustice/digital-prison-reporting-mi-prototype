# Digital Prison Reporting Management Information (MI) Reports Prototype

[![repo standards badge](https://img.shields.io/badge/dynamic/json?color=blue&style=for-the-badge&logo=github&label=MoJ%20Compliant&query=%24.data%5B%3F%28%40.name%20%3D%3D%20%22moj-prototype-template%22%29%5D.status&url=https%3A%2F%2Foperations-engineering-reports.cloud-platform.service.justice.gov.uk%2Fgithub_repositories)](https://operations-engineering-reports.cloud-platform.service.justice.gov.uk/github_repositories#moj-prototype-template "Link to report")

#### CODEOWNER

- Team : [hmpps-digital-prison-reporting](https://github.com/orgs/ministryofjustice/teams/hmpps-digital-prison-reporting)
- Email : digitalprisonreporting@digital.justice.gov.uk

## Overview

Provides an MI Reporting Prototype
In addition to the protype kit v12.1.0, this repository contains Cloud Platform related files to run the website:

**Files to build a docker image to run the prototype site**

* Dockerfile
* .dockerignore
* start.sh

## Local Development

Run the command ```npm start``` and open http://localhost:3000 in a web browser.

## Updating Prototype Kit

To update prototype kit in this repository see the [update guide](https://govuk-prototype-kit.herokuapp.com/docs/updating-the-kit).

## Prototype deployment

The prototype is deployed to the Cloud Platform, as laid out by the prototype [publishing guide](https://user-guide.cloud-platform.service.justice.gov.uk/documentation/getting-started/prototype-kit.html#publish-prototypes-on-the-web).

- URL: https://digital-prison-reporting-mi-prototype-main.apps.live.cloud-platform.service.justice.gov.uk/
- Username: `dpr_user`
- Password: `dpr_password`