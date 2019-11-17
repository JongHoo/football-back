const subject = require('../../src/leagues/readLeagues')
const lambdaTester = require('../util/lamba-tester')
const commonUtil = require('../../src/common/commonUtil')
const Query = require('../../src/leagues/query')

const NOT_EMPTY_ARRAY = [{}]

describe('readLeagues Test', () => {
  let event = {}

  beforeEach(() => {
    commonUtil.connect = jest.fn().mockResolvedValue({})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('Success Case', (done) => {
    Query.readLeagues = jest.fn().mockResolvedValue(NOT_EMPTY_ARRAY)

    lambdaTester(subject)
      .with(event)
      .soThat((error, result) => {
        expect(error).toBeNull()
        expect(JSON.parse(result.statusCode)).toEqual(200)
        expect(JSON.parse(result.body)).toEqual(NOT_EMPTY_ARRAY)
        done()
      })
  })

  it('Error when read leagues', (done) => {
    Query.readLeagues = jest.fn().mockRejectedValue('ERROR')

    lambdaTester(subject)
      .with(event)
      .soThat((error, result) => {
        expect(error).toBeNull()
        expect(JSON.parse(result.statusCode)).toEqual(500)
        expect(JSON.parse(result.body)).toEqual('ERROR')
        done()
      })
  })
})
