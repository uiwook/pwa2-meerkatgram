/**
 * @file app/repositories/user.repository.js
 * @description User Repository
 * 251120 v1.0.0 wook init
 */

import db from '../models/index.js';
const { User } = db;

/**
 * 이메일로 유저 검색
 * @param {import("sequelize").transaction} t 
 * @param {string} email 
 * @returns 
 */
async function findByEmail(t = null, email) {
  // SELECT * FROM users WHERE email = ? AND deleted_at IS NULL;
  return await User.findOne(
    {
    where: {
      email: email
    },
    transaction: t
    }
  );
}

/**
 * 유저 nick으로 유저 검색
 * @param {import("sequelize").transaction} t 
 * @param {string} nick 
 * @returns 
 */
async function findByNick(t = null, nick) {
  // SELECT * FROM users WHERE email = ? AND deleted_at IS NULL;
  return await User.findOne(
    {
    where: {
      nick: nick
    },
    transaction: t
    }
  );
}
/**
 * 유저 모델 인스턴스로 save 처리
 * @param {import("sequelize").Transaction} t 
 * @param {import("../models/index").User} user 
 * @returns {Promise<MessagePort("../medels/User.js").User>}
 */
async function save(t = null, user) {
  return await user.save({ transaction : t });
}
/**
 * 유저 id로 유저정보 조회
 * @param {import("sequelize").Transaction} t 
 * @param {number} id 
 * @returns {Promise<MessagePort("../medels/User.js").User>}
 */
async function findByPk(t = null, id) {
  // PK를 이용하여 유저 찾기
  // SELECT * FROM User WHERE id = ?
  return await User.findByPk(id, { transaction: t });
}

async function create(t = null, data) {
  // 유저정보 생성
  // INSERT INTO User[data(컬럼)] VALUSE[data.data(컬럼값)]
  return await User.create(data, { transaction: t });
}

async function logout(t = null, id) {
  // 특정 유저 리프래시토큰 null로 갱신
  // 평문 : UPDATE users SET refresh_token = null WHERE id = ?
  return await User.update(
    // 파라미터 2개: {바꿀값}{옵션(조건)}
    {
      refreshToken: null
    },
    {
      where: {
        id: id
      },
      transaction: t
    }
  );
}

export default {
  findByEmail,
  findByNick,
  save,
  findByPk,
  create,
  logout,
}