function pwdChange() {
    const request = new XMLHttpRequest()
    let passwordCheck = prompt("Enter new password");
    if (passwordCheck == null || passwordCheck === "") {

    }
    else {
        //Запрос к Settings с аргументами из prompt
        request.open("POST", "/Settings", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send("password=" + passwordCheck);
        alert("Password changed successfully");
    }

}