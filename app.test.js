const formattedData = require("./format");

const users = [
  {
    clan: "CodeClan",
    codeChallenges: {
      totalAuthored: 5,
      totalCompleted: 250
    },
    honor: 1200,
    id: "abcd1234",
    leaderboardPosition: 12000,
    name: "Zabih",
    ranks: {
      languages: {
        javascript: { rank: -5, name: "5 kyu", color: "yellow", score: 1500 },
        python: { rank: -6, name: "6 kyu", color: "yellow", score: 800 }
      },
      overall: { rank: -5, name: "5 kyu", color: "yellow", score: 2300 }
    },
    skills: ["OOP", "Async"],
    username: "zabih-n"
  },
  {
    clan: null,
    codeChallenges: {
      totalAuthored: 2,
      totalCompleted: 50
    },
    honor: 200,
    id: "efgh5678",
    leaderboardPosition: 90000,
    name: "Ali",
    ranks: {
      languages: {
        javascript: { rank: -8, name: "8 kyu", color: "white", score: 20 }
      },
      overall: { rank: -8, name: "8 kyu", color: "white", score: 20 }
    },
    skills: [],
    username: "ali123"
  }
];

const result = {
    languagesList: ["javascript", "python"],
    usersData: [
        {
            clan: "CodeClan",
            languages: {javascript: { rank: -5, name: "5 kyu", color: "yellow", score: 1500 },
            python: { rank: -6, name: "6 kyu", color: "yellow", score: 800 }},
            score: 2300,
            username: "zabih-n"
         },
         {
            clan: null,
            languages: {javascript: { rank: -8, name: "8 kyu", color: "white", score: 20 }},
            score: 20,
            username: "ali123"
         }
    ]
}

test("formatting the data must be as result", () => {
  expect(formattedData(users)).toEqual(result);
});