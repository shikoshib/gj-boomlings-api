module.exports = {
    decURLSafeBase64:
        function(string) {
            const bs = require("js-base64");
            if(!string || string == "") throw new Error("No string provided!")
            let str = bs.decode(string.replaceAll("_", '/').replaceAll("-", '+'));
            if(!bs.isValid(str)) throw new Error("The provided string is not encoded in Base64!")
            return str;
        }
}