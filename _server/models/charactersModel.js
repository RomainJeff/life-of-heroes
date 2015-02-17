module.exports = function () {

    /**
     * Constructeur
     */
    var characterModel = function () {
        this.characters = [];
    };


    /**
     * Ajoute un characters
     * @param id id
     * @param string name
     */
    characterModel.prototype.add = function(id, name) {
        this.characters[id] = name;
    };


    /**
     * Supprime un personnage pris
     * @param int id
     */
    characterModel.prototype.delete = function(id) {
        delete this.characters[id];
    };


    /**
     * Verifie qu'un personnage n'est pas pris
     * @param int id
     * @param bool inGame
     */
    characterModel.prototype.isTaken = function (name) {
        if (this.characters.indexOf(name) < 0) return false;

        return true;
    };


    // On exporte la classe
    return characterModel;
};