// getting the data which we need
function formattedData(data){
    const usersData = data.map(user => ({
        username: user.username,
        clan: user.clan,
        score: user.ranks?.overall?.score ?? 0,
        languages: user.ranks?.languages ?? {}
    }));
    usersData.sort((a, b) => b.score - a.score); // sorting by scores from top to down 

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

// Browser global
if (typeof window !== "undefined") {
    window.formattedData = formattedData;
}

// Node / Jest
if (typeof module !== "undefined" && module.exports) {
    module.exports = formattedData;
}
