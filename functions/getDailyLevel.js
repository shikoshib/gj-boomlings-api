module.exports = {
    /**
     * Gets the current daily level.
     * @returns {import("./dlLevel").Level}
     */
    getDailyLevel: async function () {
        const { dlLevel } = require("./dlLevel");
        let res = await dlLevel(-1);
        return res;
    }
}