/**
 * @typedef {Object} Artist
 * @property {number} id - The artist's ID.
 * @property {string} name - The artist's name.
 * @property {string} website - The artist's website.
 * @property {string} youtube - The artist's YouTube channel ID.
 */

/**
 * @typedef {Object} Song
 * @property {number} id - The song ID.
 * @property {string} name - The song name.
 * @property {Artist} artist - The song artist.
 * @property {number} size - The song file size in megabytes.
 * @property {number} duration - The song duration in seconds.
 * @property {Array<String>} genres - The song genres.
 */

/**
 * @typedef {Object} Library
 * @property {number} version - The songs library's version.
 * @property {Array<Song>} songs - The songs included in the internal Geometry Dash song library.
 */

module.exports = {
    /**
     * Gets the list of songs from the internal Geometry Dash song library.
     * @returns {Library}
     */
    getSongsLibrary: async function () {
        const zlib = require("zlib");
        const fetch = require("node-fetch");

        let req = await fetch("https://geometrydashfiles.b-cdn.net/music/musiclibrary.dat");
        let res = await req.text();

        let libArray;
        const buffer = await new Promise((resolve, reject) => {
            zlib.unzip(Buffer.from(res, "base64"), (err, buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
        })
        const rawData = buffer.toString();
        libArray = rawData.split("|");

        let library = {};
        library.version = Number(libArray[0]);

        let genres = [];
        let rawGenres = libArray[3].split(";");
        rawGenres.pop();
        rawGenres.forEach(genre => {
            genres.push({ id: genre.split(",")[0], name: genre.split(",")[1] })
        });

        let artists = [];
        let rawArtists = libArray[1].split(";");
        rawArtists.pop();
        rawArtists.forEach(artist => {
            let obj = {};
            obj.id = Number(artist.split(",")[0]);
            obj.name = artist.split(",")[1];
            if (artist.split(",")[2].trim() != "") obj.website = decodeURIComponent(artist.split(",")[2]);
            if (artist.split(",")[3].trim() != "") obj.youtube = artist.split(",")[3];
            artists.push(obj);
        })

        let songs = [];
        let rawSongs = libArray[2].split(";");
        rawSongs.pop();
        rawSongs.forEach(song => {
            let obj = {};

            obj.id = Number(song.split(",")[0]);
            obj.name = song.split(",")[1];

            let songArtist = artists.filter(a => a.id == song.split(",")[2])[0];
            obj.artist = songArtist;

            let size = song.split(",")[3];
            size = size / 1048576;
            obj.size = size.toFixed(1);

            obj.duration = Number(song.split(",")[4]);

            let songGenres = [];
            let rawSongGenres = song.split(",")[5].split(".");
            rawSongGenres.shift();
            rawSongGenres.pop();
            rawSongGenres.forEach(genre => {
                let songGenre = genres.filter(g => g.id == genre)[0];
                songGenres.push(songGenre.name);
            })
            obj.genres = songGenres;

            songs.push(obj);
        })

        library.songs = songs;

        return library;
    }
}