var state = {}
var sum_yesterday=0.000;
   
// array shpuld be filled from user and saved 

var currentPortfolioPositiveArray =["AAPL","MSFT","S"];
var currentPortfolioNegativeArray =["GOOG","AZO","S"];
var currentPortfolioPositiveArray;

// filter variables  set by ui please

var FilterMaxPriceDelta=1.0;   // %change up 
var FilterMinPriceDelta=1.0;   // %change down
var toTradeOkFilterMaxPrice = false;   // should trading be done if up % is reached or not
var toTradeOkFilterMaxPriceNeg = false;   // should trading be done if down % is reached or not
var toTradeOK = false
console.log(toTradeOK);

var sum_today=0;
// just the variable to make a sring out of the array

var concatenatedString = "";


// take the array and add one buy one ticker to the string with in a loop
currentPortfolioPositiveArray.forEach(ticker => {
       concatenatedString = concatenatedString.concat(ticker + ",");
   });
// now we call the api  with all stocks at once 

console.log(concatenatedString);

$.ajax({
url: `https://www.worldtradingdata.com/api/v1/stock?symbol=${concatenatedString}.L&api_token=b8KYXdWqizhKvy2yiYx5i3aBXzHtZoG17e45htFITHh9wxz7GUl0ZRjPA8YF`,
method: "GET"
}).then(function(response) {
        console.log(response);

for (var i =0 ; i < currentPortfolioPositiveArray.length; i++ ){ 

sum_yesterday = sum_yesterday + parseFloat((response.data[i].close_yesterday));
sum_today = sum_today +parseFloat((response.data[i].price));

console.log (response.data[i].close_yesterday)
console.log("sum_yesterday"+sum_yesterday)
console.log((response.data[i].price))
console.log (sum_today);
if (sum_today > (FilterMaxPriceDelta * sum_yesterday) && toTradeOkFilterMaxPrice === true) {
    toTradeOK = true
} else {
    toTradeOk = false
}

}        
         
});

// negative portofoloio

var concatenatedString = "";
var sum_yesterdayNegative =0;
var sum_todayNegative =0;
// take the array and add one buy one ticker to the string with in a loop
currentPortfolioNegativeArray.forEach(ticker => {
       concatenatedString = concatenatedString.concat(ticker + ",");

});

$.ajax({
url: `https://www.worldtradingdata.com/api/v1/stock?symbol=${concatenatedString}.L&api_token=b8KYXdWqizhKvy2yiYx5i3aBXzHtZoG17e45htFITHh9wxz7GUl0ZRjPA8YF`,
method: "GET"
}).then(function(response) {
        console.log(response);

for (var i =0 ; i < currentPortfolioNegativeArray.length; i++ ){ 

sum_yesterdayNegative = sum_yesterdayNegative + parseFloat((response.data[i].close_yesterday));
sum_todayNegative = sum_todayNegative +parseFloat((response.data[i].price));

console.log (response.data[i].close_yesterday)
console.log("sum_yesterday"+sum_yesterdayNegative)
console.log((response.data[i].price))
console.log (sum_todayNegative);


if (sum_todayNegative < (FilterMaxPriceDelta * sum_yesterdayNegative) && toTradeOkFilterMaxPriceNeg === true) {
    toTradeOK = true
} else {
    toTradeOk = false
}

console.log(toTradeOK);
}        
         
});
