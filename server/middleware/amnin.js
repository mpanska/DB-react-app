const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

// module.exports = function (req, res, next) {
//     if (req.user && req.user.role === 1) {
//         return next();
//     }
//     res.status(403).json({ error: "You are not an admin." });
// };


router.get('/admin', auth, (req, res) => {
    User.findOne(
        { _id: req.user._id },
        (err, doc) => {
            let history = doc.history;
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, history })
        }
    )
})