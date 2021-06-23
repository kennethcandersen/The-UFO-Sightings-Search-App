// from data.js
var tableData = data;

// Select the button
var filterButton = d3.select("#filter-btn");
var restButton = d3.select("#reset-btn");

// Select the form
var datetimeForm = d3.select("#datetime");
var cityForm = d3.select("#city");
var stateForm = d3.select("#state");
var countryForm = d3.select("#country");
var shapeForm = d3.select("#shape");

// Create event handlers 
filterButton.on("click", runEnter);
restButton.on('click', resetTable)
datetimeForm.on("submit",runEnter);
cityForm.on("submit",runEnter);
stateForm.on("submit",runEnter);
countryForm.on("submit",runEnter);
shapeForm.on("submit",runEnter);

var tbody = d3.select("tbody");
// tbody.html("");

tableData.forEach((ufoSighting) => {
  row = tbody.append("tr");
  Object.values(ufoSighting).forEach(value => row.append("td").text(value));
});

function resetTable() {
  var tbody = d3.select("tbody");
  tbody.html("");
  
  tableData.forEach((ufoSighting) => {
    row = tbody.append("tr");
    Object.values(ufoSighting).forEach(value => row.append("td").text(value));
  });
}

// Complete the event handler function for the form
function runEnter() {

    var tbody = d3.select("tbody")
    tbody.html("");
    // Select the input element and get the raw HTML node
    var datetimeInput = d3.select("#datetime").property("value");
    var cityInput = d3.select("#city").property("value");
    var stateInput = d3.select("#state").property("value");
    var countryInput = d3.select("#country").property("value");
    var shapeInput = d3.select("#shape").property("value");

    var filterResults = tableData.filter(ufoSighting =>
        ufoSighting.datetime === datetimeInput &&
        ufoSighting.city === cityInput &&
        ufoSighting.state === stateInput &&
        ufoSighting.country === countryInput &&
        ufoSighting.shape === shapeInput
        );

    filterResults.forEach((ufoSighting) => {
    console.log(ufoSighting);
    row = tbody.append("tr");
    Object.values(ufoSighting).forEach(value => row.append("td").text(value));
    })

    }