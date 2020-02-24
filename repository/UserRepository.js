const mongoose = require('mongoose');
const User = require('../config/db');

module.exports = new class UserRepository {

    getAll() {
        return User.find();
    }
    
    getById(id) {
        return User.findById(id);
    }
    getByMail(mail){
        return User.findOne({mail}).select('+password');
    }
    create(user) {
        return User.create(user);
    }

    update(id, user) {

        const updatedUser = {
            name: user.name,
            mail: user.mail,
            role: user.role,
        }
        return User.findByIdAndUpdate(id, updatedUser, { new: true });
    }

    delete(id){
        return User.findByIdAndDelete(id);
    }
}