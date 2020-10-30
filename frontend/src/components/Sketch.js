import React, { Component } from "react";
// import PolynomialRegression from './PolynomialRegression';
// import LinearRegression from './LinearRegression';
// import Classification from './Classification';
import Degree from './Degree';
import LearningRate from "./LearningRate";

class sketch extends Component {

  constructor(){
    super();
    this.state = {
      degree : 0,
      learn_rate : 0,
      accuracy : 0
    }
    this.handleDegree = this.handleDegree.bind(this);
    this.handleLearnRate = this.handleLearnRate.bind(this);
    this.handleAccuracy = this.handleAccuracy.bind(this);
  }

  handleDegree(value){
    this.setState({degree : value});
  }

  handleLearnRate(value){
    this.setState({learn_rate : value});
  }

  handleAccuracy(value){
    this.setState({ accuracy : value});
  }

  render() {

    // console.log(this.props.model_selection);
    // console.log(this.state.degree);
    const comp = () => {
  

      if(this.props.model_selection=="linear-reg"){
        return (
          <div>
            {/*<LinearRegression handleAccuracy={this.handleAccuracy} />*/}
            <h3 >{this.state.degree}</h3>
            <Degree handleChange={this.handleDegree}/>
            <h3 className='accu'>{this.state.accuracy}</h3>
          </div>
        )
      }else if(this.props.model_selection == "poly-reg"){
        return (
          <div>
         {/*   <PolynomialRegression handleAccuracy={this.handleAccuracy} />*/}
            <h3 >{this.state.degree}</h3>  
            <Degree handleChange={this.handleDegree}/>
            <h3 >{this.state.learn_rate}</h3>
            <LearningRate handleChange={this.handleLearnRate}/>
            <h3 style={{marginLeft:"1000px",marginBottom:'5000px'}}>Accuracy:  {this.state.accuracy}</h3>
           
          </div>
        )
      }else{
        return (
          <div>
         {/*    <Classification handleAccuracy={this.handleAccuracy} />*/}
            <h3 style={{marginLeft:"1500px"}}>{this.state.accuracy}</h3>
          </div>
        )
      }

   
    }
   
    return (
      <div>

        {comp()}
      </div>
    );
  }
}

export default sketch;
