const express = require('express');
const { createTask, getAllTask, getOneTask, updateTask, deleteTask } = require('../controllers/tasksController');
const {createUser ,getAllUser,getOneUser,updateUser,deleteUser} = require('../controllers/usersControllers');
const {register, loginUser, jwtMiddleware } = require('../controllers/auth/authController');

const router = express.Router();

router.post('/v1/taskController', createTask);
router.get('/v1/taskController',getAllTask);
router.get('/v1/taskController/:id',getOneTask);
router.put('/v1/taskController/:id',updateTask);
router.delete('/v1/taskController/:id',deleteTask);

router.post('/v1/user', createUser);
router.get('/v1/user', getAllUser);
router.get('/v1/user/:id',getOneUser);
router.put('/v1/user/:id',updateUser);
router.delete('/v1/user/:id',deleteUser);


router.post('/v1/register', register);
router.post('/v1/login', loginUser);
// router.get("/v1/protected-route", jwtMiddleware, (req, res) => {
//     // Cette route est protégée par le middleware jwtMiddleware
//     // Vous pouvez accéder à l'identifiant de l'utilisateur à partir de req.userId
//     res.json({ message: "You are authorized to access this route" });
//   });
  



module.exports = router