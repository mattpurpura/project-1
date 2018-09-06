$(document).ready(function(){

var crypto = "BTC";
var fiat = "USD";
var exchange = "Kraken";
var queryURL = "https://min-api.cryptocompare.com/data/generateAvg?fsym="+crypto+"&tsym="+fiat+"&e="+exchange;

var timestamp = $.now();

console.log(timestamp);

$.ajax({
url: queryURL,
method: "GET"
}).then(function(response){
console.log(response);
})




}); // ends the document ready function