module.exports = {
    decodeAccountPost:
        function(post) {
            const bs = require("js-base64");

            let postContent = post.split("2~")[1].split("~4~")[0];
            let likes = post.split("~4~")[1].split("~9~")[0];
            let age = post.split("~9~")[1].split("~6~")[0];
            let id = post.split("~6~")[1];

            if(id.includes("~")) id = post.split("~6~")[2];
            if(id.includes("#")) id = id.split("#")[0];

            const result = {
                content: bs.decode(postContent.replace(/_/g, '/').replace(/-/g, '+')).trim(),
                likes: Number(likes),
                age: age,
                id: Number(id)
            }

            return result;
        }
}