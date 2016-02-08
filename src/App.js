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
      this.socket.on('test', function(data) {
        var ori = parseFloat(JSON.parse(data).ori);
        var oriArray = that.state.data.slice();
        oriArray.push(ori);
        that.setState({data: oriArray});
      })
    }

    render() {
        return (
            <Sparklines data={this.state.data} limit={20}>
                <SparklinesLine color="#1c8cdc" />
                <SparklinesSpots />
            </Sparklines>
        );
    }
}
