import React from "react";

class KeyField extends React.Component {
    render(){
        return(
            <input type="password" 
                className={this.props.className} 
                onChange={this.props.keyHandler}
                value={this.props.keyValue}>
            </input>
        );
    }
}

export default KeyField;