var express = require('express');
var app = express();
var port = process.env.port || 3000;

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res)=>{
    res.render('index.html');
});

app.listen(port, ()=>{
    console.log("App listening to: "+port);
});