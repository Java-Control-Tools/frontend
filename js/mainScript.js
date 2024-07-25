let ipGlobal; //Похуй + похуй потом исправлю 
let portGlobal;
let statusGlobal;
const API_URL = "http://localhost:8080/";

function errorStatus(status){
	if(status === "ERROR_ENTITY_ALREADY_EXISTS"){
		alert("Error! Entity already exists!");
	}
	else if(status === "ERROR"){
		alert("Error! Bad request!");
	}
}
$(function(){ 
	$(".inputPass").val("");
	$("form").submit(function (e){ // Привязка к форме, делаем отправку через аякс без обновления
		let sendData = $(this).serialize();

        $.ajax({ //Добавление пользователя
        	url: API_URL + "api/jc/addUserPC",
        	method: "post",
        	dataType: "json",
            data: sendData,
            success: function (data) {
                if(data.status === "OK"){
					showUsers();
					$("input").val("");
                }
            },
			error: function (data){
				errorStatus(data.responseJSON.status);
				$("input").val("");
			}
		});
		e.preventDefault();
 	});
	login();

});
function jcShow() {
	$(".headerP").text("Java control");
	$("#jcShow").show();
	$("#settingsShow").hide();
	$("#controlShow").hide();
	$("#logShow").hide();
	showUsers();
}
function settingsShow(){
	$(".headerP").text("Settings");
	$("#jcShow").hide();
	$("#controlShow").hide();
	$("#settingsShow").show();
	$("#logShow").hide();

}
function controlShow(ipAddress, port, status){ //Заход на пользователя
	ipGlobal = ipAddress;
	portGlobal = port;
	statusGlobal = status;
	$(".headerP").text(ipAddress + ":" + port + " - " + status);
	$("#jcShow").hide();
	$("#controlShow").show();
	$("#settingsShow").hide();
	$("#logShow").hide();
}
function rebootServer(){
	let result = confirm("You are sure?");
	if (result) {
		$.ajax({
			url: API_URL + "api/server/reboot",
			method: "post"
		});
	}
}
function changePassword(){
	let oldPassword = prompt("Enter password");

	if (oldPassword !== "" && oldPassword != null){

		let newPasswordSend = prompt("Enter a new password");

		if(newPasswordSend !== "" && newPasswordSend != null){

			let confirmNewPassword = prompt("Confirm your new password");

			if(newPasswordSend === confirmNewPassword){

				$.ajax({
					url: API_URL + "api/login/changePassword",
					method: "post",
					dataType: "json",
					data: {newPassword: newPasswordSend, password: oldPassword},
					success: function(data){
						if(data.status === "OK"){
							alert("Success!");
							jcShow();
						}
					},
					error: function (data) {
						errorStatus(data.responseJSON.status);
					}
				});

			}
		}
	}
}
function login(){
	let passwordSend = $(".inputPass").val();
	$.ajax({
		url:API_URL + "api/login/check",
		method:"post",
		dataType: "json",
		data: {password : passwordSend},
		success: function (data) {
					if(data.status === "OK"){
						$("#loginForm").hide();
						$("#mainForm").show();
					}
                }
	});
}
function logout(){
	let choose = confirm("You are sure?");
	if(choose){
		$(".inputPass").val("");
		$.ajax({
			url: API_URL + "api/login/logout",
			method: "post",
			success: function (){
				$("#loginForm").show();
				$("#mainForm").hide();
			}
		});
	}
}
function showUsers(){
	$.ajax({
		url: API_URL + "api/jc/showUsersPC",
		method: "get",
		dataType: "json",
		success: function(data){
			$("#tableBody").empty();
			data.forEach((user) => {
				$("#tableUsers").append("<tr><td>" + user.ipAddress
					+ "</td><td>" + user.port
					+ "</td><td>" + user.status
					+ "</td><td><button class='buttonTable' onclick='controlShow(\""+ user.ipAddress + "\",\"" + user.port +"\",\""+ user.status + "\")'>Control</button></td></tr>");
			});
		}
	});
}
function sendCommandToUserPC(comm) {
	if(statusGlobal === "active"){
		let choose = confirm("You are sure?");
		if(choose){
			$.ajax({
				url: API_URL + "api/jc/controlUserPC",
				method: "post",
				dataType: "json",
				data: { ipAddress : ipGlobal, port: portGlobal, command: comm},
				success: function(data) {
					if(data.status === "OK"){
						alert("Success!");
						jcShow();
					}
				},
				error: function (data){
					errorStatus(data.responseJSON.status);
				}
			});
		}
	}
	else{
		alert("PC inactive!");
	}
}
function deleteUser(){
	$.ajax({
		url: API_URL + "api/jc/deleteUserPC",
		method: "post",
		dataType: "json",
		data: {ipAddress : ipGlobal, port: portGlobal},
		success: function(data) {
			if(data.status === "OK"){
				alert("Success!");
				jcShow();
			}
		},
		error: function (data){
			errorStatus(data.responseJSON.status);
		}
	});
}
function showLogs(){
	$("#logShow").empty();
	$(".headerP").text("Logs");
	$("#jcShow").hide();
	$("#controlShow").hide();
	$("#settingsShow").hide();
	$("#logShow").show();
	$.ajax({
		url: API_URL + "api/server/showLogs",
		method: "get",
		success: function (data){
			data.forEach(log => {
				$("#logShow").append("<p>" + log + "</p>");
			})
		}
	});
}