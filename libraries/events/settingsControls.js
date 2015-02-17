/**
 * Constructeur
 * @param grilleController grille
 *
 */
var settingsControls = function (grille) {
    this.grille = grille;
};

/**
 * Choix des cellules vivantes
 * @param object currentElement
 *
 */
settingsControls.prototype.cellsSelect = function (currentElement) {
    var lineCoord = ($(currentElement).parent().attr('id')).replace('line-', '');
    var rowCoord = ($(currentElement).attr('id')).replace('row-', '');

    if ($(currentElement).attr('data-active') == "true") {
        $(currentElement).attr('data-active', false);
        this.grille.setRow(lineCoord, rowCoord, 0);
    } else {
        $(currentElement).attr('data-active', true);
        this.grille.setRow(lineCoord, rowCoord, 1);
    }
};

/**
 * Selection du personnage
 * @param object currentElement
 *
 */
settingsControls.prototype.characterSelect = function (currentElement) {
    var name = $(currentElement).attr('data-name');

    // On met a jour le personnage actuel
    $('.row').each(function () {
        $(this).attr('data-character', name);
    });

    // On definie le personnage pour le jeu
    this.grille.setCharacter(name);
};