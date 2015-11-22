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
               onChange={this.props.handleChange.bind(this,'currentSalary')}
               handleKeyDown={this.props.handleKeyDown.bind(this,(this,'currentSalary'))}>
        </input> 
      </li>
      <AnnualSavingsPercentage {...this.props} handleChange={this.props.handleChange} handleMouseUp={this.props.handleMouseUp}/>
      </ul>
    )
  }
})

module.exports = CurrentSalary;


/*
any time i inc currently salary
i need to re-adjust max annualSavingsMax

-if the user has annualSavings value at zero or below annualSavingsMax keep it at current Value
-if the user has annualSavings value above the annualSavingsMax 
  -set annualSaving value to recalculated max

18k 









*/

