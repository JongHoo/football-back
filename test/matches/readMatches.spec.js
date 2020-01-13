const lambdaTester = require('../util/lamba-tester')
const subject = require('../../src/matches/readMatches')
const Query = require('../../src/matches/query')
const commonUtil = require('../../src/common/commonUtil')

beforeEach(() => {
  commonUtil.connect = jest.fn().mockResolvedValue()
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('read matches test', () => {
  let event = {
    pathParameters: {
      team: 'TEST_TEAM'
    }
  }

  it('success case', (done) => {
    Query.readMatches = jest.fn().mockResolvedValue([])

    lambdaTester(subject)
      .with(event)
      .soThat((error, result) => {
        expect(error).toBeNull()
        expect(JSON.parse(result.statusCode)).toEqual(200)
        expect(JSON.parse(result.body)).toEqual([])
        done()
      })
  })
})
