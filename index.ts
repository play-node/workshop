import express, {request, Request, Response} from "express";

const fs = require('fs');

const PORT = 3000;
const address: string = `http://localhost:${PORT}`;

export const app = express();

app.use(express.json());

app.get("/healthz", function (req: Request, res: Response) {
    res.status(200)
    res.send({status: "OK"});
});

app.post("/store-data", function (req, res) {
    console.log(req.body)
    let user = {
        name: req.body.name,
        email: req.body.email,
    };

    let data = JSON.stringify(user, null, 2);

    fs.writeFile(`${req.body.name}.json`, data,'utf8',  (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });


    res.status(200)
    res.send({status: "OK"});
});
app.listen(PORT, () => {
    console.log(`starting app on: ${address}`);
});