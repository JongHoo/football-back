const lambdaTester = require('../util/lamba-tester')
const subject = require('../../src/standings/readStandings')
const Query = require('../../src/standings/query')
const commonUtil = require('../../src/common/commonUtil')

beforeEach(() => {
  commonUtil.connect = jest.fn().mockResolvedValue()
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('read standings Test', () => {
  let event = {
    pathParameters: {}
  }

  it('success case', (done) => {
    Query.readStandings = jest.fn().mockResolvedValue([])

    lambdaTester(subject)
      .with(event)
      .soThat((error, result) => {
        expect(error).toBeNull()
        expect(JSON.parse(result.statusCode)).toEqual(200)
        expect(JSON.parse(result.body)).toEqual([])
        done()
      })
  })

  it('read standings error', (done) => {
    Query.readStandings = jest.fn().mockRejectedValue(new Error('TEST ERR'))

    lambdaTester(subject)
      .with(event)
      .soThat((error, result) => {
        expect(error).toBeNull()
        expect(JSON.parse(result.statusCode)).toEqual(500)
        expect(JSON.parse(result.body)).toEqual('TEST ERR')
        done()
      })
  })
})
