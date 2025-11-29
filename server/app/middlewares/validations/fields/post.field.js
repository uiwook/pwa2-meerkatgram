/**
 * @file app/middlewares/validations/fields/post.field.js
 * @description 게시글 유효성 검사 필드
 * 251128 v1.0.0 wook init
 */

import fs from 'fs';
import { body, param } from "express-validator";
import path from 'path';
import pathUtil from '../../../utils/path/path.util.js';

// 페이지 필드
export const page = body('page')
  .trim()
  .optional()
  .isNumeric()
  .withMessage('숫자만 허용합니다.')
  .toInt();

// 게시글 PK 필드
export const id = param('id')
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
  .bail()
  .matches(/^.{0,100}$/)
  .withMessage('100자 미만으로 입력 해 주세요.');

  // 게시글 업로드 이미지 필드
export const image = body('image')
  .trim()
  .notEmpty()
  .withMessage('내용은 필수 항목입니다.')
  .bail()
  .matches(/^.{0,100}$/)
  .withMessage('파일경로는 100자미만으로 설정')
  // .custom(val => {
  //   if(!val.startsWith(`${process.env.APP_URL}${process.env.ACCESS_FILE_POST_IMAGE_PATH}`)) {
  //     return false;
  //   }
  //   return true;
  // })
  // .withMessage('허용하지 않는 이미지 경로입니다.')
  // .bail()
  // .custom(val => {
  //   const splitPath = val.split('/');
  //   const fullPath = path.join(pathUtil.getPostsImagePath(), splitPath[splitPath.length - 1]);
  //   console.log(fullPath); // TODO
  //   if(!fs.existsSync(fullPath)) {
  //     return false;
  //   }
  //   return true;
  // })
  // .withMessage('존재하지 않는 이미지 경로입니다.');