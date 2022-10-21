const router = require('express').Router();
const controllers = require('../app/controllers');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

const prefix = '/api/v1';

//user api
router.get(prefix +'/users', controllers.api.v1.userController.getAllUsers);
router.get(prefix +'/users/:id', controllers.api.v1.userController.getUserById);
router.post(prefix +'/register', controllers.api.v1.userController.register);
router.post(prefix +'/login', controllers.api.v1.userController.login);
router.delete(prefix +'/logout', controllers.api.v1.userController.logout);
router.post(prefix +'/newAdmin', controllers.api.v1.userController.authorize, controllers.api.v1.userController.newAdmin);

//just checking
router.get(
    prefix +'/whoami', 
    controllers.api.v1.userController.authorize,
    controllers.api.v1.userController.whoami
)
router.get(
    prefix +'/checkToken', 
    controllers.api.v1.userController.authorizeInputToken,
    controllers.api.v1.userController.checkUser
)

//car api
router.get(prefix +'/cars', controllers.api.v1.userController.authorize, controllers.api.v1.carController.getAllCars);
router.get(prefix +'/cars/:id', controllers.api.v1.userController.authorize, controllers.api.v1.carController.getCarById);
router.post(prefix +'/newCar', controllers.api.v1.userController.authorize, controllers.api.v1.carController.createCar);
router.put(prefix +'/editCar/:id', controllers.api.v1.userController.authorize, controllers.api.v1.carController.updateCar);
router.delete(prefix +'/deleteCar/:id', controllers.api.v1.userController.authorize, controllers.api.v1.carController.deleteCar);
router.get(prefix + '/deletedCars', controllers.api.v1.userController.authorize, controllers.api.v1.carController.getDeletedCars);

module.exports = router;