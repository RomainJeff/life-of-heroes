var io = require('socket.io')(8080);

/** Model **/
var usersModelConstructor = require('./models/usersModel.js')();
var usersModel = new usersModelConstructor();

var charactersModelConstructor = require('./models/charactersModel.js')();
var charactersModel = new charactersModelConstructor();


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
        if (usersModel.getCountPlaying() < 2) {
            usersModel.addPlaying(socket.id);
            socket.emit('userState', true);
        } else {
            usersModel.addWaiting(socket.id);
            socket.emit('userState', false);
        }
    });


    // Quand l'utilisateur choisis son personnage
    socket.on('chooseCharacter', function (character) {
        // Si le personnage n'est pas deja pris
        if (!charactersModel.isTaken(character)) {
            charactersModel.add(socket.id, character);
            socket.emit('characterResponse', character);

            return true;
        }

        socket.emit('characterResponse', false);
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