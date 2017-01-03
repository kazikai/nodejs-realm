const express = require('express');
const bodyParser = require('body-parser');
const realm = require('realm');

const app = express();

const TodoSchema = {
    name: 'TodoSchema',
    property: {
        timestamp: 'date',
        id: 'string',
        todo: 'string'
    }
};

const todoRealm = new Realm({
    path: 'todo.realm',
    schema: [TodoSchema]
});

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
    res.sendFile(__dirname + "/write.html");
});
app.post('/write', function(req, res) {
    const id = req.body['id'];
    const todo = req.body['todo'];
    const timestamp = new Date();
    blogRealm.write(() => {
        blogRealm.create('Todo', {id: id, todo: todo, timestamp: timestamp});
    });
    res.sendFile(__dirname + "/write-complete.html");
});

app.listen(3000, function() {
    console.log("Listen...!");
});

