import React from "react";

class SearchField extends React.Component {
    render(){
        return(
            <input type="text" 
                className="form-text"
                onChange={this.props.searchHandler}>
            </input>
        );
    }
}

export default SearchField;