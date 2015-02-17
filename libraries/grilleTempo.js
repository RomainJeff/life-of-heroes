var grilleTempoController = function (){

   this.grille = [];
};

/**
 * Recupere la grille temporaire
 * @return array grille
 *
 */
grilleTempoController.prototype.get = function() {
    return this.grille;
};

/**
 * Definit une cellule de la grille temporaire
 * @param int line
 * @param int row
 * @param boolean value
 *
 */
grilleTempoController.prototype.setRow = function(line,row,value){

    if (!this.grille[line]) this.grille[line] = [];

    this.grille[line][row] = value;
};