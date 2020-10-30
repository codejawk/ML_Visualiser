import React, { Component } from 'react';
import { Slider ,Col} from 'antd';

export class LearningRate extends Component {

    constructor(){
        super();
        this.state = {
            learn_rate : 0
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value){
        this.setState({
            learn_rate : value
        });
        this.props.handleChange(this.state.learn_rate);
    }

    formatter(value) {
        return `${value}%`;
    }

    render() {
        const marks = {
            0.1: {style: {
                  color: '#696969',
                  },label: <small>0.1</small>,},
            0.4: {style: {
              color: '#696969',
              },label: <small>0.4</small>,},
            0.8: {style: {
              color: '#696969',
              },label: <small>0.8</small>,},
            1.2: {style: {
              color: '#696969',
              },label: <small>1.2</small>,},
            1.6: {style: {
              color: '#696969',
              },label: <small>1.6</small>,},
            2.2:  {style: {
              color: '#696969',
              },label: <small>2.2</small>,},
            2.6:  {style: {
              color: '#696969',
              },label: <small>2.6</small>,},   
            3.2:  {style: {
                color: '#696969',
                },label: <small>3.2</small>,},
            4: {
              style: {
                color: '#f50',
              },
              label: <strong>4</strong>,
            },
          };

        console.log(this.state.learn_rate);
        
        return (
            <div>
            <p>Learning Rate</p>
            <Col min={1} max={5} span ={12} offset={6}>
                <Slider min={0} max={4} marks={marks} onChange={this.handleChange} step={null}/>
                </Col>
            </div>
        )
    }
}

export default LearningRate;
