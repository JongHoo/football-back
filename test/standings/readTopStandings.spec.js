const lambdaTester = require('../util/lamba-tester')
const subject = require('../../src/standings/readTopStandings')
const Query = require('../../src/standings/query')
const commonUtil = require('../../src/common/commonUtil')

beforeEach(() => {
  commonUtil.connect = jest.fn().mockResolvedValue()
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('read top standings Test', () => {
  let event = {
    pathParameters: {}
  }

  it('success case', (done) => {
    Query.readTopStandings = jest.fn().mockResolvedValue([])

    lambdaTester(subject)
      .with(event)
      .soThat((error, result) => {
        expect(error).toBeNull()
        expect(JSON.parse(result.statusCode)).toEqual(200)
        expect(JSON.parse(result.body)).toEqual([])
        done()
      })
  })

  it('read top standings error', (done) => {
    Query.readTopStandings = jest.fn().mockRejectedValue('READ ERROR')

    lambdaTester(subject)
      .with(event)
      .soThat((error, result) => {
        expect(error).toBeNull()
        expect(JSON.parse(result.statusCode)).toEqual(500)
        expect(JSON.parse(result.body)).toEqual('READ ERROR')
        done()
      })
  })
})
