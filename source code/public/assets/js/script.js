// $('.multiple-val-input').on('click', function(){
//     $(this).find('input:text').focus();
// });
// $('.multiple-val-input ul input:text').on('input propertychange', function(){
//     $(this).siblings('span.input_hidden').text($(this).val());
//     var inputWidth = $(this).siblings('span.input_hidden').width();
//     $(this).width(inputWidth);
// });
// $('.multiple-val-input ul input:text').on('keypress', function(event){
//     if(event.which == 32 || event.which == 44){
//         var toAppend = $(this).val();
//         if(toAppend!=''){
//             $('<li><a href="#">×</a><div>'+toAppend+'</div></li>').insertBefore($(this));
//             $(this).val('');
//         } else {
//             return false;
//         }
//         return false;
//     };
// });
// $(document).on('click','.multiple-val-input ul li a', function(e){
//     e.preventDefault();
//     $(this).parents('li').remove();
// });