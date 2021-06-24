// GET DATA
var tableData = data;

// HELPER FUNCTIONS
// This functionhelp with finding unique values in the dataset. 
//   This will help with setting up pull down menus for the filters 
//   later on.
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// INSERT ALL TABLE DATA WHEN PAGE IS FIRST LOADED
var tbody = d3.select("tbody");

tableData.forEach((ufoSighting) => {
  row = tbody.append("tr");
  Object.values(ufoSighting).forEach(value => row.append("td").text(value));

});

// SELECT BUTTONS
var filterButton = d3.select("#filter-btn");
var resetButton = d3.select("#reset-btn");

// SET UP FORMS AND ARRAYS FOR DROPDOWN FILTER MENU ITEMS

  // DATES
  // Select form
  var dateForm = d3.select("#datetime");
  // Get states from dataset, then filter for unique values, and sort them
var dates = tableData.map(ufosighting => ufosighting.datetime);
var dateOptions = dates.filter(onlyUnique).sort();
  // Insert list of unique states into the filter dropdown menu in the HTML file
dateOptions.forEach(date => {
  dateForm.append("option").text(date)
});

  // STATES
  // Select form
var stateForm = d3.select("#state");
  // Get states from dataset, then filter for unique values, and sort them
var states = tableData.map(ufosighting => ufosighting.state);
var stateOptions = states.filter(onlyUnique).sort();
  // Insert list of unique states into the filter dropdown menu in the HTML file
stateOptions.forEach(state => {
  stateForm.append("option").text(state)
});

  // CITIES
  // Select form
  var cityForm = d3.select("#city");
  // Get states from dataset, then filter for unique values, and sort them
var cities = tableData.map(ufosighting => ufosighting.city);
var cityOptions = cities.filter(onlyUnique).sort();
  // Insert list of unique states into the filter dropdown menu in the HTML file
cityOptions.forEach(city => {
  cityForm.append("option").text(city)
});

  // COUNTRIES
  // Select form
  var countryForm = d3.select("#country");
  // Get states from dataset, then filter for unique values, and sort them
var countries = tableData.map(ufosighting => ufosighting.country);
var countryOptions = countries.filter(onlyUnique).sort();
  // Insert list of unique states into the filter dropdown menu in the HTML file
  countryOptions.forEach(country => {
    countryForm.append("option").text(country)
});

  // SHAPES
  // Select form
  var shapeForm = d3.select("#shape");
  // Get states from dataset, then filter for unique values, and sort them
var shapes = tableData.map(ufosighting => ufosighting.shape);
var shapeOptions = shapes.filter(onlyUnique).sort();
  // Insert list of unique states into the filter dropdown menu in the HTML file
  shapeOptions.forEach(shape => {
    shapeForm.append("option").text(shape)
});

//   // DURATIONS - discontinued because the data is a mess
//   // Select form
//   var durationForm = d3.select("#duration");
//   // Get states from dataset, then filter for unique values, and sort them
// var durations = tableData.map(ufosighting => ufosighting.durationMinutes);
// var durationOptions = durations.filter(onlyUnique).sort();
//   // Insert list of unique states into the filter dropdown menu in the HTML file
//   durationOptions.forEach(duration => {
//     durationForm.append("option").text(duration)
// });

// CREATE EVENT HANDLERS

// Note that I turned off the filterButton because the "change" event
//   automatically triggers the runEnter function (the filterbutton 
//   is redundant)
     
resetButton.on('click', resetTable);
// filterButton.on('click', runEnter);
d3.selectAll("select").on("change",runEnter);

// FUNCTION TO RESET THE FORM
function resetTable() {
  var tbody = d3.select("tbody");
  tbody.html("");
  
  tableData.forEach((ufoSighting) => {
    row = tbody.append("tr");
    Object.values(ufoSighting).forEach(value => row.append("td").text(value));
    document.getElementById('datetime').selectedIndex = 0;
    document.getElementById('city').selectedIndex = 0;
    document.getElementById('state').selectedIndex = 0;
    document.getElementById('country').selectedIndex = 0;
    document.getElementById('shape').selectedIndex = 0;

  });
}

// FUNCTION FOR EVENT HANDLER
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Clear the existing table
    var tbody = d3.select("tbody")
    tbody.html("");

    // Select the input element and get the raw HTML node
    var datetimeInput = d3.select("#datetime").property("value");
    var cityInput = d3.select("#city").property("value");
    var stateInput = d3.select("#state").property("value");
    var countryInput = d3.select("#country").property("value");
    var shapeInput = d3.select("#shape").property("value");

    // Execute the filter. "|| !datetimeInput" means that the field is ignored
    //   if it is empty
    var filterResults = tableData.filter(ufoSighting =>
        (ufoSighting.datetime === datetimeInput || !datetimeInput) &&
        (ufoSighting.city === cityInput || !cityInput) && 
        (ufoSighting.state === stateInput || !stateInput) &&
        (ufoSighting.country === countryInput || !countryInput) &&
        (ufoSighting.shape === shapeInput || !shapeInput)
        );

    // Rebuild the table with filtered data
    filterResults.forEach((ufoSighting) => {
    console.log(ufoSighting);
    row = tbody.append("tr");
    Object.values(ufoSighting).forEach(value => row.append("td").text(value));
    })

    }