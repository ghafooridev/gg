/*
 * Contains all utility functionality
 */

function makeId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function generateUniqueId(model, idField, idLength) {
    
    let id = "";
    do { id = makeId(idLength) }
    while(await model.exists({ [idField]: id }));

    return id;
}

module.exports = {
    makeId: makeId,
    generateUniqueId: generateUniqueId
}