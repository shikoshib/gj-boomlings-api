module.exports = {
    decodeAccountPost:
        function(post) {
            const {decB64} = require("./decB64.js");

            let postContent = post.split("2~")[1].split("~4~")[0];
            let likes = post.split("~4~")[1].split("~9~")[0];
            let age = post.split("~9~")[1].split("~6~")[0];
            let id = post.split("~6~")[1];

            if(id.includes("~")) id = post.split("~6~")[2];
            if(id.includes("#")) id = id.split("#")[0];

            const result = {
                content: decB64(postContent).trim(),
                likes: Number(likes),
                age: age,
                id: Number(id)
            }

            return result;
        }
}