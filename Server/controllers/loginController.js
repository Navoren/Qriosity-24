// Import necessary libraries and modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const loginController = async (req, res) => {
    try {
        // const { email, password } = req.body;
        const email = '221030360@juitsolan.in';
        const password = 'animesh$123';

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);

            // If the password is valid
            if (isPasswordValid) {
                const accessToken = jwt.sign(
                    {
                        sub: existingUser._id,
                        email: existingUser.email
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '30s'
                    }
                );

                const refreshToken = jwt.sign(
                    {
                        sub: existingUser._id
                    },
                    process.env.REFRESH_TOKEN_SECRET,
                    {
                        expiresIn: '1d'
                    }
                );

                if (Array.isArray(existingUser.refreshToken)) {
                    existingUser.refreshToken.push(refreshToken);
                } else {
                    existingUser.refreshToken = [refreshToken];
                }
                await existingUser.save();

                res.cookie('access_token', accessToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 30 * 1000 });
                res.cookie('refresh_token', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

                res.status(200).json({ msg: 'Login success', user: existingUser, access_token: accessToken, refresh_token: refreshToken });
            } else {
                res.status(401).json({ error: 'Incorrect password' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = loginController;