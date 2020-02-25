const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserRepository = require('../repository/UserRepository');

exports.aplication = (req,res) => {
    res.render('login');
};

exports.signup = (req,res) => {
    res.render('signup');
};

exports.authenticate = async (req,res,next) =>{
    
    const {mail,password} = req.query;
    const user = await UserRepository.getByMail(mail);

    if(!user){
        return res.status(400).send({error:'User not found'})
    }
    if(! await bcrypt.compareSync(password, user.password)){
        return res.status(400).send({error:'Password invalid'})   
    }
    const token = jwt.sign({id: user.id},'desafiochat',{
        expiresIn:86400
    })

    res.render('index',{author:user.name});
    
};

