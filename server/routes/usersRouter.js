import express from 'express';
import storeValidation from '../app/middlewares/validations/validators/users/store.validation.js';
import validationHandler from '../app/middlewares/validations/validationHandler.js';
import usersController from '../app/controllers/users.controller.js';

const usersRouter = express.Router();

usersRouter.post('/', storeValidation, validationHandler, usersController.registration);


export default usersRouter;