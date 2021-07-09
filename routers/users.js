// APIs
const express = require('express');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const Users = require("../schemas/users");
const crypto = require('crypto');

const router = express.Router();  // making router

const joiSchema = Joi.object({
    nickname: Joi.string().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    password: Joi.string().min(4),
    repeat_password: Joi.ref('password'),
});

router.post("/", async (req, res) => {
    let { nickname, password, password2 } = req.body;

    // 중복 확인 -> 중복된 닉네임 입니다.
    const existUser = await Users.findOne({
        nickname: nickname
    });

    if (existUser) {
        res.send({
            errorMessage: 'existed user',
        })

        return;
    }

    if (password.includes(nickname)){
        res.send({
            errorMessage: 'do not include nickname to your password',
        })

        return;
    }

    // 닉네임 확인(Joi)
    const { value, error } = joiSchema.validate({ 
        nickname: nickname, 
        password: password, 
        repeat_password: password2
    });

    if (!error) {
        // password saving using crypto
        password = crypto.createHmac('sha256', password).update('hashhashhash!').digest('hex');
        const user = new Users({ nickname, password });
        await user.save();

        res.send({ });
    } else {
        res.send({
            errorMessage: error.details[0].message
        });
    }
})

router.post("/auth", async (req, res) => {
    let { nickname, password } = req.body;

    password = crypto.createHmac('sha256', password).update('hashhashhash!').digest('hex');

    const user = await Users.findOne({ nickname, password });

    if (!user) {
        res.send({
            errorMessage: 'wrong nickname or password'
        })

        return;
    }

    const token = jwt.sign({ userId: user.userId }, "gardenisthebest");

    res.send({ token:token, username: user.nickname });
})

module.exports = router;