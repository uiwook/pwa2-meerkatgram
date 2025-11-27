/**
 * @file routes/auth.router.js
 * @description 파일 업로드 관련 라우터
 * 251127 v1.0.0 wook init
 */

import express from 'express';
import multerMiddleware from '../app/middlewares/multer/multer.middleware.js';

const filesRouter = express.Router();

filesRouter.post('/posts', multerMiddleware.postUploader); // TODO: 컨트롤러 입력
filesRouter.post('/propiles', multerMiddleware.profileUploader); // TODO: 컨트롤러 입력

export default filesRouter;