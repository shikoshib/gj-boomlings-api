module.exports = {
    getDailyLevel:
        async function() {
            const { dlLevel } = require("./dlLevel.js")
            let res = await dlLevel(-1);
            return res;
        }
}