import express from 'express';
import { errorMiddleware } from "./middleware/error.middleware";
import { requestContextMiddleware } from './middleware/request-context.middleware';
import authRoutes from './routes/auth.routes';
import customerRoutes from './routes/customer.routes'
import accountRoutes from './routes/account.routes';
import transactionRoutes from './routes/transaction.routes';
import dashboardRoutes from './routes/dashboard.routes';
import auditLogRoutes from './routes/audit-log.routes';
import employeeRoutes from './routes/employee.routes';
import notificationRoutes from './routes/notification.routes';

const app = express();
app.use(express.json());
app.use(requestContextMiddleware);

const PORT = 5000;

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy'
  });
});

const API_PREFIX = "/api/v1";

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/customers`, customerRoutes);
app.use(`${API_PREFIX}/accounts`, accountRoutes);
app.use(`${API_PREFIX}/transactions`, transactionRoutes);
app.use(`${API_PREFIX}/dashboard`, dashboardRoutes);
app.use(`${API_PREFIX}/audit-logs`, auditLogRoutes);
app.use(`${API_PREFIX}/employees`, employeeRoutes);
app.use(`${API_PREFIX}/notifications`, notificationRoutes);

app.use(errorMiddleware);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});