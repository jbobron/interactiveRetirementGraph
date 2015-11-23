var React = require('react');
var AssetsGraph = require('./AssetsGraph');
var CurrentAge = require('./CurrentAge');
var RetirementAge = require('./RetirementAge');
var CurrentSalary = require('./CurrentSalary');
var TotalAssets = require('./TotalAssets');

var Main = React.createClass({
  getInitialState: function(){
    return {
      currentAge: 20,
      previousCurrentAge: 0,
      retirementAge: 50,
      minimumAge: 20,
      maximumAge: 100,
      currentSalary: 50000,
      totalAssets: 0,
      performancePercentage: 5,
      annualSavingsPercentage: 8,
      companyMatchPercentage: 0,
      maxSavingsPercentage: 36,  //based on $18000 max / $50000 current salary
      wasHandleAgeRangeChangeCalled: false,
      style: { sliders: { "display": "inline-block", "padding-right": "40px" } },
      config: {
        ///this should be empty to start then on react initial load, populate using calcNewRetArr with min and max age
        series: [{ name: "Assets", data: [] }],
        //this should be empty to start then on react initial load, populate config.xAxis.categories with ages starting from min age and ending with max age
        xAxis: { title: { text: 'Time (Years)' }, categories: [] },
        legend: { enabled: false },
        yAxis: { title: { text: "Assets in Dollars ($)" } },
        tooltip: { valueDecimals: 2, valuePrefix: '$', valueSuffix: ' USD' },
      }
    }
  },
  componentWillMount: function(){
    this.setState({previousCurrentAge: this.state.currentAge})
    var populatedAgeArray = populateAgeArray(this.state.minimumAge, this.state.maximumAge);
    this.state.config = setStateFor('xAxis', populatedAgeArray, this.state.config);
    var populatedAssetsArray = calculateNewRetirementArray(this.state.minimumAge, this.state.maximumAge, this.state.totalAssets, this.state.performancePercentage, this.state.currentSalary, this.state.annualSavingsPercentage, this.state.companyMatchPercentage);
    this.state.config = setStateFor('yAxis', populatedAssetsArray, this.state.config);
  },
  handleMouseUp: function(e){
    var chart = $('#container').highcharts();
    var searchForMe = chart.series[0].yData[0];
    var fillerArr = chart.series[0].yData.filter(function(value, index){
      return value !== searchForMe;
    });
    var numOfFillers = chart.series[0].yData.length - fillerArr.length;
    var newData = calculateNewRetirementArray(this.state.minimumAge, this.state.maximumAge, this.state.totalAssets, this.state.performancePercentage, this.state.currentSalary, this.state.annualSavingsPercentage, this.state.companyMatchPercentage);
    var firstVal = newData[0];
    if(this.state.wasHandleAgeRangeChangeCalled){
      var newData = newData.slice(0, newData.length-numOfFillers);
      while(numOfFillers-- > 0) newData.unshift(firstVal + 0.1);
    }
    else {
      this.state.config = setStateFor('yAxis', newData, this.state.config);
    }
    chart.series[0].setData(newData);
  },
  //EXPLAINATION FOR WHY WE ADD 0.1:
  //to utilize setExtremees which allows us to 'transform' the graph instead of reloading it, we need to manipulate the y axis
  //in tandum with any changes to the x axis (via age changes). We add on 0.1+the first val to the yaxis as a filler to keep the 
  //x and y axis in sync.  we are using lastNum and temp below to check if the user has already inc their age before (meaning there
  //will already be a .1 added onto the first val). we do this because we need all our filler values to be the same so we can count them later to take them out
  handleAgeRangeChange: function(name, e){ 
    // this uses 'slice' (setExtremes) and keep original full config.xAxis.categories array
    this.setState({wasHandleAgeRangeChangeCalled: true})
    if(this.state.currentAge === this.state.minimumAge) this.setState({wasHandleAgeRangeChangeCalled: false})
    var chart = $('#container').highcharts();
    var changeInAge =  this.state.currentAge - this.state.previousCurrentAge;
    var storageArr = []; 
    this.setState({previousCurrentAge: this.state.currentAge})
    chart.xAxis[0].setExtremes(this.state.currentAge - this.state.minimumAge, this.state.retirementAge - this.state.minimumAge);
    var firstVal = chart.series[0].yData[0];
    //check if first val starts with .1, if it does DONT add another 0.1 to it
    var temp = (firstVal * 10).toString();
    var lastNum = parseInt(temp[temp.length - 1]);
    if(changeInAge > 0){ // for inc in current age, zeros are added to beginning of yData to correctly reflect starting assets as initial assets
      for(var i = 0; i < changeInAge; i++){
        if(lastNum === 1) chart.series[0].yData.unshift(firstVal);
        else chart.series[0].yData.unshift(firstVal + 0.1);
        storageArr.push(chart.series[0].yData.pop()); //less years for compound interest means smaller ending assets, x values are removed from end of yData to reflect this
      }
    }
    else{ // for dec in current age, zeros are removed from beginning of yData to correctly reflect starting assets as initial assets
      for(var i = 0; i < Math.abs(changeInAge); i++){
        chart.series[0].yData.shift();
        chart.series[0].yData.push(storageArr.shift()); //additional y values are added back to yData to reflect inc in compound interest
      }
    }
    chart.series[0].setData(chart.series[0].yData);
  },
  handleKeyDown: function(e){
    var ENTER = 13;
    if( e.keyCode == ENTER ) this.handleMouseUp(e); 

  },
  componentDidMount: function() {
    $(document.body).on('keydown', this.handleKeyDown);
    var chart = $('#container').highcharts();
    chart.xAxis[0].setExtremes(this.state.currentAge - this.state.minimumAge, this.state.retirementAge - this.state.minimumAge);
  },
  recalculateMaxSavingsPercentage : function(){
    var maxSavingsPercentage = (18000/this.state.currentSalary)*100 > 100 ? 100 : (18000/this.state.currentSalary)*100;
    maxSavingsPercentage = parseInt(maxSavingsPercentage.toFixed(2));
    this.setState({ maxSavingsPercentage: maxSavingsPercentage });
  },
  recalculateAnnualSavingsPercentage : function(userPercentage){
    var savingsPercentage = (userPercentage/100) * this.state.currentSalary > 18000 ? (18000/this.state.currentSalary)*100 : userPercentage;
    savingsPercentage = parseInt(savingsPercentage.toFixed(2));
    this.setState({ annualSavingsPercentage: savingsPercentage});
  },
  handleChange: function(name, e){
    if(name === 'currentAge') this.setState({ currentAge: e.target.valueAsNumber });
    if(name === 'retirementAge') this.setState({ retirementAge: e.target.valueAsNumber });
    if(name === 'totalAssets') this.setState({ totalAssets: Math.abs(e.target.valueAsNumber) || 0 });
    if(name === 'companyMatchPercentage') this.setState({ companyMatchPercentage: e.target.valueAsNumber});
    if(name === 'annualSavingsPercentage'){
      this.recalculateMaxSavingsPercentage();
      this.recalculateAnnualSavingsPercentage(e.target.valueAsNumber);
    } 
    if(name === 'currentSalary'){
      var salary = e.target.valueAsNumber > 265000 ? 265000 : e.target.valueAsNumber;
      this.state.currentSalary = Math.abs(salary) || 0;
      this.recalculateAnnualSavingsPercentage(this.state.annualSavingsPercentage);
      this.recalculateMaxSavingsPercentage();
    } 
  },
  render: function(){
    return (
      <div>
        <h1> Retirement Savings Interactive Graph</h1>
        <ul style={this.state.style.sliders}>
          <CurrentAge {...this.state} handleChange={this.handleChange} handleAgeRangeChange={this.handleAgeRangeChange}/>
          <RetirementAge {...this.state} handleChange={this.handleChange} handleAgeRangeChange={this.handleAgeRangeChange}/>
          <CurrentSalary {...this.state} handleChange={this.handleChange} handleMouseUp={this.handleMouseUp} handleKeyDown={this.handleKeyDown}/>
          <TotalAssets {...this.state} handleChange={this.handleChange} handleKeyDown={this.handleKeyDown}/>
        </ul>
        <AssetsGraph ref="chart" config={this.state.config}/>
      </div>
    )
  }
});

function setStateFor(axis, values, currentConfig){
  var copyOfConfig = currentConfig;
  if(axis === "xAxis"){
    copyOfConfig.xAxis.categories = values;
  }
  if(axis === "yAxis"){
    copyOfConfig['series'][0].data = values;
  }
  return copyOfConfig;
}

function populateAgeArray(min, max){
  var arr = [];
  for(var i = min; i < max; i++){
    arr.push(i);
  }
  return arr;
}

function calculateNewRetirementArray(startAge, endAge, startingAssets, performancePercentage, currentSalary, annualSavingsPercentage, companyMatchPercentage){
  var savingsConstant = (currentSalary * (annualSavingsPercentage / 100)) + (currentSalary * (companyMatchPercentage / 100));
  var performanceDecimal = (performancePercentage / 100) + 1;
  var totalYears = endAge - startAge;
  var arr = [];
  var t = 0;
  var total;
  while(t < totalYears){
    total = (startingAssets * Math.pow(performanceDecimal, t)) + (savingsConstant * ((Math.pow(performanceDecimal, t) - 1) / (performanceDecimal - 1)) * performanceDecimal);
    arr.push( total );
    t++;
  }
  //TODO: figure out how to better evaluate spending once retired
  //account for after retirement here
  var lastVal = arr[arr.length-1]
  //account for after retirement here
  while(arr.length !== 100){
    arr.push(lastVal-=100000)
  }
  return arr;
}

function calculateNewAgeArray(startAge, endAge){
  var arr = [];
  for(var i = startAge; i < endAge; i++){
    arr.push(parseInt(i));
  }
  return arr;
}

module.exports = Main;
