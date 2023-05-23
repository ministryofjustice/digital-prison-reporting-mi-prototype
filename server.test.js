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

describe('GET /reports/', () => {
  it('Reports page returns successfully', () => {
    return request(app)
      .get('/reports/')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('Digital Prison Reporting MI Prototype')
      })
  })
})

describe('GET /reports/person-register', () => {
  it('Person register report returns successfully', () => {
    return request(app)
      .get('/reports/person-register')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('Person register')
      })
  })
})

describe('GET /reports/prisoner-movements', () => {
  it('External movements report returns successfully', () => {
    return request(app)
      .get('/reports/prisoner-movements')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('External movements')
      })
  })
})
