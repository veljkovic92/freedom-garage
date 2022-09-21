import { createSlice } from "@reduxjs/toolkit";

import dragon from "../assets/dragon.jpg";
import firestorm from "../assets/firestorm.jpg";
import raptor from "../assets/raptor.jpg";
import thunderstorm from "../assets/thunderstorm.jpg";

// Dodaj u FIREBASE objecte za svaki availableBikes i onda radi FETCH

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    availableBikes: {
      dragon: {
        id: "1",
        name: "Dragon",
        img: dragon,
        desc: "If the maximum speed is desired virtue, the 'Dragon' is the first possible choice on our minds. It will thrill your senses and start the butterflies in your stomach!",
        price: 29.0,

        upgrades: {
          logo: { price: 190, waitingTime: 1 },
          color: { price: 990, waitingTime: 3 },
          wheel: { price: 690, waitingTime: 1 },
          exhaust: { price: 2190, waitingTime: 2 },
          seat: { price: 890, waitingTime: 2 },
          suspension: { price: 1890, waitingTime: 2 },
          windshield: { price: 490, waitingTime: 1 },
          brakes: { price: 690, waitingTime: 1 },
          power: { price: 1150, waitingTime: 4 },
        },
      },
      firestorm: {
        id: "2",
        name: "Firestorm",
        img: firestorm,
        desc: "The one that's built to make your ride smooth and comfy and the same one that can take you to the end of the world...and beyond. Two-up or solo, the choice is yours!",
        price: 23.0,

        upgrades: {
          logo: { price: 190, waitingTime: 1 },
          color: { price: 890, waitingTime: 3 },
          wheel: { price: 690, waitingTime: 1 },
          exhaust: { price: 1790, waitingTime: 2 },
          seat: { price: 990, waitingTime: 2 },
          suspension: { price: 1590, waitingTime: 2 },
          windshield: { price: 550, waitingTime: 1 },
          brakes: { price: 590, waitingTime: 1 },
          power: { price: 990, waitingTime: 4 },
        },
      },
      raptor: {
        id: "3",
        name: "Raptor",
        img: raptor,
        desc: "Dynamics, practicality, agility and acceleration...all in one, named 'Raptor'! This one is made for those who wanna sit and roll, slalom through daily routine and be productive!",
        price: 16.0,

        upgrades: {
          logo: { price: 190, waitingTime: 1 },
          color: { price: 690, waitingTime: 3 },
          wheel: { price: 690, waitingTime: 1 },
          exhaust: { price: 1340, waitingTime: 2 },
          seat: { price: 790, waitingTime: 2 },
          suspension: { price: 1490, waitingTime: 2 },
          windshield: { price: 350, waitingTime: 1 },
          brakes: { price: 490, waitingTime: 1 },
          power: { price: 790, waitingTime: 4 },
        },
      },
      thunderstorm: {
        id: "4",
        name: "Thunderstorm",
        img: thunderstorm,
        desc: "Loud and musical, old school meets new school, able to fulfill all of your freedom wishes in one cheap and classic package...it's surely our beloved 'Thunderstorm' one. Each ride is like the first!",
        price: 12.0,
        upgrades: {
          logo: { price: 190, waitingTime: 1 },
          color: { price: 890, waitingTime: 3 },
          wheel: { price: 690, waitingTime: 1 },
          exhaust: { price: 1990, waitingTime: 2 },
          seat: { price: 890, waitingTime: 2 },
          suspension: { price: 1590, waitingTime: 2 },
          windshield: { price: 590, waitingTime: 1 },
          brakes: { price: 890, waitingTime: 1 },
          power: { price: 1090, waitingTime: 4 },
        },
      },
    },
    items: [],
    waitingTime: 0,
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart(state, action) {
      let configPrice = 0;
      const config = action.payload.config;
      Object.keys(config).forEach((item) => {
        configPrice += item.price;
      });

      const newBikeConfig = {
        id: action.payload.id,
        name: action.payload.name,
        config: action.payload.config,
        waitingTime: action.payload.waitingTime,
        price: configPrice,
      };
      state.items.push(newBikeConfig);
      state.totalQuantity++;
      state.totalPrice += configPrice;
    },
    removeFromCart(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      state.items.filter((item) => item.id !== action.payload);
      state.totalQuantity--;
      state.totalPrice -= item.price;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
