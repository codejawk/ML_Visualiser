import { Row, Col } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';

import React, {Component} from "react";
import './Layout.css';
import MainContent from './MainContent';
import Header from './Header'
import Footer from './Footer'
class Lout extends Component {
    render(){
        return (    
        <div>  
            <Layout>
              <Header>header</Header>
            <Layout>
            
                   <MainContent />
              </Layout>
                
                
              <Layout>   
              <Footer/>
              </Layout>

            </Layout>
       </div>
        );
    }
}

export default Lout;