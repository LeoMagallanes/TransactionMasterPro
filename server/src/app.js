import config from './config.js';
import express from 'express';
import indexRoutes from './routes/index.routes.js'

const app = express()
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.use(express.json())
app.use('/api',indexRoutes)
app.set('port', config.port)

export default app