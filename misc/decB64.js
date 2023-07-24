module.exports = {
    decB64:
        function(string) {
            return decodeURIComponent(escape(atob(string.replaceAll("_", '/').replaceAll("-", '+'))));
        }
}