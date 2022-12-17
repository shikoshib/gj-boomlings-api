module.exports = {
    encURLSafeBase64: 
        function(string) {
            const bs = require("js-base64");
            if(!string) throw new Error("No string provided!")
            let str = bs.encode(string).replace('/', /_/g).replace('+', /-/g);
            return str;
        }
}