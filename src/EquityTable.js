import React from "react";

class EquityTable extends React.Component {
    render () {
        return(
            <div>
                <table className={this.props.className}>
                    <thead className={"thead-dark"}>
                        {this.props.tableHead}
                    </thead>
                    <tbody>
                        {this.props.tableBody}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default EquityTable;