const data = [
    {
        id: 1,
        seller: "Lebron James",
        price: 150,
        postingDate: "2024-05-24",
        classification: "Senior",
        game: "Texas",
        image: "A&MLogo.jpeg",
        phone: "512-512-5121"
    },
    {
        id: 2,
        seller: "Stephen Curry",
        price: 110,
        postingDate: "2024-05-11",
        classification: "Sophomore",
        game: "LSU",
        image: "A&MLogo.jpeg",
        phone: "512-512-5121"
    },
    {
        id: 3,
        seller: "Adam Sandler",
        price: 90,
        postingDate: "2024-05-01",
        classification: "Freshman",
        game: "Bowling Green",
        image: "A&MLogo.jpeg",
        phone: "512-512-5121"
    },
    {
        id: 4,
        seller: "Luka Doncic",
        price: 60,
        postingDate: "2024-05-23",
        classification: "Junior",
        game: "McNeese",
        image: "A&MLogo.jpeg",
        phone: "512-512-5121"
    },
    {
        id: 5,
        seller: "Klay Thompson",
        price: 90,
        postingDate: "2024-05-21",
        classification: "Senior",
        game: "Missouri",
        image: "A&MLogo.jpeg",
        phone: "512-512-5121"
    },
    

    
];

const updatedData = data.map(item => {
    // Replace spaces with underscores in the game property
    const gameWithUnderscores = item.game.replace(/\s+/g, '_');

    return {
        ...item,
        image: `${gameWithUnderscores}.jpeg`
    };
});



export default updatedData;