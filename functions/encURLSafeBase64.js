module.exports = {
    encURLSafeBase64: 
        function(string) {
            const bs = require("js-base64");
            if(!string || string == "") throw new Error("No string provided!")
            let str = bs.encode(string, true);
            return str;
        }
}