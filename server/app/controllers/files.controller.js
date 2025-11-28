/**
 * @file app/controllers/files.controller.js
 * @description 파일 업로드 관련 컨트롤러
 * 251127 v1.0.0 wook init
 */

import { BAD_FILE_ERROR, SUCCESS } from "../../configs/responseCode.config.js";
import myError from "../errors/customs/my.error.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";
// ----------------
// ---- public ----
// ----------------
/**
 * 게시글 이미지 업로드 컨트롤러 처리
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체
 * @return {import("express").Response}
 */
async function storePost(req, res, next) {
  try {
    // 파일 여부 확인
    if(!req.file) {
      throw myError('파일 없음', BAD_FILE_ERROR);
    }

    const result = {
      path: `${process.env.APP_URL}${process.env.ACCESS_FILE_POST_IMAGE_PATH}/${req.file.filename}`
    };
    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(error) {
    next(error);
  }
}

// 유저 프로필 업로드 컨트롤러

async function storeProfile(req, res, next) {
  try {
    // 파일 여부 확인
    if(!req.file) {
      throw myError('파일 없음', BAD_FILE_ERROR);
    }

    const result = {
      path: `${process.env.APP_URL}${process.env.FILE_USER_PROFILE_PATH}/${req.file.filename}`
    };

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(error) {
    next(error);
  }
}

export default {
  storePost,
  storeProfile,
}

/**
 * index : 데이터 조회 처리 (리스트 페이지 or 리스트 데이터 획득)
 * show : 상세 데이터 조회 (상세 페이지 or 상세 데이터 획득)
 * create : 작성 페이지 출력
 * store : 새로운 데이터 작성 처리
 * edit : 수정 페이지 출력
 * update : 데이터 수정 처리
 * destroy : 데이터 삭제
 */