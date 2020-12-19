const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const app = require('./app');
const server = app.listen(process.env.SERVER_PORT, () => {
    let protocol = process.env.SERVER_HTTPS === true ? 'https' : 'http';
    let domain = process.env.SERVER_HOST;
    let port = server.address().port;
    let address = `${protocol}://${domain}:${port}`;

    console.log(`Server running: ${address}`);
});