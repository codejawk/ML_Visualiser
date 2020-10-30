import React from "react"

import ModelSelection from './ModelSelection'
const styles={
    color:"#FFFAF0",
    backgroundColor:"#008080",
    fontSize:'25px',


};

function MainContent() {
    return (
        <div className='todo-list'>
        <br></br>
        <br></br>
        <p className='neon'><b>Dataset</b></p>
        <p>Model Selection</p>
        <ModelSelection/>
            
        </div>
    )

}

export default MainContent




