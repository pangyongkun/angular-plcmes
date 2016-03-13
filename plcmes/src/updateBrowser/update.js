/**
 * Created by jerry on 2/2/16.
 */


var browser = navigator.appName;
var b_version = navigator.appVersion;
var version = b_version.split(";");
var trim_Version = version[1].replace(/[ ]/g, "");
console.log(browser);
console.log(trim_Version);
if ((trim_Version == "MSIE6.0" || trim_Version == "MSIE7.0" || trim_Version == "MSIE8.0" || trim_Version == "MSIE9.0")) {
    window.location.href = 'updateBrowser/updateYourBrowser.html';
}
