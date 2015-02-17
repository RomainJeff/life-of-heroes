module.exports = function () {

    /**
     * Constructeur
     */
    var userModel = function () {
        this.users = [];
        this.waiting = [];
    };


    /**
     * Ajoute un utilisateur
     * @param int id
     * @param bool inGame
     */
    userModel.prototype.add = function(id, inGame) {
        var inGame = (!inGame) ? false : inGame;

        if (inGame) {
            this.users.push(id);
        } else {
            this.waiting.push(id);
        }

        return true;
    };


    /**
     * Supprime un utilisateur
     * @param int id
     */
    userModel.prototype.delete = function(id) {
        if (this.exist(id, true)) {
            delete this.users[this.users.indexOf(id)];

            return true;
        }

        if (this.exist(id, false)) {
            delete this.waiting[this.waiting.indexOf(id)];

            return true;
        }

        return false;
    };


    /**
     * Verifie qu'un utilisateur existe
     * @param int id
     * @param bool inGame
     */
    userModel.prototype.exist = function (id, inGame) {
        if (inGame) {
            if (!this.users[this.users.indexOf(id)]) return false;
        } else {
            if (!this.waiting[this.waiting.indexOf(id)]) return false;
        }

        return true;
    };


    /**
     * Recupere les utilisateurs en jeu
     * @param int id
     */
    userModel.prototype.getInGame = function (id) {
        if (!id) return this.users;

        return this.users[this.users.indexOf(id)];
    };


    /**
     * Recupere les utilisateurs en attente
     * @param int id
     */
    userModel.prototype.getWaiting = function (id) {
        if (!id) return this.waiting;

        return this.waiting[this.waiting.indexOf(id)];
    }


    // On exporte la classe
    return userModel;
};