

$(function (){
    // 电话输入文本框对象
    var phoneInpObj = $('.js_phone_num_inp');
    // 实例化检测电话号码的对象
    var formatePhoneNumObj = new SUBJ.FormatePhoneNum();
    // 调用初始化方法 initEnterPhoneNumFn
    formatePhoneNumObj.initEnterPhoneNumFn( phoneInpObj );
    // 提交电话号码
    $('.js_submit_phone_btn').on('click' , function(){
        var phoneInpVal = formatePhoneNumObj.getPhoneNumVal(phoneInpObj); //检测手机号格式
    });
});

var SUBJ = SUBJ || {}; // SUBJ -> subject
SUBJ.FormatePhoneNum = function(){};
SUBJ.FormatePhoneNum.prototype = {
   userEditedPhoneVal : null, // 用户最终编辑的手机号
   userEditedPhoneLen : null, // 用户最终编辑的手机号长度

   // 初始化 传入电话输入框对象
   initEnterPhoneNumFn : function( phoneInpObj ){
       var that = this;
       // 为手机输入框绑定keyup事件
       phoneInpObj.focus();
       phoneInpObj.on('keyup' , function(){
           that.inputTel( phoneInpObj );
       });
   },

   inputTel : function( phoneInpObj ){
       $.fn.watch = function(callback) {
           return this.each(function() {
               //缓存以前的值
               $.data(this, 'originVal', $(this).val());
               //event
               $(this).on('keyup paste', function() {
                   var originVal = $(this, 'originVal');
                   var currentVal = $(this).val();
                   if (originVal !== currentVal) {
                       $.data(this, 'originVal', $(this).val());
                       callback(currentVal);
                   }
               });
           });
       };
       var that = this;
       $(event.target).watch(function(){
           var inputVal =$(event.target).val(); // 当前文本框中的值
           that.formatInputPhone(inputVal , phoneInpObj);
       })
   },

   // 格式化输出手机格式视图为： xxx xxxx xxxx，返回string类型
   formatInputPhone : function(inputVal , phoneInpObj){
       var that = this;
       var STRING_FLAG = "-";
       inputVal = inputVal.split(' ').join(STRING_FLAG);
       //把输入的字符串剔除特殊分割符，变成纯数字串
       var arr = inputVal.split(STRING_FLAG);
       var numStr = '';
       for(var i = 0 ;i<arr.length;i++){
           numStr +=arr[i];
       }
       //对于纯数字字符串，长度大于7， 则追加第二位分隔符
       var len = numStr.length;
       if(len>7){
           numStr = numStr.slice(0,7)+STRING_FLAG+numStr.slice(STRING_FLAG+(len-7));
       }
       len = numStr.length;
       if(len>3){
           numStr = numStr.slice(0,3)+STRING_FLAG+numStr.slice(STRING_FLAG+(len-3));
       }
       that.userEditedPhoneLen = len;

       var finalPhoneNum = numStr.replace(/-/g,' ');
       that.userEditedPhoneVal = finalPhoneNum;
       phoneInpObj.val(finalPhoneNum);
       return inputVal;
   },

   // 去掉所有空格，获取完整的电话数字，返回number类型
   getPhoneNumVal : function(phoneInpObj){
       var that = this;
       // 去掉空格，并转化为number类型
       var phoneNumStr = that.userEditedPhoneVal;
       var phoneNumLen = that.userEditedPhoneLen;
           if( phoneNumStr != null ){
               phoneNumStr = phoneNumStr.replace(/[ ]/g,""); // 去掉全部空格
           }
           if(phoneNumLen < 12){ // 手机号码长度不符合格式
              alert('手机号码格式不对或重新输入正确的数字');
              phoneInpObj.val('');
              phoneInpObj.focus();
              return;
           }else{
               if(isNaN(phoneNumStr)){
                   console.log('typeof phoneNumStr : ' + typeof phoneNumStr);
                   console.log('phoneNumStr : ' + phoneNumStr);
                   alert('手机号码格式不对或重新输入正确的数字');
                   phoneInpObj.val('');
                   phoneInpObj.focus();
                   return;
               }else{
                   phoneNumStr = parseInt(phoneNumStr);
                   console.log('typeof phoneNumStr : ' + typeof phoneNumStr);
                   console.log('phoneNumStr : ' + phoneNumStr);
                   alert('你输入的电话号码：' + phoneNumStr);
                   return phoneNumStr; // 最终返回为number类型
               }
           }
   }

};


