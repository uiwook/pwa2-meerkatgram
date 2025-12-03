/**
 * @file app/middlewares/validations/validaors/comments/store.validator.js
 * @description 코멘트 작성 검사기
 * 251203 v1.0.0 wook init
 */

import { content, postId, replyId } from "../../fields/comment.filed.js";

export default [postId, replyId, content];