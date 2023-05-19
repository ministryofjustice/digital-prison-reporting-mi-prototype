const fakePersonRegisterData = require('../data/fakePersonRegisterData')

module.exports = {

  listPersonRegister: () => {
    return fakePersonRegisterData.data
  },

  countPersonRegister: () => {
    return fakePersonRegisterData.data.length
  }

}
