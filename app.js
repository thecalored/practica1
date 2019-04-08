var express = require('express');
var bodyParser=require('body-parser');
var app = express();
app.set('view engine','ejs');
var pass={"Marc":"1234","David":"4321"};

app.use(bodyParser.urlencoded({extended: false}));
app.get('/', function (req, res) {
  res.render('index',{});
  
});
app.post('/form_url',function(req,res){
	console.log(req.body.namee);
	console.log(req.body.pass);
	if(pass[req.body.namee]){
		if(req.body.pass == pass[req.body.namee]){
		res.send('el nombre es correcto');
	}else{
		res.send('el password es incorrecto');
	}
	}else{
		res.send('el nombre no es correcto');
	}
		
	
	
});
app.get('/api/login/:user/:pass', function (req, res){
  for(var item in pass){
    if(item===req.params.user && pass[item]===req.params.pass){
      var msgOK = {"status":"OK"};
      res.send(JSON.stringify(msgOK));
      return;
    }
  }
  var msgFail = {"status":"ERROR"};
  res.send(JSON.stringify(msgFail));
});
app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 5000!');
});
