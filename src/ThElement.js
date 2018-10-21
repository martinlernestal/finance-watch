import React from 'react';

class ThElement extends React.Component {
    mapPropsToTHs(){
        let thArray = [<th>Time</th>];
        for (const key in this.props) {
            if (this.props.hasOwnProperty(key)) {
                const element = this.props[key];
                thArray.push(<th>{element.charAt(0).toUpperCase()+element.substr(1)}</th>);
            }
        }
        return thArray;
    }
    render() {
        return (
            <tr scope={"col"}>{this.mapPropsToTHs()}</tr>
        );
    }
}

export default ThElement;