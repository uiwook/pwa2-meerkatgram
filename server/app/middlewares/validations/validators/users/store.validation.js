/**
 * @file app/middlewares/validations/validators/store.validation.js
 * @description 유저 회원가입 정보 검사 핸들러
 * 251205 v1.0.0 wook init
 */

import users from '../../fields/user.field.js';

export default [ users.email, users.password, users.profile, users.nick, users.passwordChk ];