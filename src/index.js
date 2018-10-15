import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// ett sök fält för att söka på symbol

// ett sökfält för att lägga in nyckeln i

// en tabell till att börja med som visar datan man får

// ska man passa hit all getdata?
    // eller ska man rendera detta upp i huvudfunktionen???... nej man borde rendera allt här... så man delar upp allt
class EquityTable extends React.Component {

    // när gör row så lägg key som unix timestamp ellern åt? eller bara gör en hash?
    constructor(props){
        super(props);
        this.state = {
            tHead: [],
            tBody: [],
            tableHeader: "",
            wholeTable: null
        }
    }

    getTBody(){
        /* 2018-05-24:
            1. open: "1086.9000"
            2. high: "1087.1200"
            3. low: "1072.3000"
            4. close: "1085.4500"
            5. adjusted close: "1085.4500"
            6. volume: "1030194"
            7. dividend amount: "0.0000"
            8. split coefficient: "1.0000" */

        console.log(this.props.tableBody);
    }

    getTHead(){
        /*  

       det man vill ha är symbol och last refreshed, och timezone kanske?
        
            1. Information: "Daily Time Series with Splits and Dividend Events", 
            2. Symbol: "GOOGL", 3. Last Refreshed: "2018-10-15 09:37:23", 
            4. Output Size: "Compact", 
            5. Time Zone: "US/Eastern"} 

        */
        console.log(this.props.tableHead);

        // sen ta this.props.tableBody[0]
    }

    // skapar hela tabellen, sen när den inte är null längre så printa den
    initiateTable(){
        if(Object.keys(this.props.tableBody).length > 0 && Object.keys(this.props.tableHead).length){
            this.getTHead();
            this.getTBody();

       }
    }

    render () {
        this.initiateTable();
        return(
            <table className={this.props.className}>
                <thead></thead>
                <tbody></tbody>
            </table>
        );
    }
}

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

class KeyField extends React.Component {
    render(){
        return(
            <input type="text" 
                className={this.props.className} 
                onChange={this.props.keyHandler}>
            </input>
        );
    }
}

class SubmitBtn extends React.Component {
    render(){
        return (
            <button className={this.props.className} onClick={this.props.submitHandler}>Get Data</button>
        );
    }
}

class MainFrame extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            searchValue: "",
            apiKey: "",
            metaData: "",
            bodyData: ""
        }
    }

    updateInputValue(event){
        if(event.target.value !== ""){
            let searchFVal = event.target.value;
            if(searchFVal.length > 0){
                searchFVal = searchFVal.toUpperCase();
                this.setState({
                    searchValue: searchFVal
                });
            }
        }
    }

    keyHandler(event){
        if(event.target.value !== ""){
            this.setState({
                apiKey: event.target.value
            });
        }
    }

    submitHandler(){
        if(typeof this.state.searchValue !== "undefined" && this.state.searchValue !== ""){    
            if(typeof this.state.apiKey !== "undefined" && this.state.apiKey !== ""){ 
                AvantPointGet({
                    function: "TIME_SERIES_DAILY_ADJUSTED",
                    symbol: this.state.searchValue,
                    apikey: this.state.apiKey
                }, (response)=> {
                    let data = JSON.parse(response);
                    let metaData = data["Meta Data"];
                    let bodyData = data["Time Series (Daily)"];
                    this.setState({
                        metaData: metaData,
                        bodyData: bodyData
                    });
                });    
            } else {
                alert("You have to enter a key!");
            }
        } else {
            alert("You have to name a symbol!")
        }
    }

    render() {
        return(
            <div>
                <SearchField className={"symbol-search-field"} searchHandler={this.updateInputValue.bind(this)}/>
                <SubmitBtn className={"symbol-search-submit"} submitHandler={this.submitHandler.bind(this)}/>
                <KeyField className={"key-field"} keyHandler={this.keyHandler.bind(this)}/>
                <EquityTable tableHead={this.state.metaData} tableBody={this.state.bodyData} />
            </div>
        );
    }
}

// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=GOOGL&apikey=LE7Z3SCLCV6X6QHZ

function AvantPointGet(options = [], callback = () => {}){
    let getUrl = "https://www.alphavantage.co/query?";
    if(typeof options !== "undefined"){
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                const option = options[key];
                getUrl += key+"="+option;
                if(key != "apikey"){
                    getUrl += "&";
                }
            }
        }
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", getUrl, true);
    xmlHttp.send(null);
}


ReactDOM.render(
    <MainFrame />,
    document.getElementById('root')
  );
  