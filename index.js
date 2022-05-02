const express = require('express');
const app = express();
const port = process.env.port || 5000;
const cors = require('cors')

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('my smarty node')
});

const users = [
    { id: 1, name: 'john', phone: 0154545454 },
    { id: 2, name: 'wick', phone: 1215484 },
    { id: 3, name: 'smith', phone: 5454545454 },
    { id: 4, name: 'steve', phone: 01546565 }
]

// api create
app.get('/users', (req, res) => {
    // filter by search query parameter
    if (req.query.name) {
        const search = req.query.name.toLowerCase();
        const matched = users.filter(user => user.name.toLowerCase().includes(search))
        res.send(matched)
    } else (
        res.send(users))
})

app.get('/user/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    const user = users.find(user => user.id == id)
    res.send(user);
})

// post method
app.post('/user', (req, res) => {
    console.log(req.body);
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.send(user)
})

app.listen(port, () => {
    console.log(port);
})

