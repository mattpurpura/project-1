$(document).ready(function(){

function createUser(){
    var email = $("#newUserEmail").val();
    var password = $("#newUserPassword").val();
    console.log(email);

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    checkUser() //runs checkUser to set signedIn value
}//end createUser

function checkUser(){
    var user = firebase.auth().currentUser;

    if (user){
        console.log(user.email);
        signedIn = true;
        $("#login").html("Sign Out");
    }
    else{
        console.log('not signed in')
        signedIn = false;
        $("#login").html("Login");
    }
} //end checkUser

//flag for login button
var signedIn = false; 

function loginUser(){
    var loginEmail = $("#existingEmail").val();
    var loginPassword = $("#existingPassword").val();
    
    if(loginEmail === "" || loginPassword === ""){
        alert("Invalid email and/or password");
    }
    
    else{ 
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword).catch(function(error){
        var errorCode = error.code
        var errorMessage = error.message; 
        });

        
    }

    checkUser();
}//end loginUser

function signOut(){
     firebase.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
    checkUser();    
} //end signOut


$("#login").on("click", function(event){
    event.preventDefault();
    if(signedIn===false){
        loginUser();
    }
    else if (signedIn === true){
        signOut();
    }
}); //ends login onclick

    $("#createUser").on("click", function(event){
        event.preventDefault();
        createUser();
        // checkUser();
    });// ends createUser onclick
}); // ends document ready function


