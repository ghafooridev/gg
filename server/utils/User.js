const UserModel = require("../models/User")

let users = []

const addUser = async function ({
                                    socketId,
                                    username,
                                    room,
                                    place,

                                }) {

    const user = await UserModel.findOne({username})

    user.socketId = socketId
    user.room = room
    user.socketId = socketId
    if (place === "lobby") {
        user.inQueue = true
    }
    if (place === "game") {
        user.inQueue = false
        user.inGame = true
    }
    await user.save()

    return user;
}


const removeUserByUsername = async function (username, place) {
    const user = await UserModel.findOne({username})
    user.inGame = false
    user.inQueue = false
    user.room = ""
    user.point = 0
    user.round = 0
    user.save()
}

const getUserByUsername = async function (username, place) {
    return await UserModel.findOne({username})
}

const getUserBySocketId = async function (socketId, place) {
    return await UserModel.findOne({socketId})
}

const getAllUsers = async function (room, place) {
    if (place === "game") {
        return await UserModel.find({room, inGame: true})
    }
    if (place === "lobby") {
        return await UserModel.find({
            $and: [
                {room},
                {$or: [{inGame: true}, {inQueue: true}]}
            ]
        })
    }
}

const updateUsersAfterTurn = async function (room, place, turn) {
    return await UserModel.find({room, inGame: true})
}

const updateUserPoint = async function (room, round, place, username) {
    const filteredUser = await UserModel.find({room, inGame: true})

    const updateUsers = filteredUser.map((user) => {
        if (username && username.includes(user.username)) {
            if (user.round !== round) {
                user.point += 5
                user.round = round
                user.save()
            }
            return user
        }
        return user
    })

    return updateUsers
}

const getUserTurnByUsername = async function (room, preTurn) {
    const filteredUser = await UserModel.find({room, inGame: true})

    if (!preTurn) {
        const player = filteredUser[0]
        if (player) {
            return player.username
        }
    }
    const index = filteredUser.findIndex((user) => user.username === preTurn)
    if (index + 1 < filteredUser.length) {
        return filteredUser[index + 1].username
    }
    if (filteredUser[0]) {
        return filteredUser[0].username
    }

    return null
}

const getRandomHostUser = async function (room) {
    const filteredUser = await UserModel.find({room, inGame: false, inQueue: true})

    if (filteredUser.length) {
        return filteredUser[Math.floor(Math.random() * filteredUser.length)]
            .username
    }
}

module.exports = {
    addUser,
    removeUserByUsername,
    getUserByUsername,
    getAllUsers,
    getUserTurnByUsername,
    updateUsersAfterTurn,
    updateUserPoint,
    getUserBySocketId,
    getRandomHostUser,
}
