const User = require("../models/user.model");
const { validateEmailDB, validatePassword } = require("../../utils/validator");
const bycrypt = require("bcrypt");
const { generateToken } = require("../../utils/jwt");


const registerUser = async (req, res) => {
    try {

        const userBody = new User(req.body)
        const valEmail = await validateEmailDB(req.body.email)
        if (!valEmail) {
            if (validatePassword(req.body.password)) {
                userBody.password = bycrypt.hashSync(userBody.password, 10)
                const createduser = await userBody.save();
                return res.json({ success: true, message: "Agregado con exito", data: createduser })
            } else {
                return res.json({ success: false, message: "La contraseña no cumple con el patron" })
            }
        }
        return res.json({ success: false, message: "Email ya existe" })

    } catch (error) {

    }
}
const loginUser = async (req, res) => {
    try {
        const userInfo = req.body;
        const userDB = await validateEmailDB(userInfo.email);
        if (!userDB) {
            return res.json({ success: false, message: "Email no existe" })
        }
        if (!bycrypt.compareSync(userInfo.password, userDB.password)) {
            return res.json({ success: false, message: "La contraseña no coincide" })
        }
        //generar el token
        const token = generateToken(userDB._id, userDB.email);
        return res.json({ success: true, message: "login realizado", token: token, userInfo: userDB })

    } catch (error) {

    }

}
const profileUser = async (req, res) => {
    try {
        return res.status(200).json(req.userProfile)
    } catch (error) {

    }
}

const getByEmail = async (req, res) => {
    try {
        const { email } = req.params
        const emailUser = await User.find({email: email});
        return res.status(200).json(emailUser);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const allUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(500).json(error);
    }
};



module.exports = { getByEmail, registerUser, loginUser, profileUser, allUsers }
