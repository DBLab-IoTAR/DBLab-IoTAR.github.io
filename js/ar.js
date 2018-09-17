

var jsAR = {
    init: function () {
        jsAR.initDependencies();
    },

    initDependencies: function () {
        // Gallery navigation.
        $(document).on('click', '.js-gallery-item-nav', function (event) {
            var productId= $(this).data('product-id');
            var itemId = $(this).data('item-id');

            // Trigger event to animate gallery image.
            $('.js-product-' + productId).find('#js-gallery-item-1').get(0).emit('press');
            $('.js-product-' + productId).find('#js-gallery-item-2').get(0).emit('press');
            $('.js-product-' + productId).find('#js-gallery-item-3').get(0).emit('press');

            // Trigger event to animate gallery thumbnails.
            $('.js-product-' + productId).find('#js-gallery-thumb-box-1').get(0).emit('unpress');
            $('.js-product-' + productId).find('#js-gallery-thumb-box-2').get(0).emit('unpress');
            $('.js-product-' + productId).find('#js-gallery-thumb-box-3').get(0).emit('unpress');

            $('.js-product-' + productId).find('#js-gallery-thumb-box-' + itemId).get(0).emit('press');

            setTimeout(function() {
                // Hide all gallery items.
                $('.js-product-' + productId).find('#js-gallery-item-1').attr('visible', 'false');
                $('.js-product-' + productId).find('#js-gallery-item-2').attr('visible', 'false');
                $('.js-product-' + productId).find('#js-gallery-item-3').attr('visible', 'false');

                // Show selected gallery item.
                $('.js-product-' + productId).find('#js-gallery-item-' + itemId).attr('visible', 'true');
            }, 500);
        });

        // Add item to cart.
        $(document).on('click', '.js-add-to-cart', function (event) {
            var productId = $(this).data('product-id');

            $('.js-product-' + productId).find('#add-to-cart-button').get(0).emit('press');
            $('.js-product-' + productId).find('#add-to-cart-button-text').get(0).emit('press');
            var cartItem = $('.js-cart-item[data-item-id="' + productId + '"]');
            cartItem.removeClass('is-hidden');

            setTimeout(function() {
                $.featherlight($('.js-cart').html());
            }, 1000);
        });

        // Delete cart item.
        $(document).on('click', '.js-delete', function (event) {
            var itemId = $(this).data('item-id');
            var cartItem = $('.js-cart-item[data-item-id="' + itemId + '"]');
            cartItem.addClass('is-hidden');
        });

        // Start 3d model animation
        $(document).on('click', '.js-start-3d-animation', function (event) {
            var model = $('.js-3d-model');
            if (model.attr('animation-mixer')) {
                model.attr('animation-mixer', null);
            }
            else {
                model.attr('animation-mixer', 'loop:repeat');
            }

            var productId = $(this).data('product-id');

            $('.js-product-' + productId).find('#start-3d-animation-button').get(0).emit('press');
            $('.js-product-' + productId).find('#start-3d-animation-button-text').get(0).emit('press');
        });
    }
};

$(document).ready(jsAR.init);
