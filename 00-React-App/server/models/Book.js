const { Schema } = require('mongoose');

//This is a subdocument schema, it become its own model but but we'll use it as the schema for the User's 'savedBooks' array in User.js
const bookSchema = new Schema({
    authors: [
        {
            type: String,
        },
    ],
    description: {
        type: String,
        required: true,
    },
    //saved book is from GoogleBooks
    bookId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
});

module.exports = bookSchema;