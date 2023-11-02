const express = require('express');
const cors = require('cors');
const axios = require('axios');

const PORT = 5000;
const app = express();

app.use(cors());
const corsOptions = {
    origin: "http://localhost:8080"
};

// Questo gestisce la richiesta GET
app.get('/getData/:number', cors(corsOptions), async (req, res) => {
    const comicNumber = req.params.number;

    if (!comicNumber || isNaN(comicNumber)) {
        return res.status(400).json({ error: 'Numero della vignetta invalida' });
    }

    const requestEndpoint = `https://xkcd.com/${comicNumber}/info.0.json`;

    try {
        const response = await axios.get(requestEndpoint);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Fallito tentativo di ottenere il dato' });
    }
});

app.listen(PORT, () => {
    console.log(`Server in ascolto a http://localhost:${PORT}`);
});