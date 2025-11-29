/**
 * @file app/repositories/like.repository.js
 * @description like Repository
 * 251129 v1.0.0 wook init
 */

import db from '../models/index.js';
const { sequelize, Like } = db;

/**
 * 게시글 작성
 * @param {import("sequelize").Transaction|null} t 
 * @param {import("../services/posts.service.js").PostStoreData} data 
 * @returns {Promise<import("../models/Like.js").Like>}
 */
async function destroy(t = null, id) {
  return await Like.destroy(
    {
      where: {
        id: id,
      },
      transaction: t
    }
  )
}

export default {
  destroy,
}