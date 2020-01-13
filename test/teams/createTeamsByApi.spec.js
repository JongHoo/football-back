const lambdaTester = require('../util/lamba-tester')
const subject = require('../../src/teams/createTeamsByApi')
const Query = require('../../src/teams/query')
const commonUtil = require('../../src/common/commonUtil')
const extApi = require('../../src/common/extApi')

beforeEach(() => {
  commonUtil.connect = jest.fn().mockResolvedValue()
  extApi.getTeams = jest.fn().mockResolvedValue({
    data: {
      data: {
        teams: [{}]
      }
    }
  })
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('create teams by api Test', () => {
  let event = {}

  it('success case', (done) => {
    Query.deleteTeams = jest.fn().mockResolvedValue()
    Query.insertTeams = jest.fn().mockResolvedValue([])

    lambdaTester(subject)
      .with(event)
      .soThat((error, result) => {
        expect(error).toBeNull()
        expect(JSON.parse(result.statusCode)).toEqual(200)
        expect(JSON.parse(result.body)).toEqual([])
        done()
      })
  })

  it('get teams by api Error', (done) => {
    extApi.getTeams = jest.fn().mockResolvedValue({
      data: {
        data: {
          teams: []
        }
      }
    })

    lambdaTester(subject)
      .with(event)
      .soThat((error, result) => {
        expect(error).toBeNull()
        expect(JSON.parse(result.statusCode)).toEqual(500)
        expect(JSON.parse(result.body)).toEqual('no teams')
        done()
      })
  })
})
