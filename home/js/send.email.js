var widgetId;
var onloadCallback = function () {
    widgetId = grecaptcha.render('robot', {
        'sitekey': '6LdIH0IpAAAAABFATvXoE9DioU3bvX3bIjndwT-X', 
        'theme': 'dark',
        'size': 'normal'
    });
};
function sendBefore() {
    var responseToken = grecaptcha.getResponse(widgetId);
    if (responseToken.length == 0) {
        alert("请先进行人机验证");
    } else {
         send();
    }
}
function send() {
    var form = document.getElementById('contact-form');
        // generate a five digit number for the contact_number variable
        form.contact_number.value = Math.random() * 100000 | 0;
        // these IDs from the previous steps
        emailjs.sendForm('service_73abzcu', 'template_mo0ly8j', '#contact-form', 'vKenUkwpDL3mXuDK8')
        .then(function() {
            alert('发送成功，我会尽快回复您的')
        }, function(error) {
            alert('发送失败，请检查网络是否连接');
            console.log('发送失败', error);
        });
}