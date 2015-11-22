var React = require("react");
var AnnualSavingsPercentage = require('./AnnualSavingsPercentage');

var CurrentSalary = React.createClass({
  render: function(){
    return ( 
      <ul style={this.props.style.sliders}>   
      <li style={this.props.style.sliders}>
        <h3>Current Salary: $ {this.props.currentSalary}</h3>
        <input type="number"
               readonly="true"
               maxlength="8"
               value={this.props.currentSalary} 
               onChange={this.props.handleChange.bind(null,'currentSalary')}
               handleKeyDown={this.props.handleKeyDown.bind(null,'currentSalary')}>
        </input> 
      </li>
      <AnnualSavingsPercentage {...this.props} handleChange={this.props.handleChange} handleMouseUp={this.props.handleMouseUp}/>
      </ul>
    )
  }
})

module.exports = CurrentSalary;
