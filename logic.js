// var myKey = 50457ee5f8d84f32a2938a52ec296560;
// https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Obama&api-key=50457ee5f8d84f32a2938a52ec296560
// https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Obama&begin_date=20040101&end_date=20060101&api-key=50457ee5f8d84f32a2938a52ec296560
// https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=50457ee5f8d84f32a2938a52ec296560&q=Obama
// https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=50457ee5f8d84f32a2938a52ec296560&q=Trump



// remember the key words that break down the parameter begin_date end_date
// also remember &, ?q= etc.

// you can test if the files are connected with the html and js
//alert("test");

// recommended way of coding

// SETUP VARIABLES
// ============================================

// hold the authorization key as a string. 
var authKey = "50457ee5f8d84f32a2938a52ec296560";

// Search Parameters
var queryTerm 	= "";
var numResults 	= 0;
var startYear 	= 0;
var endYear 	= 0;


// variable to hold the url base
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

// Variable to Track number of articles
var articleCounter = 0; 


// FUNCTIONS
// ============================================
function runQuery(numArticles, queryURL) {

	// AJAX Function
	$.ajax({url: queryURL, method: "GET"})
		.done(function(NYTData) {   // instead of storing everything in "response" you create NYTData variable
			

		// clear the wells from the previous run. 
		$("#wellSection").empty();	

		for (var i=0; i<numArticles; i++) {

			// Start Dumping to HTML here
			var wellSection = $("<div>");
			wellSection.addClass("well");
			// each article will have a unique id
			wellSection.attr("id", "articleWell-" + i);
			$("#wellSection").append(wellSection);


			// Check if things exist
			if (NYTData.response.docs[i].headline != "null") {
				console.log(NYTData.response.docs[i].headline.main);
				$("#articleWell-" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
			}

			if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")) {
				console.log(NYTData.response.docs[i].byline.original);
				$("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
			}

			
			// Add the content to the appropriate well
			$("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
			$("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
			$("#articleWell-" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");
		
			console.log(NYTData.response.docs[i].section_name);
			console.log(NYTData.response.docs[i].pub_date);
			console.log(NYTData.response.docs[i].web_url);

		}


			// logging to console
			console.log(queryURL);
			console.log(numArticles);
			console.log(NYTData);	// it will store everything that was retrieved with JSON, the entire object
		})
}



// MAIN PROCESSES
// ============================================


$("#searchBtn").on("click", function() { 


	// Get serch term
	queryTerm = $("#search").val().trim();


	// Add in the Serch Term
	var newURL = queryURLBase + "&q=" + queryTerm; 


	// Get the number of records
	// no need to trim because is select box, we know already the values. 
	numResults = $("#numRecords").val();


	// Get the Start Year and End Year
	startYear = $("#startYear").val().trim();
	endYear = $("#endYear").val().trim();


	// This information is optional and will be added to the URL only
	// if there is a information input by the user. 
	if (parseInt(startYear)) {

		// Add the date fields for the month and day
		startYear = startYear + "0101";
		// Add the date information to the URL
		newURL = newURL + "&begin_date=" + startYear;
	}


	if (parseInt(endYear)) {
		endYear = endYear + "0101";
		newURL = newURL + "&end_Date=" + endYear;
	}


	// send the AJAX call the newly assembled URL
	runQuery(numResults, newURL);

	// prevent it from going to a new page. 
	return false; 

})



// 1. Retrieve user input and convertt to variables
// 2. use variables to ran and AJAX call to the NY Times
// you will get the JSON object that you can work with
// 3. Break down the NYT Object into useable fields
// 4. Dynamically generate html content

// 5. Dealing with "edge cases" -- bugs or situations that are not obvious like missing fields or similar
