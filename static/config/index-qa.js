/**
 * 开发环境
 */
;(function () {
  window.SITE_CONFIG = {}

 // api接口请求地址
//  window.SITE_CONFIG['baseUrl'] = 'http://test.100mhb.com/back'
 window.SITE_CONFIG['baseUrl'] = 'http://129.204.74.133/back'

 // 静态资源文件url
//  window.SITE_CONFIG['resourcesUrl'] = 'http://test.100mhb.com:8085'
 window.SITE_CONFIG['resourcesUrl'] = 'http://129.204.74.133:8090'
  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain'] = './' // 域名
  window.SITE_CONFIG['version'] = ''   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl'] = window.SITE_CONFIG.domain + window.SITE_CONFIG.version
})()

