const mongoose = require('mongoose')
const { Schema } = mongoose

const TokenSchema = new Schema({
    device: String,
    appname: String,
    token: String,
    channel: String,
    created: Number,
    user: String
})

const TokenModel = mongoose.model("token", TokenSchema)

module.exports = TokenModel
