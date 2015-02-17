var io = require('socket.io')(8080);

/** Model **/
var usersModelConstructor = require('./models/usersModel.js')();
var charactersModelConstructor = require('./models/charactersModel.js')();

global.models = {
    sessions    : require('./models/sessionsModel.js'),
    users       : new usersModelConstructor(),
    characters  : new charactersModelConstructor()
};


/** Controllers **/
var gameControllerConstructor = require('./controllers/gameController.js')();

global.controllers = {
    game : new gameControllerConstructor()
};


/** Events **/
global.events = {
    game: require('./events/game.js')
};


/** Ecoute les evenements **/
io.on('connection', function (socket) {

    // Ajout de la session au sessionModel
    global.models.sessions.add(socket.id, socket);


    /********************
     * EVENTS LISTENERS
     ********************/

    // Quand le client nous demande de jouer
    // en ligne
    socket.on('playOnline', function() {
        global.events.game.playOnline(socket);
    });


    // Quand l'utilisateur choisis son personnage
    socket.on('chooseCharacter', function (character) {
        global.events.game.selectChar(socket, character);
    });


    // Quand le client se deconnecte
    socket.on('disconnect', function () {
        global.events.game.logOut(socket);
    });

});