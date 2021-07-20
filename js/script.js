// quick validation form
function formValidation() {
    var userName = document.getElementById("ducoUsername");

    if (userName && userName.value) {
        //getDucos()
        alert("form valid")

    } else {
        alert("Please fill your username wallet");

    }

}




function getDucos() {
    document.getElementById("getDucosButton").disabled = true;
    var ducoUsername = document.getElementById("ducoUsername").value;
    document.getElementById("spinner").innerHTML = '<div class="loader"></div>';
    var responseCode;



    fetch('https://faucet.furim.xyz/giveMeDucos?ducoUsername=' + ducoUsername, {
            method: 'POST'
        })
        .then(function(response) {
            if ((response.status == 500) || (response.status == 502)) {
                alert("There was a server error, please try again");
            } else if (response.status == 409) {
                responseCode = response.status
                    // alert("You already claimed DUCO's in this hour!");
            } else if (response.status == 200) {
                responseCode = response.status
                console.log('😎');
                return response.json()

            }

        }).then(function(object) {

            if (responseCode == 200) {
                document.getElementById("spinner").innerHTML = '<p>' + object.ducoSended + 'ᕲ was sended to ' + ducoUsername + '. Enjoy it!</p>';
                console.log(object.duinoResponse);
            } else if (responseCode == 409) {
                document.getElementById("spinner").innerHTML =
                    "<p>Looks like you've already taken DUCO, try again in hour.<br>During this time, you can look at this frog</p>";
            }
            document.getElementById("getDucosButton").disabled = false;


        })

}