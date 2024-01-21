const mongoose = require('mongoose')

const Schema = mongoose.Schema

const codeBlockSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
    }, 
}, {
    timestamps: true
,})

module.exports = mongoose.model('CodeBlock', codeBlockSchema)

