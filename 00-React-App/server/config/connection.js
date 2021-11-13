const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOOSE_URI || 'mongodb://localhost/googlebooks', {
    useNewUrlParser: true,
    useUnifiedTopography: true,
    useCreateIndex: true,
    useFindAndModify: true,
});

module.exports = mongoose.connection;