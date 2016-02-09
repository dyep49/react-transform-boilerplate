import React, { Component } from 'react';
import { Sparklines, SparklinesBars, SparklinesLine, SparklinesNormalBand, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';


export class ChartList extends Component {

    constructor(props) {
        super(props);
    }


    render() {
      var charts = [];

      Object.keys(this.props.chartData).forEach(function(key) {
        const badBend = 50
        var chartData = this.props.chartData[key];
        var color = chartData[chartData.length - 1] > badBend ? 'magenta' : '#00FF00'
        charts.push (
          <Sparklines width={200} height={100} key={key} data={chartData} >
            <SparklinesLine color={color} />
            <SparklinesReferenceLine type="custom" value={badBend} />
          </Sparklines>
        )
      }, this)

      return (
        <div>
          {charts}
        </div>
      )
    }
    
}
