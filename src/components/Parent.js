var React = require('react');
var ShowList = require('./Child');

var FriendsContainer = React.createClass({
  getInitialState: function(){
    return {
      currentAge: 20,
      retirementAge: 80,
      currentSalary: 0,
      annualSavings: 0
    }
  },
  render: function(){
    return (
      <div>
        <h1> React Starter Kit! </h1>
        <ul id="irg-sliders" style={style.sliders}>
          <li style={style.sliders}>
            <h3>Current Age: {this.state.currentAge}</h3>
            <input type="range" id="sliderBar" min="0" max="100" step="1" value={this.state.currentAge}></input>
          </li>
          <li style={style.sliders}>
            <h3>Retirement Age: {this.state.retirementAge}</h3>
            <input type="range" id="sliderBar" min="0" max="100" step="1" value={this.state.retirementAge}></input>
          </li>
          <li style={style.sliders}>
            <h3>Annual Savings: {this.state.annualSavings}</h3>
            <input type="range" id="sliderBar" min="0" max="100" step="1" value={this.state.annualSavings}></input>
          </li>
        </ul>
        
        <ShowList names={this.state.friends} />
      </div>
    )
  }
});


var style = {
  sliders: {
    display: "inline-block"
  }
}

module.exports = FriendsContainer;