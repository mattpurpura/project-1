$(document).ready(function(){

var crypto = "btc";
var currency = "usd";
var queryURL = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR";

var timestamp = $.now();

console.log(timestamp);

$.ajax({
URL: queryURL,
method: "GET"
}).then(function(response){
console.log(response);
})




}); // ends the document ready function