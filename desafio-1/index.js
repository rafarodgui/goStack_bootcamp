const express = require('express');

const app = express();

app.use(express.json());

const projects = [];
let numberOfRequests = 0

app.use((req, res, next)=>{
    console.time('Process')

    console.log(`Method ${req.method} was called, URL ${req.url} was sollicited`);

    console.log(numberOfRequests)

    console.timeEnd('Process')

    return next()
});

function verifyInput(req, res, next){

    if(!req.body.id ||!req.body.title ||!req.body.tasks){
        return res.status(400).json({error: 'Information is missing'});
    }

    return next();
}

function verifyTitle(req, res, next){
    if(!req.body.title){
        return res.status(400).json({error: 'Title is missing'});
    }

    return next()
}

function verifyTasks(req, res, next){
    const { tasks } = req.body;

    if(!tasks){
        return res.status(400).json({error: 'Please, insert a task'})
    }

    return next();
}

function verifyId(req, res, next){

    if(!projects[req.params.id]){
        return res.status(400).json({error: 'This project does not exists'})
    }

    return next();
}

app.get('/projects', (req, res) => {
    numberOfRequests += 1
    return res.json(projects);
});

app.get('/projects/:id',verifyId, (req, res) => {
    numberOfRequests += 1
    const { id } = req.params;

    res.json(projects[id]);
});

app.post('/projects', verifyInput, (req, res) => {
    numberOfRequests += 1
    const { id, title, tasks } = req.body;

    projects.push({ id, title, tasks });

    return res.json(projects);
});

app.put('/projects/:id/',verifyTitle, verifyId, (req, res) => {
    numberOfRequests += 1
    
    const { id } = req.params;
    const { title } = req.body;

    projects[id].title = title

    res.json(projects[id])
});

app.delete('/projects/:id', verifyId, (req, res) =>{
    numberOfRequests += 1

    const { id } = req.params;

    projects.splice(projects[id], 1);

    return res.json(projects);
});

app.put('/projects/:id/tasks', verifyId, verifyTasks, (req, res) => {
    numberOfRequests += 1

    const { tasks } = req.body
    const { id } = req.params;

    projects[id].tasks.push(tasks);

    return res.json(projects[id]);
});
 
app.listen(3333);