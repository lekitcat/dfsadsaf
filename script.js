

var $form = $('.register');

const inptEl = document.querySelector('.register').classList.contains('close')

document.querySelector('.getgift').classList.remove('gopen')


const counter = (id, start, end, duration) => {
  if (end != 0) {
      let obj = document.getElementById(id),
          current = start,
          range = end - start,
          increment = end > start ? 1 : -1,
          step = Math.abs(Math.floor(duration / range)),
          timer = setInterval(() => {
              current += increment;
              obj.textContent = current;
              if (current == end) {
                  clearInterval(timer);
              }
          }, step);
  }
  else {
      document.getElementById(id).textContent = 0
  }
}







function validateEmail(email) {
 // var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //console.log(regex.test(email))  

  const promo = ['HKOMBAT49', 'HKOMBAT12','#HK213','#A4644','#B32GF2', '#DFXC1']
  promo.includes(email)
  
  return promo.includes(email);
};
$form.on('keyup', 'input', function (e) {
  var $this = $(this),
  $input = $this.val();
    
  if ($input.length > 0) {
   
    if (validateEmail($input)) {
      $(this).addClass('active');
      $form.find('button').addClass('active');
    
      if (e.which === 13) {
        $form.find('button').click();
        $this.blur();
      }
    } else {
      $form.find('button').removeClass('active');
      $(this).removeClass('active');
    }
    
  } else {
   
    $form.find('button').removeClass('active');
    $(this).removeClass('active');
  }
});

$form.on('click', 'button.active',  function  (e) {
  e.preventDefault;
 
  var $this = $(this);
  $(this).addClass('full');
  $(this).html('Success!');

  setTimeout(() => {

    $form.addClass('close')
    const connectwallet =  document.querySelectorAll('.thidden').forEach(item => {
      item.classList.remove('thidden')
      item.classList.add('topen')
    
      if(localStorage.getItem('connect')!=='false'){
        
        document.querySelector('.getgift').classList.add('gopen')

        counter('amount', 0, localStorage.getItem('amount'), 1000)
      }
    })
  }, 1500);
});