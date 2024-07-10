function jcShow() {
	$(".headerP").text("Java control");
	$("#jcShow").show();
	$("#settingsShow").hide();
	$("#controlShow").hide();
}
function settingsShow(){
	$(".headerP").text("Settings");
	$("#jcShow").hide();
	$("#controlShow").hide();
	$("#settingsShow").show();

}
function controlShow(){
	$(".headerP").text();
	$("#jcShow").hide();
	$("#controlShow").show();
	$("#settingsShow").hide();
}
function rebootServer(){
	let result = confirm("You are sure?");
	if (result) {

	}
}
function changePassword(){
	let newPassword = prompt("Enter a new password");
	if(newPassword != "" && newPassword != null){
		let confirmNewPassword = prompt("Confirm your new password");
		if(newPassword === confirmNewPassword){
			alert("Password changed");
		}
	}
}
function login(){
	let password = $(".inputPass").val();
	$.ajax({
		url:"http://localhost:8080/api/login/login?password=" + password,
		method:"post",
		dataType: "json"
	});
}