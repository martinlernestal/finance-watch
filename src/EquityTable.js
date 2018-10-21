import React from "react";

class EquityTable extends React.Component {
    render () {
        return(
            <div>
                <table className="table table-dark">
                    <thead className="thead-dark">
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