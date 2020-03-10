const lambdaTester = require('../util/lamba-tester')
const subject = require('../../src/matches/createMatchesByApi')
const Query = require('../../src/matches/query')
const commonUtil = require('../../src/common/commonUtil')
const extApi = require('../../src/common/extApi')

beforeEach(() => {
  commonUtil.connect = jest.fn().mockResolvedValue()
  extApi.getMatches = jest.fn().mockResolvedValue({
    data: {
      data: {
        rounds: [
          {
            matches: [{}]
          }
        ]
      }
    }
  })
})


afterEach(() => {
  jest.restoreAllMocks()
})

describe('create matches by api test', () => {
  let event = {}

  it('get matches and save to mongodb', (done) => {
    Query.deleteMatches = jest.fn().mockResolvedValue()
    Query.createMatches = jest.fn().mockResolvedValue()

    lambdaTester(subject)
      .with(event)
      .soThat((error, result) => {
        expect(error).toBeNull()
        expect(JSON.parse(result.statusCode)).toEqual(200)
        expect(JSON.parse(result.body)).toEqual(`all match data inserted`)
        done()
      })
  })

  it('error when delete matches', (done) => {
    Query.deleteMatches = jest.fn().mockRejectedValue(new Error('ERROR!'))

    lambdaTester(subject)
      .with(event)
      .soThat((error, result) => {
        expect(error).toBeNull()
        expect(JSON.parse(result.statusCode)).toEqual(500)
        expect(JSON.parse(result.body)).toEqual(`ERROR!`)
        done()
      })
  })
})
