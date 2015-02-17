module.exports = function (usersModel) {

    return {
        usersModel: usersModel

        playOnline: function () {
            // Si il reste de la place on place le joueur
            // En ligne sinon on le place en attente
            if (usersModel.getInGame().length >= 2) {
                usersModel.add(socket.id, true);
                socket.emit('userState', true);

                console.log(usersModel.getPlaying(socket.id));
            } else {
                usersModel.add(socket.id, false);
                socket.emit('userState', false);

                console.log(usersModel.getWaiting(socket.id));
            }
        }

    };

}