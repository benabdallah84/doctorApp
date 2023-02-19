import express, { Router } from 'express';
import * as userController from '../controllers/userController'
import * as doctorController from '../controllers/doctorController'
import validate from '../handlers/validation'
import {saveUser} from '../middleware/validators'
import isLoggedIn from '../middleware/auth'

const router = express.Router();


router.get('/', (req, res) => {
res.json({message: 'اهلا بالعالم'})
});

//user routes
router.post('/account/signup', validate(saveUser), userController.register)
router.post('/account/signin', userController.login)
router.get('/account/me',isLoggedIn, userController.me)
router.get('/account/profile',isLoggedIn, userController.getProfile)
//doctor controllers
router.get('/doctors', doctorController.index)

export default router;