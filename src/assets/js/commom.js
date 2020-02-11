var headUrl = 'https://follwup.aiwac.net'

var Url={
    checkUserUrl: headUrl + '/wechat/login/',
    getUserInfo: headUrl + '/wechat/user/info/',
    insertUpdateInfoUrl: headUrl + '/wechat/user/infoinorup/',
    testResult: headUrl + '/ncov/getresults/',
    sendResultUrl: headUrl + '/answer/submit/',
    checkOrEndUrl: headUrl + '/answer/query/',
    uploadPicVidUrl: headUrl + '/upload/',
    getScale: headUrl + '/ncov/getscale/',
    submitScale: headUrl + '/ncov/submitscale/',
    submitInfoUrl: headUrl + '/ncov/submitinfo/',
    submitRecentUrl: headUrl + '/ncov/submitrecent/',
    submitNeed: headUrl + '/ncov/submitneed/',
    sendUnionUrl: headUrl + '/wechat/user/unionid/',
    getVideoUrl: 'https://cmas.aiwac.net/animations/',
    wechatInitUrl:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3213c681fb752c01&redirect_uri=https%3A%2F%2Ffollwup.aiwac.net%2Fwechat%2Fuser%2Fdoctor_info&response_type=code&scope=snsapi_userinfo&state=100#wechat_redirect'
}
var openid=''
var sessionkey=''
module.exports = {
    Url: Url,
    openid:openid,
    sessionkey:sessionkey
}
