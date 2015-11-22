var React = require("react");

var CurrentAge = React.createClass({
  render: function(){
    return (    
      <li style={this.props.style.sliders}>
        <h3>Current Age: {this.props.currentAge}</h3>
        <input type="range"
               min="20"
               max="50"
               step="1"
               value={this.props.currentAge}
               onChange={this.props.handleChange.bind(null,'currentAge')} 
               onMouseUp={this.props.handleAgeRangeChange.bind(null,'currentAge')}>
        </input>
      </li>
    )
  }
})

module.exports = CurrentAge;

