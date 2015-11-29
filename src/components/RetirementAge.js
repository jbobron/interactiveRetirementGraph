var React = require("react");

var RetirementAge = React.createClass({
  render: function(){
    return (    
      <li style={this.props.style.sliders}>
        <h3 style={this.props.style.text}>Retirement Age: {this.props.retirementAge}</h3>
        <input type="range"
               min="40"
               max="80"
               step="1"
               value={this.props.retirementAge}
               onChange={this.props.handleChange.bind(null,'retirementAge')} 
               onMouseUp={this.props.handleAgeRangeChange.bind(null,'retirementAge')}>
        </input>
      </li>
    )
  }
})

module.exports = RetirementAge;
