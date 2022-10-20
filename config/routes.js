const router = require('express').Router();
const controllers = require('../app/controllers');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/users', controllers.api.v1.userController.getAllUsers);
router.get('/users/:id', controllers.api.v1.userController.getUserById);

router.post('/api/v1/register', controllers.api.v1.userController.register);
router.post('/api/v1/login', controllers.api.v1.userController.login);
router.delete('/api/v1/logout', controllers.api.v1.userController.logout);

router.post('/api/v1/newAdmin', controllers.api.v1.userController.newAdmin);

router.get(
    '/api/v1/whoami', 
    controllers.api.v1.userController.authorize,
    controllers.api.v1.userController.whoami
)

router.get('/cek',controllers.api.v1.userController.checkRole);

module.exports = router;