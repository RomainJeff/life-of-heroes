var io = require('socket.io')(8080);

/** Model **/
var usersModelConstructor = require('./models/usersModel.js')();
var usersModel = new usersModelConstructor();


/** Controllers **/


io.on('connection', function (socket) {


    /********************
     * EVENTS LISTENERS
     ********************/

    // Quand le client nous demande de jouer
    // en ligne
    socket.on('playOnline', function() {
        // Si il reste de la place on place le joueur
        // En ligne sinon on le place en attente
        if (usersModel.getPlaying().length < 2) {
            usersModel.addPlaying(socket.id);
            socket.emit('userState', true);

            console.log(usersModel.getPlaying(socket.id));
        } else {
            usersModel.addWaiting(socket.id);
            socket.emit('userState', false);

            console.log(usersModel.getWaiting(socket.id));
        }
    });

});