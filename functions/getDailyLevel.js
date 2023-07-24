module.exports = {
    /**
     * Gets the current daily level.
     */
    getDailyLevel:
        async function() {
            const { dlLevel } = require("./dlLevel.js")
            let res = await dlLevel(-1);
            return res;
        }
}