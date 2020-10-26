/*
 * Contains all utility functionality
 */

function makeId(length) {
  let result = ""
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

async function generateUniqueId(model, idField, idLength) {
  let id = ""
  do {
    id = makeId(idLength)
    /* eslint-disable no-await-in-loop */
  } while (await model.exists({ [idField]: id }))

  return id
}

module.exports = {
  makeId,
  generateUniqueId,
}
