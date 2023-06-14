const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const env = require('dotenv');
const { registerUser, loginUser } = require('./controllers/auth');
const { dashBoardData } = require('./controllers/dashboard');
const { getUserData, getUserSocials } = require('./controllers/getUserData');
const { saveSocials, saveProfile, saveLinks } = require('./controllers/saveItems');
const { loadSocials, loadLinks } = require('./controllers/loadPrevious');
env.config();
mongoose.set('strictQuery', false);

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected");
}).catch(err => { console.log(err.message) });

app.get('/', (req, res) => {
    res.send("hello");
})


app.post('/api/register', registerUser);
app.post('/api/login', loginUser);
app.post('/data/dashboard', dashBoardData);
app.get('/get/:handle', getUserData);
app.get('/get/socials/:handle', getUserSocials);
app.post('/save/socials', saveSocials)
app.post('/save/profile', saveProfile)
app.post('/save/links', saveLinks)
app.post('/load/socials', loadSocials)
app.post('/load/links', loadLinks)




const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Running on ${port}`);
});