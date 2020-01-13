const defaultContext = {
  functionVersion: 'TEST_VERSION',
  invokedFunctionArn: 'TEST_LAMBDA',
  fail: jest.fn().mockReturnValue(data => {
    throw new Error('session error')
  })
}

const testUtil = (labmda) => {
  if (!labmda.handler) {
    throw 'No handler within parameter.'
  }

  const handler = labmda.handler
  let request = {}
  let context = {}

  const tester = {
    with: (req, ctx = defaultContext) => {
      request = req
      context = ctx
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
      handler(request, context, callback)
    }
  }
  return tester
}

module.exports = testUtil
