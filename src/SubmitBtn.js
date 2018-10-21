import React from "react";

class SubmitBtn extends React.Component {
    render(){
        return (
            <button className="btn btn-light" onClick={this.props.submitHandler}>Get Data</button>
        );
    }
}

export default SubmitBtn;
