jQuery(document).ready(function($) {
    
    // Show the appropriate form when clicking give buttons
    $('.give-btn').on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('.give-form').removeClass('active');
        $(target).addClass('active');
        $('html, body').animate({
            scrollTop: $(target).offset().top - 100
        }, 500);
    });
    
    // Handle form submissions
    $('.payment-form').on('submit', function(e) {
        e.preventDefault();
        var form = $(this);
        var formData = form.serialize();
        
        // Show loading state
        form.find('button[type="submit"]').text('Processing...').prop('disabled', true);
        
        // Send to backend
        $.ajax({
            url: '/api/payments/initialize',
            method: 'POST',
            data: formData,
            success: function(response) {
                if(response.data && response.data.authorization_url) {
                    window.location.href = response.data.authorization_url;
                } else {
                    alert('Payment initialization failed. Please try again.');
                    form.find('button[type="submit"]').text('Proceed to Payment').prop('disabled', false);
                }
            },
            error: function() {
                alert('An error occurred. Please try again later.');
                form.find('button[type="submit"]').text('Proceed to Payment').prop('disabled', false);
            }
        });
    });
    
    // Show first form by default if hash exists
    if(window.location.hash) {
        var targetForm = $(window.location.hash);
        if(targetForm.length) {
            targetForm.addClass('active');
        }
    }
});