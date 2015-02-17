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
     */
    userModel.prototype.addPlaying = function(id) {
        this.users[id] = {};
    };


    /**
     * Ajoute un utilisateur en attente
     * @param int id
     */
    userModel.prototype.addWaiting = function(id) {
        this.waiting.push(id);
    };


    /**
     * Modifie les parametres d'un utilisateur
     * @param object params
     */
    userModel.prototype.set = function(params) {
        this.users[id] = params;
    };


    /**
     * Supprime un utilisateur en jeu
     * @param int id
     */
    userModel.prototype.deletePlaying = function(id) {
        delete this.users[id];
    };


    /**
     * Supprime un utilisateur en attente
     * @param int id
     */
    userModel.prototype.deleteWaiting = function(id) {
        delete this.waiting[this.waiting.indexOf(id)];
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
            if (!this.waiting[this.waiting.indexOf(id)]) return false;
        }

        return true;
    };


    /**
     * Recupere les utilisateurs en jeu
     * @param int id
     */
    userModel.prototype.getPlaying = function (id) {
        if (!id) return this.users;

        return this.users[id];
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