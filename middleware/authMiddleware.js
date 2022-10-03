import tokenService from "../services/tokenService.js";
import secret from "../config.js";

export const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    const accessToken = req.headers.authorization.split(' ')[1]
    if (!accessToken) {
      return res.status(403).json({message: "Пользователь не авторизован"})
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return res.status(403).json({message: "Токен доступа не валидирован"})
    }

    req.user = userData;
    // console.log(req.user.id)

    // const decodedData = jwt.verify(token, secret.secret);
    // req.user = decodedData
    next()
  } catch (e) {
    console.log(e)
    return res.status(403).json({message: "Пользователь не авторизован"})
  }
}