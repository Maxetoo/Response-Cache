const users = require('../data/mockData')

const getUsers = async(req, res) => {
    try {
        await res.json({ users })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getUsers
}