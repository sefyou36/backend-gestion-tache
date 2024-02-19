const express =require("express");
const app = express();
const cors = require('cors');
const port = 4200;

require('./config/config')

app.use(express.json());

const allRoute = require('./routers/router');

app.use('/api',allRoute)


app.listen(port,() => {
    console.log(`serveur is listening to ${port}...`);
})