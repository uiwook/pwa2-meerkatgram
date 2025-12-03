/**
 * @file app/controllers/comments.controler.js
 * @description comments 관련 컨트롤러
 * 251128 v1.0.0 wook init
 */

import { SUCCESS } from "../../configs/responseCode.config.js";
import commentsService from "../services/comments.service.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";

// --------------------
// PUBLIC
// --------------------

/**
 * comments 작성 컨트롤러
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Request} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체
 * @returns 
 */
async function store(req, res, next) {
  try {
    const data = {
      postId: req.body.postId,
      userId: req.user.id,
      replyId: req.body.replyId,
      content: req.body.content,
    };

    const result = await commentsService.store(data);


    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result))
  } catch (error) {
    return next(error);
  }
}

export default {
  store,
}