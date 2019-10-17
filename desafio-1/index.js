const express = require('express');

const app = express();

app.use(express.json());

const projects = [];

/*function verifyProjects(req, res, next){

    const { project } = projects[req.params.id];

    if(!project){
        return res.status(400).json('Não existe esse projeto');
    }

    req.project = project;

    return next();
}*/

app.get('/projects', (req, res) => {
    return res.json(projects);
});

app.get('/projects/:id', (req, res) => {
    const { id } = req.params;

    res.json(projects[id]);
});

app.post('/projects', (req, res) => {
    const { id, title, tasks } = req.body;

    projects.push({ id, title, tasks });

    return res.json(projects);
});

app.put('/projects/:id/', (req, res) => {
    
    const { id } = req.params;
    const { title } = req.body;

    projects[id].title = title

    res.json(projects[id])
});

app.delete('/projects/:id', (req, res) =>{

    const { id } = req.params;

    projects.splice(projects[id], 1);

    return res.json(projects);
});

app.put('/projects/:id/tasks', (req, res) => {

    const { tasks } = req.body
    const { id } = req.params;

    projects[id].tasks.push(tasks);

    return res.json(projects[id]);
});
 
app.listen(3333);