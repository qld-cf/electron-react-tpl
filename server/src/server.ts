import * as Koa from 'koa'; // koa框架
import getConfig from './config';
import * as http from 'http';
import * as socketIO from 'socket.io'
import globalLogger from './utils/logger/globalLog'
import log from './middleware/log'
// 路由分发
import routerMount from './router/index';


// 中间件
import cors from './middleware/cors';
import * as bodyParser from 'koa-bodyparser';

const app = new Koa(); // 新建一个koa应用
const env = process.env.NODE_ENV
const PORT: number | string = getConfig(env).basePort;
const server = http.createServer(app.callback());
// const io = socketIO(server, { pingInterval: 20000 })
const io = socketIO(server)


let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  // getApiAndEmit(socket)
  interval = setInterval(() => getApiAndEmit(socket), 3000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // 向客户端发送事件
  socket.emit("FromAPI", response);
};


app.use(cors)
app.use(log())
app.use(bodyParser())
routerMount(app)

globalLogger()


const _server = app.listen(PORT); // 监听应用端口

server.listen(_server) // 监听socket端口 必须要监听该端口服务 不然405
// server.listen(getConfig(env).baseSocketPort) // 监听socket端口


console.log(`Server running on port ${PORT}`);