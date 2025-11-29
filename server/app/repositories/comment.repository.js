/**
 * @file app/repositories/comment.repository.js
 * @description comment Repository
 * 251129 v1.0.0 wook init
 */

import db from '../models/index.js';
const { sequelize, Comment } = db;

/**
 * 게시글 작성
 * @param {import("sequelize").Transaction|null} t 
 * @param {import("../services/posts.service.js").PostStoreData} data 
 * @returns {Promise<import("../models/Comment.js").Comment>}
 */
async function destroy(t = null, id) {
  return await Comment.destroy(
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