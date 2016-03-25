

$(function (){
    // 电话输入文本框对象
    var phoneInpObj = $('.js_phone_num_inp');
    SUBJ.FormatePhoneNum.getInstance().enterPhoneNumObjFn(phoneInpObj);
    $('.js_submit_phone_btn').on('click' , function(){
        var phoneInpVal = SUBJ.FormatePhoneNum.getInstance().getPhoneNumVal(phoneInpObj);
        console.log('phoneInpVal : ' + phoneInpVal);
    });
});

var SUBJ = SUBJ || {}; // SUBJ -> subject
SUBJ.FormatePhoneNum = function(){
    this.init();
};
SUBJ.FormatePhoneNum.instance = null;
/**
 * 单例访问入口
 * return {null | 实例}
 */
SUBJ.FormatePhoneNum.getInstance = function(){
  if(!SUBJ.FormatePhoneNum.instance){
      SUBJ.FormatePhoneNum.instance = new SUBJ.FormatePhoneNum();
  }
  return SUBJ.FormatePhoneNum.instance;
};


SUBJ.FormatePhoneNum.prototype = {
   userEditedPhoneVal : null, // 用户最终编辑的手机号，全局
   init : function(){
     console.log('SUBJ.FormatePhoneNum.prototype');
     console.log('SUBJ.FormatePhoneNum.prototype');
   },

   // 初始化 传入电话输入框对象
    enterPhoneNumObjFn : function( phoneInpObj ){
       var that = this;
       // 为手机输入框绑定keyup事件
       phoneInpObj.focus();
       phoneInpObj.on('keyup' , function(){
           that.inputTel( phoneInpObj );
       });
   },

   // 监听输入框值的编辑
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

       var finalPhoneNum = numStr.replace(/-/g,' ');
       that.userEditedPhoneVal = finalPhoneNum;
       phoneInpObj.val(finalPhoneNum);
       return inputVal;
   },

   // 去掉所有空格，获取完整的电话数字，返回number类型
   getPhoneNumVal : function(phoneInpObj){
       var that = this;
       var phoneNumStr = that.userEditedPhoneVal;
       if( phoneNumStr != null ){
           var phoneNum = phoneNumStr.split(' ').join(''); // 去掉空格
           //  匹配手机号的正则
           if(!(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,1,6,7,8]))\d{8}$/.test(phoneNum))) {
               alert('手机格式不正确');
               phoneInpObj.val('');
               phoneInpObj.focus();
               return;
           }else{
               phoneNum = parseInt(phoneNum);
               alert('你输入的手机号是： ' + phoneNum);
               console.log('你输入的手机号是： ' + phoneNum);
               console.log('typeof phoneNum : ' + typeof phoneNum);
               return phoneNum;
           }
       }else{ // 空提交时
           alert('你根本没有输入任何东西就提交！？');
       }
   }

};
