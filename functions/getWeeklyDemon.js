module.exports = {
    /**
     * Gets the current weekly demon.
     * @returns {import("./dlLevel").Level}
     */
    getWeeklyDemon: async function () {
        const { dlLevel } = require("./dlLevel");
        let res = await dlLevel(-2);
        return res;
    }
}