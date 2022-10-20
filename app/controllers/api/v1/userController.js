const userService = require('../../../services/userService');
const bcrypt = require("bcryptjs");
const SALT = 10;
const jwt = require('jsonwebtoken');

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(encryptedPassword);
    });
  });
}

function checkPassword(encryptedPassword, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(isPasswordCorrect);
    });
  });
}

function generateToken(payload) {
    const token = jwt.sign({
      payload
    }, process.env.JWT_SECRET || 'Rahasia', {
      expiresIn: '180s'
    });
    return token;
}

module.exports = {
    getAllUsers(req, res) {
        const users = userService.findAll()
        .then(users => {
            res.status(200).json({
                status: "SUCCESS",
                message: "Users fetched successfully!",
                data: users
            });
        })
        .catch(err => {
            res.status(500).json({
                status: "ERROR",
                message: err.message
            });
        });
    },

    getUserById(req, res) {
        const id = req.params.id;
        const user = userService.findByPk(id)
        .then(user => {
            res.status(200).json({
                status: "SUCCESS",
                message: "User fetched successfully!",
                data: user
            });
        })
        .catch(err => {
            res.status(500).json({
                status: "ERROR",
                message: err.message
            });
        });
    },

    async register(req, res) {
        const {username, password} = req.body;
        const encryptedPassword = await encryptPassword(password);
        const role = "member";
        const user = await userService.createUser(username, encryptedPassword, role);
        res.status(200).json({
            status: "SUCCESS",
            message: "User created successfully!",
            data: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    },

    async login(req, res) {
        const {username, password} = req.body;
        const user = await userService.findOne({
            where: { username },
          });
        if (!user) {
            res.status(404).json({
                status: "ERROR",
                message: "User not found!"
            });
            return;
        }

        const isPasswordCorrect = await checkPassword(user.password, password);
        if (!isPasswordCorrect) {
            res.status(401).json({
                status: "ERROR",
                message: "Wrong password!"
            });
            return;
        }

        const token = generateToken({
            id: user.id,
            username: user.username,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });

        req.session.isAuthenticated = true;
        req.session.user = user;
        req.session.token = token;

        res.status(200).json({
            status: "SUCCESS",
            message: "User logged in successfully!",
            data: {
                token
            }
        });
    },

    whoami(req, res) {
        if(req.session.isAuthenticated){
            res.status(200).json(req.user);
        }
        else{
            res.status(401).json({message : "Unauthorized"});
        }
    },

    async authorize(req, res, next) {
        try {
          const bearerToken = req.headers.authorization;
          const token = bearerToken.split("Bearer ")[1];
          const tokenPayload = jwt.verify(
            token,
            process.env.JWT_SIGNATURE_KEY || "Rahasia"
          );
    
          req.session.user = await userService.findByPk(tokenPayload.payload.id);
          next();
        } catch (err) {
          console.error(err);
          res.status(401).json({
            message: "Unauthorized",
          });
        }
    },

    async logout(req, res) {
        const user = req.session.user;
        if(user){
          req.session.destroy();
          res.status(200).json({
            message: `Logout ${user.username} berhasil`,
          });
        }
        else{
          res.status(401).json({
            message: "Unauthorized",
          });
        }
        
    },

    checkRole(req, res){
        if(req.session.user){
          const role = req.session.user.role;
          console.log('check session', req.session);
          if(role == "superadmin"){
              res.status(200).json({message : "You are superadmin"});
          }
          else if(role == "admin"){
              res.status(200).json({message : "You are admin"});
          }
          else if(role == "member"){
              res.status(200).json({message : "You are member"});
          }
          else{
              res.status(200).json({message : "You are nobody"});
          }
        }
        else{
          res.status(401).json({message : "Unauthorized"});
        }
            
    },

    async newAdmin(req, res) {
      if(req.session.user && req.session.user.role == "superadmin"){
        const {username, password} = req.body;
        const encryptedPassword = await encryptPassword(password);
        const role = "admin";
        const user = await userService.createUser(username, encryptedPassword, role);
        res.status(200).json({
            status: "SUCCESS",
            message: "Admin created successfully!",
            data: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
      }
      else{
        res.status(401).json({message : "Unauthorized"});
      }
    }
    
}