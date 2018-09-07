$(document).ready(function(){

var crypto = "BTC";
var fiat = "USD";
var exchange;

var exchangeArray = ['Coinbase', 'Bitfinex', 'Kraken', 'Gemini', 'Bittrex'];

var price;
var change24;
var high24;
var low24;
var open24;

function callAPI(){
    for (let i=0; i<exchangeArray.length; i++){
        $("#data-goes-here").empty();
        exchange = exchangeArray[i];
        var queryURL = "https://min-api.cryptocompare.com/data/generateAvg?fsym="+crypto+"&tsym="+fiat+"&e="+exchange;
        
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
            var quoteTitle = $("<h6>").text(exchangeArray[i]);

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

callAPI();

$(".dropdown-fiat-item").on("click", function(){
    console.log($(this).text());
    fiat = $(this).text();
    callAPI();
})

$(".dropdown-crypto-item").on("click", function(){
    console.log($(this).text());
    crypto = $(this).text();
    callAPI();
})

function createUser(){
    var email = $("#newUserEmail").val();
    var password = $("#newUserPassword").val();

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}

$("#createUser").on("click", function(){
    document.preventDefault();
    createUser();
});
}); // ends the document ready function