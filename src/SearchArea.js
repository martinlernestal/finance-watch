import React from "react";
import functions from "./functions.js";

// såsom man borde lösa det är att skapa själva jsx:taggen här, och att detta bara är en liksom 

class SearchArea extends React.Component{
    render(){
        return(
            <div className={this.props.className + " table-dark"}>
                {this.props.children}
            </div>
        );
    }
}

export default SearchArea;