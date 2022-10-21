const {Car, User} = require('../../models');

module.exports = {
    findAll(role) {
        if(role == 'superadmin' || role == 'admin'){
            return Car.findAll({
                attributes: ['id', 'name'],
                where: {deleted: false},
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
            return Car.findOne({
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
                where: {
                    id: id,
                    deleted: false
                },
            });
        }
        else if(role == 'member'){
            return Car.findOne({
                attributes: ['id', 'name'],
                where:{
                    id: id,
                }
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
        });
    },

    update(id, name, editedBy) {
        return Car.update({
            name,
            editedBy
        }, {
            where: {
                id: id,
                deleted: false
            }
        });
    },

    delete(id, deletedBy) {
        return Car.update({
            deleted: true,
            deletedBy
        }, {
            where: {
                id: id,
                deleted: false
            }
        });
    },

    isDeleted(id) {
        return Car.findByPk(id, {
            attributes: ['deleted']
        });
    },

    getDeletedCars(){
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
                {
                    model: User,
                    as: 'deletedByUser',
                    attributes: ['username'],
                }
            ],
            where: {deleted: true},
        });
    }
}