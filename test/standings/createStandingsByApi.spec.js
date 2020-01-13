const lambdaTester = require('../util/lamba-tester')
const subject = require('../../src/standings/createStandingsByApi')
const Query = require('../../src/standings/query')
const commonUtil = require('../../src/common/commonUtil')
const extApi = require('../../src/common/extApi')

beforeEach(() => {
  commonUtil.connect = jest.fn().mockResolvedValue()
  extApi.getStandings = jest.fn().mockResolvedValue({
    data: {
      data: {
        standings: [{}]
      }
    }
  })
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('create standings by api Test', () => {
  let event = {}

  it('success case', (done) => {
    Query.deleteStandings = jest.fn().mockResolvedValue()
    Query.createStandings = jest.fn().mockResolvedValue('TEST')

    lambdaTester(subject)
      .with(event)
      .soThat((error, result) => {
        expect(error).toBeNull()
        expect(JSON.parse(result.statusCode)).toEqual(200)
        expect(JSON.parse(result.body)).toEqual(`TEST`)
        done()
      })
  })

  it('get no standing info', (done) => {
    extApi.getStandings = jest.fn().mockResolvedValue({
      data: {
        data: {
          standings: []
        }
      }
    })

    lambdaTester(subject)
      .with(event)
      .soThat((error, result) => {
        expect(error).toBeNull()
        expect(JSON.parse(result.statusCode)).toEqual(500)
        console.log(result)
        expect(JSON.parse(result.body)).toEqual(`no standing info`)
        done()
      })
  })

  it('delete standings error', (done) => {
    Query.deleteStandings = jest.fn().mockRejectedValue('DELETE ERROR')

    lambdaTester(subject)
      .with(event)
      .soThat((error, result) => {
        expect(error).toBeNull()
        expect(JSON.parse(result.statusCode)).toEqual(500)
        console.log(result)
        expect(JSON.parse(result.body)).toEqual(`DELETE ERROR`)
        done()
      })
  })

  it('insert standings error', (done) => {
    Query.deleteStandings = jest.fn().mockResolvedValue()
    Query.createStandings = jest.fn().mockRejectedValue('INSERT ERROR')

    lambdaTester(subject)
      .with(event)
      .soThat((error, result) => {
        expect(error).toBeNull()
        expect(JSON.parse(result.statusCode)).toEqual(500)
        console.log(result)
        expect(JSON.parse(result.body)).toEqual(`INSERT ERROR`)
        done()
      })
  })
})
