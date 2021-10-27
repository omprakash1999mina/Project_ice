export const getCart = () => {
    return new Promise((resolve, reject) => {
        let cart = window.localStorage.getItem('cart');
        // console.log(cart)
        if(cart === null || cart === 'undefined'){
            const temp = { items: {}, totalItems: 0 }
            const fake = JSON.stringify(temp)
            window.localStorage.setItem('cart' ,fake );
            // console.log('if')
            // cart = window.localStorage.getItem('cart');
            // console.log(cart)
        }
        cart = window.localStorage.getItem('cart');
        // console.log(cart)
        resolve(cart);
    })
}

export const storeCart = (cart) => {
    window.localStorage.setItem('cart', cart);
}


export const getRole = () => {
    return new Promise((resolve, reject) => {
        const role = window.localStorage.getItem('Role');
        resolve(role);
    })
}

export const storeRole = (role) => {
    window.localStorage.setItem('Role', role);
}