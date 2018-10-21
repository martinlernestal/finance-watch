import React from "react";

class SubmitBtn extends React.Component {
    render(){
        return (
            <button className={this.props.className} onClick={this.props.submitHandler}>Get Data</button>
        );
    }
}

export default SubmitBtn;
