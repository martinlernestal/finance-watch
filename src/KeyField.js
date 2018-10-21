import React from "react";

class KeyField extends React.Component {
    render(){
        return(
            <input type="password" 
                className="form-text" 
                onChange={this.props.keyHandler}
                value={this.props.keyValue}>
            </input>
        );
    }
}

export default KeyField;