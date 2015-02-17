/**
 * Gere le coeur du jeu
 * @param grilleController
 * @param neighborController
 * @param grilleTempoController
 */
var gameController = function (grilleController, grilleTempoController) {
    this.grilleController = grilleController;
    this.grilleTempoController = grilleTempoController;
};

/**
 * Lance une partie
 */
gameController.prototype.start = function() {
    // On parcourt les lignes
    for (line = 0; line < sizeGrille[0]; line++) {
        this.grilleTempoController.setRow(line, 0, 0);

        // On parcourt les colonnes
        for (row = 0; row < sizeGrille[1]; row++) {
            // On recupere le nombre de voisins
            var neighbors = new neighborController(this.grilleController, line, row)
                                                  .getAlive();

            // Si cellule morte
            if (this.grilleController.get()[line][row] == 0) {
                // Si 3 voisins = naissance
                if (neighbors == 3) {
                    this.grilleTempoController.setRow(line, row, 1);
                } else {
                    this.grilleTempoController.setRow(line, row, 0);
                }
            } else {
                // Si 2 ou 3 voisins = vivante
                if (neighbors == 2 || neighbors == 3) {
                    this.grilleTempoController.setRow(line, row, 1);
                } else {
                    this.grilleTempoController.setRow(line, row, 0);
                }
            }
        }
    }

    // Mise a jour de la grille
    for(var i = 0; i < sizeGrille[0]; ++i)
    {
        for(var j = 0; j < sizeGrille[1]; ++j)
        {
            this.grilleController.setRow(i, j, this.grilleTempoController.get()[i][j]);
            this.grilleTempoController.setRow(i, j, 0);
        }
    }

    this.grilleController.draw(grilleID);
};