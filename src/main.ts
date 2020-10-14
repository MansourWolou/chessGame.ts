import express = require('express');
import bodyParser = require('body-parser');

const PORT: number = 8080;
const PUBLIC_DIR = 'client'
const app = express();

import { Chessboard, createInitialChessboard } from './chessboard';
import { processMove } from './movements';


class HttpServer {
  port: number;

  constructor(port: number) {
    this.port = port;
  }

  public onStart(): void {
    let chessboard: Chessboard = createInitialChessboard();
    let app: express.Application = express();
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(PUBLIC_DIR));
    app.set('view engine', 'ejs')

    app.listen(this.port, () => {
      console.log("Application lancée à l'adresse http://localhost:" + this.port);
    });

    app.get('/',  (req: express.Request, res: express.Response) => {
      res.render('index', {error: null});
    })

    app.get("/status.js", (req: express.Request, res: express.Response) => {
      res.end("var boardJSON= " + JSON.stringify(chessboard));
    });

    app.post("/", (req: express.Request, res: express.Response) => {
      let unparsedMove: string = req.body.move;
      let didPerfom: boolean = processMove(chessboard, unparsedMove);
      let message: string = didPerfom ? "" : "Invalid movement!"
      res.render('index', {error: message});
    });
  }
}

let server: HttpServer = new HttpServer(PORT)
server.onStart();