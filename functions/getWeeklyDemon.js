module.exports = {
    /**
     * Gets the current weekly demon.
     */
    getWeeklyDemon:
        async function () {
            const { dlLevel } = require("./dlLevel.js");
            let res = await dlLevel(-2);
            return res;
        }
}