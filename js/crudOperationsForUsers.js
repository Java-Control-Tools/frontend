function showUsers(){
    $.ajax({
        url: API_URL + "api/jc/showUsersPC",
        method: "get",
        dataType: "json",
        success: function(data){
            $("#tableBody").empty();
            data.forEach((user) => {
                if(user.status === "active"){
                    $("#tableUsers").append("<tr><td>" + user.ipAddress
                        + "</td><td>" + user.port
                        + "</td><td style='color: green'>" + user.status
                        + "</td><td><button class='buttonTable' onclick='controlShow(\""+ user.ipAddress + "\",\"" + user.port +"\",\""+ user.status + "\")'>Control</button></td></tr>");
                }
                else if(user.status === "inactive"){
                    $("#tableUsers").append("<tr><td>" + user.ipAddress
                        + "</td><td>" + user.port
                        + "</td><td style='color: red'>" + user.status
                        + "</td><td><button class='buttonTable' onclick='controlShow(\""+ user.ipAddress + "\",\"" + user.port +"\",\""+ user.status + "\")'>Control</button></td></tr>");
                }
            });
        }
    });
}
function deleteUser(){
    let choose = confirm("You are sure?");
    if(choose){
        $.ajax({
            url: API_URL + "api/jc/deleteUserPC",
            method: "post",
            dataType: "json",
            data: {ipAddress : ipGlobal, port: portGlobal},
            success: function(data) {
                if(data.status === "OK"){
                    alert("Successful!");
                    jcShow();
                }
            },
            error: function (data){
                errorStatus(data.responseJSON.status);
            }
        });
    }
}
function updateUser(){ // Модалка с обновлением полей
    $("#updateDiv").bPopup();
    $("#ipUp").val(ipGlobal);
    $("#portUp").val(portGlobal);
}
$(function () {
    $(".inputPass").val("");
    $("#updateForm").submit(function (e) { // Привязка к форме МОДАЛКИ, делаем отправку через аякс без обновления
        $.ajax({ //Добавление пользователя
            url: API_URL + "api/jc/updateUserPC",
            method: "post",
            dataType: "json",
            data: {oldIp: ipGlobal, oldPort: portGlobal, newIp: $("#ipUp").val(), newPort: $("#portUp").val()},
            success: function (data) {
                if (data.status === "OK") {
                    alert("Successful!");
                    $("#updateDiv").bPopup().close();
                    showUsers();
                    controlShow($("#ipUp").val(), $("#portUp").val(), statusGlobal);
                }
            },
            error: function (data) {
                errorStatus(data.responseJSON.status);
            }
        });
        e.preventDefault();
    });
    $("#scanForm").submit(function (e) { // Привязка к форме, делаем отправку через аякс без обновления
        let sendData = $(this).serialize();
        $.ajax({ //Добавление пользователя
            url: API_URL + "api/jc/addUserPC",
            method: "post",
            dataType: "json",
            data: sendData,
            success: function (data) {
                if (data.status === "OK") {
                    showUsers();
                    $("input").val("");
                }
            },
            error: function (data) {
                errorStatus(data.responseJSON.status);
                $("input").val("");
            }
        });
        e.preventDefault();
    });
    login();
});