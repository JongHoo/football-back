const LambdaTester = require('lambda-tester')
const subject = require('../../src/matches/createMatchesByApi')
const commonUtil = require('../../src/common/commonUtil')
const extApi = require('../../src/common/extApi')

beforeEach(() => {
  commonUtil.connect = jest.fn().mockReturnValue(new Promise(resolve => resolve()))
  extApi.getMatches = jest.fn().mockReturnValue(new Promise(resolve => resolve({
    data: {
      data: {
        rounds: [
          {
            matches: [
              {
                identifier: 'legsferfpgacdzqmyqi1lokzp18aqodf',
                date_match: '2018-08-10T21:00:00+0200',
                home_team: 'Man United',
                away_team: 'Leicester City',
                match_result: '2-1'
              }
            ]
          }
        ]
      }
    }
  })))

})


afterEach(() => {
  jest.restoreAllMocks()
})

describe('create matches by api test', () => {

  it('get matches and save to mongodb', (done) => {
    Match.deleteMany = jest.fn().mockResolvedValue({})
    Match.create = jest.fn().mockResolvedValue({})

    return LambdaTester(subject.handle)
      .event({
        league: 'test_league',
        season: 'test_season'
        })
      .expectResult(result => {
        expect(JSON.parse(result.body)).toEqual('all match data inserted')
        done()
      })
  })
})
