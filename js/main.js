/*global $, document, Firebase, console, alert*/
/*jslint plusplus:true, browser: true*/

var selectedWicon = "D1",
    $wicon,
    selectedCourse;
//var myDataRef = new Firebase('https://gbar6zs00xr.firebaseio-demo.com/');

function cursos() {
    "use strict";
    $(".wiconContainer > #diplomados > #D1").css("transition-delay", "0.0s");
    $(".wiconContainer > #diplomados > #D2").css("transition-delay", ".2s");
    $(".wiconContainer > #diplomados > #D3").css("transition-delay", ".4s");
    $(".wiconContainer > #diplomados > #D4").css("transition-delay", ".6s");
    $(".wiconContainer > #diplomados > #D5").css("transition-delay", ".8s");
    $(".wiconContainer > #diplomados > #D6").css("transition-delay", "1.0s");
    $(".wiconContainer > #diplomados > #D1").css("-webkit-transition-delay", "0.0s");
    $(".wiconContainer > #diplomados > #D2").css("-webkit-transition-delay", ".2s");
    $(".wiconContainer > #diplomados > #D3").css("-webkit-transition-delay", ".4s");
    $(".wiconContainer > #diplomados > #D4").css("-webkit-transition-delay", ".6s");
    $(".wiconContainer > #diplomados > #D5").css("-webkit-transition-delay", ".8s");
    $(".wiconContainer > #diplomados > #D6").css("-webkit-transition-delay", "1.0s");
    $(".wiconContainer > #diplomados > div").css("transform", "rotateX(180deg)").css("opacity", "0");
    setTimeout(function () {
        $("#diplomados").hide();
        $("#cursos").fadeIn(700);
        $(".wiconContainer > #cursos > div").css("transform", "rotateX(0deg)").css("opacity", "1");
    }, 1500);
}

function diplomados() {
    "use strict";
    var i;

    for (i = 1; i < 17; i++) {
        $(".wiconContainer > #cursos > #C" + i).css("transition-delay", (i % 4 * 0.2) + "s");
        $(".wiconContainer > #cursos > #C" + i).css("-webkit-transition-delay", (i % 4 * 0.2) + "s");
    }
    $(".wiconContainer > #cursos > div").css("transform", "rotateX(180deg)").css("opacity", "0");

    setTimeout(function () {
        $("#cursos").hide();
        $("#diplomados").fadeIn(700);
        //$("#diplomados").show();
        $(".wiconContainer > #diplomados > div").css("transform", "rotateX(0deg)").css("opacity", "1");
    }, 1500);
}

function cargarCalendario(selector) {
    "use strict";
    var calendarios = document.querySelectorAll(selector),
        calendario,
        dias = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"],
        diasA = ["D", "L", "M", "M", "J", "V", "S"],
        meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"],
        diasDeCadaMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

        mes,
        inicioMes,
        diasDelMes,
        titulo,
        clases1,
        clases2,
        feriados,
        inicios,
        celda,
        div,
        i,
        j;

    for (j = 0; j < calendarios.length; j++) {
        calendario = calendarios[j];
        mes = calendario.getAttribute("mes").toUpperCase();

        inicioMes = dias.indexOf(calendario.getAttribute("iniciomes").toUpperCase());
        diasDelMes = diasDeCadaMes[meses.indexOf(mes)];
        titulo = calendario.getAttribute("titulo");

        clases1 = calendario.getAttribute("clases1").split(" ");
        clases2 = calendario.getAttribute("clases2").split(" ");
        feriados = calendario.getAttribute("feriados").split(" ");
        inicios = calendario.getAttribute("inicios").split(" ");


        div = document.createElement("div");
        div.className = "calendarHeader";
        div.innerHTML = titulo;
        calendario.appendChild(div);

        for (i = 0; i < 7; i++) {
            div = document.createElement("div");
            div.className = "diaS";
            div.innerHTML = diasA[i];
            calendario.appendChild(div);
        }
        for (i = 0; i < 42; i++) {
            div = document.createElement("div");
            div.className = "celda";
            calendario.appendChild(div);
        }

        for (i = 0; i < 42; i++) {
            celda = calendario.querySelectorAll(".celda")[i];

            if (i >= inicioMes && diasDelMes > i - inicioMes) {
                celda.innerHTML = "<p>" + (i - inicioMes + 1) + "</p>";
                $(celda).addClass("dia");
                if (inicios.indexOf((i - inicioMes + 1).toString()) !== -1) {
                    $(celda).addClass("inicio");
                } else if (clases1.indexOf((i - inicioMes + 1).toString()) !== -1) {
                    $(celda).addClass("clases1");
                } else if (clases2.indexOf((i - inicioMes + 1).toString()) !== -1) {
                    $(celda).addClass("clases2");
                } else if (feriados.indexOf((i - inicioMes + 1).toString()) !== -1) {
                    $(celda).addClass("feriado");
                } else if (i % 7 === 0) {
                    $(celda).addClass("domingo");
                }
            }
        }
    }
}

function mostrar() {
    "use strict";
    $wicon.addClass("active");
    $wicon.children(".window").fadeOut(0);
    //$wicon.children(".window").show(0);
    $wicon.children(".wicon").delay(600).fadeOut(300);
    $wicon.children(".window").delay(600).fadeIn(300);

    selectedCourse = $wicon.get()[0].getAttribute("td-nombre");
    history.pushState(null, null, "index.html#" + selectedCourse);
}

$(document).ready(function () {
    "use strict";

    $('[data-toggle="tooltip"]').tooltip();
    // TODO Hacer calendario
    //$('#DWeb .calendar').html(calendario(3, "Abril 2015", "abril2015_DWeb"));

    $(".wicon").click(function () {
        selectedWicon = $(this).parent().get()[0].getAttribute("id");
        
        if (selectedWicon === "D6") {
            cursos();
            return;
        } else if (selectedWicon === "C17") {
            diplomados();
            return;
        }
        
        if ($("#" + selectedWicon + ">.window").html().indexOf("<") === -1) {
            $("#" + selectedWicon + ">.window").load("cursos/" + selectedWicon + ".html", function (response, status, xhr) {
                if (status === "error") {
                    alert("Esta sección todavía no está disponible.\n\nLanzamiento oficial de la página:\n 11° de Mayo 2015\n ¡Está pendiente de las actualizaciones!");
                } else {
                    cargarCalendario("#" + selectedWicon + " .calendar");
                    $wicon = $("#" + selectedWicon);
                    mostrar();
                }

                $("#" + selectedWicon + " .botonHome").click(function () {
                    history.pushState(null, null, "index.html");
                    $("#" + selectedWicon).removeClass("active");
                    $("#" + selectedWicon + " .wicon").fadeIn(1000);
                    $("#" + selectedWicon + " .window").fadeOut(400);
                });
                $("#" + selectedWicon + " .botonBack").click(function () {
                    $("#" + selectedWicon + " .pago").fadeOut(1000, function () {
                        $("#" + selectedWicon + " .pago").hide();
                    });
                });
            });
        } else {
            $wicon = $("#" + selectedWicon);
            mostrar();
        }

    });
});

function cupo() {
    "use strict";
    alert("Al parecer si hay cupo disponible. Llamanos para confirmarnos tu asistencia (55)4444-3075");
}

function pagar() {
    "use strict";
    $("#" + selectedWicon + " .pago").fadeIn(1000);
}

/**
 * Muestra al siguiente hermano del elemento seleccionado
 * @param {Object} event Elemento seleccionado.
 */
function colapse(event) {
    "use strict";
    var button = event.target,
        arr = Array.prototype.slice.call(event.target.parentElement.children, 0),
        element = arr[arr.indexOf(event.target) + 1];

    $(element).fadeIn(1000);
    $(button).hide(0);
}
