/// ------- DOM elements ---------------------------------------
var input = $("#inputExchange");


// ------------------------------------------------------------------------------------

var cryptoCurrency = "BTC";
var fiat = "USD";
var exchange;

var exchangeArray = ['Coinbase', 'Bitfinex', 'Kraken', 'Gemini', 'Bittrex'];
var customExchArray = [];

var price;
var change24;
var high24;
var low24;
var open24;

console.log(firebase.auth().currentUser);
getCustomExchange();

function renderButtons () {
    $("#buttons-view").empty();
    for (var i=0; i< exchangeArray.length; i++) {
        var button = $("<button>").attr("value", exchangeArray[i]).addClass("exchange-button");
        var p = $("<p>");
        button.text(exchangeArray[i]);
        $("#buttons-view").append(button);
    }
}
renderButtons();

function newButton() {
    var inputVal = input.val().trim();
    exchangeArray.push(inputVal);
    console.log(exchangeArray);
}
$("#newExchange").on("click", function(event) {   
    event.preventDefault(); 
    if (input.val() !== "") {
    newButton();
    renderButtons();
    input.val("")
    getCustomExchange();
    }
})
$(".dropdown-fiat-item").on("click", function(){
    console.log($(this).text());
    fiat = $(this).text();
    callAPI();
})

// $(".dropdown-crypto-item").on("click", function(){
//     console.log($(this).text());
//     cryptoCurrency = $(this).text();
//     callAPI();
// })

$("#calculate").on("click", function(){
    cryptoCurrency = $("#cryptoSelect").val();
    fiat = $("#fiatSelect").val();
    callAPI(customExchArray);
});

function selectExchange(){
    var exchangeClicked = $(this);
        if(customExchArray.indexOf(exchangeClicked.val()) === -1){
            exchangeClicked.addClass("selected-exchange");
            customExchArray.push(exchangeClicked.val());
            if (signedIn === true){
                saveExchangeChoice();
            }
            
        }

        else{
            customExchArray.splice($.inArray(exchangeClicked.val(),customExchArray) ,1);
            exchangeClicked.removeClass("selected-exchange");
            if (signedIn === true){
                saveExchangeChoice();
            }
        }
        console.log(customExchArray); 
}// end selectExchanges

$(document.body).on("click", ".exchange-button", selectExchange);

function callAPI(array){
    for (let i=0; i<array.length; i++){
        $("#data-goes-here").empty();
        exchange = array[i];
        console.log(exchange);
        console.log(cryptoCurrency);
        var queryURL = "https://min-api.cryptocompare.com/data/generateAvg?fsym="+cryptoCurrency+"&tsym="+fiat+"&e="+exchange;
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var data = response.DISPLAY;
            var p1 = $("<p>");
            var p2 = $("<p>");
            var p3 = $("<p>");
            var p4 = $("<p>");
            var p5 = $("<p>");
            var quoteDiv = $("<div>").addClass("cryptoQuote col-md");
            var quoteTitle = $("<h6>").text(array[i]);

            quoteDiv.append(quoteTitle);
            price = data.PRICE;
            change24 = data.CHANGE24HOUR;
            high24 = data.HIGH24HOUR;
            low24 = data.LOW24HOUR;
            open24 = data.OPEN24HOUR;
            
            p1.text("Price" +price);
            p2.text("24 Hour Change: "+change24);
            p3.text("24 Hour High: " + high24);
            p4.text("24 Hour Low: "+low24);
            p5.text("24 Hour Open: "+open24);

            console.log(exchange);
            console.log("Price: "+data.PRICE);
            console.log("Change 24 hour: "+data.CHANGE24HOUR);
            console.log("High 24 Hour: "+data.HIGH24HOUR);
            console.log("Low 24 Hour: "+data.LOW24HOUR);
            console.log("Open 24 hour: "+data.OPEN24HOUR);
            console.log("-------------------");
            quoteDiv.append(p1, p2, p3, p4, p5);
            $("#data-goes-here").append(quoteDiv)
        });
    }
}
callAPI(exchangeArray);  

$(function () {
    $('[data-toggle="popover"]').popover({
        container: 'body'
    })
  })

  var fiatDropOpen = false;
  $("#fiatSelect").on("click", function(){
      if(fiatDropOpen===false){
          fiatDropOpen = true;
      }
      else{
          fiatDropOpen = false;
          console.log($(this).val());
          fiat = $(this).val();
          if(signedIn === true){
              uploadFiatSelection();
          }
      }
  }) // end cryptoSelect on click

var cryptoDropOpen = false;
$("#cryptoSelect").on("click", function(){
    if(cryptoDropOpen===false){
        cryptoDropOpen = true;
    }
    else{
        cryptoDropOpen = false;
        console.log($(this).val());
        cryptoCurrency = $(this).val();
        if(signedIn === true){
            uploadCryptoSelection();
        }
    }
}) // end cryptoSelect on click

// =================================================================================================================
// FireBase - Authorization
// =================================================================================================================

var user;

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
        user = firebase.auth().currentUser.uid
        console.log(firebase.auth().currentUser.uid);
        })
        .then(function() {
            createInitialUserDocs();
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

function checkUser(){
    let userCheck = firebase.auth().currentUser;
    if (userCheck){
        $("#login-button").html("Sign Out");
        user = firebase.auth().currentUser.uid;
        signedIn = true;
        getCustomExchange();
        getCryptoSelection();
        getFiatSelection();
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


// =======================================================================================================================
// FireBase - FireStore - Functions
// =======================================================================================================================

function createInitialUserDocs(){
    firebase.firestore().collection("users").doc(user).set({
        email: firebase.auth().currentUser.email
    })
    let currentUserDoc = firebase.firestore().collection("users").doc(user);
    // create user-data subcollection and doc for exchange choices
    currentUserDoc.collection("User-Data").doc("Exchange-choices").set({
        selected: []
    })
    .then(function(){
        console.log("created User Data");
    })
    .catch(function(error){
        console.error("Error writing document: ", error);
    })
    
    //create doc for crypto currency
    currentUserDoc.collection("User-Data").doc("Crypto-choice").set({
        cryptoChoice: ""
    })
    .then(function(){
        console.log("created Crypto-choice");
    })
    .catch(function(error){
        console.error("Error writing document: ", error);
    })
    
    // create doc for fiat currency
    currentUserDoc.collection("User-Data").doc("Fiat-choice").set({
        fiatChoice: ""
    })
    .then(function(){
        console.log("created Fiat-choice");
    })
    .catch(function(error){
        console.error("Error writing document: ", error);
    })
    
    //create doc for positive portfolio
    currentUserDoc.collection("User-Data").doc("Positive-portfolio").set({
        stocks: []
    })
    .then(function(){
        console.log("created Positive-portfolio");
    })
    .catch(function(error){
        console.error("Error writing document: ", error);
    })
    
    //create doc for negative portfolio
    currentUserDoc.collection("User-Data").doc("Negative-portfolio").set({
        stocks: []
    })
    .then(function(){
        console.log("created Negative-portfolio");
    })
    .catch(function(error){
        console.error("Error writing document: ", error);
    })
    } // end mkSubcollectionDoc

// updates Existing Docs
function saveExchangeChoice(){
var exchangesDocRef = firebase.firestore().collection("users").doc(user).collection("User-Data").doc("Exchange-choices");
return exchangesDocRef.update({
    selected: customExchArray
})
.then(function(){
    console.log("Doc updated!")
})
.catch(function(error){
    console.error("Error:". error);
})

} // end updateExisting Doc

function getCustomExchange(){
    if(signedIn === true){ //signed in defined on Auth.js
        console.log(user+" is active.");
        let exchangeChoicesRef = firebase.firestore().collection("users").doc(user).collection("User-Data").doc("Exchange-choices");
        exchangeChoicesRef.get().then(function(doc){
            if (doc.exists){
                var userSavedExchanges = doc.data().selected;
                customExchArray = userSavedExchanges;
                for(let i=0; i<customExchArray.length; i++){
                    let exchange = $('button[value='+customExchArray[i]+']');
                    exchange.addClass("selected-exchange");  
                    console.log(exchange);                  
                }
            }
        })
    }
    else{
        console.log("No active user");
    }
} // end getCustomExchange

function uploadCryptoSelection(){
    let cryptoDocRef = firebase.firestore().collection("users").doc(user).collection("User-Data").doc("Crypto-choice");
    return cryptoDocRef.update({
        cryptoChoice: cryptoCurrency
    })
    .then(function(){
        console.log("Crypto choice uploaded!")
    })
    .catch(function(error){
        console.error("Error:". error);
    })
}// end uploadCrypto function

function getCryptoSelection(){
    let cryptoDocRef = firebase.firestore().collection("users").doc(user).collection("User-Data").doc("Crypto-choice");
    cryptoDocRef.get().then(function(doc){
        if(doc.exists){
            let userSavedCrypto = doc.data().cryptoChoice;
            cryptoCurrency = userSavedCrypto;
            console.log(cryptoCurrency);
            $("#cryptoSelect option[value="+cryptoCurrency+"]").attr("selected", "selected");
        }
    })
}// end getCrypto function

function uploadFiatSelection(){
    var cryptoDocRef = firebase.firestore().collection("users").doc(user).collection("User-Data").doc("Fiat-choice");
    return cryptoDocRef.update({
        fiatChoice: fiat
    })
    .then(function(){
        console.log("Fiat choice uploaded!")
    })
    .catch(function(error){
        console.error("Error:". error);
    })    
}// end uploadFiat function

function getFiatSelection(){
    let fiatDocRef = firebase.firestore().collection("users").doc(user).collection("User-Data").doc("Fiat-choice");
    fiatDocRef.get().then(function(doc){
        if(doc.exists){
            let userSavedCrypto = doc.data().fiatChoice;
            fiat = userSavedCrypto;
            console.log(fiat);
            $("#fiatSelect option[value="+fiat+"]").attr("selected", "selected");
        }
    })
}// end getCrypto function




