/**
 * @file app/controllers/files.controller.js
 * @description 파일 업로드 관련 컨트롤러
 * 251127 v1.0.0 wook init
 */

// ----------------
// ---- public ----
// ----------------
/**
 * 게시글 이미지 업로드 컨트롤러 처리
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 레스폰스 객체
 * @param {import("express").NextFunction} next - next 객체
 * @return {import("express").Response}
 */
async function storePost(req, res, next) {

  return res.status().send();
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