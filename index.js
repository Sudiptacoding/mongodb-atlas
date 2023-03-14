require('dotenv').config()
var express = require('express')
const mongoose = require('mongoose');
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

PORT = process.env.PORT || 5000

const cunnectDb = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.yjaatuq.mongodb.net/student?retryWrites=true&w=majority`);
        console.log("Db is cunnect")
    } catch (error) {
        console.log(error)
    }
}
// schema
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const userMOdel = mongoose.model('users', userSchema)

app.post('/user', async (req, res) => {
    try {
        const user = req.body;
        const newUser = userMOdel({
            name: user.name,
            email: user.email
        })
        await newUser.save();
        res.send(newUser)
    } catch (error) {
        console.log(error)
    }
})

app.get('/alluser', async (req, res) => {
    try {
        const findUser = await userMOdel.find({});
        console.log(findUser)
        if (findUser) {
            res.status(200).send(findUser)
        } else {
            res.status(404).send("User not found")
        }
    } catch (error) {
        res.status(502).send(error)
    }
})





app.get('/', function (req, res) {
    res.send('hello world')
})

app.listen(PORT, async () => {
    await cunnectDb()
    console.log(`https://localhost run ${PORT}`)
})