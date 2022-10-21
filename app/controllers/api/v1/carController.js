const carService = require('../../../services/carService');

module.exports = {
    getAllCars(req, res) {
        if(req.session.user){
            carService.findAll(req.session.user.role)
            .then(cars => {
                res.status(200).json(cars);
            })
            .catch(err => {
                res.status(500).json(err);
            });
        }
        else{
            res.status(401).json({message: 'Unauthorized'});
        }
    },

    getCarById(req, res) {
        const id = req.params.id;
        if(req.session.user){
            const car = carService.findByPk(req.session.user.role, id)
            .then(car => {
                if(car) res.status(200).json(car);
                else res.status(404).json({message: 'Car not found'});
            })
            .catch(err => {
                res.status(500).json(err);
            });
        }
        else{
            res.status(401).json({message: 'Unauthorized'});
        }
    },

    async createCar(req, res) {
        if(req.session.user && (req.session.user.role == 'superadmin' || req.session.user.role == 'admin')){
            const {name} = req.body;
            const {car, user} = await carService.create(name, req.session.user.id);
            res.status(200).json({
                status: "SUCCESS",
                message: "Car created successfully!",
                data: {
                    id: car.id,
                    name: car.name,
                    createdBy: user.username,
                }
            });
        }
        else{
            res.status(401).json({
                message: "Unauthorized",
            });
        }
    },

    async updateCar(req, res) {
        if(req.session.user && (req.session.user.role == 'superadmin' || req.session.user.role == 'admin')){
            const id = req.params.id;
            const {name} = req.body;
            const {car, user} = await carService.update(id, name, req.session.user.id);
            if(car){
                res.status(200).json({
                    status: "SUCCESS",
                    message: "Car updated successfully!",
                    data: {
                        id: car.id,
                        name: car.name,
                        editedBy: user.username,
                    }
                });
            }
            else{
                res.status(404).json({
                    message: "Car not found",
                });
            }
        }
        else{
            res.status(401).json({
                message: "Unauthorized",
            });
        }
    },

    async deleteCar(req, res) {
        if(req.session.user && (req.session.user.role == 'superadmin' || req.session.user.role == 'admin')){
            const id = req.params.id;
            const {car, user} = await carService.delete(id, req.session.user.id);
            res.status(200).json({
                status: "SUCCESS",
                message: "Car deleted successfully!",
                data: {
                    id: car.id,
                    name: car.name,
                    deletedBy: user.username,
                }
            });
        }
        else{
            res.status(401).json({
                message: "Unauthorized",
            });
        }
    },

    async getDeletedCars(req, res) {
        if(req.session.user && (req.session.user.role == 'superadmin' || req.session.user.role == 'admin')){
            const cars = await carService.getDeletedCars();
            if(cars){
                res.status(200).json({
                    status: "SUCCESS",
                    message: "Car fetched successfully!",
                    data: {
                        cars
                    }
                });
            }
            else{
                res.status(404).json({
                    message: "Car not found",
                });
            }
        }
        else{
            res.status(401).json({
                message: "Unauthorized",
            });
        }
    }
}