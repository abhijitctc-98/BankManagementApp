// import { AddUser, DeleteUserById, GetAllUsers, GetUserById } from '../controllers';
const express = require('express');
const router = express.Router();

const AddUser = require('../controllers/AddUser');
const DeleteUserById = require('../controllers/DeleteUserById');
const GetAllUsers = require('../controllers/GetAllUsers');
const GetUserById = require('../controllers/GetUserById');
const ForgetPassword = require('../controllers/ForgetPassword');
const UserLogin = require('../controllers/UserLogin');
const AmountDeposit = require('../controllers/AmountDeposit');
const AmountWithdraw = require('../controllers/AmountWithdraw');

router.post('/addUser', AddUser);
router.delete('/deleteUser/:userID', DeleteUserById);
router.get('/getUsers', GetAllUsers);
router.get('/getUser/:userID', GetUserById);
router.put('/forgotPassword/:userID', ForgetPassword);
router.post('/userLogin', UserLogin);
router.put('/depositBalance/:userID', AmountDeposit);
router.put('/withdrawBalance/:userID', AmountWithdraw);

module.exports= router;