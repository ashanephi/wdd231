let stocks = {
    Fruits: ["Apple", "Banana"]
}

let is_shop_open = true;

async function order() {
    try{
        await abc;
    }
    catch(error){
        console.log("abc doesn't exists", error);
    }
    finally{
        console.log("runs code anyways")
    }
}

order();