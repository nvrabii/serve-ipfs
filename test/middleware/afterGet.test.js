import { expect } from 'chai'
import afterGet from '../../src/middleware/afterGet.js'
import ResMock from '../mocks/ResMock.js'

describe('afterGet middleware', () => {
  it('properly sets the response', () => {
    const data = { m: 'message' }
    const path = '/my.json'
    const expectedContentType = 'application/json'
    const expectedStatus = 200

    let resMock = new ResMock({ data, locals: { data, path } })

    afterGet({}, resMock)

    expect(resMock._status).equals(expectedStatus)
    expect(resMock._headers['Content-type']).equals(expectedContentType)
    expect(resMock.data).equals(data)
  })
})
