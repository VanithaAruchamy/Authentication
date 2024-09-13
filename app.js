const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

// Configuration values
const PORT = 3001; // You can change the port if needed

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Protected route example
app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
