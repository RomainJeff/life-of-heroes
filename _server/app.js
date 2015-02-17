var io = require('socket.io').listen(8080);

/** Model **/
var usersModelConstructor = require('./models/usersModel.js')();
var usersModel = new usersModelConstructor();


io.on('connection', function (socket) {

});