


let dropdown = document.querySelectorAll(".dropdown select")
let btn = document.querySelector(".submit button")
let from_curr = document.querySelector(".from select");
let to_curr = document.querySelector(".to select")
let msg = document.querySelector(".msg")
let reverse_btn = document.querySelector(".reverse_btn")

for (let select of dropdown) {
    for (let currcode in countryList) {
        let options = document.createElement("option");
        if (select.name === "from_curr" && currcode === "USD") {
            options.selected = "selected";
        }
        else if (select.name === "to_curr" && currcode === "INR") {
            options.selected = "selected"
        }

        options.innerText = currcode;
        options.value = currcode;

        select.append(options);



    }
    select.addEventListener("change", (evt) => {
        changeflag(evt.target)
    })

}

const changeflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let new_src = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = new_src;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input")
    let amount_val = amount.value;
    console.log(amount_val);
    if (amount_val === "" || amount_val < 1) {
        amount_val = 1;
        amount.value = "1"
    }

    console.log(from_curr.value, to_curr.value)
  try{  let url = `https://api.frankfurter.app/latest?amount=${amount_val}&from=${from_curr.value}&to=${to_curr.value}`;

    let response = await fetch(url);

    let data = await response.json();
    let rate = data.rates[to_curr.value]

    let final_rate = rate;     

    msg.innerText = `${amount_val} ${from_curr.value} = ${final_rate} ${to_curr.value}`;

    console.log(final_rate);
  }
  catch(err){
    msg.innerText= "Currency not supported bhai"
    msg.style.color ="red"
    
  }
})

reverse_btn.addEventListener("click", ()=>{
   let tempVal = from_curr.value;
    from_curr.value = to_curr.value;
    to_curr.value = tempVal;
    changeflag(from_curr)
    changeflag(to_curr)

})




