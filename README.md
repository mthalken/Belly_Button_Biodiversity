# Belly Button Biodiversity

## The purpose of this analysis was to make a interactive tool for individuals who participated in the study as well as anyone looking into the site, so they could see the bacteria cultures found for each individual, wash frequency, and bacteria cultures per sample.

## Project Overview:
1. Create an interactive webpage with a dropdown selection for test subject identification.
2. Display the demographics info for the selected ID number.
3. Create a horizontal bar chart with the top 10 bacteria found for the selected ID number using plotly in javascript.
4. Display the corresponding wash frequency in a gauge chart for the selected ID number using plotly in javascript.
5. Using plotly in javascript create a bubble chart with the bacteria cultures per sample with the size of the corresponding to the sample size.
6. Using bootstrap and javascript format and edit the page to be more user friendly and appealing. 

## Resources
- Source of data: [samples.json](https://github.com/mthalken/Belly_Button_Biodiversity/blob/main/samples.json)
- Software: HTML, CSS, Bootstrap, Plotly, Javascript, Python 3.7.10, Conda 4.10.3, Visual Studio Code 1.60.2
- Please see the code for the individual charts below:
    - [Bubble Chart](https://github.com/mthalken/Belly_Button_Biodiversity/blob/main/static/js/bubble.js).
    - [Bar Chart](https://github.com/mthalken/Belly_Button_Biodiversity/blob/main/static/js/bar.js)
    - [Gauge Chart](https://github.com/mthalken/Belly_Button_Biodiversity/blob/main/static/js/guage.js)
- You can also see the refactored code [here](https://github.com/mthalken/Belly_Button_Biodiversity/blob/main/static/js/charts.js).

## Results 
- Website Link: [here](https://mthalken.github.io/Belly_Button_Biodiversity/)

- Webpage:
![png](https://github.com/mthalken/Belly_Button_Biodiversity/blob/main/static/images/main.png)

- Bar Chart:

![png](https://github.com/mthalken/Belly_Button_Biodiversity/blob/main/static/images/bar.png)

- Gauge Chart:
![png](https://github.com/mthalken/Belly_Button_Biodiversity/blob/main/static/images/guage.png)

- Bubble Chart:
![png](https://github.com/mthalken/Belly_Button_Biodiversity/blob/main/static/images/bubble.png)
