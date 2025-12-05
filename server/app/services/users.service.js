/**
 * @file app/serivces/users.service.js
 * @description users Service
 * 251205 wook init
 */

import { CONFLICT_ERROR } from "../../configs/responseCode.config.js";
import myError from "../errors/customs/my.error.js";
import db from "../models/index.js";
import userRepository from "../repositories/user.repository.js";

/**
 * 회원가입 처리
 * @param {import("../controllers/users.controller.js")} data 
 * @returns 
 */
async function create(data) {
  return await db.sequelize.transaction(async t => {
    const { email, password, nick, profile } = data
    // 가입된 유저인지 체크
    const userEmail = await userRepository.findByEmail(t, email);
    
    if(userEmail) {
      throw myError('이미 가입 된 회원입니다.', CONFLICT_ERROR)
    }
    
    // 이미 사용중인 닉네임 체크
    const userNick = await userRepository.findByNick(t, nick);
    if(userNick) {
      throw myError('중복된 닉네임입니다.', CONFLICT_ERROR)
    }
    // 가입된 유저가 아닐 시 회원가입 진행
    await userRepository.create(t, data)

  });
}

export default {
  create,
}