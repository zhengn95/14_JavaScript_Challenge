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
      let { otu_ids, sample_values, otu_labels } = samples.find(obj => obj.id == id);
      console.log(otu_ids, sample_values, otu_labels)

      // Call createBarChart, createBubbleChart, and displayMetadata functions with data
      createBarChart(sample_values, otu_ids, otu_labels);
      createBubbleChart(sample_values, otu_ids, otu_labels);
      displayMetadata(meta);
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

  