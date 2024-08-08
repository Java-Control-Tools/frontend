function jcShow() {
    $(".headerP").text("Java control");
    $("#jcShow").show();
    $("#settingsShow").hide();
    $("#controlShow").hide();
    $("#logShow").hide();
    $("#updateScreen").hide();
    showUsers();
}
function settingsShow(){
    $(".headerP").text("Settings");
    $("#jcShow").hide();
    $("#controlShow").hide();
    $("#settingsShow").show();
    $("#updateScreen").hide();
    $("#logShow").hide();
}
function controlShow(ipAddress, port, status){ //Заход на пользователя
    ipGlobal = ipAddress;
    portGlobal = port;
    statusGlobal = status;
    $(".headerP").text(ipAddress + ":" + port + " - " + status);
    $("#jcShow").hide();
    $("#controlShow").show();
    $("#control").show();
    $("#screenShow").hide();
    $("#settingsShow").hide();
    $("#logShow").hide();
    $("#updateScreen").hide();
}