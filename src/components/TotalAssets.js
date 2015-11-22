var React = require("react");

var TotalAssets = React.createClass({
  render: function(){
    return (    
      <li style={this.props.style.sliders}>
        <h3>Total Assets: $ {this.props.totalAssets}</h3>
        <input type="number"
               readonly="true"
               maxlength="8"
               value={this.props.totalAssets} 
               onChange={this.props.handleChange.bind(null,'totalAssets')}
               handleKeyDown={this.props.handleKeyDown.bind(null,'totalAssets')}>
        </input>
      </li>
    )
  }
})

module.exports = TotalAssets;