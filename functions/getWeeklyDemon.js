module.exports = {
    getWeeklyDemon: async function () {
        const { dlLevel } = require("./dlLevel");
        let res = await dlLevel(-2);
        return res;
    }
}