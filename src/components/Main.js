var React = require('react');
var AssetsGraph = require('./AssetsGraph');

var FriendsContainer = React.createClass({
  getInitialState: function(){
    return {
      currentAge: 20,
      retirementAge: 80,
      currentSalary: 30000,
      totalAssets: 1000,
      lifeExpectancy: 120,
      annualSavingsPercentage: 8,

      //dependent on current age - retirement age, and min and max $$
      config: {
        xAxis: {
          categories: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119]
        },
        series: [{
          data: [8000, 9261, 10648, 12167, 13824, 15625, 17576, 19683, 21952, 24389, 27000, 29791, 32768, 35937, 39304, 42875, 46656, 50653, 54872, 59319, 64000, 68921, 74088, 79507, 85184, 91125, 97336, 103823, 110592, 117649, 125000, 132651, 140608, 148877, 157464, 166375, 175616, 185193, 195112, 205379, 216000, 226981, 238328, 250047, 262144, 274625, 287496, 300763, 314432, 328509, 343000, 357911, 373248, 389017, 405224, 421875, 438976, 456533, 474552, 493039, 512000, 531441, 551368, 571787, 592704, 614125, 636056, 658503, 681472, 704969, 729000, 753571, 778688, 804357, 830584, 857375, 884736, 912673, 941192, 970299, 1000000, 1030301, 1061208, 1092727, 1124864, 1157625, 1191016, 1225043, 1259712, 1295029, 1331000, 1367631, 1404928, 1442897, 1481544, 1520875, 1560896, 1601613, 1643032, 1685159]
        }]
      }
    }
  },
  handleMouseUp: function(e){
    console.log("in handle mouse up")
    //generate new data set for graph
    var newData = [625000, 1200096, 2401, 40999996, 6561, 10000, 14641, 20736, 28561, 38416, 50625, 65536, 83521, 104976, 130321, 160000, 194481, 234256, 279841, 331776, 390625, 456976, 531441, 614656, 707281, 810000, 923521, 1048576, 1185921, 1336336, 1500625, 1679616, 1874161, 2085136, 2313441, 2560000, 2825761, 3111696, 3418801, 3748096, 4100625, 4477456, 4879681, 5308416, 5764801, 6250000, 6765201, 7311616, 7890481, 8503056, 9150625, 9834496, 10556001, 11316496, 12117361, 12960000, 13845841, 14776336, 15752961, 16777216, 17850625, 18974736, 20151121, 21381376, 22667121, 24010000, 25411681, 26873856, 28398241, 29986576, 31640625, 33362176, 35153041, 37015056, 38950081, 40960000, 43046721, 45212176, 47458321, 49787136, 52200625, 54700816, 57289761, 59969536, 62742241, 65610000, 68574961, 71639296, 74805201, 78074896, 81450625, 84934656, 88529281, 92236816, 96059601, 100000000, 104060401, 108243216, 112550881, 116985856]
    var newConfig = this.state.config;
    newConfig['series'][0].data = newData;
    var chart = $('#container').highcharts();
    chart.series[0].setData(newData);
    this.state.config = newConfig;

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
                   onMouseUp={this.handleMouseUp.bind(this,(this,'currentAge'))}>
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
                   onMouseUp={this.handleMouseUp.bind(this,(this,'retirementAge'))}>
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
                   onChange={this.handleChange.bind(this,'currentSalary')}>
            </input> 
          </li>
          <li style={style.sliders}>
            <h3>Total Assets: </h3>
            <input type="number"
                   readonly="true"
                   maxlength="8"
                   value={this.state.totalAssets} 
                   onChange={this.handleChange.bind(this,'totalAssets')}>
            </input>
            
          </li>
        </ul>
        
        <AssetsGraph config={this.state.config}/>
      </div>
    )
  }
});


var style = {
  sliders: {
    "display": "inline-block",
    "padding-right": "40px"
  }
}

module.exports = FriendsContainer;