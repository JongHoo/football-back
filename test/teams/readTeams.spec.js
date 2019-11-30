const lambdaTester = require('../util/lamba-tester')
const subject = require('../../src/teams/readTeams')
const Query = require('../../src/teams/query')
const commonUtil = require('../../src/common/commonUtil')

beforeEach(() => {
  commonUtil.connect = jest.fn().mockResolvedValue()
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('read teams Test', () => {
  let event = {
    pathParameters: {}
  }

  it('success case', (done) => {
    Query.readTeams = jest.fn().mockResolvedValue([])

    lambdaTester(subject)
      .with(event)
      .soThat((error, result) => {
        expect(error).toBeNull()
        expect(JSON.parse(result.statusCode)).toEqual(200)
        expect(JSON.parse(result.body)).toEqual([])
        done()
      })
  })

  it('read teams error', (done) => {
    Query.readTeams = jest.fn().mockRejectedValue('READ ERROR')

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
