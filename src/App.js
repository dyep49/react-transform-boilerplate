import React, { Component } from 'react';
import { Sparklines, SparklinesBars, SparklinesLine, SparklinesNormalBand, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';
import io from 'socket.io-client';


export class App extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
        // setInterval(() =>
        //     this.setState({
        //         data: this.state.data.concat([boxMullerRandom()])
        //     }), 100);
    }

    componentWillMount() {
      this.socket = io();
      this.socket.on('connect', function() {
        console.log('connected to websocket server in component');
      });
    }

    componentDidMount() {
      var that = this;
      this.socket.on('test', this.updateData.bind(this));     
    }

    render() {
        return (
            <Sparklines data={this.state.data} limit={20}>
                <SparklinesLine color="#1c8cdc" />
                <SparklinesSpots />
            </Sparklines>
        );
    }
    
    updateData(data) {
      var parsedData = JSON.parse(data);
      this.setState({
        data: this.state.data.concat([parsedData.ori])
      })
    }
}
