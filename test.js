const crypto = require('crypto');

const password = "1234";
const hash = crypto.createHmac('sha256', password).update('hashhashhash!').digest('hex');

console.log(hash);

const password2 = "5678";
const hash2 = crypto.createHmac('sha256', password2).update('hashhashhash!').digest('hex');

console.log(hash2);