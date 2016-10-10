var _ = require('lodash');
var mongoose = require('mongoose');
var Customer = require('./customer-model');

mongoose.connect("mongodb://admindb:admindb@ds053156.mlab.com:53156/bankapidb");

// Récupérer tous les clients:
function getCustomers(done){
  //Création de l'objet "customer"
  Customer.find({}, function(err, customers){
    if (err){
      return undefined;
    } else {
        if (_.isArray(customers)){
            // Init du tableau à retourner
            var listFoundCustomers = [];

            // Parcourir le tableau
            for (var i=0, j=customers.length; i<j; i++){
              var currentCustomer = customers[i];
              var foundCustomer = {
                  id:currentCustomer._doc._id.toString(),
                  firstname:currentCustomer._doc.firstname,
                  lastname:currentCustomer._doc.lastname,
                  address:currentCustomer._doc.address
              };
              listFoundCustomers.push(foundCustomer);
            }
            done (listFoundCustomers);
        } else {
            done ([]);
          }
      }
  });
}

// Récupérer tous les clients:
// @param {Number} id numéro du client:

function getCustomerById(id){

  // TODO :
  //  1- boucler sur le tableau
  //  2- Trouver un élément qui a le même id
  //      que celui passé en paramètre
  //  3- Retourner le client trouvé

  var idInNumber = parseInt(id);
  var aCustomer = _.find(customers, {'id' : idInNumber});

  return aCustomer;
  /*
  for(var i =0, j= customers.length;i<j;i++)
  {
      if (idInNumber === customers[i].id){
        aCustomer = customers[i];
      }
  }
  */

}

// Ajouter un client
//
//  @param {Object} aCustomer un client
//
//TODO :
// 1- Attribuer un 'id' qui n'existe pas dans le tableau
// 2- Ajouter le client au tableau
// 3- Retourner "true" quand c'est ok. "false" sinon.

function addCustomer(aCustomer){
  // Création de l'objet "customer"
  var customer = new Customer();

  // Récup des données envoyées par la route
  customer.firstname = aCustomer.firstname;
  customer.lastname = aCustomer.lastname;
  customer.address =  aCustomer.address;

  // Sauvegarde
  customer.save(function(err){
    if (err){
      return false;
    }
    return true;
  });
}

//    Mettre à jour un client
//
//  @param {Obeject} foundCustomer client trouvé dans notre base
//  @param {Obeject} aCustomer nouvelles données du client

function updateCustomer(foundCustomer, aCustomer){
  // Récupérer l'id du client existant dans la base
  var customerIdToUpdate = foundCustomer.id;
  aCustomer.id = customerIdToUpdate;

  //TODO:
  //  1- Parcourir le tableau
  //  2- Trouver le client
  //  3- Mettre à jour le client
  //  4- Retourner "true" quand c'est ok . false sinon

  var indexOfCustomerToUpdate = _.indexOf(customers, foundCustomer);
  customers[indexOfCustomerToUpdate] = aCustomer;

}

//  Mettre à jour un client:
//
//  @param {Object} foundCustomer client trouvé dans notre base
//

function deleteCustomer(foundCustomer){
  //TODO:
  //  1- Parcourir le tableau
  //  2- Trouver le client
  //  3- le supprimer
  //  4- Retourner "true" quand c'est ok . false sinon

  var indexOfCustomerToDelete = _.indexOf(customers, foundCustomer);
  customers.splice(indexOfCustomerToDelete, 1);

}

module.exports = {
  getCustomers:getCustomers,
  getCustomerById:getCustomerById,
  addCustomer:addCustomer,
  updateCustomer:updateCustomer,
  deleteCustomer:deleteCustomer
};
