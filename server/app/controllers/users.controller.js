/**
 * @file app/controllers/users.controller.js
 * @description 유저 관련 컨트롤러
 * 251205 v1.0.0 wook init
 */

import bcrypt from 'bcrypt';
import { SUCCESS } from "../../configs/responseCode.config.js"
import usersservice from "../services/users.service.js";
import { createBaseResponse } from '../utils/createBaseResponse.util.js';
import PROVIDER from '../middlewares/auth/configs/provider.enum.js';
import ROLE from '../middlewares/auth/configs/role.enum.js';

async function registration(req, res, next) {
  try {
    const data = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      nick: req.body.nick,
      profile: req.body.profile,
      role: ROLE.NORMAL,
      provider: PROVIDER.NONE,
    }

    await usersservice.create(data);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS))
  } catch (error) {
    next(error)
  }
}

export default {
  registration,
}