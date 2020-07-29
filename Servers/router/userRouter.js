const Router = require('koa-router');

const UserController = require('../controller/userController');


const router = Router();

router.post('/api/user/update', UserController.addUser)
      .post('/api/loginSys', UserController.loginSys);

module.exports = router;