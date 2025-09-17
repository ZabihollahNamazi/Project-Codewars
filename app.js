document.getElementById("run-btn").addEventListener("click", function (){
    let namesInput = document.getElementById("names").value;
    const names = namesInput.split(",")
    .map(name => name.trim())
    .filter(name => name !== ""); // removes empty strings like if any item is not equal to empty will be return to array.
    console.log(names);
})
