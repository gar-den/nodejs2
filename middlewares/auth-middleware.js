const jwt = require('jsonwebtoken');
const User = require('../schemas/users');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    const [ tokenType, tokenValue ] = authorization.split(" ");

    if (tokenType != "Bearer") {
        res.send({ errorMessage: 'not logged in' });

        return;
    }

    try {
        const { userId } = jwt.verify(tokenValue, "gardenisthebest");

        User.findById(userId).exec().then((user) => {
            res.locals.user = user;

            next();
        })
    } catch (err) {
        res.send({ errorMessage: "not logged in" });
    }
}