/**
 * @file app/middlewares/validations/fields/user.field.js
 * @description 유저 정보 유효성 검사 필드
 * 251119 v1.0.0 wook init
 */

import { body, param } from "express-validator";
import PROVIDER from "../../auth/configs/provider.enum.js";
import pathUtil from "../../../utils/path/path.util.js";
import path from 'path';
import fs from 'fs';

const email = body('email')
  .trim()
  .notEmpty()
  .withMessage('이메일은 필수 항목입니다.')
  .bail()
  .isEmail()
  .withMessage('유효한 이메일을 입력해 주세요.')
;

const password = body('password')
  .trim()
  .notEmpty()
  .withMessage('비밀번호는 필수 항목입니다.')
  .bail()
  .matches(/^[a-zA-Z0-9!@#$]{8,20}$/)
  .withMessage('한글,영어대소문자·숫자·!·@·#·$ 8~20자 허용')
;

const passwordChk = body('passwordChk')
  .trim()
  .custom((val, {req}) => {
    return (val === req.body.password) ? true : false
  })
  .withMessage('비밀번호와 일치하지 않습니다.')
;

const provider = param('provider')
  .trim()
  .notEmpty()
  .withMessage('필수 항목입니다.')
  .bail()
  .custom(val => {
    return PROVIDER[val.toUpperCase()] ? true : false;
  })
  .withMessage('허용하지 않는 값입니다.')
;

const profile = body('profile')
  .trim()
  .notEmpty()
  .withMessage('내용은 필수 항목입니다.')
  .bail()
  .custom(val => {
    // 우리 앱의 유저 이미지에 접근하는 도메인 + path가 맞는지 확인
    if(!val.startsWith(`${process.env.APP_URL}${process.env.ACCESS_FILE_USER_PROFILE_PATH}`)) {
      return false;
    }
    return true;
  })
  .withMessage('허용하지 않는 이미지 경로입니다.')
  .bail()
  .custom(val => {
    // 실제 이미지 파일이 있는지 검증 처리
    const splitPath = val.split('/');
    const fullPath = path.join(pathUtil.getProfilesImagePath(), splitPath[splitPath.length - 1]);
    if(!fs.existsSync(fullPath)) {
      return false;
    }
    return true;
  })
  .withMessage('존재하지 않는 이미지 경로입니다.');

const nick = body('nick')
  .trim()
  .notEmpty()
  .withMessage('닉네임은 필수 항목입니다.')
  .bail()
  .matches(/^[가-힣a-zA-Z0-9@_]{2,20}$/)
  .withMessage('한글, 영어대소문자·숫자·@·_ 2~20자 허용');

export default {
  email,
  password,
  provider,
  profile,
  nick,
  passwordChk,
}