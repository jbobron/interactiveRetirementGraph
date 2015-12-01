var React = require("react");
var AnnualSavingsPercentage = require('./AnnualSavingsPercentage');

var CurrentSalary = React.createClass({
  getValue: function(){
    //{this.props.currentSalary} 
    // var result = numberWithCommas(Number(this.props.currentSalary))
    // console.log(result, result.contructor)
    // return result;
    return this.props.currentSalary
  },
  render: function(){
    return ( 
      <ul style={this.props.style.ul}>   
        <AnnualSavingsPercentage {...this.props} handleChange={this.props.handleChange} handleMouseUp={this.props.handleMouseUp}/>
        <li className="slidersReSize" style={this.props.style.slider}>
          <h5 style={this.props.style.text}>Current Salary: $ {this.props.currentSalary}</h5>
          <input type="number"
                 className="slidersReSize"
                 readonly="true"
                 maxlength="8"
                 style={this.props.style.input}
                 value={this.getValue()} 
                 onChange={this.props.handleChange.bind(null,'currentSalary')}
                 onBlur={this.props.handleOnBlur.bind(null,'currentSalary')}
                 handleKeyDown={this.props.handleKeyDown.bind(null,'currentSalary')}>
          </input> 
        </li>
      </ul>
    )
  }
})

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


module.exports = CurrentSalary;
