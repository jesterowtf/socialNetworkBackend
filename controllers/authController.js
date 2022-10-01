import {validationResult} from "express-validator"
import authService from "../services/authService.js";

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({message: errors})
        console.log(errors)
      }
      const {email, password} = req.body;

      const userData = await authService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      console.log(userData)
      return res.json(userData);
    } catch (e) {
      res.status(400).json(e)
    }
  }

  async login(req, res) {
    try {
      const {email, password} = req.body;
      console.log(req.body)
      const userData = await authService.login(email, password);
      console.log(`userData`, userData)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(userData);
    } catch (e) {
      console.log(e)
      res.status(400).json(e)
    }
  }

  async logout(req, res) {
    try {
      const {refreshToken} = req.cookies;
      const token = await authService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      res.json(e)
    }
  }

  async refresh(req, res) {
    try {

      const {refreshToken} = req.cookies;
      console.log(`refreshToken:`, refreshToken)

      const userData = await authService.refresh(refreshToken);
      console.log(userData)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData);
    } catch (e) {
      res.json(e)
    }
  }
}

export default new authController()