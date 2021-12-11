function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;

        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // Use the first sample from the list to build the initial plots
        var firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);

}

// Demographics Panel 
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        // Filter the data for the object with the desired sample number
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        // Use d3 to select the panel with id of `#sample-metadata`
        var PANEL = d3.select("#sample-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });

    });
}
// Create the buildChart function.
function buildCharts(sample) {
    // Use d3.json to load the samples.json file 
    d3.json("samples.json").then((data) => {
        console.log(data);

        // 1. Create a variable that filters the metadata array for the object with the desired sample number.
        var selWash = data.metadata.filter(sampleObj => sampleObj.id == sample);
        console.log(selWash);

        // Create a variable that holds the first sample in the array.
        var washFreq = selWash[0].wfreq;
        console.log(washFreq);

        // 4. Create the trace for the gauge chart.

        var gaugeData = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: washFreq,
            title: { text: "Wash Frequency" },
            type: "indicator",
            mode: "number+gauge",
            gauge: {
                axis: {
                    range: [null, 9],
                    tickformatstops: {
                        dtickrange: [0, 10]
                    },
                    tickmode: "array",
                    tickvals: [0, 2, 4, 6, 8, 10],
                    ticktext: [0, 2, 4, 6, 8, 10]
                },
                bar: { color: "black" },
                steps: [
                    { range: [0, 2], color: "red" },
                    { range: [2, 4], color: "orange" },
                    { range: [4, 6], color: "yellow" },
                    { range: [6, 8], color: "lime" },
                    { range: [8, 10], color: "green" }
                ]
            }
        }];

        // 5. Create the layout for the gauge chart.
        var gaugeLayout = {
            width: 600,
            height: 500,
            margin: { t: 0, b: 0 }
        };

        // 6. Use Plotly to plot the gauge data and layout.
        Plotly.newPlot("gauge", gaugeData, gaugeLayout);
    });
}