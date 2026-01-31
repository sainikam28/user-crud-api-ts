import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './config/db';

// Why DB connection before app.listen()?

// ✔️ Because app should not accept requests if DB is unavailable
// ✔️ This is called fail-fast design

console.log('[server.ts] Starting application initialization...');
console.log('[server.ts] Connecting to database...');

connectDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('[server.ts] ✅ Server is running on port', PORT);
    console.log('[server.ts] Environment:', process.env.NODE_ENV || 'development');
});