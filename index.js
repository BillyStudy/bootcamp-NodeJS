const express = require('express');
const server = express();

server.get('/users/:id', (req, res) =>{
    const id = req.params.id;
    return res.json({"message": `Buscando o usuário ${id}`})
});

server.listen(3000);

