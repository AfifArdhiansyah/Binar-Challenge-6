const userRepository = require('../repositories/userRepository');

module.exports = {
    async findAll() {
        try{
            const users = await userRepository.findAll();
            return users;
        }
        catch(err) {
            throw err;
        }
    },

    async findByPk(id) {
        try{
            const user = await userRepository.findByPk(id);
            return user;
        }
        catch(err) {
            throw err;
        }
    },

    async findOne({where}){
        try{
            const user = await userRepository.findOne({where});
            return user;
        }
        catch(err){
            throw err;
        }
    },

    async createUser(username, password, role) {
        try{
            const user = await userRepository.createUser(username, password, role);
            return user;
        }
        catch(err) {
            throw err;
        }
    }
}