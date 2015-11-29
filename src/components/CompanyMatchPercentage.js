var React = require("react");

var CompanyMatchPercentage = React.createClass({
  render: function(){
    return (    
      <li style={this.props.style.sliders}>
        <h3 style={this.props.style.text}>Company Match Percentage: {this.props.companyMatchPercentage} %</h3>
        <input type="range"
               min="0"
               max="8"
               step="1"
               value={this.props.companyMatchPercentage}
               onChange={this.props.handleChange.bind(null,'companyMatchPercentage')} 
               onMouseUp={this.props.handleMouseUp.bind(null,'companyMatchPercentage')}>
        </input>
      </li>
    )
  }
})

module.exports = CompanyMatchPercentage;
