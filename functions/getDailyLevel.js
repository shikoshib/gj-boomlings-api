module.exports = {
    getDailyLevel: async function () {
        const { dlLevel } = require("./dlLevel")
        let res = await dlLevel(-1);
        return res;
    }
}