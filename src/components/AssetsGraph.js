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

module.exports = AssetsGraph;
