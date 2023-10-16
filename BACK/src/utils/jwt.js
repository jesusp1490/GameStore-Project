const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
    return jwt.verify(token, "pepino13579"); 
}

const generateToken = (id, email) => {
    return jwt.sign({id, email}, "pepino13579", {expiresIn: '1h'});
}

module.exports = {generateToken, verifyToken}