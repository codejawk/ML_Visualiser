import { Row, Col } from 'antd';
import React, {Component} from "react";
import './Layout.css';
import ModelSelection from './ModelSelection';

class Layout extends Component {
    render(){
        return (    
            <Row>
                <Col className="side-bar" span={5}>
                    <ModelSelection />
                </Col>
                <Col className="main-content" span={14}>col</Col>
                <Col className="side-bar" span={5}>col</Col>
            </Row>
        );
    }
}

export default Layout;