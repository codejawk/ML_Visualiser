import React, { Component } from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense

let x = [];
let y = [];

let y1, y2;
let x_test = [], y_pred = [];

// const ws = new WebSocket("ws://localhost:8000/ws/visualizer/");

class LinearRegression extends Component {

  constructor(){
    super();
    this.state = {
      accuracy : 0
    }
  }

    setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(500, 500).parent(canvasParentRef);
    };
    
    draw = (p5 : p5Types) => {
    
        if(p5.mouseIsPressed){
          let xx=p5.map(p5.mouseX,0,p5.width,0,1)
          let yy=p5.map(p5.mouseY,0,p5.height,1,0)
          
          if(xx>=0 && xx<=1 && yy>=0 && yy<=1){
            x.push(xx);
            y.push(yy);
          }
        }
    
        p5.background(0);
    
        let obj = {
          type : "linear-reg",
          x_train: x,
          y_train: y,
        };
    
        // ws.send(JSON.stringify(obj, null, 1));
    
        p5.strokeWeight(8);
        p5.stroke(255);
        for (let i = 0; i < x.length; i++) {
          
          let px = p5.map(x[i], 0, 1, 0, p5.width);
          let py = p5.map(y[i], 0, 1, p5.height, 0);
          p5.point(px, py);
        }
        // ws.onmessage = (evt) => {
          const message = JSON.parse(evt.data);
          
          if(this.state.accuracy !== message["acc"]){
            this.setState({ accuracy : message["acc"]});
            this.props.handleAccuracy(this.state.accuracy);
          }
         
          y1 = p5.map(message["y_pred"][0], 0, 1, p5.height, 0);
    
          y2 = p5.map(message["y_pred"][1], 0, 1, p5.height, 0);
        };
        const lineX = [0, 1];
        let x1 = p5.map(lineX[0], 0, 1, 0, p5.width);
        let x2 = p5.map(lineX[1], 0, 1, 0, p5.width);
    
        p5.stroke(255);
        p5.strokeWeight(2);
        p5.line(x1, y1, x2, y2);
    
        ws.onclose = () => {
          console.log("disconnected");
        };
    
        
        document.oncontextmenu = function() { 
          return false;
        }
    } 
    
    render(){
        return( 
            <Sketch setup={this.setup} draw={this.draw} />
        );
    }
}

export default LinearRegression;