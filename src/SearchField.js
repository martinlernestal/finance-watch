import React from "react";

class SearchField extends React.Component {
    render(){
        return(
            <input type="text" 
                className={this.props.className} 
                onChange={this.props.searchHandler}>
            </input>
        );
    }
}

export default SearchField;