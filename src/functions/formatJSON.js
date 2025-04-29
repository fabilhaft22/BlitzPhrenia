function formatJSON(json){
    const playerId = Object.keys(json.data)[0];

    return json.data[playerId]
}

module.exports = {
    formatJSON
}