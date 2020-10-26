class IDTO {
  constructor(_id) {
    if (_id === undefined) {
      throw new Error("UID not valid")
    }

    this._id = _id
  }
}

module.exports = IDTO
