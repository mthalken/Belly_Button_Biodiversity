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
            // 7. Create the yticks for the bar chart.
            // Hint: Get the the top 10 otu_ids and map them in descending order  
            //  so the otu_ids with the most bacteria are last. 

        var yticks = otuIds.slice(0, 10).map(id => "OTU " + id).reverse();
        console.log(yticks)
            // 8. Create the trace for the bar chart. 
        var barData = [{
            x: otuValues.slice(0, 10).reverse(),
            text: otuLabels.slice(0, 10).reverse(),
            type: "bar"
        }];
        console.log(barData)
            // 9. Create the layout for the bar chart. 
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            xaxis: { title: "Number of Bacteria" },
            yaxis: {
                tickmode: "array",
                tickvals: [yticks],
                ticktext: [yticks],
                yref: yticks
            }
        };
        console.log(barLayout)

        // 10. Use Plotly to plot the data with the layout. 
        Plotly.newPlot("bar", barData, barLayout)

        // 1. Create the trace for the bubble chart.
        var bubbleData = [{
            x: otuIds,
            y: otuValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                color: otuIds,
                size: otuValues
                    // color: 'rgb(31, 119, 180)'
                    // colorscale: 
            }
        }];

        // 2. Create the layout for the bubble chart.
        var bubbleLayout = {
            title: 'Bubble Chart'
                // showlegend: false,
                // height: 600,
                // width: 800
        };

        // 3. Use Plotly to plot the data with the layout.
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

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
            guage: {
                axis: {
                    range: [null, 10],
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