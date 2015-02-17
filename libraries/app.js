/** PARAMETRES **/
var socketIO = io('localhost:8080');

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


/** LOADING **/
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

    // Quand le joueur quitte le mode fullScreen
    if (!$('#game-interface').hasClass('active')) {
        $('.pane[data-active]').attr('data-active', false);
        $('#home').attr('data-active', true);

        // On envoie la deconnexion au serveur
        socketIO.emit('disconnect');
    }
});



// Click sur jouer en ligne
$('#play-online').on('click', function () {
    $('.loading').addClass('active');
    loadingTmp = setInterval(playOnlineLoading, 30);

    // On envoie la requete de jeu au serveur
    socketIO.emit('playOnline');
});


// Lors du choix du personnage
$('#select-character ul li').on('click', function () {
    var character = $(this).attr('data-char');

    // Loading
    $('.loading').addClass('active');
    loadingTmp = setInterval(playOnlineLoading, 30);

    socketIO.emit('chooseCharacter', character);
});


// Lors du clique sur le bouton "Jouer"
$('#start-game').on('click', function () {
    gameControlsHandler.play();
    
    $(this).fadeOut(function() {
        $('#end-game').fadeIn();
    });
});


// Lors du clique sur le bouton "Finir"
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


$('#grille').on('click', '.row', function () {
    settingsControlsHandler.cellsSelect(this);
});




/***********************************************************************************/
/******************************** SOCKET I/O ***************************************/
/***********************************************************************************/

// Lorsque l'on nous dit l'etat du joueur courrant (peut jouer ou en attente)
socketIO.on('userState', function (state) {
    $('.loading').removeClass('active');
    clearInterval(loadingTmp);

    setPane($('.pane[data-active="true"]'), false);

    // Si il reste des places pour jouer
    // on affiche le choix d'un personnage
    if (state === true) {
        setPane($('#select-character'), true);
    } else {
        setPane($('#waiting'), true);
    }
});


// Lorsque l'on nous dit si le personnage choisi est ok ou pas
socketIO.on('characterResponse', function (response) {
    $('.loading').removeClass('active');
    clearInterval(loadingTmp);

    if (response != false) {
        grille.setCharacter(response);

        /** GENERATION & DESSIN DE LA GRILLE **/
        grille.generate(sizeGrille);
        grille.draw(grilleID);

        setPane($('#select-character'), false);
        setPane($('#in-game'), true);
    } else {
        alert('Ce personnage est deja partis en mission');
    }
});


// Lorsque l'on se fait deconnecter
socketIO.on('logOut', function () {
    setPane($('.pane[data-active="true"]'), false);
    setPane($('#home'), true);
    
    socketIO.emit('disconnect');
});


// Lorsque l'on nous dit de retenter de ce connecter
socketIO.on('retryPlaying', function() {
    $('#play-online').trigger('click');
});


/***********************************************************************************/
/******************************** FUNCTIONS ****************************************/
/***********************************************************************************/

/** Definie l'etat d'une pane **/
function setPane(element, state) {
    state = (!state) ? false : state;
    element.attr('data-active', state);
}