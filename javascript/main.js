$(document).ready(function(){

var crypto = "BTC";
var fiat = "USD";
var exchange;

var exchangeArray = ['Coinbase', 'Bitfinex', 'Kraken', 'Gemini', 'Bittrex'];

var timestamp = $.now();

console.log(timestamp);
for (let i=0; i<exchangeArray.length; i++){
    exchange = exchangeArray[i];
    var queryURL = "https://min-api.cryptocompare.com/data/generateAvg?fsym="+crypto+"&tsym="+fiat+"&e="+exchange;
    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response){
            var data = response.RAW;
            // console.log(response);
            console.log("Price: "+data.PRICE);
            console.log("Change 24 hour: "+data.CHANGE24HOUR);
            console.log("High 24 Hour: "+data.HIGH24HOUR);
            console.log("Low 24 Hour: "+data.LOW24HOUR);
            console.log("Open 24 hour: "+data.OPEN24HOUR);
            
        });
}
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