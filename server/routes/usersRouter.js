/**
 * @file routes/users.router.js
 * @description users 관련 라우터
 * 251205 v1.0.0 wook init
 */

import express from 'express';
import storeValidation from '../app/middlewares/validations/validators/users/store.validation.js';
import validationHandler from '../app/middlewares/validations/validationHandler.js';
import usersController from '../app/controllers/users.controller.js';

const usersRouter = express.Router();

usersRouter.post('/', storeValidation, validationHandler, usersController.registration);


export default usersRouter;