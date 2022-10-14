import { expect } from 'chai'
import setRetryDefault from '../../src/middleware/setRetryDefault.js'
import ResMock from '../mocks/ResMock.js'

describe('setRetryDefault middleware', () => {
  it('sets retryDefault=true', () => {
    let resMock = new ResMock()

    setRetryDefault({}, resMock, () => {})

    expect(resMock.locals.retryDefault).is.true
  })
})
