var React = require("react");

var StartingAssets = React.createClass({
  render: function(){
    return (    
      <li style={this.props.style.sliders}>
        <h3 style={this.props.style.text}>Starting Assets: $ {this.props.startingAssets}</h3>
        <input type="number"
               readonly="true"
               maxlength="8"
               value={this.props.startingAssets} 
               onChange={this.props.handleChange.bind(null,'startingAssets')}
               handleKeyDown={this.props.handleKeyDown.bind(null,'startingAssets')}
               onBlur={this.props.handleOnBlur.bind(null,'startingAssets')}>
        </input>
      </li>
    )
  }
})

module.exports = StartingAssets;
