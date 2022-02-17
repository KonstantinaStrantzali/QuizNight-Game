
//Activate sound
$("#audio").click(function() {
    toggleAudio();
});

// Toggle the Audio on and off
function toggleAudio() {
    let myAudio = document.getElementById("myAudio");
    const icon = $('.iconChanged');
    if(icon.hasClass("fa-volume-up")){
        myAudio.pause();
        icon.removeClass('fa-volume-up').addClass('fa-volume-mute');
    } else{
        myAudio.play();
        icon.addClass('fa-volume-up').removeClass('fa-volume-mute');
    }
}