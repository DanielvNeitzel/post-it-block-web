// window.onload=clock;

var dayName = new Array ("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado")

var monName = new Array ("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro")

var now = new Date

function clock() {
    var digital = new Date();
    var hours = digital.getHours();
    var minutes = digital.getMinutes();
    var seconds = digital.getSeconds();
    var amOrPm = "AM";
    if (hours > 11) amOrPm = "PM";
    if (hours > 12) hours = hours - 12;
    if (hours == 0) hours = 12;
    if (minutes <= 9) minutes = "0" + minutes;
    if (seconds <= 9) seconds = "0" + seconds;
    dispTime = hours + ":" + minutes ;
    document.getElementById('time').innerHTML = dispTime;
    setTimeout("clock()", 1000);
}

function charms(){
    document.getElementById('charmsbar').style.display='block';
    document.getElementById('datetime').style.display='block';
}

function destroycharms() {
    document.getElementById('charmsbar').style.display='none';
    document.getElementById('datetime').style.display='none';
}

function start(){
    document.getElementById('startbutton').style.display='block';
}

function destroystart() {
    document.getElementById('startbutton').style.display='none';
}