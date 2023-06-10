import express from 'express';
import route from './src/Routes/route.js';

const app = express();
const port = process.env.PORT || 3001;

route(app);

app.listen(port, () => console.log(`server work on port ${port}`));
