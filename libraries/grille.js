var grilleController = function(){

    this.grille = [];
    this.character = "green";

};

/**
 * Defini l'etat d'une cellule
 * @param int line 
 * @param int row
 * @param bool value
 *
 */
grilleController.prototype.setRow = function (line, row, value) {
    this.grille[line][row] = value;
};

/**
 * Recupere la grille
 * @return array
 *
 */
grilleController.prototype.get = function () {

    return this.grille;
};

/**
 * Definie le personnage
 * @param string character
 */
grilleController.prototype.setCharacter = function (character) {
    this.character = character;
};


/**
 * Recupere le personnage
 * @return string character
 */
grilleController.prototype.getCharacter = function () {
    return this.character;
};

/** 
 * Retourne la taille de la grille 
 * @return int
 *
 */
grilleController.prototype.getSize = function () {
    return this.get().length;
};

/**
 * Genere une grille de taille indiquee
 * @param int taille
 * @param bool alea (facultatif)
 *
 */
grilleController.prototype.generate = function (taille, alea) {
    var table = [];

    for(i = 0; i < taille[0]; i++) {
        table[i] = [];

        for (ib = 0; ib < taille[1]; ib++) {
            if (alea == true) {
                if ((Math.random() * 10) > 8) {
                    table[i][ib] = 1;
                } else {
                    table[i][ib] = 0;
                }
            } else {
                table[i][ib] = 0;
            }
        }
    }

    this.grille = table;
};

/** 
 * Dessine la grille sur la page
 * @param string grilleID
 *
 */
grilleController.prototype.draw = function (grilleID) {
    var toDisplay = "";

    for(iLine = 0; iLine < sizeGrille[0]; iLine++) {
        toDisplay += '<div id="line-'+ iLine +'" class="line">';

        for(iRow = 0; iRow < sizeGrille[1]; iRow++) {
            var active = (!this.grille[iLine][iRow]) ? "false" : "true";
            toDisplay += '<div class="row" id="row-'+ iRow +'" data-character="'+ this.getCharacter() +'" data-active="'+ active +'"></div>';
        }

        toDisplay += '<div class="clear"></div>';
        toDisplay += '</div>';
    }

    // Initialisation
    $('#'+ grilleID).html(toDisplay);
};