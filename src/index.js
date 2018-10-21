import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

import functions from "./functions.js";

import MetaData from "./MetaData.js";
import ThElement from "./ThElement.js";
import TrElement from "./TrElement.js";
import EquityTable from "./EquityTable.js";
import SearchField from "./SearchField.js";
import KeyField from "./KeyField.js";
import SubmitBtn from "./SubmitBtn.js";
import SearchArea from "./SearchArea.js";

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
            tHead: []
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

    sortMetaData(metaData){
        let metaDataObjValues = Object.values(metaData);
        metaData = [metaDataObjValues[1], 
                    metaDataObjValues[2]];
        return metaData;
    }

    sortHeadData(bodyData){
        return Object.keys(bodyData[Object.keys(bodyData)[0]])
                .map(th => 
                        th.split(".")[1].slice(1));
    }

    submitHandler(){
        if(typeof this.state.searchValue !== "undefined" && this.state.searchValue !== ""){    
            if(typeof this.state.apiKey !== "undefined" && this.state.apiKey !== ""){ 
                functions.AvantPointGet({
                    function: "TIME_SERIES_DAILY_ADJUSTED",
                    symbol: this.state.searchValue,
                    apikey: this.state.apiKey
                }, (response)=> {
                    let data = JSON.parse(response);
                    let metaData = this.sortMetaData(data["Meta Data"]);
                    let headData = this.sortHeadData(data["Time Series (Daily)"]);
                    let bodyData = data["Time Series (Daily)"];
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
                let genKey = functions.elemKeyGen(genKeys);
                bodyArray.push(
                    <TrElement time={key} key={genKey} {...element} />
                );
            }
        }
        return bodyArray;
    }
    getTHead(){
        let genKey = functions.elemKeyGen([]);
        return <ThElement key={genKey} {...this.state.headData} />;
    }
    render() {
        return(
            <div>
                <SearchArea>
                    <MetaData {...this.state.metaData}/>
                    <br/>
                    <SearchField searchHandler={this.updateInputValue.bind(this)}/>
                    <br/>
                    <KeyField keyHandler={this.keyHandler.bind(this)} keyValue={this.state.apiKey}/>
                    <br/>
                    <SubmitBtn submitHandler={this.submitHandler.bind(this)}/>
                    <br/>
                </SearchArea>
                <EquityTable tableHead={this.state.tHead} tableBody={this.state.tBody} />
            </div>
        );
    }
}

ReactDOM.render(
    <MainFrame />,
    document.getElementById('root')
  );
  