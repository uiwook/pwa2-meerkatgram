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

/**
 * 게시글 작성
 * @param {import("sequelize").Transaction|null} t 
 * @param {import("../services/posts.service.js").PostStoreData} data 
 * @returns {Promise<import("../models/Like.js").Like>}
 */
async function destroyLike(t = null, {userId, postId}) {
  return await Like.destroy(
    {
      where: {
        userId: userId,
        postId, postId,
      },
      transaction: t
    }
  )
}

/**
 * 좋아요 했는지 여부 조회
 * @param {import("sequelize").Transaction|null} t 
 * @param {import("../services/posts.service.type.js").data} data 
 * @returns {Promise<import("../models/Like.js").Like>}
 */
async function findLikeYN(t = null, {userId, postId}) {
  return await Like.findOne(
    {
      where: {
        userId: userId,
        postId: postId,
      }
    },
    {
      transaction: t
    }
  );
}

/**
 * 좋아요 시 레코드 생성
 * @param {import("sequelize").Transaction|null} t 
 * @returns {Promise<import("../models/Like.js").Like>}
 */
async function create(t = null, data) {
  return await Like.create(data, { transaction: t })
}

/**
 * 게시글 당 Like개수 조회
 * @param {import("sequelize").Transaction|null} t 
 * @param {import("../services/posts.service.type.js").postId} id 
 * @returns {Promise<import("../models/Like.js").Like>}
 */
async function show(t = null, postId) {
  return await Like.count({
    where: {postId},
    transaction: t
  });
}

// // findOne으로 하는방법도 구현해보기
// async function show(t = null, postId) {
//   return await Like.findOne({
//     attributes: ['postId', [sequelize.fn('COUNT', sequelize.col('*')), 'like_cnt']],
//     where: {postId},
//     group: ['postId'],
//     transaction: t
//   });
// }

export default {
  destroy,
  destroyLike,
  findLikeYN,
  create,
  show,
}