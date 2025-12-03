/**
 * @file app/repositories/comment.repository.js
 * @description comment Repository
 * 251129 v1.0.0 wook init
 */

import db from '../models/index.js';
const { sequelize, Comment } = db;

/**
 * 게시글 삭제
 * @param {import("sequelize").Transaction|null} t 
 * @param {import("../services/posts.service.js").PostStoreData} id 
 * @returns {Promise<import("../models/Comment.js").Comment>}
 */
async function destroy(t = null, id) {
  return await Comment.destroy(
    {
      where: {
        postId: id,
      },
      transaction: t
    }
  )
}

async function create(t = null, data) {
  return await Comment.create(data, {transaction: t});
}

export default {
  destroy,
  create,
}