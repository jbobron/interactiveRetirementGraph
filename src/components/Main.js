var React = require('react');
var AssetsGraph = require('./AssetsGraph');

var FriendsContainer = React.createClass({
  getInitialState: function(){
    return {
      currentAge: 35,
      retirementAge: 50,
      minimumAge: 20,
      maximumAge: 100,
      currentSalary: 30000,
      totalAssets: 1000,
      performancePercentage: 5,
      annualSavingsPercentage: 8,
      config: {
        ///this should be empty to start then on react initial load, populate using calcNewRetArr with min and max age
        series: [{ name: "Assets", data: [] }],
        //this should be empty to start then on react initial load, populate config.xAxis.categories with ages starting from min age and ending with max age
        xAxis: { title: { text: 'Time (Years)' }, categories: [] },
        legend: { enabled: false },
        yAxis: { title: { text: "Assets in Dollars ($)" } }
      }
    }
  },
  componentWillMount: function(){
    var populatedAgeArray = populateAgeArray(this.state.minimumAge, this.state.maximumAge);
    this.state.config = setStateFor('xAxis', populatedAgeArray, this.state.config);
    var populatedAssetsArray = calculateNewRetirementArray(this.state.minimumAge, this.state.maximumAge, this.state.totalAssets, this.state.performancePercentage, this.state.currentSalary, this.state.annualSavingsPercentage);
    this.state.config = setStateFor('yAxis', populatedAssetsArray, this.state.config);
  },
  handleMouseUp: function(e){
    console.log("in handle mouse up")
    //generate new data set for graph
    var newData = calculateNewRetirementArray(this.state.minimumAge, this.state.maximumAge, this.state.totalAssets, this.state.performancePercentage, this.state.currentSalary, this.state.annualSavingsPercentage);
    var chart = $('#container').highcharts();
    this.state.config = setStateFor('yAxis', newData, this.state.config)
    chart.series[0].setData(newData);
  },
  handleAgeRangeChange: function(e){ // this uses 'slice' (setExtremes) and keep original full config.xAxis.categories array
    var chart = $('#container').highcharts();
    chart.xAxis[0].setExtremes(this.state.currentAge - this.state.minimumAge, this.state.retirementAge - this.state.minimumAge)
  },
  handleKeyDown: function(e){
    var ENTER = 13;
    if( e.keyCode == ENTER ) { this.handleMouseUp(e); }
  },
  componentDidMount: function() {
    $(document.body).on('keydown', this.handleKeyDown);
    var chart = $('#container').highcharts();
    chart.xAxis[0].setExtremes(this.state.currentAge - this.state.minimumAge, this.state.retirementAge - this.state.minimumAge)
  },
  handleChange: function(name, e){
    if(name === 'annualSavingsPercentage') this.setState({ annualSavingsPercentage: e.target.value});
    if(name === 'retirementAge') this.setState({ retirementAge: e.target.value});
    if(name === 'currentAge') this.setState({ currentAge: e.target.value});
    if(name === 'currentSalary') this.setState({ currentSalary: e.target.value});
    if(name === 'totalAssets') this.setState({ totalAssets: e.target.value});
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
                   value={this.state.annualSavings}
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
                   handleKeyDown={this.handleKeyDown.bind(this,(this,'totalAssets'))}>
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

function calculateNewRetirementArray(startAge, endAge, capital, performancePercentage, currentSalary, annualSavingsPercentage){
  var savingsConstant = currentSalary * (annualSavingsPercentage / 100);
  var performanceDecimal = (performancePercentage / 100) + 1;
  var totalYears = endAge - startAge;
  var arr = [];
  var i = 1;
  while(totalYears-- > 0){
    arr.push( (capital + savingsConstant *i ) * Math.pow(performanceDecimal, i) );
    i++;
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

