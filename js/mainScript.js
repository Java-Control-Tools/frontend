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
	let ipAdress = $.ajax({
		url: "http://localhost:8080/api/test",
		metod: "get",
		dataType: "json",
	});
	$(".headerP").text(ipAdress[1]);
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