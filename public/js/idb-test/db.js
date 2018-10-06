const indexedDB  = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
var db;
var currencies;
initDb();

function initDb() {

    const apicurrencies=getCurrency();
    var request = indexedDB.open("currencyconvertdb", 1);  
    request.onsuccess = function (evt) {
        db = request.result;                                                            
    };

    request.onerror = function (evt) {
        console.log("IndexedDB error: " + evt.target.errorCode);
    };

    request.onupgradeneeded = function (evt) {                   
        var objectStore = evt.currentTarget.result.createObjectStore("currencydb", { keyPath: "id", autoIncrement: true });

        objectStore.createIndex("currencyName", "currencyName.currencyName", { unique: false });
        objectStore.createIndex("id", "id", { unique: true });

        // Store values in the newly created objectStore.  
        for (i in currencies) {
            objectStore.add(currencies[i]);
        }
    };

}
  function getCurrency(){

      let dropdownFrom = document.getElementById('fromCurrency');
    dropdownFrom.length = 0;
    let dropdownTo= document.getElementById('toCurrency');
    dropdownTo.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose Currency';

    let currencyArray=[];
const url="https://free.currencyconverterapi.com/api/v5/currencies";

fetch(url)
.then((response) =>{
return response.json();
})
.then((results) =>{
    console.log(results.results);
    currencies=results.results;
     
for(data in results.results){
    let iVal=`${results.results[data].currencyName}: ${' '} ${results.results[data].id}`;
    currencyArray.push(data);               
}
    let sortedCurrency=currencyArray.sort();
    console.log(sortedCurrency);
for(let sortedData=0;sortedData<sortedCurrency.length;sortedData++){
    dropdownFrom.innerHTML += `<option>${sortedCurrency[sortedData]}</option>`;
    dropdownTo.innerHTML += `<option>${sortedCurrency[sortedData]}</option>`;

}
    

}).catch(error => {
    //console.log('Error', error);
    //retrieve from db
    const transaction = db.transaction("currencydb", IDBTransaction.READ_WRITE);
    const objectStore = transaction.objectStore("currencydb");
const currencyArray=[];
    const request = objectStore.openCursor();
    request.onsuccess = function(event) {  
        var cursor = event.target.result;  
        if (cursor) { 
            let ckey=cursor.key;
            let iVal=`${cursor.value['currencyName']}: ${' '} ${cursor.value['id']}`;
    currencyArray.push(iVal); 
    dropdownFrom.innerHTML += `<option>${ckey}</option>`;
    dropdownTo.innerHTML += `<option>${ckey}</option>`;   
            cursor.continue();  
        
        } 
      
        else {  
            console.log("No Currency found!");  
        } 
        
    };  
  
     
  });
  
}