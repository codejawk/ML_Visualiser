import React, { Component } from 'react';
import { Slider, Col } from 'antd';

export class Degree extends Component {
    
    constructor(){
        super();
        this.state = {
            degree : 0
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value){
        this.setState({ degree : value });
        this.props.handleChange(this.state.degree);
    }
    
    render() {
        console.log(this.state.degree);
        const marks = {
            1 : '1',
            2 : '2',
            3 : '3',
            4 : '4',
            5 : '5'
        }
        return (
            <div>
            <p>Degree</p>
            <Col min={1} max={5} span ={12} offset={6}>
                <Slider min={1} max={5}  onChange={this.handleChange} marks={marks}/>
                </Col>
            </div>
        )
    }
}

export default Degree