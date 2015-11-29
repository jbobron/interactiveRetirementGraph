var React = require("react");

var Summary = React.createClass({
  // shouldComponentUpdate: function(nextProps) { //if there is a change to this.props.config return true, else return false
  //   console.log(nextProps.annualSavingsPercentage)
  //   return nextProps.annualSavingsPercentage !== this.props.annualSavingsPercentage;
  // },
  getYears: function(){
    return this.props.retirementAge - this.props.currentAge;
  },
  getAnnualSavings: function(){
    var totalFromAssets = this.props.currentSalary * this.props.annualSavingsPercentage / 100;
    var companyMatch = this.props.currentSalary * this.props.companyMatchPercentage / 100;
    return numberWithCommas((totalFromAssets + companyMatch).toFixed(2));
  },
  getTotalSavings: function(){
    var index = this.props.retirementAge - this.props.currentAge;
    // var targetVal = this.props.chart.series[0].data[index].constructor === Object ? this.props.chart.series[0].data[index]['y'] : this.props.chart.series[0].data[index];
    // return numberWithCommas(targetVal.toFixed(2));

    return this.props.totalSavings;
  },
  render: function(){
    console.log("reloading");
    return (    
      <div>
        <p>Over the next {this.getYears()} years, with an annual savings of ${this.getAnnualSavings()} and 
        starting assets of ${this.props.startingAssets}, you will generate ${this.getTotalSavings()}</p>
      </div>
        
    )
  }
})

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = Summary;
