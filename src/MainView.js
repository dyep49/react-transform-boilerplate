import React, { Component } from 'react';
import { ChartList } from './App';
import IO from 'socket.io-client';

export class MainView extends Component {
     
  constructor(props) {
    super(props)
    this.state = { data: [] };
  }

  componentWillMount() {
    this.socket = IO();
    this.socket.on('connect', function() {
      console.log('connected to websocket server in component');
    });
  }

  componentDidMount() {
    this.socket.on('test', this.updateData.bind(this));     
  }

  updateData(data) {
    var parsedData = JSON.parse(data);
    var updatedData = this.state.data.slice()
    
    if(this.state.data.length > 20) {
      updatedData.shift();
    }

    updatedData.push(parsedData.ori);
    console.log(updatedData);
    this.setState({
      data: updatedData
    })
  }
  
  render() {
    return (
      <ChartList chartData={this.state.data} />
    )
  }

}
