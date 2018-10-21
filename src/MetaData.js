import React from 'react';

// dela upp i olika modules
class MetaData extends React.Component  {
    initDivs(){
        let divs = [];
        for (const key in this.props) {
            if (this.props.hasOwnProperty(key)) {
                const element = this.props[key];
                divs.push(<h1>{element}</h1>);
            }
        }
        return divs;
    }
    render() {
        return (
            <div className="search-metadata">
                {this.initDivs()}
            </div>
        );
    }
}

export default MetaData;
