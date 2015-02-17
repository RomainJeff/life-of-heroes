/** PARAMETRES **/
var sizeGrille = [15, 15];
var grilleID = "grille";
var grille = new grilleController();
var grilleTempo = new grilleTempoController();
var gameControlsHandler = new gameControls({
    grille: grille,
    grilleTempo: grilleTempo,
    id: grilleID
});
var settingsControlsHandler = new settingsControls(grille);




/***********************************************************************************/
/***********************************************************************************/
/***********************************************************************************/


/** FAKE LOADING **/
var loadingTmp = function () {};

var playOnlineLoading = function() {
  var step = parseInt($('.loading .flash').attr('data-step'));
  step = (step >= 3) ? 0 : (step + 1);
  
  $('.loading .flash').attr('data-step', step);
  
};


/** EVENTS **/

$('#start-experience').on('click', function () {
    fullScreen();
});


$('#quit-experience').on('click', function () {
    exitFullScreen();
});


document.addEventListener('webkitfullscreenchange', function (event) {
    $('#game-interface').toggleClass('active');
});


$('#play-online').on('click', function () {
    $('.loading').addClass('active');
    loadingTmp = setInterval(playOnlineLoading, 30);

    setTimeout(function () {
        $('.loading').removeClass('active');
        clearInterval(loadingTmp);

        setPane($('#home'), false);
        setPane($('#select-character'), true);
    }, 3000);
});


// Lors du clique sur le bouton "Jouer"
$('#start-game').on('click', function () {
    gameControlsHandler.play();
    
    $(this).fadeOut(function() {
        $('#end-game').fadeIn();
    });
});


// Lors du clique sur le bouton "Jouer"
$('#end-game').on('click', function () {
    gameControlsHandler.reset();
    gameControlsHandler.stop();

    $(this).fadeOut(function() {
        $('#start-game').fadeIn();
    });
});


$('#display-rules').on('click', function () {
    $(this).addClass('active');
    $('.rules').toggleClass('active');
});


$('#select-character ul li').on('click', function () {
    var character = $(this).attr('data-char');

    grille.setCharacter(character);

    /** GENERATION & DESSIN DE LA GRILLE **/
    grille.generate(sizeGrille);
    grille.draw(grilleID);

    setPane($('#select-character'), false);
    setPane($('#in-game'), true);
});


$('#grille').on('click', '.row', function () {
    settingsControlsHandler.cellsSelect(this);
});



/** Definie l'etat d'une pane **/
function setPane(element, state) {
    state = (!state) ? false : state;
    element.attr('data-active', state);
}