/**
 * @file app/middlewares/validations/validaors/auth/store.validator.js
 * @description 게시글 upload 검사기
 * 251129 v1.0.0 wook init
 */

import { content, image } from '../../fields/post.field.js'

export default [ content, image ];