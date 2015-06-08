/*global $, selectedWicon*/
/*jslint -W020, browser:true*/


window.addEventListener("popstate", function() {
    "use strict";
    if (location.hash === "") {
        $("#" + selectedWicon).removeClass("active");
        $("#" + selectedWicon + " .wicon").fadeIn(1000);
        $("#" + selectedWicon + " .window").fadeOut(400);
    } else {
        selectedWicon = $("div[td-nombre=" + location.hash + "]").get().getAttribute("id");

        $("div[td-nombre=" + location.hash + "]").addClass("active");
        $("#" + selectedWicon + " .wicon").fadeOut(1000);
        $("#" + selectedWicon + " .window").fadeIn(1000);
    }
});
