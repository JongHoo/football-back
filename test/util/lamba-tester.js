const ApiContext = {
  functionVersion: 'offline.functionVersion',
  invokedFunctionArn: 'UNIT_TEST',
  fail: jest.fn().mockReturnValue(data => {
    throw new Error('session error')
  })
}

const test = (lambdaModule) => {
  if (!lambdaModule.handler) {
    throw 'No handler within parameter.'
  }

  const handler = lambdaModule.handler
  let _request = {}
  let _context = {}

  const tester = {
    with: (request, context = ApiContext) => {
      _request = request
      _context = context
      return tester
    },
    soThat: (responseCallBack) => {
      const callback = (error, result) => {
        try {
          responseCallBack(error, result)
        } catch (error) {
          fail(error)
        }
      }
      handler(_request, _context, callback)
    }
  }
  return tester
}

module.exports = test
