const keys = document.querySelectorAll(".key");
let countEvent = 0;
let nota = [];
let tempNota = [];
let displayNotesSize = 14;

window.addEventListener("load" , registerEvents);

function registerEvents() {
    //click with mouse
    keys.forEach(function(key) {
        key.addEventListener("click" , playNote);
        key.addEventListener("transitionend" , removePlayingClass);
    });

    //keyboard type
    window.addEventListener("keydown" , playNote);
};

function playNote(event){
    let audioKeyCode = getKeyCode(event);

    //typed or pressed key
    const key = document.querySelector(`[data-key="${audioKeyCode}"]`);

    //if key exists
    const cantFoundAnyKey = !key;

    if (cantFoundAnyKey) {
        return;
    };

    addPlayingClass(key);
    playAudio(audioKeyCode);
};

function getKeyCode (event) {
    let keyCode;

    const isKeyboard = event.type === "keydown";

    if (isKeyboard){
        keyCode = event.keyCode;
    } else {
        keyCode = event.target.dataset.key;
    };

    countEvent++;
    return keyCode;
};

function addPlayingClass(key) {
    key.classList.add("playing");
};

function removePlayingClass(event) {
    event.target.classList.remove("playing");
};

function playAudio(audioKeyCode) {
    const audio = document.querySelector(`audio[data-key="${audioKeyCode}"]`);
    audio.currentTime = 0;
    audio.play();

    montaStringNotas(audioKeyCode);
};

function montaStringNotas(audioKeyCode) {

    nota.push(document.querySelector(`[data-key="${audioKeyCode}"]`).dataset.note);
    //cortar a mensagem quando chegar a 15 caractres, retirando 1 do início a cada iteração
    if (nota.length >= displayNotesSize) {
        tempNota = nota.splice(-(displayNotesSize-1));
        tempNota.unshift("...");
        nota = tempNota;
    };
    mostraDialogo(nota, "success" , 2500);
};

function mostraDialogo(mensagem, tipo, tempo){

    // se houver outro alert desse sendo exibido, cancela essa requisição

    // se não setar o tempo, o padrão é 3 segundos
    if(!tempo){
        var tempo = 300;
    }

    // se não setar o tipo, o padrão é alert-info
    if(!tipo){
        var tipo = "info";
    }

    // monta o css da mensagem para que fique flutuando na frente de todos elementos da página
    var cssMessage = "display: block; position: absolute; top: 5%; left: 50%; right: 20%; width: fit-content; padding-top: 10px; z-index: 9999; transform: translateX(-50%)";
    var cssInner = "margin: 0 auto; box-shadow: 1px 1px 5px #fd951f; color: white;";

    if($("#message").is(":visible")){
        $('#message').fadeOut(100, function(){
            $(this).remove();
        });
    }

    // monta o html da mensagem com Bootstrap
    var dialogo = "";
    dialogo += '<div id="message" style="'+cssMessage+'">';
    dialogo += '    <div class="alert alert-'+tipo+' alert-dismissable" style="'+cssInner+'">';
    dialogo +=  '        <p>';
    dialogo +=          mensagem;
    dialogo +=  '        </p>';
    dialogo += '    </div>';
    dialogo += '</div>';

    // adiciona ao body a mensagem com o efeito de fade
    $("body").append(dialogo);
    $("#message").hide();
    $("#message").fadeIn(200);

    // contador de tempo para a mensagem sumir
    setTimeout(function() {
        $('#message').fadeOut(100, function(){
            $(this).remove();
        });
    }, tempo); // milliseconds

}