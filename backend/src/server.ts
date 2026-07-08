import express from 'express';
import authRoutes from './routes/auth.routes';
import customerRoutes from './routes/customer.routes'
import accountRoutes from './routes/account.routes';
import transactionRoutes from './routes/transaction.routes';
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();
app.use(express.json());

const PORT = 5000;

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy'
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use("/api/v1/accounts", accountRoutes);
app.use("/api/v1/transactions", transactionRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});