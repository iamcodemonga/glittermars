import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    items: [],
    quantity: 0,
    amount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        initializeCart(state, action){
            if(localStorage.getItem('items')){
                state.items = JSON.parse(localStorage.getItem('items'))
                state.quantity = JSON.parse(localStorage.getItem('quantity'))
                state.amount = JSON.parse(localStorage.getItem('total'))
                return;
            }
            return;
        },
        addProduct(state, action) {
            const itemIndex = state.items.findIndex(item => item._id === action.payload._id)
            if (itemIndex >= 0) {
                let newCount = Math.floor(state.items[itemIndex].cartQuantity)+Math.floor(action.payload.cartQuantity)
                if (state.items[itemIndex].cartQuantity == action.payload.quantity) {
                    toast.error(`Product is out of stock`, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    return;
                }
                if(newCount > action.payload.quantity) {
                    toast.error(`Out of stock, ${parseInt(action.payload.quantity)-state.items[itemIndex].cartQuantity}  available`, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    return;
                }
                state.items[itemIndex].cartQuantity = Math.floor(state.items[itemIndex].cartQuantity)+Math.floor(action.payload.cartQuantity);
                toast.info(`Added More Items To Cart`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                const tempItem = { ...action.payload }
                state.items.push(tempItem)
                toast.info(`Added To Cart`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
            state.quantity += Math.floor(action.payload.cartQuantity);
            let newPrice = parseInt(action.payload.price)*action.payload.cartQuantity;
            state.amount += newPrice;
            localStorage.setItem("items", JSON.stringify(state.items))
            localStorage.setItem("total", JSON.stringify(state.amount))
            localStorage.setItem("quantity", JSON.stringify(state.quantity))
        },
        addToCart(state, action) {
            const itemIndex = state.items.findIndex(item => item._id === action.payload._id)
            
            if (itemIndex >= 0) {
                if (state.items[itemIndex].cartQuantity == action.payload.quantity) {
                    return;
                }
                state.items[itemIndex].cartQuantity += 1;
                toast.info(`Added More To Cart`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                const tempItem = { ...action.payload, cartQuantity: 1}
                state.items.push(tempItem)
                toast.info(`Added To Cart`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
            state.quantity += 1;
            state.amount += parseInt(action.payload.price);
            localStorage.setItem("items", JSON.stringify(state.items))
            localStorage.setItem("total", JSON.stringify(state.amount))
            localStorage.setItem("quantity", JSON.stringify(state.quantity))
        },
        removeFromCart(state, action) {
            const itemIndex = state.items.findIndex(item => item._id === action.payload._id)
            let cartItems;
            if (state.items[itemIndex].cartQuantity == 1) {
                cartItems = state.items.filter((item, index) => item._id !== action.payload._id)
                toast.info(`Item Removed From Cart`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                state.items[itemIndex].cartQuantity -= 1;
                cartItems = [...state.items ]
            }
            state.items = cartItems;
            state.quantity -= 1;
            state.amount -= parseInt(action.payload.price);
            localStorage.setItem("items", JSON.stringify(state.items))
            localStorage.setItem("total", JSON.stringify(state.amount))
            localStorage.setItem("quantity", JSON.stringify(state.quantity))
        },
        deleteProduct(state, action){
                const itemIndex = state.items.findIndex(item => item._id === action.payload._id)
                let cartItems = state.items.filter((item, index) => item._id !== action.payload._id)
                state.quantity -= state.items[itemIndex].cartQuantity;
                let totalAmt = parseInt(state.items[itemIndex].price)*parseInt(state.items[itemIndex].cartQuantity)
                state.amount -= totalAmt;
                state.items = cartItems;
                localStorage.setItem("items", JSON.stringify(state.items))
                localStorage.setItem("total", JSON.stringify(state.amount))
                localStorage.setItem("quantity", JSON.stringify(state.quantity))
                toast.info(`Item Removed From Cart`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
        },
        clearCart(state, action) {
            state.items = [];
            state.quantity = 0;
            state.amount = 0;
            toast.info(`Cart items cleared!!!`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            localStorage.setItem("items", JSON.stringify(state.items))
            localStorage.setItem("total", JSON.stringify(state.amount))
            localStorage.setItem("quantity", JSON.stringify(state.quantity))
        }
    }
})

export const { initializeCart, addToCart, removeFromCart, addProduct, deleteProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;