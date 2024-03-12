// url = https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json

  
  // Function to create horizontal bar chart
  const createBarChart = (sampleValues, otuIds, otuLabels) => {
    const slicedSampleValues = sampleValues.slice(0, 10).reverse();
    const slicedOtuIds = otuIds.slice(0, 10).reverse();
    const slicedOtuLabels = otuLabels.slice(0, 10).reverse();
  
    const trace = {
      x: slicedSampleValues,
      y: slicedOtuIds.map(id => `OTU ${id}`),
      text: slicedOtuLabels,
      type: 'bar',
      orientation: 'h'
    };
  
    const data = [trace];
  
    const layout = {
      title: 'Top 10 OTUs Found',
      xaxis: { title: 'Sample Values' },
      yaxis: { title: 'OTU ID', autorange: 'reversed' }
    };
  
    Plotly.newPlot('bar', data, layout);
  };
  
  // Function to create bubble chart
  const createBubbleChart = (sampleValues, otuIds, otuLabels) => {
    const trace = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: 'Earth'
      }
    };
  
    const data = [trace];
  
    const layout = {
      title: 'OTU Bubble Chart',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Sample Values' }
    };
  
    Plotly.newPlot('bubble', data, layout);
  };

  // Function to create gauge chart
const createGaugeChart = (washingFrequency) => {
  var level = washingFrequency * 20;

  var degrees = 180 - level,
    radius = 0.5;
  var radians = (degrees * Math.PI) / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  var mainPath = 'M -.0 -0.05 L .0 0.05 L ',
    pathX = String(x),
    space = ' ',
    pathY = String(y),
    pathEnd = ' Z';
  var path = mainPath.concat(pathX, space, pathY, pathEnd);

  var data = [
    {
      type: 'scatter',
      x: [0],
      y: [0],
      marker: { size: 14, color: '850000' },
      showlegend: false,
      name: 'frequency',
      text: level,
      hoverinfo: 'text+name',
    },
    {
      values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
      rotation: 90,
      text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
      textinfo: 'text',
      textposition: 'inside',
      marker: {
        colors: [
          'rgba(0, 105, 11, .5)',
          'rgba(10, 120, 22, .5)',
          'rgba(14, 127, 0, .5)',
          'rgba(110, 154, 22, .5)',
          'rgba(170, 202, 42, .5)',
          'rgba(202, 209, 95, .5)',
          'rgba(210, 206, 145, .5)',
          'rgba(232, 226, 202, .5)',
          'rgba(240, 230, 215, .5)',
          'rgba(255, 255, 255, 0)',
        ],
      },
      labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
      hoverinfo: 'label',
      hole: 0.5,
      type: 'pie',
      showlegend: false,
    },
  ];

  var layout = {
    shapes: [
      {
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000',
        },
      },
    ],
    title: '<b>Belly Button Washing Frequency</b><br>Scrubs per Week',
    height: 500,
    width: 500,
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1],
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1],
    },
  };

  Plotly.newPlot('gauge', data, layout);
};

  // Function to display demographic info
const displayMetadata = (metadata) => {
    // Select the element where metadata will be displayed
    const metadataDisplay = d3.select('#sample-metadata');
  
    // Clear existing metadata
    metadataDisplay.html('');
    Object.entries(metadata).forEach(([key, value]) => {
        metadataDisplay.append('h6').text(`${key.toUpperCase()}: ${value}`)
    })   
  };


  // Function to update the charts and metadata based on selected ID
  const optionChanged = (id) => {
    console.log(id);
    d3.json('samples.json').then(({metadata, samples }) => {
      let meta = metadata.find(obj => obj.id == id);
      let { otu_ids, sample_values, otu_labels,wfreq} = samples.find(obj => obj.id == id);
      console.log(otu_ids, sample_values, otu_labels)

      // Call createBarChart, createBubbleChart, and displayMetadata functions with data
      createBarChart(sample_values, otu_ids, otu_labels);
      createBubbleChart(sample_values, otu_ids, otu_labels);
      displayMetadata(meta);
      createGaugeChart(wfreq);
    });
  };
  
  // Function to initialize the dropdown menu, charts, and metadata
  const init = () => {
    d3.json('samples.json').then(({ names, metadata }) => {
      let dropdownMenu = d3.select('#selDataset');
  
      // Populate dropdown with options
      names.forEach(name => {
        dropdownMenu.append('option').text(name).property('value', name);
      });
  
      // Initialize with the first option
      optionChanged(names[0]);
  
      // Display initial metadata
      displayMetadata(metadata[names[0]]);
    });
  };
  
  // Call init function to initialize the page
  init();  