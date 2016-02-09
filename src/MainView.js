import React, { Component } from 'react';
import update from 'react-addons-update';
import { ChartList } from './App';
import IO from 'socket.io-client';

export class MainView extends Component {
     
  constructor(props) {
    super(props)
    this.state = { data: {} };
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
    const parsedData = JSON.parse(data);
    const ori = parsedData.ori;
    const tagId = parsedData.tag;

    
    // var updatedOriArray = this.state.data[tagId] ? this.state.data[tagId] : []
    
    // updatedOriArray.push(ori);

    // if(updatedOriArray.length > 20) {
    //   updatedOriArray.shift();
    // }

    // var updatedData = update(this.state.data, {
    //   [tagId]: {$set: updatedOriArray}
    // })

    var updatedData;

    if(this.state.data[tagId]) {
      updatedData = update(this.state.data, {
        [tagId]: {$push: [ori] }
      })

      if(this.state.data[tagId].length > 20) {
        updatedData = update(updatedData, {
          [tagId]: {$splice: [[0, 1]]}
        })
      }
    } else {
      updatedData = update(this.state.data, {
        [tagId]: {$set: [ori] }
      })
    }

    
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
