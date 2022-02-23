const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config/config");

class token {
  // 生成token
  static async sign(data) {
    const { id, username } = data;
    const token = jwt.sign(
      {
        id,
        username,
      },
      jwtConfig.secret, // 密钥
      { expiresIn: "2h" } // 有效期(不加单位默认为ms,2h)
    );
    return token;
  }

  // 解密token
  static async verify(token) {
    let data = "";
    try {
      data = jwt.verify(token.split(" ")[1], jwtConfig.secret) || {};
    } catch (e) {
      data = {};
    }
    return data;
  }
}

module.exports = token;
