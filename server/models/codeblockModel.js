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
})

module.exports = mongoose.model('CodeBlock', codeBlockSchema)

