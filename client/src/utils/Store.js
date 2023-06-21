import { useReducer, createContext } from 'react';

const initialState = {
   cart: {
    cartItems: []
   } 
}

const StoreContext = createContext(initialState);

function reducer(state, action){
  switch (action.type){
    case 'CARD_ADD_ITEM':{
      const newItem = action.payload
      const existItem = state.cart.cartItems.find(item => item.id === newItem.id)

      const cartItems = existItem 
      ? state.cart.cartItems.map(item => item.titulo === existItem.titulo ? newItem: item) 
      : [...state.cart.cartItems, newItem]

      return { ...state, cart:{...state.cart, cartItems} }
    }

    default:
      return state;
  }
}

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
          {children}
        </StoreContext.Provider>
      );
    };

export { StoreContext, StoreProvider }