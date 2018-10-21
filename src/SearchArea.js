import React from "react";

class SearchArea extends React.Component{
    render(){
        return(
            <div className="search-area table-dark form-group">
                {this.props.children}
            </div>
        );
    }
}

export default SearchArea;