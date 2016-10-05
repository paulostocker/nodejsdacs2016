var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mysql      = require('mysql');

function dbcomm(){
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'bob',
		password : 'bob',
		database : 'lojadacs2016'
	});
	connection.connect(function(err){
		if(err)
			console.log("ERRO!!!" + err);
	});
	return connection;
}

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.disable('x-powered-by');

var port = process.env.PORT || 80;

var router = express.Router();

app.use('/api', router);

router.get('/usuarios', function(req,res){
	var queryString = 'select * from cliente';
 	
 	connection = dbcomm();
	
	connection.query(queryString, 
			function(err, rows, fields) {
	    if (err) throw err;
	 	var dados = [];

	    for (var i in rows) {
	    	dados.push(rows[i]);
	        console.log('nome', rows[i].NOME);
	        console.log('nome', rows[i].ENDERECO);
	        console.log('nome', rows[i].EMAIL);
	    }
	    res.status(202);
		res.json(dados);
	});
});

router.get('/usuarios/:id', function(req,res){

	
	res.status(202);
	res.json(obj);
});

router.post('/usuarios',function(req,res){
	console.log(req.body.id);
	console.log(req.body.nome);
	console.log(req.body.idade);
	res.status(202);
	res.json({status:'success'});
});

var handlebars = require('express-handlebars').
	create({'defaultLayout':'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
	res.render('home');
});

app.get('/about',function(req,res){
	res.render('about',{autor:"UNIVILLE"});
});

app.get('/contact',function(req,res){
	res.render('contact');
});

app.post('/process',function(req,res){
	console.log(req.query.form);
	console.log(req.body);
	res.render('home');
});

app.get('/cliente',function(req,res){
	var queryString = 'select * from cliente';
 	
 	connection = dbcomm();
	
	connection.query(queryString, 
			function(err, rows, fields) {
	    if (err) throw err;
	 	
	    res.status(202);
		res.render('cliente',{data:rows});
	});
});

app.get('/cliente/add',function(req,res){
	res.render('clientedetail');
});

app.post('/cliente/save',function(req,res){
	var queryString = "";
	if(req.save.oid == 0){
		queryString = "insert into cliente(nome,endereco,email) values('?','?','?')";
 	}else{
 		queryString = "update cliente set nome='?',endereco='?',email='?'";
 	}
 	connection = dbcomm();
	
	connection.query(queryString, 
			function(err, rows, fields) {
	    if (err) throw err;
	 	
	    res.status(202);
		res.render('cliente',{data:rows});
	});

	res.render('clientedetail');
});


app.listen(port,function(){
	console.log("To rodando na porta...." + port);
});


