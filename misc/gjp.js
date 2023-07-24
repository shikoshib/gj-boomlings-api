module.exports = {
    gjp:
        function(password) {
            const XOR = require("./xor.js");
            const xor = new XOR();
            return xor.encrypt(password, 37526).toString();
        }
}