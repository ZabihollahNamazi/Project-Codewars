const api = "https://www.codewars.com/api/v1/users/";
// const fetch = require("node-fetch");
document.getElementById("run-btn").addEventListener("click", function (){
    let apiData = [];
    let overallData = [];
    let namesInput = document.getElementById("names").value;
    const names = namesInput.split(",")
    .map(name => name.trim())
    .filter(name => name !== ""); // removes empty strings like if any item is not equal to empty will be return to array.
    console.log(names);
    // names.forEach(async name => {
    //     await fetch(api + name)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`User ${name} not found`);
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             // console.log(`Data for ${name}:`, data);
    //             overallData.push(data)
    //         })
    //         .catch(error => {
    //             console.error(`Error fetching ${name}:`, error.message);
    //         });
    // });

    Promise.all(
        names.map(name =>
            fetch(api + name)
                .then(response => {
                    if (!response.ok) throw new Error(`User ${name} not found`);
                    return response.json();
                })
                .catch(error => {
                    console.error(`Error fetching ${name}:`, error.message);
                    return null; // skip invalid
                })
        )
    ).then(results => {
        const validResults = results.filter(r => r !== null);
        console.log(formattedData(validResults));
        const allUsersData = formattedData(validResults);

        // dropdown for overall and languages
        let selectDropDown = document.getElementById("overall-language");
        let overallOption = document.createElement("option");
        overallOption.value = "overall";
        overallOption.textContent = "Overall";
        selectDropDown.appendChild(overallOption)
        for(let lang of allUsersData.languagesList){
            let langOption = document.createElement("option");
            langOption.value = lang;
            langOption.textContent = lang;
            selectDropDown.appendChild(langOption)
        }
    });

    
})

function formattedData(data){
    const usersData = data.map(user => ({
        username: user.username,
        clan: user.clan,
        score: user.ranks?.overall?.score ?? 0,
        languages: user.ranks?.languages ?? {}
    }));
    let languagesList = []; // to get a list of languages , not repeated ones
    for(let user of data){
        const langs = Object.keys(user.ranks?.languages ?? {}); // Get all language names (keys) from user.ranks.languages
        for(let lang of langs){
            if(!languagesList.includes(lang)){
                languagesList.push(lang)
            }
        }
    }
    const allData = {
        usersData,
        languagesList
    }
    return allData;
}
