var webstore = new Vue({
    el: '#app',
    data: {
        sitename: "Shop for Vue",
        product: {
            id: 1001,
            title: "cat food, 25won",
            description: "for your cat <em>good</em>," + "cat food",
            price: 2000,
            image: "assets/images/product-fullsize.png",
            availableInventory: 6,
            rating: 3
        },
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
        }
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
        }
    },
    methods: {
        addToCart: function() {
            this.cart.push(this.product.id);
        },
        showCheckout() {
            this.showProduct = this.showProduct ? false : true;
        },
        submitForm() {
            alert("ordered")
        },
        checkRating(n) {
            return this.product.rating - n >= 0;
        },
    },
    computed: {
        cartItemCount: function() {
            return this.cart.length || '';
        },
        canAddToCart: function() {
            return this.product.availableInventory > this.cartItemCount;
        },

    }
});