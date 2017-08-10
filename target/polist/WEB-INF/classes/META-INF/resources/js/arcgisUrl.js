(function() {
    var isWinRT = (typeof Windows === "undefined") ? false : true;
    var r = new RegExp("(^|(.*?\\/))(Include\.js)(\\?|$)"),
    s = document.getElementsByTagName('script'),
    src, m, baseurl = "";
    for(var i=0, len=s.length; i<len; i++) {
        src = s[i].getAttribute('src');
        if(src) {
            var m = src.match(r);
            if(m) {
                baseurl = m[1];
                break;
            }
        }
    }
    function inputScript(inc){
        if (!isWinRT) {
            var script = '<' + 'script type="text/javascript" src="' + inc + '"' + '><' + '/script>';
            document.writeln(script);
        } else {
            var script = document.createElement("script");
            script.src = inc;
            document.getElementsByTagName("HEAD")[0].appendChild(script);
        }
    }
    function inputCSS(style){
        if (!isWinRT) {
            var css = '<' + 'link rel="stylesheet" href="' + style + '"' + '><' + '/>';
            document.writeln(css);
        } else { 
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = style;
            document.getElementsByTagName("HEAD")[0].appendChild(link);
        }
    }
    function loadSMLibs() {//
    	inputCSS(ArcGisUrl+"/arcgis_js_api/library/3.19/3.19/dijit/themes/tundra/tundra.css");
    	inputCSS(ArcGisUrl+"/arcgis_js_api/library/3.19/3.19/esri/css/esri.css");
		inputScript(ArcGisUrl+"/arcgis_js_api/library/3.19/3.19/init.js");
    }
    loadSMLibs();
})();