var React = require("react");

var RetirementAge = React.createClass({
  render: function(){
    return (    
      <li style={this.props.style.sliders}>
        <h3>Retirement Age: {this.props.retirementAge}</h3>
        <input type="range"
               min="40"
               max="70"
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
