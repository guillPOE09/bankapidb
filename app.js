var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var customers = require('./customers.js');
var operations = require('./operations.js');
var app = express();

// Configuration du body parser:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(function(request, response, next){
    console.log(request.method +  'via ->'+ request.url);
    next();
});

// Récupération de tous les clients:
app.get('/customers', function(request, response){
    //var customersList = customers.getCustomers();
    //response.json({customersList:customersList});
    customers.getCustomers(function(data){
      response.json({customersList:data});
    });
});

// Récupérer le client ayant l'id passé en paramètre:
app.get('/customers/:id', function(request, response){
    // Récupérer l'id passé en paramètre:
    var customerId = request.params.id;

    // TODO: Récupérer le client avec l'id:
    var foundCustomer = customers.getCustomerById(customerId);
    response.json({customer:foundCustomer});
});

app.post('/customers',function(request,response){
  //  récupération du client passé en paramètre:
  var aCustomer = request.body;
  console.log('Adding : ' + JSON.stringify(aCustomer));

  // Ajout du client:
  customers.addCustomer(aCustomer);
  response.sendStatus(200);
});

// Mettre à jour le client ayant l'id passé en paramètre:
app.put('/customers/:id',function(request,response){
  //  Récupérer l'id passé en paramètre:
  var customerId = request.params.id;

  //Récupération des données à mettre à jour:
  var aCustomer = request.body;

  //TODO: Récupérer le client avec l'id:
  var foundCustomer = customers.getCustomerById(customerId);

  // Mettre à jour le client:
  customers.updateCustomer(foundCustomer, aCustomer);
  response.sendStatus(200);
});

// Supprimer le client ayant l'id passé en paramètre:
app.delete('/customers/:id',function(request,response){
  //  Récupérer l'id passé en paramètre:
  var customerId = request.params.id;

  //TODO: Récupérer le client avec l'id:
  var foundCustomer = customers.getCustomerById(customerId);

  customers.deleteCustomer(foundCustomer);
  response.sendStatus(200);
});


// Récupérer le client ayant l'id passé en paramètre:
app.get('/customers/:id/operations',function(request,response){
  // Récupérer l'id passé en paramètre:
  var customerId = request.params.id;

  var foundOperations = operations.getOperationsForCustomer(customerId);
  response.json({operations:foundOperations});
});


http.createServer(app).listen(3000);
