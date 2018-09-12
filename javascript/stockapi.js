$(document).ready(function(){

var state = {}
var sum_yesterday=0.000;
   
// array shpuld be filled from user and saved 

var currentPortfolioPositiveArray =[];
var currentPortfolioNegativeArray =[];
var currentPortfolioPositiveArray;

// filter variables  set by ui please

var FilterMaxPriceDelta=1.0;   // %change up 
var FilterMinPriceDelta=1.0;   // %change down
var toTradeOkFilterMaxPrice = true;   // should trading be done if up % is reached or not
var toTradeOkFilterMaxPriceNeg = true;   // should trading be done if down % is reached or not
var toTradeOK = false
console.log(toTradeOK);

var sum_today=0;
// just the variable to make a sring out of the array

var positivePortfolioString = "";


// take the array and add one buy one ticker to the string with in a loop

// now we call the api  with all stocks at once 


console.log(currentPortfolioPositiveArray);

//user input to create positive portfolio

function addPositiveStock(){
    var newPositiveStock = $("#input-positive-stock").val();

    if(currentPortfolioPositiveArray.indexOf(newPositiveStock) === -1){
     currentPortfolioPositiveArray.push(newPositiveStock);
    }

    currentPortfolioPositiveArray.forEach(ticker => {
    positivePortfolioString = positivePortfolioString.concat(ticker + ",");
    });

    console.log(currentPortfolioPositiveArray);
    console.log(positivePortfolioString);
    $("#stockportfolio").text(currentPortfolioPositiveArray)
    
}

$("#add-positive-button").on("click", function(){
    positivePortfolioString = "";
   addPositiveStock();
   $("#input-positive-stock").val("");
});

$("#positive-api-call").on("click", function(){
    callAPIpositive();
});

function callAPIpositive(){
    $.ajax({
    url: `https://www.worldtradingdata.com/api/v1/stock?symbol=${positivePortfolioString}.L&api_token=b8KYXdWqizhKvy2yiYx5i3aBXzHtZoG17e45htFITHh9wxz7GUl0ZRjPA8YF`,
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
    if (toTradeOK === true) {$("#tradeokalert").text("you can trade");
} else {
    $("#tradeokalert").text("Don't trade");  
}
    }        
            
    });
}


// negative portofoloio

var negativePortfolioString = "";
var sum_yesterdayNegative =0;
var sum_todayNegative =0;
// take the array and add one buy one ticker to the string with in a loop
currentPortfolioNegativeArray.forEach(ticker => {
       negativePortfolioString = negativePortfolioString.concat(ticker + ",");

});

function addNegativeStock(){
    var newNegativeStock = $("#input-negative-stock").val();

    if(currentPortfolioNegativeArray.indexOf(newNegativeStock) === -1){
     currentPortfolioNegativeArray.push(newNegativeStock);
    }

    currentPortfolioNegativeArray.forEach(ticker => {
    negativePortfolioString = negativePortfolioString.concat(ticker + ",");
    $("#stockportfoliotwo").text(currentPortfolioNegativeArray);
});

    console.log(currentPortfolioNegativeArray);
    console.log(negativePortfolioString);
}

$("#add-negative-button").on("click", function(){
    negativePortfolioString = "";
   addNegativeStock();
   $("#input-negative-stock").val("");
});

$("#negative-api-call").on("click", function(){
    callAPInegative();
});

function callAPInegative(){
    $.ajax({
    url: `https://www.worldtradingdata.com/api/v1/stock?symbol=${negativePortfolioString}.L&api_token=b8KYXdWqizhKvy2yiYx5i3aBXzHtZoG17e45htFITHh9wxz7GUl0ZRjPA8YF`,
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
        toTradeOK = false
    }

    console.log(toTradeOK);
    if (toTradeOK === true) {$("#tradeokalert").text("you can trade");
    } else {
        $("#tradeokalert").text("Don't trade");  
    }
}        
         
});
}

}); //ends document ready function