const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/bulletin"
// const url = "mongodb://localhost:27017/admin"

const connect = () => {
    mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            ignoreUndefined: true,
        })
        .catch(err => console.log(err));
};

mongoose.connection.on('error', err => {
    console.error("mongoDB connection error", err);
});

module.exports = connect;
