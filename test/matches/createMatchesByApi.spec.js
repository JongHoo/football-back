const axios = require('axios')
const mongoose = require('mongoose')
const Mockgoose = require('mockgoose').Mockgoose
const mockgoose = new Mockgoose(mongoose)
const LambdaTester = require('lambda-tester')
const subject = require('../../src/matches/createMatchesByApi')
const commonUtil = require('../../src/common/commonUtil')
jest.setTimeout(60000)

beforeEach(() => {
  commonUtil.connect = jest.fn().mockImplementation(() => {
    return mockgoose.prepareStorage().then(() => {
      mongoose.connect('mongodb+srv://admin:dnjstnd1@freecluster-lbn7j.mongodb.net/Football-Test?retryWrites=true', { useNewUrlParser: true })
        .then(conn => {
            console.log('Test Atlas Connected!')
            return conn
          },
          err => {
            console.log('Test Atlas Connection Failed : ', err)
          }
        )
    })
  })

  axios.get = jest.fn().mockImplementation(() => {
    return Promise.resolve({
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
    })
  })
})

afterEach(() => {
  // 이걸로 안되는듯 ㅠㅠ
  jest.restoreAllMocks()
})

afterAll(async (done) => {
  try {
    await mongoose.disconnect(done)
  } catch (err) {
    console.log('error at disconnect')
  }
})

describe('create matches by api test', () => {

  it('get matches and save to mongodb', async (done) => {
    return await LambdaTester(subject.handle)
      .event({
        pathParameters: {
          league: 'test-league',
          season: '18-19'
        }
      })
      .expectResult(result => {
        expect(JSON.parse(result.body)).toEqual('all match data inserted')
        done()
      })
  })
})
