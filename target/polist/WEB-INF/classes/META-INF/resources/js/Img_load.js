function Img_load(type, pkid, biaoshi, pageNum, selectType) {
//	uploader.reset();
    biaoshi = "cuoshi_img_load";
    var urlObj = {
        reason: {
            upload: 'taskDataFillChild/addReason',
            select: 'taskDataFillChild/selectReason',
            del: "taskDataFillChild/deleteReason"
        },
        photo: {
            upload: 'picture/uploadPicture',
            select: 'picture/selectPicture',
            del: "picture/deletePicture"
        }
    }
    $("#" + biaoshi + " .textPrompt").html('或将照片拖到这里，单次最多可选' + pageNum + '张，单张照片限5M，总共限' + pageNum * 5 + 'M');
    var BASE_URL = '../js/plugins/webuploader';

    function e(e) {
        var a = o('<li id="' + e.id + '"><p class="title">' + e.name + '</p><p class="imgWrap"></p><p class="progress"><span></span></p></li>'),
            s = o('<div class="file-panel"><span class="cancel">删除</span><span class="rotateRight">向右旋转</span><span class="rotateLeft">向左旋转</span></div>').appendTo(a),
            i = a.find("p.progress span"),
            t = a.find("p.imgWrap"),
            r = o('<p class="error"></p>'),
            d = function (e) {
                switch (e) {
                    case "exceed_size":
                        text = "文件大小超出";
                        break;
                    case "interrupt":
                        text = "上传暂停";
                        break;
                    default:
                        text = "上传失败，请重试"
                }
                r.text(text).appendTo(a)
            };
        "invalid" === e.getStatus() ? d(e.statusText) : (t.text("预览中"), n.makeThumb(e,
            function (e, a) {
                if (e) return void t.text("不能预览");
                var s = o('<img src="' + a + '">');
                t.empty().append(s)
            },
            v, b), w[e.id] = [e.size, 0], e.rotation = 0),
            e.on("statuschange",
                function (t, n) {
                    "progress" === n ? i.hide().width(0) : "queued" === n && (a.off("mouseenter mouseleave"), s.remove()),
                        "error" === t || "invalid" === t ? (console.log(e.statusText), d(e.statusText), w[e.id][1] = 1) : "interrupt" === t ? d("interrupt") : "queued" === t ? w[e.id][1] = 0 : "progress" === t ? (r.remove(), i.css("display", "block")) : "complete" === t && a.append('<span class="success"></span>'),
                        a.removeClass("state-" + n).addClass("state-" + t)
                }),
            a.on("mouseenter",
                function () {
                    s.stop().animate({
                        height: 30
                    })
                }),
            a.on("mouseleave",
                function () {
                    s.stop().animate({
                        height: 0
                    })
                }),
            s.on("click", "span",
                function () {
                    var a, s = o(this).index();
                    switch (s) {
                        case 0:
                            return void n.removeFile(e);
                        case 1:
                            e.rotation += 90;
                            break;
                        case 2:
                            e.rotation -= 90
                    }
                    x ? (a = "rotate(" + e.rotation + "deg)", t.css({
                        "-webkit-transform": a,
                        "-mos-transform": a,
                        "-o-transform": a,
                        transform: a
                    })) : t.css("filter", "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + ~~(e.rotation / 90 % 4 + 4) % 4 + ")")
                }),
            a.appendTo(l)
    }

    function a(e) {
        var a = o("#" + e.id);
        delete w[e.id],
            s(),
            a.off().find(".file-panel").off().end().remove()
    }

    function s() {
        var e, a = 0,
            s = 0,
            t = f.children();
        o.each(w,
            function (e, i) {
                s += i[0],
                    a += i[0] * i[1]
            }),
            e = s ? a / s : 0,
            t.eq(0).text(Math.round(100 * e) + "%"),
            t.eq(1).css("width", Math.round(100 * e) + "%"),
            i()
    }

    function i() {
        var e, a = "";
        "ready" === k ? a = "选中" + m + "张图片,共" + WebUploader.formatSize(h) + "。" : "confirm" === k ? (e = n.getStats(), e.uploadFailNum && (a = "已成功上传" + e.successNum + "张照片至服务器，" + e.uploadFailNum + '张照片上传失败' + ok(n, type, pkid, u, o, l, d, c))) : (e = n.getStats(), a = "共" + m + "张（" + WebUploader.formatSize(h) + "），已上传" + e.successNum + "张", e.uploadFailNum && (a += "，失败" + e.uploadFailNum + "张")),
            p.html(a)//,
        //ok(n,type,pkid,u,o,l,d,c)
    }

    function t(e) {
        var a;
        if (e !== k) {
            switch (c.removeClass("state-" + k), c.addClass("state-" + e), k = e) {
                case "pedding":
                    u.removeClass("element-invisible"),
                        l.parent().removeClass("filled"),
                        l.hide(),
                        d.addClass("element-invisible"),
                        n.refresh();
                    break;
                case "ready"://选择文件，刷新队列
                    u.addClass("element-invisible"),
                        o("#" + biaoshi + " #filePicker2").removeClass("element-invisible"),
                        l.parent().addClass("filled"),
                        l.show(),
                        d.removeClass("element-invisible"),
                        n.refresh();
                    break;
                case "uploading"://开始上传
                    o("#" + biaoshi + " #filePicker2").addClass("element-invisible"),
                        f.show(),
                        c.text("暂停上传");
                    break;
                case "paused":
                    f.show(),
                        c.text("继续上传");
                    break;
                case "confirm"://上传进行中
                    if (f.hide(), c.text("开始上传").addClass("disabled"), a = n.getStats(), a.successNum && !a.uploadFailNum) return void t("finish");
                    break;
                case "finish"://结束或者成功
                    a = n.getStats(),
                        a.successNum ? ok(n, type, pkid, u, o, l, d, c) : (k = "done", location.reload())
            }
            i()
        }
    }

    function ok(n, type, pkid, u, o, l, d, c) {
        console.trace();
        //$("#cuoshi_img_load").reload();
        u.addClass("element-invisible"),
            o("#" + biaoshi + " #filePicker2").removeClass("element-invisible"),
            l.parent().addClass("filled"),
            l.show(),
            d.removeClass("element-invisible"),
            c.text("开始上传").removeClass("disabled")
        n.refresh();
//    	toastr["success"]("success", "图片上传成功");
        $("#dialog-tiaozhuan-content").html("<span style='color:green'><b>上传成功！</b></span>");
        $("#dialog-tiaozhuan").dialog("open");
        renwu();
        photo_select(pkid, urlObj[selectType].select, urlObj[selectType].del);
//    	if(biaoshi=='yidi_img_load'){
//    		yidi_pic_show(pkid);
//    	}
        return "。";
        //Img_load(type,pkid);
    }

    var n, o = jQuery,
        r = o("#" + biaoshi + " #uploader"),
        l = o('<ul class="filelist"></ul>').appendTo(r.find(".queueList")),
        d = r.find(".statusBar"),
        p = d.find(".info"),
        c = r.find(".uploadBtn"),
        u = r.find(".placeholder"),
        f = d.find(".progress").hide(),
        m = 0,
        h = 0,
        g = window.devicePixelRatio || 1,
        v = 110 * g,
        b = 110 * g,
        k = "pedding",
        w = {},
        x = function () {
            var e = document.createElement("p").style,
                a = "transition" in e || "WebkitTransition" in e || "MozTransition" in e || "msTransition" in e || "OTransition" in e;
            return e = null,
                a
        }();
    if (!WebUploader.Uploader.support()) throw {}//toastr["error"]("error", "Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器"),
    new Error("WebUploader does not support the browser you are using.");
    n = WebUploader.create({
        pick: {
            id: "#" + biaoshi + " #filePicker",
            label: "点击选择图片"
        },
        dnd: "#" + biaoshi + " #uploader .queueList",
        paste: document.body,
        accept: {
            title: "Images",
            extensions: "gif,jpg,jpeg,bmp,png,txt",
            mimeTypes: "image/*"
        },
        swf: BASE_URL + "/Uploader.swf",
        disableGlobalDnd: !0,
        chunked: !0,
        server: BackstageIP + urlObj[selectType].upload + "?taskId=" + pkid + "&userId=" + dataBase.Login_map.SOLE,
        fileNumLimit: pageNum,
        fileSizeLimit: 20971520,
        fileSingleSizeLimit: 10485760
    }),
        n.addButton({
            id: "#" + biaoshi + " #filePicker2",
            label: "继续添加"
        }),
        n.onUploadProgress = function (e, a) {
            var i = o("#" + e.id),
                t = i.find(".progress span");
            t.css("width", 100 * a + "%"),
                w[e.id][1] = a,
                s()
        },
        n.reset = function () {
            console.log('a');
        },
        n.onFileQueued = function (a) {
            m++,
                h += a.size,
            1 === m && (u.addClass("element-invisible"), d.show()),
                e(a),
                t("ready"),
                s()
        },
        n.onFileDequeued = function (e) {
            m--,
                h -= e.size,
            m || t("pedding"),
                a(e),
                s()
        },
        n.on("all",
            function (e,a,res) {
            console.log(res);
                switch (e) {
                    case "uploadFinished":
                        t("confirm");
                        break;
                    case "startUpload":
                        t("uploading");
                        break;
                    case "stopUpload":
                        t("paused")
                }
            })
        n.onError = function (e) {
//        toastr["error"]("error", "Eroor: " + e)
            switch (e){
                case 'Q_EXCEED_NUM_LIMIT':
                    $("#dialog-tiaozhuan-content").html("<span style='color:red'><b>上传失败！超出图片上传数量</b></span>");
                    break
                case 'Q_EXCEED_SIZE_LIMIT':
                    $("#dialog-tiaozhuan-content").html("<span style='color:red'><b>上传失败！超出图片总大小</b></span>");
                    break
                case 'Q_TYPE_DENIED':
                    $("#dialog-tiaozhuan-content").html("<span style='color:red'><b>上传失败！图片格式错误</b></span>");
                    break
                default:
                    $("#dialog-tiaozhuan-content").html("<span style='color:red'><b>上传失败！</b></span>");
            }
            // $("#dialog-tiaozhuan-content").html("<span style='color:red'><b>上传失败！图片重复</b></span>");
            $("#dialog-tiaozhuan").dialog("open");
        },
    c.on("click",
        function () {
            return o(this).hasClass("disabled") ? !1 : void("ready" === k ? n.upload() : "paused" === k ? n.upload() : "uploading" === k && n.stop())
        }),
        p.on("click", ".retry",
            function () {
                n.retry()
            }),
        p.on("click", ".ignore",
            function () {
//        toastr["warning"]("warning", "todo")
                $("#dialog-tiaozhuan-content").html("<span style='color:red'><b>上传失败！" + e + "</b></span>");
                $("#dialog-tiaozhuan").dialog("open");
            }),
        c.addClass("state-" + k),
        s()
}

