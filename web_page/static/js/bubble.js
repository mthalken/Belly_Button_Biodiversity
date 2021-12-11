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

// 1. Create the buildCharts function.
function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
        // 3. Create a variable that holds the samples array. 
        var samplesArray = data.samples;
        console.log(samplesArray)
            // 4. Create a variable that the samples for the object with the desired sample number.
        var selectSamples = samplesArray.filter(sampleObj => sampleObj.id == sample);
        console.log(selectSamples)
            //  5. Create a variable that holds the first sample in the array.
        var firstSample = selectSamples[0];
        console.log(firstSample)

        // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
        var otuIds = firstSample.otu_ids;
        var otuLabels = firstSample.otu_labels;
        var otuValues = firstSample.sample_values;
        console.log(otuIds)
        console.log(otuLabels)
        console.log(otuValues)

        // 1. Create the trace for the bubble chart.
        var bubbleData = [{
            x: otuIds,
            y: otuValues,
            text: otuLabels,
            mode: "markers",
            marker: {
                size: otuValues
                    // color: 'rgb(31, 119, 180)'
                    // colorscale: 
            }
        }];

        // 2. Create the layout for the bubble chart.
        var bubbleLayout = {
            title: 'Bubble Chart',
            showlegend: false,
            height: 600,
            width: 800
        };

        // 3. Use Plotly to plot the data with the layout.
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
}