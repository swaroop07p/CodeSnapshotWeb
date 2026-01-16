// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    // FIX: Destructure 'username' instead of 'name' to match User.js model
    const { username, email, password } = req.body; 
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        // FIX: Pass 'username' to the new User instance
        user = new User({ username, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = { id: user.id };
        jwt.sign(
            payload, 
            process.env.JWT_SECRET || 'fallback_secret_for_hackathon', 
            { expiresIn: '7d' }, 
            (err, token) => {
                if (err) throw err;
                // FIX: Return 'username' instead of 'name'
                res.json({ 
                    token, 
                    user: { id: user.id, username: user.username, email: user.email } 
                });
            }
        );
    } catch (err) {
        console.error("Critical Register Error:", err.message);
        res.status(500).json({ msg: "Registration failed on server." });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ 
                msg: "User doesn't exist. Please create an account to get started!" 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Incorrect password. Please try again.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // FIX: Consistently return 'username'
        res.json({ token, user: { id: user._id, username: user.username, email } });
    } catch (err) {
        res.status(500).send('Server error');
    }
};