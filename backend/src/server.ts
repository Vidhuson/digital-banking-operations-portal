import express from 'express';
import authRoutes from './routes/auth.routes';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

const PORT = 5000;

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy'
  });
});

// Auth Routes
app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});