const {Car, User} = require('../../models');

module.exports = {
    findAll(role) {
        if(role == 'superadmin' || role == 'admin'){
            return Car.findAll({
                attributes: ['id', 'name'],
                include: [
                    {
                        model: User,
                        as: 'createdByUser',
                        attributes: ['username'],
                    },
                    {
                        model: User,
                        as: 'editedByUser',
                        attributes: ['username'],
                    },
                ],
                where: {deleted: false},
            });
        }
        else if(role == 'member'){
            return Car.findAll({
                attributes: ['id', 'name'],
            });
        }
        else{
            return null;
        }
    },

    findByPk(role, id) {
        if(role == 'superadmin' || role == 'admin'){
            return Car.findByPk(id, {
                attributes: ['id', 'name'],
                include: [
                    {
                        model: User,
                        as: 'createdByUser',
                        attributes: ['username'],
                    },
                    {
                        model: User,
                        as: 'editedByUser',
                        attributes: ['username'],
                    },
                ],
                where: {deleted: false},
            });
        }
        else if(role == 'member'){
            return Car.findByPk(id, {
                attributes: ['id', 'name'],
            });
        }
        else{
            return null;
        }
    },

    findByName(name) {
        return Car.findOne({
            attributes: ['id', 'name', 'createdBy', 'editedBy'],
            where: {name: name, deleted: false},
        });
    },

    create(name, createdBy) {
        return Car.create({
            name : name,
            createdBy : createdBy,
            editedBy : null,
            deleted : false,
            deletedBy : null,
        });
    },

    update(id, name, editedBy) {
        return Car.update({
            name,
            editedBy
        }, {
            where: {
                id
            }
        });
    },

    delete(id, deletedBy) {
        return Car.update({
            deleted: true,
            deletedBy
        }, {
            where: {
                id
            }
        });
    }
}