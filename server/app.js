const express = require('express');
const cors = require('cors');
const config = require('config');
const app = express();
const port = 5050;

const mongoose = require('mongoose');
const mongodb = config.get('mongoURI');
mongoose.connect(mongodb, {useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(cors());
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.send('welcome to the machine...');
})

app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
});