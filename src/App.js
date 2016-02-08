import React, { Component } from 'react';
import { Sparklines, SparklinesBars, SparklinesLine, SparklinesNormalBand, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';


export class ChartList extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        var charts = Array(20).fill().map(function(_, i) {
          return (
              <Sparklines key={i} data={this.props.chartData} >
                  <SparklinesLine color="#1c8cdc" />
              </Sparklines>
          );

        }, this);
       return (
        <div>
          {charts}
        </div>
       )
    }
    
}
