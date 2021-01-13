const porta = 4000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const categoriesController = require("./categories/categoriesController");
const articlesController = require("./articles/articlesController");
const Category = require("./categories/Category");
const Article = require("./articles/Article");


//View engine
app.set('view engine','ejs');

//para o node poder trabalhar com arquivos estáticos
app.use(express.static('public'));

//body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//database connection
connection
    .authenticate()
    .then(()=>{
        console.log("Banco de dados conectado")
    }).catch((error)=>{
        console.log("Ocorreu algum erro no banco de dados");
    })
//usar as rotas de categorias
app.use("/",categoriesController);

//usar as rotas de artigos
app.use("/",articlesController);

app.get("/",(req,res)=>{
    res.render('index');
})

app.listen(porta,()=>{
    console.log("servidor rodando na porta ",porta);
})