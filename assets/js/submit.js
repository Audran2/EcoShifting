// setup jquery
// noinspection JSUnresolvedFunction,JSJQueryEfficiency,JSUnresolvedVariable,JSCheckFunctionSignatures

$(document).ready(function() {

    function calculate(){
        const address = $("#1").text();
        const address2 = $("#2").text();

        const lat1 = address.split(",")[0];
        const lng1 = address.split(",")[1];
        const lat2 = address2.split(",")[0];
        const lng2 = address2.split(",")[1];

        const R = 3958.8; // Radius of the Earth in miles
        const rlat1 = lat1 * (Math.PI/180); // Convert degrees to radians
        const rlat2 = lat2 * (Math.PI/180); // Convert degrees to radians
        const difflat = rlat2-rlat1; // Radian difference (latitudes)
        const difflon = (lng2-lng1) * (Math.PI/180); // Radian difference (longitudes)
        let distance = 2 * R
            * Math.asin(
                Math.sqrt(
                    Math.sin(
                        difflat/2)*
                    Math.sin(
                        difflat/2)+
                    Math.cos(
                        rlat1)*
                    Math.cos(
                        rlat2)*
                    Math.sin(
                        difflon/2)*
                    Math.sin(
                        difflon/2)
                )
            );
        distance = (distance.toFixed(2) * 1.60934).toFixed(2);
        console.log("Distance between markers: " + distance + " km.");
        document.getElementById('msg').innerHTML = "Distance between markers: " + distance + " km.";

        // if a table already exist remove it
        if($("#table").children().length > 0){
            $("#table").empty();
        }

        // add an empty table to #output
        $("#table").append("<table class='table table-striped'> <tr> <th>Name</th> <th>Emission (g CO2 / person)</th></tr></table>");

        $.getJSON("https://api.monimpacttransport.fr/beta/getEmissionsPerDistance?km="+distance+"&filter=smart&fields=emoji,description", function(data){
            $.each(data, function(index, value){
                // add a row to the table
                // set value.name to the first with the image in value.emoji.main and value.emissions.gco2e to the second column
                // convert value.emissions.gco2e with only 2 decimals

                $("table").append("<tr><td>" + value.emoji.main + " " + value.name + "</td><td>" + value.emissions.gco2e.toFixed(2) + "</td></tr>");
                // $("#output").append("<div class='block'><div class='img'> <h6>" + value.emoji.main + "</h6></div><div class='text'><h3>" + " " + value.name + "</h3><h6>" + value.emissions.gco2e.toFixed(2) + " gCO2e/km/personne : " + value.description + "</h6></div></div>");

            });
        });
    }

    $('#submit').click(function(e) {
        // stop the form from submitting the normal way and refreshing the page
        e.preventDefault();

        // if input value is empty return
        if($("#input-distance").val() === ""){
            return;
        }

        // if a table already exist remove it
        const address = $("#input-start").val();
        const address2 = $("#input-end").val();

        // if address and address2 are empty return
        if (address === "" || address2 === "") {
            return;
        }

        // do a request that return a json and console log it
        $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + address.replaceAll(" ", "") + '&key=AIzaSyDrFscywJGn02AB0ALLId4oOE1gJoamREE', function (data) {
            // get the first result
            const firstResult = data.results[0];
            // get the geometry
            const geometry = firstResult.geometry;
            // get the location
            const location = geometry.location;
            // get the lat and lng
            const lat = location.lat;
            const lng = location.lng;
            console.log("Addresse 1: " + address);
            console.log(lat + "," + lng);
            // at lat and lng to #1
            $("#1").html(lat + "," + lng);
        });
        $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + address2.replaceAll(" ", "") + '&key=AIzaSyDrFscywJGn02AB0ALLId4oOE1gJoamREE', function (data) {
            // get the first result
            const firstResult = data.results[0];
            // get the geometry
            const geometry = firstResult.geometry;
            // get the location
            const location = geometry.location;
            // get the lat and lng
            const lat = location.lat;
            const lng = location.lng;
            console.log("Addresse 2: " + address2);
            console.log(lat + "," + lng);
            // at lat and lng to #2
            $("#2").html(lat + "," + lng);
        });

        setTimeout(calculate, 500);

    });
});