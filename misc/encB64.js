module.exports = {
    encB64: 
        function(string) {
            if(!string || string == "") throw new Error("No string provided!")
            let str = btoa(unescape(encodeURIComponent(string))).replace(/\//g, '_').replace(/\+/g, '-');
            return str;
        }
}