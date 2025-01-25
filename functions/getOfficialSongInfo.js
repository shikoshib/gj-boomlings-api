/**
 * @typedef {Object} Song
 * @property {string} name - The song's name.
 * @property {string} id - The ID of the level the song is used in (e.g. "Level 1").
 * @property {string} artist - The song artist.
 * @property {string} link - The link to listen to the song.
 */
module.exports = {
    /**
     * Gets song info about an official song.
     * @param {number} song - The song ID.
     * @returns {Song}
     */
    getOfficialSongInfo: function (song) {
        if (isNaN(song)) throw new Error("Please provide a valid official song ID.");
        const officialSongs = require("../misc/officialsongs.json");

        let result = officialSongs[Number(song)];
        if (!result) result = officialSongs["-1"];
        return result;
    }
}