import route from './src/Routes/route.js';
import config from './config/appConfig.js';

const port = process.env.PORT || 3001;

const app = config();

route(app);

app.listen(port, () => console.log(`server work on port ${port}`));
