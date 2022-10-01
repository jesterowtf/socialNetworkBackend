import User from "../models/user-model.js";
import * as bcrypt from "bcrypt";
import Role from "../models/role-model.js";
import tokenService from "./tokenService.js";
import {ApiError} from "../exceptions/api-error.js";

const returnCorrectId = (user) => {
  const email = user.email;
  const id = (user._id).toString();
  return {
    email,
    id
  }
}


class authService {
  async registration(email, password) {
    const candidate = await User.findOne({email})
    if (candidate) {
      throw ApiError.BadRequest("Пользователь с таким email уже занят", "Пользователь с таким email уже занят")
    }

    const hashPassword = bcrypt.hashSync(password, 5);
    const userRole = await Role.findOne({value: "USER"})
    const user = await User.create({
      email,
      password: hashPassword,
      roles: [userRole.value],
    })

    const userDto = returnCorrectId(user);
    const tokens = await tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
  }

  async login(email, password) {
    const user = await User.findOne({email})
    if (!user) {
      throw ApiError.BadRequest('Неверный логин или пароль', 'Неверный логин или пароль')
    }

    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) {
      throw ApiError.BadRequest('Неверный логин или пароль', 'Неверный логин или пароль')
    }

    const userDto = returnCorrectId(user);
    const tokens = await tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto}
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findById(userData.id);
    const userDto = returnCorrectId(user);
    const tokens = await tokenService.generateTokens(userDto);

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto}
  }

}

export default new authService()