export const categories = [
  { name: "Accessories", icon: "bag-outline" },
  { name: "New Arrivals", icon: "time-outline" },
  { name: "Electronics", icon: "flash-outline" },
  { name: "Clothing", icon: "shirt-outline" },
  { name: "Quicky", icon: "bag-handle-outline" },
  { name: "Top up", icon: "ellipsis-horizontal-outline" },
];

export const products = [
  {
    category: "Accessories",
    items: [
      {
        name: "Leather Wallet",
        price: 25,
        image: require("../assets/wallet.png"),
        soldOut: false,
      },
      {
        name: "Sunglasses",
        price: 40,
        image: require("../assets/sunglasses.png"),
        soldOut: true,
      },
    ],
  },
  {
    category: "New Arrivals",
    items: [
      {
        name: "Smart Watch",
        price: 120,
        image: require("../assets/smartWatch.png"),
        soldOut: false,
      },
      {
        name: "Wireless Earbuds",
        price: 60,
        image: require("../assets/earbuds.png"),
        soldOut: false,
      },
    ],
  },
  {
    category: "Electronics",
    items: [
      {
        name: "Bluetooth Speaker",
        price: 35,
        image: require("../assets/speaker.png"),
        soldOut: false,
      },
      {
        name: "Power Bank",
        price: 20,
        image: require("../assets/powerbank.png"),
        soldOut: true,
      },
    ],
  },
  {
    category: "Clothing",
    items: [
      {
        name: "T-Shirt",
        price: 15,
        image: require("../assets/tShirt.png"),
        soldOut: false,
      },
      {
        name: "Hoodie",
        price: 35,
        image: require("../assets/hoodie.png"),
        soldOut: false,
      },
    ],
  },
  {
    category: "Quicky",
    items: [
      {
        name: "Snack Pack",
        price: 3,
        image: require("../assets/snacks.png"),
        soldOut: false,
      },
      {
        name: "Cold Drink",
        price: 2,
        image: require("../assets/drink.png"),
        soldOut: true,
      },
    ],
  },
  {
    category: "Top up",
    items: [
      {
        name: "Mobile Recharge",
        price: 5,
        image: require("../assets/recharge.png"),
        soldOut: false,
      },
      {
        name: "Internet Package",
        price: 10,
        image: require("../assets/internetPackage.jpg"),
        soldOut: false,
      },
    ],
  },
];