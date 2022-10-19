const {User} = require('../../models');

module.exports = {
    findAll() {
        return User.findAll(
            {
                attributes: ['id', 'username', 'role']
            }
        );
    },
    
    findByPk(id) {
        return User.findByPk(id);
    },

    findOne({where}){
        return User.findOne({where : where});
    },

    createUser(username, password, role) {
        return User.create({
            username,
            password,
            role
        });
    }
}