const functions = {
    elemKeyGen: (keyArray=[]) => {
        let genKey = Math.random().toString(36).substring(2);
        while(keyArray.includes(genKey)){
            genKey = Math.random().toString(36).substring(2);
        }
        keyArray.push(genKey);
        return genKey;
    },
    AvantPointGet: (options = [], callback = () => {}) => {
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
}

export default functions;