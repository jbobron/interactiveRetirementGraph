/*
intially newData and chart.series[0].yData are equal with one zero in front
when inc current age happens, we add x zeros to beginning of yData
when inc total assets happens, we take yData and find how many zeros there are at the front
then newData is recalculated based on inc/dec in total assets
then x zeros are added to front of newData
then we set newData as series data 

yData : [0,0,0,0,0,.....]
newData: [0,0,0,0,0,1000, 5400, .....]
newData pt2: [0,0,0,0,0,0,4200, ...]


Something like check newData/yData at index numOfZeros in
if it is a zero add one less zero
if it is not a zero add normal numOfZeros
*/


var React = require('react');
var AssetsGraph = require('./AssetsGraph');

var FriendsContainer = React.createClass({
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
      wasHandleAgeRangeChangeCalled: false,
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
    var populatedAssetsArray = calculateNewRetirementArray(this.state.minimumAge, this.state.maximumAge, this.state.totalAssets, this.state.performancePercentage, this.state.currentSalary, this.state.annualSavingsPercentage);
    this.state.config = setStateFor('yAxis', populatedAssetsArray, this.state.config);
  },
  handleMouseUp: function(e){
    //slice off one extra from end and add one extra zero 
    console.log("in handle mouse up")
    var chart = $('#container').highcharts();
    var noNullsArr = chart.series[0].yData.filter(function(value, index){
      // if(index === 0) return true;
      return value !== 0.1
    });
    var numOfNulls = chart.series[0].yData.length - noNullsArr.length;
    var newData = calculateNewRetirementArray(this.state.minimumAge, this.state.maximumAge, this.state.totalAssets, this.state.performancePercentage, this.state.currentSalary, this.state.annualSavingsPercentage);
    if(this.state.wasHandleAgeRangeChangeCalled){
      debugger;
      var newData = newData.slice(0,newData.length-numOfNulls);
      while(numOfNulls-- > 0) newData.unshift(0.1);
    }
    else {
      this.state.config = setStateFor('yAxis', newData, this.state.config)
    }
    // chart.series[0].yData
    chart.series[0].setData(newData);
  },
  handleAgeRangeChange: function(name, e){ // this uses 'slice' (setExtremes) and keep original full config.xAxis.categories array
    this.setState({wasHandleAgeRangeChangeCalled: true})
    if(this.state.currentAge === this.state.minimumAge) this.setState({wasHandleAgeRangeChangeCalled: false})
    var chart = $('#container').highcharts();
    var changeInAge =  this.state.currentAge - this.state.previousCurrentAge;
    var storageArr = []; 
    this.setState({previousCurrentAge: this.state.currentAge})
    chart.xAxis[0].setExtremes(this.state.currentAge - this.state.minimumAge, this.state.retirementAge - this.state.minimumAge);
    if(changeInAge > 0){ // for inc in current age, zeros are added to beginning of yData to correctly reflect starting assets as initial assets
      for(var i = 0; i < changeInAge; i++){
        chart.series[0].yData.unshift(0.1);
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
  handleChange: function(name, e){
    if(name === 'annualSavingsPercentage') this.setState({ annualSavingsPercentage: e.target.valueAsNumber});
    if(name === 'retirementAge') this.setState({ retirementAge: e.target.valueAsNumber});
    if(name === 'currentAge') this.setState({ currentAge: e.target.valueAsNumber});
    if(name === 'currentSalary') this.setState({ currentSalary: e.target.valueAsNumber});
    if(name === 'totalAssets') this.setState({ totalAssets: e.target.valueAsNumber});
  },
  render: function(){
    return (
      <div>
        <h1> Retirement Savings Interactive Graph</h1>
        <ul style={style.sliders}>
          <li style={style.sliders}>
            <h3>Current Age: {this.state.currentAge}</h3>
            <input type="range"
                   min="20"
                   max="80"
                   step="1"
                   value={this.state.currentAge}
                   onChange={this.handleChange.bind(this,'currentAge')} 
                   onMouseUp={this.handleAgeRangeChange.bind(this,(this,'currentAge'))}>
            </input>
          </li>
          <li style={style.sliders}>
            <h3>Retirement Age: {this.state.retirementAge}</h3>
            <input type="range"
                   min="20"
                   max="100"
                   step="1"
                   value={this.state.retirementAge}
                   onChange={this.handleChange.bind(this,'retirementAge')} 
                   onMouseUp={this.handleAgeRangeChange.bind(this,(this,'retirementAge'))}>
            </input>
          </li>
          <li style={style.sliders}>
            <h3>Annual Savings: {this.state.annualSavingsPercentage} % </h3>
            <input type="range"
                   min="0"
                   max="100"
                   step="1"
                   value={this.state.annualSavingsPercentage} 
                   onChange={this.handleChange.bind(this,'annualSavingsPercentage')} 
                   onMouseUp={this.handleMouseUp.bind(this,(this,'annualSavingsPercentage'))}>
            </input>
          </li>
          <li style={style.sliders}>
            <h3>Current Salary: </h3>
            <input type="number"
                   readonly="true"
                   maxlength="8"
                   value={this.state.currentSalary} 
                   onChange={this.handleChange.bind(this,'currentSalary')}
                   handleKeyDown={this.handleKeyDown.bind(this,(this,'currentSalary'))}>
            </input> 
          </li>
          <li style={style.sliders}>
            <h3>Total Assets: </h3>
            <input type="number"
                   readonly="true"
                   maxlength="8"
                   value={this.state.totalAssets} 
                   onChange={this.handleChange.bind(this,'totalAssets')}
                   handleKeyDown={this.handleKeyDown.bind(this,(this,'totalAssets'))}>
            </input>
          </li>
        </ul>
        <AssetsGraph config={this.state.config}/>
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

function calculateNewRetirementArray(startAge, endAge, startingAssets, performancePercentage, currentSalary, annualSavingsPercentage){
  var savingsConstant = currentSalary * (annualSavingsPercentage / 100);
  var performanceDecimal = (performancePercentage / 100) + 1;
  var totalYears = endAge - startAge;
  var arr = [];
  var t = 0;
  var total;
  // debugger;
  while(t < totalYears){
    total = (startingAssets * Math.pow(performanceDecimal, t)) + (savingsConstant * ((Math.pow(performanceDecimal, t) - 1) / (performanceDecimal - 1)) * performanceDecimal);
    arr.push( total );
    t++;
  }
  //account for after retirement here
  while(arr.length !== 100){
    arr.push(1000000)
  }
  return arr;
}

function calculateNewAgeArray(startAge, endAge){
  var arr = [];
  for(var i = startAge; i < endAge; i++){
    arr.push(parseInt(i));
  }
  return arr;
  //if inc in years range -> call calculateNewRetirementArray with new age range and modify unshift / push categories array
    //if inc in retirement age
      //
    //if dec in current age

  //if dec in years range
    //if dec in retirement age
        // slice off x values from series array and categories array
    //if inc in current age
        // shift off x values from series array and categories array
}

var style = {
  sliders: {
    "display": "inline-block",
    "padding-right": "40px"
  }
}

module.exports = FriendsContainer;

