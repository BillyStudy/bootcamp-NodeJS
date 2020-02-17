const express = require('express');
const server = express();

server.use(express.json());


server.use((req, res, next) =>{
    console.time('Request');
    console.log(`O método: ${req.method} foi chamado;`);

    next();
    console.timeEnd('Request')
});

function checkUsersExist(req, res, next) {
    if (!req.body.nome) {
        return res.status(400).json({error : "User name is required"});
    }
    return next();
}

function checkUserInArray(req, res, next) {
    const user = users[req.params.index];

    
    if (!users[req.params.index]) {
        return res.status(400).json({error : "User does not exist"});
    }

    req.user = user;
    return next();
}

const users = ['Gustavo', 'Eder', 'Nathan'];
    
    server.get('/users', (req, res) =>{
        return res.json(users)
    });

    server.get('/users/:index',checkUserInArray, (req, res) =>{
        return res.json(req.user)
    });

    server.post('/users/',checkUsersExist, (req, res) =>{
        const { nome } = req.body;
        users.push(nome);
        return res.json(users);
    });

    server.put('/users/:index',checkUsersExist,checkUserInArray, (req, res) =>{
        const { index } = req.params;
        const { nome } = req.body;
        users[index] = nome;
        return res.json(users)
    });

    server.delete('/users/:index',checkUserInArray, (req, res) =>{
        const { index } = req.params;
        users.splice(index, 1);
        return res.json(users)
    });

server.listen(3000);

