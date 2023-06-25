const User = require('../models/user')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config();

const registerUser = async (req, res) => {
    const { handle, email, password, category } = req.body;
    console.log(req.body);
    try {
        const defaultLink = { url: 'google.com', title: 'Google', icon: '' }
        const user = await User.create({ handle, email, password, role: category, links: [defaultLink] });
        const token = jwt.sign({ email: email }, process.env.SECRET_KEY);
        console.log('user', user);
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json({ message: 'User Created', status: 'success', 'token': token, id: user._id })
    } catch (err) {
        if (err.code === '11000') {
            return res.json({ message: "Try different email", status: 'error' });
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json({ message: err.message, status: 'error' });
    }
}

const loginUser = (req, res) => {
    const { email, password } = req.body;
    try {
        const user = User.findOne({ email: email, password: password });
        console.log(user);
        res.setHeader("Access-Control-Allow-Origin", "*");
        if (!user) {
            return res.json({ status: 'not found', error: 'Invalid credentials' })
        }
        const token = jwt.sign({ email: email }, process.env.SECRET_KEY);
        return res.json({ message: 'user found', status: 'success', 'token': token, id: user._id });
    } catch (err) {
        res.setHeader("Access-Control-Allow-Origin", "*");

        return res.json({ message: err.message, status: 'error' });
    }
}

module.exports = { registerUser, loginUser };