
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/star/star","pages/login/login","pages/user/notice","pages/index/index","pages/index/staticEarnings","pages/index/region","pages/index/regionDetail","pages/login/register","pages/login/changePassword","pages/login/changePaypassword","pages/wallet/index","pages/wallet/transfer","pages/wallet/roll","pages/wallet/shift","pages/wallet/conversion","pages/wallet/detail","pages/zoology/index","pages/zoology/shop","pages/zoology/shopDetail","pages/zoology/buy","pages/zoology/place","pages/zoology/shopType","pages/zoology/shopList","pages/zoology/managePay","pages/zoology/manageBuy","pages/user/index","pages/user/share","pages/user/noticeDetail","pages/user/security","pages/user/team","pages/user/myOrder","pages/user/address","pages/user/addSite","pages/user/editSite","pages/user/myEarnings"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"JKC","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","navigationStyle":"custom","enablePullDownRefresh":false},"tabBar":{"color":"#707881","selectedColor":"#30EC89","backgroundColor":"#031318","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"/static/footer/tab01.png","selectedIconPath":"/static/footer/tab001.png"},{"pagePath":"pages/wallet/index","text":"钱包","iconPath":"/static/footer/tab02.png","selectedIconPath":"/static/footer/tab002.png"},{"pagePath":"pages/zoology/index","text":"生态","iconPath":"/static/footer/tab03.png","selectedIconPath":"/static/footer/tab003.png"},{"pagePath":"pages/user/index","text":"我的","iconPath":"/static/footer/tab04.png","selectedIconPath":"/static/footer/tab004.png"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":true},"appname":"JKC","compilerVersion":"2.6.16","entryPagePath":"pages/star/star","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/star/star","meta":{"isQuit":true},"window":{"navigationBarTitleText":""}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/user/notice","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":""}},{"path":"/pages/index/staticEarnings","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/index/region","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/index/regionDetail","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/login/changePassword","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/login/changePaypassword","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/wallet/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":""}},{"path":"/pages/wallet/transfer","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/wallet/roll","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/wallet/shift","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/wallet/conversion","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/wallet/detail","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/zoology/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":""}},{"path":"/pages/zoology/shop","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/zoology/shopDetail","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/zoology/buy","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/zoology/place","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/zoology/shopType","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/zoology/shopList","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/zoology/managePay","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/zoology/manageBuy","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/user/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":""}},{"path":"/pages/user/share","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/user/noticeDetail","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/user/security","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/user/team","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/user/myOrder","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/user/address","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/user/addSite","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/user/editSite","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/user/myEarnings","meta":{},"window":{"navigationBarTitleText":""}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});