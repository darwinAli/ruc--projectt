import express from 'express';
import { openWebPage } from './miarchivo.js';
import readInfo from './testDelete.js';

const app = express();
app.use(express.json())
const port = process.env.PORT||3001;

app.get('/scrape/:numRuc', async (req, res) => {
    const numRuc = req.params.numRuc;
    if (!numRuc) {
        return res.status(400).send('Por favor, proporcione un RUC válido.');
    }

    try {
        const result = await openWebPage(numRuc);
        console.log(result)
        res.json(result);
    } catch (error) {
        console.error("Error al consultar RUC:", error);
        res.status(500).send('Ocurrió un error al consultar el RUC.');
    }
});

app.post("/test", (req, res)=>{
    const data = req.body;
    console.log(data)
    readInfo(data);
    res.json(data);
});

app.get("/check", (_, res)=>{
    res.status(200).send("¡Todo correcto!");
})

app.listen(port, ()=>{
    console.log('server listo, corriendo puerto', port)
})
