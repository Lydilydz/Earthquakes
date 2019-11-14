// from quakes.js
var tableData = data;

// YOUR CODE HERE!
//hook into the button
d3.selectAll("#filter-btn").on("click", handleClick);
d3.selectAll("#reset-btn").on("click", resetClick);

// create the func to build the table
function buildtable(somedata){
    let tbody = d3.select("tbody");
    tbody.html("");

    somedata.forEach(row => {
        //console.log(row);
        let tr = tbody.append("tr");

        Object.values(row).forEach(cell => {
            let c = tr.append("td");
            c.text(cell);
        });
    });

}

//Function to filter data by date
function handleClick(){
    var DateTime =d3.select("#DateTime").property("value");
	var EventID =d3.select("#EventID").property("value");
	var Depth =d3.select("#Depth").property("value");
	var Magnitude =d3.select("#Magnitude").property("value");	
	var NbStations =d3.select("#NbStations").property("value");	

    let filteredData = tableData;

    if (DateTime) {
        filteredData = filteredData.filter( element => element.DateTime == DateTime);
    }

    if (EventID) {
        filteredData = filteredData.filter( element => element.EventID == EventID);
    }

    if (Depth) {
        filteredData = filteredData.filter( element => element.Depth == Depth);
    }

    if (Magnitude) {
        filteredData = filteredData.filter( element => element.Magnitude == Magnitude);
    }

    if (NbStations) {
        filteredData = filteredData.filter( element => element.NbStations == NbStations);
    }

    buildtable(filteredData);
}


//Function to reset data
function resetClick(){
    var date =d3.select("#DateTime").property("value");
    let filteredData = tableData;
	
//    if (date) {
//        filteredData = filteredData.filter( element => element.datetime === date);
//    }

    buildtable(filteredData);
}

//call the build table func with the non-filtered data
buildtable(data);
