/*
* @jest-environment node
*/

const request = require('supertest')

const app = require('./server')

describe('GET /', () => {
  it('Home page returns successfully', () => {
    return request(app)
      .get('/')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('Digital Prison Reporting MI Prototype')
      })
  })

  it('Unknown page returns not found', () => {
    return request(app)
      .get('/unknown')
      .expect('Content-Type', /text\/html/)
      .expect(404)
  })
})

describe('GET /visualisations/', () => {
  it('Visualisations page returns successfully', () => {
    return request(app)
      .get('/visualisations/')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('Digital Prison Reporting MI Prototype')
      })
  })
})

describe('GET /lists/external-movements', () => {
  it('External movements list returns successfully', () => {
    return request(app)
      .get('/lists/external-movements')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('External movements')
      })
  })

  it('Does not fail when valid filters passed', () => {
    return request(app)
      .get('/lists/external-movements?filters.date.start=01%2F06%2F2023&filters.date.end=09%2F06%2F2023&filters.direction=in')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('External movements')
      })
  })

  it('Does not fail when empty dates passed', () => {
    return request(app)
      .get('/lists/external-movements?filters.date.start=&filters.date.end=')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('External movements')
      })
  })
})

describe('GET /visualisations/external-movements', () => {
  it('External movements report returns successfully', () => {
    return request(app)
      .get('/visualisations/external-movements-by-weekday-bar')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('External movements')
      })
  })

  it('Does not fail when valid filters passed', () => {
    return request(app)
      .get('/visualisations/external-movements-by-weekday-bar?filters.date.start=01%2F06%2F2023&filters.date.end=09%2F06%2F2023&filters.direction=in')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('External movements')
      })
  })

  it('Does not fail when empty dates passed', () => {
    return request(app)
      .get('/visualisations/external-movements-by-weekday-bar?filters.date.start=&filters.date.end=')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('External movements')
      })
  })
})

describe('GET /prototype-admin/*', () => {
  it('Clear data successfully', () => {
    return request(app)
      .get('/prototype-admin/clear-data')
      .expect('Content-Type', /text\/html/)
      .expect(200)
  })

  it('Password check renders successfully', () => {
    return request(app)
      .get('/prototype-admin/password')
      .expect('Content-Type', /text\/html/)
      .expect(200)
  })
})
