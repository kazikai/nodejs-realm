const express = require('express');
const bodyParser = require('body-parser');
const realm = require('realm');

const app = express();

const TodoSchema = {
    name: 'Todo',
    properties: {
        timestamp: 'date',
        id: 'string',
        todo: 'string'
    }
};

const todoRealm = new Realm({
    path: 'todo.realm',
    schema: [TodoSchema]
});

const dirName = "html"

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    let todos = todoRealm.objects('Todo').sorted('timestamp', true);
    res.render('index.ejs', {
        todos: todos
    });
});
app.get('/write', function(req, res) {
    console.log(__dirname);
    res.sendFile(__dirname + "/html/write.html");
});
app.post('/write', function(req, res) {
    const id = req.body['id'];
    const todo = req.body['todo'];
    const timestamp = new Date();
    console.log( id, todo, timestamp );
    todoRealm.write(() => {
        todoRealm.create('Todo', {id: id, todo: todo, timestamp: timestamp});
    });
    res.sendFile(__dirname + "/html/success.html");
});

app.listen(3000, function() {
    console.log('Listen...3000!');
});

