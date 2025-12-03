/**
 * @file app/middlewares/validations/filde/comment.filed.js
 * @description commnet 유효성 검사 필드
 * 251203 v1.0.0 wook init
 */

import { body } from "express-validator";

// 게시글 PK 필드
export const postId = body('postId')
  .trim()
  .notEmpty()
  .withMessage('필수 항목입니다.')
  .bail()
  .isNumeric()
  .withMessage('숫자만 허용합니다.')
  .toInt();
  
  // 유저 아이디 필드
  export const replyId = body('replyId')
    .trim()
    .notEmpty()
    .withMessage('필수 항목입니다.')
    .bail()
    .isNumeric()
    .withMessage('숫자만 허용합니다.')
    .toInt();

  // 게시글 업로드 내용 필드
  export const content = body('content')
    .trim()
    .notEmpty()
    .withMessage('내용은 필수 항목입니다.')