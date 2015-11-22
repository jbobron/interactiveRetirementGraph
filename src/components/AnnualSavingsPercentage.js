var React = require("react");
var CompanyMatchPercentage = require('./CompanyMatchPercentage');


var AnnualSavingsPercentage = React.createClass({
  render: function(){
    return ( 
      <ul style={this.props.style.sliders}>   
        <li style={this.props.style.sliders}>
          <h3>Annual Savings Percentage: {this.props.annualSavingsPercentage} %</h3>
          <input type="range"
                 min="0"
                 max={this.props.maxSavingsPercentage}
                 step="1"
                 value={this.props.annualSavingsPercentage}
                 onChange={this.props.handleChange.bind(null,'annualSavingsPercentage')} 
                 onMouseUp={this.props.handleMouseUp.bind(null,'annualSavingsPercentage')}>
          </input>
        </li>
        <CompanyMatchPercentage {...this.props} handleChange={this.props.handleChange} handleMouseUp={this.props.handleMouseUp}/>
      </ul>
    )
  }
})

module.exports = AnnualSavingsPercentage;
