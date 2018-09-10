$(document).ready(function(){

/// ------- DOM elements ---------------------------------------
var input = $("#inputExchange");


// ------------------------------------------------------------------------------------

var crypto = "BTC";
var fiat = "USD";
var exchange;

var exchangeArray = ['Coinbase', 'Bitfinex', 'Kraken', 'Gemini', 'Bittrex'];
var customExchArray = [];

var price;
var change24;
var high24;
var low24;
var open24;

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
    }
})
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

$("#calculate").on("click", function(){
    crypto = $("#cryptoSelect").val();
    fiat = $("#fiatSelect").val();
    callAPI(customExchArray);
});

function selectExchange(){
    var exchangeClicked = $(this);
        if(customExchArray.indexOf(exchangeClicked.val()) === -1){
            exchangeClicked.addClass("selected-exchange");
            customExchArray.push(exchangeClicked.val());
        }

        else{
            customExchArray.splice($.inArray(exchangeClicked.val(),customExchArray) ,1);
            exchangeClicked.removeClass("selected-exchange");
        }
        console.log(customExchArray); 
}// end selectExchanges

$(document.body).on("click", ".exchange-button", selectExchange);

function callAPI(array){
    for (let i=0; i<array.length; i++){
        $("#data-goes-here").empty();
        exchange = array[i];
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
// $.ajax({
// url: queryURL,
// method: "GET"
// }).then(function(response){ 
    
//     var data = response.RAW;
//     console.log(response);
//     console.log("Price: "+data.PRICE);
//     console.log("Change 24 hour: "+data.CHANGE24HOUR);
//     console.log("High 24 Hour: "+data.HIGH24HOUR);
//     console.log("Low 24 Hour: "+data.LOW24HOUR);
//     console.log("Open 24 hour: "+data.OPEN24HOUR);
    
// })




}); // ends the document ready function