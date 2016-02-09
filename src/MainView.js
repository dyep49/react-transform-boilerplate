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
    const maxDataPoints = 20;

    var updatedData = this.state.data[tagId] ? this.state.data : undefined
  
    if(this.state.data[tagId] === undefined) {
      updatedData = this.createTag(tagId, this.state.data)
    }

    updatedData = this.updateTag(tagId, updatedData, ori, maxDataPoints);

    this.setState({
      data: updatedData
    })
  }

  createTag(tagId, tagsData) {
    return update(tagsData, { [tagId]: {$set: [] }})
  }

  updateTag(tagId, tagsData, ori, maxDataPoints) {
    var updatedData = update(tagsData, { [tagId]: {$push: [ori]}});
    
    if(tagsData[tagId].length > maxDataPoints) {
      updatedData = update(updatedData, {[tagId]: {$splice: [[0,1]]}});
    }

    return updatedData
  }
  
  render() {
    return (
      <ChartList chartData={this.state.data} />
    )
  }

}
