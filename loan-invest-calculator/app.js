//Listen submit
document.getElementById("loan-form").addEventListener('submit',function(e){
  
  //Hide result
  document.getElementById('results').style.display ='none';

  //Show loader
  document.getElementById('loading').style.display ='block';
  setTimeout(calculateResults,2000);

  e.preventDefault();
});

//function calculate Result
function calculateResults(e){
  //console.log("submit");
  // UI Vars
  const amount =  document.getElementById("amount");
  const size = document.getElementById("size");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyRent = document.getElementById("rent-month");
  const feeCost = document.getElementById("fees-cost");
  
  const monthlyPayment =  document.getElementById("monthly-payment");
  const grossYield =  document.getElementById("gross-yield");
  const netYield = document.getElementById("net-yield");
  const cashFlow = document.getElementById("cash-flow");
  const m2Price = document.getElementById("m-price");
  const totalPayment =  document.getElementById("total-payment");
  const totalInterest =  document.getElementById("total-interest");
  const totalRent = document.getElementById("total-rent");

  const principal = parseFloat(amount.value);

  //console.log(principal)
  const fees = parseFloat(feeCost.value);
  //console.log(fees)
  const calculateRent = parseFloat(monthlyRent.value) * 12;
  //console.log(calculateRent);
  const calculateInterest = parseFloat(interest.value) / 100 / 12;
  //console.log(calculateInterest)
  const calculatePayment = parseFloat(years.value) * 12;
  //console.log(calculatePayment)
  
  //Compute Monthly Payment
  const x = Math.pow(1 + calculateInterest, calculatePayment);
  const monthly = (principal * x * calculateInterest) / (x-1);

  //Compute price per square
  const priceSquare = parseFloat(amount.value / size.value).toFixed(2);
  if(isFinite(monthly)){
    let currency = " €";
    let metreca = " m²";
    let pourcen = " %";
    let notDefined = "Not defined";
    monthlyPayment.value = parseFloat(monthly.toFixed(2)).toLocaleString() + currency;

    totalPayment.value = parseFloat((monthly * calculatePayment).toFixed(2)).toLocaleString() + currency;

    //totalPayment.value = parseFloat(totalPayment.value).toLocaleString()
    if(isFinite(priceSquare)){
      console.log(priceSquare.toLocaleString())
      m2Price.value =  parseFloat(priceSquare).toLocaleString() + currency;
    }else{
      m2Price.value = notDefined;
      
    }
    
    if(monthlyRent.value.length !==0){
      cashFlow.value = parseFloat((monthlyRent.value - monthly).toFixed(2)).toLocaleString() + currency;
    }else{
      cashFlow.value = notDefined;
    }
    
    totalInterest.value = parseFloat((monthly * calculatePayment) - principal.toFixed(2)).toLocaleString() + currency;

    if(monthlyRent.value.length !== 0){
      grossYield.value = ((calculateRent / principal  ) * 100).toFixed(2) + pourcen;
      netYield.value = ( (calculateRent / (monthly * calculatePayment + fees) ) * 100).toFixed(2) + pourcen;
      totalRent.value = calculateRent.toLocaleString() + currency;
    }else{
      grossYield.value = notDefined;
      totalRent.value = notDefined;
      netYield.value = notDefined;
    }
    
    //Show result
    document.getElementById('results').style.display ='block';

    //Hide result
    document.getElementById('loading').style.display ='none';
  }else{
    showError("Please Check your number");
  }
}
function showError(error){
  //Hide result
  document.getElementById('results').style.display ='none';

  //Show loader
  document.getElementById('loading').style.display ='block';
  //Create a div
  const errorDiv = document.createElement('div');

  //Get element
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Create text div
  errorDiv.appendChild(document.createTextNode(error));

  //Add class
  errorDiv.className = "alert alert-danger";

  //Insert error above heading
  card.insertBefore(errorDiv, heading);

  //Clear Error after 3s
  setTimeout(clearError, 3000)
}
//Clear error
function clearError(){
  
  document.querySelector('.alert').remove();
}