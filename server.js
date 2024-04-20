import express from 'express';
import { openWebPage } from './miarchivo.js';

const app = express();
const port = process.env.PORT||3001;

app.get('/scrape/:numRuc', async (req, res) => {
    const numRuc = req.params.numRuc;
    if (!numRuc) {
        return res.status(400).send('Por favor, proporcione un RUC válido.');
    }

    try {
        const result = await openWebPage(numRuc);
        res.send(result);
    } catch (error) {
        console.error("Error al consultar RUC:", error);
        res.status(500).send('Ocurrió un error al consultar el RUC.');
    }
});

app.get("/check", (_, res)=>{
    res.status(200).send("¡Todo correcto!");
})

app.listen(port, ()=>{
    console.log('server listo, corriendo puerto', port)
})
