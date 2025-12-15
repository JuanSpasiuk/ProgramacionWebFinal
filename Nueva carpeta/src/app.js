import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import router from './routes/index.js';
import productosRoutes from './routes/productos.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(express.static(path.resolve('public')));

// Rutas
app.use('/', router);
app.use('/api/productos', productosRoutes);


app.get('/admin', (req, res) => {
  res.sendFile(path.resolve('public', 'admin.html'));  
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

export default app;


