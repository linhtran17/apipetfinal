const _ = require("lodash")
const { OAuth2Client } = require("google-auth-library")
const userDao = require("../dao/users.dao");
const { GOOGLE_CLIENT_ID } = require("../config");

const client = new OAuth2Client(GOOGLE_CLIENT_ID)

const USER_FIELD = ["id", "username", "email", "role", "last_login", "address", "phone"]

const login = async (req, res) => {
    try {
        const { user, token } = await userDao.login(req.body);
        res.json({ user: _.pick(user, USER_FIELD), token });
    } catch (error) {
        res.status(401).json({ error });
    }
}

const signup = async (req, res) => {
    try {
        const user = await userDao.create(req.body);
        if (!user) {
            return res.status(400).json({ error: "Không thể tạo người dùng." });
        }
        const token = userDao.createToken(user)
        res.json({ user: _.pick(user, USER_FIELD), token });
    } catch (error) {
        res.status(500).json({ error: error.message || "Lỗi khi tạo người dùng." });
    }
}

const me = async (req, res) => {
    const { id } = req.user
    if (id) {
        const user = await userDao.findById(id)
        res.json({ ...user.toJSON(), status: true });
    } else {
        res.status(400).json({ message: "error" });
    }
}

const loginGoogle = async (req, res, next) => {
    const accessToken = req.body['access-token'];
    if (accessToken) {

        const ticket = await client.verifyIdToken({
            idToken: accessToken, audience: GOOGLE_CLIENT_ID
        })

        // Xác thực ID Token
        const { email, username } = ticket.getPayload();

        let user = await userDao.findByEmail(email)

        let updateUser = false
        if (!user) {
            updateUser = true
            user = await userDao.create({ email, username: email, role: "customer", phone: "", address: "", password: "customer" })
        }
        user = user.toJSON();
        const token = userDao.createToken(user)
        delete user.id
        delete user.password
        res.status(200).json({ token, user, updateUser, data: ticket.getPayload() })
    } else {
        next(new Error("Access Token is required", { status: 401 }))
    }

}

const updateUserGoogle = async (req, res, next) => {
    const { username, email, address, phone } = req.body

    if (!username || !email || !address || !phone) {
        next(new Error("Invalid data!"))
    }

    let user = await userDao.findByUsername(username)
    if (user) {
        next(new Error("Username is exists!"))
    }
    user = await userDao.findByEmail(email)
    if (!user) {
        next(new Error("Email is not exists!"))
    }


    user = await userDao.update(user.id, { username, email, address, phone })
    const token = userDao.createToken(user)
    res.json({ user: _.pick(user, USER_FIELD), token });

}

module.exports = {
    me, signup, login, loginGoogle, updateUserGoogle
}