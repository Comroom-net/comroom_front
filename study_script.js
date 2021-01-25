var webstore = new Vue({
    el: '#app',
    data: {
        sitename: "Shop for Vue",
        product: {
            id: 1001,
            title: "cat food, 25won",
            description: "for your cat <em>good</em>," + "cat food",
            price: 2000000000,
            image: "assets/images/product-fullsize.png",
            availInventory: 5
        },
        cart: [],
        showProduct: false
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
        showCheckOut() {
            this.showProduct = this.showProduct ? false : true;
        }
    },
    computed: {
        cartItemCount: function() {
            return this.cart.length || '';
        },
        canAddToCart: function() {
            return this.product.availInventory > this.cartItemCount;
        },

    }
});