const express = require('express');
const bodyParser = require('body-parser');
const posts = require('./routes/posts');
const app = express();
const port = 5050;

const mongoose = require('mongoose');
const mongodb = 'mongodb://127.0.0.1/blog';
mongoose.connect(mongodb, {useNewUrlParser: true,
    useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use('/api/posts', posts);

app.get('/', (req, res) => {
    res.send('welcome to the machine...');
})

app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
});