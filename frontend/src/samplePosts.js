const data = [
    {
        id: 1,
        seller: "Lebron James",
        price: 150,
        postingDate: "2024-05-24",
        classification: "Senior",
        game: "Texas",
        image: "A&MLogo.jpeg"
    },
    {
        id: 2,
        seller: "Stephen Curry",
        price: 110,
        postingDate: "2024-05-11",
        classification: "Sophomore",
        game: "LSU",
        image: "A&MLogo.jpeg"
    },
    {
        id: 1,
        seller: "Lebron James",
        price: 150,
        postingDate: "2024-05-24",
        classification: "Senior",
        game: "Texas",
        image: "A&MLogo.jpeg"
    },
    {
        id: 2,
        seller: "Stephen Curry",
        price: 110,
        postingDate: "2024-05-11",
        classification: "Sophomore",
        game: "LSU",
        image: "A&MLogo.jpeg"
    },
    {
        id: 1,
        seller: "Lebron James",
        price: 150,
        postingDate: "2024-05-24",
        classification: "Senior",
        game: "Texas",
        image: "A&MLogo.jpeg"
    },
    {
        id: 2,
        seller: "Stephen Curry",
        price: 110,
        postingDate: "2024-05-11",
        classification: "Sophomore",
        game: "LSU",
        image: "A&MLogo.jpeg"
    },
    {
        id: 1,
        seller: "Lebron James",
        price: 150,
        postingDate: "2024-05-24",
        classification: "Senior",
        game: "Texas",
        image: "A&MLogo.jpeg"
    },
    {
        id: 2,
        seller: "Stephen Curry",
        price: 110,
        postingDate: "2024-05-11",
        classification: "Sophomore",
        game: "LSU",
        image: "A&MLogo.jpeg"
    },
    {
        id: 1,
        seller: "Lebron James",
        price: 150,
        postingDate: "2024-05-24",
        classification: "Senior",
        game: "Texas",
        image: "A&MLogo.jpeg"
    },
    {
        id: 2,
        seller: "Stephen Curry",
        price: 110,
        postingDate: "2024-05-11",
        classification: "Sophomore",
        game: "LSU",
        image: "A&MLogo.jpeg"
    },
    {
        id: 1,
        seller: "Lebron James",
        price: 150,
        postingDate: "2024-05-24",
        classification: "Senior",
        game: "Texas",
        image: "A&MLogo.jpeg"
    },
    {
        id: 2,
        seller: "Stephen Curry",
        price: 110,
        postingDate: "2024-05-11",
        classification: "Sophomore",
        game: "LSU",
        image: "A&MLogo.jpeg"
    },
    {
        id: 1,
        seller: "Lebron James",
        price: 150,
        postingDate: "2024-05-24",
        classification: "Senior",
        game: "Texas",
        image: "A&MLogo.jpeg"
    },
    {
        id: 2,
        seller: "Stephen Curry",
        price: 110,
        postingDate: "2024-05-11",
        classification: "Sophomore",
        game: "LSU",
        image: "A&MLogo.jpeg"
    },
    {
        id: 1,
        seller: "Lebron James",
        price: 150,
        postingDate: "2024-05-24",
        classification: "Senior",
        game: "Texas",
        image: "A&MLogo.jpeg"
    },
    {
        id: 2,
        seller: "Stephen Curry",
        price: 110,
        postingDate: "2024-05-11",
        classification: "Sophomore",
        game: "LSU",
        image: "A&MLogo.jpeg"
    },
    {
        id: 1,
        seller: "Lebron James",
        price: 150,
        postingDate: "2024-05-24",
        classification: "Senior",
        game: "Texas",
        image: "A&MLogo.jpeg"
    },
    {
        id: 2,
        seller: "Stephen Curry",
        price: 110,
        postingDate: "2024-05-11",
        classification: "Sophomore",
        game: "LSU",
        image: "A&MLogo.jpeg"
    }
    
];

const updatedData = data.map(item => {
    return {
        ...item,
        image: `${item.game}.jpeg`
    };
});

export default updatedData;