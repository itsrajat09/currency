let from_curr = document.querySelector(".from select")
let to_curr = document.querySelector(".to select")
let dropdown = document.querySelectorAll(".dropdown select")
let reverse_btn = document.querySelector(".reverse_btn")
let btn = document.querySelector( ".submit button")
let amount = document.querySelector(".amount input")
let msg = document.querySelector(".msg")
let loader = document.querySelector("#loader")
for (let select of dropdown) {
    for (let currcode in countryList) {

        let options = document.createElement("option")
        if (select.name === "from_curr" && currcode === "USD") {
            options.selected = "selected"
        } else if (select.name === "to_curr" && currcode === "INR") {
            options.selected = "selected"
        }
        options.innerText = currcode;
        options.value = currcode;

        select.append(options)
    }
    select.addEventListener("change", (evt) => {
        changeflag(evt.target)
    })


}
const changeflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode]
    let new_src = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = new_src
}

reverse_btn.addEventListener("click", () => {
    let variable = from_curr.value;
    from_curr.value = to_curr.value;
    to_curr.value = variable;
    changeflag(to_curr);
    changeflag(from_curr);
})

 btn.addEventListener("click", async (evt) => {
    evt.preventDefault();


    loader.classList.remove("hidden")
    msg.classList.add("hidden")
    try{
   let amount_val = amount.value;
if(amount_val ==="" || amount_val <0){
    amount_val = 1;
    amount.value = "1"
   }
   console.log(from_curr.value,to_curr.value)
 let url = `https://api.frankfurter.app/latest?amount=${amount_val}&from=${from_curr.value}&to=${to_curr.value}`;
 let response  = await fetch(url);
 let data = await response.json()
 let rate = data.rates[to_curr.value]
 console.log(rate);
 msg.innerText = `${amount_val} ${from_curr.value} == ${rate} ${to_curr.value}`
 msg.style.color ="black"
 
 setTimeout(()=>{
    loader.classList.add("hidden")
    msg.classList.remove("hidden")
 },1000);
}
 catch (err) {
    setTimeout(()=>{
        loader.classList.add("hidden");
        msg.classList.remove("hidden")
    },500)

 msg.innerText ="ye Currency tune suna hai";
 msg.style.color = "red"
 }
})

