import jwt from "jsonwebtoken";
import secret from "../config.js";
import Token from "../models/token-model.js";

class tokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, secret.secret, {expiresIn: "24h"})
    const refreshToken = jwt.sign(payload, secret.refrsecret, {expiresIn: "30d"})
    // console.log(accessToken)
    // console.log(refreshToken)
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({user: userId})
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({user: userId, refreshToken})
    return token;
  }

  validateAccessToken(token) {
    try {
      console.log('validate access token')
      const userData = jwt.verify(token, secret.secret);
      console.log(userData)
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, secret.refrsecret);

      return userData;
    } catch (e) {
      return null;
    }
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({refreshToken})
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({refreshToken})
    return tokenData;
  }

}

export default new tokenService()