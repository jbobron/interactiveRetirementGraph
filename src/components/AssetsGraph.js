var React = require('react');
var Highcharts = require('react-highcharts');

var AssetsGraph = React.createClass({
  shouldComponentUpdate: function(nextProps) { //if there is a change to this.props.config return true, else return false
    return nextProps.config.series[0].data !== this.props.config.series[0].data || nextProps.config.xAxis.categories !== this.props.config.xAxis.categories;
  },
  render: function(){
    return (
      <div>
        <h3>Your Assets</h3>
        <Highcharts id="container" config={this.props.config}/>
      </div>
    )
  }
});


var config = {
  xAxis: {
    categories: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119]
  },
  series: [{
    data: [8000, 9261, 10648, 12167, 13824, 15625, 17576, 19683, 21952, 24389, 27000, 29791, 32768, 35937, 39304, 42875, 46656, 50653, 54872, 59319, 64000, 68921, 74088, 79507, 85184, 91125, 97336, 103823, 110592, 117649, 125000, 132651, 140608, 148877, 157464, 166375, 175616, 185193, 195112, 205379, 216000, 226981, 238328, 250047, 262144, 274625, 287496, 300763, 314432, 328509, 343000, 357911, 373248, 389017, 405224, 421875, 438976, 456533, 474552, 493039, 512000, 531441, 551368, 571787, 592704, 614125, 636056, 658503, 681472, 704969, 729000, 753571, 778688, 804357, 830584, 857375, 884736, 912673, 941192, 970299, 1000000, 1030301, 1061208, 1092727, 1124864, 1157625, 1191016, 1225043, 1259712, 1295029, 1331000, 1367631, 1404928, 1442897, 1481544, 1520875, 1560896, 1601613, 1643032, 1685159]
  }]
};


//chart.series[0].data[0].update(y);


//http://jsfiddle.net/gh/get/jquery/1.7.2/highslide-software/highcharts.com/tree/master/samples/highcharts/members/point-update-column/

// var graphdata = generateData({this.props});
// var graphdata = generateData();
// function generateData() {
//   var obj = {}
//   var values = [];
//   for(var i = 22; i < 120; i++) {
//     // var yval = calcChange()
//     var target = Math.pow(i,2)
//     values.push({x: i, y:target})
//   }
//   obj['name'] = "series1"
//   obj['values'] = values;
//   obj['strokeWidth'] = 3;

//   return obj;
//   //create an array of objects with x and y values
//   //each object represents a year

// }

// function calcChange(principle, rateOfInterest, years) {
//   var e = 2.71828;
//   return principle*Math.pow(e,(rateOfInterest*years));
// }

module.exports = AssetsGraph;


/*

x-axis: grab current age and lifeExpectency from props and set as x min and max
y-axis: min=current assets max= principle *  2.71828^(rate of interest * years)

*/
