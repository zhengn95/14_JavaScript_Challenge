# Java Script Challenge: Belly Button Diversity
*Challenge 14 for UC Berkeley Data Analytics Bootcamp*

In this assignment, we use Java Script to build an interactive dashboard to explore the [Belly Button Biodiversity](https://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

The Java Script `D3 library` was used to read in `samples.json` from the URL: https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json which contains data of belly button biodiversity.

Using the dataset a dropdown menu updating all the plots when a new sample is selected 
was created to display the following:
- A horizontal bar of the top 10 OTUs found in an individual.
- A bubble chart that displays each sample.
- The sample metadata, i.e., an individual's demographic information.


