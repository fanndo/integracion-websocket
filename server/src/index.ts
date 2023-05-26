import express, { Express, Request, Response } from 'express';
import http from 'node:http'
import { Server } from "socket.io";


import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const server = http.createServer(app);

const io = new Server(server);

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

io.on('connection', socket => {
    console.log('a user connected', socket.id);
    console.log('clientes conectados', io.engine.clientsCount);
    socket.emit('test',{ someProperty: 'some value', otherProperty: 'other value' })
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

io.emit('test',{ someProperty: 'some value', otherProperty: 'other value' })


server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});