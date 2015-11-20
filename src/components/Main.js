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
      companyMatchPercentage: 0,
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
    var chart = $('#container').highcharts();
    var searchForMe = chart.series[0].yData[0];
    var noNullsArr = chart.series[0].yData.filter(function(value, index){
      return value !== searchForMe;
    });
    var numOfNulls = chart.series[0].yData.length - noNullsArr.length;
    var newData = calculateNewRetirementArray(this.state.minimumAge, this.state.maximumAge, this.state.totalAssets, this.state.performancePercentage, this.state.currentSalary, this.state.annualSavingsPercentage);
    var firstVal = newData[0]; 
    if(this.state.wasHandleAgeRangeChangeCalled){
      var newData = newData.slice(0,newData.length-numOfNulls);
      while(numOfNulls-- > 0) newData.unshift(firstVal + 0.1);
    }
    else {
      this.state.config = setStateFor('yAxis', newData, this.state.config)
    }
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
    var firstVal = chart.series[0].yData[0];
    if(changeInAge > 0){ // for inc in current age, zeros are added to beginning of yData to correctly reflect starting assets as initial assets
      for(var i = 0; i < changeInAge; i++){
        chart.series[0].yData.unshift(firstVal + 0.1);
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
  computeMaxSavingsPercentage : function() {
    console.log("hereee")
    // debugger;
    //set max to be current salary * x = 18,000 with x being max
    return (18000 / this.state.currentSalary * 100) > 100 ? 100 : (18000 / this.state.currentSalary * 100); 
  },
  componentDidMount: function() {
    $(document.body).on('keydown', this.handleKeyDown);
    var chart = $('#container').highcharts();
    chart.xAxis[0].setExtremes(this.state.currentAge - this.state.minimumAge, this.state.retirementAge - this.state.minimumAge);
  },
  handleChange: function(name, e){
    if(name === 'currentAge') this.setState({ currentAge: e.target.valueAsNumber});
    if(name === 'retirementAge') this.setState({ retirementAge: e.target.valueAsNumber});
    if(name === 'annualSavingsPercentage') this.setState({ annualSavingsPercentage: e.target.valueAsNumber});
    if(name === 'companyMatchPercentage') this.setState({ companyMatchPercentage: e.target.valueAsNumber});
    if(name === 'currentSalary') this.setState({ currentSalary: Math.abs(e.target.valueAsNumber) || 0});
    if(name === 'totalAssets') this.setState({ totalAssets: Math.abs(e.target.valueAsNumber) || 0});
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
            <h3>Annual Savings Percentage: {this.state.annualSavingsPercentage} % </h3>
            <input type="range"
                   min="0"
                   max={this.computeMaxSavingsPercentage()} //set max to be current salary * x = 18,000 with x being max
                   step="1"  //{this.computeMaxSavingsPercentage.bind(this, this.state.currentSalary)}
                   value={this.state.annualSavingsPercentage}  
                   onChange={this.handleChange.bind(this,'annualSavingsPercentage')} 
                   onMouseUp={this.handleMouseUp.bind(this,(this,'annualSavingsPercentage'))}>
            </input>
          </li>
          <li style={style.sliders}>
            <h3>Company Match Percentage: {this.state.companyMatchPercentage} % </h3>
            <input type="range"
                   min="0"
                   max="8"
                   step="1"
                   value={this.state.companyMatchPercentage} 
                   onChange={this.handleChange.bind(this,'companyMatchPercentage')} 
                   onMouseUp={this.handleMouseUp.bind(this,(this,'companyMatchPercentage'))}>
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

var style = {
  sliders: {
    "display": "inline-block",
    "padding-right": "40px"
  }
}

module.exports = FriendsContainer;

