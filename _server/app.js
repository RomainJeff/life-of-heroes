var io = require('socket.io')(8080);

/** Model **/
var usersModelConstructor = require('./models/usersModel.js')();
var usersModel = new usersModelConstructor();

var charactersModelConstructor = require('./models/charactersModel.js')();
var charactersModel = new charactersModelConstructor();

var sessionsModel = require('./models/sessionsModel.js');



io.on('connection', function (socket) {

    // Ajout de la session au sessionModel
    sessionsModel.add(socket.id, socket);

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
    socket.on('disconnect', function () {
        // Si le client etait en jeu
        if (usersModel.exists(socket.id, true)) {
            // Suppression du joueur courant
            usersModel.deletePlaying(socket.id);
            charactersModel.delete(socket.id);

            // On recupere l'adversaire
            var adversary = usersModel.getAdversary(socket.id);

            // On le deconnecte si il y en a un
            if (adversary) {
                sessionsModel.get(adversary).emit('logOut');
                // Suppression de l'adversaire
                usersModel.deletePlaying(adversary);
                charactersModel.delete(socket.id);
            }

            // On envoie le droit de jouer aux 2 prochains joueurs
            for (id in usersModel.getWaiting()) {
                if (id >= 2) {
                    break;
                }

                var socketID = usersModel.getWaitingFromIndex(id);
                sessionsModel.get(socketID).emit('retryPlaying');
                usersModel.deleteWaiting(socketID);
            }

        } else if (usersModel.exists(socket.id, false)) {
            usersModel.deleteWaiting(socket.id);
        }

        // Suppression de la session
        sessionsModel.delete(socket.id);
    });

});