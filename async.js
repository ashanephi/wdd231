let stocks = {
    Fruits: ["Apple", "Banana"]
}

let is_shop_open = true;

let order = (time, work) => {
    return new Promise((resolve, reject) => {
        if(is_shop_open){
            setTimeout(() => {
                resolve ( work() );
            }, time)
        }
        else {
            reject ( console.log("Shop closed") );
        }
    })

}

order(1000, () => console.log("Order placed"))
.then(()=>{
    return order(3000, () => console.log("Production started"));
})

.catch(() => {
    console.log("Customer left");
})
.finally(() => {
    console.log("Day ended! Shop is closed");
})