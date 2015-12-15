var React = require("react");
var AnnualSavingsPercentage = require('./AnnualSavingsPercentage');

var CurrentSalary = React.createClass({
  getValue: function(){
    // if(!this.isMounted()) return 50000
    // var node = this.refs.aspInput.getDOMNode();
    // var val = this.props.currentSalary;
    // val = this.numberWithCommas(val);
    // val = "$" + val;
    // node.value = val;
    return this.props.currentSalary;
  },

  numberWithCommas: function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  render: function(){
    return ( 
      <ul style={this.props.style.ul}>   
        <AnnualSavingsPercentage {...this.props} handleChange={this.props.handleChange} handleMouseUp={this.props.handleMouseUp}/>
        <li className="slidersReSize" style={this.props.style.slider}>
          <h5 style={this.props.style.text}>Current Salary:</h5>
          <div>
          <span className="dollarSign" style={this.props.style.dollarSign}>$</span>
          <input type="number"
                 className="slidersReSize"
                 readonly="true"
                 maxlength="8"
                 ref="aspInput"
                 style={this.props.style.input}
                 value={this.getValue()} 
                 onChange={this.props.handleChange.bind(null,'currentSalary')}
                 onBlur={this.props.handleOnBlur.bind(null,'currentSalary')}
                 handleKeyDown={this.props.handleKeyDown.bind(null,'currentSalary')}>
          </input> 
          </div>
        </li>
      </ul>
    )
  }
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


module.exports = CurrentSalary;
