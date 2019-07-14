const LambdaTester = require('lambda-tester')
const subject = require('../../src/leagues/readLeagues')
jest.setTimeout(30000)

describe('Read Leagues Test', () => {

  it('error when response league is empty ', async (done) => {
    return await LambdaTester(subject.handle)
      .event({})
      .expectResult(result => {
        expect(JSON.parse(result.body).length).toEqual(6)
        done()
      })
  })
})
