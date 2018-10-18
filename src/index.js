import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// det är hit all metadata ska komma
class MetaData extends React.Component {
    initDivs(){
        let divs = [];
        for (const key in this.props) {
            if (this.props.hasOwnProperty(key)) {
                const element = this.props[key];
                divs.push(<div><h3>{key}</h3> {element}</div>);
            }
        }
        return divs;
    }
    render() {
        return (
            <div>
                {this.initDivs()}
            </div>
        );
    }
}

class ThElement extends React.Component {
    mapPropsToTHs(){
        let thArray = [<th></th>];
        for (const key in this.props) {
            if (this.props.hasOwnProperty(key)) {
                const element = this.props[key];
                thArray.push(<th>{element}</th>);
            }
        }
        return thArray;
    }
    render() {
        return (
            <tr>{this.mapPropsToTHs()}</tr>
        );
    }
}

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

class EquityTable extends React.Component {
    render () {
        return(
            <div>
                <table className={this.props.className}>
                    <thead>
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
            apiKey: "LE7Z3SCLCV6X6QHZ",
            metaData: "",
            bodyData: "",
            headData: "",
            tBody: [],
            tHead: [],
            elementKeys:[]
        }
    }

    elemKeyGen(keyArray=[]){
        let genKey = Math.random().toString(36).substring(2);
        while(keyArray.includes(genKey)){
            genKey = Math.random().toString(36).substring(2);
        }
        keyArray.push(genKey);
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
                    let headData = Object.keys(bodyData[Object.keys(bodyData)[0]]).map(th => th.split(".")[1].slice(1)); 
                    this.setState({
                        metaData: metaData,
                        bodyData: bodyData,
                        headData: headData
                    });
                    this.initTable();
                });    
            } else {
                alert("You have to enter a key!");
            }
        } else {
            alert("You have to name a symbol!")
        }
    }

    initTable(){
        this.setState({
            tBody: this.getTBody(),
            tHead: this.getTHead()
        });
    }

    getTBody(){
        let bodyArray = [];
        let genKeys = [];
        for (const key in this.state.bodyData) {
            if (this.state.bodyData.hasOwnProperty(key)) {
                const element = this.state.bodyData[key];
                let genKey = this.elemKeyGen(genKeys);
                bodyArray.push(
                    <TrElement time={key} key={genKey} {...element} />
                );
            }
        }
        return bodyArray;
    }
    getTHead(){
        let genKey = this.elemKeyGen([]);
        return <ThElement key={genKey} {...this.state.headData} />;
    }

    render() {
        return(
            <div>
                <SearchField className={"symbol-search-field"} searchHandler={this.updateInputValue.bind(this)}/>
                <SubmitBtn className={"symbol-search-submit"} submitHandler={this.submitHandler.bind(this)}/>
                <KeyField className={"key-field"} keyHandler={this.keyHandler.bind(this)}/>
                <MetaData {...this.state.metaData}/>
                <EquityTable tableHead={this.state.tHead} tableBody={this.state.tBody} />
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
  