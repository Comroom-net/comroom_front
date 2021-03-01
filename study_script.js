var webstore = new Vue({
    el: '#app',
    data: {
        sitename: "Shop for Vue",
        products: [],
        cart: [],
        showProduct: true,
        order: {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            zip: '',
            state: '',
            method: 'my home address',
            home: 'my home address',
            business: 'my work address',
            gift: 'send gift',
            sendGift: 'send gift',
            dontSendGift: "don't send gift"
        },
        states: {
            AL: '알리바마',
            AR: '애리조나',
            CA: '캘리포니아',
            NV: '네바다'
        },

    },
    filters: {
        formatPrice: function(price) {
            if (!parseInt(price)) {
                return "";
            }
            if (price > 99999) {
                var priceString = (price / 100).toFixed(2);
                var priceArray = priceString.split("").reverse();
                var index = 3;
                while (priceArray.length > index + 3) {
                    console.log('hello')
                    priceArray.splice(index + 3, 0, ",");
                    index += 4;
                }
                return "$" + priceArray.reverse().join("");
            } else {
                return "$" + (price / 100).toFixed(2);
            }
        },
    },
    created: function() {
        axios.get('./products.json')
            .then((response) => {
                console.log("hi")
                this.products = response.data.products;
                console.log(this.products)
            })
    },
    methods: {
        addToCart(aProduct) {
            this.cart.push(aProduct.id);
        },
        showCheckout() {
            this.showProduct = this.showProduct ? false : true;
        },
        submitForm() {
            alert("ordered")
        },
        checkRating(n, myProduct) {
            return myProduct.rating - n >= 0;
        },
        canAddToCart(aProduct) {
            return aProduct.availableInventory > this.cartCount(aProduct.id);
        },
        cartCount(id) {
            let count = 0;
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }
            return count;
        }
    },
    computed: {
        cartItemCount: function() {
            return this.cart.length || '';
        },
        sortedProducts() {
            if (this.products.length > 0) {
                let productsArray = this.products.slice(0);

                function compare(a, b) {
                    if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                    if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                    return 0;
                }
                return productsArray.sort(compare);
            }
        }

    },

});