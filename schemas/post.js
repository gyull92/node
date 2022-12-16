const mongoose = require('mongoose');
const post = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    contents:{
        type: String,
        required: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("Post", post);