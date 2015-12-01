var React = require("react");

var StartingAssets = React.createClass({
  render: function(){
    return (    
      <li className="slidersReSize" style={this.props.style.slider}>
        <h5 style={this.props.style.text}>Starting Assets: $ {this.props.startingAssets}</h5>
        <input type="number"
               className="slidersReSize"
               readonly="true"
               maxlength="8"
               style={this.props.style.input}
               stype={this.props.lastSlider}
               value={this.props.startingAssets} 
               onChange={this.props.handleChange.bind(null,'startingAssets')}
               handleKeyDown={this.props.handleKeyDown.bind(null,'startingAssets')}
               onBlur={this.props.handleOnBlur.bind(null,'startingAssets')}>
        </input>
      </li>
    )
  }
})

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


module.exports = StartingAssets;
