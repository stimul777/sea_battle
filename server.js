import express from 'express'
import http from 'http'
// пути
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});
// kill CORS
app.use(express.static(__dirname + '/dist'));

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});