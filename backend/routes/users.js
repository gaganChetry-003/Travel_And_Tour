
import express from 'express'
import {createUser
,updateUser
,deleteUser
,getAllUser,getSingleUser

} from '../controller/userController.js'
const router=express.Router();

import {verifyUser} from "../utils/verifyToken.js"
//create new User
router.post('/',createUser);

router.put('/:id',verifyUser,updateUser);
router.delete('/:id',verifyUser,deleteUser);

router.get('/:id',verifyUser,getSingleUser);
router.get('/',verifyUser,getAllUser);

export default router;