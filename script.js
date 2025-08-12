let dropdown = document.querySelectorAll(".dropdown select")
let btn = document.querySelector(".submit button")

for (let select of dropdown) {
    for (let currcode in countryList) {
        let options = document.createElement("option");
        if (select.name === "from" && currcode === "USD") {
            options.selected = "selected";
        }
        else if (select.name === "to" && currcode === "INR") {
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

const changeflag=(element)=>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let new_src = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img")
        img.src = new_src;
};

btn.addEventListener("click",(evt)=>{
   evt.preventDefault();
   let amount = document.querySelector(".amount input")
   let amount_val = amount.value;
   console.log(amount_val);
   if(amount_val = "" || amount_val<1){
    amount_val = 1;
    amount.value ="1"
   }
})








