import express from 'express';
import cors from 'cors';
import helmet, { contentSecurityPolicy } from 'helmet';
import morgan from 'morgan';
import { aj } from './lib/arcjet.js';
import path from 'path';

import productRoutes from './routes/productRoutes.js';
import { sql } from './config/db.js';


const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
})); // helmet is a security middleware that helps to protect your app by setting various HTTP headers
app.use(morgan('dev')); // log the requests

// Apply Arcjet to all routes
app.use(async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.status(429).json({ error: "Too many requests" })
            }
            else if (decision.reason.isBot()) {
                res.status(403).json({ error: "No bots allowed" })
            }
            else {
                res.status(403).json({ error: "Forbidden" })
            }
            return;
        }
        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            res.status(403).json({ error: "No spoofed bots allowed" });
            return;
        }
        next();
    } catch (error) {
        console.log('Arject error:', error);
        next(error);
    }
});

app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
    });
}


async function initDB() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log('Database initialized successfully');
    } catch (error) {
        console.log('Error initializing database:', error);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    })
});

