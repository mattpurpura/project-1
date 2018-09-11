$(document).ready(function(){

// const firestore = firebase.firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true};
// firestore.settings(settings);

var testArray = ["Coinbase", "Bittrex", "Kraken"];
var secondArray;

function createUser(){
    var email = $("#newUserEmail").val();
    var password = $("#newUserPassword").val();
    console.log(email);

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    }).then(function(){
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
            email: firebase.auth().currentUser.email,
            test: testArray
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    })
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

var docRef = firebase.firestore().collection("users").doc("KzKc6UYTZTYACK5dqOTXs4xSrNP2");
docRef.get().then(function(doc){
    if (doc.exists){
        secondArray = doc.data().test;
        console.log(secondArray);
        console.log(testArray);
    }
})

}); // ends document ready function


