var _ = require('lodash');

var operations = [
  {
    customerId : 1,
    label : 'Virement',
    amount :  100
  },
  {
    customerId : 1,
    label : 'Retrait',
    amount :  900
  },
  {
    customerId : 1,
    label : 'Virement',
    amount :  270
  },

  {
    customerId : 2,
    label : 'Retrait',
    amount :  500
  }

];

function getOperationsForCustomer(id){

  var idInNumber = parseInt(id);
  var aOperation = _.filter(operations, {'customerId' : idInNumber});
//  console.log("operation" + aOperation);
  return aOperation;

}

module.exports = {
  getOperationsForCustomer:getOperationsForCustomer
};
