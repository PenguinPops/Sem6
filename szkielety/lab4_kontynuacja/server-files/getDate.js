// server-files/getDate.js
function getDate() {
    return new Date().toISOString().replace('T', ' ').replace('Z', '');
}

module.exports = getDate;
