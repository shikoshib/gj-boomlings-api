console.log('\x1b[32m%s\x1b[40m', 'Thanks for using gj-boomlings-api!\nhttps://github.com/shikoshib/gj-boomlings-api');
console.log('\x1b[37m%s\x1b[0m', '');

const { dlLevel } = require("./functions/dlLevel.js");
const { getSongInfo } = require("./functions/getSongInfo.js");
const { getOfficialSongInfo } = require("./functions/getOfficialSongInfo.js");
const { decURLSafeBase64 } = require("./functions/decURLSafeBase64.js");
const { encURLSafeBase64 } = require("./functions/encURLSafeBase64.js");
const { getDailyLevel } = require("./functions/getDailyLevel.js");
const { getWeeklyDemon } = require("./functions/getWeeklyDemon.js");
const { getProfile } = require("./functions/getProfile.js");
const { reportLevel } = require("./functions/reportLevel.js");
const { getComments } = require("./functions/getComments.js");
const { getCommentHistory } = require("./functions/getCommentHistory.js");
const { getGauntlets } = require("./functions/getGauntlets.js");
const { getAccountPosts } = require("./functions/getAccountPosts.js");
const { uploadAccountPost } = require("./functions/uploadAccountPost.js");
const { uploadComment } = require("./functions/uploadComment.js");
const { getMapPacks } = require("./functions/getMapPacks.js");
const { blockUser } = require("./functions/blockUser.js");
const { getLevelByID } = require("./functions/getLevelByID.js");
const { getTop100 } = require("./functions/getTop100.js");
const { getCreatorScores } = require("./functions/getCreatorScores.js");
const { updateLevelDesc } = require("./functions/updateLevelDesc.js");
const { deleteAccountPost } = require("./functions/deleteAccountPost.js");
const { getUserLevels } = require("./functions/getUserLevels.js");
const { searchLevels } = require("./functions/searchLevels.js");
const { deleteComment } = require("./functions/deleteComment.js");
const { unblockUser } = require("./functions/unblockUser.js");

module.exports.dlLevel = dlLevel;
module.exports.getSongInfo = getSongInfo;
module.exports.getOfficialSongInfo = getOfficialSongInfo;
module.exports.decURLSafeBase64 = decURLSafeBase64;
module.exports.encURLSafeBase64 = encURLSafeBase64;
module.exports.getDailyLevel = getDailyLevel;
module.exports.getWeeklyDemon = getWeeklyDemon;
module.exports.getProfile = getProfile;
module.exports.reportLevel = reportLevel;
module.exports.getComments = getComments;
module.exports.getCommentHistory = getCommentHistory;
module.exports.getGauntlets = getGauntlets;
module.exports.getAccountPosts = getAccountPosts;
module.exports.uploadAccountPost = uploadAccountPost;
module.exports.uploadComment = uploadComment;
module.exports.getMapPacks = getMapPacks;
module.exports.blockUser = blockUser;
module.exports.getLevelByID = getLevelByID;
module.exports.getTop100 = getTop100;
module.exports.getCreatorScores = getCreatorScores;
module.exports.updateLevelDesc = updateLevelDesc;
module.exports.deleteAccountPost = deleteAccountPost;
module.exports.getUserLevels = getUserLevels;
module.exports.searchLevels = searchLevels;
module.exports.deleteComment = deleteComment;
module.exports.unblockUser = unblockUser;