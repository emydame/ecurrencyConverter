class converterClass{

    
constructor(){
    
}

convertCurrency(amount,fromCurrency,toCurrency) {
    let resultDom=document.getElementById('displaybtn');
   let fCurrency = encodeURIComponent(fromCurrency);
    let tCurrency = encodeURIComponent(toCurrency);
    let query = fCurrency + '_' + tCurrency;
  
    const url='https://free.currencyconverterapi.com/api/v5/convert?q=' + query +'&compact=ultra';
    //const url=`https://free.currencyconverterapi.com/api/v5/convert?q=' ${query}'&compact=ultra`;
    fetch(url)
    .then((response) => response.json()) 
    .then((conversionValue)=> {
        console.log(conversionValue);    
        let total = conversionValue[query] * amount;
              total=(null, Math.round(total * 100) / 100);
        console.log(total);
        resultDom.innerHTML=total;
          
    }).catch(error => {
      console.log('Error', error);
    });;  



    
  }

}