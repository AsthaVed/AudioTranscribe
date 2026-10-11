import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import transcribeRoutes from './routes/transcribeRoutes.js';

dotenv.config();

//connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

//Basic Route 
app.get('/', (req,res)=>{
    res.send("API is Running!");
})

app.use('/api', transcribeRoutes); 

//Start server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})

// server (client request) -> routes -> middleware (multer) -> controller -> Groq (api) -> save in DB -> response
