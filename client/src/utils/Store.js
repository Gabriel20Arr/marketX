'use client'

import {useReducer, createContext} from 'react';
import axios from 'axios';


const Store = createContext();

// el estado inicial de nuestra aplicacion o variable de estado
const initialState = {
    cart:{
        cartItems: []
    }
}
//funcion reductora donde se crea la logica funcional
function reducer(state, action){
    switch (action.type) {
        case 'CARD_ADD_ITEM': {
            const newItem = action.payload
            const existItem = state.cart.cartItems.find(
                (item => item._id === newItem._id)
                ) 
                
            //una condicion para actualizar si existe el item o guardar si no existe
            const cartItems = existItem ? state.cart.cartItems.map((item) => item.titulo === existItem.titulo ? newItem : item)
            
            //de lo contrario si no existe entonces guardamos el primero
            : [...state.cart.cartItems, newItem]
            const back =axios.put('https://marketx-production.up.railway.app/Usuario', {cartItems, usuario:cartItems[0].usuario})
            .then(result=>result.data).catch(err=>err);

            return {...state, cart:{...state.cart, cartItems}}

        }

    case 'CART_REMOVE_ITEM' :{
        const usuario = state.cart.cartItems[0].usuario;
        const cartItems = state.cart.cartItems.filter(
            (item) => item._id !== action.payload._id
        )
        const back = axios.put('https://marketx-production.up.railway.app/Usuario', {cartItems, usuario})
        .then(result=>result.data).catch(err=>err);

        return { ...state, cart:{cartItems} }
    }
    
    case 'INICIAL':{
        return { ...state, cart:{...state.cart, cartItems:action.payload} }
    }

    case "RETOMANDO_DATO":{
        return {cart:{cartItems:[]}} 
    } 
        default:
        return state;
  }
}

function StoreProvider({children}){
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = {state, dispatch}
  return <Store.Provider value={value}>{children}</Store.Provider>
}

export { Store, StoreProvider };  