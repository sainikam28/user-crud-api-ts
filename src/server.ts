import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './config/db';

// Why DB connection before app.listen()?

// ✔️ Because app should not accept requests if DB is unavailable
// ✔️ This is called fail-fast design

connectDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
})