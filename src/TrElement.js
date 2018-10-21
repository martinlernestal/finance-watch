import React from "react";

class TrElement extends React.Component {
    mapPropsToTDs(){
        let tdArray = [];
        for (const key in this.props) {
            if (this.props.hasOwnProperty(key)) {
                const element = this.props[key];
                tdArray.push(<td>{element}</td>);
            }
        }
        return tdArray;
    }
    render() {
        return (
            <tr>{this.mapPropsToTDs()}</tr>
        );
    }
}

export default TrElement;