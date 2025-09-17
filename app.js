const api = "https://www.codewars.com/api/v1/users/";
// const fetch = require("node-fetch");
document.getElementById("run-btn").addEventListener("click", function (){
    let namesInput = document.getElementById("names").value;
    const names = namesInput.split(",")
    .map(name => name.trim())
    .filter(name => name !== ""); // removes empty strings like if any item is not equal to empty will be return to array.
    console.log(names);
    names.forEach(name => {
        fetch(api + name)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`User ${name} not found`);
                }
                return response.json();
            })
            .then(data => {
                console.log(`Data for ${name}:`, data);
            })
            .catch(error => {
                console.error(`Error fetching ${name}:`, error.message);
            });
    });
})
