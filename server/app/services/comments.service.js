/**
 * @file app/serivces/comments.service.js
 * @description commnets Service
 * 251128 wook init
 */

import commentRepository from "../repositories/comment.repository.js";

/**
 * 코멘트 작성 처리
 * @param {{postId: string, userId: string, content: string}} data 
 */
async function store(data) {
  return await commentRepository.create(null, data);
}

export default {
  store,
}