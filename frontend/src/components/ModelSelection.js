import React, {Component} from "react";
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Sketch from './Sketch';
// import sketch from "./Sketch";

class ModelSelection extends Component {

    constructor(){
        super();
        this.state = {
            model : ""
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event){
        this.setState({ model : event.target.value });
    }

    render(){
        const submenu = (
            <Menu>
                <Menu.Item>
                    <button value="linear-reg" onClick={this.handleClick}>
                        Linear Regression
                    </button>
                </Menu.Item>
                <Menu.Item>
                    <button value="poly-reg" onClick={this.handleClick}>
                         Polynomial Regression
                    </button>
                    
                </Menu.Item>
            </Menu>
        )
        const menu = (
            <Menu>
                <Menu.Item >
                    <Dropdown overlay={submenu} placement="bottomLeft">
                        <Button icon={<DownOutlined/>}>
                            Regression
                        </Button>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item>
                    <button value="classification" onClick={this.handleClick}>
                        Classification
                    </button>
                </Menu.Item>
            </Menu>
        );
        
        return (
            <div className='todo-item'>
                <Dropdown overlay={menu} placement="bottomLeft" >
                
                 <Button icon={<DownOutlined/>}>
                        Select Model
                    </Button>
                </Dropdown>
                <div >
                <Sketch model_selection={this.state.model} />
                </div>
            </div>
        );
    }
}

export default ModelSelection;