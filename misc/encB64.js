module.exports = {
    encB64: 
        function(string) {
            return btoa(unescape(encodeURIComponent(string))).replace(/\//g, '_').replace(/\+/g, '-');
        }
}