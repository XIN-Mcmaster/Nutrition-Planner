const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./src/Routes/userRoute'); 
const planRoutes = require('./src/Routes/planRoute'); 

const db = require('./src/config/db');


app.use(cors());
app.use(express.json())

app.use('/api/user', userRoutes); 
app.use('/api/plan', planRoutes); 


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});