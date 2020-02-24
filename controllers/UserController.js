const UserRepository = require('../repository/UserRepository');
const bcrypt = require('bcrypt');

exports.get = (req, res, next) => {

    UserRepository.getAll()
        .then((user) => {
            res.status(200).send(user);
        }).catch(err => res.status(500).send(err))
};
exports.getById = (req, res, next) => {
    UserRepository.getById(req.params.id)
        .then(user => {
            res.status(200).send(user);
        })
        .catch(err => res.status(500).send(err))
};
exports.login = (req, res, next) => {
    const { mail, password } = req.body;
    
    UserRepository.getByMail(mail)
        .then(user => {
            if (bcrypt.compareSync(password, user.password)) {
                res.status(200).json({author:user.name});
            } else {
                 res.status(400).json({ error: 'bad credentials' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
};
exports.post = (req, res, next) => {
    const { name, password, mail } = req.body;

    const passEncrypt = bcrypt.hashSync(password, 8);

    const user = {
        name,
        password: passEncrypt,
        mail: mail
    }
    
    UserRepository.create(user)
        .then(user =>{
            const token = jwt.sign({id: user.id},'desafiochat',{
                expiresIn:86400
            })
            res.status(200).send({user,token});
        })
        .catch(err => res.status(500).send(err))
};
exports.put = (req, res, next) => {
    const p = req.body;

    UserRepository.update(req.params.id, p)
        .then(user => res.status(201).send(user))
        .catch(err => res.status(500).send(err))
};
exports.delete = (req, res, next) => {
    UserRepository.delete(req.params.id)
        .then(user => res.status(200).send('delete succeded!'))
        .catch(err => res.status(500).err(err))
};
