const bcrypt = require("bcrypt");
require("dotenv").config();

let saltRound = parseInt(process.env.BCRYPT_NUM);

class Bcrypt {
  constructor(saltRound) {
    this.saltRound = saltRound;
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, this.saltRound);
  }

  async comparePassword(password, hashPassword) {
    return await bcrypt.compare(password, hashPassword);
  }
}

module.exports = new Bcrypt(saltRound);
