import React, { Component } from 'react';
import { Sparklines, SparklinesBars, SparklinesLine, SparklinesNormalBand, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';


export class ChartList extends Component {

    constructor(props) {
        super(props);
    }


    render() {
      var charts = [];
      Object.keys(this.props.chartData).forEach(function(key) {
        charts.push (
          <Sparklines key={key} limit={20} data={this.props.chartData[key]} >
            <SparklinesLine color="#1c8cdc" />
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
