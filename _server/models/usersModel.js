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
            if (!this.users[id]) return false;
        } else {
            if (!this.waiting[id]) return false;
        }

        return true;
    };


    // On exporte la classe
    return userModel;
};