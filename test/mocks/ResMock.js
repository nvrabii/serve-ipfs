export default class ResMock {
  data = null
  headersSent = false
  locals = {}

  _status = 0
  _headers = {}

  constructor({ data = null, locals = {} } = {}) {
    this.data = data
    this.locals = { ...locals }
  }

  status(status_) {
    this._status = status_

    return this
  }

  setHeader(key_, value_) {
    this._headers[key_] = value_

    return this
  }

  end(data_) {
    this.data = data_
  }
}
