/**
 * @typedef {Object} Song
 * @property {string} name - The song's name.
 * @property {number} id - The song's ID.
 * @property {string} artist - The song artist.
 * @property {number} artistId - The song artist's ID on Newgrounds.
 * @property {number} fileSize - The song's file size in megabytes.
 * @property {string} link - The direct link to download the song file.
 */

module.exports = {
    /**
     * Searches for a song on Newgrounds or in the internal Geometry Dash song library.
     * @param {number} song - The song ID.
     * @returns {Song}
     */
    getSongInfo: async function (song) {
        if (isNaN(song)) throw new Error("Please provide a valid song ID.");
        const { gjReq } = require("../gjReq");

        const data = {
            songID: song,
            secret: "Wmfd2893gb7"
        }

        let res = await gjReq('getGJSongInfo', data);
        if (res.data == -2) throw new Error(`-2. Couldn't find a song with ID ${song}.`)
        let rawSong = res.data.split("~|~");

        let link = decodeURIComponent(rawSong[13]);
        if (link == "CUSTOMURL") link = `https://geometrydashfiles.b-cdn.net/music/${song.toString().trim()}.ogg`;

        const result = {
            name: rawSong[3],
            id: Number(rawSong[1]),
            artist: rawSong[7],
            artistId: Number(rawSong[5]),
            fileSize: Number(rawSong[9]),
            link: link
        }

        return result;
    }
}