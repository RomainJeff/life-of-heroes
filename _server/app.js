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

        console.log(usersModel.getCountPlaying());

        // Si il reste de la place on place le joueur
        // En ligne sinon on le place en attente
        if (usersModel.getCountPlaying() < 2) {
            usersModel.addPlaying(socket.id);
            socket.emit('userState', true);
        } else {
            usersModel.addWaiting(socket.id);
            socket.emit('userState', false);
        }
    });


    // Quand le client se deconnecte
    socket.on('logOut', function () {
        if (usersModel.exists(socket.id, true)) {
            usersModel.deletePlaying(socket.id);

            return true;
        }

        if (usersModel.exists(socket.id, false)) {
            usersModel.deleteWaiting(socket.id);

            return true;
        }
    });

});