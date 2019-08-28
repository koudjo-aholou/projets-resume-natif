//Listen submit
document.getElementById("loan-form").addEventListener('submit',calculateResults);

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

  if(isFinite(monthly)){
    let currency = " €";
    let metreca = " m²";
    let pourcen = " %";
    monthlyPayment.value = parseFloat(monthly.toFixed(2)).toLocaleString() + currency;
    totalPayment.value = parseFloat((monthly * calculatePayment).toFixed(2)).toLocaleString() + currency;
    //totalPayment.value = parseFloat(totalPayment.value).toLocaleString()
    totalRent.value = calculateRent.toLocaleString() + currency;
    m2Price.value =  parseFloat((amount.value / size.value).toFixed(2)).toLocaleString() + metreca;
    cashFlow.value = parseFloat((monthlyRent.value - monthly).toFixed(2)).toLocaleString() + currency;
    totalInterest.value = parseFloat((monthly * calculatePayment) - principal.toFixed(2)).toLocaleString() + currency;
    grossYield.value = ((calculateRent / principal  ) * 100).toFixed(2) + pourcen;
    netYield.value = ( (calculateRent / (monthly * calculatePayment + fees) ) * 100).toFixed(2) + pourcen;
  }else{
    showError("Please Check your number");
  }

  e.preventDefault();
}
function showError(error){
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