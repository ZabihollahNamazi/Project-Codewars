const api = "https://www.codewars.com/api/v1/users/";

document.getElementById("run-btn").addEventListener("click", function (){
    document.getElementById("select-area").style.display = "block";
    let namesInput = document.getElementById("names").value;
    const names = namesInput.split(",")
    .map(name => name.trim())
    .filter(name => name !== ""); // removes empty strings like if any item is not equal to empty will be return to array.
    // clear the input
    document.getElementById("names").value = "";
    const errorMessageDiv = document.getElementById("error-message");
    errorMessageDiv.innerHTML = ""; // clear previous messages
    Promise.all(
        names.map(name =>
            fetch(api + name)
                .then(response => {
                    if (!response.ok) throw new Error(`User ${name} not found`);
                    return response.json();
                })
                .catch(error => {
                    console.error(`Error fetching ${name}:`, error.message);
                    const p = document.createElement("p");
                    p.textContent = error.message;
                    errorMessageDiv.appendChild(p);
                    return null; // skip invalid
                })
        )
    ).then(results => {
        
        const validResults = results.filter(r => r !== null);
        
        const allUsersData = formattedData(validResults);

        // dropdown for overall and languages
        let selectDropDown = document.getElementById("overall-language");
        // Clear previous options
        selectDropDown.innerHTML = "";
        let overallOption = document.createElement("option");
        overallOption.value = "overall";
        overallOption.textContent = "Overall";
        selectDropDown.appendChild(overallOption)
        for(let lang of allUsersData.languagesList){
            let langOption = document.createElement("option");
            langOption.value = lang;
            langOption.textContent = lang;
            selectDropDown.appendChild(langOption)
        }// end of dropdown
        
        populateTable(allUsersData);
        selectDropDown.addEventListener("change", function () {
            let selectedValue = selectDropDown.value; // get the value of the selected option
            if(selectedValue == "overall"){
                populateTable(allUsersData);
            }
            else{
                populateTableLanguage(allUsersData, selectedValue)
            }
        });        
    });

    
})


// creating table 
function populateTable(allUsersData) {
    document.getElementById("users-table").style.display = "table"; // show the table which was hidden as default
    // get the tbody of table
    const tbody = document.querySelector("#users-table tbody");

    // clear existing rows data
    tbody.innerHTML = "";

    // loop over each user and create a table row
    allUsersData.usersData.forEach((user, index) => { //index the position of the user element
        const tr = document.createElement("tr");

        // Username
        const tdUsername = document.createElement("td");
        tdUsername.textContent = user.username ?? ""; // empty if undefined
        tr.appendChild(tdUsername);

        // Clan
        const tdClan = document.createElement("td");
        tdClan.textContent = user.clan ?? ""; // empty if undefined
        tr.appendChild(tdClan);

        // Score
        const tdScore = document.createElement("td");
        tdScore.textContent = user.score ?? 0;
        // emojis for top scorer
        if (index === 0) {
            tdScore.textContent += " 🏆💪🎉";
        }
        tr.appendChild(tdScore);

        // append row to tbody
        tbody.appendChild(tr);
    })
}

function populateTableLanguage(allUsersData, selectedValue){
    document.getElementById("users-table").style.display = "table"; // show the table which was hidden as default
    // get the tbody table
    const tbody = document.querySelector("#users-table tbody");

    // clear existing rows data
    tbody.innerHTML = "";

    // filter users who have that language
    let filteredUsers = allUsersData.usersData.filter(user => user.languages[selectedValue]);

    // Sort them by language score (highest → lowest)
    filteredUsers.sort((a, b) => 
        (b.languages[selectedValue].score ?? 0) - (a.languages[selectedValue].score ?? 0)
    );

        //  Loop through sorted users
    filteredUsers.forEach((user, index) => {
        const langInfo = user.languages[selectedValue];
        const tr = document.createElement("tr");

        // Username
        const tdUsername = document.createElement("td");
        tdUsername.textContent = user.username ?? "";
        tr.appendChild(tdUsername);

        // Clan
        const tdClan = document.createElement("td");
        tdClan.textContent = user.clan ?? "";
        tr.appendChild(tdClan);

        // Score
        const tdScore = document.createElement("td");
        tdScore.textContent = langInfo.score ?? 0;

        // add emoji for top scorer
        if (index === 0) {
            tdScore.textContent += " 🏆💪🎉";
        }
        tr.appendChild(tdScore);

        tbody.appendChild(tr);
    });

}

