var user;

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
        checkUser() //runs checkUser to set signedIn value
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
            email: firebase.auth().currentUser.email,
        })
        .then(function() {
            mkUserDataExchangeChoices();
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    })
   
}//end createUser

function checkUser(){
    let userCheck = firebase.auth().currentUser;
    if (userCheck){
        $("#login-button").html("Sign Out");
        user = firebase.auth().currentUser.uid;
        signedIn = true;
    }
    else{
        user = "";
        console.log('not signed in')
        signedIn = false;
        $("#login-button").html("Login");
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
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
        .then(function(){
            checkUser();
            console.log(signedIn);
            console.log(firebase.auth().currentUser);
        })

        .catch(function(error){
        var errorCode = error.code
        var errorMessage = error.message; 
        console.log('User logged in');
        console.log(firebase.auth().currentUser.email);
        });

        
    }

}//end loginUser

function signOut(){
     firebase.auth().signOut().then(function() {
            console.log("User signed out")
            checkUser();
            console.log(signedIn);
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });  
} //end signOut

console.log(signedIn);
$("#login-button").on("click", function(event){
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


function mkUserDataExchangeChoices(){
    currentUserDoc = firebase.firestore().collection("users").doc(user);
currentUserDoc.collection("User-Data").doc("Exchange-choices").set({
    selected: []
})
.then(function(){
    console.log("created User Data");
})
.catch(function(error){
    console.error("Error writing document: ", error);
})
} // end mkSubcollectionDoc



