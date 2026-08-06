const products = [
  {
    id: 1,
    type: "plant",

    name: "Money Plant",
    category: "Indoor Plant",

    price: 299,
    rating: 4.8,

    stock: 25,

    images: [
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600",
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600",
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600",
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600",
    ],

    details: {
      height: "1.5 ft",
      potSize: "6 inch",
      sunlight: "Partial Sun",
      watering: "2-3 Times / Week",
      petFriendly: true,
      airPurifier: true,
    },
  },

  {
    id: 2,
    type: "plant",

    name: "Snake Plant",
    category: "Indoor Plant",

    price: 399,
    rating: 4.9,

    stock: 18,

    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600",
    ],

    details: {
      height: "2 ft",
      potSize: "8 inch",
      sunlight: "Low to Bright Indirect Light",
      watering: "Once / Week",
      petFriendly: false,
      airPurifier: true,
    },
  },

  {
    id: 3,
    type: "plant",

    name: "Aloe Vera",
    category: "Medicinal",

    price: 249,
    rating: 4.7,

    stock: 30,

    images: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600",
    ],

    details: {
      height: "1 ft",
      potSize: "5 inch",
      sunlight: "Full Sun",
      watering: "Once Every 10 Days",
      petFriendly: false,
      airPurifier: false,
    },
  },

  {
    id: 4,
    type: "plant",

    name: "Rose Plant",
    category: "Flowering",

    price: 349,
    rating: 4.9,

    stock: 20,

    images: [
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600",
    ],

    details: {
      height: "2.5 ft",
      potSize: "10 inch",
      sunlight: "Full Sun",
      watering: "Daily",
      petFriendly: true,
      airPurifier: false,
    },
  },
];

export default products;