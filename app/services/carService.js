const carRepository = require('../repositories/carRepository');
const userRepository = require('../repositories/userRepository');

module.exports = {
    async findAll(role) {
        try{
            const cars = await carRepository.findAll(role);
            return cars;
        }
        catch(err) {
            throw err;
        }
    },

    async findByPk(role, id) {
        try{
            const car = await carRepository.findByPk(role, id);
            return car;
        }
        catch(err) {
            throw err;
        }
    },

    async create(name, createdBy) {
        try{
            const car = await carRepository.create(name, createdBy);
            const user = await userRepository.findByPk(createdBy);            
            console.log('Check car 2', car);
            return {car, user};
        }
        catch(err) {
            throw err;
        }
    },

    async update(id, name, editedBy) {
        try{
            const car = await carRepository.update(id, name, editedBy);
            const user = await userRepository.findByPk(editedBy);
            return {car, user};
        }
        catch(err) {
            throw err;
        }
    },

    async delete(id, deletedBy) {
        try{
            const car = await carRepository.delete(id, deletedBy);
            const user = await userRepository.findByPk(deletedBy);
            return {car, user};
        }
        catch(err) {
            throw err;
        }
    },
}