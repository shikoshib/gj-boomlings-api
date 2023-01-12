module.exports = {
    decB64:
        function(string) {
            let str = decodeURIComponent(escape(atob(string.replaceAll("_", '/').replaceAll("-", '+'))));
            return str;
        }
}