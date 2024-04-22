(() => {
    var __webpack_modules__ = {
        97: function(module) {
            /**
 * lightgallery | 2.7.1 | January 11th 2023
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */
            !function(t, e) {
                true ? module.exports = e() : 0;
            }(0, (function() {
                "use strict";
                var t = function() {
                    return (t = Object.assign || function(t) {
                        for (var e, i = 1, s = arguments.length; i < s; i++) for (var h in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, h) && (t[h] = e[h]);
                        return t;
                    }).apply(this, arguments);
                }, e = {
                    thumbnail: !0,
                    animateThumb: !0,
                    currentPagerPosition: "middle",
                    alignThumbnails: "middle",
                    thumbWidth: 100,
                    thumbHeight: "80px",
                    thumbMargin: 5,
                    appendThumbnailsTo: ".lg-components",
                    toggleThumb: !1,
                    enableThumbDrag: !0,
                    enableThumbSwipe: !0,
                    thumbnailSwipeThreshold: 10,
                    loadYouTubeThumbnail: !0,
                    youTubeThumbSize: 1,
                    thumbnailPluginStrings: {
                        toggleThumbnails: "Toggle thumbnails"
                    }
                }, i = "lgContainerResize", s = "lgUpdateSlides", h = "lgBeforeOpen", n = "lgBeforeSlide";
                return function() {
                    function o(t, e) {
                        return this.thumbOuterWidth = 0, this.thumbTotalWidth = 0, this.translateX = 0, 
                        this.thumbClickable = !1, this.core = t, this.$LG = e, this;
                    }
                    return o.prototype.init = function() {
                        this.settings = t(t({}, e), this.core.settings), this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.galleryItems.length * (this.settings.thumbWidth + this.settings.thumbMargin), 
                        this.translateX = 0, this.setAnimateThumbStyles(), this.core.settings.allowMediaOverlap || (this.settings.toggleThumb = !1), 
                        this.settings.thumbnail && (this.build(), this.settings.animateThumb ? (this.settings.enableThumbDrag && this.enableThumbDrag(), 
                        this.settings.enableThumbSwipe && this.enableThumbSwipe(), this.thumbClickable = !1) : this.thumbClickable = !0, 
                        this.toggleThumbBar(), this.thumbKeyPress());
                    }, o.prototype.build = function() {
                        var t = this;
                        this.setThumbMarkup(), this.manageActiveClassOnSlideChange(), this.$lgThumb.first().on("click.lg touchend.lg", (function(e) {
                            var i = t.$LG(e.target);
                            i.hasAttribute("data-lg-item-id") && setTimeout((function() {
                                if (t.thumbClickable && !t.core.lgBusy) {
                                    var e = parseInt(i.attr("data-lg-item-id"));
                                    t.core.slide(e, !1, !0, !1);
                                }
                            }), 50);
                        })), this.core.LGel.on(n + ".thumb", (function(e) {
                            var i = e.detail.index;
                            t.animateThumb(i);
                        })), this.core.LGel.on(h + ".thumb", (function() {
                            t.thumbOuterWidth = t.core.outer.get().offsetWidth;
                        })), this.core.LGel.on(s + ".thumb", (function() {
                            t.rebuildThumbnails();
                        })), this.core.LGel.on(i + ".thumb", (function() {
                            t.core.lgOpened && setTimeout((function() {
                                t.thumbOuterWidth = t.core.outer.get().offsetWidth, t.animateThumb(t.core.index), 
                                t.thumbOuterWidth = t.core.outer.get().offsetWidth;
                            }), 50);
                        }));
                    }, o.prototype.setThumbMarkup = function() {
                        var t = "lg-thumb-outer ";
                        this.settings.alignThumbnails && (t += "lg-thumb-align-" + this.settings.alignThumbnails);
                        var e = '<div class="' + t + '">\n        <div class="lg-thumb lg-group">\n        </div>\n        </div>';
                        this.core.outer.addClass("lg-has-thumb"), ".lg-components" === this.settings.appendThumbnailsTo ? this.core.$lgComponents.append(e) : this.core.outer.append(e), 
                        this.$thumbOuter = this.core.outer.find(".lg-thumb-outer").first(), this.$lgThumb = this.core.outer.find(".lg-thumb").first(), 
                        this.settings.animateThumb && this.core.outer.find(".lg-thumb").css("transition-duration", this.core.settings.speed + "ms").css("width", this.thumbTotalWidth + "px").css("position", "relative"), 
                        this.setThumbItemHtml(this.core.galleryItems);
                    }, o.prototype.enableThumbDrag = function() {
                        var t = this, e = {
                            cords: {
                                startX: 0,
                                endX: 0
                            },
                            isMoved: !1,
                            newTranslateX: 0,
                            startTime: new Date,
                            endTime: new Date,
                            touchMoveTime: 0
                        }, i = !1;
                        this.$thumbOuter.addClass("lg-grab"), this.core.outer.find(".lg-thumb").first().on("mousedown.lg.thumb", (function(s) {
                            t.thumbTotalWidth > t.thumbOuterWidth && (s.preventDefault(), e.cords.startX = s.pageX, 
                            e.startTime = new Date, t.thumbClickable = !1, i = !0, t.core.outer.get().scrollLeft += 1, 
                            t.core.outer.get().scrollLeft -= 1, t.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"));
                        })), this.$LG(window).on("mousemove.lg.thumb.global" + this.core.lgId, (function(s) {
                            t.core.lgOpened && i && (e.cords.endX = s.pageX, e = t.onThumbTouchMove(e));
                        })), this.$LG(window).on("mouseup.lg.thumb.global" + this.core.lgId, (function() {
                            t.core.lgOpened && (e.isMoved ? e = t.onThumbTouchEnd(e) : t.thumbClickable = !0, 
                            i && (i = !1, t.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab")));
                        }));
                    }, o.prototype.enableThumbSwipe = function() {
                        var t = this, e = {
                            cords: {
                                startX: 0,
                                endX: 0
                            },
                            isMoved: !1,
                            newTranslateX: 0,
                            startTime: new Date,
                            endTime: new Date,
                            touchMoveTime: 0
                        };
                        this.$lgThumb.on("touchstart.lg", (function(i) {
                            t.thumbTotalWidth > t.thumbOuterWidth && (i.preventDefault(), e.cords.startX = i.targetTouches[0].pageX, 
                            t.thumbClickable = !1, e.startTime = new Date);
                        })), this.$lgThumb.on("touchmove.lg", (function(i) {
                            t.thumbTotalWidth > t.thumbOuterWidth && (i.preventDefault(), e.cords.endX = i.targetTouches[0].pageX, 
                            e = t.onThumbTouchMove(e));
                        })), this.$lgThumb.on("touchend.lg", (function() {
                            e.isMoved ? e = t.onThumbTouchEnd(e) : t.thumbClickable = !0;
                        }));
                    }, o.prototype.rebuildThumbnails = function() {
                        var t = this;
                        this.$thumbOuter.addClass("lg-rebuilding-thumbnails"), setTimeout((function() {
                            t.thumbTotalWidth = t.core.galleryItems.length * (t.settings.thumbWidth + t.settings.thumbMargin), 
                            t.$lgThumb.css("width", t.thumbTotalWidth + "px"), t.$lgThumb.empty(), t.setThumbItemHtml(t.core.galleryItems), 
                            t.animateThumb(t.core.index);
                        }), 50), setTimeout((function() {
                            t.$thumbOuter.removeClass("lg-rebuilding-thumbnails");
                        }), 200);
                    }, o.prototype.setTranslate = function(t) {
                        this.$lgThumb.css("transform", "translate3d(-" + t + "px, 0px, 0px)");
                    }, o.prototype.getPossibleTransformX = function(t) {
                        return t > this.thumbTotalWidth - this.thumbOuterWidth && (t = this.thumbTotalWidth - this.thumbOuterWidth), 
                        t < 0 && (t = 0), t;
                    }, o.prototype.animateThumb = function(t) {
                        if (this.$lgThumb.css("transition-duration", this.core.settings.speed + "ms"), this.settings.animateThumb) {
                            var e = 0;
                            switch (this.settings.currentPagerPosition) {
                              case "left":
                                e = 0;
                                break;

                              case "middle":
                                e = this.thumbOuterWidth / 2 - this.settings.thumbWidth / 2;
                                break;

                              case "right":
                                e = this.thumbOuterWidth - this.settings.thumbWidth;
                            }
                            this.translateX = (this.settings.thumbWidth + this.settings.thumbMargin) * t - 1 - e, 
                            this.translateX > this.thumbTotalWidth - this.thumbOuterWidth && (this.translateX = this.thumbTotalWidth - this.thumbOuterWidth), 
                            this.translateX < 0 && (this.translateX = 0), this.setTranslate(this.translateX);
                        }
                    }, o.prototype.onThumbTouchMove = function(t) {
                        return t.newTranslateX = this.translateX, t.isMoved = !0, t.touchMoveTime = (new Date).valueOf(), 
                        t.newTranslateX -= t.cords.endX - t.cords.startX, t.newTranslateX = this.getPossibleTransformX(t.newTranslateX), 
                        this.setTranslate(t.newTranslateX), this.$thumbOuter.addClass("lg-dragging"), t;
                    }, o.prototype.onThumbTouchEnd = function(t) {
                        t.isMoved = !1, t.endTime = new Date, this.$thumbOuter.removeClass("lg-dragging");
                        var e = t.endTime.valueOf() - t.startTime.valueOf(), i = t.cords.endX - t.cords.startX, s = Math.abs(i) / e;
                        return s > .15 && t.endTime.valueOf() - t.touchMoveTime < 30 ? ((s += 1) > 2 && (s += 1), 
                        s += s * (Math.abs(i) / this.thumbOuterWidth), this.$lgThumb.css("transition-duration", Math.min(s - 1, 2) + "settings"), 
                        i *= s, this.translateX = this.getPossibleTransformX(this.translateX - i), this.setTranslate(this.translateX)) : this.translateX = t.newTranslateX, 
                        Math.abs(t.cords.endX - t.cords.startX) < this.settings.thumbnailSwipeThreshold && (this.thumbClickable = !0), 
                        t;
                    }, o.prototype.getThumbHtml = function(t, e) {
                        var i, s = this.core.galleryItems[e].__slideVideoInfo || {};
                        return i = s.youtube && this.settings.loadYouTubeThumbnail ? "//img.youtube.com/vi/" + s.youtube[1] + "/" + this.settings.youTubeThumbSize + ".jpg" : t, 
                        '<div data-lg-item-id="' + e + '" class="lg-thumb-item ' + (e === this.core.index ? " active" : "") + '" \n        style="width:' + this.settings.thumbWidth + "px; height: " + this.settings.thumbHeight + ";\n            margin-right: " + this.settings.thumbMargin + 'px;">\n            <img data-lg-item-id="' + e + '" src="' + i + '" />\n        </div>';
                    }, o.prototype.getThumbItemHtml = function(t) {
                        for (var e = "", i = 0; i < t.length; i++) e += this.getThumbHtml(t[i].thumb, i);
                        return e;
                    }, o.prototype.setThumbItemHtml = function(t) {
                        var e = this.getThumbItemHtml(t);
                        this.$lgThumb.html(e);
                    }, o.prototype.setAnimateThumbStyles = function() {
                        this.settings.animateThumb && this.core.outer.addClass("lg-animate-thumb");
                    }, o.prototype.manageActiveClassOnSlideChange = function() {
                        var t = this;
                        this.core.LGel.on(n + ".thumb", (function(e) {
                            var i = t.core.outer.find(".lg-thumb-item"), s = e.detail.index;
                            i.removeClass("active"), i.eq(s).addClass("active");
                        }));
                    }, o.prototype.toggleThumbBar = function() {
                        var t = this;
                        this.settings.toggleThumb && (this.core.outer.addClass("lg-can-toggle"), this.core.$toolbar.append('<button type="button" aria-label="' + this.settings.thumbnailPluginStrings.toggleThumbnails + '" class="lg-toggle-thumb lg-icon"></button>'), 
                        this.core.outer.find(".lg-toggle-thumb").first().on("click.lg", (function() {
                            t.core.outer.toggleClass("lg-components-open");
                        })));
                    }, o.prototype.thumbKeyPress = function() {
                        var t = this;
                        this.$LG(window).on("keydown.lg.thumb.global" + this.core.lgId, (function(e) {
                            t.core.lgOpened && t.settings.toggleThumb && (38 === e.keyCode ? (e.preventDefault(), 
                            t.core.outer.addClass("lg-components-open")) : 40 === e.keyCode && (e.preventDefault(), 
                            t.core.outer.removeClass("lg-components-open")));
                        }));
                    }, o.prototype.destroy = function() {
                        this.settings.thumbnail && (this.$LG(window).off(".lg.thumb.global" + this.core.lgId), 
                        this.core.LGel.off(".lg.thumb"), this.core.LGel.off(".thumb"), this.$thumbOuter.remove(), 
                        this.core.outer.removeClass("lg-has-thumb"));
                    }, o;
                }();
            }));
        },
        86: function(module) {
            /**
 * lightgallery | 2.7.1 | January 11th 2023
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */
            !function(e, t) {
                true ? module.exports = t() : 0;
            }(0, (function() {
                "use strict";
                var e = function() {
                    return (e = Object.assign || function(e) {
                        for (var t, o = 1, i = arguments.length; o < i; o++) for (var s in t = arguments[o]) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
                        return e;
                    }).apply(this, arguments);
                }, t = {
                    scale: 1,
                    zoom: !0,
                    actualSize: !0,
                    showZoomInOutIcons: !1,
                    actualSizeIcons: {
                        zoomIn: "lg-zoom-in",
                        zoomOut: "lg-zoom-out"
                    },
                    enableZoomAfter: 300,
                    zoomPluginStrings: {
                        zoomIn: "Zoom in",
                        zoomOut: "Zoom out",
                        viewActualSize: "View actual size"
                    }
                }, o = "lgContainerResize", i = "lgBeforeOpen", s = "lgAfterOpen", a = "lgSlideItemLoad", n = "lgAfterSlide", r = "lgRotateLeft", l = "lgRotateRight", c = "lgFlipHorizontal", g = "lgFlipVertical";
                return function() {
                    function h(o, i) {
                        return this.core = o, this.$LG = i, this.settings = e(e({}, t), this.core.settings), 
                        this;
                    }
                    return h.prototype.buildTemplates = function() {
                        var e = this.settings.showZoomInOutIcons ? '<button id="' + this.core.getIdName("lg-zoom-in") + '" type="button" aria-label="' + this.settings.zoomPluginStrings.zoomIn + '" class="lg-zoom-in lg-icon"></button><button id="' + this.core.getIdName("lg-zoom-out") + '" type="button" aria-label="' + this.settings.zoomPluginStrings.zoomIn + '" class="lg-zoom-out lg-icon"></button>' : "";
                        this.settings.actualSize && (e += '<button id="' + this.core.getIdName("lg-actual-size") + '" type="button" aria-label="' + this.settings.zoomPluginStrings.viewActualSize + '" class="' + this.settings.actualSizeIcons.zoomIn + ' lg-icon"></button>'), 
                        this.core.outer.addClass("lg-use-transition-for-zoom"), this.core.$toolbar.first().append(e);
                    }, h.prototype.enableZoom = function(e) {
                        var t = this, o = this.settings.enableZoomAfter + e.detail.delay;
                        this.$LG("body").first().hasClass("lg-from-hash") && e.detail.delay ? o = 0 : this.$LG("body").first().removeClass("lg-from-hash"), 
                        this.zoomableTimeout = setTimeout((function() {
                            t.isImageSlide(t.core.index) && (t.core.getSlideItem(e.detail.index).addClass("lg-zoomable"), 
                            e.detail.index === t.core.index && t.setZoomEssentials());
                        }), o + 30);
                    }, h.prototype.enableZoomOnSlideItemLoad = function() {
                        this.core.LGel.on(a + ".zoom", this.enableZoom.bind(this));
                    }, h.prototype.getDragCords = function(e) {
                        return {
                            x: e.pageX,
                            y: e.pageY
                        };
                    }, h.prototype.getSwipeCords = function(e) {
                        return {
                            x: e.touches[0].pageX,
                            y: e.touches[0].pageY
                        };
                    }, h.prototype.getDragAllowedAxises = function(e, t) {
                        var o = this.core.getSlideItem(this.core.index).find(".lg-image").first().get(), i = 0, s = 0, a = o.getBoundingClientRect();
                        e ? (i = o.offsetHeight * e, s = o.offsetWidth * e) : t ? (i = a.height + t * a.height, 
                        s = a.width + t * a.width) : (i = a.height, s = a.width);
                        var n = i > this.containerRect.height;
                        return {
                            allowX: s > this.containerRect.width,
                            allowY: n
                        };
                    }, h.prototype.setZoomEssentials = function() {
                        this.containerRect = this.core.$content.get().getBoundingClientRect();
                    }, h.prototype.zoomImage = function(e, t, o, i) {
                        if (!(Math.abs(t) <= 0)) {
                            var s, a, n = this.containerRect.width / 2 + this.containerRect.left, r = this.containerRect.height / 2 + this.containerRect.top + this.scrollTop;
                            1 === e && (this.positionChanged = !1);
                            var l = this.getDragAllowedAxises(0, t), c = l.allowY, g = l.allowX;
                            this.positionChanged && (s = this.left / (this.scale - t), a = this.top / (this.scale - t), 
                            this.pageX = n - s, this.pageY = r - a, this.positionChanged = !1);
                            var h, m, u = this.getPossibleSwipeDragCords(t), d = n - this.pageX, f = r - this.pageY;
                            if (e - t > 1) {
                                var p = (e - t) / Math.abs(t);
                                h = (d = (t < 0 ? -d : d) + this.left * (p + (t < 0 ? -1 : 1))) / p, m = (f = (t < 0 ? -f : f) + this.top * (p + (t < 0 ? -1 : 1))) / p;
                            } else h = d * (p = (e - t) * t), m = f * p;
                            o && (g ? this.isBeyondPossibleLeft(h, u.minX) ? h = u.minX : this.isBeyondPossibleRight(h, u.maxX) && (h = u.maxX) : e > 1 && (h < u.minX ? h = u.minX : h > u.maxX && (h = u.maxX)), 
                            c ? this.isBeyondPossibleTop(m, u.minY) ? m = u.minY : this.isBeyondPossibleBottom(m, u.maxY) && (m = u.maxY) : e > 1 && (m < u.minY ? m = u.minY : m > u.maxY && (m = u.maxY))), 
                            this.setZoomStyles({
                                x: h,
                                y: m,
                                scale: e
                            }), this.left = h, this.top = m, i && this.setZoomImageSize();
                        }
                    }, h.prototype.resetImageTranslate = function(e) {
                        if (this.isImageSlide(e)) {
                            var t = this.core.getSlideItem(e).find(".lg-image").first();
                            this.imageReset = !1, t.removeClass("reset-transition reset-transition-y reset-transition-x"), 
                            this.core.outer.removeClass("lg-actual-size"), t.css("width", "auto").css("height", "auto"), 
                            setTimeout((function() {
                                t.removeClass("no-transition");
                            }), 10);
                        }
                    }, h.prototype.setZoomImageSize = function() {
                        var e = this, t = this.core.getSlideItem(this.core.index).find(".lg-image").first();
                        setTimeout((function() {
                            var o = e.getCurrentImageActualSizeScale();
                            e.scale >= o && (t.addClass("no-transition"), e.imageReset = !0);
                        }), 500), setTimeout((function() {
                            var o = e.getCurrentImageActualSizeScale();
                            if (e.scale >= o) {
                                var i = e.getDragAllowedAxises(e.scale);
                                t.css("width", t.get().naturalWidth + "px").css("height", t.get().naturalHeight + "px"), 
                                e.core.outer.addClass("lg-actual-size"), i.allowX && i.allowY ? t.addClass("reset-transition") : i.allowX && !i.allowY ? t.addClass("reset-transition-x") : !i.allowX && i.allowY && t.addClass("reset-transition-y");
                            }
                        }), 550);
                    }, h.prototype.setZoomStyles = function(e) {
                        var t = this.core.getSlideItem(this.core.index).find(".lg-img-wrap").first(), o = this.core.getSlideItem(this.core.index).find(".lg-image").first(), i = this.core.outer.find(".lg-current .lg-dummy-img").first();
                        this.scale = e.scale, o.css("transform", "scale3d(" + e.scale + ", " + e.scale + ", 1)"), 
                        i.css("transform", "scale3d(" + e.scale + ", " + e.scale + ", 1)");
                        var s = "translate3d(" + e.x + "px, " + e.y + "px, 0)";
                        t.css("transform", s);
                    }, h.prototype.setActualSize = function(e, t) {
                        var o = this, i = this.core.galleryItems[this.core.index];
                        this.resetImageTranslate(e), setTimeout((function() {
                            if (i.src && !o.core.outer.hasClass("lg-first-slide-loading")) {
                                var e = o.getCurrentImageActualSizeScale(), s = o.scale;
                                o.core.outer.hasClass("lg-zoomed") ? o.scale = 1 : o.scale = o.getScale(e), o.setPageCords(t), 
                                o.beginZoom(o.scale), o.zoomImage(o.scale, o.scale - s, !0, !0), setTimeout((function() {
                                    o.core.outer.removeClass("lg-grabbing").addClass("lg-grab");
                                }), 10);
                            }
                        }), 50);
                    }, h.prototype.getNaturalWidth = function(e) {
                        var t = this.core.getSlideItem(e).find(".lg-image").first(), o = this.core.galleryItems[e].width;
                        return o ? parseFloat(o) : t.get().naturalWidth;
                    }, h.prototype.getActualSizeScale = function(e, t) {
                        return e >= t ? e / t || 2 : 1;
                    }, h.prototype.getCurrentImageActualSizeScale = function() {
                        var e = this.core.getSlideItem(this.core.index).find(".lg-image").first().get().offsetWidth, t = this.getNaturalWidth(this.core.index) || e;
                        return this.getActualSizeScale(t, e);
                    }, h.prototype.getPageCords = function(e) {
                        var t = {};
                        if (e) t.x = e.pageX || e.touches[0].pageX, t.y = e.pageY || e.touches[0].pageY; else {
                            var o = this.core.$content.get().getBoundingClientRect();
                            t.x = o.width / 2 + o.left, t.y = o.height / 2 + this.scrollTop + o.top;
                        }
                        return t;
                    }, h.prototype.setPageCords = function(e) {
                        var t = this.getPageCords(e);
                        this.pageX = t.x, this.pageY = t.y;
                    }, h.prototype.manageActualPixelClassNames = function() {
                        this.core.getElementById("lg-actual-size").removeClass(this.settings.actualSizeIcons.zoomIn).addClass(this.settings.actualSizeIcons.zoomOut);
                    }, h.prototype.beginZoom = function(e) {
                        return this.core.outer.removeClass("lg-zoom-drag-transition lg-zoom-dragging"), 
                        e > 1 ? (this.core.outer.addClass("lg-zoomed"), this.manageActualPixelClassNames()) : this.resetZoom(), 
                        e > 1;
                    }, h.prototype.getScale = function(e) {
                        var t = this.getCurrentImageActualSizeScale();
                        return e < 1 ? e = 1 : e > t && (e = t), e;
                    }, h.prototype.init = function() {
                        var e = this;
                        if (this.settings.zoom) {
                            this.buildTemplates(), this.enableZoomOnSlideItemLoad();
                            var t = null;
                            this.core.outer.on("dblclick.lg", (function(t) {
                                e.$LG(t.target).hasClass("lg-image") && e.setActualSize(e.core.index, t);
                            })), this.core.outer.on("touchstart.lg", (function(o) {
                                var i = e.$LG(o.target);
                                1 === o.touches.length && i.hasClass("lg-image") && (t ? (clearTimeout(t), t = null, 
                                o.preventDefault(), e.setActualSize(e.core.index, o)) : t = setTimeout((function() {
                                    t = null;
                                }), 300));
                            })), this.core.LGel.on(o + ".zoom " + l + ".zoom " + r + ".zoom " + c + ".zoom " + g + ".zoom", (function() {
                                if (e.core.lgOpened && e.isImageSlide(e.core.index) && !e.core.touchAction) {
                                    var t = e.core.getSlideItem(e.core.index).find(".lg-img-wrap").first();
                                    e.top = 0, e.left = 0, e.setZoomEssentials(), e.setZoomSwipeStyles(t, {
                                        x: 0,
                                        y: 0
                                    }), e.positionChanged = !0;
                                }
                            })), this.$LG(window).on("scroll.lg.zoom.global" + this.core.lgId, (function() {
                                e.core.lgOpened && (e.scrollTop = e.$LG(window).scrollTop());
                            })), this.core.getElementById("lg-zoom-out").on("click.lg", (function() {
                                if (e.isImageSlide(e.core.index)) {
                                    var t = 0;
                                    e.imageReset && (e.resetImageTranslate(e.core.index), t = 50), setTimeout((function() {
                                        var t = e.scale - e.settings.scale;
                                        t < 1 && (t = 1), e.beginZoom(t), e.zoomImage(t, -e.settings.scale, !0, !0);
                                    }), t);
                                }
                            })), this.core.getElementById("lg-zoom-in").on("click.lg", (function() {
                                e.zoomIn();
                            })), this.core.getElementById("lg-actual-size").on("click.lg", (function() {
                                e.setActualSize(e.core.index);
                            })), this.core.LGel.on(i + ".zoom", (function() {
                                e.core.outer.find(".lg-item").removeClass("lg-zoomable");
                            })), this.core.LGel.on(s + ".zoom", (function() {
                                e.scrollTop = e.$LG(window).scrollTop(), e.pageX = e.core.outer.width() / 2, e.pageY = e.core.outer.height() / 2 + e.scrollTop, 
                                e.scale = 1;
                            })), this.core.LGel.on(n + ".zoom", (function(t) {
                                var o = t.detail.prevIndex;
                                e.scale = 1, e.positionChanged = !1, e.resetZoom(o), e.resetImageTranslate(o), e.isImageSlide(e.core.index) && e.setZoomEssentials();
                            })), this.zoomDrag(), this.pinchZoom(), this.zoomSwipe(), this.zoomableTimeout = !1, 
                            this.positionChanged = !1;
                        }
                    }, h.prototype.zoomIn = function() {
                        if (this.isImageSlide(this.core.index)) {
                            var e = this.scale + this.settings.scale;
                            e = this.getScale(e), this.beginZoom(e), this.zoomImage(e, Math.min(this.settings.scale, e - this.scale), !0, !0);
                        }
                    }, h.prototype.resetZoom = function(e) {
                        this.core.outer.removeClass("lg-zoomed lg-zoom-drag-transition");
                        var t = this.core.getElementById("lg-actual-size"), o = this.core.getSlideItem(void 0 !== e ? e : this.core.index);
                        t.removeClass(this.settings.actualSizeIcons.zoomOut).addClass(this.settings.actualSizeIcons.zoomIn), 
                        o.find(".lg-img-wrap").first().removeAttr("style"), o.find(".lg-image").first().removeAttr("style"), 
                        this.scale = 1, this.left = 0, this.top = 0, this.setPageCords();
                    }, h.prototype.getTouchDistance = function(e) {
                        return Math.sqrt((e.touches[0].pageX - e.touches[1].pageX) * (e.touches[0].pageX - e.touches[1].pageX) + (e.touches[0].pageY - e.touches[1].pageY) * (e.touches[0].pageY - e.touches[1].pageY));
                    }, h.prototype.pinchZoom = function() {
                        var e = this, t = 0, o = !1, i = 1, s = 0, a = this.core.getSlideItem(this.core.index);
                        this.core.outer.on("touchstart.lg", (function(o) {
                            if (a = e.core.getSlideItem(e.core.index), e.isImageSlide(e.core.index) && 2 === o.touches.length) {
                                if (o.preventDefault(), e.core.outer.hasClass("lg-first-slide-loading")) return;
                                i = e.scale || 1, e.core.outer.removeClass("lg-zoom-drag-transition lg-zoom-dragging"), 
                                e.setPageCords(o), e.resetImageTranslate(e.core.index), e.core.touchAction = "pinch", 
                                t = e.getTouchDistance(o);
                            }
                        })), this.core.$inner.on("touchmove.lg", (function(n) {
                            if (2 === n.touches.length && "pinch" === e.core.touchAction && (e.$LG(n.target).hasClass("lg-item") || a.get().contains(n.target))) {
                                n.preventDefault();
                                var r = e.getTouchDistance(n), l = t - r;
                                if (!o && Math.abs(l) > 5 && (o = !0), o) {
                                    s = e.scale;
                                    var c = Math.max(1, i + .02 * -l);
                                    e.scale = Math.round(100 * (c + Number.EPSILON)) / 100;
                                    var g = e.scale - s;
                                    e.zoomImage(e.scale, Math.round(100 * (g + Number.EPSILON)) / 100, !1, !1);
                                }
                            }
                        })), this.core.$inner.on("touchend.lg", (function(i) {
                            if ("pinch" === e.core.touchAction && (e.$LG(i.target).hasClass("lg-item") || a.get().contains(i.target))) {
                                if (o = !1, t = 0, e.scale <= 1) e.resetZoom(); else {
                                    var s = e.getCurrentImageActualSizeScale();
                                    if (e.scale >= s) {
                                        var n = s - e.scale;
                                        0 === n && (n = .01), e.zoomImage(s, n, !1, !0);
                                    }
                                    e.manageActualPixelClassNames(), e.core.outer.addClass("lg-zoomed");
                                }
                                e.core.touchAction = void 0;
                            }
                        }));
                    }, h.prototype.touchendZoom = function(e, t, o, i, s) {
                        var a = t.x - e.x, n = t.y - e.y, r = Math.abs(a) / s + 1, l = Math.abs(n) / s + 1;
                        r > 2 && (r += 1), l > 2 && (l += 1), a *= r, n *= l;
                        var c = this.core.getSlideItem(this.core.index).find(".lg-img-wrap").first(), g = {};
                        g.x = this.left + a, g.y = this.top + n;
                        var h = this.getPossibleSwipeDragCords();
                        (Math.abs(a) > 15 || Math.abs(n) > 15) && (i && (this.isBeyondPossibleTop(g.y, h.minY) ? g.y = h.minY : this.isBeyondPossibleBottom(g.y, h.maxY) && (g.y = h.maxY)), 
                        o && (this.isBeyondPossibleLeft(g.x, h.minX) ? g.x = h.minX : this.isBeyondPossibleRight(g.x, h.maxX) && (g.x = h.maxX)), 
                        i ? this.top = g.y : g.y = this.top, o ? this.left = g.x : g.x = this.left, this.setZoomSwipeStyles(c, g), 
                        this.positionChanged = !0);
                    }, h.prototype.getZoomSwipeCords = function(e, t, o, i, s) {
                        var a = {};
                        if (i) {
                            if (a.y = this.top + (t.y - e.y), this.isBeyondPossibleTop(a.y, s.minY)) {
                                var n = s.minY - a.y;
                                a.y = s.minY - n / 6;
                            } else if (this.isBeyondPossibleBottom(a.y, s.maxY)) {
                                var r = a.y - s.maxY;
                                a.y = s.maxY + r / 6;
                            }
                        } else a.y = this.top;
                        if (o) {
                            if (a.x = this.left + (t.x - e.x), this.isBeyondPossibleLeft(a.x, s.minX)) {
                                var l = s.minX - a.x;
                                a.x = s.minX - l / 6;
                            } else if (this.isBeyondPossibleRight(a.x, s.maxX)) {
                                var c = a.x - s.maxX;
                                a.x = s.maxX + c / 6;
                            }
                        } else a.x = this.left;
                        return a;
                    }, h.prototype.isBeyondPossibleLeft = function(e, t) {
                        return e >= t;
                    }, h.prototype.isBeyondPossibleRight = function(e, t) {
                        return e <= t;
                    }, h.prototype.isBeyondPossibleTop = function(e, t) {
                        return e >= t;
                    }, h.prototype.isBeyondPossibleBottom = function(e, t) {
                        return e <= t;
                    }, h.prototype.isImageSlide = function(e) {
                        var t = this.core.galleryItems[e];
                        return "image" === this.core.getSlideType(t);
                    }, h.prototype.getPossibleSwipeDragCords = function(e) {
                        var t = this.core.getSlideItem(this.core.index).find(".lg-image").first(), o = this.core.mediaContainerPosition.bottom, i = t.get().getBoundingClientRect(), s = i.height, a = i.width;
                        return e && (s += e * s, a += e * a), {
                            minY: (s - this.containerRect.height) / 2,
                            maxY: (this.containerRect.height - s) / 2 + o,
                            minX: (a - this.containerRect.width) / 2,
                            maxX: (this.containerRect.width - a) / 2
                        };
                    }, h.prototype.setZoomSwipeStyles = function(e, t) {
                        e.css("transform", "translate3d(" + t.x + "px, " + t.y + "px, 0)");
                    }, h.prototype.zoomSwipe = function() {
                        var e, t, o = this, i = {}, s = {}, a = !1, n = !1, r = !1, l = new Date, c = (new Date, 
                        this.core.getSlideItem(this.core.index));
                        this.core.$inner.on("touchstart.lg", (function(s) {
                            if (o.isImageSlide(o.core.index) && (c = o.core.getSlideItem(o.core.index), (o.$LG(s.target).hasClass("lg-item") || c.get().contains(s.target)) && 1 === s.touches.length && o.core.outer.hasClass("lg-zoomed"))) {
                                s.preventDefault(), l = new Date, o.core.touchAction = "zoomSwipe", t = o.core.getSlideItem(o.core.index).find(".lg-img-wrap").first();
                                var a = o.getDragAllowedAxises(0);
                                r = a.allowY, ((n = a.allowX) || r) && (i = o.getSwipeCords(s)), e = o.getPossibleSwipeDragCords(), 
                                o.core.outer.addClass("lg-zoom-dragging lg-zoom-drag-transition");
                            }
                        })), this.core.$inner.on("touchmove.lg", (function(l) {
                            if (1 === l.touches.length && "zoomSwipe" === o.core.touchAction && (o.$LG(l.target).hasClass("lg-item") || c.get().contains(l.target))) {
                                l.preventDefault(), o.core.touchAction = "zoomSwipe", s = o.getSwipeCords(l);
                                var g = o.getZoomSwipeCords(i, s, n, r, e);
                                (Math.abs(s.x - i.x) > 15 || Math.abs(s.y - i.y) > 15) && (a = !0, o.setZoomSwipeStyles(t, g));
                            }
                        })), this.core.$inner.on("touchend.lg", (function(e) {
                            if ("zoomSwipe" === o.core.touchAction && (o.$LG(e.target).hasClass("lg-item") || c.get().contains(e.target))) {
                                if (e.preventDefault(), o.core.touchAction = void 0, o.core.outer.removeClass("lg-zoom-dragging"), 
                                !a) return;
                                a = !1;
                                var t = (new Date).valueOf() - l.valueOf();
                                o.touchendZoom(i, s, n, r, t);
                            }
                        }));
                    }, h.prototype.zoomDrag = function() {
                        var e, t, o, i, s = this, a = {}, n = {}, r = !1, l = !1, c = !1, g = !1;
                        this.core.outer.on("mousedown.lg.zoom", (function(t) {
                            if (s.isImageSlide(s.core.index)) {
                                var n = s.core.getSlideItem(s.core.index);
                                if (s.$LG(t.target).hasClass("lg-item") || n.get().contains(t.target)) {
                                    e = new Date, i = s.core.getSlideItem(s.core.index).find(".lg-img-wrap").first();
                                    var l = s.getDragAllowedAxises(0);
                                    g = l.allowY, c = l.allowX, s.core.outer.hasClass("lg-zoomed") && s.$LG(t.target).hasClass("lg-object") && (c || g) && (t.preventDefault(), 
                                    a = s.getDragCords(t), o = s.getPossibleSwipeDragCords(), r = !0, s.core.outer.removeClass("lg-grab").addClass("lg-grabbing lg-zoom-drag-transition lg-zoom-dragging"));
                                }
                            }
                        })), this.$LG(window).on("mousemove.lg.zoom.global" + this.core.lgId, (function(e) {
                            if (r) {
                                l = !0, n = s.getDragCords(e);
                                var t = s.getZoomSwipeCords(a, n, c, g, o);
                                s.setZoomSwipeStyles(i, t);
                            }
                        })), this.$LG(window).on("mouseup.lg.zoom.global" + this.core.lgId, (function(o) {
                            if (r) {
                                if (t = new Date, r = !1, s.core.outer.removeClass("lg-zoom-dragging"), l && (a.x !== n.x || a.y !== n.y)) {
                                    n = s.getDragCords(o);
                                    var i = t.valueOf() - e.valueOf();
                                    s.touchendZoom(a, n, c, g, i);
                                }
                                l = !1;
                            }
                            s.core.outer.removeClass("lg-grabbing").addClass("lg-grab");
                        }));
                    }, h.prototype.closeGallery = function() {
                        this.resetZoom();
                    }, h.prototype.destroy = function() {
                        this.$LG(window).off(".lg.zoom.global" + this.core.lgId), this.core.LGel.off(".lg.zoom"), 
                        this.core.LGel.off(".zoom"), clearTimeout(this.zoomableTimeout), this.zoomableTimeout = !1;
                    }, h;
                }();
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        const modules_flsModules = {};
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(2 == webP.height);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = true === support ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        function spollers() {
            const spollersArray = document.querySelectorAll("[data-spollers]");
            if (spollersArray.length > 0) {
                const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                    return !item.dataset.spollers.split(",")[0];
                }));
                if (spollersRegular.length) initSpollers(spollersRegular);
                let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", (function() {
                        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                function initSpollers(spollersArray, matchMedia = false) {
                    spollersArray.forEach((spollersBlock => {
                        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                        if (matchMedia.matches || !matchMedia) {
                            spollersBlock.classList.add("_spoller-init");
                            initSpollerBody(spollersBlock);
                            spollersBlock.addEventListener("click", setSpollerAction);
                        } else {
                            spollersBlock.classList.remove("_spoller-init");
                            initSpollerBody(spollersBlock, false);
                            spollersBlock.removeEventListener("click", setSpollerAction);
                        }
                    }));
                }
                function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                    let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                    if (spollerTitles.length) {
                        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                        spollerTitles.forEach((spollerTitle => {
                            if (hideSpollerBody) {
                                spollerTitle.removeAttribute("tabindex");
                                if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                            } else {
                                spollerTitle.setAttribute("tabindex", "-1");
                                spollerTitle.nextElementSibling.hidden = false;
                            }
                        }));
                    }
                }
                function setSpollerAction(e) {
                    const el = e.target;
                    if (el.closest("[data-spoller]")) {
                        const spollerTitle = el.closest("[data-spoller]");
                        const spollersBlock = spollerTitle.closest("[data-spollers]");
                        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        if (!spollersBlock.querySelectorAll("._slide").length) {
                            if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                            spollerTitle.classList.toggle("_spoller-active");
                            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                        }
                        e.preventDefault();
                    }
                }
                function hideSpollersBody(spollersBlock) {
                    const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                        spollerActiveTitle.classList.remove("_spoller-active");
                        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                    }
                }
                const spollersClose = document.querySelectorAll("[data-spoller-close]");
                if (spollersClose.length) document.addEventListener("click", (function(e) {
                    const el = e.target;
                    if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
                        const spollersBlock = spollerClose.closest("[data-spollers]");
                        if (spollersBlock.classList.contains("_spoller-init")) {
                            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                            spollerClose.classList.remove("_spoller-active");
                            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                        }
                    }));
                }));
            }
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter((function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            }));
            if (media.length) {
                const breakpointsArray = [];
                media.forEach((item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                }));
                let mdQueries = breakpointsArray.map((function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                }));
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach((breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter((function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        }));
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    }));
                    return mdQueriesArray;
                }
            }
        }
        function ssr_window_esm_isObject(obj) {
            return null !== obj && "object" === typeof obj && "constructor" in obj && obj.constructor === Object;
        }
        function extend(target = {}, src = {}) {
            Object.keys(src).forEach((key => {
                if ("undefined" === typeof target[key]) target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
            }));
        }
        const ssrDocument = {
            body: {},
            addEventListener() {},
            removeEventListener() {},
            activeElement: {
                blur() {},
                nodeName: ""
            },
            querySelector() {
                return null;
            },
            querySelectorAll() {
                return [];
            },
            getElementById() {
                return null;
            },
            createEvent() {
                return {
                    initEvent() {}
                };
            },
            createElement() {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute() {},
                    getElementsByTagName() {
                        return [];
                    }
                };
            },
            createElementNS() {
                return {};
            },
            importNode() {
                return null;
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            }
        };
        function ssr_window_esm_getDocument() {
            const doc = "undefined" !== typeof document ? document : {};
            extend(doc, ssrDocument);
            return doc;
        }
        const ssrWindow = {
            document: ssrDocument,
            navigator: {
                userAgent: ""
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            },
            history: {
                replaceState() {},
                pushState() {},
                go() {},
                back() {}
            },
            CustomEvent: function CustomEvent() {
                return this;
            },
            addEventListener() {},
            removeEventListener() {},
            getComputedStyle() {
                return {
                    getPropertyValue() {
                        return "";
                    }
                };
            },
            Image() {},
            Date() {},
            screen: {},
            setTimeout() {},
            clearTimeout() {},
            matchMedia() {
                return {};
            },
            requestAnimationFrame(callback) {
                if ("undefined" === typeof setTimeout) {
                    callback();
                    return null;
                }
                return setTimeout(callback, 0);
            },
            cancelAnimationFrame(id) {
                if ("undefined" === typeof setTimeout) return;
                clearTimeout(id);
            }
        };
        function ssr_window_esm_getWindow() {
            const win = "undefined" !== typeof window ? window : {};
            extend(win, ssrWindow);
            return win;
        }
        function makeReactive(obj) {
            const proto = obj.__proto__;
            Object.defineProperty(obj, "__proto__", {
                get() {
                    return proto;
                },
                set(value) {
                    proto.__proto__ = value;
                }
            });
        }
        class Dom7 extends Array {
            constructor(items) {
                if ("number" === typeof items) super(items); else {
                    super(...items || []);
                    makeReactive(this);
                }
            }
        }
        function arrayFlat(arr = []) {
            const res = [];
            arr.forEach((el => {
                if (Array.isArray(el)) res.push(...arrayFlat(el)); else res.push(el);
            }));
            return res;
        }
        function arrayFilter(arr, callback) {
            return Array.prototype.filter.call(arr, callback);
        }
        function arrayUnique(arr) {
            const uniqueArray = [];
            for (let i = 0; i < arr.length; i += 1) if (-1 === uniqueArray.indexOf(arr[i])) uniqueArray.push(arr[i]);
            return uniqueArray;
        }
        function qsa(selector, context) {
            if ("string" !== typeof selector) return [ selector ];
            const a = [];
            const res = context.querySelectorAll(selector);
            for (let i = 0; i < res.length; i += 1) a.push(res[i]);
            return a;
        }
        function dom7_esm_$(selector, context) {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            let arr = [];
            if (!context && selector instanceof Dom7) return selector;
            if (!selector) return new Dom7(arr);
            if ("string" === typeof selector) {
                const html = selector.trim();
                if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0) {
                    let toCreate = "div";
                    if (0 === html.indexOf("<li")) toCreate = "ul";
                    if (0 === html.indexOf("<tr")) toCreate = "tbody";
                    if (0 === html.indexOf("<td") || 0 === html.indexOf("<th")) toCreate = "tr";
                    if (0 === html.indexOf("<tbody")) toCreate = "table";
                    if (0 === html.indexOf("<option")) toCreate = "select";
                    const tempParent = document.createElement(toCreate);
                    tempParent.innerHTML = html;
                    for (let i = 0; i < tempParent.childNodes.length; i += 1) arr.push(tempParent.childNodes[i]);
                } else arr = qsa(selector.trim(), context || document);
            } else if (selector.nodeType || selector === window || selector === document) arr.push(selector); else if (Array.isArray(selector)) {
                if (selector instanceof Dom7) return selector;
                arr = selector;
            }
            return new Dom7(arrayUnique(arr));
        }
        dom7_esm_$.fn = Dom7.prototype;
        function addClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                el.classList.add(...classNames);
            }));
            return this;
        }
        function removeClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                el.classList.remove(...classNames);
            }));
            return this;
        }
        function toggleClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                classNames.forEach((className => {
                    el.classList.toggle(className);
                }));
            }));
        }
        function hasClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            return arrayFilter(this, (el => classNames.filter((className => el.classList.contains(className))).length > 0)).length > 0;
        }
        function attr(attrs, value) {
            if (1 === arguments.length && "string" === typeof attrs) {
                if (this[0]) return this[0].getAttribute(attrs);
                return;
            }
            for (let i = 0; i < this.length; i += 1) if (2 === arguments.length) this[i].setAttribute(attrs, value); else for (const attrName in attrs) {
                this[i][attrName] = attrs[attrName];
                this[i].setAttribute(attrName, attrs[attrName]);
            }
            return this;
        }
        function removeAttr(attr) {
            for (let i = 0; i < this.length; i += 1) this[i].removeAttribute(attr);
            return this;
        }
        function transform(transform) {
            for (let i = 0; i < this.length; i += 1) this[i].style.transform = transform;
            return this;
        }
        function transition(duration) {
            for (let i = 0; i < this.length; i += 1) this[i].style.transitionDuration = "string" !== typeof duration ? `${duration}ms` : duration;
            return this;
        }
        function on(...args) {
            let [eventType, targetSelector, listener, capture] = args;
            if ("function" === typeof args[1]) {
                [eventType, listener, capture] = args;
                targetSelector = void 0;
            }
            if (!capture) capture = false;
            function handleLiveEvent(e) {
                const target = e.target;
                if (!target) return;
                const eventData = e.target.dom7EventData || [];
                if (eventData.indexOf(e) < 0) eventData.unshift(e);
                if (dom7_esm_$(target).is(targetSelector)) listener.apply(target, eventData); else {
                    const parents = dom7_esm_$(target).parents();
                    for (let k = 0; k < parents.length; k += 1) if (dom7_esm_$(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
                }
            }
            function handleEvent(e) {
                const eventData = e && e.target ? e.target.dom7EventData || [] : [];
                if (eventData.indexOf(e) < 0) eventData.unshift(e);
                listener.apply(this, eventData);
            }
            const events = eventType.split(" ");
            let j;
            for (let i = 0; i < this.length; i += 1) {
                const el = this[i];
                if (!targetSelector) for (j = 0; j < events.length; j += 1) {
                    const event = events[j];
                    if (!el.dom7Listeners) el.dom7Listeners = {};
                    if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
                    el.dom7Listeners[event].push({
                        listener,
                        proxyListener: handleEvent
                    });
                    el.addEventListener(event, handleEvent, capture);
                } else for (j = 0; j < events.length; j += 1) {
                    const event = events[j];
                    if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
                    if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
                    el.dom7LiveListeners[event].push({
                        listener,
                        proxyListener: handleLiveEvent
                    });
                    el.addEventListener(event, handleLiveEvent, capture);
                }
            }
            return this;
        }
        function off(...args) {
            let [eventType, targetSelector, listener, capture] = args;
            if ("function" === typeof args[1]) {
                [eventType, listener, capture] = args;
                targetSelector = void 0;
            }
            if (!capture) capture = false;
            const events = eventType.split(" ");
            for (let i = 0; i < events.length; i += 1) {
                const event = events[i];
                for (let j = 0; j < this.length; j += 1) {
                    const el = this[j];
                    let handlers;
                    if (!targetSelector && el.dom7Listeners) handlers = el.dom7Listeners[event]; else if (targetSelector && el.dom7LiveListeners) handlers = el.dom7LiveListeners[event];
                    if (handlers && handlers.length) for (let k = handlers.length - 1; k >= 0; k -= 1) {
                        const handler = handlers[k];
                        if (listener && handler.listener === listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        } else if (!listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        }
                    }
                }
            }
            return this;
        }
        function trigger(...args) {
            const window = ssr_window_esm_getWindow();
            const events = args[0].split(" ");
            const eventData = args[1];
            for (let i = 0; i < events.length; i += 1) {
                const event = events[i];
                for (let j = 0; j < this.length; j += 1) {
                    const el = this[j];
                    if (window.CustomEvent) {
                        const evt = new window.CustomEvent(event, {
                            detail: eventData,
                            bubbles: true,
                            cancelable: true
                        });
                        el.dom7EventData = args.filter(((data, dataIndex) => dataIndex > 0));
                        el.dispatchEvent(evt);
                        el.dom7EventData = [];
                        delete el.dom7EventData;
                    }
                }
            }
            return this;
        }
        function transitionEnd(callback) {
            const dom = this;
            function fireCallBack(e) {
                if (e.target !== this) return;
                callback.call(this, e);
                dom.off("transitionend", fireCallBack);
            }
            if (callback) dom.on("transitionend", fireCallBack);
            return this;
        }
        function dom7_esm_outerWidth(includeMargins) {
            if (this.length > 0) {
                if (includeMargins) {
                    const styles = this.styles();
                    return this[0].offsetWidth + parseFloat(styles.getPropertyValue("margin-right")) + parseFloat(styles.getPropertyValue("margin-left"));
                }
                return this[0].offsetWidth;
            }
            return null;
        }
        function dom7_esm_outerHeight(includeMargins) {
            if (this.length > 0) {
                if (includeMargins) {
                    const styles = this.styles();
                    return this[0].offsetHeight + parseFloat(styles.getPropertyValue("margin-top")) + parseFloat(styles.getPropertyValue("margin-bottom"));
                }
                return this[0].offsetHeight;
            }
            return null;
        }
        function offset() {
            if (this.length > 0) {
                const window = ssr_window_esm_getWindow();
                const document = ssr_window_esm_getDocument();
                const el = this[0];
                const box = el.getBoundingClientRect();
                const body = document.body;
                const clientTop = el.clientTop || body.clientTop || 0;
                const clientLeft = el.clientLeft || body.clientLeft || 0;
                const scrollTop = el === window ? window.scrollY : el.scrollTop;
                const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
                return {
                    top: box.top + scrollTop - clientTop,
                    left: box.left + scrollLeft - clientLeft
                };
            }
            return null;
        }
        function styles() {
            const window = ssr_window_esm_getWindow();
            if (this[0]) return window.getComputedStyle(this[0], null);
            return {};
        }
        function css(props, value) {
            const window = ssr_window_esm_getWindow();
            let i;
            if (1 === arguments.length) if ("string" === typeof props) {
                if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
            } else {
                for (i = 0; i < this.length; i += 1) for (const prop in props) this[i].style[prop] = props[prop];
                return this;
            }
            if (2 === arguments.length && "string" === typeof props) {
                for (i = 0; i < this.length; i += 1) this[i].style[props] = value;
                return this;
            }
            return this;
        }
        function each(callback) {
            if (!callback) return this;
            this.forEach(((el, index) => {
                callback.apply(el, [ el, index ]);
            }));
            return this;
        }
        function filter(callback) {
            const result = arrayFilter(this, callback);
            return dom7_esm_$(result);
        }
        function html(html) {
            if ("undefined" === typeof html) return this[0] ? this[0].innerHTML : null;
            for (let i = 0; i < this.length; i += 1) this[i].innerHTML = html;
            return this;
        }
        function dom7_esm_text(text) {
            if ("undefined" === typeof text) return this[0] ? this[0].textContent.trim() : null;
            for (let i = 0; i < this.length; i += 1) this[i].textContent = text;
            return this;
        }
        function is(selector) {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            const el = this[0];
            let compareWith;
            let i;
            if (!el || "undefined" === typeof selector) return false;
            if ("string" === typeof selector) {
                if (el.matches) return el.matches(selector);
                if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                compareWith = dom7_esm_$(selector);
                for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
                return false;
            }
            if (selector === document) return el === document;
            if (selector === window) return el === window;
            if (selector.nodeType || selector instanceof Dom7) {
                compareWith = selector.nodeType ? [ selector ] : selector;
                for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
                return false;
            }
            return false;
        }
        function index() {
            let child = this[0];
            let i;
            if (child) {
                i = 0;
                while (null !== (child = child.previousSibling)) if (1 === child.nodeType) i += 1;
                return i;
            }
            return;
        }
        function eq(index) {
            if ("undefined" === typeof index) return this;
            const length = this.length;
            if (index > length - 1) return dom7_esm_$([]);
            if (index < 0) {
                const returnIndex = length + index;
                if (returnIndex < 0) return dom7_esm_$([]);
                return dom7_esm_$([ this[returnIndex] ]);
            }
            return dom7_esm_$([ this[index] ]);
        }
        function append(...els) {
            let newChild;
            const document = ssr_window_esm_getDocument();
            for (let k = 0; k < els.length; k += 1) {
                newChild = els[k];
                for (let i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = newChild;
                    while (tempDiv.firstChild) this[i].appendChild(tempDiv.firstChild);
                } else if (newChild instanceof Dom7) for (let j = 0; j < newChild.length; j += 1) this[i].appendChild(newChild[j]); else this[i].appendChild(newChild);
            }
            return this;
        }
        function prepend(newChild) {
            const document = ssr_window_esm_getDocument();
            let i;
            let j;
            for (i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = newChild;
                for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
            } else if (newChild instanceof Dom7) for (j = 0; j < newChild.length; j += 1) this[i].insertBefore(newChild[j], this[i].childNodes[0]); else this[i].insertBefore(newChild, this[i].childNodes[0]);
            return this;
        }
        function next(selector) {
            if (this.length > 0) {
                if (selector) {
                    if (this[0].nextElementSibling && dom7_esm_$(this[0].nextElementSibling).is(selector)) return dom7_esm_$([ this[0].nextElementSibling ]);
                    return dom7_esm_$([]);
                }
                if (this[0].nextElementSibling) return dom7_esm_$([ this[0].nextElementSibling ]);
                return dom7_esm_$([]);
            }
            return dom7_esm_$([]);
        }
        function nextAll(selector) {
            const nextEls = [];
            let el = this[0];
            if (!el) return dom7_esm_$([]);
            while (el.nextElementSibling) {
                const next = el.nextElementSibling;
                if (selector) {
                    if (dom7_esm_$(next).is(selector)) nextEls.push(next);
                } else nextEls.push(next);
                el = next;
            }
            return dom7_esm_$(nextEls);
        }
        function prev(selector) {
            if (this.length > 0) {
                const el = this[0];
                if (selector) {
                    if (el.previousElementSibling && dom7_esm_$(el.previousElementSibling).is(selector)) return dom7_esm_$([ el.previousElementSibling ]);
                    return dom7_esm_$([]);
                }
                if (el.previousElementSibling) return dom7_esm_$([ el.previousElementSibling ]);
                return dom7_esm_$([]);
            }
            return dom7_esm_$([]);
        }
        function prevAll(selector) {
            const prevEls = [];
            let el = this[0];
            if (!el) return dom7_esm_$([]);
            while (el.previousElementSibling) {
                const prev = el.previousElementSibling;
                if (selector) {
                    if (dom7_esm_$(prev).is(selector)) prevEls.push(prev);
                } else prevEls.push(prev);
                el = prev;
            }
            return dom7_esm_$(prevEls);
        }
        function dom7_esm_parent(selector) {
            const parents = [];
            for (let i = 0; i < this.length; i += 1) if (null !== this[i].parentNode) if (selector) {
                if (dom7_esm_$(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
            } else parents.push(this[i].parentNode);
            return dom7_esm_$(parents);
        }
        function parents(selector) {
            const parents = [];
            for (let i = 0; i < this.length; i += 1) {
                let parent = this[i].parentNode;
                while (parent) {
                    if (selector) {
                        if (dom7_esm_$(parent).is(selector)) parents.push(parent);
                    } else parents.push(parent);
                    parent = parent.parentNode;
                }
            }
            return dom7_esm_$(parents);
        }
        function closest(selector) {
            let closest = this;
            if ("undefined" === typeof selector) return dom7_esm_$([]);
            if (!closest.is(selector)) closest = closest.parents(selector).eq(0);
            return closest;
        }
        function find(selector) {
            const foundElements = [];
            for (let i = 0; i < this.length; i += 1) {
                const found = this[i].querySelectorAll(selector);
                for (let j = 0; j < found.length; j += 1) foundElements.push(found[j]);
            }
            return dom7_esm_$(foundElements);
        }
        function children(selector) {
            const children = [];
            for (let i = 0; i < this.length; i += 1) {
                const childNodes = this[i].children;
                for (let j = 0; j < childNodes.length; j += 1) if (!selector || dom7_esm_$(childNodes[j]).is(selector)) children.push(childNodes[j]);
            }
            return dom7_esm_$(children);
        }
        function remove() {
            for (let i = 0; i < this.length; i += 1) if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
            return this;
        }
        const noTrigger = "resize scroll".split(" ");
        function shortcut(name) {
            function eventHandler(...args) {
                if ("undefined" === typeof args[0]) {
                    for (let i = 0; i < this.length; i += 1) if (noTrigger.indexOf(name) < 0) if (name in this[i]) this[i][name](); else dom7_esm_$(this[i]).trigger(name);
                    return this;
                }
                return this.on(name, ...args);
            }
            return eventHandler;
        }
        shortcut("click");
        shortcut("blur");
        shortcut("focus");
        shortcut("focusin");
        shortcut("focusout");
        shortcut("keyup");
        shortcut("keydown");
        shortcut("keypress");
        shortcut("submit");
        shortcut("change");
        shortcut("mousedown");
        shortcut("mousemove");
        shortcut("mouseup");
        shortcut("mouseenter");
        shortcut("mouseleave");
        shortcut("mouseout");
        shortcut("mouseover");
        shortcut("touchstart");
        shortcut("touchend");
        shortcut("touchmove");
        shortcut("resize");
        shortcut("scroll");
        const Methods = {
            addClass,
            removeClass,
            hasClass,
            toggleClass,
            attr,
            removeAttr,
            transform,
            transition,
            on,
            off,
            trigger,
            transitionEnd,
            outerWidth: dom7_esm_outerWidth,
            outerHeight: dom7_esm_outerHeight,
            styles,
            offset,
            css,
            each,
            html,
            text: dom7_esm_text,
            is,
            index,
            eq,
            append,
            prepend,
            next,
            nextAll,
            prev,
            prevAll,
            parent: dom7_esm_parent,
            parents,
            closest,
            find,
            children,
            filter,
            remove
        };
        Object.keys(Methods).forEach((methodName => {
            Object.defineProperty(dom7_esm_$.fn, methodName, {
                value: Methods[methodName],
                writable: true
            });
        }));
        const dom = dom7_esm_$;
        function deleteProps(obj) {
            const object = obj;
            Object.keys(object).forEach((key => {
                try {
                    object[key] = null;
                } catch (e) {}
                try {
                    delete object[key];
                } catch (e) {}
            }));
        }
        function utils_nextTick(callback, delay = 0) {
            return setTimeout(callback, delay);
        }
        function utils_now() {
            return Date.now();
        }
        function utils_getComputedStyle(el) {
            const window = ssr_window_esm_getWindow();
            let style;
            if (window.getComputedStyle) style = window.getComputedStyle(el, null);
            if (!style && el.currentStyle) style = el.currentStyle;
            if (!style) style = el.style;
            return style;
        }
        function utils_getTranslate(el, axis = "x") {
            const window = ssr_window_esm_getWindow();
            let matrix;
            let curTransform;
            let transformMatrix;
            const curStyle = utils_getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
                transformMatrix = new window.WebKitCSSMatrix("none" === curTransform ? "" : curTransform);
            } else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
                matrix = transformMatrix.toString().split(",");
            }
            if ("x" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (16 === matrix.length) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
            if ("y" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (16 === matrix.length) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
            return curTransform || 0;
        }
        function utils_isObject(o) {
            return "object" === typeof o && null !== o && o.constructor && "Object" === Object.prototype.toString.call(o).slice(8, -1);
        }
        function isNode(node) {
            if ("undefined" !== typeof window && "undefined" !== typeof window.HTMLElement) return node instanceof HTMLElement;
            return node && (1 === node.nodeType || 11 === node.nodeType);
        }
        function utils_extend(...args) {
            const to = Object(args[0]);
            const noExtend = [ "__proto__", "constructor", "prototype" ];
            for (let i = 1; i < args.length; i += 1) {
                const nextSource = args[i];
                if (void 0 !== nextSource && null !== nextSource && !isNode(nextSource)) {
                    const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                    for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                        const nextKey = keysArray[nextIndex];
                        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (void 0 !== desc && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                            to[nextKey] = {};
                            if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                        } else to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
        function utils_setCSSProperty(el, varName, varValue) {
            el.style.setProperty(varName, varValue);
        }
        function animateCSSModeScroll({swiper, targetPosition, side}) {
            const window = ssr_window_esm_getWindow();
            const startPosition = -swiper.translate;
            let startTime = null;
            let time;
            const duration = swiper.params.speed;
            swiper.wrapperEl.style.scrollSnapType = "none";
            window.cancelAnimationFrame(swiper.cssModeFrameID);
            const dir = targetPosition > startPosition ? "next" : "prev";
            const isOutOfBound = (current, target) => "next" === dir && current >= target || "prev" === dir && current <= target;
            const animate = () => {
                time = (new Date).getTime();
                if (null === startTime) startTime = time;
                const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
                const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
                let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
                if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
                swiper.wrapperEl.scrollTo({
                    [side]: currentPosition
                });
                if (isOutOfBound(currentPosition, targetPosition)) {
                    swiper.wrapperEl.style.overflow = "hidden";
                    swiper.wrapperEl.style.scrollSnapType = "";
                    setTimeout((() => {
                        swiper.wrapperEl.style.overflow = "";
                        swiper.wrapperEl.scrollTo({
                            [side]: currentPosition
                        });
                    }));
                    window.cancelAnimationFrame(swiper.cssModeFrameID);
                    return;
                }
                swiper.cssModeFrameID = window.requestAnimationFrame(animate);
            };
            animate();
        }
        let support;
        function calcSupport() {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            return {
                smoothScroll: document.documentElement && "scrollBehavior" in document.documentElement.style,
                touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
                passiveListener: function checkPassiveListener() {
                    let supportsPassive = false;
                    try {
                        const opts = Object.defineProperty({}, "passive", {
                            get() {
                                supportsPassive = true;
                            }
                        });
                        window.addEventListener("testPassiveListener", null, opts);
                    } catch (e) {}
                    return supportsPassive;
                }(),
                gestures: function checkGestures() {
                    return "ongesturestart" in window;
                }()
            };
        }
        function getSupport() {
            if (!support) support = calcSupport();
            return support;
        }
        let deviceCached;
        function calcDevice({userAgent} = {}) {
            const support = getSupport();
            const window = ssr_window_esm_getWindow();
            const platform = window.navigator.platform;
            const ua = userAgent || window.navigator.userAgent;
            const device = {
                ios: false,
                android: false
            };
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            const windows = "Win32" === platform;
            let macos = "MacIntel" === platform;
            const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
            if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
                ipad = ua.match(/(Version)\/([\d.]+)/);
                if (!ipad) ipad = [ 0, 1, "13_0_0" ];
                macos = false;
            }
            if (android && !windows) {
                device.os = "android";
                device.android = true;
            }
            if (ipad || iphone || ipod) {
                device.os = "ios";
                device.ios = true;
            }
            return device;
        }
        function getDevice(overrides = {}) {
            if (!deviceCached) deviceCached = calcDevice(overrides);
            return deviceCached;
        }
        let browser;
        function calcBrowser() {
            const window = ssr_window_esm_getWindow();
            function isSafari() {
                const ua = window.navigator.userAgent.toLowerCase();
                return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
            }
            return {
                isSafari: isSafari(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
            };
        }
        function getBrowser() {
            if (!browser) browser = calcBrowser();
            return browser;
        }
        function Resize({swiper, on, emit}) {
            const window = ssr_window_esm_getWindow();
            let observer = null;
            let animationFrame = null;
            const resizeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("beforeResize");
                emit("resize");
            };
            const createObserver = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                observer = new ResizeObserver((entries => {
                    animationFrame = window.requestAnimationFrame((() => {
                        const {width, height} = swiper;
                        let newWidth = width;
                        let newHeight = height;
                        entries.forEach((({contentBoxSize, contentRect, target}) => {
                            if (target && target !== swiper.el) return;
                            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                        }));
                        if (newWidth !== width || newHeight !== height) resizeHandler();
                    }));
                }));
                observer.observe(swiper.el);
            };
            const removeObserver = () => {
                if (animationFrame) window.cancelAnimationFrame(animationFrame);
                if (observer && observer.unobserve && swiper.el) {
                    observer.unobserve(swiper.el);
                    observer = null;
                }
            };
            const orientationChangeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("orientationchange");
            };
            on("init", (() => {
                if (swiper.params.resizeObserver && "undefined" !== typeof window.ResizeObserver) {
                    createObserver();
                    return;
                }
                window.addEventListener("resize", resizeHandler);
                window.addEventListener("orientationchange", orientationChangeHandler);
            }));
            on("destroy", (() => {
                removeObserver();
                window.removeEventListener("resize", resizeHandler);
                window.removeEventListener("orientationchange", orientationChangeHandler);
            }));
        }
        function Observer({swiper, extendParams, on, emit}) {
            const observers = [];
            const window = ssr_window_esm_getWindow();
            const attach = (target, options = {}) => {
                const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
                const observer = new ObserverFunc((mutations => {
                    if (1 === mutations.length) {
                        emit("observerUpdate", mutations[0]);
                        return;
                    }
                    const observerUpdate = function observerUpdate() {
                        emit("observerUpdate", mutations[0]);
                    };
                    if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
                }));
                observer.observe(target, {
                    attributes: "undefined" === typeof options.attributes ? true : options.attributes,
                    childList: "undefined" === typeof options.childList ? true : options.childList,
                    characterData: "undefined" === typeof options.characterData ? true : options.characterData
                });
                observers.push(observer);
            };
            const init = () => {
                if (!swiper.params.observer) return;
                if (swiper.params.observeParents) {
                    const containerParents = swiper.$el.parents();
                    for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
                }
                attach(swiper.$el[0], {
                    childList: swiper.params.observeSlideChildren
                });
                attach(swiper.$wrapperEl[0], {
                    attributes: false
                });
            };
            const destroy = () => {
                observers.forEach((observer => {
                    observer.disconnect();
                }));
                observers.splice(0, observers.length);
            };
            extendParams({
                observer: false,
                observeParents: false,
                observeSlideChildren: false
            });
            on("init", init);
            on("destroy", destroy);
        }
        const events_emitter = {
            on(events, handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if ("function" !== typeof handler) return self;
                const method = priority ? "unshift" : "push";
                events.split(" ").forEach((event => {
                    if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                    self.eventsListeners[event][method](handler);
                }));
                return self;
            },
            once(events, handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if ("function" !== typeof handler) return self;
                function onceHandler(...args) {
                    self.off(events, onceHandler);
                    if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                    handler.apply(self, args);
                }
                onceHandler.__emitterProxy = handler;
                return self.on(events, onceHandler, priority);
            },
            onAny(handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if ("function" !== typeof handler) return self;
                const method = priority ? "unshift" : "push";
                if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
                return self;
            },
            offAny(handler) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsAnyListeners) return self;
                const index = self.eventsAnyListeners.indexOf(handler);
                if (index >= 0) self.eventsAnyListeners.splice(index, 1);
                return self;
            },
            off(events, handler) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsListeners) return self;
                events.split(" ").forEach((event => {
                    if ("undefined" === typeof handler) self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                        if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                    }));
                }));
                return self;
            },
            emit(...args) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsListeners) return self;
                let events;
                let data;
                let context;
                if ("string" === typeof args[0] || Array.isArray(args[0])) {
                    events = args[0];
                    data = args.slice(1, args.length);
                    context = self;
                } else {
                    events = args[0].events;
                    data = args[0].data;
                    context = args[0].context || self;
                }
                data.unshift(context);
                const eventsArray = Array.isArray(events) ? events : events.split(" ");
                eventsArray.forEach((event => {
                    if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                        eventHandler.apply(context, [ event, ...data ]);
                    }));
                    if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                        eventHandler.apply(context, data);
                    }));
                }));
                return self;
            }
        };
        function updateSize() {
            const swiper = this;
            let width;
            let height;
            const $el = swiper.$el;
            if ("undefined" !== typeof swiper.params.width && null !== swiper.params.width) width = swiper.params.width; else width = $el[0].clientWidth;
            if ("undefined" !== typeof swiper.params.height && null !== swiper.params.height) height = swiper.params.height; else height = $el[0].clientHeight;
            if (0 === width && swiper.isHorizontal() || 0 === height && swiper.isVertical()) return;
            width = width - parseInt($el.css("padding-left") || 0, 10) - parseInt($el.css("padding-right") || 0, 10);
            height = height - parseInt($el.css("padding-top") || 0, 10) - parseInt($el.css("padding-bottom") || 0, 10);
            if (Number.isNaN(width)) width = 0;
            if (Number.isNaN(height)) height = 0;
            Object.assign(swiper, {
                width,
                height,
                size: swiper.isHorizontal() ? width : height
            });
        }
        function updateSlides() {
            const swiper = this;
            function getDirectionLabel(property) {
                if (swiper.isHorizontal()) return property;
                return {
                    width: "height",
                    "margin-top": "margin-left",
                    "margin-bottom ": "margin-right",
                    "margin-left": "margin-top",
                    "margin-right": "margin-bottom",
                    "padding-left": "padding-top",
                    "padding-right": "padding-bottom",
                    marginRight: "marginBottom"
                }[property];
            }
            function getDirectionPropertyValue(node, label) {
                return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
            }
            const params = swiper.params;
            const {$wrapperEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
            const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
            const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
            let snapGrid = [];
            const slidesGrid = [];
            const slidesSizesGrid = [];
            let offsetBefore = params.slidesOffsetBefore;
            if ("function" === typeof offsetBefore) offsetBefore = params.slidesOffsetBefore.call(swiper);
            let offsetAfter = params.slidesOffsetAfter;
            if ("function" === typeof offsetAfter) offsetAfter = params.slidesOffsetAfter.call(swiper);
            const previousSnapGridLength = swiper.snapGrid.length;
            const previousSlidesGridLength = swiper.slidesGrid.length;
            let spaceBetween = params.spaceBetween;
            let slidePosition = -offsetBefore;
            let prevSlideSize = 0;
            let index = 0;
            if ("undefined" === typeof swiperSize) return;
            if ("string" === typeof spaceBetween && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
            swiper.virtualSize = -spaceBetween;
            if (rtl) slides.css({
                marginLeft: "",
                marginBottom: "",
                marginTop: ""
            }); else slides.css({
                marginRight: "",
                marginBottom: "",
                marginTop: ""
            });
            if (params.centeredSlides && params.cssMode) {
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", "");
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", "");
            }
            const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
            if (gridEnabled) swiper.grid.initSlides(slidesLength);
            let slideSize;
            const shouldResetSlideSize = "auto" === params.slidesPerView && params.breakpoints && Object.keys(params.breakpoints).filter((key => "undefined" !== typeof params.breakpoints[key].slidesPerView)).length > 0;
            for (let i = 0; i < slidesLength; i += 1) {
                slideSize = 0;
                const slide = slides.eq(i);
                if (gridEnabled) swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
                if ("none" === slide.css("display")) continue;
                if ("auto" === params.slidesPerView) {
                    if (shouldResetSlideSize) slides[i].style[getDirectionLabel("width")] = ``;
                    const slideStyles = getComputedStyle(slide[0]);
                    const currentTransform = slide[0].style.transform;
                    const currentWebKitTransform = slide[0].style.webkitTransform;
                    if (currentTransform) slide[0].style.transform = "none";
                    if (currentWebKitTransform) slide[0].style.webkitTransform = "none";
                    if (params.roundLengths) slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true); else {
                        const width = getDirectionPropertyValue(slideStyles, "width");
                        const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                        const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                        const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                        const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                        const boxSizing = slideStyles.getPropertyValue("box-sizing");
                        if (boxSizing && "border-box" === boxSizing) slideSize = width + marginLeft + marginRight; else {
                            const {clientWidth, offsetWidth} = slide[0];
                            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                        }
                    }
                    if (currentTransform) slide[0].style.transform = currentTransform;
                    if (currentWebKitTransform) slide[0].style.webkitTransform = currentWebKitTransform;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                } else {
                    slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                    if (slides[i]) slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
                }
                if (slides[i]) slides[i].swiperSlideSize = slideSize;
                slidesSizesGrid.push(slideSize);
                if (params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (0 === prevSlideSize && 0 !== i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (0 === i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                } else {
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
                swiper.virtualSize += slideSize + spaceBetween;
                prevSlideSize = slideSize;
                index += 1;
            }
            swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
            if (rtl && wrongRTL && ("slide" === params.effect || "coverflow" === params.effect)) $wrapperEl.css({
                width: `${swiper.virtualSize + params.spaceBetween}px`
            });
            if (params.setWrapperSize) $wrapperEl.css({
                [getDirectionLabel("width")]: `${swiper.virtualSize + params.spaceBetween}px`
            });
            if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
            if (!params.centeredSlides) {
                const newSlidesGrid = [];
                for (let i = 0; i < snapGrid.length; i += 1) {
                    let slidesGridItem = snapGrid[i];
                    if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                    if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
                }
                snapGrid = newSlidesGrid;
                if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
            }
            if (0 === snapGrid.length) snapGrid = [ 0 ];
            if (0 !== params.spaceBetween) {
                const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
                slides.filter(((_, slideIndex) => {
                    if (!params.cssMode) return true;
                    if (slideIndex === slides.length - 1) return false;
                    return true;
                })).css({
                    [key]: `${spaceBetween}px`
                });
            }
            if (params.centeredSlides && params.centeredSlidesBounds) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
                }));
                allSlidesSize -= params.spaceBetween;
                const maxSnap = allSlidesSize - swiperSize;
                snapGrid = snapGrid.map((snap => {
                    if (snap < 0) return -offsetBefore;
                    if (snap > maxSnap) return maxSnap + offsetAfter;
                    return snap;
                }));
            }
            if (params.centerInsufficientSlides) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
                }));
                allSlidesSize -= params.spaceBetween;
                if (allSlidesSize < swiperSize) {
                    const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
                    snapGrid.forEach(((snap, snapIndex) => {
                        snapGrid[snapIndex] = snap - allSlidesOffset;
                    }));
                    slidesGrid.forEach(((snap, snapIndex) => {
                        slidesGrid[snapIndex] = snap + allSlidesOffset;
                    }));
                }
            }
            Object.assign(swiper, {
                slides,
                snapGrid,
                slidesGrid,
                slidesSizesGrid
            });
            if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
                const addToSnapGrid = -swiper.snapGrid[0];
                const addToSlidesGrid = -swiper.slidesGrid[0];
                swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
                swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
            }
            if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
            if (snapGrid.length !== previousSnapGridLength) {
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                swiper.emit("snapGridLengthChange");
            }
            if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
            if (params.watchSlidesProgress) swiper.updateSlidesOffset();
            if (!isVirtual && !params.cssMode && ("slide" === params.effect || "fade" === params.effect)) {
                const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
                const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);
                if (slidesLength <= params.maxBackfaceHiddenSlides) {
                    if (!hasClassBackfaceClassAdded) swiper.$el.addClass(backFaceHiddenClass);
                } else if (hasClassBackfaceClassAdded) swiper.$el.removeClass(backFaceHiddenClass);
            }
        }
        function updateAutoHeight(speed) {
            const swiper = this;
            const activeSlides = [];
            const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            let newHeight = 0;
            let i;
            if ("number" === typeof speed) swiper.setTransition(speed); else if (true === speed) swiper.setTransition(swiper.params.speed);
            const getSlideByIndex = index => {
                if (isVirtual) return swiper.slides.filter((el => parseInt(el.getAttribute("data-swiper-slide-index"), 10) === index))[0];
                return swiper.slides.eq(index)[0];
            };
            if ("auto" !== swiper.params.slidesPerView && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || dom([])).each((slide => {
                activeSlides.push(slide);
            })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
                const index = swiper.activeIndex + i;
                if (index > swiper.slides.length && !isVirtual) break;
                activeSlides.push(getSlideByIndex(index));
            } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
            for (i = 0; i < activeSlides.length; i += 1) if ("undefined" !== typeof activeSlides[i]) {
                const height = activeSlides[i].offsetHeight;
                newHeight = height > newHeight ? height : newHeight;
            }
            if (newHeight || 0 === newHeight) swiper.$wrapperEl.css("height", `${newHeight}px`);
        }
        function updateSlidesOffset() {
            const swiper = this;
            const slides = swiper.slides;
            for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
        }
        function updateSlidesProgress(translate = this && this.translate || 0) {
            const swiper = this;
            const params = swiper.params;
            const {slides, rtlTranslate: rtl, snapGrid} = swiper;
            if (0 === slides.length) return;
            if ("undefined" === typeof slides[0].swiperSlideOffset) swiper.updateSlidesOffset();
            let offsetCenter = -translate;
            if (rtl) offsetCenter = translate;
            slides.removeClass(params.slideVisibleClass);
            swiper.visibleSlidesIndexes = [];
            swiper.visibleSlides = [];
            for (let i = 0; i < slides.length; i += 1) {
                const slide = slides[i];
                let slideOffset = slide.swiperSlideOffset;
                if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
                const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
                const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
                const slideBefore = -(offsetCenter - slideOffset);
                const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
                const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
                if (isVisible) {
                    swiper.visibleSlides.push(slide);
                    swiper.visibleSlidesIndexes.push(i);
                    slides.eq(i).addClass(params.slideVisibleClass);
                }
                slide.progress = rtl ? -slideProgress : slideProgress;
                slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
            }
            swiper.visibleSlides = dom(swiper.visibleSlides);
        }
        function updateProgress(translate) {
            const swiper = this;
            if ("undefined" === typeof translate) {
                const multiplier = swiper.rtlTranslate ? -1 : 1;
                translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
            }
            const params = swiper.params;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            let {progress, isBeginning, isEnd} = swiper;
            const wasBeginning = isBeginning;
            const wasEnd = isEnd;
            if (0 === translatesDiff) {
                progress = 0;
                isBeginning = true;
                isEnd = true;
            } else {
                progress = (translate - swiper.minTranslate()) / translatesDiff;
                isBeginning = progress <= 0;
                isEnd = progress >= 1;
            }
            Object.assign(swiper, {
                progress,
                isBeginning,
                isEnd
            });
            if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
            if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
            if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
            if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
            swiper.emit("progress", progress);
        }
        function updateSlidesClasses() {
            const swiper = this;
            const {slides, params, $wrapperEl, activeIndex, realIndex} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
            let activeSlide;
            if (isVirtual) activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`); else activeSlide = slides.eq(activeIndex);
            activeSlide.addClass(params.slideActiveClass);
            if (params.loop) if (activeSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
            let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);
            if (params.loop && 0 === nextSlide.length) {
                nextSlide = slides.eq(0);
                nextSlide.addClass(params.slideNextClass);
            }
            let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);
            if (params.loop && 0 === prevSlide.length) {
                prevSlide = slides.eq(-1);
                prevSlide.addClass(params.slidePrevClass);
            }
            if (params.loop) {
                if (nextSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass);
                if (prevSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass);
            }
            swiper.emitSlidesClasses();
        }
        function updateActiveIndex(newActiveIndex) {
            const swiper = this;
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            const {slidesGrid, snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
            let activeIndex = newActiveIndex;
            let snapIndex;
            if ("undefined" === typeof activeIndex) {
                for (let i = 0; i < slidesGrid.length; i += 1) if ("undefined" !== typeof slidesGrid[i + 1]) {
                    if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
                } else if (translate >= slidesGrid[i]) activeIndex = i;
                if (params.normalizeSlideIndex) if (activeIndex < 0 || "undefined" === typeof activeIndex) activeIndex = 0;
            }
            if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
                const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
                snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
            }
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            if (activeIndex === previousIndex) {
                if (snapIndex !== previousSnapIndex) {
                    swiper.snapIndex = snapIndex;
                    swiper.emit("snapIndexChange");
                }
                return;
            }
            const realIndex = parseInt(swiper.slides.eq(activeIndex).attr("data-swiper-slide-index") || activeIndex, 10);
            Object.assign(swiper, {
                snapIndex,
                realIndex,
                previousIndex,
                activeIndex
            });
            swiper.emit("activeIndexChange");
            swiper.emit("snapIndexChange");
            if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
            if (swiper.initialized || swiper.params.runCallbacksOnInit) swiper.emit("slideChange");
        }
        function updateClickedSlide(e) {
            const swiper = this;
            const params = swiper.params;
            const slide = dom(e).closest(`.${params.slideClass}`)[0];
            let slideFound = false;
            let slideIndex;
            if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
                slideFound = true;
                slideIndex = i;
                break;
            }
            if (slide && slideFound) {
                swiper.clickedSlide = slide;
                if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(dom(slide).attr("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
            } else {
                swiper.clickedSlide = void 0;
                swiper.clickedIndex = void 0;
                return;
            }
            if (params.slideToClickedSlide && void 0 !== swiper.clickedIndex && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
        }
        const update = {
            updateSize,
            updateSlides,
            updateAutoHeight,
            updateSlidesOffset,
            updateSlidesProgress,
            updateProgress,
            updateSlidesClasses,
            updateActiveIndex,
            updateClickedSlide
        };
        function getSwiperTranslate(axis = (this.isHorizontal() ? "x" : "y")) {
            const swiper = this;
            const {params, rtlTranslate: rtl, translate, $wrapperEl} = swiper;
            if (params.virtualTranslate) return rtl ? -translate : translate;
            if (params.cssMode) return translate;
            let currentTranslate = utils_getTranslate($wrapperEl[0], axis);
            if (rtl) currentTranslate = -currentTranslate;
            return currentTranslate || 0;
        }
        function setTranslate(translate, byController) {
            const swiper = this;
            const {rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress} = swiper;
            let x = 0;
            let y = 0;
            const z = 0;
            if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
            if (params.roundLengths) {
                x = Math.floor(x);
                y = Math.floor(y);
            }
            if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
            swiper.previousTranslate = swiper.translate;
            swiper.translate = swiper.isHorizontal() ? x : y;
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (0 === translatesDiff) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== progress) swiper.updateProgress(translate);
            swiper.emit("setTranslate", swiper.translate, byController);
        }
        function minTranslate() {
            return -this.snapGrid[0];
        }
        function maxTranslate() {
            return -this.snapGrid[this.snapGrid.length - 1];
        }
        function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
            const swiper = this;
            const {params, wrapperEl} = swiper;
            if (swiper.animating && params.preventInteractionOnTransition) return false;
            const minTranslate = swiper.minTranslate();
            const maxTranslate = swiper.maxTranslate();
            let newTranslate;
            if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
            swiper.updateProgress(newTranslate);
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                if (0 === speed) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: -newTranslate,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: -newTranslate,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            if (0 === speed) {
                swiper.setTransition(0);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionEnd");
                }
            } else {
                swiper.setTransition(speed);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionStart");
                }
                if (!swiper.animating) {
                    swiper.animating = true;
                    if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                        if (!swiper || swiper.destroyed) return;
                        if (e.target !== this) return;
                        swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                        swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
                        swiper.onTranslateToWrapperTransitionEnd = null;
                        delete swiper.onTranslateToWrapperTransitionEnd;
                        if (runCallbacks) swiper.emit("transitionEnd");
                    };
                    swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
                }
            }
            return true;
        }
        const translate = {
            getTranslate: getSwiperTranslate,
            setTranslate,
            minTranslate,
            maxTranslate,
            translateTo
        };
        function setTransition(duration, byController) {
            const swiper = this;
            if (!swiper.params.cssMode) swiper.$wrapperEl.transition(duration);
            swiper.emit("setTransition", duration, byController);
        }
        function transitionEmit({swiper, runCallbacks, direction, step}) {
            const {activeIndex, previousIndex} = swiper;
            let dir = direction;
            if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
            swiper.emit(`transition${step}`);
            if (runCallbacks && activeIndex !== previousIndex) {
                if ("reset" === dir) {
                    swiper.emit(`slideResetTransition${step}`);
                    return;
                }
                swiper.emit(`slideChangeTransition${step}`);
                if ("next" === dir) swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
            }
        }
        function transitionStart_transitionStart(runCallbacks = true, direction) {
            const swiper = this;
            const {params} = swiper;
            if (params.cssMode) return;
            if (params.autoHeight) swiper.updateAutoHeight();
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "Start"
            });
        }
        function transitionEnd_transitionEnd(runCallbacks = true, direction) {
            const swiper = this;
            const {params} = swiper;
            swiper.animating = false;
            if (params.cssMode) return;
            swiper.setTransition(0);
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "End"
            });
        }
        const core_transition = {
            setTransition,
            transitionStart: transitionStart_transitionStart,
            transitionEnd: transitionEnd_transitionEnd
        };
        function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
            if ("number" !== typeof index && "string" !== typeof index) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);
            if ("string" === typeof index) {
                const indexAsNumber = parseInt(index, 10);
                const isValidNumber = isFinite(indexAsNumber);
                if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
                index = indexAsNumber;
            }
            const swiper = this;
            let slideIndex = index;
            if (slideIndex < 0) slideIndex = 0;
            const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
            if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) return false;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
            let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            const translate = -snapGrid[snapIndex];
            if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
                const normalizedTranslate = -Math.floor(100 * translate);
                const normalizedGrid = Math.floor(100 * slidesGrid[i]);
                const normalizedGridNext = Math.floor(100 * slidesGrid[i + 1]);
                if ("undefined" !== typeof slidesGrid[i + 1]) {
                    if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
                } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
            }
            if (swiper.initialized && slideIndex !== activeIndex) {
                if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) return false;
                if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
            }
            if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
            swiper.updateProgress(translate);
            let direction;
            if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
            if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
                swiper.updateActiveIndex(slideIndex);
                if (params.autoHeight) swiper.updateAutoHeight();
                swiper.updateSlidesClasses();
                if ("slide" !== params.effect) swiper.setTranslate(translate);
                if ("reset" !== direction) {
                    swiper.transitionStart(runCallbacks, direction);
                    swiper.transitionEnd(runCallbacks, direction);
                }
                return false;
            }
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                const t = rtl ? translate : -translate;
                if (0 === speed) {
                    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                    if (isVirtual) {
                        swiper.wrapperEl.style.scrollSnapType = "none";
                        swiper._immediateVirtual = true;
                    }
                    wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    if (isVirtual) requestAnimationFrame((() => {
                        swiper.wrapperEl.style.scrollSnapType = "";
                        swiper._swiperImmediateVirtual = false;
                    }));
                } else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: t,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: t,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            swiper.setTransition(speed);
            swiper.setTranslate(translate);
            swiper.updateActiveIndex(slideIndex);
            swiper.updateSlidesClasses();
            swiper.emit("beforeTransitionStart", speed, internal);
            swiper.transitionStart(runCallbacks, direction);
            if (0 === speed) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                    swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
                    swiper.onSlideToWrapperTransitionEnd = null;
                    delete swiper.onSlideToWrapperTransitionEnd;
                    swiper.transitionEnd(runCallbacks, direction);
                };
                swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
            }
            return true;
        }
        function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
            if ("string" === typeof index) {
                const indexAsNumber = parseInt(index, 10);
                const isValidNumber = isFinite(indexAsNumber);
                if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
                index = indexAsNumber;
            }
            const swiper = this;
            let newIndex = index;
            if (swiper.params.loop) newIndex += swiper.loopedSlides;
            return swiper.slideTo(newIndex, speed, runCallbacks, internal);
        }
        function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
            const swiper = this;
            const {animating, enabled, params} = swiper;
            if (!enabled) return swiper;
            let perGroup = params.slidesPerGroup;
            if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
            const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
            if (params.loop) {
                if (animating && params.loopPreventsSlide) return false;
                swiper.loopFix();
                swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            }
            if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
            return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
        }
        function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
            const swiper = this;
            const {params, animating, snapGrid, slidesGrid, rtlTranslate, enabled} = swiper;
            if (!enabled) return swiper;
            if (params.loop) {
                if (animating && params.loopPreventsSlide) return false;
                swiper.loopFix();
                swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            }
            const translate = rtlTranslate ? swiper.translate : -swiper.translate;
            function normalize(val) {
                if (val < 0) return -Math.floor(Math.abs(val));
                return Math.floor(val);
            }
            const normalizedTranslate = normalize(translate);
            const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
            let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
            if ("undefined" === typeof prevSnap && params.cssMode) {
                let prevSnapIndex;
                snapGrid.forEach(((snap, snapIndex) => {
                    if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
                }));
                if ("undefined" !== typeof prevSnapIndex) prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
            }
            let prevIndex = 0;
            if ("undefined" !== typeof prevSnap) {
                prevIndex = slidesGrid.indexOf(prevSnap);
                if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
                if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) {
                    prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                    prevIndex = Math.max(prevIndex, 0);
                }
            }
            if (params.rewind && swiper.isBeginning) {
                const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
                return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
            }
            return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
        }
        function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
            const swiper = this;
            return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
        }
        function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = .5) {
            const swiper = this;
            let index = swiper.activeIndex;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
            const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            if (translate >= swiper.snapGrid[snapIndex]) {
                const currentSnap = swiper.snapGrid[snapIndex];
                const nextSnap = swiper.snapGrid[snapIndex + 1];
                if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
            } else {
                const prevSnap = swiper.snapGrid[snapIndex - 1];
                const currentSnap = swiper.snapGrid[snapIndex];
                if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
            }
            index = Math.max(index, 0);
            index = Math.min(index, swiper.slidesGrid.length - 1);
            return swiper.slideTo(index, speed, runCallbacks, internal);
        }
        function slideToClickedSlide() {
            const swiper = this;
            const {params, $wrapperEl} = swiper;
            const slidesPerView = "auto" === params.slidesPerView ? swiper.slidesPerViewDynamic() : params.slidesPerView;
            let slideToIndex = swiper.clickedIndex;
            let realIndex;
            if (params.loop) {
                if (swiper.animating) return;
                realIndex = parseInt(dom(swiper.clickedSlide).attr("data-swiper-slide-index"), 10);
                if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                    swiper.loopFix();
                    slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                    swiper.loopFix();
                    slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex);
            } else swiper.slideTo(slideToIndex);
        }
        const slide = {
            slideTo,
            slideToLoop,
            slideNext,
            slidePrev,
            slideReset,
            slideToClosest,
            slideToClickedSlide
        };
        function loopCreate() {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const {params, $wrapperEl} = swiper;
            const $selector = $wrapperEl.children().length > 0 ? dom($wrapperEl.children()[0].parentNode) : $wrapperEl;
            $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
            let slides = $selector.children(`.${params.slideClass}`);
            if (params.loopFillGroupWithBlank) {
                const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
                if (blankSlidesNum !== params.slidesPerGroup) {
                    for (let i = 0; i < blankSlidesNum; i += 1) {
                        const blankNode = dom(document.createElement("div")).addClass(`${params.slideClass} ${params.slideBlankClass}`);
                        $selector.append(blankNode);
                    }
                    slides = $selector.children(`.${params.slideClass}`);
                }
            }
            if ("auto" === params.slidesPerView && !params.loopedSlides) params.loopedSlides = slides.length;
            swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
            swiper.loopedSlides += params.loopAdditionalSlides;
            if (swiper.loopedSlides > slides.length && swiper.params.loopedSlidesLimit) swiper.loopedSlides = slides.length;
            const prependSlides = [];
            const appendSlides = [];
            slides.each(((el, index) => {
                const slide = dom(el);
                slide.attr("data-swiper-slide-index", index);
            }));
            for (let i = 0; i < swiper.loopedSlides; i += 1) {
                const index = i - Math.floor(i / slides.length) * slides.length;
                appendSlides.push(slides.eq(index)[0]);
                prependSlides.unshift(slides.eq(slides.length - index - 1)[0]);
            }
            for (let i = 0; i < appendSlides.length; i += 1) $selector.append(dom(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
            for (let i = prependSlides.length - 1; i >= 0; i -= 1) $selector.prepend(dom(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
        }
        function loopFix() {
            const swiper = this;
            swiper.emit("beforeLoopFix");
            const {activeIndex, slides, loopedSlides, allowSlidePrev, allowSlideNext, snapGrid, rtlTranslate: rtl} = swiper;
            let newIndex;
            swiper.allowSlidePrev = true;
            swiper.allowSlideNext = true;
            const snapTranslate = -snapGrid[activeIndex];
            const diff = snapTranslate - swiper.getTranslate();
            if (activeIndex < loopedSlides) {
                newIndex = slides.length - 3 * loopedSlides + activeIndex;
                newIndex += loopedSlides;
                const slideChanged = swiper.slideTo(newIndex, 0, false, true);
                if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            } else if (activeIndex >= slides.length - loopedSlides) {
                newIndex = -slides.length + activeIndex + loopedSlides;
                newIndex += loopedSlides;
                const slideChanged = swiper.slideTo(newIndex, 0, false, true);
                if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            }
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            swiper.emit("loopFix");
        }
        function loopDestroy() {
            const swiper = this;
            const {$wrapperEl, params, slides} = swiper;
            $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
            slides.removeAttr("data-swiper-slide-index");
        }
        const loop = {
            loopCreate,
            loopFix,
            loopDestroy
        };
        function setGrabCursor(moving) {
            const swiper = this;
            if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            const el = "container" === swiper.params.touchEventsTarget ? swiper.el : swiper.wrapperEl;
            el.style.cursor = "move";
            el.style.cursor = moving ? "grabbing" : "grab";
        }
        function unsetGrabCursor() {
            const swiper = this;
            if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            swiper["container" === swiper.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "";
        }
        const grab_cursor = {
            setGrabCursor,
            unsetGrabCursor
        };
        function closestElement(selector, base = this) {
            function __closestFrom(el) {
                if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
                if (el.assignedSlot) el = el.assignedSlot;
                const found = el.closest(selector);
                if (!found && !el.getRootNode) return null;
                return found || __closestFrom(el.getRootNode().host);
            }
            return __closestFrom(base);
        }
        function onTouchStart(event) {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const window = ssr_window_esm_getWindow();
            const data = swiper.touchEventsData;
            const {params, touches, enabled} = swiper;
            if (!enabled) return;
            if (swiper.animating && params.preventInteractionOnTransition) return;
            if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            let $targetEl = dom(e.target);
            if ("wrapper" === params.touchEventsTarget) if (!$targetEl.closest(swiper.wrapperEl).length) return;
            data.isTouchEvent = "touchstart" === e.type;
            if (!data.isTouchEvent && "which" in e && 3 === e.which) return;
            if (!data.isTouchEvent && "button" in e && e.button > 0) return;
            if (data.isTouched && data.isMoved) return;
            const swipingClassHasValue = !!params.noSwipingClass && "" !== params.noSwipingClass;
            const eventPath = event.composedPath ? event.composedPath() : event.path;
            if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) $targetEl = dom(eventPath[0]);
            const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
            const isTargetShadow = !!(e.target && e.target.shadowRoot);
            if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, $targetEl[0]) : $targetEl.closest(noSwipingSelector)[0])) {
                swiper.allowClick = true;
                return;
            }
            if (params.swipeHandler) if (!$targetEl.closest(params.swipeHandler)[0]) return;
            touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX;
            touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
            const startX = touches.currentX;
            const startY = touches.currentY;
            const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
            const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
            if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) if ("prevent" === edgeSwipeDetection) event.preventDefault(); else return;
            Object.assign(data, {
                isTouched: true,
                isMoved: false,
                allowTouchCallbacks: true,
                isScrolling: void 0,
                startMoving: void 0
            });
            touches.startX = startX;
            touches.startY = startY;
            data.touchStartTime = utils_now();
            swiper.allowClick = true;
            swiper.updateSize();
            swiper.swipeDirection = void 0;
            if (params.threshold > 0) data.allowThresholdMove = false;
            if ("touchstart" !== e.type) {
                let preventDefault = true;
                if ($targetEl.is(data.focusableElements)) {
                    preventDefault = false;
                    if ("SELECT" === $targetEl[0].nodeName) data.isTouched = false;
                }
                if (document.activeElement && dom(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) document.activeElement.blur();
                const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
                if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) e.preventDefault();
            }
            if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
            swiper.emit("touchStart", e);
        }
        function onTouchMove(event) {
            const document = ssr_window_esm_getDocument();
            const swiper = this;
            const data = swiper.touchEventsData;
            const {params, touches, rtlTranslate: rtl, enabled} = swiper;
            if (!enabled) return;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            if (!data.isTouched) {
                if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
                return;
            }
            if (data.isTouchEvent && "touchmove" !== e.type) return;
            const targetTouch = "touchmove" === e.type && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
            const pageX = "touchmove" === e.type ? targetTouch.pageX : e.pageX;
            const pageY = "touchmove" === e.type ? targetTouch.pageY : e.pageY;
            if (e.preventedByNestedSwiper) {
                touches.startX = pageX;
                touches.startY = pageY;
                return;
            }
            if (!swiper.allowTouchMove) {
                if (!dom(e.target).is(data.focusableElements)) swiper.allowClick = false;
                if (data.isTouched) {
                    Object.assign(touches, {
                        startX: pageX,
                        startY: pageY,
                        currentX: pageX,
                        currentY: pageY
                    });
                    data.touchStartTime = utils_now();
                }
                return;
            }
            if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
                if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                    data.isTouched = false;
                    data.isMoved = false;
                    return;
                }
            } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
            if (data.isTouchEvent && document.activeElement) if (e.target === document.activeElement && dom(e.target).is(data.focusableElements)) {
                data.isMoved = true;
                swiper.allowClick = false;
                return;
            }
            if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
            if (e.targetTouches && e.targetTouches.length > 1) return;
            touches.currentX = pageX;
            touches.currentY = pageY;
            const diffX = touches.currentX - touches.startX;
            const diffY = touches.currentY - touches.startY;
            if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
            if ("undefined" === typeof data.isScrolling) {
                let touchAngle;
                if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                    touchAngle = 180 * Math.atan2(Math.abs(diffY), Math.abs(diffX)) / Math.PI;
                    data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
                }
            }
            if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
            if ("undefined" === typeof data.startMoving) if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
            if (data.isScrolling) {
                data.isTouched = false;
                return;
            }
            if (!data.startMoving) return;
            swiper.allowClick = false;
            if (!params.cssMode && e.cancelable) e.preventDefault();
            if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
            if (!data.isMoved) {
                if (params.loop && !params.cssMode) swiper.loopFix();
                data.startTranslate = swiper.getTranslate();
                swiper.setTransition(0);
                if (swiper.animating) swiper.$wrapperEl.trigger("webkitTransitionEnd transitionend");
                data.allowMomentumBounce = false;
                if (params.grabCursor && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(true);
                swiper.emit("sliderFirstMove", e);
            }
            swiper.emit("sliderMove", e);
            data.isMoved = true;
            let diff = swiper.isHorizontal() ? diffX : diffY;
            touches.diff = diff;
            diff *= params.touchRatio;
            if (rtl) diff = -diff;
            swiper.swipeDirection = diff > 0 ? "prev" : "next";
            data.currentTranslate = diff + data.startTranslate;
            let disableParentSwiper = true;
            let resistanceRatio = params.resistanceRatio;
            if (params.touchReleaseOnEdges) resistanceRatio = 0;
            if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
            } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
            }
            if (disableParentSwiper) e.preventedByNestedSwiper = true;
            if (!swiper.allowSlideNext && "next" === swiper.swipeDirection && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && "prev" === swiper.swipeDirection && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
            if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
                if (!data.allowThresholdMove) {
                    data.allowThresholdMove = true;
                    touches.startX = touches.currentX;
                    touches.startY = touches.currentY;
                    data.currentTranslate = data.startTranslate;
                    touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                    return;
                }
            } else {
                data.currentTranslate = data.startTranslate;
                return;
            }
            if (!params.followFinger || params.cssMode) return;
            if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
            swiper.updateProgress(data.currentTranslate);
            swiper.setTranslate(data.currentTranslate);
        }
        function onTouchEnd(event) {
            const swiper = this;
            const data = swiper.touchEventsData;
            const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
            if (!enabled) return;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
            data.allowTouchCallbacks = false;
            if (!data.isTouched) {
                if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            if (params.grabCursor && data.isMoved && data.isTouched && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(false);
            const touchEndTime = utils_now();
            const timeDiff = touchEndTime - data.touchStartTime;
            if (swiper.allowClick) {
                const pathTree = e.path || e.composedPath && e.composedPath();
                swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
                swiper.emit("tap click", e);
                if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
            }
            data.lastClickTime = utils_now();
            utils_nextTick((() => {
                if (!swiper.destroyed) swiper.allowClick = true;
            }));
            if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || 0 === touches.diff || data.currentTranslate === data.startTranslate) {
                data.isTouched = false;
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            let currentPos;
            if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
            if (params.cssMode) return;
            if (swiper.params.freeMode && params.freeMode.enabled) {
                swiper.freeMode.onTouchEnd({
                    currentPos
                });
                return;
            }
            let stopIndex = 0;
            let groupSize = swiper.slidesSizesGrid[0];
            for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
                const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
                if ("undefined" !== typeof slidesGrid[i + increment]) {
                    if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                        stopIndex = i;
                        groupSize = slidesGrid[i + increment] - slidesGrid[i];
                    }
                } else if (currentPos >= slidesGrid[i]) {
                    stopIndex = i;
                    groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
                }
            }
            let rewindFirstIndex = null;
            let rewindLastIndex = null;
            if (params.rewind) if (swiper.isBeginning) rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
            const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
            const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if (timeDiff > params.longSwipesMs) {
                if (!params.longSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                if ("next" === swiper.swipeDirection) if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
                if ("prev" === swiper.swipeDirection) if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (null !== rewindLastIndex && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
            } else {
                if (!params.shortSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
                if (!isNavButtonTarget) {
                    if ("next" === swiper.swipeDirection) swiper.slideTo(null !== rewindFirstIndex ? rewindFirstIndex : stopIndex + increment);
                    if ("prev" === swiper.swipeDirection) swiper.slideTo(null !== rewindLastIndex ? rewindLastIndex : stopIndex);
                } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
            }
        }
        function onResize() {
            const swiper = this;
            const {params, el} = swiper;
            if (el && 0 === el.offsetWidth) return;
            if (params.breakpoints) swiper.setBreakpoint();
            const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
            swiper.allowSlideNext = true;
            swiper.allowSlidePrev = true;
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateSlidesClasses();
            if (("auto" === params.slidesPerView || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
            if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.run();
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
        }
        function onClick(e) {
            const swiper = this;
            if (!swiper.enabled) return;
            if (!swiper.allowClick) {
                if (swiper.params.preventClicks) e.preventDefault();
                if (swiper.params.preventClicksPropagation && swiper.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        }
        function onScroll() {
            const swiper = this;
            const {wrapperEl, rtlTranslate, enabled} = swiper;
            if (!enabled) return;
            swiper.previousTranslate = swiper.translate;
            if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
            if (0 === swiper.translate) swiper.translate = 0;
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (0 === translatesDiff) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
            swiper.emit("setTranslate", swiper.translate, false);
        }
        let dummyEventAttached = false;
        function dummyEventListener() {}
        const events = (swiper, method) => {
            const document = ssr_window_esm_getDocument();
            const {params, touchEvents, el, wrapperEl, device, support} = swiper;
            const capture = !!params.nested;
            const domMethod = "on" === method ? "addEventListener" : "removeEventListener";
            const swiperMethod = method;
            if (!support.touch) {
                el[domMethod](touchEvents.start, swiper.onTouchStart, false);
                document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
                document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
            } else {
                const passiveListener = "touchstart" === touchEvents.start && support.passiveListener && params.passiveListeners ? {
                    passive: true,
                    capture: false
                } : false;
                el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
                el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
                    passive: false,
                    capture
                } : capture);
                el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);
                if (touchEvents.cancel) el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
            }
            if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
            if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
            if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
        };
        function attachEvents() {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const {params, support} = swiper;
            swiper.onTouchStart = onTouchStart.bind(swiper);
            swiper.onTouchMove = onTouchMove.bind(swiper);
            swiper.onTouchEnd = onTouchEnd.bind(swiper);
            if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
            swiper.onClick = onClick.bind(swiper);
            if (support.touch && !dummyEventAttached) {
                document.addEventListener("touchstart", dummyEventListener);
                dummyEventAttached = true;
            }
            events(swiper, "on");
        }
        function detachEvents() {
            const swiper = this;
            events(swiper, "off");
        }
        const core_events = {
            attachEvents,
            detachEvents
        };
        const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
        function setBreakpoint() {
            const swiper = this;
            const {activeIndex, initialized, loopedSlides = 0, params, $el} = swiper;
            const breakpoints = params.breakpoints;
            if (!breakpoints || breakpoints && 0 === Object.keys(breakpoints).length) return;
            const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
            if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
            const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
            const breakpointParams = breakpointOnlyParams || swiper.originalParams;
            const wasMultiRow = isGridEnabled(swiper, params);
            const isMultiRow = isGridEnabled(swiper, breakpointParams);
            const wasEnabled = params.enabled;
            if (wasMultiRow && !isMultiRow) {
                $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            } else if (!wasMultiRow && isMultiRow) {
                $el.addClass(`${params.containerModifierClass}grid`);
                if (breakpointParams.grid.fill && "column" === breakpointParams.grid.fill || !breakpointParams.grid.fill && "column" === params.grid.fill) $el.addClass(`${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            }
            [ "navigation", "pagination", "scrollbar" ].forEach((prop => {
                const wasModuleEnabled = params[prop] && params[prop].enabled;
                const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
                if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
                if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
            }));
            const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
            const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
            if (directionChanged && initialized) swiper.changeDirection();
            utils_extend(swiper.params, breakpointParams);
            const isEnabled = swiper.params.enabled;
            Object.assign(swiper, {
                allowTouchMove: swiper.params.allowTouchMove,
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev
            });
            if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
            swiper.currentBreakpoint = breakpoint;
            swiper.emit("_beforeBreakpoint", breakpointParams);
            if (needsReLoop && initialized) {
                swiper.loopDestroy();
                swiper.loopCreate();
                swiper.updateSlides();
                swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
            }
            swiper.emit("breakpoint", breakpointParams);
        }
        function getBreakpoint(breakpoints, base = "window", containerEl) {
            if (!breakpoints || "container" === base && !containerEl) return;
            let breakpoint = false;
            const window = ssr_window_esm_getWindow();
            const currentHeight = "window" === base ? window.innerHeight : containerEl.clientHeight;
            const points = Object.keys(breakpoints).map((point => {
                if ("string" === typeof point && 0 === point.indexOf("@")) {
                    const minRatio = parseFloat(point.substr(1));
                    const value = currentHeight * minRatio;
                    return {
                        value,
                        point
                    };
                }
                return {
                    value: point,
                    point
                };
            }));
            points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
            for (let i = 0; i < points.length; i += 1) {
                const {point, value} = points[i];
                if ("window" === base) {
                    if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
                } else if (value <= containerEl.clientWidth) breakpoint = point;
            }
            return breakpoint || "max";
        }
        const breakpoints = {
            setBreakpoint,
            getBreakpoint
        };
        function prepareClasses(entries, prefix) {
            const resultClasses = [];
            entries.forEach((item => {
                if ("object" === typeof item) Object.keys(item).forEach((classNames => {
                    if (item[classNames]) resultClasses.push(prefix + classNames);
                })); else if ("string" === typeof item) resultClasses.push(prefix + item);
            }));
            return resultClasses;
        }
        function addClasses() {
            const swiper = this;
            const {classNames, params, rtl, $el, device, support} = swiper;
            const suffixes = prepareClasses([ "initialized", params.direction, {
                "pointer-events": !support.touch
            }, {
                "free-mode": swiper.params.freeMode && params.freeMode.enabled
            }, {
                autoheight: params.autoHeight
            }, {
                rtl
            }, {
                grid: params.grid && params.grid.rows > 1
            }, {
                "grid-column": params.grid && params.grid.rows > 1 && "column" === params.grid.fill
            }, {
                android: device.android
            }, {
                ios: device.ios
            }, {
                "css-mode": params.cssMode
            }, {
                centered: params.cssMode && params.centeredSlides
            }, {
                "watch-progress": params.watchSlidesProgress
            } ], params.containerModifierClass);
            classNames.push(...suffixes);
            $el.addClass([ ...classNames ].join(" "));
            swiper.emitContainerClasses();
        }
        function removeClasses_removeClasses() {
            const swiper = this;
            const {$el, classNames} = swiper;
            $el.removeClass(classNames.join(" "));
            swiper.emitContainerClasses();
        }
        const classes = {
            addClasses,
            removeClasses: removeClasses_removeClasses
        };
        function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
            const window = ssr_window_esm_getWindow();
            let image;
            function onReady() {
                if (callback) callback();
            }
            const isPicture = dom(imageEl).parent("picture")[0];
            if (!isPicture && (!imageEl.complete || !checkForComplete)) if (src) {
                image = new window.Image;
                image.onload = onReady;
                image.onerror = onReady;
                if (sizes) image.sizes = sizes;
                if (srcset) image.srcset = srcset;
                if (src) image.src = src;
            } else onReady(); else onReady();
        }
        function preloadImages() {
            const swiper = this;
            swiper.imagesToLoad = swiper.$el.find("img");
            function onReady() {
                if ("undefined" === typeof swiper || null === swiper || !swiper || swiper.destroyed) return;
                if (void 0 !== swiper.imagesLoaded) swiper.imagesLoaded += 1;
                if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
                    if (swiper.params.updateOnImagesReady) swiper.update();
                    swiper.emit("imagesReady");
                }
            }
            for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
                const imageEl = swiper.imagesToLoad[i];
                swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute("src"), imageEl.srcset || imageEl.getAttribute("srcset"), imageEl.sizes || imageEl.getAttribute("sizes"), true, onReady);
            }
        }
        const core_images = {
            loadImage,
            preloadImages
        };
        function checkOverflow() {
            const swiper = this;
            const {isLocked: wasLocked, params} = swiper;
            const {slidesOffsetBefore} = params;
            if (slidesOffsetBefore) {
                const lastSlideIndex = swiper.slides.length - 1;
                const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + 2 * slidesOffsetBefore;
                swiper.isLocked = swiper.size > lastSlideRightEdge;
            } else swiper.isLocked = 1 === swiper.snapGrid.length;
            if (true === params.allowSlideNext) swiper.allowSlideNext = !swiper.isLocked;
            if (true === params.allowSlidePrev) swiper.allowSlidePrev = !swiper.isLocked;
            if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
            if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
        }
        const check_overflow = {
            checkOverflow
        };
        const defaults = {
            init: true,
            direction: "horizontal",
            touchEventsTarget: "wrapper",
            initialSlide: 0,
            speed: 300,
            cssMode: false,
            updateOnWindowResize: true,
            resizeObserver: true,
            nested: false,
            createElements: false,
            enabled: true,
            focusableElements: "input, select, option, textarea, button, video, label",
            width: null,
            height: null,
            preventInteractionOnTransition: false,
            userAgent: null,
            url: null,
            edgeSwipeDetection: false,
            edgeSwipeThreshold: 20,
            autoHeight: false,
            setWrapperSize: false,
            virtualTranslate: false,
            effect: "slide",
            breakpoints: void 0,
            breakpointsBase: "window",
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            slidesPerGroupAuto: false,
            centeredSlides: false,
            centeredSlidesBounds: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: true,
            centerInsufficientSlides: false,
            watchOverflow: true,
            roundLengths: false,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: true,
            allowTouchMove: true,
            threshold: 0,
            touchMoveStopPropagation: false,
            touchStartPreventDefault: true,
            touchStartForcePreventDefault: false,
            touchReleaseOnEdges: false,
            uniqueNavElements: true,
            resistance: true,
            resistanceRatio: .85,
            watchSlidesProgress: false,
            grabCursor: false,
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            preloadImages: true,
            updateOnImagesReady: true,
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopedSlidesLimit: true,
            loopFillGroupWithBlank: false,
            loopPreventsSlide: true,
            rewind: false,
            allowSlidePrev: true,
            allowSlideNext: true,
            swipeHandler: null,
            noSwiping: true,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: true,
            maxBackfaceHiddenSlides: 10,
            containerModifierClass: "swiper-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: true,
            _emitClasses: false
        };
        function moduleExtendParams(params, allModulesParams) {
            return function extendParams(obj = {}) {
                const moduleParamName = Object.keys(obj)[0];
                const moduleParams = obj[moduleParamName];
                if ("object" !== typeof moduleParams || null === moduleParams) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if ([ "navigation", "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && true === params[moduleParamName]) params[moduleParamName] = {
                    auto: true
                };
                if (!(moduleParamName in params && "enabled" in moduleParams)) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if (true === params[moduleParamName]) params[moduleParamName] = {
                    enabled: true
                };
                if ("object" === typeof params[moduleParamName] && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
                if (!params[moduleParamName]) params[moduleParamName] = {
                    enabled: false
                };
                utils_extend(allModulesParams, obj);
            };
        }
        const prototypes = {
            eventsEmitter: events_emitter,
            update,
            translate,
            transition: core_transition,
            slide,
            loop,
            grabCursor: grab_cursor,
            events: core_events,
            breakpoints,
            checkOverflow: check_overflow,
            classes,
            images: core_images
        };
        const extendedDefaults = {};
        class core_Swiper {
            constructor(...args) {
                let el;
                let params;
                if (1 === args.length && args[0].constructor && "Object" === Object.prototype.toString.call(args[0]).slice(8, -1)) params = args[0]; else [el, params] = args;
                if (!params) params = {};
                params = utils_extend({}, params);
                if (el && !params.el) params.el = el;
                if (params.el && dom(params.el).length > 1) {
                    const swipers = [];
                    dom(params.el).each((containerEl => {
                        const newParams = utils_extend({}, params, {
                            el: containerEl
                        });
                        swipers.push(new core_Swiper(newParams));
                    }));
                    return swipers;
                }
                const swiper = this;
                swiper.__swiper__ = true;
                swiper.support = getSupport();
                swiper.device = getDevice({
                    userAgent: params.userAgent
                });
                swiper.browser = getBrowser();
                swiper.eventsListeners = {};
                swiper.eventsAnyListeners = [];
                swiper.modules = [ ...swiper.__modules__ ];
                if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
                const allModulesParams = {};
                swiper.modules.forEach((mod => {
                    mod({
                        swiper,
                        extendParams: moduleExtendParams(params, allModulesParams),
                        on: swiper.on.bind(swiper),
                        once: swiper.once.bind(swiper),
                        off: swiper.off.bind(swiper),
                        emit: swiper.emit.bind(swiper)
                    });
                }));
                const swiperParams = utils_extend({}, defaults, allModulesParams);
                swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
                swiper.originalParams = utils_extend({}, swiper.params);
                swiper.passedParams = utils_extend({}, params);
                if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                    swiper.on(eventName, swiper.params.on[eventName]);
                }));
                if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
                swiper.$ = dom;
                Object.assign(swiper, {
                    enabled: swiper.params.enabled,
                    el,
                    classNames: [],
                    slides: dom(),
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal() {
                        return "horizontal" === swiper.params.direction;
                    },
                    isVertical() {
                        return "vertical" === swiper.params.direction;
                    },
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: true,
                    isEnd: false,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: false,
                    allowSlideNext: swiper.params.allowSlideNext,
                    allowSlidePrev: swiper.params.allowSlidePrev,
                    touchEvents: function touchEvents() {
                        const touch = [ "touchstart", "touchmove", "touchend", "touchcancel" ];
                        const desktop = [ "pointerdown", "pointermove", "pointerup" ];
                        swiper.touchEventsTouch = {
                            start: touch[0],
                            move: touch[1],
                            end: touch[2],
                            cancel: touch[3]
                        };
                        swiper.touchEventsDesktop = {
                            start: desktop[0],
                            move: desktop[1],
                            end: desktop[2]
                        };
                        return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
                    }(),
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        focusableElements: swiper.params.focusableElements,
                        lastClickTime: utils_now(),
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        isTouchEvent: void 0,
                        startMoving: void 0
                    },
                    allowClick: true,
                    allowTouchMove: swiper.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0
                });
                swiper.emit("_swiper");
                if (swiper.params.init) swiper.init();
                return swiper;
            }
            enable() {
                const swiper = this;
                if (swiper.enabled) return;
                swiper.enabled = true;
                if (swiper.params.grabCursor) swiper.setGrabCursor();
                swiper.emit("enable");
            }
            disable() {
                const swiper = this;
                if (!swiper.enabled) return;
                swiper.enabled = false;
                if (swiper.params.grabCursor) swiper.unsetGrabCursor();
                swiper.emit("disable");
            }
            setProgress(progress, speed) {
                const swiper = this;
                progress = Math.min(Math.max(progress, 0), 1);
                const min = swiper.minTranslate();
                const max = swiper.maxTranslate();
                const current = (max - min) * progress + min;
                swiper.translateTo(current, "undefined" === typeof speed ? 0 : speed);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            emitContainerClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const cls = swiper.el.className.split(" ").filter((className => 0 === className.indexOf("swiper") || 0 === className.indexOf(swiper.params.containerModifierClass)));
                swiper.emit("_containerClasses", cls.join(" "));
            }
            getSlideClasses(slideEl) {
                const swiper = this;
                if (swiper.destroyed) return "";
                return slideEl.className.split(" ").filter((className => 0 === className.indexOf("swiper-slide") || 0 === className.indexOf(swiper.params.slideClass))).join(" ");
            }
            emitSlidesClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const updates = [];
                swiper.slides.each((slideEl => {
                    const classNames = swiper.getSlideClasses(slideEl);
                    updates.push({
                        slideEl,
                        classNames
                    });
                    swiper.emit("_slideClass", slideEl, classNames);
                }));
                swiper.emit("_slideClasses", updates);
            }
            slidesPerViewDynamic(view = "current", exact = false) {
                const swiper = this;
                const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
                let spv = 1;
                if (params.centeredSlides) {
                    let slideSize = slides[activeIndex].swiperSlideSize;
                    let breakLoop;
                    for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                        slideSize += slides[i].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                    for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                        slideSize += slides[i].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                } else if ("current" === view) for (let i = activeIndex + 1; i < slides.length; i += 1) {
                    const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                    if (slideInView) spv += 1;
                } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                    const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                    if (slideInView) spv += 1;
                }
                return spv;
            }
            update() {
                const swiper = this;
                if (!swiper || swiper.destroyed) return;
                const {snapGrid, params} = swiper;
                if (params.breakpoints) swiper.setBreakpoint();
                swiper.updateSize();
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.updateSlidesClasses();
                function setTranslate() {
                    const translateValue = swiper.rtlTranslate ? -1 * swiper.translate : swiper.translate;
                    const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                    swiper.setTranslate(newTranslate);
                    swiper.updateActiveIndex();
                    swiper.updateSlidesClasses();
                }
                let translated;
                if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
                    setTranslate();
                    if (swiper.params.autoHeight) swiper.updateAutoHeight();
                } else {
                    if (("auto" === swiper.params.slidesPerView || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true); else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                    if (!translated) setTranslate();
                }
                if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
                swiper.emit("update");
            }
            changeDirection(newDirection, needUpdate = true) {
                const swiper = this;
                const currentDirection = swiper.params.direction;
                if (!newDirection) newDirection = "horizontal" === currentDirection ? "vertical" : "horizontal";
                if (newDirection === currentDirection || "horizontal" !== newDirection && "vertical" !== newDirection) return swiper;
                swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
                swiper.emitContainerClasses();
                swiper.params.direction = newDirection;
                swiper.slides.each((slideEl => {
                    if ("vertical" === newDirection) slideEl.style.width = ""; else slideEl.style.height = "";
                }));
                swiper.emit("changeDirection");
                if (needUpdate) swiper.update();
                return swiper;
            }
            changeLanguageDirection(direction) {
                const swiper = this;
                if (swiper.rtl && "rtl" === direction || !swiper.rtl && "ltr" === direction) return;
                swiper.rtl = "rtl" === direction;
                swiper.rtlTranslate = "horizontal" === swiper.params.direction && swiper.rtl;
                if (swiper.rtl) {
                    swiper.$el.addClass(`${swiper.params.containerModifierClass}rtl`);
                    swiper.el.dir = "rtl";
                } else {
                    swiper.$el.removeClass(`${swiper.params.containerModifierClass}rtl`);
                    swiper.el.dir = "ltr";
                }
                swiper.update();
            }
            mount(el) {
                const swiper = this;
                if (swiper.mounted) return true;
                const $el = dom(el || swiper.params.el);
                el = $el[0];
                if (!el) return false;
                el.swiper = swiper;
                const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
                const getWrapper = () => {
                    if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                        const res = dom(el.shadowRoot.querySelector(getWrapperSelector()));
                        res.children = options => $el.children(options);
                        return res;
                    }
                    if (!$el.children) return dom($el).children(getWrapperSelector());
                    return $el.children(getWrapperSelector());
                };
                let $wrapperEl = getWrapper();
                if (0 === $wrapperEl.length && swiper.params.createElements) {
                    const document = ssr_window_esm_getDocument();
                    const wrapper = document.createElement("div");
                    $wrapperEl = dom(wrapper);
                    wrapper.className = swiper.params.wrapperClass;
                    $el.append(wrapper);
                    $el.children(`.${swiper.params.slideClass}`).each((slideEl => {
                        $wrapperEl.append(slideEl);
                    }));
                }
                Object.assign(swiper, {
                    $el,
                    el,
                    $wrapperEl,
                    wrapperEl: $wrapperEl[0],
                    mounted: true,
                    rtl: "rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction"),
                    rtlTranslate: "horizontal" === swiper.params.direction && ("rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction")),
                    wrongRTL: "-webkit-box" === $wrapperEl.css("display")
                });
                return true;
            }
            init(el) {
                const swiper = this;
                if (swiper.initialized) return swiper;
                const mounted = swiper.mount(el);
                if (false === mounted) return swiper;
                swiper.emit("beforeInit");
                if (swiper.params.breakpoints) swiper.setBreakpoint();
                swiper.addClasses();
                if (swiper.params.loop) swiper.loopCreate();
                swiper.updateSize();
                swiper.updateSlides();
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
                if (swiper.params.preloadImages) swiper.preloadImages();
                if (swiper.params.loop) swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
                swiper.attachEvents();
                swiper.initialized = true;
                swiper.emit("init");
                swiper.emit("afterInit");
                return swiper;
            }
            destroy(deleteInstance = true, cleanStyles = true) {
                const swiper = this;
                const {params, $el, $wrapperEl, slides} = swiper;
                if ("undefined" === typeof swiper.params || swiper.destroyed) return null;
                swiper.emit("beforeDestroy");
                swiper.initialized = false;
                swiper.detachEvents();
                if (params.loop) swiper.loopDestroy();
                if (cleanStyles) {
                    swiper.removeClasses();
                    $el.removeAttr("style");
                    $wrapperEl.removeAttr("style");
                    if (slides && slides.length) slides.removeClass([ params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass ].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index");
                }
                swiper.emit("destroy");
                Object.keys(swiper.eventsListeners).forEach((eventName => {
                    swiper.off(eventName);
                }));
                if (false !== deleteInstance) {
                    swiper.$el[0].swiper = null;
                    deleteProps(swiper);
                }
                swiper.destroyed = true;
                return null;
            }
            static extendDefaults(newDefaults) {
                utils_extend(extendedDefaults, newDefaults);
            }
            static get extendedDefaults() {
                return extendedDefaults;
            }
            static get defaults() {
                return defaults;
            }
            static installModule(mod) {
                if (!core_Swiper.prototype.__modules__) core_Swiper.prototype.__modules__ = [];
                const modules = core_Swiper.prototype.__modules__;
                if ("function" === typeof mod && modules.indexOf(mod) < 0) modules.push(mod);
            }
            static use(module) {
                if (Array.isArray(module)) {
                    module.forEach((m => core_Swiper.installModule(m)));
                    return core_Swiper;
                }
                core_Swiper.installModule(module);
                return core_Swiper;
            }
        }
        Object.keys(prototypes).forEach((prototypeGroup => {
            Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
                core_Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
            }));
        }));
        core_Swiper.use([ Resize, Observer ]);
        const core = core_Swiper;
        function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
            const document = ssr_window_esm_getDocument();
            if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
                if (!params[key] && true === params.auto) {
                    let element = swiper.$el.children(`.${checkProps[key]}`)[0];
                    if (!element) {
                        element = document.createElement("div");
                        element.className = checkProps[key];
                        swiper.$el.append(element);
                    }
                    params[key] = element;
                    originalParams[key] = element;
                }
            }));
            return params;
        }
        function Navigation({swiper, extendParams, on, emit}) {
            extendParams({
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: false,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock",
                    navigationDisabledClass: "swiper-navigation-disabled"
                }
            });
            swiper.navigation = {
                nextEl: null,
                $nextEl: null,
                prevEl: null,
                $prevEl: null
            };
            function getEl(el) {
                let $el;
                if (el) {
                    $el = dom(el);
                    if (swiper.params.uniqueNavElements && "string" === typeof el && $el.length > 1 && 1 === swiper.$el.find(el).length) $el = swiper.$el.find(el);
                }
                return $el;
            }
            function toggleEl($el, disabled) {
                const params = swiper.params.navigation;
                if ($el && $el.length > 0) {
                    $el[disabled ? "addClass" : "removeClass"](params.disabledClass);
                    if ($el[0] && "BUTTON" === $el[0].tagName) $el[0].disabled = disabled;
                    if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
                }
            }
            function update() {
                if (swiper.params.loop) return;
                const {$nextEl, $prevEl} = swiper.navigation;
                toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
                toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
            }
            function onPrevClick(e) {
                e.preventDefault();
                if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slidePrev();
                emit("navigationPrev");
            }
            function onNextClick(e) {
                e.preventDefault();
                if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slideNext();
                emit("navigationNext");
            }
            function init() {
                const params = swiper.params.navigation;
                swiper.params.navigation = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                    nextEl: "swiper-button-next",
                    prevEl: "swiper-button-prev"
                });
                if (!(params.nextEl || params.prevEl)) return;
                const $nextEl = getEl(params.nextEl);
                const $prevEl = getEl(params.prevEl);
                if ($nextEl && $nextEl.length > 0) $nextEl.on("click", onNextClick);
                if ($prevEl && $prevEl.length > 0) $prevEl.on("click", onPrevClick);
                Object.assign(swiper.navigation, {
                    $nextEl,
                    nextEl: $nextEl && $nextEl[0],
                    $prevEl,
                    prevEl: $prevEl && $prevEl[0]
                });
                if (!swiper.enabled) {
                    if ($nextEl) $nextEl.addClass(params.lockClass);
                    if ($prevEl) $prevEl.addClass(params.lockClass);
                }
            }
            function destroy() {
                const {$nextEl, $prevEl} = swiper.navigation;
                if ($nextEl && $nextEl.length) {
                    $nextEl.off("click", onNextClick);
                    $nextEl.removeClass(swiper.params.navigation.disabledClass);
                }
                if ($prevEl && $prevEl.length) {
                    $prevEl.off("click", onPrevClick);
                    $prevEl.removeClass(swiper.params.navigation.disabledClass);
                }
            }
            on("init", (() => {
                if (false === swiper.params.navigation.enabled) disable(); else {
                    init();
                    update();
                }
            }));
            on("toEdge fromEdge lock unlock", (() => {
                update();
            }));
            on("destroy", (() => {
                destroy();
            }));
            on("enable disable", (() => {
                const {$nextEl, $prevEl} = swiper.navigation;
                if ($nextEl) $nextEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
                if ($prevEl) $prevEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
            }));
            on("click", ((_s, e) => {
                const {$nextEl, $prevEl} = swiper.navigation;
                const targetEl = e.target;
                if (swiper.params.navigation.hideOnClick && !dom(targetEl).is($prevEl) && !dom(targetEl).is($nextEl)) {
                    if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                    let isHidden;
                    if ($nextEl) isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass); else if ($prevEl) isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
                    if (true === isHidden) emit("navigationShow"); else emit("navigationHide");
                    if ($nextEl) $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
                    if ($prevEl) $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
                }
            }));
            const enable = () => {
                swiper.$el.removeClass(swiper.params.navigation.navigationDisabledClass);
                init();
                update();
            };
            const disable = () => {
                swiper.$el.addClass(swiper.params.navigation.navigationDisabledClass);
                destroy();
            };
            Object.assign(swiper.navigation, {
                enable,
                disable,
                update,
                init,
                destroy
            });
        }
        function classes_to_selector_classesToSelector(classes = "") {
            return `.${classes.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")}`;
        }
        function Pagination({swiper, extendParams, on, emit}) {
            const pfx = "swiper-pagination";
            extendParams({
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: false,
                    hideOnClick: false,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: false,
                    type: "bullets",
                    dynamicBullets: false,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: number => number,
                    formatFractionTotal: number => number,
                    bulletClass: `${pfx}-bullet`,
                    bulletActiveClass: `${pfx}-bullet-active`,
                    modifierClass: `${pfx}-`,
                    currentClass: `${pfx}-current`,
                    totalClass: `${pfx}-total`,
                    hiddenClass: `${pfx}-hidden`,
                    progressbarFillClass: `${pfx}-progressbar-fill`,
                    progressbarOppositeClass: `${pfx}-progressbar-opposite`,
                    clickableClass: `${pfx}-clickable`,
                    lockClass: `${pfx}-lock`,
                    horizontalClass: `${pfx}-horizontal`,
                    verticalClass: `${pfx}-vertical`,
                    paginationDisabledClass: `${pfx}-disabled`
                }
            });
            swiper.pagination = {
                el: null,
                $el: null,
                bullets: []
            };
            let bulletSize;
            let dynamicBulletIndex = 0;
            function isPaginationDisabled() {
                return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el || 0 === swiper.pagination.$el.length;
            }
            function setSideBullets($bulletEl, position) {
                const {bulletActiveClass} = swiper.params.pagination;
                $bulletEl[position]().addClass(`${bulletActiveClass}-${position}`)[position]().addClass(`${bulletActiveClass}-${position}-${position}`);
            }
            function update() {
                const rtl = swiper.rtl;
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
                const $el = swiper.pagination.$el;
                let current;
                const total = swiper.params.loop ? Math.ceil((slidesLength - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                if (swiper.params.loop) {
                    current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
                    if (current > slidesLength - 1 - 2 * swiper.loopedSlides) current -= slidesLength - 2 * swiper.loopedSlides;
                    if (current > total - 1) current -= total;
                    if (current < 0 && "bullets" !== swiper.params.paginationType) current = total + current;
                } else if ("undefined" !== typeof swiper.snapIndex) current = swiper.snapIndex; else current = swiper.activeIndex || 0;
                if ("bullets" === params.type && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
                    const bullets = swiper.pagination.bullets;
                    let firstIndex;
                    let lastIndex;
                    let midIndex;
                    if (params.dynamicBullets) {
                        bulletSize = bullets.eq(0)[swiper.isHorizontal() ? "outerWidth" : "outerHeight"](true);
                        $el.css(swiper.isHorizontal() ? "width" : "height", `${bulletSize * (params.dynamicMainBullets + 4)}px`);
                        if (params.dynamicMainBullets > 1 && void 0 !== swiper.previousIndex) {
                            dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);
                            if (dynamicBulletIndex > params.dynamicMainBullets - 1) dynamicBulletIndex = params.dynamicMainBullets - 1; else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
                        }
                        firstIndex = Math.max(current - dynamicBulletIndex, 0);
                        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                        midIndex = (lastIndex + firstIndex) / 2;
                    }
                    bullets.removeClass([ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map((suffix => `${params.bulletActiveClass}${suffix}`)).join(" "));
                    if ($el.length > 1) bullets.each((bullet => {
                        const $bullet = dom(bullet);
                        const bulletIndex = $bullet.index();
                        if (bulletIndex === current) $bullet.addClass(params.bulletActiveClass);
                        if (params.dynamicBullets) {
                            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) $bullet.addClass(`${params.bulletActiveClass}-main`);
                            if (bulletIndex === firstIndex) setSideBullets($bullet, "prev");
                            if (bulletIndex === lastIndex) setSideBullets($bullet, "next");
                        }
                    })); else {
                        const $bullet = bullets.eq(current);
                        const bulletIndex = $bullet.index();
                        $bullet.addClass(params.bulletActiveClass);
                        if (params.dynamicBullets) {
                            const $firstDisplayedBullet = bullets.eq(firstIndex);
                            const $lastDisplayedBullet = bullets.eq(lastIndex);
                            for (let i = firstIndex; i <= lastIndex; i += 1) bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
                            if (swiper.params.loop) if (bulletIndex >= bullets.length) {
                                for (let i = params.dynamicMainBullets; i >= 0; i -= 1) bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
                                bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(`${params.bulletActiveClass}-prev`);
                            } else {
                                setSideBullets($firstDisplayedBullet, "prev");
                                setSideBullets($lastDisplayedBullet, "next");
                            } else {
                                setSideBullets($firstDisplayedBullet, "prev");
                                setSideBullets($lastDisplayedBullet, "next");
                            }
                        }
                    }
                    if (params.dynamicBullets) {
                        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
                        const offsetProp = rtl ? "right" : "left";
                        bullets.css(swiper.isHorizontal() ? offsetProp : "top", `${bulletsOffset}px`);
                    }
                }
                if ("fraction" === params.type) {
                    $el.find(classes_to_selector_classesToSelector(params.currentClass)).text(params.formatFractionCurrent(current + 1));
                    $el.find(classes_to_selector_classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
                }
                if ("progressbar" === params.type) {
                    let progressbarDirection;
                    if (params.progressbarOpposite) progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal"; else progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
                    const scale = (current + 1) / total;
                    let scaleX = 1;
                    let scaleY = 1;
                    if ("horizontal" === progressbarDirection) scaleX = scale; else scaleY = scale;
                    $el.find(classes_to_selector_classesToSelector(params.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper.params.speed);
                }
                if ("custom" === params.type && params.renderCustom) {
                    $el.html(params.renderCustom(swiper, current + 1, total));
                    emit("paginationRender", $el[0]);
                } else emit("paginationUpdate", $el[0]);
                if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
            }
            function render() {
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
                const $el = swiper.pagination.$el;
                let paginationHTML = "";
                if ("bullets" === params.type) {
                    let numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                    if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) numberOfBullets = slidesLength;
                    for (let i = 0; i < numberOfBullets; i += 1) if (params.renderBullet) paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass); else paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
                    $el.html(paginationHTML);
                    swiper.pagination.bullets = $el.find(classes_to_selector_classesToSelector(params.bulletClass));
                }
                if ("fraction" === params.type) {
                    if (params.renderFraction) paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass); else paginationHTML = `<span class="${params.currentClass}"></span>` + " / " + `<span class="${params.totalClass}"></span>`;
                    $el.html(paginationHTML);
                }
                if ("progressbar" === params.type) {
                    if (params.renderProgressbar) paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass); else paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
                    $el.html(paginationHTML);
                }
                if ("custom" !== params.type) emit("paginationRender", swiper.pagination.$el[0]);
            }
            function init() {
                swiper.params.pagination = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
                    el: "swiper-pagination"
                });
                const params = swiper.params.pagination;
                if (!params.el) return;
                let $el = dom(params.el);
                if (0 === $el.length) return;
                if (swiper.params.uniqueNavElements && "string" === typeof params.el && $el.length > 1) {
                    $el = swiper.$el.find(params.el);
                    if ($el.length > 1) $el = $el.filter((el => {
                        if (dom(el).parents(".swiper")[0] !== swiper.el) return false;
                        return true;
                    }));
                }
                if ("bullets" === params.type && params.clickable) $el.addClass(params.clickableClass);
                $el.addClass(params.modifierClass + params.type);
                $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                if ("bullets" === params.type && params.dynamicBullets) {
                    $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
                    dynamicBulletIndex = 0;
                    if (params.dynamicMainBullets < 1) params.dynamicMainBullets = 1;
                }
                if ("progressbar" === params.type && params.progressbarOpposite) $el.addClass(params.progressbarOppositeClass);
                if (params.clickable) $el.on("click", classes_to_selector_classesToSelector(params.bulletClass), (function onClick(e) {
                    e.preventDefault();
                    let index = dom(this).index() * swiper.params.slidesPerGroup;
                    if (swiper.params.loop) index += swiper.loopedSlides;
                    swiper.slideTo(index);
                }));
                Object.assign(swiper.pagination, {
                    $el,
                    el: $el[0]
                });
                if (!swiper.enabled) $el.addClass(params.lockClass);
            }
            function destroy() {
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const $el = swiper.pagination.$el;
                $el.removeClass(params.hiddenClass);
                $el.removeClass(params.modifierClass + params.type);
                $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass) swiper.pagination.bullets.removeClass(params.bulletActiveClass);
                if (params.clickable) $el.off("click", classes_to_selector_classesToSelector(params.bulletClass));
            }
            on("init", (() => {
                if (false === swiper.params.pagination.enabled) disable(); else {
                    init();
                    render();
                    update();
                }
            }));
            on("activeIndexChange", (() => {
                if (swiper.params.loop) update(); else if ("undefined" === typeof swiper.snapIndex) update();
            }));
            on("snapIndexChange", (() => {
                if (!swiper.params.loop) update();
            }));
            on("slidesLengthChange", (() => {
                if (swiper.params.loop) {
                    render();
                    update();
                }
            }));
            on("snapGridLengthChange", (() => {
                if (!swiper.params.loop) {
                    render();
                    update();
                }
            }));
            on("destroy", (() => {
                destroy();
            }));
            on("enable disable", (() => {
                const {$el} = swiper.pagination;
                if ($el) $el[swiper.enabled ? "removeClass" : "addClass"](swiper.params.pagination.lockClass);
            }));
            on("lock unlock", (() => {
                update();
            }));
            on("click", ((_s, e) => {
                const targetEl = e.target;
                const {$el} = swiper.pagination;
                if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el && $el.length > 0 && !dom(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
                    if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
                    const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);
                    if (true === isHidden) emit("paginationShow"); else emit("paginationHide");
                    $el.toggleClass(swiper.params.pagination.hiddenClass);
                }
            }));
            const enable = () => {
                swiper.$el.removeClass(swiper.params.pagination.paginationDisabledClass);
                if (swiper.pagination.$el) swiper.pagination.$el.removeClass(swiper.params.pagination.paginationDisabledClass);
                init();
                render();
                update();
            };
            const disable = () => {
                swiper.$el.addClass(swiper.params.pagination.paginationDisabledClass);
                if (swiper.pagination.$el) swiper.pagination.$el.addClass(swiper.params.pagination.paginationDisabledClass);
                destroy();
            };
            Object.assign(swiper.pagination, {
                enable,
                disable,
                render,
                update,
                init,
                destroy
            });
        }
        function effect_init_effectInit(params) {
            const {effect, swiper, on, setTranslate, setTransition, overwriteParams, perspective, recreateShadows, getEffectParams} = params;
            on("beforeInit", (() => {
                if (swiper.params.effect !== effect) return;
                swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
                if (perspective && perspective()) swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
                const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
                Object.assign(swiper.params, overwriteParamsResult);
                Object.assign(swiper.originalParams, overwriteParamsResult);
            }));
            on("setTranslate", (() => {
                if (swiper.params.effect !== effect) return;
                setTranslate();
            }));
            on("setTransition", ((_s, duration) => {
                if (swiper.params.effect !== effect) return;
                setTransition(duration);
            }));
            on("transitionEnd", (() => {
                if (swiper.params.effect !== effect) return;
                if (recreateShadows) {
                    if (!getEffectParams || !getEffectParams().slideShadows) return;
                    swiper.slides.each((slideEl => {
                        const $slideEl = swiper.$(slideEl);
                        $slideEl.find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").remove();
                    }));
                    recreateShadows();
                }
            }));
            let requireUpdateOnVirtual;
            on("virtualUpdate", (() => {
                if (swiper.params.effect !== effect) return;
                if (!swiper.slides.length) requireUpdateOnVirtual = true;
                requestAnimationFrame((() => {
                    if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
                        setTranslate();
                        requireUpdateOnVirtual = false;
                    }
                }));
            }));
        }
        function effect_target_effectTarget(effectParams, $slideEl) {
            if (effectParams.transformEl) return $slideEl.find(effectParams.transformEl).css({
                "backface-visibility": "hidden",
                "-webkit-backface-visibility": "hidden"
            });
            return $slideEl;
        }
        function effect_virtual_transition_end_effectVirtualTransitionEnd({swiper, duration, transformEl, allSlides}) {
            const {slides, activeIndex, $wrapperEl} = swiper;
            if (swiper.params.virtualTranslate && 0 !== duration) {
                let eventTriggered = false;
                let $transitionEndTarget;
                if (allSlides) $transitionEndTarget = transformEl ? slides.find(transformEl) : slides; else $transitionEndTarget = transformEl ? slides.eq(activeIndex).find(transformEl) : slides.eq(activeIndex);
                $transitionEndTarget.transitionEnd((() => {
                    if (eventTriggered) return;
                    if (!swiper || swiper.destroyed) return;
                    eventTriggered = true;
                    swiper.animating = false;
                    const triggerEvents = [ "webkitTransitionEnd", "transitionend" ];
                    for (let i = 0; i < triggerEvents.length; i += 1) $wrapperEl.trigger(triggerEvents[i]);
                }));
            }
        }
        function EffectFade({swiper, extendParams, on}) {
            extendParams({
                fadeEffect: {
                    crossFade: false,
                    transformEl: null
                }
            });
            const setTranslate = () => {
                const {slides} = swiper;
                const params = swiper.params.fadeEffect;
                for (let i = 0; i < slides.length; i += 1) {
                    const $slideEl = swiper.slides.eq(i);
                    const offset = $slideEl[0].swiperSlideOffset;
                    let tx = -offset;
                    if (!swiper.params.virtualTranslate) tx -= swiper.translate;
                    let ty = 0;
                    if (!swiper.isHorizontal()) {
                        ty = tx;
                        tx = 0;
                    }
                    const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl[0].progress), 0) : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
                    const $targetEl = effect_target_effectTarget(params, $slideEl);
                    $targetEl.css({
                        opacity: slideOpacity
                    }).transform(`translate3d(${tx}px, ${ty}px, 0px)`);
                }
            };
            const setTransition = duration => {
                const {transformEl} = swiper.params.fadeEffect;
                const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
                $transitionElements.transition(duration);
                effect_virtual_transition_end_effectVirtualTransitionEnd({
                    swiper,
                    duration,
                    transformEl,
                    allSlides: true
                });
            };
            effect_init_effectInit({
                effect: "fade",
                swiper,
                on,
                setTranslate,
                setTransition,
                overwriteParams: () => ({
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: true,
                    spaceBetween: 0,
                    virtualTranslate: !swiper.params.cssMode
                })
            });
        }
        function initSliders() {
            if (document.querySelector(".events__slider")) new core(".events__slider", {
                modules: [ Navigation, EffectFade, Pagination ],
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 20,
                autoHeight: true,
                speed: 700,
                effect: "fade",
                pagination: {
                    el: ".events__slider-pagination",
                    clickable: true
                },
                on: {}
            });
            if (document.querySelector(".news__slider")) new core(".news__slider", {
                modules: [ Navigation ],
                slidesPerView: "auto",
                speed: 700,
                initialSlide: 2,
                spaceBetween: 10,
                watchOverflow: true,
                breakpoints: {
                    993: {
                        slidesPerView: 3
                    }
                },
                on: {}
            });
            if (document.querySelector(".posts-slider__slider")) new core(".posts-slider__slider", {
                modules: [ Navigation, Pagination ],
                centeredSlides: true,
                slidesPerView: "auto",
                speed: 700,
                initialSlide: 1,
                spaceBetween: 90,
                watchOverflow: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                navigation: {
                    prevEl: ".posts-slider__prev",
                    nextEl: ".posts-slider__next"
                },
                on: {}
            });
            const waitingSlider = document.querySelector(".waiting__slider");
            let myWaitingSwiper;
            function mobileSlider() {
                if (document.querySelector(".waiting__slider ")) {
                    if (window.innerWidth <= 767.98 && "false" == waitingSlider.dataset.mobile) {
                        myWaitingSwiper = new core(".waiting__slider ", {
                            modules: [ Navigation, Pagination ],
                            observer: true,
                            observeParents: true,
                            slidesPerView: 4.2,
                            spaceBetween: 20,
                            speed: 800,
                            pagination: {
                                el: ".swiper-pagination",
                                clickable: true,
                                dynamicBullets: true
                            },
                            navigation: {
                                prevEl: ".navigation-faq-prev",
                                nextEl: ".navigation-faq-next"
                            },
                            breakpoints: {
                                320: {
                                    slidesPerView: 1.4,
                                    spaceBetween: 20
                                },
                                500: {
                                    slidesPerView: 1.6
                                },
                                768: {
                                    slidesPerView: 2.5,
                                    spaceBetween: 20
                                },
                                992: {
                                    slidesPerView: 3,
                                    spaceBetween: 20
                                },
                                1268: {
                                    slidesPerView: 4.2,
                                    spaceBetween: 30
                                }
                            },
                            on: {}
                        });
                        waitingSlider.dataset.mobile = "true";
                    }
                    if (window.innerWidth > 767.98) {
                        waitingSlider.dataset.mobile = "false";
                        if (waitingSlider.classList.contains("swiper-initialized")) myWaitingSwiper.destroy();
                    }
                }
            }
            mobileSlider();
            window.addEventListener("resize", (() => {
                mobileSlider();
            }));
        }
        window.addEventListener("load", (function(e) {
            initSliders();
        }));
        let addWindowScrollEvent = false;
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        /*!
 * lightgallery | 2.7.1 | January 11th 2023
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */
        /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
        var __assign = function() {
            __assign = Object.assign || function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        function __spreadArrays() {
            for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
            var r = Array(s), k = 0;
            for (i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
            k++) r[k] = a[j];
            return r;
        }
        var lGEvents = {
            afterAppendSlide: "lgAfterAppendSlide",
            init: "lgInit",
            hasVideo: "lgHasVideo",
            containerResize: "lgContainerResize",
            updateSlides: "lgUpdateSlides",
            afterAppendSubHtml: "lgAfterAppendSubHtml",
            beforeOpen: "lgBeforeOpen",
            afterOpen: "lgAfterOpen",
            slideItemLoad: "lgSlideItemLoad",
            beforeSlide: "lgBeforeSlide",
            afterSlide: "lgAfterSlide",
            posterClick: "lgPosterClick",
            dragStart: "lgDragStart",
            dragMove: "lgDragMove",
            dragEnd: "lgDragEnd",
            beforeNextSlide: "lgBeforeNextSlide",
            beforePrevSlide: "lgBeforePrevSlide",
            beforeClose: "lgBeforeClose",
            afterClose: "lgAfterClose",
            rotateLeft: "lgRotateLeft",
            rotateRight: "lgRotateRight",
            flipHorizontal: "lgFlipHorizontal",
            flipVertical: "lgFlipVertical",
            autoplay: "lgAutoplay",
            autoplayStart: "lgAutoplayStart",
            autoplayStop: "lgAutoplayStop"
        };
        var lightGalleryCoreSettings = {
            mode: "lg-slide",
            easing: "ease",
            speed: 400,
            licenseKey: "0000-0000-000-0000",
            height: "100%",
            width: "100%",
            addClass: "",
            startClass: "lg-start-zoom",
            backdropDuration: 300,
            container: "",
            startAnimationDuration: 400,
            zoomFromOrigin: true,
            hideBarsDelay: 0,
            showBarsAfter: 1e4,
            slideDelay: 0,
            supportLegacyBrowser: true,
            allowMediaOverlap: false,
            videoMaxSize: "1280-720",
            loadYouTubePoster: true,
            defaultCaptionHeight: 0,
            ariaLabelledby: "",
            ariaDescribedby: "",
            resetScrollPosition: true,
            hideScrollbar: false,
            closable: true,
            swipeToClose: true,
            closeOnTap: true,
            showCloseIcon: true,
            showMaximizeIcon: false,
            loop: true,
            escKey: true,
            keyPress: true,
            trapFocus: true,
            controls: true,
            slideEndAnimation: true,
            hideControlOnEnd: false,
            mousewheel: false,
            getCaptionFromTitleOrAlt: true,
            appendSubHtmlTo: ".lg-sub-html",
            subHtmlSelectorRelative: false,
            preload: 2,
            numberOfSlideItemsInDom: 10,
            selector: "",
            selectWithin: "",
            nextHtml: "",
            prevHtml: "",
            index: 0,
            iframeWidth: "100%",
            iframeHeight: "100%",
            iframeMaxWidth: "100%",
            iframeMaxHeight: "100%",
            download: true,
            counter: true,
            appendCounterTo: ".lg-toolbar",
            swipeThreshold: 50,
            enableSwipe: true,
            enableDrag: true,
            dynamic: false,
            dynamicEl: [],
            extraProps: [],
            exThumbImage: "",
            isMobile: void 0,
            mobileSettings: {
                controls: false,
                showCloseIcon: false,
                download: false
            },
            plugins: [],
            strings: {
                closeGallery: "Close gallery",
                toggleMaximize: "Toggle maximize",
                previousSlide: "Previous slide",
                nextSlide: "Next slide",
                download: "Download",
                playVideo: "Play video"
            }
        };
        function initLgPolyfills() {
            (function() {
                if ("function" === typeof window.CustomEvent) return false;
                function CustomEvent(event, params) {
                    params = params || {
                        bubbles: false,
                        cancelable: false,
                        detail: null
                    };
                    var evt = document.createEvent("CustomEvent");
                    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                    return evt;
                }
                window.CustomEvent = CustomEvent;
            })();
            (function() {
                if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
            })();
        }
        var lgQuery = function() {
            function lgQuery(selector) {
                this.cssVenderPrefixes = [ "TransitionDuration", "TransitionTimingFunction", "Transform", "Transition" ];
                this.selector = this._getSelector(selector);
                this.firstElement = this._getFirstEl();
                return this;
            }
            lgQuery.generateUUID = function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(c) {
                    var r = 16 * Math.random() | 0, v = "x" == c ? r : 3 & r | 8;
                    return v.toString(16);
                }));
            };
            lgQuery.prototype._getSelector = function(selector, context) {
                if (void 0 === context) context = document;
                if ("string" !== typeof selector) return selector;
                context = context || document;
                var fl = selector.substring(0, 1);
                if ("#" === fl) return context.querySelector(selector); else return context.querySelectorAll(selector);
            };
            lgQuery.prototype._each = function(func) {
                if (!this.selector) return this;
                if (void 0 !== this.selector.length) [].forEach.call(this.selector, func); else func(this.selector, 0);
                return this;
            };
            lgQuery.prototype._setCssVendorPrefix = function(el, cssProperty, value) {
                var property = cssProperty.replace(/-([a-z])/gi, (function(s, group1) {
                    return group1.toUpperCase();
                }));
                if (-1 !== this.cssVenderPrefixes.indexOf(property)) {
                    el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
                    el.style["webkit" + property] = value;
                    el.style["moz" + property] = value;
                    el.style["ms" + property] = value;
                    el.style["o" + property] = value;
                } else el.style[property] = value;
            };
            lgQuery.prototype._getFirstEl = function() {
                if (this.selector && void 0 !== this.selector.length) return this.selector[0]; else return this.selector;
            };
            lgQuery.prototype.isEventMatched = function(event, eventName) {
                var eventNamespace = eventName.split(".");
                return event.split(".").filter((function(e) {
                    return e;
                })).every((function(e) {
                    return -1 !== eventNamespace.indexOf(e);
                }));
            };
            lgQuery.prototype.attr = function(attr, value) {
                if (void 0 === value) {
                    if (!this.firstElement) return "";
                    return this.firstElement.getAttribute(attr);
                }
                this._each((function(el) {
                    el.setAttribute(attr, value);
                }));
                return this;
            };
            lgQuery.prototype.find = function(selector) {
                return $LG(this._getSelector(selector, this.selector));
            };
            lgQuery.prototype.first = function() {
                if (this.selector && void 0 !== this.selector.length) return $LG(this.selector[0]); else return $LG(this.selector);
            };
            lgQuery.prototype.eq = function(index) {
                return $LG(this.selector[index]);
            };
            lgQuery.prototype.parent = function() {
                return $LG(this.selector.parentElement);
            };
            lgQuery.prototype.get = function() {
                return this._getFirstEl();
            };
            lgQuery.prototype.removeAttr = function(attributes) {
                var attrs = attributes.split(" ");
                this._each((function(el) {
                    attrs.forEach((function(attr) {
                        return el.removeAttribute(attr);
                    }));
                }));
                return this;
            };
            lgQuery.prototype.wrap = function(className) {
                if (!this.firstElement) return this;
                var wrapper = document.createElement("div");
                wrapper.className = className;
                this.firstElement.parentNode.insertBefore(wrapper, this.firstElement);
                this.firstElement.parentNode.removeChild(this.firstElement);
                wrapper.appendChild(this.firstElement);
                return this;
            };
            lgQuery.prototype.addClass = function(classNames) {
                if (void 0 === classNames) classNames = "";
                this._each((function(el) {
                    classNames.split(" ").forEach((function(className) {
                        if (className) el.classList.add(className);
                    }));
                }));
                return this;
            };
            lgQuery.prototype.removeClass = function(classNames) {
                this._each((function(el) {
                    classNames.split(" ").forEach((function(className) {
                        if (className) el.classList.remove(className);
                    }));
                }));
                return this;
            };
            lgQuery.prototype.hasClass = function(className) {
                if (!this.firstElement) return false;
                return this.firstElement.classList.contains(className);
            };
            lgQuery.prototype.hasAttribute = function(attribute) {
                if (!this.firstElement) return false;
                return this.firstElement.hasAttribute(attribute);
            };
            lgQuery.prototype.toggleClass = function(className) {
                if (!this.firstElement) return this;
                if (this.hasClass(className)) this.removeClass(className); else this.addClass(className);
                return this;
            };
            lgQuery.prototype.css = function(property, value) {
                var _this = this;
                this._each((function(el) {
                    _this._setCssVendorPrefix(el, property, value);
                }));
                return this;
            };
            lgQuery.prototype.on = function(events, listener) {
                var _this = this;
                if (!this.selector) return this;
                events.split(" ").forEach((function(event) {
                    if (!Array.isArray(lgQuery.eventListeners[event])) lgQuery.eventListeners[event] = [];
                    lgQuery.eventListeners[event].push(listener);
                    _this.selector.addEventListener(event.split(".")[0], listener);
                }));
                return this;
            };
            lgQuery.prototype.once = function(event, listener) {
                var _this = this;
                this.on(event, (function() {
                    _this.off(event);
                    listener(event);
                }));
                return this;
            };
            lgQuery.prototype.off = function(event) {
                var _this = this;
                if (!this.selector) return this;
                Object.keys(lgQuery.eventListeners).forEach((function(eventName) {
                    if (_this.isEventMatched(event, eventName)) {
                        lgQuery.eventListeners[eventName].forEach((function(listener) {
                            _this.selector.removeEventListener(eventName.split(".")[0], listener);
                        }));
                        lgQuery.eventListeners[eventName] = [];
                    }
                }));
                return this;
            };
            lgQuery.prototype.trigger = function(event, detail) {
                if (!this.firstElement) return this;
                var customEvent = new CustomEvent(event.split(".")[0], {
                    detail: detail || null
                });
                this.firstElement.dispatchEvent(customEvent);
                return this;
            };
            lgQuery.prototype.load = function(url) {
                var _this = this;
                fetch(url).then((function(res) {
                    return res.text();
                })).then((function(html) {
                    _this.selector.innerHTML = html;
                }));
                return this;
            };
            lgQuery.prototype.html = function(html) {
                if (void 0 === html) {
                    if (!this.firstElement) return "";
                    return this.firstElement.innerHTML;
                }
                this._each((function(el) {
                    el.innerHTML = html;
                }));
                return this;
            };
            lgQuery.prototype.append = function(html) {
                this._each((function(el) {
                    if ("string" === typeof html) el.insertAdjacentHTML("beforeend", html); else el.appendChild(html);
                }));
                return this;
            };
            lgQuery.prototype.prepend = function(html) {
                this._each((function(el) {
                    el.insertAdjacentHTML("afterbegin", html);
                }));
                return this;
            };
            lgQuery.prototype.remove = function() {
                this._each((function(el) {
                    el.parentNode.removeChild(el);
                }));
                return this;
            };
            lgQuery.prototype.empty = function() {
                this._each((function(el) {
                    el.innerHTML = "";
                }));
                return this;
            };
            lgQuery.prototype.scrollTop = function(scrollTop) {
                if (void 0 !== scrollTop) {
                    document.body.scrollTop = scrollTop;
                    document.documentElement.scrollTop = scrollTop;
                    return this;
                } else return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            };
            lgQuery.prototype.scrollLeft = function(scrollLeft) {
                if (void 0 !== scrollLeft) {
                    document.body.scrollLeft = scrollLeft;
                    document.documentElement.scrollLeft = scrollLeft;
                    return this;
                } else return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
            };
            lgQuery.prototype.offset = function() {
                if (!this.firstElement) return {
                    left: 0,
                    top: 0
                };
                var rect = this.firstElement.getBoundingClientRect();
                var bodyMarginLeft = $LG("body").style().marginLeft;
                return {
                    left: rect.left - parseFloat(bodyMarginLeft) + this.scrollLeft(),
                    top: rect.top + this.scrollTop()
                };
            };
            lgQuery.prototype.style = function() {
                if (!this.firstElement) return {};
                return this.firstElement.currentStyle || window.getComputedStyle(this.firstElement);
            };
            lgQuery.prototype.width = function() {
                var style = this.style();
                return this.firstElement.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
            };
            lgQuery.prototype.height = function() {
                var style = this.style();
                return this.firstElement.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
            };
            lgQuery.eventListeners = {};
            return lgQuery;
        }();
        function $LG(selector) {
            initLgPolyfills();
            return new lgQuery(selector);
        }
        var defaultDynamicOptions = [ "src", "sources", "subHtml", "subHtmlUrl", "html", "video", "poster", "slideName", "responsive", "srcset", "sizes", "iframe", "downloadUrl", "download", "width", "facebookShareUrl", "tweetText", "iframeTitle", "twitterShareUrl", "pinterestShareUrl", "pinterestText", "fbHtml", "disqusIdentifier", "disqusUrl" ];
        function convertToData(attr) {
            if ("href" === attr) return "src";
            attr = attr.replace("data-", "");
            attr = attr.charAt(0).toLowerCase() + attr.slice(1);
            attr = attr.replace(/-([a-z])/g, (function(g) {
                return g[1].toUpperCase();
            }));
            return attr;
        }
        var utils = {
            getSize: function(el, container, spacing, defaultLgSize) {
                if (void 0 === spacing) spacing = 0;
                var LGel = $LG(el);
                var lgSize = LGel.attr("data-lg-size") || defaultLgSize;
                if (!lgSize) return;
                var isResponsiveSizes = lgSize.split(",");
                if (isResponsiveSizes[1]) {
                    var wWidth = window.innerWidth;
                    for (var i = 0; i < isResponsiveSizes.length; i++) {
                        var size_1 = isResponsiveSizes[i];
                        var responsiveWidth = parseInt(size_1.split("-")[2], 10);
                        if (responsiveWidth > wWidth) {
                            lgSize = size_1;
                            break;
                        }
                        if (i === isResponsiveSizes.length - 1) lgSize = size_1;
                    }
                }
                var size = lgSize.split("-");
                var width = parseInt(size[0], 10);
                var height = parseInt(size[1], 10);
                var cWidth = container.width();
                var cHeight = container.height() - spacing;
                var maxWidth = Math.min(cWidth, width);
                var maxHeight = Math.min(cHeight, height);
                var ratio = Math.min(maxWidth / width, maxHeight / height);
                return {
                    width: width * ratio,
                    height: height * ratio
                };
            },
            getTransform: function(el, container, top, bottom, imageSize) {
                if (!imageSize) return;
                var LGel = $LG(el).find("img").first();
                if (!LGel.get()) return;
                var containerRect = container.get().getBoundingClientRect();
                var wWidth = containerRect.width;
                var wHeight = container.height() - (top + bottom);
                var elWidth = LGel.width();
                var elHeight = LGel.height();
                var elStyle = LGel.style();
                var x = (wWidth - elWidth) / 2 - LGel.offset().left + (parseFloat(elStyle.paddingLeft) || 0) + (parseFloat(elStyle.borderLeft) || 0) + $LG(window).scrollLeft() + containerRect.left;
                var y = (wHeight - elHeight) / 2 - LGel.offset().top + (parseFloat(elStyle.paddingTop) || 0) + (parseFloat(elStyle.borderTop) || 0) + $LG(window).scrollTop() + top;
                var scX = elWidth / imageSize.width;
                var scY = elHeight / imageSize.height;
                var transform = "translate3d(" + (x *= -1) + "px, " + (y *= -1) + "px, 0) scale3d(" + scX + ", " + scY + ", 1)";
                return transform;
            },
            getIframeMarkup: function(iframeWidth, iframeHeight, iframeMaxWidth, iframeMaxHeight, src, iframeTitle) {
                var title = iframeTitle ? 'title="' + iframeTitle + '"' : "";
                return '<div class="lg-video-cont lg-has-iframe" style="width:' + iframeWidth + "; max-width:" + iframeMaxWidth + "; height: " + iframeHeight + "; max-height:" + iframeMaxHeight + '">\n                    <iframe class="lg-object" frameborder="0" ' + title + ' src="' + src + '"  allowfullscreen="true"></iframe>\n                </div>';
            },
            getImgMarkup: function(index, src, altAttr, srcset, sizes, sources) {
                var srcsetAttr = srcset ? 'srcset="' + srcset + '"' : "";
                var sizesAttr = sizes ? 'sizes="' + sizes + '"' : "";
                var imgMarkup = "<img " + altAttr + " " + srcsetAttr + "  " + sizesAttr + ' class="lg-object lg-image" data-index="' + index + '" src="' + src + '" />';
                var sourceTag = "";
                if (sources) {
                    var sourceObj = "string" === typeof sources ? JSON.parse(sources) : sources;
                    sourceTag = sourceObj.map((function(source) {
                        var attrs = "";
                        Object.keys(source).forEach((function(key) {
                            attrs += " " + key + '="' + source[key] + '"';
                        }));
                        return "<source " + attrs + "></source>";
                    }));
                }
                return "" + sourceTag + imgMarkup;
            },
            getResponsiveSrc: function(srcItms) {
                var rsWidth = [];
                var rsSrc = [];
                var src = "";
                for (var i = 0; i < srcItms.length; i++) {
                    var _src = srcItms[i].split(" ");
                    if ("" === _src[0]) _src.splice(0, 1);
                    rsSrc.push(_src[0]);
                    rsWidth.push(_src[1]);
                }
                var wWidth = window.innerWidth;
                for (var j = 0; j < rsWidth.length; j++) if (parseInt(rsWidth[j], 10) > wWidth) {
                    src = rsSrc[j];
                    break;
                }
                return src;
            },
            isImageLoaded: function(img) {
                if (!img) return false;
                if (!img.complete) return false;
                if (0 === img.naturalWidth) return false;
                return true;
            },
            getVideoPosterMarkup: function(_poster, dummyImg, videoContStyle, playVideoString, _isVideo) {
                var videoClass = "";
                if (_isVideo && _isVideo.youtube) videoClass = "lg-has-youtube"; else if (_isVideo && _isVideo.vimeo) videoClass = "lg-has-vimeo"; else videoClass = "lg-has-html5";
                return '<div class="lg-video-cont ' + videoClass + '" style="' + videoContStyle + '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' + playVideoString + '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' + playVideoString + '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' + (dummyImg || "") + '\n            <img class="lg-object lg-video-poster" src="' + _poster + '" />\n        </div>';
            },
            getFocusableElements: function(container) {
                var elements = container.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
                var visibleElements = [].filter.call(elements, (function(element) {
                    var style = window.getComputedStyle(element);
                    return "none" !== style.display && "hidden" !== style.visibility;
                }));
                return visibleElements;
            },
            getDynamicOptions: function(items, extraProps, getCaptionFromTitleOrAlt, exThumbImage) {
                var dynamicElements = [];
                var availableDynamicOptions = __spreadArrays(defaultDynamicOptions, extraProps);
                [].forEach.call(items, (function(item) {
                    var dynamicEl = {};
                    for (var i = 0; i < item.attributes.length; i++) {
                        var attr = item.attributes[i];
                        if (attr.specified) {
                            var dynamicAttr = convertToData(attr.name);
                            var label = "";
                            if (availableDynamicOptions.indexOf(dynamicAttr) > -1) label = dynamicAttr;
                            if (label) dynamicEl[label] = attr.value;
                        }
                    }
                    var currentItem = $LG(item);
                    var alt = currentItem.find("img").first().attr("alt");
                    var title = currentItem.attr("title");
                    var thumb = exThumbImage ? currentItem.attr(exThumbImage) : currentItem.find("img").first().attr("src");
                    dynamicEl.thumb = thumb;
                    if (getCaptionFromTitleOrAlt && !dynamicEl.subHtml) dynamicEl.subHtml = title || alt || "";
                    dynamicEl.alt = alt || title || "";
                    dynamicElements.push(dynamicEl);
                }));
                return dynamicElements;
            },
            isMobile: function() {
                return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            },
            isVideo: function(src, isHTML5VIdeo, index) {
                if (!src) if (isHTML5VIdeo) return {
                    html5: true
                }; else {
                    console.error("lightGallery :- data-src is not provided on slide item " + (index + 1) + ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/");
                    return;
                }
                var youtube = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i);
                var vimeo = src.match(/\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i);
                var wistia = src.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/);
                if (youtube) return {
                    youtube
                }; else if (vimeo) return {
                    vimeo
                }; else if (wistia) return {
                    wistia
                };
            }
        };
        var lgId = 0;
        var LightGallery = function() {
            function LightGallery(element, options) {
                this.lgOpened = false;
                this.index = 0;
                this.plugins = [];
                this.lGalleryOn = false;
                this.lgBusy = false;
                this.currentItemsInDom = [];
                this.prevScrollTop = 0;
                this.bodyPaddingRight = 0;
                this.isDummyImageRemoved = false;
                this.dragOrSwipeEnabled = false;
                this.mediaContainerPosition = {
                    top: 0,
                    bottom: 0
                };
                if (!element) return this;
                lgId++;
                this.lgId = lgId;
                this.el = element;
                this.LGel = $LG(element);
                this.generateSettings(options);
                this.buildModules();
                if (this.settings.dynamic && void 0 !== this.settings.dynamicEl && !Array.isArray(this.settings.dynamicEl)) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
                this.galleryItems = this.getItems();
                this.normalizeSettings();
                this.init();
                this.validateLicense();
                return this;
            }
            LightGallery.prototype.generateSettings = function(options) {
                this.settings = __assign(__assign({}, lightGalleryCoreSettings), options);
                if (this.settings.isMobile && "function" === typeof this.settings.isMobile ? this.settings.isMobile() : utils.isMobile()) {
                    var mobileSettings = __assign(__assign({}, this.settings.mobileSettings), this.settings.mobileSettings);
                    this.settings = __assign(__assign({}, this.settings), mobileSettings);
                }
            };
            LightGallery.prototype.normalizeSettings = function() {
                if (this.settings.slideEndAnimation) this.settings.hideControlOnEnd = false;
                if (!this.settings.closable) this.settings.swipeToClose = false;
                this.zoomFromOrigin = this.settings.zoomFromOrigin;
                if (this.settings.dynamic) this.zoomFromOrigin = false;
                if (!this.settings.container) this.settings.container = document.body;
                this.settings.preload = Math.min(this.settings.preload, this.galleryItems.length);
            };
            LightGallery.prototype.init = function() {
                var _this = this;
                this.addSlideVideoInfo(this.galleryItems);
                this.buildStructure();
                this.LGel.trigger(lGEvents.init, {
                    instance: this
                });
                if (this.settings.keyPress) this.keyPress();
                setTimeout((function() {
                    _this.enableDrag();
                    _this.enableSwipe();
                    _this.triggerPosterClick();
                }), 50);
                this.arrow();
                if (this.settings.mousewheel) this.mousewheel();
                if (!this.settings.dynamic) this.openGalleryOnItemClick();
            };
            LightGallery.prototype.openGalleryOnItemClick = function() {
                var _this = this;
                var _loop_1 = function(index) {
                    var element = this_1.items[index];
                    var $element = $LG(element);
                    var uuid = lgQuery.generateUUID();
                    $element.attr("data-lg-id", uuid).on("click.lgcustom-item-" + uuid, (function(e) {
                        e.preventDefault();
                        var currentItemIndex = _this.settings.index || index;
                        _this.openGallery(currentItemIndex, element);
                    }));
                };
                var this_1 = this;
                for (var index = 0; index < this.items.length; index++) _loop_1(index);
            };
            LightGallery.prototype.buildModules = function() {
                var _this = this;
                this.settings.plugins.forEach((function(plugin) {
                    _this.plugins.push(new plugin(_this, $LG));
                }));
            };
            LightGallery.prototype.validateLicense = function() {
                if (!this.settings.licenseKey) console.error("Please provide a valid license key"); else if ("0000-0000-000-0000" === this.settings.licenseKey) console.warn("lightGallery: " + this.settings.licenseKey + " license key is not valid for production use");
            };
            LightGallery.prototype.getSlideItem = function(index) {
                return $LG(this.getSlideItemId(index));
            };
            LightGallery.prototype.getSlideItemId = function(index) {
                return "#lg-item-" + this.lgId + "-" + index;
            };
            LightGallery.prototype.getIdName = function(id) {
                return id + "-" + this.lgId;
            };
            LightGallery.prototype.getElementById = function(id) {
                return $LG("#" + this.getIdName(id));
            };
            LightGallery.prototype.manageSingleSlideClassName = function() {
                if (this.galleryItems.length < 2) this.outer.addClass("lg-single-item"); else this.outer.removeClass("lg-single-item");
            };
            LightGallery.prototype.buildStructure = function() {
                var _this = this;
                var container = this.$container && this.$container.get();
                if (container) return;
                var controls = "";
                var subHtmlCont = "";
                if (this.settings.controls) controls = '<button type="button" id="' + this.getIdName("lg-prev") + '" aria-label="' + this.settings.strings["previousSlide"] + '" class="lg-prev lg-icon"> ' + this.settings.prevHtml + ' </button>\n                <button type="button" id="' + this.getIdName("lg-next") + '" aria-label="' + this.settings.strings["nextSlide"] + '" class="lg-next lg-icon"> ' + this.settings.nextHtml + " </button>";
                if (".lg-item" !== this.settings.appendSubHtmlTo) subHtmlCont = '<div class="lg-sub-html" role="status" aria-live="polite"></div>';
                var addClasses = "";
                if (this.settings.allowMediaOverlap) addClasses += "lg-media-overlap ";
                var ariaLabelledby = this.settings.ariaLabelledby ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"' : "";
                var ariaDescribedby = this.settings.ariaDescribedby ? 'aria-describedby="' + this.settings.ariaDescribedby + '"' : "";
                var containerClassName = "lg-container " + this.settings.addClass + " " + (document.body !== this.settings.container ? "lg-inline" : "");
                var closeIcon = this.settings.closable && this.settings.showCloseIcon ? '<button type="button" aria-label="' + this.settings.strings["closeGallery"] + '" id="' + this.getIdName("lg-close") + '" class="lg-close lg-icon"></button>' : "";
                var maximizeIcon = this.settings.showMaximizeIcon ? '<button type="button" aria-label="' + this.settings.strings["toggleMaximize"] + '" id="' + this.getIdName("lg-maximize") + '" class="lg-maximize lg-icon"></button>' : "";
                var template = '\n        <div class="' + containerClassName + '" id="' + this.getIdName("lg-container") + '" tabindex="-1" aria-modal="true" ' + ariaLabelledby + " " + ariaDescribedby + ' role="dialog"\n        >\n            <div id="' + this.getIdName("lg-backdrop") + '" class="lg-backdrop"></div>\n\n            <div id="' + this.getIdName("lg-outer") + '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' + addClasses + ' ">\n\n              <div id="' + this.getIdName("lg-content") + '" class="lg-content">\n                <div id="' + this.getIdName("lg-inner") + '" class="lg-inner">\n                </div>\n                ' + controls + '\n              </div>\n                <div id="' + this.getIdName("lg-toolbar") + '" class="lg-toolbar lg-group">\n                    ' + maximizeIcon + "\n                    " + closeIcon + "\n                    </div>\n                    " + (".lg-outer" === this.settings.appendSubHtmlTo ? subHtmlCont : "") + '\n                <div id="' + this.getIdName("lg-components") + '" class="lg-components">\n                    ' + (".lg-sub-html" === this.settings.appendSubHtmlTo ? subHtmlCont : "") + "\n                </div>\n            </div>\n        </div>\n        ";
                $LG(this.settings.container).append(template);
                if (document.body !== this.settings.container) $LG(this.settings.container).css("position", "relative");
                this.outer = this.getElementById("lg-outer");
                this.$lgComponents = this.getElementById("lg-components");
                this.$backdrop = this.getElementById("lg-backdrop");
                this.$container = this.getElementById("lg-container");
                this.$inner = this.getElementById("lg-inner");
                this.$content = this.getElementById("lg-content");
                this.$toolbar = this.getElementById("lg-toolbar");
                this.$backdrop.css("transition-duration", this.settings.backdropDuration + "ms");
                var outerClassNames = this.settings.mode + " ";
                this.manageSingleSlideClassName();
                if (this.settings.enableDrag) outerClassNames += "lg-grab ";
                this.outer.addClass(outerClassNames);
                this.$inner.css("transition-timing-function", this.settings.easing);
                this.$inner.css("transition-duration", this.settings.speed + "ms");
                if (this.settings.download) this.$toolbar.append('<a id="' + this.getIdName("lg-download") + '" target="_blank" rel="noopener" aria-label="' + this.settings.strings["download"] + '" download class="lg-download lg-icon"></a>');
                this.counter();
                $LG(window).on("resize.lg.global" + this.lgId + " orientationchange.lg.global" + this.lgId, (function() {
                    _this.refreshOnResize();
                }));
                this.hideBars();
                this.manageCloseGallery();
                this.toggleMaximize();
                this.initModules();
            };
            LightGallery.prototype.refreshOnResize = function() {
                if (this.lgOpened) {
                    var currentGalleryItem = this.galleryItems[this.index];
                    var __slideVideoInfo = currentGalleryItem.__slideVideoInfo;
                    this.mediaContainerPosition = this.getMediaContainerPosition();
                    var _a = this.mediaContainerPosition, top_1 = _a.top, bottom = _a.bottom;
                    this.currentImageSize = utils.getSize(this.items[this.index], this.outer, top_1 + bottom, __slideVideoInfo && this.settings.videoMaxSize);
                    if (__slideVideoInfo) this.resizeVideoSlide(this.index, this.currentImageSize);
                    if (this.zoomFromOrigin && !this.isDummyImageRemoved) {
                        var imgStyle = this.getDummyImgStyles(this.currentImageSize);
                        this.outer.find(".lg-current .lg-dummy-img").first().attr("style", imgStyle);
                    }
                    this.LGel.trigger(lGEvents.containerResize);
                }
            };
            LightGallery.prototype.resizeVideoSlide = function(index, imageSize) {
                var lgVideoStyle = this.getVideoContStyle(imageSize);
                var currentSlide = this.getSlideItem(index);
                currentSlide.find(".lg-video-cont").attr("style", lgVideoStyle);
            };
            LightGallery.prototype.updateSlides = function(items, index) {
                if (this.index > items.length - 1) this.index = items.length - 1;
                if (1 === items.length) this.index = 0;
                if (!items.length) {
                    this.closeGallery();
                    return;
                }
                var currentSrc = this.galleryItems[index].src;
                this.galleryItems = items;
                this.updateControls();
                this.$inner.empty();
                this.currentItemsInDom = [];
                var _index = 0;
                this.galleryItems.some((function(galleryItem, itemIndex) {
                    if (galleryItem.src === currentSrc) {
                        _index = itemIndex;
                        return true;
                    }
                    return false;
                }));
                this.currentItemsInDom = this.organizeSlideItems(_index, -1);
                this.loadContent(_index, true);
                this.getSlideItem(_index).addClass("lg-current");
                this.index = _index;
                this.updateCurrentCounter(_index);
                this.LGel.trigger(lGEvents.updateSlides);
            };
            LightGallery.prototype.getItems = function() {
                this.items = [];
                if (!this.settings.dynamic) {
                    if ("this" === this.settings.selector) this.items.push(this.el); else if (this.settings.selector) if ("string" === typeof this.settings.selector) if (this.settings.selectWithin) {
                        var selectWithin = $LG(this.settings.selectWithin);
                        this.items = selectWithin.find(this.settings.selector).get();
                    } else this.items = this.el.querySelectorAll(this.settings.selector); else this.items = this.settings.selector; else this.items = this.el.children;
                    return utils.getDynamicOptions(this.items, this.settings.extraProps, this.settings.getCaptionFromTitleOrAlt, this.settings.exThumbImage);
                } else return this.settings.dynamicEl || [];
            };
            LightGallery.prototype.shouldHideScrollbar = function() {
                return this.settings.hideScrollbar && document.body === this.settings.container;
            };
            LightGallery.prototype.hideScrollbar = function() {
                if (!this.shouldHideScrollbar()) return;
                this.bodyPaddingRight = parseFloat($LG("body").style().paddingRight);
                var bodyRect = document.documentElement.getBoundingClientRect();
                var scrollbarWidth = window.innerWidth - bodyRect.width;
                $LG(document.body).css("padding-right", scrollbarWidth + this.bodyPaddingRight + "px");
                $LG(document.body).addClass("lg-overlay-open");
            };
            LightGallery.prototype.resetScrollBar = function() {
                if (!this.shouldHideScrollbar()) return;
                $LG(document.body).css("padding-right", this.bodyPaddingRight + "px");
                $LG(document.body).removeClass("lg-overlay-open");
            };
            LightGallery.prototype.openGallery = function(index, element) {
                var _this = this;
                if (void 0 === index) index = this.settings.index;
                if (this.lgOpened) return;
                this.lgOpened = true;
                this.outer.removeClass("lg-hide-items");
                this.hideScrollbar();
                this.$container.addClass("lg-show");
                var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, index);
                this.currentItemsInDom = itemsToBeInsertedToDom;
                var items = "";
                itemsToBeInsertedToDom.forEach((function(item) {
                    items = items + '<div id="' + item + '" class="lg-item"></div>';
                }));
                this.$inner.append(items);
                this.addHtml(index);
                var transform = "";
                this.mediaContainerPosition = this.getMediaContainerPosition();
                var _a = this.mediaContainerPosition, top = _a.top, bottom = _a.bottom;
                if (!this.settings.allowMediaOverlap) this.setMediaContainerPosition(top, bottom);
                var __slideVideoInfo = this.galleryItems[index].__slideVideoInfo;
                if (this.zoomFromOrigin && element) {
                    this.currentImageSize = utils.getSize(element, this.outer, top + bottom, __slideVideoInfo && this.settings.videoMaxSize);
                    transform = utils.getTransform(element, this.outer, top, bottom, this.currentImageSize);
                }
                if (!this.zoomFromOrigin || !transform) {
                    this.outer.addClass(this.settings.startClass);
                    this.getSlideItem(index).removeClass("lg-complete");
                }
                var timeout = this.settings.zoomFromOrigin ? 100 : this.settings.backdropDuration;
                setTimeout((function() {
                    _this.outer.addClass("lg-components-open");
                }), timeout);
                this.index = index;
                this.LGel.trigger(lGEvents.beforeOpen);
                this.getSlideItem(index).addClass("lg-current");
                this.lGalleryOn = false;
                this.prevScrollTop = $LG(window).scrollTop();
                setTimeout((function() {
                    if (_this.zoomFromOrigin && transform) {
                        var currentSlide_1 = _this.getSlideItem(index);
                        currentSlide_1.css("transform", transform);
                        setTimeout((function() {
                            currentSlide_1.addClass("lg-start-progress lg-start-end-progress").css("transition-duration", _this.settings.startAnimationDuration + "ms");
                            _this.outer.addClass("lg-zoom-from-image");
                        }));
                        setTimeout((function() {
                            currentSlide_1.css("transform", "translate3d(0, 0, 0)");
                        }), 100);
                    }
                    setTimeout((function() {
                        _this.$backdrop.addClass("in");
                        _this.$container.addClass("lg-show-in");
                    }), 10);
                    setTimeout((function() {
                        if (_this.settings.trapFocus && document.body === _this.settings.container) _this.trapFocus();
                    }), _this.settings.backdropDuration + 50);
                    if (!_this.zoomFromOrigin || !transform) setTimeout((function() {
                        _this.outer.addClass("lg-visible");
                    }), _this.settings.backdropDuration);
                    _this.slide(index, false, false, false);
                    _this.LGel.trigger(lGEvents.afterOpen);
                }));
                if (document.body === this.settings.container) $LG("html").addClass("lg-on");
            };
            LightGallery.prototype.getMediaContainerPosition = function() {
                if (this.settings.allowMediaOverlap) return {
                    top: 0,
                    bottom: 0
                };
                var top = this.$toolbar.get().clientHeight || 0;
                var subHtml = this.outer.find(".lg-components .lg-sub-html").get();
                var captionHeight = this.settings.defaultCaptionHeight || subHtml && subHtml.clientHeight || 0;
                var thumbContainer = this.outer.find(".lg-thumb-outer").get();
                var thumbHeight = thumbContainer ? thumbContainer.clientHeight : 0;
                var bottom = thumbHeight + captionHeight;
                return {
                    top,
                    bottom
                };
            };
            LightGallery.prototype.setMediaContainerPosition = function(top, bottom) {
                if (void 0 === top) top = 0;
                if (void 0 === bottom) bottom = 0;
                this.$content.css("top", top + "px").css("bottom", bottom + "px");
            };
            LightGallery.prototype.hideBars = function() {
                var _this = this;
                setTimeout((function() {
                    _this.outer.removeClass("lg-hide-items");
                    if (_this.settings.hideBarsDelay > 0) {
                        _this.outer.on("mousemove.lg click.lg touchstart.lg", (function() {
                            _this.outer.removeClass("lg-hide-items");
                            clearTimeout(_this.hideBarTimeout);
                            _this.hideBarTimeout = setTimeout((function() {
                                _this.outer.addClass("lg-hide-items");
                            }), _this.settings.hideBarsDelay);
                        }));
                        _this.outer.trigger("mousemove.lg");
                    }
                }), this.settings.showBarsAfter);
            };
            LightGallery.prototype.initPictureFill = function($img) {
                if (this.settings.supportLegacyBrowser) try {
                    picturefill({
                        elements: [ $img.get() ]
                    });
                } catch (e) {
                    console.warn("lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document.");
                }
            };
            LightGallery.prototype.counter = function() {
                if (this.settings.counter) {
                    var counterHtml = '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' + this.getIdName("lg-counter-current") + '" class="lg-counter-current">' + (this.index + 1) + ' </span> /\n                <span id="' + this.getIdName("lg-counter-all") + '" class="lg-counter-all">' + this.galleryItems.length + " </span></div>";
                    this.outer.find(this.settings.appendCounterTo).append(counterHtml);
                }
            };
            LightGallery.prototype.addHtml = function(index) {
                var subHtml;
                var subHtmlUrl;
                if (this.galleryItems[index].subHtmlUrl) subHtmlUrl = this.galleryItems[index].subHtmlUrl; else subHtml = this.galleryItems[index].subHtml;
                if (!subHtmlUrl) if (subHtml) {
                    var fL = subHtml.substring(0, 1);
                    if ("." === fL || "#" === fL) if (this.settings.subHtmlSelectorRelative && !this.settings.dynamic) subHtml = $LG(this.items).eq(index).find(subHtml).first().html(); else subHtml = $LG(subHtml).first().html();
                } else subHtml = "";
                if (".lg-item" !== this.settings.appendSubHtmlTo) if (subHtmlUrl) this.outer.find(".lg-sub-html").load(subHtmlUrl); else this.outer.find(".lg-sub-html").html(subHtml); else {
                    var currentSlide = $LG(this.getSlideItemId(index));
                    if (subHtmlUrl) currentSlide.load(subHtmlUrl); else currentSlide.append('<div class="lg-sub-html">' + subHtml + "</div>");
                }
                if ("undefined" !== typeof subHtml && null !== subHtml) if ("" === subHtml) this.outer.find(this.settings.appendSubHtmlTo).addClass("lg-empty-html"); else this.outer.find(this.settings.appendSubHtmlTo).removeClass("lg-empty-html");
                this.LGel.trigger(lGEvents.afterAppendSubHtml, {
                    index
                });
            };
            LightGallery.prototype.preload = function(index) {
                for (var i = 1; i <= this.settings.preload; i++) {
                    if (i >= this.galleryItems.length - index) break;
                    this.loadContent(index + i, false);
                }
                for (var j = 1; j <= this.settings.preload; j++) {
                    if (index - j < 0) break;
                    this.loadContent(index - j, false);
                }
            };
            LightGallery.prototype.getDummyImgStyles = function(imageSize) {
                if (!imageSize) return "";
                return "width:" + imageSize.width + "px;\n                margin-left: -" + imageSize.width / 2 + "px;\n                margin-top: -" + imageSize.height / 2 + "px;\n                height:" + imageSize.height + "px";
            };
            LightGallery.prototype.getVideoContStyle = function(imageSize) {
                if (!imageSize) return "";
                return "width:" + imageSize.width + "px;\n                height:" + imageSize.height + "px";
            };
            LightGallery.prototype.getDummyImageContent = function($currentSlide, index, alt) {
                var $currentItem;
                if (!this.settings.dynamic) $currentItem = $LG(this.items).eq(index);
                if ($currentItem) {
                    var _dummyImgSrc = void 0;
                    if (!this.settings.exThumbImage) _dummyImgSrc = $currentItem.find("img").first().attr("src"); else _dummyImgSrc = $currentItem.attr(this.settings.exThumbImage);
                    if (!_dummyImgSrc) return "";
                    var imgStyle = this.getDummyImgStyles(this.currentImageSize);
                    var dummyImgContent = "<img " + alt + ' style="' + imgStyle + '" class="lg-dummy-img" src="' + _dummyImgSrc + '" />';
                    $currentSlide.addClass("lg-first-slide");
                    this.outer.addClass("lg-first-slide-loading");
                    return dummyImgContent;
                }
                return "";
            };
            LightGallery.prototype.setImgMarkup = function(src, $currentSlide, index) {
                var currentGalleryItem = this.galleryItems[index];
                var alt = currentGalleryItem.alt, srcset = currentGalleryItem.srcset, sizes = currentGalleryItem.sizes, sources = currentGalleryItem.sources;
                var imgContent = "";
                var altAttr = alt ? 'alt="' + alt + '"' : "";
                if (this.isFirstSlideWithZoomAnimation()) imgContent = this.getDummyImageContent($currentSlide, index, altAttr); else imgContent = utils.getImgMarkup(index, src, altAttr, srcset, sizes, sources);
                var imgMarkup = '<picture class="lg-img-wrap"> ' + imgContent + "</picture>";
                $currentSlide.prepend(imgMarkup);
            };
            LightGallery.prototype.onSlideObjectLoad = function($slide, isHTML5VideoWithoutPoster, onLoad, onError) {
                var mediaObject = $slide.find(".lg-object").first();
                if (utils.isImageLoaded(mediaObject.get()) || isHTML5VideoWithoutPoster) onLoad(); else {
                    mediaObject.on("load.lg error.lg", (function() {
                        onLoad && onLoad();
                    }));
                    mediaObject.on("error.lg", (function() {
                        onError && onError();
                    }));
                }
            };
            LightGallery.prototype.onLgObjectLoad = function(currentSlide, index, delay, speed, isFirstSlide, isHTML5VideoWithoutPoster) {
                var _this = this;
                this.onSlideObjectLoad(currentSlide, isHTML5VideoWithoutPoster, (function() {
                    _this.triggerSlideItemLoad(currentSlide, index, delay, speed, isFirstSlide);
                }), (function() {
                    currentSlide.addClass("lg-complete lg-complete_");
                    currentSlide.html('<span class="lg-error-msg">Oops... Failed to load content...</span>');
                }));
            };
            LightGallery.prototype.triggerSlideItemLoad = function($currentSlide, index, delay, speed, isFirstSlide) {
                var _this = this;
                var currentGalleryItem = this.galleryItems[index];
                var _speed = isFirstSlide && "video" === this.getSlideType(currentGalleryItem) && !currentGalleryItem.poster ? speed : 0;
                setTimeout((function() {
                    $currentSlide.addClass("lg-complete lg-complete_");
                    _this.LGel.trigger(lGEvents.slideItemLoad, {
                        index,
                        delay: delay || 0,
                        isFirstSlide
                    });
                }), _speed);
            };
            LightGallery.prototype.isFirstSlideWithZoomAnimation = function() {
                return !!(!this.lGalleryOn && this.zoomFromOrigin && this.currentImageSize);
            };
            LightGallery.prototype.addSlideVideoInfo = function(items) {
                var _this = this;
                items.forEach((function(element, index) {
                    element.__slideVideoInfo = utils.isVideo(element.src, !!element.video, index);
                    if (element.__slideVideoInfo && _this.settings.loadYouTubePoster && !element.poster && element.__slideVideoInfo.youtube) element.poster = "//img.youtube.com/vi/" + element.__slideVideoInfo.youtube[1] + "/maxresdefault.jpg";
                }));
            };
            LightGallery.prototype.loadContent = function(index, rec) {
                var _this = this;
                var currentGalleryItem = this.galleryItems[index];
                var $currentSlide = $LG(this.getSlideItemId(index));
                var poster = currentGalleryItem.poster, srcset = currentGalleryItem.srcset, sizes = currentGalleryItem.sizes, sources = currentGalleryItem.sources;
                var src = currentGalleryItem.src;
                var video = currentGalleryItem.video;
                var _html5Video = video && "string" === typeof video ? JSON.parse(video) : video;
                if (currentGalleryItem.responsive) {
                    var srcDyItms = currentGalleryItem.responsive.split(",");
                    src = utils.getResponsiveSrc(srcDyItms) || src;
                }
                var videoInfo = currentGalleryItem.__slideVideoInfo;
                var lgVideoStyle = "";
                var iframe = !!currentGalleryItem.iframe;
                var isFirstSlide = !this.lGalleryOn;
                var delay = 0;
                if (isFirstSlide) if (this.zoomFromOrigin && this.currentImageSize) delay = this.settings.startAnimationDuration + 10; else delay = this.settings.backdropDuration + 10;
                if (!$currentSlide.hasClass("lg-loaded")) {
                    if (videoInfo) {
                        var _a = this.mediaContainerPosition, top_2 = _a.top, bottom = _a.bottom;
                        var videoSize = utils.getSize(this.items[index], this.outer, top_2 + bottom, videoInfo && this.settings.videoMaxSize);
                        lgVideoStyle = this.getVideoContStyle(videoSize);
                    }
                    if (iframe) {
                        var markup = utils.getIframeMarkup(this.settings.iframeWidth, this.settings.iframeHeight, this.settings.iframeMaxWidth, this.settings.iframeMaxHeight, src, currentGalleryItem.iframeTitle);
                        $currentSlide.prepend(markup);
                    } else if (poster) {
                        var dummyImg = "";
                        var hasStartAnimation = isFirstSlide && this.zoomFromOrigin && this.currentImageSize;
                        if (hasStartAnimation) dummyImg = this.getDummyImageContent($currentSlide, index, "");
                        markup = utils.getVideoPosterMarkup(poster, dummyImg || "", lgVideoStyle, this.settings.strings["playVideo"], videoInfo);
                        $currentSlide.prepend(markup);
                    } else if (videoInfo) {
                        markup = '<div class="lg-video-cont " style="' + lgVideoStyle + '"></div>';
                        $currentSlide.prepend(markup);
                    } else {
                        this.setImgMarkup(src, $currentSlide, index);
                        if (srcset || sources) {
                            var $img = $currentSlide.find(".lg-object");
                            this.initPictureFill($img);
                        }
                    }
                    if (poster || videoInfo) this.LGel.trigger(lGEvents.hasVideo, {
                        index,
                        src,
                        html5Video: _html5Video,
                        hasPoster: !!poster
                    });
                    this.LGel.trigger(lGEvents.afterAppendSlide, {
                        index
                    });
                    if (this.lGalleryOn && ".lg-item" === this.settings.appendSubHtmlTo) this.addHtml(index);
                }
                var _speed = 0;
                if (delay && !$LG(document.body).hasClass("lg-from-hash")) _speed = delay;
                if (this.isFirstSlideWithZoomAnimation()) {
                    setTimeout((function() {
                        $currentSlide.removeClass("lg-start-end-progress lg-start-progress").removeAttr("style");
                    }), this.settings.startAnimationDuration + 100);
                    if (!$currentSlide.hasClass("lg-loaded")) setTimeout((function() {
                        if ("image" === _this.getSlideType(currentGalleryItem)) {
                            var alt = currentGalleryItem.alt;
                            var altAttr = alt ? 'alt="' + alt + '"' : "";
                            $currentSlide.find(".lg-img-wrap").append(utils.getImgMarkup(index, src, altAttr, srcset, sizes, currentGalleryItem.sources));
                            if (srcset || sources) {
                                var $img = $currentSlide.find(".lg-object");
                                _this.initPictureFill($img);
                            }
                        }
                        if ("image" === _this.getSlideType(currentGalleryItem) || "video" === _this.getSlideType(currentGalleryItem) && poster) {
                            _this.onLgObjectLoad($currentSlide, index, delay, _speed, true, false);
                            _this.onSlideObjectLoad($currentSlide, !!(videoInfo && videoInfo.html5 && !poster), (function() {
                                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
                            }), (function() {
                                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
                            }));
                        }
                    }), this.settings.startAnimationDuration + 100);
                }
                $currentSlide.addClass("lg-loaded");
                if (!this.isFirstSlideWithZoomAnimation() || "video" === this.getSlideType(currentGalleryItem) && !poster) this.onLgObjectLoad($currentSlide, index, delay, _speed, isFirstSlide, !!(videoInfo && videoInfo.html5 && !poster));
                if ((!this.zoomFromOrigin || !this.currentImageSize) && $currentSlide.hasClass("lg-complete_") && !this.lGalleryOn) setTimeout((function() {
                    $currentSlide.addClass("lg-complete");
                }), this.settings.backdropDuration);
                this.lGalleryOn = true;
                if (true === rec) if (!$currentSlide.hasClass("lg-complete_")) $currentSlide.find(".lg-object").first().on("load.lg error.lg", (function() {
                    _this.preload(index);
                })); else this.preload(index);
            };
            LightGallery.prototype.loadContentOnFirstSlideLoad = function(index, $currentSlide, speed) {
                var _this = this;
                setTimeout((function() {
                    $currentSlide.find(".lg-dummy-img").remove();
                    $currentSlide.removeClass("lg-first-slide");
                    _this.outer.removeClass("lg-first-slide-loading");
                    _this.isDummyImageRemoved = true;
                    _this.preload(index);
                }), speed + 300);
            };
            LightGallery.prototype.getItemsToBeInsertedToDom = function(index, prevIndex, numberOfItems) {
                var _this = this;
                if (void 0 === numberOfItems) numberOfItems = 0;
                var itemsToBeInsertedToDom = [];
                var possibleNumberOfItems = Math.max(numberOfItems, 3);
                possibleNumberOfItems = Math.min(possibleNumberOfItems, this.galleryItems.length);
                var prevIndexItem = "lg-item-" + this.lgId + "-" + prevIndex;
                if (this.galleryItems.length <= 3) {
                    this.galleryItems.forEach((function(_element, index) {
                        itemsToBeInsertedToDom.push("lg-item-" + _this.lgId + "-" + index);
                    }));
                    return itemsToBeInsertedToDom;
                }
                if (index < (this.galleryItems.length - 1) / 2) {
                    for (var idx = index; idx > index - possibleNumberOfItems / 2 && idx >= 0; idx--) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
                    var numberOfExistingItems = itemsToBeInsertedToDom.length;
                    for (idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index + idx + 1));
                } else {
                    for (idx = index; idx <= this.galleryItems.length - 1 && idx < index + possibleNumberOfItems / 2; idx++) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
                    numberOfExistingItems = itemsToBeInsertedToDom.length;
                    for (idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index - idx - 1));
                }
                if (this.settings.loop) if (index === this.galleryItems.length - 1) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + 0); else if (0 === index) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (this.galleryItems.length - 1));
                if (-1 === itemsToBeInsertedToDom.indexOf(prevIndexItem)) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + prevIndex);
                return itemsToBeInsertedToDom;
            };
            LightGallery.prototype.organizeSlideItems = function(index, prevIndex) {
                var _this = this;
                var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, prevIndex, this.settings.numberOfSlideItemsInDom);
                itemsToBeInsertedToDom.forEach((function(item) {
                    if (-1 === _this.currentItemsInDom.indexOf(item)) _this.$inner.append('<div id="' + item + '" class="lg-item"></div>');
                }));
                this.currentItemsInDom.forEach((function(item) {
                    if (-1 === itemsToBeInsertedToDom.indexOf(item)) $LG("#" + item).remove();
                }));
                return itemsToBeInsertedToDom;
            };
            LightGallery.prototype.getPreviousSlideIndex = function() {
                var prevIndex = 0;
                try {
                    var currentItemId = this.outer.find(".lg-current").first().attr("id");
                    prevIndex = parseInt(currentItemId.split("-")[3]) || 0;
                } catch (error) {
                    prevIndex = 0;
                }
                return prevIndex;
            };
            LightGallery.prototype.setDownloadValue = function(index) {
                if (this.settings.download) {
                    var currentGalleryItem = this.galleryItems[index];
                    var hideDownloadBtn = false === currentGalleryItem.downloadUrl || "false" === currentGalleryItem.downloadUrl;
                    if (hideDownloadBtn) this.outer.addClass("lg-hide-download"); else {
                        var $download = this.getElementById("lg-download");
                        this.outer.removeClass("lg-hide-download");
                        $download.attr("href", currentGalleryItem.downloadUrl || currentGalleryItem.src);
                        if (currentGalleryItem.download) $download.attr("download", currentGalleryItem.download);
                    }
                }
            };
            LightGallery.prototype.makeSlideAnimation = function(direction, currentSlideItem, previousSlideItem) {
                var _this = this;
                if (this.lGalleryOn) previousSlideItem.addClass("lg-slide-progress");
                setTimeout((function() {
                    _this.outer.addClass("lg-no-trans");
                    _this.outer.find(".lg-item").removeClass("lg-prev-slide lg-next-slide");
                    if ("prev" === direction) {
                        currentSlideItem.addClass("lg-prev-slide");
                        previousSlideItem.addClass("lg-next-slide");
                    } else {
                        currentSlideItem.addClass("lg-next-slide");
                        previousSlideItem.addClass("lg-prev-slide");
                    }
                    setTimeout((function() {
                        _this.outer.find(".lg-item").removeClass("lg-current");
                        currentSlideItem.addClass("lg-current");
                        _this.outer.removeClass("lg-no-trans");
                    }), 50);
                }), this.lGalleryOn ? this.settings.slideDelay : 0);
            };
            LightGallery.prototype.slide = function(index, fromTouch, fromThumb, direction) {
                var _this = this;
                var prevIndex = this.getPreviousSlideIndex();
                this.currentItemsInDom = this.organizeSlideItems(index, prevIndex);
                if (this.lGalleryOn && prevIndex === index) return;
                var numberOfGalleryItems = this.galleryItems.length;
                if (!this.lgBusy) {
                    if (this.settings.counter) this.updateCurrentCounter(index);
                    var currentSlideItem = this.getSlideItem(index);
                    var previousSlideItem_1 = this.getSlideItem(prevIndex);
                    var currentGalleryItem = this.galleryItems[index];
                    var videoInfo = currentGalleryItem.__slideVideoInfo;
                    this.outer.attr("data-lg-slide-type", this.getSlideType(currentGalleryItem));
                    this.setDownloadValue(index);
                    if (videoInfo) {
                        var _a = this.mediaContainerPosition, top_3 = _a.top, bottom = _a.bottom;
                        var videoSize = utils.getSize(this.items[index], this.outer, top_3 + bottom, videoInfo && this.settings.videoMaxSize);
                        this.resizeVideoSlide(index, videoSize);
                    }
                    this.LGel.trigger(lGEvents.beforeSlide, {
                        prevIndex,
                        index,
                        fromTouch: !!fromTouch,
                        fromThumb: !!fromThumb
                    });
                    this.lgBusy = true;
                    clearTimeout(this.hideBarTimeout);
                    this.arrowDisable(index);
                    if (!direction) if (index < prevIndex) direction = "prev"; else if (index > prevIndex) direction = "next";
                    if (!fromTouch) this.makeSlideAnimation(direction, currentSlideItem, previousSlideItem_1); else {
                        this.outer.find(".lg-item").removeClass("lg-prev-slide lg-current lg-next-slide");
                        var touchPrev = void 0;
                        var touchNext = void 0;
                        if (numberOfGalleryItems > 2) {
                            touchPrev = index - 1;
                            touchNext = index + 1;
                            if (0 === index && prevIndex === numberOfGalleryItems - 1) {
                                touchNext = 0;
                                touchPrev = numberOfGalleryItems - 1;
                            } else if (index === numberOfGalleryItems - 1 && 0 === prevIndex) {
                                touchNext = 0;
                                touchPrev = numberOfGalleryItems - 1;
                            }
                        } else {
                            touchPrev = 0;
                            touchNext = 1;
                        }
                        if ("prev" === direction) this.getSlideItem(touchNext).addClass("lg-next-slide"); else this.getSlideItem(touchPrev).addClass("lg-prev-slide");
                        currentSlideItem.addClass("lg-current");
                    }
                    if (!this.lGalleryOn) this.loadContent(index, true); else setTimeout((function() {
                        _this.loadContent(index, true);
                        if (".lg-item" !== _this.settings.appendSubHtmlTo) _this.addHtml(index);
                    }), this.settings.speed + 50 + (fromTouch ? 0 : this.settings.slideDelay));
                    setTimeout((function() {
                        _this.lgBusy = false;
                        previousSlideItem_1.removeClass("lg-slide-progress");
                        _this.LGel.trigger(lGEvents.afterSlide, {
                            prevIndex,
                            index,
                            fromTouch,
                            fromThumb
                        });
                    }), (this.lGalleryOn ? this.settings.speed + 100 : 100) + (fromTouch ? 0 : this.settings.slideDelay));
                }
                this.index = index;
            };
            LightGallery.prototype.updateCurrentCounter = function(index) {
                this.getElementById("lg-counter-current").html(index + 1 + "");
            };
            LightGallery.prototype.updateCounterTotal = function() {
                this.getElementById("lg-counter-all").html(this.galleryItems.length + "");
            };
            LightGallery.prototype.getSlideType = function(item) {
                if (item.__slideVideoInfo) return "video"; else if (item.iframe) return "iframe"; else return "image";
            };
            LightGallery.prototype.touchMove = function(startCoords, endCoords, e) {
                var distanceX = endCoords.pageX - startCoords.pageX;
                var distanceY = endCoords.pageY - startCoords.pageY;
                var allowSwipe = false;
                if (this.swipeDirection) allowSwipe = true; else if (Math.abs(distanceX) > 15) {
                    this.swipeDirection = "horizontal";
                    allowSwipe = true;
                } else if (Math.abs(distanceY) > 15) {
                    this.swipeDirection = "vertical";
                    allowSwipe = true;
                }
                if (!allowSwipe) return;
                var $currentSlide = this.getSlideItem(this.index);
                if ("horizontal" === this.swipeDirection) {
                    null === e || void 0 === e ? void 0 : e.preventDefault();
                    this.outer.addClass("lg-dragging");
                    this.setTranslate($currentSlide, distanceX, 0);
                    var width = $currentSlide.get().offsetWidth;
                    var slideWidthAmount = 15 * width / 100;
                    var gutter = slideWidthAmount - Math.abs(10 * distanceX / 100);
                    this.setTranslate(this.outer.find(".lg-prev-slide").first(), -width + distanceX - gutter, 0);
                    this.setTranslate(this.outer.find(".lg-next-slide").first(), width + distanceX + gutter, 0);
                } else if ("vertical" === this.swipeDirection) if (this.settings.swipeToClose) {
                    null === e || void 0 === e ? void 0 : e.preventDefault();
                    this.$container.addClass("lg-dragging-vertical");
                    var opacity = 1 - Math.abs(distanceY) / window.innerHeight;
                    this.$backdrop.css("opacity", opacity);
                    var scale = 1 - Math.abs(distanceY) / (2 * window.innerWidth);
                    this.setTranslate($currentSlide, 0, distanceY, scale, scale);
                    if (Math.abs(distanceY) > 100) this.outer.addClass("lg-hide-items").removeClass("lg-components-open");
                }
            };
            LightGallery.prototype.touchEnd = function(endCoords, startCoords, event) {
                var _this = this;
                var distance;
                if ("lg-slide" !== this.settings.mode) this.outer.addClass("lg-slide");
                setTimeout((function() {
                    _this.$container.removeClass("lg-dragging-vertical");
                    _this.outer.removeClass("lg-dragging lg-hide-items").addClass("lg-components-open");
                    var triggerClick = true;
                    if ("horizontal" === _this.swipeDirection) {
                        distance = endCoords.pageX - startCoords.pageX;
                        var distanceAbs = Math.abs(endCoords.pageX - startCoords.pageX);
                        if (distance < 0 && distanceAbs > _this.settings.swipeThreshold) {
                            _this.goToNextSlide(true);
                            triggerClick = false;
                        } else if (distance > 0 && distanceAbs > _this.settings.swipeThreshold) {
                            _this.goToPrevSlide(true);
                            triggerClick = false;
                        }
                    } else if ("vertical" === _this.swipeDirection) {
                        distance = Math.abs(endCoords.pageY - startCoords.pageY);
                        if (_this.settings.closable && _this.settings.swipeToClose && distance > 100) {
                            _this.closeGallery();
                            return;
                        } else _this.$backdrop.css("opacity", 1);
                    }
                    _this.outer.find(".lg-item").removeAttr("style");
                    if (triggerClick && Math.abs(endCoords.pageX - startCoords.pageX) < 5) {
                        var target = $LG(event.target);
                        if (_this.isPosterElement(target)) _this.LGel.trigger(lGEvents.posterClick);
                    }
                    _this.swipeDirection = void 0;
                }));
                setTimeout((function() {
                    if (!_this.outer.hasClass("lg-dragging") && "lg-slide" !== _this.settings.mode) _this.outer.removeClass("lg-slide");
                }), this.settings.speed + 100);
            };
            LightGallery.prototype.enableSwipe = function() {
                var _this = this;
                var startCoords = {};
                var endCoords = {};
                var isMoved = false;
                var isSwiping = false;
                if (this.settings.enableSwipe) {
                    this.$inner.on("touchstart.lg", (function(e) {
                        _this.dragOrSwipeEnabled = true;
                        var $item = _this.getSlideItem(_this.index);
                        if (($LG(e.target).hasClass("lg-item") || $item.get().contains(e.target)) && !_this.outer.hasClass("lg-zoomed") && !_this.lgBusy && 1 === e.touches.length) {
                            isSwiping = true;
                            _this.touchAction = "swipe";
                            _this.manageSwipeClass();
                            startCoords = {
                                pageX: e.touches[0].pageX,
                                pageY: e.touches[0].pageY
                            };
                        }
                    }));
                    this.$inner.on("touchmove.lg", (function(e) {
                        if (isSwiping && "swipe" === _this.touchAction && 1 === e.touches.length) {
                            endCoords = {
                                pageX: e.touches[0].pageX,
                                pageY: e.touches[0].pageY
                            };
                            _this.touchMove(startCoords, endCoords, e);
                            isMoved = true;
                        }
                    }));
                    this.$inner.on("touchend.lg", (function(event) {
                        if ("swipe" === _this.touchAction) {
                            if (isMoved) {
                                isMoved = false;
                                _this.touchEnd(endCoords, startCoords, event);
                            } else if (isSwiping) {
                                var target = $LG(event.target);
                                if (_this.isPosterElement(target)) _this.LGel.trigger(lGEvents.posterClick);
                            }
                            _this.touchAction = void 0;
                            isSwiping = false;
                        }
                    }));
                }
            };
            LightGallery.prototype.enableDrag = function() {
                var _this = this;
                var startCoords = {};
                var endCoords = {};
                var isDraging = false;
                var isMoved = false;
                if (this.settings.enableDrag) {
                    this.outer.on("mousedown.lg", (function(e) {
                        _this.dragOrSwipeEnabled = true;
                        var $item = _this.getSlideItem(_this.index);
                        if ($LG(e.target).hasClass("lg-item") || $item.get().contains(e.target)) if (!_this.outer.hasClass("lg-zoomed") && !_this.lgBusy) {
                            e.preventDefault();
                            if (!_this.lgBusy) {
                                _this.manageSwipeClass();
                                startCoords = {
                                    pageX: e.pageX,
                                    pageY: e.pageY
                                };
                                isDraging = true;
                                _this.outer.get().scrollLeft += 1;
                                _this.outer.get().scrollLeft -= 1;
                                _this.outer.removeClass("lg-grab").addClass("lg-grabbing");
                                _this.LGel.trigger(lGEvents.dragStart);
                            }
                        }
                    }));
                    $LG(window).on("mousemove.lg.global" + this.lgId, (function(e) {
                        if (isDraging && _this.lgOpened) {
                            isMoved = true;
                            endCoords = {
                                pageX: e.pageX,
                                pageY: e.pageY
                            };
                            _this.touchMove(startCoords, endCoords);
                            _this.LGel.trigger(lGEvents.dragMove);
                        }
                    }));
                    $LG(window).on("mouseup.lg.global" + this.lgId, (function(event) {
                        if (!_this.lgOpened) return;
                        var target = $LG(event.target);
                        if (isMoved) {
                            isMoved = false;
                            _this.touchEnd(endCoords, startCoords, event);
                            _this.LGel.trigger(lGEvents.dragEnd);
                        } else if (_this.isPosterElement(target)) _this.LGel.trigger(lGEvents.posterClick);
                        if (isDraging) {
                            isDraging = false;
                            _this.outer.removeClass("lg-grabbing").addClass("lg-grab");
                        }
                    }));
                }
            };
            LightGallery.prototype.triggerPosterClick = function() {
                var _this = this;
                this.$inner.on("click.lg", (function(event) {
                    if (!_this.dragOrSwipeEnabled && _this.isPosterElement($LG(event.target))) _this.LGel.trigger(lGEvents.posterClick);
                }));
            };
            LightGallery.prototype.manageSwipeClass = function() {
                var _touchNext = this.index + 1;
                var _touchPrev = this.index - 1;
                if (this.settings.loop && this.galleryItems.length > 2) if (0 === this.index) _touchPrev = this.galleryItems.length - 1; else if (this.index === this.galleryItems.length - 1) _touchNext = 0;
                this.outer.find(".lg-item").removeClass("lg-next-slide lg-prev-slide");
                if (_touchPrev > -1) this.getSlideItem(_touchPrev).addClass("lg-prev-slide");
                this.getSlideItem(_touchNext).addClass("lg-next-slide");
            };
            LightGallery.prototype.goToNextSlide = function(fromTouch) {
                var _this = this;
                var _loop = this.settings.loop;
                if (fromTouch && this.galleryItems.length < 3) _loop = false;
                if (!this.lgBusy) if (this.index + 1 < this.galleryItems.length) {
                    this.index++;
                    this.LGel.trigger(lGEvents.beforeNextSlide, {
                        index: this.index
                    });
                    this.slide(this.index, !!fromTouch, false, "next");
                } else if (_loop) {
                    this.index = 0;
                    this.LGel.trigger(lGEvents.beforeNextSlide, {
                        index: this.index
                    });
                    this.slide(this.index, !!fromTouch, false, "next");
                } else if (this.settings.slideEndAnimation && !fromTouch) {
                    this.outer.addClass("lg-right-end");
                    setTimeout((function() {
                        _this.outer.removeClass("lg-right-end");
                    }), 400);
                }
            };
            LightGallery.prototype.goToPrevSlide = function(fromTouch) {
                var _this = this;
                var _loop = this.settings.loop;
                if (fromTouch && this.galleryItems.length < 3) _loop = false;
                if (!this.lgBusy) if (this.index > 0) {
                    this.index--;
                    this.LGel.trigger(lGEvents.beforePrevSlide, {
                        index: this.index,
                        fromTouch
                    });
                    this.slide(this.index, !!fromTouch, false, "prev");
                } else if (_loop) {
                    this.index = this.galleryItems.length - 1;
                    this.LGel.trigger(lGEvents.beforePrevSlide, {
                        index: this.index,
                        fromTouch
                    });
                    this.slide(this.index, !!fromTouch, false, "prev");
                } else if (this.settings.slideEndAnimation && !fromTouch) {
                    this.outer.addClass("lg-left-end");
                    setTimeout((function() {
                        _this.outer.removeClass("lg-left-end");
                    }), 400);
                }
            };
            LightGallery.prototype.keyPress = function() {
                var _this = this;
                $LG(window).on("keydown.lg.global" + this.lgId, (function(e) {
                    if (_this.lgOpened && true === _this.settings.escKey && 27 === e.keyCode) {
                        e.preventDefault();
                        if (_this.settings.allowMediaOverlap && _this.outer.hasClass("lg-can-toggle") && _this.outer.hasClass("lg-components-open")) _this.outer.removeClass("lg-components-open"); else _this.closeGallery();
                    }
                    if (_this.lgOpened && _this.galleryItems.length > 1) {
                        if (37 === e.keyCode) {
                            e.preventDefault();
                            _this.goToPrevSlide();
                        }
                        if (39 === e.keyCode) {
                            e.preventDefault();
                            _this.goToNextSlide();
                        }
                    }
                }));
            };
            LightGallery.prototype.arrow = function() {
                var _this = this;
                this.getElementById("lg-prev").on("click.lg", (function() {
                    _this.goToPrevSlide();
                }));
                this.getElementById("lg-next").on("click.lg", (function() {
                    _this.goToNextSlide();
                }));
            };
            LightGallery.prototype.arrowDisable = function(index) {
                if (!this.settings.loop && this.settings.hideControlOnEnd) {
                    var $prev = this.getElementById("lg-prev");
                    var $next = this.getElementById("lg-next");
                    if (index + 1 === this.galleryItems.length) $next.attr("disabled", "disabled").addClass("disabled"); else $next.removeAttr("disabled").removeClass("disabled");
                    if (0 === index) $prev.attr("disabled", "disabled").addClass("disabled"); else $prev.removeAttr("disabled").removeClass("disabled");
                }
            };
            LightGallery.prototype.setTranslate = function($el, xValue, yValue, scaleX, scaleY) {
                if (void 0 === scaleX) scaleX = 1;
                if (void 0 === scaleY) scaleY = 1;
                $el.css("transform", "translate3d(" + xValue + "px, " + yValue + "px, 0px) scale3d(" + scaleX + ", " + scaleY + ", 1)");
            };
            LightGallery.prototype.mousewheel = function() {
                var _this = this;
                var lastCall = 0;
                this.outer.on("wheel.lg", (function(e) {
                    if (!e.deltaY || _this.galleryItems.length < 2) return;
                    e.preventDefault();
                    var now = (new Date).getTime();
                    if (now - lastCall < 1e3) return;
                    lastCall = now;
                    if (e.deltaY > 0) _this.goToNextSlide(); else if (e.deltaY < 0) _this.goToPrevSlide();
                }));
            };
            LightGallery.prototype.isSlideElement = function(target) {
                return target.hasClass("lg-outer") || target.hasClass("lg-item") || target.hasClass("lg-img-wrap");
            };
            LightGallery.prototype.isPosterElement = function(target) {
                var playButton = this.getSlideItem(this.index).find(".lg-video-play-button").get();
                return target.hasClass("lg-video-poster") || target.hasClass("lg-video-play-button") || playButton && playButton.contains(target.get());
            };
            LightGallery.prototype.toggleMaximize = function() {
                var _this = this;
                this.getElementById("lg-maximize").on("click.lg", (function() {
                    _this.$container.toggleClass("lg-inline");
                    _this.refreshOnResize();
                }));
            };
            LightGallery.prototype.invalidateItems = function() {
                for (var index = 0; index < this.items.length; index++) {
                    var element = this.items[index];
                    var $element = $LG(element);
                    $element.off("click.lgcustom-item-" + $element.attr("data-lg-id"));
                }
            };
            LightGallery.prototype.trapFocus = function() {
                var _this = this;
                this.$container.get().focus({
                    preventScroll: true
                });
                $LG(window).on("keydown.lg.global" + this.lgId, (function(e) {
                    if (!_this.lgOpened) return;
                    var isTabPressed = "Tab" === e.key || 9 === e.keyCode;
                    if (!isTabPressed) return;
                    var focusableEls = utils.getFocusableElements(_this.$container.get());
                    var firstFocusableEl = focusableEls[0];
                    var lastFocusableEl = focusableEls[focusableEls.length - 1];
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus();
                            e.preventDefault();
                        }
                    } else if (document.activeElement === lastFocusableEl) {
                        firstFocusableEl.focus();
                        e.preventDefault();
                    }
                }));
            };
            LightGallery.prototype.manageCloseGallery = function() {
                var _this = this;
                if (!this.settings.closable) return;
                var mousedown = false;
                this.getElementById("lg-close").on("click.lg", (function() {
                    _this.closeGallery();
                }));
                if (this.settings.closeOnTap) {
                    this.outer.on("mousedown.lg", (function(e) {
                        var target = $LG(e.target);
                        if (_this.isSlideElement(target)) mousedown = true; else mousedown = false;
                    }));
                    this.outer.on("mousemove.lg", (function() {
                        mousedown = false;
                    }));
                    this.outer.on("mouseup.lg", (function(e) {
                        var target = $LG(e.target);
                        if (_this.isSlideElement(target) && mousedown) if (!_this.outer.hasClass("lg-dragging")) _this.closeGallery();
                    }));
                }
            };
            LightGallery.prototype.closeGallery = function(force) {
                var _this = this;
                if (!this.lgOpened || !this.settings.closable && !force) return 0;
                this.LGel.trigger(lGEvents.beforeClose);
                if (this.settings.resetScrollPosition && !this.settings.hideScrollbar) $LG(window).scrollTop(this.prevScrollTop);
                var currentItem = this.items[this.index];
                var transform;
                if (this.zoomFromOrigin && currentItem) {
                    var _a = this.mediaContainerPosition, top_4 = _a.top, bottom = _a.bottom;
                    var _b = this.galleryItems[this.index], __slideVideoInfo = _b.__slideVideoInfo, poster = _b.poster;
                    var imageSize = utils.getSize(currentItem, this.outer, top_4 + bottom, __slideVideoInfo && poster && this.settings.videoMaxSize);
                    transform = utils.getTransform(currentItem, this.outer, top_4, bottom, imageSize);
                }
                if (this.zoomFromOrigin && transform) {
                    this.outer.addClass("lg-closing lg-zoom-from-image");
                    this.getSlideItem(this.index).addClass("lg-start-end-progress").css("transition-duration", this.settings.startAnimationDuration + "ms").css("transform", transform);
                } else {
                    this.outer.addClass("lg-hide-items");
                    this.outer.removeClass("lg-zoom-from-image");
                }
                this.destroyModules();
                this.lGalleryOn = false;
                this.isDummyImageRemoved = false;
                this.zoomFromOrigin = this.settings.zoomFromOrigin;
                clearTimeout(this.hideBarTimeout);
                this.hideBarTimeout = false;
                $LG("html").removeClass("lg-on");
                this.outer.removeClass("lg-visible lg-components-open");
                this.$backdrop.removeClass("in").css("opacity", 0);
                var removeTimeout = this.zoomFromOrigin && transform ? Math.max(this.settings.startAnimationDuration, this.settings.backdropDuration) : this.settings.backdropDuration;
                this.$container.removeClass("lg-show-in");
                setTimeout((function() {
                    if (_this.zoomFromOrigin && transform) _this.outer.removeClass("lg-zoom-from-image");
                    _this.$container.removeClass("lg-show");
                    _this.resetScrollBar();
                    _this.$backdrop.removeAttr("style").css("transition-duration", _this.settings.backdropDuration + "ms");
                    _this.outer.removeClass("lg-closing " + _this.settings.startClass);
                    _this.getSlideItem(_this.index).removeClass("lg-start-end-progress");
                    _this.$inner.empty();
                    if (_this.lgOpened) _this.LGel.trigger(lGEvents.afterClose, {
                        instance: _this
                    });
                    if (_this.$container.get()) _this.$container.get().blur();
                    _this.lgOpened = false;
                }), removeTimeout + 100);
                return removeTimeout + 100;
            };
            LightGallery.prototype.initModules = function() {
                this.plugins.forEach((function(module) {
                    try {
                        module.init();
                    } catch (err) {
                        console.warn("lightGallery:- make sure lightGallery module is properly initiated");
                    }
                }));
            };
            LightGallery.prototype.destroyModules = function(destroy) {
                this.plugins.forEach((function(module) {
                    try {
                        if (destroy) module.destroy(); else module.closeGallery && module.closeGallery();
                    } catch (err) {
                        console.warn("lightGallery:- make sure lightGallery module is properly destroyed");
                    }
                }));
            };
            LightGallery.prototype.refresh = function(galleryItems) {
                if (!this.settings.dynamic) this.invalidateItems();
                if (galleryItems) this.galleryItems = galleryItems; else this.galleryItems = this.getItems();
                this.updateControls();
                this.openGalleryOnItemClick();
                this.LGel.trigger(lGEvents.updateSlides);
            };
            LightGallery.prototype.updateControls = function() {
                this.addSlideVideoInfo(this.galleryItems);
                this.updateCounterTotal();
                this.manageSingleSlideClassName();
            };
            LightGallery.prototype.destroyGallery = function() {
                this.destroyModules(true);
                if (!this.settings.dynamic) this.invalidateItems();
                $LG(window).off(".lg.global" + this.lgId);
                this.LGel.off(".lg");
                this.$container.remove();
            };
            LightGallery.prototype.destroy = function() {
                var closeTimeout = this.closeGallery(true);
                if (closeTimeout) setTimeout(this.destroyGallery.bind(this), closeTimeout); else this.destroyGallery();
                return closeTimeout;
            };
            return LightGallery;
        }();
        function lightGallery(el, options) {
            return new LightGallery(el, options);
        }
        const lightgallery_es5 = lightGallery;
        var lg_thumbnail_min = __webpack_require__(97);
        var lg_zoom_min = __webpack_require__(86);
        const galleries = document.querySelectorAll("[data-gallery]");
        if (galleries.length) {
            let galleyItems = [];
            galleries.forEach((gallery => {
                galleyItems.push({
                    gallery,
                    galleryClass: lightgallery_es5(gallery, {
                        plugins: [ lg_zoom_min, lg_thumbnail_min ],
                        licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
                        speed: 500
                    })
                });
            }));
            modules_flsModules.gallery = galleyItems;
        }
        class DynamicAdapt {
            constructor(type) {
                this.type = type;
            }
            init() {
                this.оbjects = [];
                this.daClassname = "_dynamic_adapt_";
                this.nodes = [ ...document.querySelectorAll("[data-da]") ];
                this.nodes.forEach((node => {
                    const data = node.dataset.da.trim();
                    const dataArray = data.split(",");
                    const оbject = {};
                    оbject.element = node;
                    оbject.parent = node.parentNode;
                    оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                    оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                    оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                    оbject.index = this.indexInParent(оbject.parent, оbject.element);
                    this.оbjects.push(оbject);
                }));
                this.arraySort(this.оbjects);
                this.mediaQueries = this.оbjects.map((({breakpoint}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)).filter(((item, index, self) => self.indexOf(item) === index));
                this.mediaQueries.forEach((media => {
                    const mediaSplit = media.split(",");
                    const matchMedia = window.matchMedia(mediaSplit[0]);
                    const mediaBreakpoint = mediaSplit[1];
                    const оbjectsFilter = this.оbjects.filter((({breakpoint}) => breakpoint === mediaBreakpoint));
                    matchMedia.addEventListener("change", (() => {
                        this.mediaHandler(matchMedia, оbjectsFilter);
                    }));
                    this.mediaHandler(matchMedia, оbjectsFilter);
                }));
            }
            mediaHandler(matchMedia, оbjects) {
                if (matchMedia.matches) оbjects.forEach((оbject => {
                    this.moveTo(оbject.place, оbject.element, оbject.destination);
                })); else оbjects.forEach((({parent, element, index}) => {
                    if (element.classList.contains(this.daClassname)) this.moveBack(parent, element, index);
                }));
            }
            moveTo(place, element, destination) {
                element.classList.add(this.daClassname);
                if ("last" === place || place >= destination.children.length) {
                    destination.append(element);
                    return;
                }
                if ("first" === place) {
                    destination.prepend(element);
                    return;
                }
                destination.children[place].before(element);
            }
            moveBack(parent, element, index) {
                element.classList.remove(this.daClassname);
                if (void 0 !== parent.children[index]) parent.children[index].before(element); else parent.append(element);
            }
            indexInParent(parent, element) {
                return [ ...parent.children ].indexOf(element);
            }
            arraySort(arr) {
                if ("min" === this.type) arr.sort(((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if ("first" === a.place || "last" === b.place) return -1;
                        if ("last" === a.place || "first" === b.place) return 1;
                        return 0;
                    }
                    return a.breakpoint - b.breakpoint;
                })); else {
                    arr.sort(((a, b) => {
                        if (a.breakpoint === b.breakpoint) {
                            if (a.place === b.place) return 0;
                            if ("first" === a.place || "last" === b.place) return 1;
                            if ("last" === a.place || "first" === b.place) return -1;
                            return 0;
                        }
                        return b.breakpoint - a.breakpoint;
                    }));
                    return;
                }
            }
        }
        const da = new DynamicAdapt("max");
        da.init();
        /*! jQuery v3.6.0 | (c) OpenJS Foundation and other contributors | jquery.org/license */
        !function(e, t) {
            "use strict";
            "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
                if (!e.document) throw new Error("jQuery requires a window with a document");
                return t(e);
            } : t(e);
        }("undefined" != typeof window ? window : void 0, (function(C, e) {
            "use strict";
            var t = [], r = Object.getPrototypeOf, s = t.slice, g = t.flat ? function(e) {
                return t.flat.call(e);
            } : function(e) {
                return t.concat.apply([], e);
            }, u = t.push, i = t.indexOf, n = {}, o = n.toString, v = n.hasOwnProperty, a = v.toString, l = a.call(Object), y = {}, m = function(e) {
                return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item;
            }, x = function(e) {
                return null != e && e === e.window;
            }, E = C.document, c = {
                type: !0,
                src: !0,
                nonce: !0,
                noModule: !0
            };
            function b(e, t, n) {
                var r, i, o = (n = n || E).createElement("script");
                if (o.text = e, t) for (r in c) (i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
                n.head.appendChild(o).parentNode.removeChild(o);
            }
            function w(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[o.call(e)] || "object" : typeof e;
            }
            var f = "3.6.0", S = function(e, t) {
                return new S.fn.init(e, t);
            };
            function p(e) {
                var t = !!e && "length" in e && e.length, n = w(e);
                return !m(e) && !x(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e);
            }
            S.fn = S.prototype = {
                jquery: f,
                constructor: S,
                length: 0,
                toArray: function() {
                    return s.call(this);
                },
                get: function(e) {
                    return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e];
                },
                pushStack: function(e) {
                    var t = S.merge(this.constructor(), e);
                    return t.prevObject = this, t;
                },
                each: function(e) {
                    return S.each(this, e);
                },
                map: function(n) {
                    return this.pushStack(S.map(this, (function(e, t) {
                        return n.call(e, t, e);
                    })));
                },
                slice: function() {
                    return this.pushStack(s.apply(this, arguments));
                },
                first: function() {
                    return this.eq(0);
                },
                last: function() {
                    return this.eq(-1);
                },
                even: function() {
                    return this.pushStack(S.grep(this, (function(e, t) {
                        return (t + 1) % 2;
                    })));
                },
                odd: function() {
                    return this.pushStack(S.grep(this, (function(e, t) {
                        return t % 2;
                    })));
                },
                eq: function(e) {
                    var t = this.length, n = +e + (e < 0 ? t : 0);
                    return this.pushStack(0 <= n && n < t ? [ this[n] ] : []);
                },
                end: function() {
                    return this.prevObject || this.constructor();
                },
                push: u,
                sort: t.sort,
                splice: t.splice
            }, S.extend = S.fn.extend = function() {
                var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
                for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || m(a) || (a = {}), 
                s === u && (a = this, s--); s < u; s++) if (null != (e = arguments[s])) for (t in e) r = e[t], 
                "__proto__" !== t && a !== r && (l && r && (S.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t], 
                o = i && !Array.isArray(n) ? [] : i || S.isPlainObject(n) ? n : {}, i = !1, a[t] = S.extend(l, o, r)) : void 0 !== r && (a[t] = r));
                return a;
            }, S.extend({
                expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(e) {
                    throw new Error(e);
                },
                noop: function() {},
                isPlainObject: function(e) {
                    var t, n;
                    return !(!e || "[object Object]" !== o.call(e)) && (!(t = r(e)) || "function" == typeof (n = v.call(t, "constructor") && t.constructor) && a.call(n) === l);
                },
                isEmptyObject: function(e) {
                    var t;
                    for (t in e) return !1;
                    return !0;
                },
                globalEval: function(e, t, n) {
                    b(e, {
                        nonce: t && t.nonce
                    }, n);
                },
                each: function(e, t) {
                    var n, r = 0;
                    if (p(e)) {
                        for (n = e.length; r < n; r++) if (!1 === t.call(e[r], r, e[r])) break;
                    } else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
                    return e;
                },
                makeArray: function(e, t) {
                    var n = t || [];
                    return null != e && (p(Object(e)) ? S.merge(n, "string" == typeof e ? [ e ] : e) : u.call(n, e)), 
                    n;
                },
                inArray: function(e, t, n) {
                    return null == t ? -1 : i.call(t, e, n);
                },
                merge: function(e, t) {
                    for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
                    return e.length = i, e;
                },
                grep: function(e, t, n) {
                    for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) !t(e[i], i) !== a && r.push(e[i]);
                    return r;
                },
                map: function(e, t, n) {
                    var r, i, o = 0, a = [];
                    if (p(e)) for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && a.push(i); else for (o in e) null != (i = t(e[o], o, n)) && a.push(i);
                    return g(a);
                },
                guid: 1,
                support: y
            }), "function" == typeof Symbol && (S.fn[Symbol.iterator] = t[Symbol.iterator]), 
            S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function(e, t) {
                n["[object " + t + "]"] = t.toLowerCase();
            }));
            var d = function(n) {
                var e, d, b, o, i, h, f, g, w, u, l, T, C, a, E, v, s, c, y, S = "sizzle" + 1 * new Date, p = n.document, k = 0, r = 0, m = ue(), x = ue(), A = ue(), N = ue(), j = function(e, t) {
                    return e === t && (l = !0), 0;
                }, D = {}.hasOwnProperty, t = [], q = t.pop, L = t.push, H = t.push, O = t.slice, P = function(e, t) {
                    for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
                    return -1;
                }, R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", M = "[\\x20\\t\\r\\n\\f]", I = "(?:\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", W = "\\[" + M + "*(" + I + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + M + "*\\]", F = ":(" + I + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)", B = new RegExp(M + "+", "g"), $ = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"), _ = new RegExp("^" + M + "*," + M + "*"), z = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"), U = new RegExp(M + "|>"), X = new RegExp(F), V = new RegExp("^" + I + "$"), G = {
                    ID: new RegExp("^#(" + I + ")"),
                    CLASS: new RegExp("^\\.(" + I + ")"),
                    TAG: new RegExp("^(" + I + "|[*])"),
                    ATTR: new RegExp("^" + W),
                    PSEUDO: new RegExp("^" + F),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + R + ")$", "i"),
                    needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
                }, Y = /HTML$/i, Q = /^(?:input|select|textarea|button)$/i, J = /^h\d$/i, K = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ee = /[+~]/, te = new RegExp("\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\([^\\r\\n\\f])", "g"), ne = function(e, t) {
                    var n = "0x" + e.slice(1) - 65536;
                    return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320));
                }, re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ie = function(e, t) {
                    return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
                }, oe = function() {
                    T();
                }, ae = be((function(e) {
                    return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
                }), {
                    dir: "parentNode",
                    next: "legend"
                });
                try {
                    H.apply(t = O.call(p.childNodes), p.childNodes), t[p.childNodes.length].nodeType;
                } catch (e) {
                    H = {
                        apply: t.length ? function(e, t) {
                            L.apply(e, O.call(t));
                        } : function(e, t) {
                            var n = e.length, r = 0;
                            while (e[n++] = t[r++]) ;
                            e.length = n - 1;
                        }
                    };
                }
                function se(t, e, n, r) {
                    var i, o, a, s, u, l, c, f = e && e.ownerDocument, p = e ? e.nodeType : 9;
                    if (n = n || [], "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p) return n;
                    if (!r && (T(e), e = e || C, E)) {
                        if (11 !== p && (u = Z.exec(t))) if (i = u[1]) {
                            if (9 === p) {
                                if (!(a = e.getElementById(i))) return n;
                                if (a.id === i) return n.push(a), n;
                            } else if (f && (a = f.getElementById(i)) && y(e, a) && a.id === i) return n.push(a), 
                            n;
                        } else {
                            if (u[2]) return H.apply(n, e.getElementsByTagName(t)), n;
                            if ((i = u[3]) && d.getElementsByClassName && e.getElementsByClassName) return H.apply(n, e.getElementsByClassName(i)), 
                            n;
                        }
                        if (d.qsa && !N[t + " "] && (!v || !v.test(t)) && (1 !== p || "object" !== e.nodeName.toLowerCase())) {
                            if (c = t, f = e, 1 === p && (U.test(t) || z.test(t))) {
                                (f = ee.test(t) && ye(e.parentNode) || e) === e && d.scope || ((s = e.getAttribute("id")) ? s = s.replace(re, ie) : e.setAttribute("id", s = S)), 
                                o = (l = h(t)).length;
                                while (o--) l[o] = (s ? "#" + s : ":scope") + " " + xe(l[o]);
                                c = l.join(",");
                            }
                            try {
                                return H.apply(n, f.querySelectorAll(c)), n;
                            } catch (e) {
                                N(t, !0);
                            } finally {
                                s === S && e.removeAttribute("id");
                            }
                        }
                    }
                    return g(t.replace($, "$1"), e, n, r);
                }
                function ue() {
                    var r = [];
                    return function e(t, n) {
                        return r.push(t + " ") > b.cacheLength && delete e[r.shift()], e[t + " "] = n;
                    };
                }
                function le(e) {
                    return e[S] = !0, e;
                }
                function ce(e) {
                    var t = C.createElement("fieldset");
                    try {
                        return !!e(t);
                    } catch (e) {
                        return !1;
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t), t = null;
                    }
                }
                function fe(e, t) {
                    var n = e.split("|"), r = n.length;
                    while (r--) b.attrHandle[n[r]] = t;
                }
                function pe(e, t) {
                    var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                    if (r) return r;
                    if (n) while (n = n.nextSibling) if (n === t) return -1;
                    return e ? 1 : -1;
                }
                function de(t) {
                    return function(e) {
                        return "input" === e.nodeName.toLowerCase() && e.type === t;
                    };
                }
                function he(n) {
                    return function(e) {
                        var t = e.nodeName.toLowerCase();
                        return ("input" === t || "button" === t) && e.type === n;
                    };
                }
                function ge(t) {
                    return function(e) {
                        return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && ae(e) === t : e.disabled === t : "label" in e && e.disabled === t;
                    };
                }
                function ve(a) {
                    return le((function(o) {
                        return o = +o, le((function(e, t) {
                            var n, r = a([], e.length, o), i = r.length;
                            while (i--) e[n = r[i]] && (e[n] = !(t[n] = e[n]));
                        }));
                    }));
                }
                function ye(e) {
                    return e && "undefined" != typeof e.getElementsByTagName && e;
                }
                for (e in d = se.support = {}, i = se.isXML = function(e) {
                    var t = e && e.namespaceURI, n = e && (e.ownerDocument || e).documentElement;
                    return !Y.test(t || n && n.nodeName || "HTML");
                }, T = se.setDocument = function(e) {
                    var t, n, r = e ? e.ownerDocument || e : p;
                    return r != C && 9 === r.nodeType && r.documentElement && (a = (C = r).documentElement, 
                    E = !i(C), p != C && (n = C.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", oe, !1) : n.attachEvent && n.attachEvent("onunload", oe)), 
                    d.scope = ce((function(e) {
                        return a.appendChild(e).appendChild(C.createElement("div")), "undefined" != typeof e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length;
                    })), d.attributes = ce((function(e) {
                        return e.className = "i", !e.getAttribute("className");
                    })), d.getElementsByTagName = ce((function(e) {
                        return e.appendChild(C.createComment("")), !e.getElementsByTagName("*").length;
                    })), d.getElementsByClassName = K.test(C.getElementsByClassName), d.getById = ce((function(e) {
                        return a.appendChild(e).id = S, !C.getElementsByName || !C.getElementsByName(S).length;
                    })), d.getById ? (b.filter.ID = function(e) {
                        var t = e.replace(te, ne);
                        return function(e) {
                            return e.getAttribute("id") === t;
                        };
                    }, b.find.ID = function(e, t) {
                        if ("undefined" != typeof t.getElementById && E) {
                            var n = t.getElementById(e);
                            return n ? [ n ] : [];
                        }
                    }) : (b.filter.ID = function(e) {
                        var n = e.replace(te, ne);
                        return function(e) {
                            var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                            return t && t.value === n;
                        };
                    }, b.find.ID = function(e, t) {
                        if ("undefined" != typeof t.getElementById && E) {
                            var n, r, i, o = t.getElementById(e);
                            if (o) {
                                if ((n = o.getAttributeNode("id")) && n.value === e) return [ o ];
                                i = t.getElementsByName(e), r = 0;
                                while (o = i[r++]) if ((n = o.getAttributeNode("id")) && n.value === e) return [ o ];
                            }
                            return [];
                        }
                    }), b.find.TAG = d.getElementsByTagName ? function(e, t) {
                        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : d.qsa ? t.querySelectorAll(e) : void 0;
                    } : function(e, t) {
                        var n, r = [], i = 0, o = t.getElementsByTagName(e);
                        if ("*" === e) {
                            while (n = o[i++]) 1 === n.nodeType && r.push(n);
                            return r;
                        }
                        return o;
                    }, b.find.CLASS = d.getElementsByClassName && function(e, t) {
                        if ("undefined" != typeof t.getElementsByClassName && E) return t.getElementsByClassName(e);
                    }, s = [], v = [], (d.qsa = K.test(C.querySelectorAll)) && (ce((function(e) {
                        var t;
                        a.appendChild(e).innerHTML = "<a id='" + S + "'></a><select id='" + S + "-\r\\' msallowcapture=''><option selected=''></option></select>", 
                        e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + M + "*(?:''|\"\")"), 
                        e.querySelectorAll("[selected]").length || v.push("\\[" + M + "*(?:value|" + R + ")"), 
                        e.querySelectorAll("[id~=" + S + "-]").length || v.push("~="), (t = C.createElement("input")).setAttribute("name", ""), 
                        e.appendChild(t), e.querySelectorAll("[name='']").length || v.push("\\[" + M + "*name" + M + "*=" + M + "*(?:''|\"\")"), 
                        e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + S + "+*").length || v.push(".#.+[+~]"), 
                        e.querySelectorAll("\\\f"), v.push("[\\r\\n\\f]");
                    })), ce((function(e) {
                        e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                        var t = C.createElement("input");
                        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + M + "*[*^$|!~]?="), 
                        2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"), 
                        a.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"), 
                        e.querySelectorAll("*,:x"), v.push(",.*:");
                    }))), (d.matchesSelector = K.test(c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && ce((function(e) {
                        d.disconnectedMatch = c.call(e, "*"), c.call(e, "[s!='']:x"), s.push("!=", F);
                    })), v = v.length && new RegExp(v.join("|")), s = s.length && new RegExp(s.join("|")), 
                    t = K.test(a.compareDocumentPosition), y = t || K.test(a.contains) ? function(e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
                    } : function(e, t) {
                        if (t) while (t = t.parentNode) if (t === e) return !0;
                        return !1;
                    }, j = t ? function(e, t) {
                        if (e === t) return l = !0, 0;
                        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !d.sortDetached && t.compareDocumentPosition(e) === n ? e == C || e.ownerDocument == p && y(p, e) ? -1 : t == C || t.ownerDocument == p && y(p, t) ? 1 : u ? P(u, e) - P(u, t) : 0 : 4 & n ? -1 : 1);
                    } : function(e, t) {
                        if (e === t) return l = !0, 0;
                        var n, r = 0, i = e.parentNode, o = t.parentNode, a = [ e ], s = [ t ];
                        if (!i || !o) return e == C ? -1 : t == C ? 1 : i ? -1 : o ? 1 : u ? P(u, e) - P(u, t) : 0;
                        if (i === o) return pe(e, t);
                        n = e;
                        while (n = n.parentNode) a.unshift(n);
                        n = t;
                        while (n = n.parentNode) s.unshift(n);
                        while (a[r] === s[r]) r++;
                        return r ? pe(a[r], s[r]) : a[r] == p ? -1 : s[r] == p ? 1 : 0;
                    }), C;
                }, se.matches = function(e, t) {
                    return se(e, null, null, t);
                }, se.matchesSelector = function(e, t) {
                    if (T(e), d.matchesSelector && E && !N[t + " "] && (!s || !s.test(t)) && (!v || !v.test(t))) try {
                        var n = c.call(e, t);
                        if (n || d.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n;
                    } catch (e) {
                        N(t, !0);
                    }
                    return 0 < se(t, C, null, [ e ]).length;
                }, se.contains = function(e, t) {
                    return (e.ownerDocument || e) != C && T(e), y(e, t);
                }, se.attr = function(e, t) {
                    (e.ownerDocument || e) != C && T(e);
                    var n = b.attrHandle[t.toLowerCase()], r = n && D.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
                    return void 0 !== r ? r : d.attributes || !E ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
                }, se.escape = function(e) {
                    return (e + "").replace(re, ie);
                }, se.error = function(e) {
                    throw new Error("Syntax error, unrecognized expression: " + e);
                }, se.uniqueSort = function(e) {
                    var t, n = [], r = 0, i = 0;
                    if (l = !d.detectDuplicates, u = !d.sortStable && e.slice(0), e.sort(j), l) {
                        while (t = e[i++]) t === e[i] && (r = n.push(i));
                        while (r--) e.splice(n[r], 1);
                    }
                    return u = null, e;
                }, o = se.getText = function(e) {
                    var t, n = "", r = 0, i = e.nodeType;
                    if (i) {
                        if (1 === i || 9 === i || 11 === i) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) n += o(e);
                        } else if (3 === i || 4 === i) return e.nodeValue;
                    } else while (t = e[r++]) n += o(t);
                    return n;
                }, (b = se.selectors = {
                    cacheLength: 50,
                    createPseudo: le,
                    match: G,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(e) {
                            return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), 
                            "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                        },
                        CHILD: function(e) {
                            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]), 
                            e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]), 
                            e;
                        },
                        PSEUDO: function(e) {
                            var t, n = !e[6] && e[2];
                            return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), 
                            e[2] = n.slice(0, t)), e.slice(0, 3));
                        }
                    },
                    filter: {
                        TAG: function(e) {
                            var t = e.replace(te, ne).toLowerCase();
                            return "*" === e ? function() {
                                return !0;
                            } : function(e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t;
                            };
                        },
                        CLASS: function(e) {
                            var t = m[e + " "];
                            return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && m(e, (function(e) {
                                return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "");
                            }));
                        },
                        ATTR: function(n, r, i) {
                            return function(e) {
                                var t = se.attr(e, n);
                                return null == t ? "!=" === r : !r || (t += "", "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(B, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"));
                            };
                        },
                        CHILD: function(h, e, t, g, v) {
                            var y = "nth" !== h.slice(0, 3), m = "last" !== h.slice(-4), x = "of-type" === e;
                            return 1 === g && 0 === v ? function(e) {
                                return !!e.parentNode;
                            } : function(e, t, n) {
                                var r, i, o, a, s, u, l = y !== m ? "nextSibling" : "previousSibling", c = e.parentNode, f = x && e.nodeName.toLowerCase(), p = !n && !x, d = !1;
                                if (c) {
                                    if (y) {
                                        while (l) {
                                            a = e;
                                            while (a = a[l]) if (x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) return !1;
                                            u = l = "only" === h && !u && "nextSibling";
                                        }
                                        return !0;
                                    }
                                    if (u = [ m ? c.firstChild : c.lastChild ], m && p) {
                                        d = (s = (r = (i = (o = (a = c)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]) && r[2], 
                                        a = s && c.childNodes[s];
                                        while (a = ++s && a && a[l] || (d = s = 0) || u.pop()) if (1 === a.nodeType && ++d && a === e) {
                                            i[h] = [ k, s, d ];
                                            break;
                                        }
                                    } else if (p && (d = s = (r = (i = (o = (a = e)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]), 
                                    !1 === d) while (a = ++s && a && a[l] || (d = s = 0) || u.pop()) if ((x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) && ++d && (p && ((i = (o = a[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [ k, d ]), 
                                    a === e)) break;
                                    return (d -= v) === g || d % g == 0 && 0 <= d / g;
                                }
                            };
                        },
                        PSEUDO: function(e, o) {
                            var t, a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
                            return a[S] ? a(o) : 1 < a.length ? (t = [ e, e, "", o ], b.setFilters.hasOwnProperty(e.toLowerCase()) ? le((function(e, t) {
                                var n, r = a(e, o), i = r.length;
                                while (i--) e[n = P(e, r[i])] = !(t[n] = r[i]);
                            })) : function(e) {
                                return a(e, 0, t);
                            }) : a;
                        }
                    },
                    pseudos: {
                        not: le((function(e) {
                            var r = [], i = [], s = f(e.replace($, "$1"));
                            return s[S] ? le((function(e, t, n, r) {
                                var i, o = s(e, null, r, []), a = e.length;
                                while (a--) (i = o[a]) && (e[a] = !(t[a] = i));
                            })) : function(e, t, n) {
                                return r[0] = e, s(r, null, n, i), r[0] = null, !i.pop();
                            };
                        })),
                        has: le((function(t) {
                            return function(e) {
                                return 0 < se(t, e).length;
                            };
                        })),
                        contains: le((function(t) {
                            return t = t.replace(te, ne), function(e) {
                                return -1 < (e.textContent || o(e)).indexOf(t);
                            };
                        })),
                        lang: le((function(n) {
                            return V.test(n || "") || se.error("unsupported lang: " + n), n = n.replace(te, ne).toLowerCase(), 
                            function(e) {
                                var t;
                                do {
                                    if (t = E ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-");
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1;
                            };
                        })),
                        target: function(e) {
                            var t = n.location && n.location.hash;
                            return t && t.slice(1) === e.id;
                        },
                        root: function(e) {
                            return e === a;
                        },
                        focus: function(e) {
                            return e === C.activeElement && (!C.hasFocus || C.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                        },
                        enabled: ge(!1),
                        disabled: ge(!0),
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected;
                        },
                        selected: function(e) {
                            return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
                        },
                        empty: function(e) {
                            for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                            return !0;
                        },
                        parent: function(e) {
                            return !b.pseudos.empty(e);
                        },
                        header: function(e) {
                            return J.test(e.nodeName);
                        },
                        input: function(e) {
                            return Q.test(e.nodeName);
                        },
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t;
                        },
                        text: function(e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
                        },
                        first: ve((function() {
                            return [ 0 ];
                        })),
                        last: ve((function(e, t) {
                            return [ t - 1 ];
                        })),
                        eq: ve((function(e, t, n) {
                            return [ n < 0 ? n + t : n ];
                        })),
                        even: ve((function(e, t) {
                            for (var n = 0; n < t; n += 2) e.push(n);
                            return e;
                        })),
                        odd: ve((function(e, t) {
                            for (var n = 1; n < t; n += 2) e.push(n);
                            return e;
                        })),
                        lt: ve((function(e, t, n) {
                            for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r; ) e.push(r);
                            return e;
                        })),
                        gt: ve((function(e, t, n) {
                            for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
                            return e;
                        }))
                    }
                }).pseudos.nth = b.pseudos.eq, {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) b.pseudos[e] = de(e);
                for (e in {
                    submit: !0,
                    reset: !0
                }) b.pseudos[e] = he(e);
                function me() {}
                function xe(e) {
                    for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
                    return r;
                }
                function be(s, e, t) {
                    var u = e.dir, l = e.next, c = l || u, f = t && "parentNode" === c, p = r++;
                    return e.first ? function(e, t, n) {
                        while (e = e[u]) if (1 === e.nodeType || f) return s(e, t, n);
                        return !1;
                    } : function(e, t, n) {
                        var r, i, o, a = [ k, p ];
                        if (n) {
                            while (e = e[u]) if ((1 === e.nodeType || f) && s(e, t, n)) return !0;
                        } else while (e = e[u]) if (1 === e.nodeType || f) if (i = (o = e[S] || (e[S] = {}))[e.uniqueID] || (o[e.uniqueID] = {}), 
                        l && l === e.nodeName.toLowerCase()) e = e[u] || e; else {
                            if ((r = i[c]) && r[0] === k && r[1] === p) return a[2] = r[2];
                            if ((i[c] = a)[2] = s(e, t, n)) return !0;
                        }
                        return !1;
                    };
                }
                function we(i) {
                    return 1 < i.length ? function(e, t, n) {
                        var r = i.length;
                        while (r--) if (!i[r](e, t, n)) return !1;
                        return !0;
                    } : i[0];
                }
                function Te(e, t, n, r, i) {
                    for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++) (o = e[s]) && (n && !n(o, r, i) || (a.push(o), 
                    l && t.push(s)));
                    return a;
                }
                function Ce(d, h, g, v, y, e) {
                    return v && !v[S] && (v = Ce(v)), y && !y[S] && (y = Ce(y, e)), le((function(e, t, n, r) {
                        var i, o, a, s = [], u = [], l = t.length, c = e || function(e, t, n) {
                            for (var r = 0, i = t.length; r < i; r++) se(e, t[r], n);
                            return n;
                        }(h || "*", n.nodeType ? [ n ] : n, []), f = !d || !e && h ? c : Te(c, s, d, n, r), p = g ? y || (e ? d : l || v) ? [] : t : f;
                        if (g && g(f, p, n, r), v) {
                            i = Te(p, u), v(i, [], n, r), o = i.length;
                            while (o--) (a = i[o]) && (p[u[o]] = !(f[u[o]] = a));
                        }
                        if (e) {
                            if (y || d) {
                                if (y) {
                                    i = [], o = p.length;
                                    while (o--) (a = p[o]) && i.push(f[o] = a);
                                    y(null, p = [], i, r);
                                }
                                o = p.length;
                                while (o--) (a = p[o]) && -1 < (i = y ? P(e, a) : s[o]) && (e[i] = !(t[i] = a));
                            }
                        } else p = Te(p === t ? p.splice(l, p.length) : p), y ? y(null, t, p, r) : H.apply(t, p);
                    }));
                }
                function Ee(e) {
                    for (var i, t, n, r = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1 : 0, u = be((function(e) {
                        return e === i;
                    }), a, !0), l = be((function(e) {
                        return -1 < P(i, e);
                    }), a, !0), c = [ function(e, t, n) {
                        var r = !o && (n || t !== w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
                        return i = null, r;
                    } ]; s < r; s++) if (t = b.relative[e[s].type]) c = [ be(we(c), t) ]; else {
                        if ((t = b.filter[e[s].type].apply(null, e[s].matches))[S]) {
                            for (n = ++s; n < r; n++) if (b.relative[e[n].type]) break;
                            return Ce(1 < s && we(c), 1 < s && xe(e.slice(0, s - 1).concat({
                                value: " " === e[s - 2].type ? "*" : ""
                            })).replace($, "$1"), t, s < n && Ee(e.slice(s, n)), n < r && Ee(e = e.slice(n)), n < r && xe(e));
                        }
                        c.push(t);
                    }
                    return we(c);
                }
                return me.prototype = b.filters = b.pseudos, b.setFilters = new me, h = se.tokenize = function(e, t) {
                    var n, r, i, o, a, s, u, l = x[e + " "];
                    if (l) return t ? 0 : l.slice(0);
                    a = e, s = [], u = b.preFilter;
                    while (a) {
                        for (o in n && !(r = _.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(i = [])), 
                        n = !1, (r = z.exec(a)) && (n = r.shift(), i.push({
                            value: n,
                            type: r[0].replace($, " ")
                        }), a = a.slice(n.length)), b.filter) !(r = G[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), 
                        i.push({
                            value: n,
                            type: o,
                            matches: r
                        }), a = a.slice(n.length));
                        if (!n) break;
                    }
                    return t ? a.length : a ? se.error(e) : x(e, s).slice(0);
                }, f = se.compile = function(e, t) {
                    var n, v, y, m, x, r, i = [], o = [], a = A[e + " "];
                    if (!a) {
                        t || (t = h(e)), n = t.length;
                        while (n--) (a = Ee(t[n]))[S] ? i.push(a) : o.push(a);
                        (a = A(e, (v = o, m = 0 < (y = i).length, x = 0 < v.length, r = function(e, t, n, r, i) {
                            var o, a, s, u = 0, l = "0", c = e && [], f = [], p = w, d = e || x && b.find.TAG("*", i), h = k += null == p ? 1 : Math.random() || .1, g = d.length;
                            for (i && (w = t == C || t || i); l !== g && null != (o = d[l]); l++) {
                                if (x && o) {
                                    a = 0, t || o.ownerDocument == C || (T(o), n = !E);
                                    while (s = v[a++]) if (s(o, t || C, n)) {
                                        r.push(o);
                                        break;
                                    }
                                    i && (k = h);
                                }
                                m && ((o = !s && o) && u--, e && c.push(o));
                            }
                            if (u += l, m && l !== u) {
                                a = 0;
                                while (s = y[a++]) s(c, f, t, n);
                                if (e) {
                                    if (0 < u) while (l--) c[l] || f[l] || (f[l] = q.call(r));
                                    f = Te(f);
                                }
                                H.apply(r, f), i && !e && 0 < f.length && 1 < u + y.length && se.uniqueSort(r);
                            }
                            return i && (k = h, w = p), c;
                        }, m ? le(r) : r))).selector = e;
                    }
                    return a;
                }, g = se.select = function(e, t, n, r) {
                    var i, o, a, s, u, l = "function" == typeof e && e, c = !r && h(e = l.selector || e);
                    if (n = n || [], 1 === c.length) {
                        if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && E && b.relative[o[1].type]) {
                            if (!(t = (b.find.ID(a.matches[0].replace(te, ne), t) || [])[0])) return n;
                            l && (t = t.parentNode), e = e.slice(o.shift().value.length);
                        }
                        i = G.needsContext.test(e) ? 0 : o.length;
                        while (i--) {
                            if (a = o[i], b.relative[s = a.type]) break;
                            if ((u = b.find[s]) && (r = u(a.matches[0].replace(te, ne), ee.test(o[0].type) && ye(t.parentNode) || t))) {
                                if (o.splice(i, 1), !(e = r.length && xe(o))) return H.apply(n, r), n;
                                break;
                            }
                        }
                    }
                    return (l || f(e, c))(r, t, !E, n, !t || ee.test(e) && ye(t.parentNode) || t), n;
                }, d.sortStable = S.split("").sort(j).join("") === S, d.detectDuplicates = !!l, 
                T(), d.sortDetached = ce((function(e) {
                    return 1 & e.compareDocumentPosition(C.createElement("fieldset"));
                })), ce((function(e) {
                    return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
                })) || fe("type|href|height|width", (function(e, t, n) {
                    if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
                })), d.attributes && ce((function(e) {
                    return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
                })) || fe("value", (function(e, t, n) {
                    if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
                })), ce((function(e) {
                    return null == e.getAttribute("disabled");
                })) || fe(R, (function(e, t, n) {
                    var r;
                    if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
                })), se;
            }(C);
            S.find = d, S.expr = d.selectors, S.expr[":"] = S.expr.pseudos, S.uniqueSort = S.unique = d.uniqueSort, 
            S.text = d.getText, S.isXMLDoc = d.isXML, S.contains = d.contains, S.escapeSelector = d.escape;
            var h = function(e, t, n) {
                var r = [], i = void 0 !== n;
                while ((e = e[t]) && 9 !== e.nodeType) if (1 === e.nodeType) {
                    if (i && S(e).is(n)) break;
                    r.push(e);
                }
                return r;
            }, T = function(e, t) {
                for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                return n;
            }, k = S.expr.match.needsContext;
            function A(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
            }
            var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
            function j(e, n, r) {
                return m(n) ? S.grep(e, (function(e, t) {
                    return !!n.call(e, t, e) !== r;
                })) : n.nodeType ? S.grep(e, (function(e) {
                    return e === n !== r;
                })) : "string" != typeof n ? S.grep(e, (function(e) {
                    return -1 < i.call(n, e) !== r;
                })) : S.filter(n, e, r);
            }
            S.filter = function(e, t, n) {
                var r = t[0];
                return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? S.find.matchesSelector(r, e) ? [ r ] : [] : S.find.matches(e, S.grep(t, (function(e) {
                    return 1 === e.nodeType;
                })));
            }, S.fn.extend({
                find: function(e) {
                    var t, n, r = this.length, i = this;
                    if ("string" != typeof e) return this.pushStack(S(e).filter((function() {
                        for (t = 0; t < r; t++) if (S.contains(i[t], this)) return !0;
                    })));
                    for (n = this.pushStack([]), t = 0; t < r; t++) S.find(e, i[t], n);
                    return 1 < r ? S.uniqueSort(n) : n;
                },
                filter: function(e) {
                    return this.pushStack(j(this, e || [], !1));
                },
                not: function(e) {
                    return this.pushStack(j(this, e || [], !0));
                },
                is: function(e) {
                    return !!j(this, "string" == typeof e && k.test(e) ? S(e) : e || [], !1).length;
                }
            });
            var D, q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
            (S.fn.init = function(e, t, n) {
                var r, i;
                if (!e) return this;
                if (n = n || D, "string" == typeof e) {
                    if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [ null, e, null ] : q.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                    if (r[1]) {
                        if (t = t instanceof S ? t[0] : t, S.merge(this, S.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : E, !0)), 
                        N.test(r[1]) && S.isPlainObject(t)) for (r in t) m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                        return this;
                    }
                    return (i = E.getElementById(r[2])) && (this[0] = i, this.length = 1), this;
                }
                return e.nodeType ? (this[0] = e, this.length = 1, this) : m(e) ? void 0 !== n.ready ? n.ready(e) : e(S) : S.makeArray(e, this);
            }).prototype = S.fn, D = S(E);
            var L = /^(?:parents|prev(?:Until|All))/, H = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
            function O(e, t) {
                while ((e = e[t]) && 1 !== e.nodeType) ;
                return e;
            }
            S.fn.extend({
                has: function(e) {
                    var t = S(e, this), n = t.length;
                    return this.filter((function() {
                        for (var e = 0; e < n; e++) if (S.contains(this, t[e])) return !0;
                    }));
                },
                closest: function(e, t) {
                    var n, r = 0, i = this.length, o = [], a = "string" != typeof e && S(e);
                    if (!k.test(e)) for (;r < i; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && S.find.matchesSelector(n, e))) {
                        o.push(n);
                        break;
                    }
                    return this.pushStack(1 < o.length ? S.uniqueSort(o) : o);
                },
                index: function(e) {
                    return e ? "string" == typeof e ? i.call(S(e), this[0]) : i.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
                },
                add: function(e, t) {
                    return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e, t))));
                },
                addBack: function(e) {
                    return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
                }
            }), S.each({
                parent: function(e) {
                    var t = e.parentNode;
                    return t && 11 !== t.nodeType ? t : null;
                },
                parents: function(e) {
                    return h(e, "parentNode");
                },
                parentsUntil: function(e, t, n) {
                    return h(e, "parentNode", n);
                },
                next: function(e) {
                    return O(e, "nextSibling");
                },
                prev: function(e) {
                    return O(e, "previousSibling");
                },
                nextAll: function(e) {
                    return h(e, "nextSibling");
                },
                prevAll: function(e) {
                    return h(e, "previousSibling");
                },
                nextUntil: function(e, t, n) {
                    return h(e, "nextSibling", n);
                },
                prevUntil: function(e, t, n) {
                    return h(e, "previousSibling", n);
                },
                siblings: function(e) {
                    return T((e.parentNode || {}).firstChild, e);
                },
                children: function(e) {
                    return T(e.firstChild);
                },
                contents: function(e) {
                    return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (A(e, "template") && (e = e.content || e), 
                    S.merge([], e.childNodes));
                }
            }, (function(r, i) {
                S.fn[r] = function(e, t) {
                    var n = S.map(this, i, e);
                    return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = S.filter(t, n)), 
                    1 < this.length && (H[r] || S.uniqueSort(n), L.test(r) && n.reverse()), this.pushStack(n);
                };
            }));
            var P = /[^\x20\t\r\n\f]+/g;
            function R(e) {
                return e;
            }
            function M(e) {
                throw e;
            }
            function I(e, t, n, r) {
                var i;
                try {
                    e && m(i = e.promise) ? i.call(e).done(t).fail(n) : e && m(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [ e ].slice(r));
                } catch (e) {
                    n.apply(void 0, [ e ]);
                }
            }
            S.Callbacks = function(r) {
                var e, n;
                r = "string" == typeof r ? (e = r, n = {}, S.each(e.match(P) || [], (function(e, t) {
                    n[t] = !0;
                })), n) : S.extend({}, r);
                var i, t, o, a, s = [], u = [], l = -1, c = function() {
                    for (a = a || r.once, o = i = !0; u.length; l = -1) {
                        t = u.shift();
                        while (++l < s.length) !1 === s[l].apply(t[0], t[1]) && r.stopOnFalse && (l = s.length, 
                        t = !1);
                    }
                    r.memory || (t = !1), i = !1, a && (s = t ? [] : "");
                }, f = {
                    add: function() {
                        return s && (t && !i && (l = s.length - 1, u.push(t)), function n(e) {
                            S.each(e, (function(e, t) {
                                m(t) ? r.unique && f.has(t) || s.push(t) : t && t.length && "string" !== w(t) && n(t);
                            }));
                        }(arguments), t && !i && c()), this;
                    },
                    remove: function() {
                        return S.each(arguments, (function(e, t) {
                            var n;
                            while (-1 < (n = S.inArray(t, s, n))) s.splice(n, 1), n <= l && l--;
                        })), this;
                    },
                    has: function(e) {
                        return e ? -1 < S.inArray(e, s) : 0 < s.length;
                    },
                    empty: function() {
                        return s && (s = []), this;
                    },
                    disable: function() {
                        return a = u = [], s = t = "", this;
                    },
                    disabled: function() {
                        return !s;
                    },
                    lock: function() {
                        return a = u = [], t || i || (s = t = ""), this;
                    },
                    locked: function() {
                        return !!a;
                    },
                    fireWith: function(e, t) {
                        return a || (t = [ e, (t = t || []).slice ? t.slice() : t ], u.push(t), i || c()), 
                        this;
                    },
                    fire: function() {
                        return f.fireWith(this, arguments), this;
                    },
                    fired: function() {
                        return !!o;
                    }
                };
                return f;
            }, S.extend({
                Deferred: function(e) {
                    var o = [ [ "notify", "progress", S.Callbacks("memory"), S.Callbacks("memory"), 2 ], [ "resolve", "done", S.Callbacks("once memory"), S.Callbacks("once memory"), 0, "resolved" ], [ "reject", "fail", S.Callbacks("once memory"), S.Callbacks("once memory"), 1, "rejected" ] ], i = "pending", a = {
                        state: function() {
                            return i;
                        },
                        always: function() {
                            return s.done(arguments).fail(arguments), this;
                        },
                        catch: function(e) {
                            return a.then(null, e);
                        },
                        pipe: function() {
                            var i = arguments;
                            return S.Deferred((function(r) {
                                S.each(o, (function(e, t) {
                                    var n = m(i[t[4]]) && i[t[4]];
                                    s[t[1]]((function() {
                                        var e = n && n.apply(this, arguments);
                                        e && m(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [ e ] : arguments);
                                    }));
                                })), i = null;
                            })).promise();
                        },
                        then: function(t, n, r) {
                            var u = 0;
                            function l(i, o, a, s) {
                                return function() {
                                    var n = this, r = arguments, e = function() {
                                        var e, t;
                                        if (!(i < u)) {
                                            if ((e = a.apply(n, r)) === o.promise()) throw new TypeError("Thenable self-resolution");
                                            t = e && ("object" == typeof e || "function" == typeof e) && e.then, m(t) ? s ? t.call(e, l(u, o, R, s), l(u, o, M, s)) : (u++, 
                                            t.call(e, l(u, o, R, s), l(u, o, M, s), l(u, o, R, o.notifyWith))) : (a !== R && (n = void 0, 
                                            r = [ e ]), (s || o.resolveWith)(n, r));
                                        }
                                    }, t = s ? e : function() {
                                        try {
                                            e();
                                        } catch (e) {
                                            S.Deferred.exceptionHook && S.Deferred.exceptionHook(e, t.stackTrace), u <= i + 1 && (a !== M && (n = void 0, 
                                            r = [ e ]), o.rejectWith(n, r));
                                        }
                                    };
                                    i ? t() : (S.Deferred.getStackHook && (t.stackTrace = S.Deferred.getStackHook()), 
                                    C.setTimeout(t));
                                };
                            }
                            return S.Deferred((function(e) {
                                o[0][3].add(l(0, e, m(r) ? r : R, e.notifyWith)), o[1][3].add(l(0, e, m(t) ? t : R)), 
                                o[2][3].add(l(0, e, m(n) ? n : M));
                            })).promise();
                        },
                        promise: function(e) {
                            return null != e ? S.extend(e, a) : a;
                        }
                    }, s = {};
                    return S.each(o, (function(e, t) {
                        var n = t[2], r = t[5];
                        a[t[1]] = n.add, r && n.add((function() {
                            i = r;
                        }), o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock), n.add(t[3].fire), 
                        s[t[0]] = function() {
                            return s[t[0] + "With"](this === s ? void 0 : this, arguments), this;
                        }, s[t[0] + "With"] = n.fireWith;
                    })), a.promise(s), e && e.call(s, s), s;
                },
                when: function(e) {
                    var n = arguments.length, t = n, r = Array(t), i = s.call(arguments), o = S.Deferred(), a = function(t) {
                        return function(e) {
                            r[t] = this, i[t] = 1 < arguments.length ? s.call(arguments) : e, --n || o.resolveWith(r, i);
                        };
                    };
                    if (n <= 1 && (I(e, o.done(a(t)).resolve, o.reject, !n), "pending" === o.state() || m(i[t] && i[t].then))) return o.then();
                    while (t--) I(i[t], a(t), o.reject);
                    return o.promise();
                }
            });
            var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
            S.Deferred.exceptionHook = function(e, t) {
                C.console && C.console.warn && e && W.test(e.name) && C.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
            }, S.readyException = function(e) {
                C.setTimeout((function() {
                    throw e;
                }));
            };
            var F = S.Deferred();
            function B() {
                E.removeEventListener("DOMContentLoaded", B), C.removeEventListener("load", B), 
                S.ready();
            }
            S.fn.ready = function(e) {
                return F.then(e)["catch"]((function(e) {
                    S.readyException(e);
                })), this;
            }, S.extend({
                isReady: !1,
                readyWait: 1,
                ready: function(e) {
                    (!0 === e ? --S.readyWait : S.isReady) || (S.isReady = !0) !== e && 0 < --S.readyWait || F.resolveWith(E, [ S ]);
                }
            }), S.ready.then = F.then, "complete" === E.readyState || "loading" !== E.readyState && !E.documentElement.doScroll ? C.setTimeout(S.ready) : (E.addEventListener("DOMContentLoaded", B), 
            C.addEventListener("load", B));
            var $ = function(e, t, n, r, i, o, a) {
                var s = 0, u = e.length, l = null == n;
                if ("object" === w(n)) for (s in i = !0, n) $(e, t, s, n[s], !0, o, a); else if (void 0 !== r && (i = !0, 
                m(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
                    return l.call(S(e), n);
                })), t)) for (;s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
                return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
            }, _ = /^-ms-/, z = /-([a-z])/g;
            function U(e, t) {
                return t.toUpperCase();
            }
            function X(e) {
                return e.replace(_, "ms-").replace(z, U);
            }
            var V = function(e) {
                return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
            };
            function G() {
                this.expando = S.expando + G.uid++;
            }
            G.uid = 1, G.prototype = {
                cache: function(e) {
                    var t = e[this.expando];
                    return t || (t = {}, V(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                        value: t,
                        configurable: !0
                    }))), t;
                },
                set: function(e, t, n) {
                    var r, i = this.cache(e);
                    if ("string" == typeof t) i[X(t)] = n; else for (r in t) i[X(r)] = t[r];
                    return i;
                },
                get: function(e, t) {
                    return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][X(t)];
                },
                access: function(e, t, n) {
                    return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), 
                    void 0 !== n ? n : t);
                },
                remove: function(e, t) {
                    var n, r = e[this.expando];
                    if (void 0 !== r) {
                        if (void 0 !== t) {
                            n = (t = Array.isArray(t) ? t.map(X) : (t = X(t)) in r ? [ t ] : t.match(P) || []).length;
                            while (n--) delete r[t[n]];
                        }
                        (void 0 === t || S.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
                    }
                },
                hasData: function(e) {
                    var t = e[this.expando];
                    return void 0 !== t && !S.isEmptyObject(t);
                }
            };
            var Y = new G, Q = new G, J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, K = /[A-Z]/g;
            function Z(e, t, n) {
                var r, i;
                if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(K, "-$&").toLowerCase(), 
                "string" == typeof (n = e.getAttribute(r))) {
                    try {
                        n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : J.test(i) ? JSON.parse(i) : i);
                    } catch (e) {}
                    Q.set(e, t, n);
                } else n = void 0;
                return n;
            }
            S.extend({
                hasData: function(e) {
                    return Q.hasData(e) || Y.hasData(e);
                },
                data: function(e, t, n) {
                    return Q.access(e, t, n);
                },
                removeData: function(e, t) {
                    Q.remove(e, t);
                },
                _data: function(e, t, n) {
                    return Y.access(e, t, n);
                },
                _removeData: function(e, t) {
                    Y.remove(e, t);
                }
            }), S.fn.extend({
                data: function(n, e) {
                    var t, r, i, o = this[0], a = o && o.attributes;
                    if (void 0 === n) {
                        if (this.length && (i = Q.get(o), 1 === o.nodeType && !Y.get(o, "hasDataAttrs"))) {
                            t = a.length;
                            while (t--) a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = X(r.slice(5)), 
                            Z(o, r, i[r]));
                            Y.set(o, "hasDataAttrs", !0);
                        }
                        return i;
                    }
                    return "object" == typeof n ? this.each((function() {
                        Q.set(this, n);
                    })) : $(this, (function(e) {
                        var t;
                        if (o && void 0 === e) return void 0 !== (t = Q.get(o, n)) ? t : void 0 !== (t = Z(o, n)) ? t : void 0;
                        this.each((function() {
                            Q.set(this, n, e);
                        }));
                    }), null, e, 1 < arguments.length, null, !0);
                },
                removeData: function(e) {
                    return this.each((function() {
                        Q.remove(this, e);
                    }));
                }
            }), S.extend({
                queue: function(e, t, n) {
                    var r;
                    if (e) return t = (t || "fx") + "queue", r = Y.get(e, t), n && (!r || Array.isArray(n) ? r = Y.access(e, t, S.makeArray(n)) : r.push(n)), 
                    r || [];
                },
                dequeue: function(e, t) {
                    t = t || "fx";
                    var n = S.queue(e, t), r = n.length, i = n.shift(), o = S._queueHooks(e, t);
                    "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), 
                    delete o.stop, i.call(e, (function() {
                        S.dequeue(e, t);
                    }), o)), !r && o && o.empty.fire();
                },
                _queueHooks: function(e, t) {
                    var n = t + "queueHooks";
                    return Y.get(e, n) || Y.access(e, n, {
                        empty: S.Callbacks("once memory").add((function() {
                            Y.remove(e, [ t + "queue", n ]);
                        }))
                    });
                }
            }), S.fn.extend({
                queue: function(t, n) {
                    var e = 2;
                    return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? S.queue(this[0], t) : void 0 === n ? this : this.each((function() {
                        var e = S.queue(this, t, n);
                        S._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && S.dequeue(this, t);
                    }));
                },
                dequeue: function(e) {
                    return this.each((function() {
                        S.dequeue(this, e);
                    }));
                },
                clearQueue: function(e) {
                    return this.queue(e || "fx", []);
                },
                promise: function(e, t) {
                    var n, r = 1, i = S.Deferred(), o = this, a = this.length, s = function() {
                        --r || i.resolveWith(o, [ o ]);
                    };
                    "string" != typeof e && (t = e, e = void 0), e = e || "fx";
                    while (a--) (n = Y.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
                    return s(), i.promise(t);
                }
            });
            var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"), ne = [ "Top", "Right", "Bottom", "Left" ], re = E.documentElement, ie = function(e) {
                return S.contains(e.ownerDocument, e);
            }, oe = {
                composed: !0
            };
            re.getRootNode && (ie = function(e) {
                return S.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument;
            });
            var ae = function(e, t) {
                return "none" === (e = t || e).style.display || "" === e.style.display && ie(e) && "none" === S.css(e, "display");
            };
            function se(e, t, n, r) {
                var i, o, a = 20, s = r ? function() {
                    return r.cur();
                } : function() {
                    return S.css(e, t, "");
                }, u = s(), l = n && n[3] || (S.cssNumber[t] ? "" : "px"), c = e.nodeType && (S.cssNumber[t] || "px" !== l && +u) && te.exec(S.css(e, t));
                if (c && c[3] !== l) {
                    u /= 2, l = l || c[3], c = +u || 1;
                    while (a--) S.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), 
                    c /= o;
                    c *= 2, S.style(e, t, c + l), n = n || [];
                }
                return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, 
                r.start = c, r.end = i)), i;
            }
            var ue = {};
            function le(e, t) {
                for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++) (r = e[c]).style && (n = r.style.display, 
                t ? ("none" === n && (l[c] = Y.get(r, "display") || null, l[c] || (r.style.display = "")), 
                "" === r.style.display && ae(r) && (l[c] = (u = a = o = void 0, a = (i = r).ownerDocument, 
                s = i.nodeName, (u = ue[s]) || (o = a.body.appendChild(a.createElement(s)), u = S.css(o, "display"), 
                o.parentNode.removeChild(o), "none" === u && (u = "block"), ue[s] = u)))) : "none" !== n && (l[c] = "none", 
                Y.set(r, "display", n)));
                for (c = 0; c < f; c++) null != l[c] && (e[c].style.display = l[c]);
                return e;
            }
            S.fn.extend({
                show: function() {
                    return le(this, !0);
                },
                hide: function() {
                    return le(this);
                },
                toggle: function(e) {
                    return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function() {
                        ae(this) ? S(this).show() : S(this).hide();
                    }));
                }
            });
            var ce, fe, pe = /^(?:checkbox|radio)$/i, de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, he = /^$|^module$|\/(?:java|ecma)script/i;
            ce = E.createDocumentFragment().appendChild(E.createElement("div")), (fe = E.createElement("input")).setAttribute("type", "radio"), 
            fe.setAttribute("checked", "checked"), fe.setAttribute("name", "t"), ce.appendChild(fe), 
            y.checkClone = ce.cloneNode(!0).cloneNode(!0).lastChild.checked, ce.innerHTML = "<textarea>x</textarea>", 
            y.noCloneChecked = !!ce.cloneNode(!0).lastChild.defaultValue, ce.innerHTML = "<option></option>", 
            y.option = !!ce.lastChild;
            var ge = {
                thead: [ 1, "<table>", "</table>" ],
                col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
                tr: [ 2, "<table><tbody>", "</tbody></table>" ],
                td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
                _default: [ 0, "", "" ]
            };
            function ve(e, t) {
                var n;
                return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], 
                void 0 === t || t && A(e, t) ? S.merge([ e ], n) : n;
            }
            function ye(e, t) {
                for (var n = 0, r = e.length; n < r; n++) Y.set(e[n], "globalEval", !t || Y.get(t[n], "globalEval"));
            }
            ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td, y.option || (ge.optgroup = ge.option = [ 1, "<select multiple='multiple'>", "</select>" ]);
            var me = /<|&#?\w+;/;
            function xe(e, t, n, r, i) {
                for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++) if ((o = e[d]) || 0 === o) if ("object" === w(o)) S.merge(p, o.nodeType ? [ o ] : o); else if (me.test(o)) {
                    a = a || f.appendChild(t.createElement("div")), s = (de.exec(o) || [ "", "" ])[1].toLowerCase(), 
                    u = ge[s] || ge._default, a.innerHTML = u[1] + S.htmlPrefilter(o) + u[2], c = u[0];
                    while (c--) a = a.lastChild;
                    S.merge(p, a.childNodes), (a = f.firstChild).textContent = "";
                } else p.push(t.createTextNode(o));
                f.textContent = "", d = 0;
                while (o = p[d++]) if (r && -1 < S.inArray(o, r)) i && i.push(o); else if (l = ie(o), 
                a = ve(f.appendChild(o), "script"), l && ye(a), n) {
                    c = 0;
                    while (o = a[c++]) he.test(o.type || "") && n.push(o);
                }
                return f;
            }
            var be = /^([^.]*)(?:\.(.+)|)/;
            function we() {
                return !0;
            }
            function Te() {
                return !1;
            }
            function Ce(e, t) {
                return e === function() {
                    try {
                        return E.activeElement;
                    } catch (e) {}
                }() == ("focus" === t);
            }
            function Ee(e, t, n, r, i, o) {
                var a, s;
                if ("object" == typeof t) {
                    for (s in "string" != typeof n && (r = r || n, n = void 0), t) Ee(e, s, n, r, t[s], o);
                    return e;
                }
                if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, 
                r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = Te; else if (!i) return e;
                return 1 === o && (a = i, (i = function(e) {
                    return S().off(e), a.apply(this, arguments);
                }).guid = a.guid || (a.guid = S.guid++)), e.each((function() {
                    S.event.add(this, t, i, r, n);
                }));
            }
            function Se(e, i, o) {
                o ? (Y.set(e, i, !1), S.event.add(e, i, {
                    namespace: !1,
                    handler: function(e) {
                        var t, n, r = Y.get(this, i);
                        if (1 & e.isTrigger && this[i]) {
                            if (r.length) (S.event.special[i] || {}).delegateType && e.stopPropagation(); else if (r = s.call(arguments), 
                            Y.set(this, i, r), t = o(this, i), this[i](), r !== (n = Y.get(this, i)) || t ? Y.set(this, i, !1) : n = {}, 
                            r !== n) return e.stopImmediatePropagation(), e.preventDefault(), n && n.value;
                        } else r.length && (Y.set(this, i, {
                            value: S.event.trigger(S.extend(r[0], S.Event.prototype), r.slice(1), this)
                        }), e.stopImmediatePropagation());
                    }
                })) : void 0 === Y.get(e, i) && S.event.add(e, i, we);
            }
            S.event = {
                global: {},
                add: function(t, e, n, r, i) {
                    var o, a, s, u, l, c, f, p, d, h, g, v = Y.get(t);
                    if (V(t)) {
                        n.handler && (n = (o = n).handler, i = o.selector), i && S.find.matchesSelector(re, i), 
                        n.guid || (n.guid = S.guid++), (u = v.events) || (u = v.events = Object.create(null)), 
                        (a = v.handle) || (a = v.handle = function(e) {
                            return "undefined" != typeof S && S.event.triggered !== e.type ? S.event.dispatch.apply(t, arguments) : void 0;
                        }), l = (e = (e || "").match(P) || [ "" ]).length;
                        while (l--) d = g = (s = be.exec(e[l]) || [])[1], h = (s[2] || "").split(".").sort(), 
                        d && (f = S.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, 
                        f = S.event.special[d] || {}, c = S.extend({
                            type: d,
                            origType: g,
                            data: r,
                            handler: n,
                            guid: n.guid,
                            selector: i,
                            needsContext: i && S.expr.match.needsContext.test(i),
                            namespace: h.join(".")
                        }, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(d, a)), 
                        f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), 
                        S.event.global[d] = !0);
                    }
                },
                remove: function(e, t, n, r, i) {
                    var o, a, s, u, l, c, f, p, d, h, g, v = Y.hasData(e) && Y.get(e);
                    if (v && (u = v.events)) {
                        l = (t = (t || "").match(P) || [ "" ]).length;
                        while (l--) if (d = g = (s = be.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), 
                        d) {
                            f = S.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], 
                            s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length;
                            while (o--) c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), 
                            c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                            a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || S.removeEvent(e, d, v.handle), 
                            delete u[d]);
                        } else for (d in u) S.event.remove(e, d + t[l], n, r, !0);
                        S.isEmptyObject(u) && Y.remove(e, "handle events");
                    }
                },
                dispatch: function(e) {
                    var t, n, r, i, o, a, s = new Array(arguments.length), u = S.event.fix(e), l = (Y.get(this, "events") || Object.create(null))[u.type] || [], c = S.event.special[u.type] || {};
                    for (s[0] = u, t = 1; t < arguments.length; t++) s[t] = arguments[t];
                    if (u.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, u)) {
                        a = S.event.handlers.call(this, u, l), t = 0;
                        while ((i = a[t++]) && !u.isPropagationStopped()) {
                            u.currentTarget = i.elem, n = 0;
                            while ((o = i.handlers[n++]) && !u.isImmediatePropagationStopped()) u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o, 
                            u.data = o.data, void 0 !== (r = ((S.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(), 
                            u.stopPropagation()));
                        }
                        return c.postDispatch && c.postDispatch.call(this, u), u.result;
                    }
                },
                handlers: function(e, t) {
                    var n, r, i, o, a, s = [], u = t.delegateCount, l = e.target;
                    if (u && l.nodeType && !("click" === e.type && 1 <= e.button)) for (;l !== this; l = l.parentNode || this) if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                        for (o = [], a = {}, n = 0; n < u; n++) void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < S(i, this).index(l) : S.find(i, this, null, [ l ]).length), 
                        a[i] && o.push(r);
                        o.length && s.push({
                            elem: l,
                            handlers: o
                        });
                    }
                    return l = this, u < t.length && s.push({
                        elem: l,
                        handlers: t.slice(u)
                    }), s;
                },
                addProp: function(t, e) {
                    Object.defineProperty(S.Event.prototype, t, {
                        enumerable: !0,
                        configurable: !0,
                        get: m(e) ? function() {
                            if (this.originalEvent) return e(this.originalEvent);
                        } : function() {
                            if (this.originalEvent) return this.originalEvent[t];
                        },
                        set: function(e) {
                            Object.defineProperty(this, t, {
                                enumerable: !0,
                                configurable: !0,
                                writable: !0,
                                value: e
                            });
                        }
                    });
                },
                fix: function(e) {
                    return e[S.expando] ? e : new S.Event(e);
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    click: {
                        setup: function(e) {
                            var t = this || e;
                            return pe.test(t.type) && t.click && A(t, "input") && Se(t, "click", we), !1;
                        },
                        trigger: function(e) {
                            var t = this || e;
                            return pe.test(t.type) && t.click && A(t, "input") && Se(t, "click"), !0;
                        },
                        _default: function(e) {
                            var t = e.target;
                            return pe.test(t.type) && t.click && A(t, "input") && Y.get(t, "click") || A(t, "a");
                        }
                    },
                    beforeunload: {
                        postDispatch: function(e) {
                            void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                        }
                    }
                }
            }, S.removeEvent = function(e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n);
            }, S.Event = function(e, t) {
                if (!(this instanceof S.Event)) return new S.Event(e, t);
                e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? we : Te, 
                this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, 
                this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, 
                t && S.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[S.expando] = !0;
            }, S.Event.prototype = {
                constructor: S.Event,
                isDefaultPrevented: Te,
                isPropagationStopped: Te,
                isImmediatePropagationStopped: Te,
                isSimulated: !1,
                preventDefault: function() {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = we, e && !this.isSimulated && e.preventDefault();
                },
                stopPropagation: function() {
                    var e = this.originalEvent;
                    this.isPropagationStopped = we, e && !this.isSimulated && e.stopPropagation();
                },
                stopImmediatePropagation: function() {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = we, e && !this.isSimulated && e.stopImmediatePropagation(), 
                    this.stopPropagation();
                }
            }, S.each({
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: !0
            }, S.event.addProp), S.each({
                focus: "focusin",
                blur: "focusout"
            }, (function(e, t) {
                S.event.special[e] = {
                    setup: function() {
                        return Se(this, e, Ce), !1;
                    },
                    trigger: function() {
                        return Se(this, e), !0;
                    },
                    _default: function() {
                        return !0;
                    },
                    delegateType: t
                };
            })), S.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, (function(e, i) {
                S.event.special[e] = {
                    delegateType: i,
                    bindType: i,
                    handle: function(e) {
                        var t, n = e.relatedTarget, r = e.handleObj;
                        return n && (n === this || S.contains(this, n)) || (e.type = r.origType, t = r.handler.apply(this, arguments), 
                        e.type = i), t;
                    }
                };
            })), S.fn.extend({
                on: function(e, t, n, r) {
                    return Ee(this, e, t, n, r);
                },
                one: function(e, t, n, r) {
                    return Ee(this, e, t, n, r, 1);
                },
                off: function(e, t, n) {
                    var r, i;
                    if (e && e.preventDefault && e.handleObj) return r = e.handleObj, S(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), 
                    this;
                    if ("object" == typeof e) {
                        for (i in e) this.off(i, t, e[i]);
                        return this;
                    }
                    return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Te), 
                    this.each((function() {
                        S.event.remove(this, e, n, t);
                    }));
                }
            });
            var ke = /<script|<style|<link/i, Ae = /checked\s*(?:[^=]|=\s*.checked.)/i, Ne = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
            function je(e, t) {
                return A(e, "table") && A(11 !== t.nodeType ? t : t.firstChild, "tr") && S(e).children("tbody")[0] || e;
            }
            function De(e) {
                return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
            }
            function qe(e) {
                return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), 
                e;
            }
            function Le(e, t) {
                var n, r, i, o, a, s;
                if (1 === t.nodeType) {
                    if (Y.hasData(e) && (s = Y.get(e).events)) for (i in Y.remove(t, "handle events"), 
                    s) for (n = 0, r = s[i].length; n < r; n++) S.event.add(t, i, s[i][n]);
                    Q.hasData(e) && (o = Q.access(e), a = S.extend({}, o), Q.set(t, a));
                }
            }
            function He(n, r, i, o) {
                r = g(r);
                var e, t, a, s, u, l, c = 0, f = n.length, p = f - 1, d = r[0], h = m(d);
                if (h || 1 < f && "string" == typeof d && !y.checkClone && Ae.test(d)) return n.each((function(e) {
                    var t = n.eq(e);
                    h && (r[0] = d.call(this, e, t.html())), He(t, r, i, o);
                }));
                if (f && (t = (e = xe(r, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), 
                t || o)) {
                    for (s = (a = S.map(ve(e, "script"), De)).length; c < f; c++) u = e, c !== p && (u = S.clone(u, !0, !0), 
                    s && S.merge(a, ve(u, "script"))), i.call(n[c], u, c);
                    if (s) for (l = a[a.length - 1].ownerDocument, S.map(a, qe), c = 0; c < s; c++) u = a[c], 
                    he.test(u.type || "") && !Y.access(u, "globalEval") && S.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? S._evalUrl && !u.noModule && S._evalUrl(u.src, {
                        nonce: u.nonce || u.getAttribute("nonce")
                    }, l) : b(u.textContent.replace(Ne, ""), u, l));
                }
                return n;
            }
            function Oe(e, t, n) {
                for (var r, i = t ? S.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || S.cleanData(ve(r)), 
                r.parentNode && (n && ie(r) && ye(ve(r, "script")), r.parentNode.removeChild(r));
                return e;
            }
            S.extend({
                htmlPrefilter: function(e) {
                    return e;
                },
                clone: function(e, t, n) {
                    var r, i, o, a, s, u, l, c = e.cloneNode(!0), f = ie(e);
                    if (!(y.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || S.isXMLDoc(e))) for (a = ve(c), 
                    r = 0, i = (o = ve(e)).length; r < i; r++) s = o[r], u = a[r], void 0, "input" === (l = u.nodeName.toLowerCase()) && pe.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
                    if (t) if (n) for (o = o || ve(e), a = a || ve(c), r = 0, i = o.length; r < i; r++) Le(o[r], a[r]); else Le(e, c);
                    return 0 < (a = ve(c, "script")).length && ye(a, !f && ve(e, "script")), c;
                },
                cleanData: function(e) {
                    for (var t, n, r, i = S.event.special, o = 0; void 0 !== (n = e[o]); o++) if (V(n)) {
                        if (t = n[Y.expando]) {
                            if (t.events) for (r in t.events) i[r] ? S.event.remove(n, r) : S.removeEvent(n, r, t.handle);
                            n[Y.expando] = void 0;
                        }
                        n[Q.expando] && (n[Q.expando] = void 0);
                    }
                }
            }), S.fn.extend({
                detach: function(e) {
                    return Oe(this, e, !0);
                },
                remove: function(e) {
                    return Oe(this, e);
                },
                text: function(e) {
                    return $(this, (function(e) {
                        return void 0 === e ? S.text(this) : this.empty().each((function() {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
                        }));
                    }), null, e, arguments.length);
                },
                append: function() {
                    return He(this, arguments, (function(e) {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || je(this, e).appendChild(e);
                    }));
                },
                prepend: function() {
                    return He(this, arguments, (function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = je(this, e);
                            t.insertBefore(e, t.firstChild);
                        }
                    }));
                },
                before: function() {
                    return He(this, arguments, (function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this);
                    }));
                },
                after: function() {
                    return He(this, arguments, (function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
                    }));
                },
                empty: function() {
                    for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (S.cleanData(ve(e, !1)), 
                    e.textContent = "");
                    return this;
                },
                clone: function(e, t) {
                    return e = null != e && e, t = null == t ? e : t, this.map((function() {
                        return S.clone(this, e, t);
                    }));
                },
                html: function(e) {
                    return $(this, (function(e) {
                        var t = this[0] || {}, n = 0, r = this.length;
                        if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                        if ("string" == typeof e && !ke.test(e) && !ge[(de.exec(e) || [ "", "" ])[1].toLowerCase()]) {
                            e = S.htmlPrefilter(e);
                            try {
                                for (;n < r; n++) 1 === (t = this[n] || {}).nodeType && (S.cleanData(ve(t, !1)), 
                                t.innerHTML = e);
                                t = 0;
                            } catch (e) {}
                        }
                        t && this.empty().append(e);
                    }), null, e, arguments.length);
                },
                replaceWith: function() {
                    var n = [];
                    return He(this, arguments, (function(e) {
                        var t = this.parentNode;
                        S.inArray(this, n) < 0 && (S.cleanData(ve(this)), t && t.replaceChild(e, this));
                    }), n);
                }
            }), S.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, (function(e, a) {
                S.fn[e] = function(e) {
                    for (var t, n = [], r = S(e), i = r.length - 1, o = 0; o <= i; o++) t = o === i ? this : this.clone(!0), 
                    S(r[o])[a](t), u.apply(n, t.get());
                    return this.pushStack(n);
                };
            }));
            var Pe = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"), Re = function(e) {
                var t = e.ownerDocument.defaultView;
                return t && t.opener || (t = C), t.getComputedStyle(e);
            }, Me = function(e, t, n) {
                var r, i, o = {};
                for (i in t) o[i] = e.style[i], e.style[i] = t[i];
                for (i in r = n.call(e), t) e.style[i] = o[i];
                return r;
            }, Ie = new RegExp(ne.join("|"), "i");
            function We(e, t, n) {
                var r, i, o, a, s = e.style;
                return (n = n || Re(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || ie(e) || (a = S.style(e, t)), 
                !y.pixelBoxStyles() && Pe.test(a) && Ie.test(t) && (r = s.width, i = s.minWidth, 
                o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, 
                s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a;
            }
            function Fe(e, t) {
                return {
                    get: function() {
                        if (!e()) return (this.get = t).apply(this, arguments);
                        delete this.get;
                    }
                };
            }
            !function() {
                function e() {
                    if (l) {
                        u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", 
                        l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", 
                        re.appendChild(u).appendChild(l);
                        var e = C.getComputedStyle(l);
                        n = "1%" !== e.top, s = 12 === t(e.marginLeft), l.style.right = "60%", o = 36 === t(e.right), 
                        r = 36 === t(e.width), l.style.position = "absolute", i = 12 === t(l.offsetWidth / 3), 
                        re.removeChild(u), l = null;
                    }
                }
                function t(e) {
                    return Math.round(parseFloat(e));
                }
                var n, r, i, o, a, s, u = E.createElement("div"), l = E.createElement("div");
                l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", 
                y.clearCloneStyle = "content-box" === l.style.backgroundClip, S.extend(y, {
                    boxSizingReliable: function() {
                        return e(), r;
                    },
                    pixelBoxStyles: function() {
                        return e(), o;
                    },
                    pixelPosition: function() {
                        return e(), n;
                    },
                    reliableMarginLeft: function() {
                        return e(), s;
                    },
                    scrollboxSize: function() {
                        return e(), i;
                    },
                    reliableTrDimensions: function() {
                        var e, t, n, r;
                        return null == a && (e = E.createElement("table"), t = E.createElement("tr"), n = E.createElement("div"), 
                        e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t.style.cssText = "border:1px solid", 
                        t.style.height = "1px", n.style.height = "9px", n.style.display = "block", re.appendChild(e).appendChild(t).appendChild(n), 
                        r = C.getComputedStyle(t), a = parseInt(r.height, 10) + parseInt(r.borderTopWidth, 10) + parseInt(r.borderBottomWidth, 10) === t.offsetHeight, 
                        re.removeChild(e)), a;
                    }
                }));
            }();
            var Be = [ "Webkit", "Moz", "ms" ], $e = E.createElement("div").style, _e = {};
            function ze(e) {
                var t = S.cssProps[e] || _e[e];
                return t || (e in $e ? e : _e[e] = function(e) {
                    var t = e[0].toUpperCase() + e.slice(1), n = Be.length;
                    while (n--) if ((e = Be[n] + t) in $e) return e;
                }(e) || e);
            }
            var Ue = /^(none|table(?!-c[ea]).+)/, Xe = /^--/, Ve = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            }, Ge = {
                letterSpacing: "0",
                fontWeight: "400"
            };
            function Ye(e, t, n) {
                var r = te.exec(t);
                return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
            }
            function Qe(e, t, n, r, i, o) {
                var a = "width" === t ? 1 : 0, s = 0, u = 0;
                if (n === (r ? "border" : "content")) return 0;
                for (;a < 4; a += 2) "margin" === n && (u += S.css(e, n + ne[a], !0, i)), r ? ("content" === n && (u -= S.css(e, "padding" + ne[a], !0, i)), 
                "margin" !== n && (u -= S.css(e, "border" + ne[a] + "Width", !0, i))) : (u += S.css(e, "padding" + ne[a], !0, i), 
                "padding" !== n ? u += S.css(e, "border" + ne[a] + "Width", !0, i) : s += S.css(e, "border" + ne[a] + "Width", !0, i));
                return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0), 
                u;
            }
            function Je(e, t, n) {
                var r = Re(e), i = (!y.boxSizingReliable() || n) && "border-box" === S.css(e, "boxSizing", !1, r), o = i, a = We(e, t, r), s = "offset" + t[0].toUpperCase() + t.slice(1);
                if (Pe.test(a)) {
                    if (!n) return a;
                    a = "auto";
                }
                return (!y.boxSizingReliable() && i || !y.reliableTrDimensions() && A(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === S.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === S.css(e, "boxSizing", !1, r), 
                (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + Qe(e, t, n || (i ? "border" : "content"), o, r, a) + "px";
            }
            function Ke(e, t, n, r, i) {
                return new Ke.prototype.init(e, t, n, r, i);
            }
            S.extend({
                cssHooks: {
                    opacity: {
                        get: function(e, t) {
                            if (t) {
                                var n = We(e, "opacity");
                                return "" === n ? "1" : n;
                            }
                        }
                    }
                },
                cssNumber: {
                    animationIterationCount: !0,
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    gridArea: !0,
                    gridColumn: !0,
                    gridColumnEnd: !0,
                    gridColumnStart: !0,
                    gridRow: !0,
                    gridRowEnd: !0,
                    gridRowStart: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {},
                style: function(e, t, n, r) {
                    if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                        var i, o, a, s = X(t), u = Xe.test(t), l = e.style;
                        if (u || (t = ze(s)), a = S.cssHooks[t] || S.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                        "string" === (o = typeof n) && (i = te.exec(n)) && i[1] && (n = se(e, t, i), o = "number"), 
                        null != n && n == n && ("number" !== o || u || (n += i && i[3] || (S.cssNumber[s] ? "" : "px")), 
                        y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), 
                        a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n));
                    }
                },
                css: function(e, t, n, r) {
                    var i, o, a, s = X(t);
                    return Xe.test(t) || (t = ze(s)), (a = S.cssHooks[t] || S.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), 
                    void 0 === i && (i = We(e, t, r)), "normal" === i && t in Ge && (i = Ge[t]), "" === n || n ? (o = parseFloat(i), 
                    !0 === n || isFinite(o) ? o || 0 : i) : i;
                }
            }), S.each([ "height", "width" ], (function(e, u) {
                S.cssHooks[u] = {
                    get: function(e, t, n) {
                        if (t) return !Ue.test(S.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Je(e, u, n) : Me(e, Ve, (function() {
                            return Je(e, u, n);
                        }));
                    },
                    set: function(e, t, n) {
                        var r, i = Re(e), o = !y.scrollboxSize() && "absolute" === i.position, a = (o || n) && "border-box" === S.css(e, "boxSizing", !1, i), s = n ? Qe(e, u, n, a, i) : 0;
                        return a && o && (s -= Math.ceil(e["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(i[u]) - Qe(e, u, "border", !1, i) - .5)), 
                        s && (r = te.exec(t)) && "px" !== (r[3] || "px") && (e.style[u] = t, t = S.css(e, u)), 
                        Ye(0, t, s);
                    }
                };
            })), S.cssHooks.marginLeft = Fe(y.reliableMarginLeft, (function(e, t) {
                if (t) return (parseFloat(We(e, "marginLeft")) || e.getBoundingClientRect().left - Me(e, {
                    marginLeft: 0
                }, (function() {
                    return e.getBoundingClientRect().left;
                }))) + "px";
            })), S.each({
                margin: "",
                padding: "",
                border: "Width"
            }, (function(i, o) {
                S.cssHooks[i + o] = {
                    expand: function(e) {
                        for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [ e ]; t < 4; t++) n[i + ne[t] + o] = r[t] || r[t - 2] || r[0];
                        return n;
                    }
                }, "margin" !== i && (S.cssHooks[i + o].set = Ye);
            })), S.fn.extend({
                css: function(e, t) {
                    return $(this, (function(e, t, n) {
                        var r, i, o = {}, a = 0;
                        if (Array.isArray(t)) {
                            for (r = Re(e), i = t.length; a < i; a++) o[t[a]] = S.css(e, t[a], !1, r);
                            return o;
                        }
                        return void 0 !== n ? S.style(e, t, n) : S.css(e, t);
                    }), e, t, 1 < arguments.length);
                }
            }), ((S.Tween = Ke).prototype = {
                constructor: Ke,
                init: function(e, t, n, r, i, o) {
                    this.elem = e, this.prop = n, this.easing = i || S.easing._default, this.options = t, 
                    this.start = this.now = this.cur(), this.end = r, this.unit = o || (S.cssNumber[n] ? "" : "px");
                },
                cur: function() {
                    var e = Ke.propHooks[this.prop];
                    return e && e.get ? e.get(this) : Ke.propHooks._default.get(this);
                },
                run: function(e) {
                    var t, n = Ke.propHooks[this.prop];
                    return this.options.duration ? this.pos = t = S.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, 
                    this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
                    n && n.set ? n.set(this) : Ke.propHooks._default.set(this), this;
                }
            }).init.prototype = Ke.prototype, (Ke.propHooks = {
                _default: {
                    get: function(e) {
                        var t;
                        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = S.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
                    },
                    set: function(e) {
                        S.fx.step[e.prop] ? S.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !S.cssHooks[e.prop] && null == e.elem.style[ze(e.prop)] ? e.elem[e.prop] = e.now : S.style(e.elem, e.prop, e.now + e.unit);
                    }
                }
            }).scrollTop = Ke.propHooks.scrollLeft = {
                set: function(e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
                }
            }, S.easing = {
                linear: function(e) {
                    return e;
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2;
                },
                _default: "swing"
            }, S.fx = Ke.prototype.init, S.fx.step = {};
            var Ze, et, tt, nt, rt = /^(?:toggle|show|hide)$/, it = /queueHooks$/;
            function ot() {
                et && (!1 === E.hidden && C.requestAnimationFrame ? C.requestAnimationFrame(ot) : C.setTimeout(ot, S.fx.interval), 
                S.fx.tick());
            }
            function at() {
                return C.setTimeout((function() {
                    Ze = void 0;
                })), Ze = Date.now();
            }
            function st(e, t) {
                var n, r = 0, i = {
                    height: e
                };
                for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = ne[r])] = i["padding" + n] = e;
                return t && (i.opacity = i.width = e), i;
            }
            function ut(e, t, n) {
                for (var r, i = (lt.tweeners[t] || []).concat(lt.tweeners["*"]), o = 0, a = i.length; o < a; o++) if (r = i[o].call(n, t, e)) return r;
            }
            function lt(o, e, t) {
                var n, a, r = 0, i = lt.prefilters.length, s = S.Deferred().always((function() {
                    delete u.elem;
                })), u = function() {
                    if (a) return !1;
                    for (var e = Ze || at(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++) l.tweens[r].run(n);
                    return s.notifyWith(o, [ l, n, t ]), n < 1 && i ? t : (i || s.notifyWith(o, [ l, 1, 0 ]), 
                    s.resolveWith(o, [ l ]), !1);
                }, l = s.promise({
                    elem: o,
                    props: S.extend({}, e),
                    opts: S.extend(!0, {
                        specialEasing: {},
                        easing: S.easing._default
                    }, t),
                    originalProperties: e,
                    originalOptions: t,
                    startTime: Ze || at(),
                    duration: t.duration,
                    tweens: [],
                    createTween: function(e, t) {
                        var n = S.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
                        return l.tweens.push(n), n;
                    },
                    stop: function(e) {
                        var t = 0, n = e ? l.tweens.length : 0;
                        if (a) return this;
                        for (a = !0; t < n; t++) l.tweens[t].run(1);
                        return e ? (s.notifyWith(o, [ l, 1, 0 ]), s.resolveWith(o, [ l, e ])) : s.rejectWith(o, [ l, e ]), 
                        this;
                    }
                }), c = l.props;
                for (!function(e, t) {
                    var n, r, i, o, a;
                    for (n in e) if (i = t[r = X(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), 
                    n !== r && (e[r] = o, delete e[n]), (a = S.cssHooks[r]) && "expand" in a) for (n in o = a.expand(o), 
                    delete e[r], o) n in e || (e[n] = o[n], t[n] = i); else t[r] = i;
                }(c, l.opts.specialEasing); r < i; r++) if (n = lt.prefilters[r].call(l, o, c, l.opts)) return m(n.stop) && (S._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)), 
                n;
                return S.map(c, ut, l), m(l.opts.start) && l.opts.start.call(o, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), 
                S.fx.timer(S.extend(u, {
                    elem: o,
                    anim: l,
                    queue: l.opts.queue
                })), l;
            }
            S.Animation = S.extend(lt, {
                tweeners: {
                    "*": [ function(e, t) {
                        var n = this.createTween(e, t);
                        return se(n.elem, e, te.exec(t), n), n;
                    } ]
                },
                tweener: function(e, t) {
                    m(e) ? (t = e, e = [ "*" ]) : e = e.match(P);
                    for (var n, r = 0, i = e.length; r < i; r++) n = e[r], lt.tweeners[n] = lt.tweeners[n] || [], 
                    lt.tweeners[n].unshift(t);
                },
                prefilters: [ function(e, t, n) {
                    var r, i, o, a, s, u, l, c, f = "width" in t || "height" in t, p = this, d = {}, h = e.style, g = e.nodeType && ae(e), v = Y.get(e, "fxshow");
                    for (r in n.queue || (null == (a = S._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, 
                    s = a.empty.fire, a.empty.fire = function() {
                        a.unqueued || s();
                    }), a.unqueued++, p.always((function() {
                        p.always((function() {
                            a.unqueued--, S.queue(e, "fx").length || a.empty.fire();
                        }));
                    }))), t) if (i = t[r], rt.test(i)) {
                        if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
                            if ("show" !== i || !v || void 0 === v[r]) continue;
                            g = !0;
                        }
                        d[r] = v && v[r] || S.style(e, r);
                    }
                    if ((u = !S.isEmptyObject(t)) || !S.isEmptyObject(d)) for (r in f && 1 === e.nodeType && (n.overflow = [ h.overflow, h.overflowX, h.overflowY ], 
                    null == (l = v && v.display) && (l = Y.get(e, "display")), "none" === (c = S.css(e, "display")) && (l ? c = l : (le([ e ], !0), 
                    l = e.style.display || l, c = S.css(e, "display"), le([ e ]))), ("inline" === c || "inline-block" === c && null != l) && "none" === S.css(e, "float") && (u || (p.done((function() {
                        h.display = l;
                    })), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), 
                    n.overflow && (h.overflow = "hidden", p.always((function() {
                        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
                    }))), u = !1, d) u || (v ? "hidden" in v && (g = v.hidden) : v = Y.access(e, "fxshow", {
                        display: l
                    }), o && (v.hidden = !g), g && le([ e ], !0), p.done((function() {
                        for (r in g || le([ e ]), Y.remove(e, "fxshow"), d) S.style(e, r, d[r]);
                    }))), u = ut(g ? v[r] : 0, r, p), r in v || (v[r] = u.start, g && (u.end = u.start, 
                    u.start = 0));
                } ],
                prefilter: function(e, t) {
                    t ? lt.prefilters.unshift(e) : lt.prefilters.push(e);
                }
            }), S.speed = function(e, t, n) {
                var r = e && "object" == typeof e ? S.extend({}, e) : {
                    complete: n || !n && t || m(e) && e,
                    duration: e,
                    easing: n && t || t && !m(t) && t
                };
                return S.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in S.fx.speeds ? r.duration = S.fx.speeds[r.duration] : r.duration = S.fx.speeds._default), 
                null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                    m(r.old) && r.old.call(this), r.queue && S.dequeue(this, r.queue);
                }, r;
            }, S.fn.extend({
                fadeTo: function(e, t, n, r) {
                    return this.filter(ae).css("opacity", 0).show().end().animate({
                        opacity: t
                    }, e, n, r);
                },
                animate: function(t, e, n, r) {
                    var i = S.isEmptyObject(t), o = S.speed(e, n, r), a = function() {
                        var e = lt(this, S.extend({}, t), o);
                        (i || Y.get(this, "finish")) && e.stop(!0);
                    };
                    return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a);
                },
                stop: function(i, e, o) {
                    var a = function(e) {
                        var t = e.stop;
                        delete e.stop, t(o);
                    };
                    return "string" != typeof i && (o = e, e = i, i = void 0), e && this.queue(i || "fx", []), 
                    this.each((function() {
                        var e = !0, t = null != i && i + "queueHooks", n = S.timers, r = Y.get(this);
                        if (t) r[t] && r[t].stop && a(r[t]); else for (t in r) r[t] && r[t].stop && it.test(t) && a(r[t]);
                        for (t = n.length; t--; ) n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o), 
                        e = !1, n.splice(t, 1));
                        !e && o || S.dequeue(this, i);
                    }));
                },
                finish: function(a) {
                    return !1 !== a && (a = a || "fx"), this.each((function() {
                        var e, t = Y.get(this), n = t[a + "queue"], r = t[a + "queueHooks"], i = S.timers, o = n ? n.length : 0;
                        for (t.finish = !0, S.queue(this, a, []), r && r.stop && r.stop.call(this, !0), 
                        e = i.length; e--; ) i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0), 
                        i.splice(e, 1));
                        for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this);
                        delete t.finish;
                    }));
                }
            }), S.each([ "toggle", "show", "hide" ], (function(e, r) {
                var i = S.fn[r];
                S.fn[r] = function(e, t, n) {
                    return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(st(r, !0), e, t, n);
                };
            })), S.each({
                slideDown: st("show"),
                slideUp: st("hide"),
                slideToggle: st("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, (function(e, r) {
                S.fn[e] = function(e, t, n) {
                    return this.animate(r, e, t, n);
                };
            })), S.timers = [], S.fx.tick = function() {
                var e, t = 0, n = S.timers;
                for (Ze = Date.now(); t < n.length; t++) (e = n[t])() || n[t] !== e || n.splice(t--, 1);
                n.length || S.fx.stop(), Ze = void 0;
            }, S.fx.timer = function(e) {
                S.timers.push(e), S.fx.start();
            }, S.fx.interval = 13, S.fx.start = function() {
                et || (et = !0, ot());
            }, S.fx.stop = function() {
                et = null;
            }, S.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, S.fn.delay = function(r, e) {
                return r = S.fx && S.fx.speeds[r] || r, e = e || "fx", this.queue(e, (function(e, t) {
                    var n = C.setTimeout(e, r);
                    t.stop = function() {
                        C.clearTimeout(n);
                    };
                }));
            }, tt = E.createElement("input"), nt = E.createElement("select").appendChild(E.createElement("option")), 
            tt.type = "checkbox", y.checkOn = "" !== tt.value, y.optSelected = nt.selected, 
            (tt = E.createElement("input")).value = "t", tt.type = "radio", y.radioValue = "t" === tt.value;
            var ct, ft = S.expr.attrHandle;
            S.fn.extend({
                attr: function(e, t) {
                    return $(this, S.attr, e, t, 1 < arguments.length);
                },
                removeAttr: function(e) {
                    return this.each((function() {
                        S.removeAttr(this, e);
                    }));
                }
            }), S.extend({
                attr: function(e, t, n) {
                    var r, i, o = e.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? S.prop(e, t, n) : (1 === o && S.isXMLDoc(e) || (i = S.attrHooks[t.toLowerCase()] || (S.expr.match.bool.test(t) ? ct : void 0)), 
                    void 0 !== n ? null === n ? void S.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), 
                    n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = S.find.attr(e, t)) ? void 0 : r);
                },
                attrHooks: {
                    type: {
                        set: function(e, t) {
                            if (!y.radioValue && "radio" === t && A(e, "input")) {
                                var n = e.value;
                                return e.setAttribute("type", t), n && (e.value = n), t;
                            }
                        }
                    }
                },
                removeAttr: function(e, t) {
                    var n, r = 0, i = t && t.match(P);
                    if (i && 1 === e.nodeType) while (n = i[r++]) e.removeAttribute(n);
                }
            }), ct = {
                set: function(e, t, n) {
                    return !1 === t ? S.removeAttr(e, n) : e.setAttribute(n, n), n;
                }
            }, S.each(S.expr.match.bool.source.match(/\w+/g), (function(e, t) {
                var a = ft[t] || S.find.attr;
                ft[t] = function(e, t, n) {
                    var r, i, o = t.toLowerCase();
                    return n || (i = ft[o], ft[o] = r, r = null != a(e, t, n) ? o : null, ft[o] = i), 
                    r;
                };
            }));
            var pt = /^(?:input|select|textarea|button)$/i, dt = /^(?:a|area)$/i;
            function ht(e) {
                return (e.match(P) || []).join(" ");
            }
            function gt(e) {
                return e.getAttribute && e.getAttribute("class") || "";
            }
            function vt(e) {
                return Array.isArray(e) ? e : "string" == typeof e && e.match(P) || [];
            }
            S.fn.extend({
                prop: function(e, t) {
                    return $(this, S.prop, e, t, 1 < arguments.length);
                },
                removeProp: function(e) {
                    return this.each((function() {
                        delete this[S.propFix[e] || e];
                    }));
                }
            }), S.extend({
                prop: function(e, t, n) {
                    var r, i, o = e.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o) return 1 === o && S.isXMLDoc(e) || (t = S.propFix[t] || t, 
                    i = S.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t];
                },
                propHooks: {
                    tabIndex: {
                        get: function(e) {
                            var t = S.find.attr(e, "tabindex");
                            return t ? parseInt(t, 10) : pt.test(e.nodeName) || dt.test(e.nodeName) && e.href ? 0 : -1;
                        }
                    }
                },
                propFix: {
                    for: "htmlFor",
                    class: "className"
                }
            }), y.optSelected || (S.propHooks.selected = {
                get: function(e) {
                    var t = e.parentNode;
                    return t && t.parentNode && t.parentNode.selectedIndex, null;
                },
                set: function(e) {
                    var t = e.parentNode;
                    t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
                }
            }), S.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], (function() {
                S.propFix[this.toLowerCase()] = this;
            })), S.fn.extend({
                addClass: function(t) {
                    var e, n, r, i, o, a, s, u = 0;
                    if (m(t)) return this.each((function(e) {
                        S(this).addClass(t.call(this, e, gt(this)));
                    }));
                    if ((e = vt(t)).length) while (n = this[u++]) if (i = gt(n), r = 1 === n.nodeType && " " + ht(i) + " ") {
                        a = 0;
                        while (o = e[a++]) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        i !== (s = ht(r)) && n.setAttribute("class", s);
                    }
                    return this;
                },
                removeClass: function(t) {
                    var e, n, r, i, o, a, s, u = 0;
                    if (m(t)) return this.each((function(e) {
                        S(this).removeClass(t.call(this, e, gt(this)));
                    }));
                    if (!arguments.length) return this.attr("class", "");
                    if ((e = vt(t)).length) while (n = this[u++]) if (i = gt(n), r = 1 === n.nodeType && " " + ht(i) + " ") {
                        a = 0;
                        while (o = e[a++]) while (-1 < r.indexOf(" " + o + " ")) r = r.replace(" " + o + " ", " ");
                        i !== (s = ht(r)) && n.setAttribute("class", s);
                    }
                    return this;
                },
                toggleClass: function(i, t) {
                    var o = typeof i, a = "string" === o || Array.isArray(i);
                    return "boolean" == typeof t && a ? t ? this.addClass(i) : this.removeClass(i) : m(i) ? this.each((function(e) {
                        S(this).toggleClass(i.call(this, e, gt(this), t), t);
                    })) : this.each((function() {
                        var e, t, n, r;
                        if (a) {
                            t = 0, n = S(this), r = vt(i);
                            while (e = r[t++]) n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                        } else void 0 !== i && "boolean" !== o || ((e = gt(this)) && Y.set(this, "__className__", e), 
                        this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : Y.get(this, "__className__") || ""));
                    }));
                },
                hasClass: function(e) {
                    var t, n, r = 0;
                    t = " " + e + " ";
                    while (n = this[r++]) if (1 === n.nodeType && -1 < (" " + ht(gt(n)) + " ").indexOf(t)) return !0;
                    return !1;
                }
            });
            var yt = /\r/g;
            S.fn.extend({
                val: function(n) {
                    var r, e, i, t = this[0];
                    return arguments.length ? (i = m(n), this.each((function(e) {
                        var t;
                        1 === this.nodeType && (null == (t = i ? n.call(this, e, S(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = S.map(t, (function(e) {
                            return null == e ? "" : e + "";
                        }))), (r = S.valHooks[this.type] || S.valHooks[this.nodeName.toLowerCase()]) && "set" in r && void 0 !== r.set(this, t, "value") || (this.value = t));
                    }))) : t ? (r = S.valHooks[t.type] || S.valHooks[t.nodeName.toLowerCase()]) && "get" in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(yt, "") : null == e ? "" : e : void 0;
                }
            }), S.extend({
                valHooks: {
                    option: {
                        get: function(e) {
                            var t = S.find.attr(e, "value");
                            return null != t ? t : ht(S.text(e));
                        }
                    },
                    select: {
                        get: function(e) {
                            var t, n, r, i = e.options, o = e.selectedIndex, a = "select-one" === e.type, s = a ? null : [], u = a ? o + 1 : i.length;
                            for (r = o < 0 ? u : a ? o : 0; r < u; r++) if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))) {
                                if (t = S(n).val(), a) return t;
                                s.push(t);
                            }
                            return s;
                        },
                        set: function(e, t) {
                            var n, r, i = e.options, o = S.makeArray(t), a = i.length;
                            while (a--) ((r = i[a]).selected = -1 < S.inArray(S.valHooks.option.get(r), o)) && (n = !0);
                            return n || (e.selectedIndex = -1), o;
                        }
                    }
                }
            }), S.each([ "radio", "checkbox" ], (function() {
                S.valHooks[this] = {
                    set: function(e, t) {
                        if (Array.isArray(t)) return e.checked = -1 < S.inArray(S(e).val(), t);
                    }
                }, y.checkOn || (S.valHooks[this].get = function(e) {
                    return null === e.getAttribute("value") ? "on" : e.value;
                });
            })), y.focusin = "onfocusin" in C;
            var mt = /^(?:focusinfocus|focusoutblur)$/, xt = function(e) {
                e.stopPropagation();
            };
            S.extend(S.event, {
                trigger: function(e, t, n, r) {
                    var i, o, a, s, u, l, c, f, p = [ n || E ], d = v.call(e, "type") ? e.type : e, h = v.call(e, "namespace") ? e.namespace.split(".") : [];
                    if (o = f = a = n = n || E, 3 !== n.nodeType && 8 !== n.nodeType && !mt.test(d + S.event.triggered) && (-1 < d.indexOf(".") && (d = (h = d.split(".")).shift(), 
                    h.sort()), u = d.indexOf(":") < 0 && "on" + d, (e = e[S.expando] ? e : new S.Event(d, "object" == typeof e && e)).isTrigger = r ? 2 : 3, 
                    e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
                    e.result = void 0, e.target || (e.target = n), t = null == t ? [ e ] : S.makeArray(t, [ e ]), 
                    c = S.event.special[d] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
                        if (!r && !c.noBubble && !x(n)) {
                            for (s = c.delegateType || d, mt.test(s + d) || (o = o.parentNode); o; o = o.parentNode) p.push(o), 
                            a = o;
                            a === (n.ownerDocument || E) && p.push(a.defaultView || a.parentWindow || C);
                        }
                        i = 0;
                        while ((o = p[i++]) && !e.isPropagationStopped()) f = o, e.type = 1 < i ? s : c.bindType || d, 
                        (l = (Y.get(o, "events") || Object.create(null))[e.type] && Y.get(o, "handle")) && l.apply(o, t), 
                        (l = u && o[u]) && l.apply && V(o) && (e.result = l.apply(o, t), !1 === e.result && e.preventDefault());
                        return e.type = d, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(p.pop(), t) || !V(n) || u && m(n[d]) && !x(n) && ((a = n[u]) && (n[u] = null), 
                        S.event.triggered = d, e.isPropagationStopped() && f.addEventListener(d, xt), n[d](), 
                        e.isPropagationStopped() && f.removeEventListener(d, xt), S.event.triggered = void 0, 
                        a && (n[u] = a)), e.result;
                    }
                },
                simulate: function(e, t, n) {
                    var r = S.extend(new S.Event, n, {
                        type: e,
                        isSimulated: !0
                    });
                    S.event.trigger(r, null, t);
                }
            }), S.fn.extend({
                trigger: function(e, t) {
                    return this.each((function() {
                        S.event.trigger(e, t, this);
                    }));
                },
                triggerHandler: function(e, t) {
                    var n = this[0];
                    if (n) return S.event.trigger(e, t, n, !0);
                }
            }), y.focusin || S.each({
                focus: "focusin",
                blur: "focusout"
            }, (function(n, r) {
                var i = function(e) {
                    S.event.simulate(r, e.target, S.event.fix(e));
                };
                S.event.special[r] = {
                    setup: function() {
                        var e = this.ownerDocument || this.document || this, t = Y.access(e, r);
                        t || e.addEventListener(n, i, !0), Y.access(e, r, (t || 0) + 1);
                    },
                    teardown: function() {
                        var e = this.ownerDocument || this.document || this, t = Y.access(e, r) - 1;
                        t ? Y.access(e, r, t) : (e.removeEventListener(n, i, !0), Y.remove(e, r));
                    }
                };
            }));
            var bt = C.location, wt = {
                guid: Date.now()
            }, Tt = /\?/;
            S.parseXML = function(e) {
                var t, n;
                if (!e || "string" != typeof e) return null;
                try {
                    t = (new C.DOMParser).parseFromString(e, "text/xml");
                } catch (e) {}
                return n = t && t.getElementsByTagName("parsererror")[0], t && !n || S.error("Invalid XML: " + (n ? S.map(n.childNodes, (function(e) {
                    return e.textContent;
                })).join("\n") : e)), t;
            };
            var Ct = /\[\]$/, Et = /\r?\n/g, St = /^(?:submit|button|image|reset|file)$/i, kt = /^(?:input|select|textarea|keygen)/i;
            function At(n, e, r, i) {
                var t;
                if (Array.isArray(e)) S.each(e, (function(e, t) {
                    r || Ct.test(n) ? i(n, t) : At(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i);
                })); else if (r || "object" !== w(e)) i(n, e); else for (t in e) At(n + "[" + t + "]", e[t], r, i);
            }
            S.param = function(e, t) {
                var n, r = [], i = function(e, t) {
                    var n = m(t) ? t() : t;
                    r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
                };
                if (null == e) return "";
                if (Array.isArray(e) || e.jquery && !S.isPlainObject(e)) S.each(e, (function() {
                    i(this.name, this.value);
                })); else for (n in e) At(n, e[n], t, i);
                return r.join("&");
            }, S.fn.extend({
                serialize: function() {
                    return S.param(this.serializeArray());
                },
                serializeArray: function() {
                    return this.map((function() {
                        var e = S.prop(this, "elements");
                        return e ? S.makeArray(e) : this;
                    })).filter((function() {
                        var e = this.type;
                        return this.name && !S(this).is(":disabled") && kt.test(this.nodeName) && !St.test(e) && (this.checked || !pe.test(e));
                    })).map((function(e, t) {
                        var n = S(this).val();
                        return null == n ? null : Array.isArray(n) ? S.map(n, (function(e) {
                            return {
                                name: t.name,
                                value: e.replace(Et, "\r\n")
                            };
                        })) : {
                            name: t.name,
                            value: n.replace(Et, "\r\n")
                        };
                    })).get();
                }
            });
            var Nt = /%20/g, jt = /#.*$/, Dt = /([?&])_=[^&]*/, qt = /^(.*?):[ \t]*([^\r\n]*)$/gm, Lt = /^(?:GET|HEAD)$/, Ht = /^\/\//, Ot = {}, Pt = {}, Rt = "*/".concat("*"), Mt = E.createElement("a");
            function It(o) {
                return function(e, t) {
                    "string" != typeof e && (t = e, e = "*");
                    var n, r = 0, i = e.toLowerCase().match(P) || [];
                    if (m(t)) while (n = i[r++]) "+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t);
                };
            }
            function Wt(t, i, o, a) {
                var s = {}, u = t === Pt;
                function l(e) {
                    var r;
                    return s[e] = !0, S.each(t[e] || [], (function(e, t) {
                        var n = t(i, o, a);
                        return "string" != typeof n || u || s[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n), 
                        l(n), !1);
                    })), r;
                }
                return l(i.dataTypes[0]) || !s["*"] && l("*");
            }
            function Ft(e, t) {
                var n, r, i = S.ajaxSettings.flatOptions || {};
                for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
                return r && S.extend(!0, e, r), e;
            }
            Mt.href = bt.href, S.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: bt.href,
                    type: "GET",
                    isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(bt.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": Rt,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": JSON.parse,
                        "text xml": S.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(e, t) {
                    return t ? Ft(Ft(e, S.ajaxSettings), t) : Ft(S.ajaxSettings, e);
                },
                ajaxPrefilter: It(Ot),
                ajaxTransport: It(Pt),
                ajax: function(e, t) {
                    "object" == typeof e && (t = e, e = void 0), t = t || {};
                    var c, f, p, n, d, r, h, g, i, o, v = S.ajaxSetup({}, t), y = v.context || v, m = v.context && (y.nodeType || y.jquery) ? S(y) : S.event, x = S.Deferred(), b = S.Callbacks("once memory"), w = v.statusCode || {}, a = {}, s = {}, u = "canceled", T = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (h) {
                                if (!n) {
                                    n = {};
                                    while (t = qt.exec(p)) n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2]);
                                }
                                t = n[e.toLowerCase() + " "];
                            }
                            return null == t ? null : t.join(", ");
                        },
                        getAllResponseHeaders: function() {
                            return h ? p : null;
                        },
                        setRequestHeader: function(e, t) {
                            return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e, a[e] = t), 
                            this;
                        },
                        overrideMimeType: function(e) {
                            return null == h && (v.mimeType = e), this;
                        },
                        statusCode: function(e) {
                            var t;
                            if (e) if (h) T.always(e[T.status]); else for (t in e) w[t] = [ w[t], e[t] ];
                            return this;
                        },
                        abort: function(e) {
                            var t = e || u;
                            return c && c.abort(t), l(0, t), this;
                        }
                    };
                    if (x.promise(T), v.url = ((e || v.url || bt.href) + "").replace(Ht, bt.protocol + "//"), 
                    v.type = t.method || t.type || v.method || v.type, v.dataTypes = (v.dataType || "*").toLowerCase().match(P) || [ "" ], 
                    null == v.crossDomain) {
                        r = E.createElement("a");
                        try {
                            r.href = v.url, r.href = r.href, v.crossDomain = Mt.protocol + "//" + Mt.host != r.protocol + "//" + r.host;
                        } catch (e) {
                            v.crossDomain = !0;
                        }
                    }
                    if (v.data && v.processData && "string" != typeof v.data && (v.data = S.param(v.data, v.traditional)), 
                    Wt(Ot, v, t, T), h) return T;
                    for (i in (g = S.event && v.global) && 0 == S.active++ && S.event.trigger("ajaxStart"), 
                    v.type = v.type.toUpperCase(), v.hasContent = !Lt.test(v.type), f = v.url.replace(jt, ""), 
                    v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(Nt, "+")) : (o = v.url.slice(f.length), 
                    v.data && (v.processData || "string" == typeof v.data) && (f += (Tt.test(f) ? "&" : "?") + v.data, 
                    delete v.data), !1 === v.cache && (f = f.replace(Dt, "$1"), o = (Tt.test(f) ? "&" : "?") + "_=" + wt.guid++ + o), 
                    v.url = f + o), v.ifModified && (S.lastModified[f] && T.setRequestHeader("If-Modified-Since", S.lastModified[f]), 
                    S.etag[f] && T.setRequestHeader("If-None-Match", S.etag[f])), (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && T.setRequestHeader("Content-Type", v.contentType), 
                    T.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + Rt + "; q=0.01" : "") : v.accepts["*"]), 
                    v.headers) T.setRequestHeader(i, v.headers[i]);
                    if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h)) return T.abort();
                    if (u = "abort", b.add(v.complete), T.done(v.success), T.fail(v.error), c = Wt(Pt, v, t, T)) {
                        if (T.readyState = 1, g && m.trigger("ajaxSend", [ T, v ]), h) return T;
                        v.async && 0 < v.timeout && (d = C.setTimeout((function() {
                            T.abort("timeout");
                        }), v.timeout));
                        try {
                            h = !1, c.send(a, l);
                        } catch (e) {
                            if (h) throw e;
                            l(-1, e);
                        }
                    } else l(-1, "No Transport");
                    function l(e, t, n, r) {
                        var i, o, a, s, u, l = t;
                        h || (h = !0, d && C.clearTimeout(d), c = void 0, p = r || "", T.readyState = 0 < e ? 4 : 0, 
                        i = 200 <= e && e < 300 || 304 === e, n && (s = function(e, t, n) {
                            var r, i, o, a, s = e.contents, u = e.dataTypes;
                            while ("*" === u[0]) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                            if (r) for (i in s) if (s[i] && s[i].test(r)) {
                                u.unshift(i);
                                break;
                            }
                            if (u[0] in n) o = u[0]; else {
                                for (i in n) {
                                    if (!u[0] || e.converters[i + " " + u[0]]) {
                                        o = i;
                                        break;
                                    }
                                    a || (a = i);
                                }
                                o = o || a;
                            }
                            if (o) return o !== u[0] && u.unshift(o), n[o];
                        }(v, T, n)), !i && -1 < S.inArray("script", v.dataTypes) && S.inArray("json", v.dataTypes) < 0 && (v.converters["text script"] = function() {}), 
                        s = function(e, t, n, r) {
                            var i, o, a, s, u, l = {}, c = e.dataTypes.slice();
                            if (c[1]) for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
                            o = c.shift();
                            while (o) if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), 
                            u = o, o = c.shift()) if ("*" === o) o = u; else if ("*" !== u && u !== o) {
                                if (!(a = l[u + " " + o] || l["* " + o])) for (i in l) if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                    !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
                                    break;
                                }
                                if (!0 !== a) if (a && e["throws"]) t = a(t); else try {
                                    t = a(t);
                                } catch (e) {
                                    return {
                                        state: "parsererror",
                                        error: a ? e : "No conversion from " + u + " to " + o
                                    };
                                }
                            }
                            return {
                                state: "success",
                                data: t
                            };
                        }(v, s, T, i), i ? (v.ifModified && ((u = T.getResponseHeader("Last-Modified")) && (S.lastModified[f] = u), 
                        (u = T.getResponseHeader("etag")) && (S.etag[f] = u)), 204 === e || "HEAD" === v.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state, 
                        o = s.data, i = !(a = s.error))) : (a = l, !e && l || (l = "error", e < 0 && (e = 0))), 
                        T.status = e, T.statusText = (t || l) + "", i ? x.resolveWith(y, [ o, l, T ]) : x.rejectWith(y, [ T, l, a ]), 
                        T.statusCode(w), w = void 0, g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [ T, v, i ? o : a ]), 
                        b.fireWith(y, [ T, l ]), g && (m.trigger("ajaxComplete", [ T, v ]), --S.active || S.event.trigger("ajaxStop")));
                    }
                    return T;
                },
                getJSON: function(e, t, n) {
                    return S.get(e, t, n, "json");
                },
                getScript: function(e, t) {
                    return S.get(e, void 0, t, "script");
                }
            }), S.each([ "get", "post" ], (function(e, i) {
                S[i] = function(e, t, n, r) {
                    return m(t) && (r = r || n, n = t, t = void 0), S.ajax(S.extend({
                        url: e,
                        type: i,
                        dataType: r,
                        data: t,
                        success: n
                    }, S.isPlainObject(e) && e));
                };
            })), S.ajaxPrefilter((function(e) {
                var t;
                for (t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "");
            })), S._evalUrl = function(e, t, n) {
                return S.ajax({
                    url: e,
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    async: !1,
                    global: !1,
                    converters: {
                        "text script": function() {}
                    },
                    dataFilter: function(e) {
                        S.globalEval(e, t, n);
                    }
                });
            }, S.fn.extend({
                wrapAll: function(e) {
                    var t;
                    return this[0] && (m(e) && (e = e.call(this[0])), t = S(e, this[0].ownerDocument).eq(0).clone(!0), 
                    this[0].parentNode && t.insertBefore(this[0]), t.map((function() {
                        var e = this;
                        while (e.firstElementChild) e = e.firstElementChild;
                        return e;
                    })).append(this)), this;
                },
                wrapInner: function(n) {
                    return m(n) ? this.each((function(e) {
                        S(this).wrapInner(n.call(this, e));
                    })) : this.each((function() {
                        var e = S(this), t = e.contents();
                        t.length ? t.wrapAll(n) : e.append(n);
                    }));
                },
                wrap: function(t) {
                    var n = m(t);
                    return this.each((function(e) {
                        S(this).wrapAll(n ? t.call(this, e) : t);
                    }));
                },
                unwrap: function(e) {
                    return this.parent(e).not("body").each((function() {
                        S(this).replaceWith(this.childNodes);
                    })), this;
                }
            }), S.expr.pseudos.hidden = function(e) {
                return !S.expr.pseudos.visible(e);
            }, S.expr.pseudos.visible = function(e) {
                return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
            }, S.ajaxSettings.xhr = function() {
                try {
                    return new C.XMLHttpRequest;
                } catch (e) {}
            };
            var Bt = {
                0: 200,
                1223: 204
            }, $t = S.ajaxSettings.xhr();
            y.cors = !!$t && "withCredentials" in $t, y.ajax = $t = !!$t, S.ajaxTransport((function(i) {
                var o, a;
                if (y.cors || $t && !i.crossDomain) return {
                    send: function(e, t) {
                        var n, r = i.xhr();
                        if (r.open(i.type, i.url, i.async, i.username, i.password), i.xhrFields) for (n in i.xhrFields) r[n] = i.xhrFields[n];
                        for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType), i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), 
                        e) r.setRequestHeader(n, e[n]);
                        o = function(e) {
                            return function() {
                                o && (o = a = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null, 
                                "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(Bt[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
                                    binary: r.response
                                } : {
                                    text: r.responseText
                                }, r.getAllResponseHeaders()));
                            };
                        }, r.onload = o(), a = r.onerror = r.ontimeout = o("error"), void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function() {
                            4 === r.readyState && C.setTimeout((function() {
                                o && a();
                            }));
                        }, o = o("abort");
                        try {
                            r.send(i.hasContent && i.data || null);
                        } catch (e) {
                            if (o) throw e;
                        }
                    },
                    abort: function() {
                        o && o();
                    }
                };
            })), S.ajaxPrefilter((function(e) {
                e.crossDomain && (e.contents.script = !1);
            })), S.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function(e) {
                        return S.globalEval(e), e;
                    }
                }
            }), S.ajaxPrefilter("script", (function(e) {
                void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
            })), S.ajaxTransport("script", (function(n) {
                var r, i;
                if (n.crossDomain || n.scriptAttrs) return {
                    send: function(e, t) {
                        r = S("<script>").attr(n.scriptAttrs || {}).prop({
                            charset: n.scriptCharset,
                            src: n.url
                        }).on("load error", i = function(e) {
                            r.remove(), i = null, e && t("error" === e.type ? 404 : 200, e.type);
                        }), E.head.appendChild(r[0]);
                    },
                    abort: function() {
                        i && i();
                    }
                };
            }));
            var _t, zt = [], Ut = /(=)\?(?=&|$)|\?\?/;
            S.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var e = zt.pop() || S.expando + "_" + wt.guid++;
                    return this[e] = !0, e;
                }
            }), S.ajaxPrefilter("json jsonp", (function(e, t, n) {
                var r, i, o, a = !1 !== e.jsonp && (Ut.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ut.test(e.data) && "data");
                if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, 
                a ? e[a] = e[a].replace(Ut, "$1" + r) : !1 !== e.jsonp && (e.url += (Tt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), 
                e.converters["script json"] = function() {
                    return o || S.error(r + " was not called"), o[0];
                }, e.dataTypes[0] = "json", i = C[r], C[r] = function() {
                    o = arguments;
                }, n.always((function() {
                    void 0 === i ? S(C).removeProp(r) : C[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, 
                    zt.push(r)), o && m(i) && i(o[0]), o = i = void 0;
                })), "script";
            })), y.createHTMLDocument = ((_t = E.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 
            2 === _t.childNodes.length), S.parseHTML = function(e, t, n) {
                return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (y.createHTMLDocument ? ((r = (t = E.implementation.createHTMLDocument("")).createElement("base")).href = E.location.href, 
                t.head.appendChild(r)) : t = E), o = !n && [], (i = N.exec(e)) ? [ t.createElement(i[1]) ] : (i = xe([ e ], t, o), 
                o && o.length && S(o).remove(), S.merge([], i.childNodes)));
                var r, i, o;
            }, S.fn.load = function(e, t, n) {
                var r, i, o, a = this, s = e.indexOf(" ");
                return -1 < s && (r = ht(e.slice(s)), e = e.slice(0, s)), m(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), 
                0 < a.length && S.ajax({
                    url: e,
                    type: i || "GET",
                    dataType: "html",
                    data: t
                }).done((function(e) {
                    o = arguments, a.html(r ? S("<div>").append(S.parseHTML(e)).find(r) : e);
                })).always(n && function(e, t) {
                    a.each((function() {
                        n.apply(this, o || [ e.responseText, t, e ]);
                    }));
                }), this;
            }, S.expr.pseudos.animated = function(t) {
                return S.grep(S.timers, (function(e) {
                    return t === e.elem;
                })).length;
            }, S.offset = {
                setOffset: function(e, t, n) {
                    var r, i, o, a, s, u, l = S.css(e, "position"), c = S(e), f = {};
                    "static" === l && (e.style.position = "relative"), s = c.offset(), o = S.css(e, "top"), 
                    u = S.css(e, "left"), ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top, 
                    i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), m(t) && (t = t.call(e, n, S.extend({}, s))), 
                    null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), 
                    "using" in t ? t.using.call(e, f) : c.css(f);
                }
            }, S.fn.extend({
                offset: function(t) {
                    if (arguments.length) return void 0 === t ? this : this.each((function(e) {
                        S.offset.setOffset(this, t, e);
                    }));
                    var e, n, r = this[0];
                    return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, 
                    {
                        top: e.top + n.pageYOffset,
                        left: e.left + n.pageXOffset
                    }) : {
                        top: 0,
                        left: 0
                    } : void 0;
                },
                position: function() {
                    if (this[0]) {
                        var e, t, n, r = this[0], i = {
                            top: 0,
                            left: 0
                        };
                        if ("fixed" === S.css(r, "position")) t = r.getBoundingClientRect(); else {
                            t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement;
                            while (e && (e === n.body || e === n.documentElement) && "static" === S.css(e, "position")) e = e.parentNode;
                            e && e !== r && 1 === e.nodeType && ((i = S(e).offset()).top += S.css(e, "borderTopWidth", !0), 
                            i.left += S.css(e, "borderLeftWidth", !0));
                        }
                        return {
                            top: t.top - i.top - S.css(r, "marginTop", !0),
                            left: t.left - i.left - S.css(r, "marginLeft", !0)
                        };
                    }
                },
                offsetParent: function() {
                    return this.map((function() {
                        var e = this.offsetParent;
                        while (e && "static" === S.css(e, "position")) e = e.offsetParent;
                        return e || re;
                    }));
                }
            }), S.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, (function(t, i) {
                var o = "pageYOffset" === i;
                S.fn[t] = function(e) {
                    return $(this, (function(e, t, n) {
                        var r;
                        if (x(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === n) return r ? r[i] : e[t];
                        r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n;
                    }), t, e, arguments.length);
                };
            })), S.each([ "top", "left" ], (function(e, n) {
                S.cssHooks[n] = Fe(y.pixelPosition, (function(e, t) {
                    if (t) return t = We(e, n), Pe.test(t) ? S(e).position()[n] + "px" : t;
                }));
            })), S.each({
                Height: "height",
                Width: "width"
            }, (function(a, s) {
                S.each({
                    padding: "inner" + a,
                    content: s,
                    "": "outer" + a
                }, (function(r, o) {
                    S.fn[o] = function(e, t) {
                        var n = arguments.length && (r || "boolean" != typeof e), i = r || (!0 === e || !0 === t ? "margin" : "border");
                        return $(this, (function(e, t, n) {
                            var r;
                            return x(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement, 
                            Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? S.css(e, t, i) : S.style(e, t, n, i);
                        }), s, n ? e : void 0, n);
                    };
                }));
            })), S.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], (function(e, t) {
                S.fn[t] = function(e) {
                    return this.on(t, e);
                };
            })), S.fn.extend({
                bind: function(e, t, n) {
                    return this.on(e, null, t, n);
                },
                unbind: function(e, t) {
                    return this.off(e, null, t);
                },
                delegate: function(e, t, n, r) {
                    return this.on(t, e, n, r);
                },
                undelegate: function(e, t, n) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
                },
                hover: function(e, t) {
                    return this.mouseenter(e).mouseleave(t || e);
                }
            }), S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), (function(e, n) {
                S.fn[n] = function(e, t) {
                    return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n);
                };
            }));
            var Xt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            S.proxy = function(e, t) {
                var n, r, i;
                if ("string" == typeof t && (n = e[t], t = e, e = n), m(e)) return r = s.call(arguments, 2), 
                (i = function() {
                    return e.apply(t || this, r.concat(s.call(arguments)));
                }).guid = e.guid = e.guid || S.guid++, i;
            }, S.holdReady = function(e) {
                e ? S.readyWait++ : S.ready(!0);
            }, S.isArray = Array.isArray, S.parseJSON = JSON.parse, S.nodeName = A, S.isFunction = m, 
            S.isWindow = x, S.camelCase = X, S.type = w, S.now = Date.now, S.isNumeric = function(e) {
                var t = S.type(e);
                return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
            }, S.trim = function(e) {
                return null == e ? "" : (e + "").replace(Xt, "");
            }, "function" == typeof define && define.amd && define("jquery", [], (function() {
                return S;
            }));
            var Vt = C.jQuery, Gt = C.$;
            return S.noConflict = function(e) {
                return C.$ === S && (C.$ = Gt), e && C.jQuery === S && (C.jQuery = Vt), S;
            }, "undefined" == typeof e && (C.jQuery = C.$ = S), S;
        }));
        !function(e, t) {
            "use strict";
            "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
                if (e.document) return t(e);
                throw new Error("jQuery requires a window with a document");
            } : t(e);
        }("undefined" != typeof window ? window : void 0, (function(w, N) {
            "use strict";
            function y(e) {
                return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item;
            }
            function H(e) {
                return null != e && e === e.window;
            }
            var t = [], j = Object.getPrototypeOf, o = t.slice, q = t.flat ? function(e) {
                return t.flat.call(e);
            } : function(e) {
                return t.concat.apply([], e);
            }, B = t.push, b = t.indexOf, R = {}, G = R.toString, F = R.hasOwnProperty, W = F.toString, X = W.call(Object), m = {}, T = w.document, V = {
                type: !0,
                src: !0,
                nonce: !0,
                noModule: !0
            };
            function Y(e, t, i) {
                var n, a, r = (i = i || T).createElement("script");
                if (r.text = e, t) for (n in V) (a = t[n] || t.getAttribute && t.getAttribute(n)) && r.setAttribute(n, a);
                i.head.appendChild(r).parentNode.removeChild(r);
            }
            function _(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? R[G.call(e)] || "object" : typeof e;
            }
            var e = "3.7.1", U = /HTML$/i, E = function(e, t) {
                return new E.fn.init(e, t);
            };
            function K(e) {
                var t = !!e && "length" in e && e.length, i = _(e);
                return !y(e) && !H(e) && ("array" === i || 0 === t || "number" == typeof t && 0 < t && t - 1 in e);
            }
            function x(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
            }
            E.fn = E.prototype = {
                jquery: e,
                constructor: E,
                length: 0,
                toArray: function() {
                    return o.call(this);
                },
                get: function(e) {
                    return null == e ? o.call(this) : e < 0 ? this[e + this.length] : this[e];
                },
                pushStack: function(e) {
                    e = E.merge(this.constructor(), e);
                    return e.prevObject = this, e;
                },
                each: function(e) {
                    return E.each(this, e);
                },
                map: function(i) {
                    return this.pushStack(E.map(this, (function(e, t) {
                        return i.call(e, t, e);
                    })));
                },
                slice: function() {
                    return this.pushStack(o.apply(this, arguments));
                },
                first: function() {
                    return this.eq(0);
                },
                last: function() {
                    return this.eq(-1);
                },
                even: function() {
                    return this.pushStack(E.grep(this, (function(e, t) {
                        return (t + 1) % 2;
                    })));
                },
                odd: function() {
                    return this.pushStack(E.grep(this, (function(e, t) {
                        return t % 2;
                    })));
                },
                eq: function(e) {
                    var t = this.length;
                    e = +e + (e < 0 ? t : 0);
                    return this.pushStack(0 <= e && e < t ? [ this[e] ] : []);
                },
                end: function() {
                    return this.prevObject || this.constructor();
                },
                push: B,
                sort: t.sort,
                splice: t.splice
            }, E.extend = E.fn.extend = function() {
                var e, t, i, n, a, r = arguments[0] || {}, s = 1, o = arguments.length, l = !1;
                for ("boolean" == typeof r && (l = r, r = arguments[s] || {}, s++), "object" == typeof r || y(r) || (r = {}), 
                s === o && (r = this, s--); s < o; s++) if (null != (e = arguments[s])) for (t in e) i = e[t], 
                "__proto__" !== t && r !== i && (l && i && (E.isPlainObject(i) || (n = Array.isArray(i))) ? (a = r[t], 
                a = n && !Array.isArray(a) ? [] : n || E.isPlainObject(a) ? a : {}, n = !1, r[t] = E.extend(l, a, i)) : void 0 !== i && (r[t] = i));
                return r;
            }, E.extend({
                expando: "jQuery" + (e + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(e) {
                    throw new Error(e);
                },
                noop: function() {},
                isPlainObject: function(e) {
                    return !(!e || "[object Object]" !== G.call(e) || (e = j(e)) && ("function" != typeof (e = F.call(e, "constructor") && e.constructor) || W.call(e) !== X));
                },
                isEmptyObject: function(e) {
                    for (var t in e) return !1;
                    return !0;
                },
                globalEval: function(e, t, i) {
                    Y(e, {
                        nonce: t && t.nonce
                    }, i);
                },
                each: function(e, t) {
                    var i, n = 0;
                    if (K(e)) for (i = e.length; n < i && !1 !== t.call(e[n], n, e[n]); n++) ; else for (n in e) if (!1 === t.call(e[n], n, e[n])) break;
                    return e;
                },
                text: function(e) {
                    var t, i = "", n = 0, a = e.nodeType;
                    if (!a) for (;t = e[n++]; ) i += E.text(t);
                    return 1 === a || 11 === a ? e.textContent : 9 === a ? e.documentElement.textContent : 3 === a || 4 === a ? e.nodeValue : i;
                },
                makeArray: function(e, t) {
                    t = t || [];
                    return null != e && (K(Object(e)) ? E.merge(t, "string" == typeof e ? [ e ] : e) : B.call(t, e)), 
                    t;
                },
                inArray: function(e, t, i) {
                    return null == t ? -1 : b.call(t, e, i);
                },
                isXMLDoc: function(e) {
                    var t = e && e.namespaceURI;
                    e = e && (e.ownerDocument || e).documentElement;
                    return !U.test(t || e && e.nodeName || "HTML");
                },
                merge: function(e, t) {
                    for (var i = +t.length, n = 0, a = e.length; n < i; n++) e[a++] = t[n];
                    return e.length = a, e;
                },
                grep: function(e, t, i) {
                    for (var n = [], a = 0, r = e.length, s = !i; a < r; a++) !t(e[a], a) != s && n.push(e[a]);
                    return n;
                },
                map: function(e, t, i) {
                    var n, a, r = 0, s = [];
                    if (K(e)) for (n = e.length; r < n; r++) null != (a = t(e[r], r, i)) && s.push(a); else for (r in e) null != (a = t(e[r], r, i)) && s.push(a);
                    return q(s);
                },
                guid: 1,
                support: m
            }), "function" == typeof Symbol && (E.fn[Symbol.iterator] = t[Symbol.iterator]), 
            E.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function(e, t) {
                R["[object " + t + "]"] = t.toLowerCase();
            }));
            var Q = t.pop, J = t.sort, Z = t.splice, i = "[\\x20\\t\\r\\n\\f]", ee = new RegExp("^" + i + "+|((?:^|[^\\\\])(?:\\\\.)*)" + i + "+$", "g"), te = (E.contains = function(e, t) {
                t = t && t.parentNode;
                return e === t || !(!t || 1 !== t.nodeType || !(e.contains ? e.contains(t) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(t)));
            }, /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g);
            function ie(e, t) {
                return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
            }
            E.escapeSelector = function(e) {
                return (e + "").replace(te, ie);
            };
            var ne, C, ae, re, se, S, n, M, p, oe, a = T, le = B, k = le, P = E.expando, L = 0, de = 0, ue = Le(), ce = Le(), pe = Le(), he = Le(), fe = function(e, t) {
                return e === t && (se = !0), 0;
            }, me = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", r = (e = "(?:\\\\[\\da-fA-F]{1,6}" + i + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", 
            "\\[" + i + "*(" + e + ")(?:" + i + "*([*^$|!~]?=)" + i + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + e + "))|)" + i + "*\\]"), s = ":(" + e + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + r + ")*)|.*)\\)|)", ve = new RegExp(i + "+", "g"), ge = new RegExp("^" + i + "*," + i + "*"), ye = new RegExp("^" + i + "*([>+~]|" + i + ")" + i + "*"), be = new RegExp(i + "|>"), xe = new RegExp(s), we = new RegExp("^" + e + "$"), Te = {
                ID: new RegExp("^#(" + e + ")"),
                CLASS: new RegExp("^\\.(" + e + ")"),
                TAG: new RegExp("^(" + e + "|[*])"),
                ATTR: new RegExp("^" + r),
                PSEUDO: new RegExp("^" + s),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + i + "*(even|odd|(([+-]|)(\\d*)n|)" + i + "*(?:([+-]|)" + i + "*(\\d+)|))" + i + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + me + ")$", "i"),
                needsContext: new RegExp("^" + i + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + i + "*((?:-\\d)?\\d*)" + i + "*\\)|)(?=[^-]|$)", "i")
            }, Ee = /^(?:input|select|textarea|button)$/i, Ce = /^h\d$/i, Se = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, Me = /[+~]/, c = new RegExp("\\\\[\\da-fA-F]{1,6}" + i + "?|\\\\([^\\r\\n\\f])", "g"), h = function(e, t) {
                e = "0x" + e.slice(1) - 65536;
                return t || (e < 0 ? String.fromCharCode(65536 + e) : String.fromCharCode(e >> 10 | 55296, 1023 & e | 56320));
            }, ke = function() {
                Ie();
            }, Pe = je((function(e) {
                return !0 === e.disabled && x(e, "fieldset");
            }), {
                dir: "parentNode",
                next: "legend"
            });
            try {
                k.apply(t = o.call(a.childNodes), a.childNodes), t[a.childNodes.length].nodeType;
            } catch (e) {
                k = {
                    apply: function(e, t) {
                        le.apply(e, o.call(t));
                    },
                    call: function(e) {
                        le.apply(e, o.call(arguments, 1));
                    }
                };
            }
            function z(t, e, i, n) {
                var a, r, s, o, l, d, u = e && e.ownerDocument, c = e ? e.nodeType : 9;
                if (i = i || [], "string" != typeof t || !t || 1 !== c && 9 !== c && 11 !== c) return i;
                if (!n && (Ie(e), e = e || S, M)) {
                    if (11 !== c && (o = Se.exec(t))) if (a = o[1]) {
                        if (9 === c) {
                            if (!(d = e.getElementById(a))) return i;
                            if (d.id === a) return k.call(i, d), i;
                        } else if (u && (d = u.getElementById(a)) && z.contains(e, d) && d.id === a) return k.call(i, d), 
                        i;
                    } else {
                        if (o[2]) return k.apply(i, e.getElementsByTagName(t)), i;
                        if ((a = o[3]) && e.getElementsByClassName) return k.apply(i, e.getElementsByClassName(a)), 
                        i;
                    }
                    if (!(he[t + " "] || p && p.test(t))) {
                        if (d = t, u = e, 1 === c && (be.test(t) || ye.test(t))) {
                            for ((u = Me.test(t) && Ae(e.parentNode) || e) == e && m.scope || ((s = e.getAttribute("id")) ? s = E.escapeSelector(s) : e.setAttribute("id", s = P)), 
                            r = (l = Ne(t)).length; r--; ) l[r] = (s ? "#" + s : ":scope") + " " + He(l[r]);
                            d = l.join(",");
                        }
                        try {
                            return k.apply(i, u.querySelectorAll(d)), i;
                        } catch (e) {
                            he(t, !0);
                        } finally {
                            s === P && e.removeAttribute("id");
                        }
                    }
                }
                return We(t.replace(ee, "$1"), e, i, n);
            }
            function Le() {
                var i = [];
                function n(e, t) {
                    return i.push(e + " ") > C.cacheLength && delete n[i.shift()], n[e + " "] = t;
                }
                return n;
            }
            function l(e) {
                return e[P] = !0, e;
            }
            function ze(e) {
                var t = S.createElement("fieldset");
                try {
                    return !!e(t);
                } catch (e) {
                    return !1;
                } finally {
                    t.parentNode && t.parentNode.removeChild(t);
                }
            }
            function De(t) {
                return function(e) {
                    return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && Pe(e) === t : e.disabled === t : "label" in e && e.disabled === t;
                };
            }
            function $e(s) {
                return l((function(r) {
                    return r = +r, l((function(e, t) {
                        for (var i, n = s([], e.length, r), a = n.length; a--; ) e[i = n[a]] && (e[i] = !(t[i] = e[i]));
                    }));
                }));
            }
            function Ae(e) {
                return e && void 0 !== e.getElementsByTagName && e;
            }
            function Ie(e) {
                e = e ? e.ownerDocument || e : a;
                return e != S && 9 === e.nodeType && e.documentElement && (n = (S = e).documentElement, 
                M = !E.isXMLDoc(S), oe = n.matches || n.webkitMatchesSelector || n.msMatchesSelector, 
                n.msMatchesSelector && a != S && (e = S.defaultView) && e.top !== e && e.addEventListener("unload", ke), 
                m.getById = ze((function(e) {
                    return n.appendChild(e).id = E.expando, !S.getElementsByName || !S.getElementsByName(E.expando).length;
                })), m.disconnectedMatch = ze((function(e) {
                    return oe.call(e, "*");
                })), m.scope = ze((function() {
                    return S.querySelectorAll(":scope");
                })), m.cssHas = ze((function() {
                    try {
                        S.querySelector(":has(*,:jqfake)");
                    } catch (e) {
                        return 1;
                    }
                })), m.getById ? (C.filter.ID = function(e) {
                    var t = e.replace(c, h);
                    return function(e) {
                        return e.getAttribute("id") === t;
                    };
                }, C.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && M) return (t = t.getElementById(e)) ? [ t ] : [];
                }) : (C.filter.ID = function(e) {
                    var t = e.replace(c, h);
                    return function(e) {
                        e = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                        return e && e.value === t;
                    };
                }, C.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && M) {
                        var i, n, a, r = t.getElementById(e);
                        if (r) {
                            if ((i = r.getAttributeNode("id")) && i.value === e) return [ r ];
                            for (a = t.getElementsByName(e), n = 0; r = a[n++]; ) if ((i = r.getAttributeNode("id")) && i.value === e) return [ r ];
                        }
                        return [];
                    }
                }), C.find.TAG = function(e, t) {
                    return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : t.querySelectorAll(e);
                }, C.find.CLASS = function(e, t) {
                    if (void 0 !== t.getElementsByClassName && M) return t.getElementsByClassName(e);
                }, p = [], ze((function(e) {
                    var t;
                    n.appendChild(e).innerHTML = "<a id='" + P + "' href='' disabled='disabled'></a><select id='" + P + "-\r\\' disabled='disabled'><option selected=''></option></select>", 
                    e.querySelectorAll("[selected]").length || p.push("\\[" + i + "*(?:value|" + me + ")"), 
                    e.querySelectorAll("[id~=" + P + "-]").length || p.push("~="), e.querySelectorAll("a#" + P + "+*").length || p.push(".#.+[+~]"), 
                    e.querySelectorAll(":checked").length || p.push(":checked"), (t = S.createElement("input")).setAttribute("type", "hidden"), 
                    e.appendChild(t).setAttribute("name", "D"), n.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && p.push(":enabled", ":disabled"), 
                    (t = S.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || p.push("\\[" + i + "*name" + i + "*=" + i + "*(?:''|\"\")");
                })), m.cssHas || p.push(":has"), p = p.length && new RegExp(p.join("|")), fe = function(e, t) {
                    var i;
                    return e === t ? (se = !0, 0) : (i = !e.compareDocumentPosition - !t.compareDocumentPosition) || (1 & (i = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !m.sortDetached && t.compareDocumentPosition(e) === i ? e === S || e.ownerDocument == a && z.contains(a, e) ? -1 : t === S || t.ownerDocument == a && z.contains(a, t) ? 1 : re ? b.call(re, e) - b.call(re, t) : 0 : 4 & i ? -1 : 1);
                }), S;
            }
            for (ne in z.matches = function(e, t) {
                return z(e, null, null, t);
            }, z.matchesSelector = function(e, t) {
                if (Ie(e), M && !he[t + " "] && (!p || !p.test(t))) try {
                    var i = oe.call(e, t);
                    if (i || m.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i;
                } catch (e) {
                    he(t, !0);
                }
                return 0 < z(t, S, null, [ e ]).length;
            }, z.contains = function(e, t) {
                return (e.ownerDocument || e) != S && Ie(e), E.contains(e, t);
            }, z.attr = function(e, t) {
                (e.ownerDocument || e) != S && Ie(e);
                var i = C.attrHandle[t.toLowerCase()];
                i = i && F.call(C.attrHandle, t.toLowerCase()) ? i(e, t, !M) : void 0;
                return void 0 !== i ? i : e.getAttribute(t);
            }, z.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e);
            }, E.uniqueSort = function(e) {
                var t, i = [], n = 0, a = 0;
                if (se = !m.sortStable, re = !m.sortStable && o.call(e, 0), J.call(e, fe), se) {
                    for (;t = e[a++]; ) t === e[a] && (n = i.push(a));
                    for (;n--; ) Z.call(e, i[n], 1);
                }
                return re = null, e;
            }, E.fn.uniqueSort = function() {
                return this.pushStack(E.uniqueSort(o.apply(this)));
            }, (C = E.expr = {
                cacheLength: 50,
                createPseudo: l,
                match: Te,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(c, h), e[3] = (e[3] || e[4] || e[5] || "").replace(c, h), 
                        "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || z.error(e[0]), 
                        e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && z.error(e[0]), 
                        e;
                    },
                    PSEUDO: function(e) {
                        var t, i = !e[6] && e[2];
                        return Te.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : i && xe.test(i) && (t = (t = Ne(i, !0)) && i.indexOf(")", i.length - t) - i.length) && (e[0] = e[0].slice(0, t), 
                        e[2] = i.slice(0, t)), e.slice(0, 3));
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(c, h).toLowerCase();
                        return "*" === e ? function() {
                            return !0;
                        } : function(e) {
                            return x(e, t);
                        };
                    },
                    CLASS: function(e) {
                        var t = ue[e + " "];
                        return t || (t = new RegExp("(^|" + i + ")" + e + "(" + i + "|$)")) && ue(e, (function(e) {
                            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "");
                        }));
                    },
                    ATTR: function(t, i, n) {
                        return function(e) {
                            e = z.attr(e, t);
                            return null == e ? "!=" === i : !i || (e += "", "=" === i ? e === n : "!=" === i ? e !== n : "^=" === i ? n && 0 === e.indexOf(n) : "*=" === i ? n && -1 < e.indexOf(n) : "$=" === i ? n && e.slice(-n.length) === n : "~=" === i ? -1 < (" " + e.replace(ve, " ") + " ").indexOf(n) : "|=" === i && (e === n || e.slice(0, n.length + 1) === n + "-"));
                        };
                    },
                    CHILD: function(h, e, t, f, m) {
                        var v = "nth" !== h.slice(0, 3), g = "last" !== h.slice(-4), y = "of-type" === e;
                        return 1 === f && 0 === m ? function(e) {
                            return !!e.parentNode;
                        } : function(e, t, i) {
                            var n, a, r, s, o, l = v != g ? "nextSibling" : "previousSibling", d = e.parentNode, u = y && e.nodeName.toLowerCase(), c = !i && !y, p = !1;
                            if (d) {
                                if (v) {
                                    for (;l; ) {
                                        for (r = e; r = r[l]; ) if (y ? x(r, u) : 1 === r.nodeType) return !1;
                                        o = l = "only" === h && !o && "nextSibling";
                                    }
                                    return !0;
                                }
                                if (o = [ g ? d.firstChild : d.lastChild ], g && c) {
                                    for (p = (s = (n = (a = d[P] || (d[P] = {}))[h] || [])[0] === L && n[1]) && n[2], 
                                    r = s && d.childNodes[s]; r = ++s && r && r[l] || (p = s = 0, o.pop()); ) if (1 === r.nodeType && ++p && r === e) {
                                        a[h] = [ L, s, p ];
                                        break;
                                    }
                                } else if (!1 === (p = c ? s = (n = (a = e[P] || (e[P] = {}))[h] || [])[0] === L && n[1] : p)) for (;(r = ++s && r && r[l] || (p = s = 0, 
                                o.pop())) && ((y ? !x(r, u) : 1 !== r.nodeType) || !++p || (c && ((a = r[P] || (r[P] = {}))[h] = [ L, p ]), 
                                r !== e)); ) ;
                                return (p -= m) === f || p % f == 0 && 0 <= p / f;
                            }
                        };
                    },
                    PSEUDO: function(e, r) {
                        var t, s = C.pseudos[e] || C.setFilters[e.toLowerCase()] || z.error("unsupported pseudo: " + e);
                        return s[P] ? s(r) : 1 < s.length ? (t = [ e, e, "", r ], C.setFilters.hasOwnProperty(e.toLowerCase()) ? l((function(e, t) {
                            for (var i, n = s(e, r), a = n.length; a--; ) e[i = b.call(e, n[a])] = !(t[i] = n[a]);
                        })) : function(e) {
                            return s(e, 0, t);
                        }) : s;
                    }
                },
                pseudos: {
                    not: l((function(e) {
                        var n = [], a = [], o = Fe(e.replace(ee, "$1"));
                        return o[P] ? l((function(e, t, i, n) {
                            for (var a, r = o(e, null, n, []), s = e.length; s--; ) (a = r[s]) && (e[s] = !(t[s] = a));
                        })) : function(e, t, i) {
                            return n[0] = e, o(n, null, i, a), n[0] = null, !a.pop();
                        };
                    })),
                    has: l((function(t) {
                        return function(e) {
                            return 0 < z(t, e).length;
                        };
                    })),
                    contains: l((function(t) {
                        return t = t.replace(c, h), function(e) {
                            return -1 < (e.textContent || E.text(e)).indexOf(t);
                        };
                    })),
                    lang: l((function(i) {
                        return we.test(i || "") || z.error("unsupported lang: " + i), i = i.replace(c, h).toLowerCase(), 
                        function(e) {
                            var t;
                            do {
                                if (t = M ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === i || 0 === t.indexOf(i + "-");
                            } while ((e = e.parentNode) && 1 === e.nodeType);
                            return !1;
                        };
                    })),
                    target: function(e) {
                        var t = w.location && w.location.hash;
                        return t && t.slice(1) === e.id;
                    },
                    root: function(e) {
                        return e === n;
                    },
                    focus: function(e) {
                        return e === function() {
                            try {
                                return S.activeElement;
                            } catch (e) {}
                        }() && S.hasFocus() && !!(e.type || e.href || ~e.tabIndex);
                    },
                    enabled: De(!1),
                    disabled: De(!0),
                    checked: function(e) {
                        return x(e, "input") && !!e.checked || x(e, "option") && !!e.selected;
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                        return !0;
                    },
                    parent: function(e) {
                        return !C.pseudos.empty(e);
                    },
                    header: function(e) {
                        return Ce.test(e.nodeName);
                    },
                    input: function(e) {
                        return Ee.test(e.nodeName);
                    },
                    button: function(e) {
                        return x(e, "input") && "button" === e.type || x(e, "button");
                    },
                    text: function(e) {
                        return x(e, "input") && "text" === e.type && (null == (e = e.getAttribute("type")) || "text" === e.toLowerCase());
                    },
                    first: $e((function() {
                        return [ 0 ];
                    })),
                    last: $e((function(e, t) {
                        return [ t - 1 ];
                    })),
                    eq: $e((function(e, t, i) {
                        return [ i < 0 ? i + t : i ];
                    })),
                    even: $e((function(e, t) {
                        for (var i = 0; i < t; i += 2) e.push(i);
                        return e;
                    })),
                    odd: $e((function(e, t) {
                        for (var i = 1; i < t; i += 2) e.push(i);
                        return e;
                    })),
                    lt: $e((function(e, t, i) {
                        for (var n = i < 0 ? i + t : t < i ? t : i; 0 <= --n; ) e.push(n);
                        return e;
                    })),
                    gt: $e((function(e, t, i) {
                        for (var n = i < 0 ? i + t : i; ++n < t; ) e.push(n);
                        return e;
                    }))
                }
            }).pseudos.nth = C.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) C.pseudos[ne] = function(t) {
                return function(e) {
                    return x(e, "input") && e.type === t;
                };
            }(ne);
            for (ne in {
                submit: !0,
                reset: !0
            }) C.pseudos[ne] = function(t) {
                return function(e) {
                    return (x(e, "input") || x(e, "button")) && e.type === t;
                };
            }(ne);
            function Oe() {}
            function Ne(e, t) {
                var i, n, a, r, s, o, l, d = ce[e + " "];
                if (d) return t ? 0 : d.slice(0);
                for (s = e, o = [], l = C.preFilter; s; ) {
                    for (r in i && !(n = ge.exec(s)) || (n && (s = s.slice(n[0].length) || s), o.push(a = [])), 
                    i = !1, (n = ye.exec(s)) && (i = n.shift(), a.push({
                        value: i,
                        type: n[0].replace(ee, " ")
                    }), s = s.slice(i.length)), C.filter) !(n = Te[r].exec(s)) || l[r] && !(n = l[r](n)) || (i = n.shift(), 
                    a.push({
                        value: i,
                        type: r,
                        matches: n
                    }), s = s.slice(i.length));
                    if (!i) break;
                }
                return t ? s.length : s ? z.error(e) : ce(e, o).slice(0);
            }
            function He(e) {
                for (var t = 0, i = e.length, n = ""; t < i; t++) n += e[t].value;
                return n;
            }
            function je(s, e, t) {
                var o = e.dir, l = e.next, d = l || o, u = t && "parentNode" === d, c = de++;
                return e.first ? function(e, t, i) {
                    for (;e = e[o]; ) if (1 === e.nodeType || u) return s(e, t, i);
                    return !1;
                } : function(e, t, i) {
                    var n, a, r = [ L, c ];
                    if (i) {
                        for (;e = e[o]; ) if ((1 === e.nodeType || u) && s(e, t, i)) return !0;
                    } else for (;e = e[o]; ) if (1 === e.nodeType || u) if (a = e[P] || (e[P] = {}), 
                    l && x(e, l)) e = e[o] || e; else {
                        if ((n = a[d]) && n[0] === L && n[1] === c) return r[2] = n[2];
                        if ((a[d] = r)[2] = s(e, t, i)) return !0;
                    }
                    return !1;
                };
            }
            function qe(a) {
                return 1 < a.length ? function(e, t, i) {
                    for (var n = a.length; n--; ) if (!a[n](e, t, i)) return !1;
                    return !0;
                } : a[0];
            }
            function Be(e, t, i, n, a) {
                for (var r, s = [], o = 0, l = e.length, d = null != t; o < l; o++) !(r = e[o]) || i && !i(r, n, a) || (s.push(r), 
                d && t.push(o));
                return s;
            }
            function Re(h, f, m, v, g, e) {
                return v && !v[P] && (v = Re(v)), g && !g[P] && (g = Re(g, e)), l((function(e, t, i, n) {
                    var a, r, s, o, l = [], d = [], u = t.length, c = e || function(e, t, i) {
                        for (var n = 0, a = t.length; n < a; n++) z(e, t[n], i);
                        return i;
                    }(f || "*", i.nodeType ? [ i ] : i, []), p = !h || !e && f ? c : Be(c, l, h, i, n);
                    if (m ? m(p, o = g || (e ? h : u || v) ? [] : t, i, n) : o = p, v) for (a = Be(o, d), 
                    v(a, [], i, n), r = a.length; r--; ) (s = a[r]) && (o[d[r]] = !(p[d[r]] = s));
                    if (e) {
                        if (g || h) {
                            if (g) {
                                for (a = [], r = o.length; r--; ) (s = o[r]) && a.push(p[r] = s);
                                g(null, o = [], a, n);
                            }
                            for (r = o.length; r--; ) (s = o[r]) && -1 < (a = g ? b.call(e, s) : l[r]) && (e[a] = !(t[a] = s));
                        }
                    } else o = Be(o === t ? o.splice(u, o.length) : o), g ? g(null, t, o, n) : k.apply(t, o);
                }));
            }
            function Ge(v, g) {
                function e(e, t, i, n, a) {
                    var r, s, o, l = 0, d = "0", u = e && [], c = [], p = ae, h = e || b && C.find.TAG("*", a), f = L += null == p ? 1 : Math.random() || .1, m = h.length;
                    for (a && (ae = t == S || t || a); d !== m && null != (r = h[d]); d++) {
                        if (b && r) {
                            for (s = 0, t || r.ownerDocument == S || (Ie(r), i = !M); o = v[s++]; ) if (o(r, t || S, i)) {
                                k.call(n, r);
                                break;
                            }
                            a && (L = f);
                        }
                        y && ((r = !o && r) && l--, e) && u.push(r);
                    }
                    if (l += d, y && d !== l) {
                        for (s = 0; o = g[s++]; ) o(u, c, t, i);
                        if (e) {
                            if (0 < l) for (;d--; ) u[d] || c[d] || (c[d] = Q.call(n));
                            c = Be(c);
                        }
                        k.apply(n, c), a && !e && 0 < c.length && 1 < l + g.length && E.uniqueSort(n);
                    }
                    return a && (L = f, ae = p), u;
                }
                var y = 0 < g.length, b = 0 < v.length;
                return y ? l(e) : e;
            }
            function Fe(e, t) {
                var i, n = [], a = [], r = pe[e + " "];
                if (!r) {
                    for (i = (t = t || Ne(e)).length; i--; ) ((r = function e(t) {
                        for (var n, i, a, r = t.length, s = C.relative[t[0].type], o = s || C.relative[" "], l = s ? 1 : 0, d = je((function(e) {
                            return e === n;
                        }), o, !0), u = je((function(e) {
                            return -1 < b.call(n, e);
                        }), o, !0), c = [ function(e, t, i) {
                            return e = !s && (i || t != ae) || ((n = t).nodeType ? d : u)(e, t, i), n = null, 
                            e;
                        } ]; l < r; l++) if (i = C.relative[t[l].type]) c = [ je(qe(c), i) ]; else {
                            if ((i = C.filter[t[l].type].apply(null, t[l].matches))[P]) {
                                for (a = ++l; a < r && !C.relative[t[a].type]; a++) ;
                                return Re(1 < l && qe(c), 1 < l && He(t.slice(0, l - 1).concat({
                                    value: " " === t[l - 2].type ? "*" : ""
                                })).replace(ee, "$1"), i, l < a && e(t.slice(l, a)), a < r && e(t = t.slice(a)), a < r && He(t));
                            }
                            c.push(i);
                        }
                        return qe(c);
                    }(t[i]))[P] ? n : a).push(r);
                    (r = pe(e, Ge(a, n))).selector = e;
                }
                return r;
            }
            function We(e, t, i, n) {
                var a, r, s, o, l, d = "function" == typeof e && e, u = !n && Ne(e = d.selector || e);
                if (i = i || [], 1 === u.length) {
                    if (2 < (r = u[0] = u[0].slice(0)).length && "ID" === (s = r[0]).type && 9 === t.nodeType && M && C.relative[r[1].type]) {
                        if (!(t = (C.find.ID(s.matches[0].replace(c, h), t) || [])[0])) return i;
                        d && (t = t.parentNode), e = e.slice(r.shift().value.length);
                    }
                    for (a = Te.needsContext.test(e) ? 0 : r.length; a-- && (s = r[a], !C.relative[o = s.type]); ) if ((l = C.find[o]) && (n = l(s.matches[0].replace(c, h), Me.test(r[0].type) && Ae(t.parentNode) || t))) {
                        if (r.splice(a, 1), e = n.length && He(r)) break;
                        return k.apply(i, n), i;
                    }
                }
                return (d || Fe(e, u))(n, t, !M, i, !t || Me.test(e) && Ae(t.parentNode) || t), 
                i;
            }
            Oe.prototype = C.filters = C.pseudos, C.setFilters = new Oe, m.sortStable = P.split("").sort(fe).join("") === P, 
            Ie(), m.sortDetached = ze((function(e) {
                return 1 & e.compareDocumentPosition(S.createElement("fieldset"));
            })), E.find = z, E.expr[":"] = E.expr.pseudos, E.unique = E.uniqueSort, z.compile = Fe, 
            z.select = We, z.setDocument = Ie, z.tokenize = Ne, z.escape = E.escapeSelector, 
            z.getText = E.text, z.isXML = E.isXMLDoc, z.selectors = E.expr, z.support = E.support, 
            z.uniqueSort = E.uniqueSort;
            function Xe(e, t, i) {
                for (var n = [], a = void 0 !== i; (e = e[t]) && 9 !== e.nodeType; ) if (1 === e.nodeType) {
                    if (a && E(e).is(i)) break;
                    n.push(e);
                }
                return n;
            }
            function Ve(e, t) {
                for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e);
                return i;
            }
            var Ye = E.expr.match.needsContext, _e = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
            function Ue(e, i, n) {
                return y(i) ? E.grep(e, (function(e, t) {
                    return !!i.call(e, t, e) !== n;
                })) : i.nodeType ? E.grep(e, (function(e) {
                    return e === i !== n;
                })) : "string" != typeof i ? E.grep(e, (function(e) {
                    return -1 < b.call(i, e) !== n;
                })) : E.filter(i, e, n);
            }
            E.filter = function(e, t, i) {
                var n = t[0];
                return i && (e = ":not(" + e + ")"), 1 === t.length && 1 === n.nodeType ? E.find.matchesSelector(n, e) ? [ n ] : [] : E.find.matches(e, E.grep(t, (function(e) {
                    return 1 === e.nodeType;
                })));
            }, E.fn.extend({
                find: function(e) {
                    var t, i, n = this.length, a = this;
                    if ("string" != typeof e) return this.pushStack(E(e).filter((function() {
                        for (t = 0; t < n; t++) if (E.contains(a[t], this)) return !0;
                    })));
                    for (i = this.pushStack([]), t = 0; t < n; t++) E.find(e, a[t], i);
                    return 1 < n ? E.uniqueSort(i) : i;
                },
                filter: function(e) {
                    return this.pushStack(Ue(this, e || [], !1));
                },
                not: function(e) {
                    return this.pushStack(Ue(this, e || [], !0));
                },
                is: function(e) {
                    return !!Ue(this, "string" == typeof e && Ye.test(e) ? E(e) : e || [], !1).length;
                }
            });
            var Ke, Qe = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, Je = ((E.fn.init = function(e, t, i) {
                if (e) {
                    if (i = i || Ke, "string" != typeof e) return e.nodeType ? (this[0] = e, this.length = 1, 
                    this) : y(e) ? void 0 !== i.ready ? i.ready(e) : e(E) : E.makeArray(e, this);
                    if (!(n = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [ null, e, null ] : Qe.exec(e)) || !n[1] && t) return (!t || t.jquery ? t || i : this.constructor(t)).find(e);
                    if (n[1]) {
                        if (t = t instanceof E ? t[0] : t, E.merge(this, E.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : T, !0)), 
                        _e.test(n[1]) && E.isPlainObject(t)) for (var n in t) y(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                    } else (i = T.getElementById(n[2])) && (this[0] = i, this.length = 1);
                }
                return this;
            }).prototype = E.fn, Ke = E(T), /^(?:parents|prev(?:Until|All))/), Ze = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
            function et(e, t) {
                for (;(e = e[t]) && 1 !== e.nodeType; ) ;
                return e;
            }
            E.fn.extend({
                has: function(e) {
                    var t = E(e, this), i = t.length;
                    return this.filter((function() {
                        for (var e = 0; e < i; e++) if (E.contains(this, t[e])) return !0;
                    }));
                },
                closest: function(e, t) {
                    var i, n = 0, a = this.length, r = [], s = "string" != typeof e && E(e);
                    if (!Ye.test(e)) for (;n < a; n++) for (i = this[n]; i && i !== t; i = i.parentNode) if (i.nodeType < 11 && (s ? -1 < s.index(i) : 1 === i.nodeType && E.find.matchesSelector(i, e))) {
                        r.push(i);
                        break;
                    }
                    return this.pushStack(1 < r.length ? E.uniqueSort(r) : r);
                },
                index: function(e) {
                    return e ? "string" == typeof e ? b.call(E(e), this[0]) : b.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
                },
                add: function(e, t) {
                    return this.pushStack(E.uniqueSort(E.merge(this.get(), E(e, t))));
                },
                addBack: function(e) {
                    return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
                }
            }), E.each({
                parent: function(e) {
                    e = e.parentNode;
                    return e && 11 !== e.nodeType ? e : null;
                },
                parents: function(e) {
                    return Xe(e, "parentNode");
                },
                parentsUntil: function(e, t, i) {
                    return Xe(e, "parentNode", i);
                },
                next: function(e) {
                    return et(e, "nextSibling");
                },
                prev: function(e) {
                    return et(e, "previousSibling");
                },
                nextAll: function(e) {
                    return Xe(e, "nextSibling");
                },
                prevAll: function(e) {
                    return Xe(e, "previousSibling");
                },
                nextUntil: function(e, t, i) {
                    return Xe(e, "nextSibling", i);
                },
                prevUntil: function(e, t, i) {
                    return Xe(e, "previousSibling", i);
                },
                siblings: function(e) {
                    return Ve((e.parentNode || {}).firstChild, e);
                },
                children: function(e) {
                    return Ve(e.firstChild);
                },
                contents: function(e) {
                    return null != e.contentDocument && j(e.contentDocument) ? e.contentDocument : (x(e, "template") && (e = e.content || e), 
                    E.merge([], e.childNodes));
                }
            }, (function(n, a) {
                E.fn[n] = function(e, t) {
                    var i = E.map(this, a, e);
                    return (t = "Until" !== n.slice(-5) ? e : t) && "string" == typeof t && (i = E.filter(t, i)), 
                    1 < this.length && (Ze[n] || E.uniqueSort(i), Je.test(n)) && i.reverse(), this.pushStack(i);
                };
            }));
            var D = /[^\x20\t\r\n\f]+/g;
            function tt(e) {
                return e;
            }
            function it(e) {
                throw e;
            }
            function nt(e, t, i, n) {
                var a;
                try {
                    e && y(a = e.promise) ? a.call(e).done(t).fail(i) : e && y(a = e.then) ? a.call(e, t, i) : t.apply(void 0, [ e ].slice(n));
                } catch (e) {
                    i.apply(void 0, [ e ]);
                }
            }
            E.Callbacks = function(n) {
                var e, i;
                n = "string" == typeof n ? (e = n, i = {}, E.each(e.match(D) || [], (function(e, t) {
                    i[t] = !0;
                })), i) : E.extend({}, n);
                function a() {
                    for (o = o || n.once, s = r = !0; d.length; u = -1) for (t = d.shift(); ++u < l.length; ) !1 === l[u].apply(t[0], t[1]) && n.stopOnFalse && (u = l.length, 
                    t = !1);
                    n.memory || (t = !1), r = !1, o && (l = t ? [] : "");
                }
                var r, t, s, o, l = [], d = [], u = -1, c = {
                    add: function() {
                        return l && (t && !r && (u = l.length - 1, d.push(t)), function i(e) {
                            E.each(e, (function(e, t) {
                                y(t) ? n.unique && c.has(t) || l.push(t) : t && t.length && "string" !== _(t) && i(t);
                            }));
                        }(arguments), t) && !r && a(), this;
                    },
                    remove: function() {
                        return E.each(arguments, (function(e, t) {
                            for (var i; -1 < (i = E.inArray(t, l, i)); ) l.splice(i, 1), i <= u && u--;
                        })), this;
                    },
                    has: function(e) {
                        return e ? -1 < E.inArray(e, l) : 0 < l.length;
                    },
                    empty: function() {
                        return l = l && [], this;
                    },
                    disable: function() {
                        return o = d = [], l = t = "", this;
                    },
                    disabled: function() {
                        return !l;
                    },
                    lock: function() {
                        return o = d = [], t || r || (l = t = ""), this;
                    },
                    locked: function() {
                        return !!o;
                    },
                    fireWith: function(e, t) {
                        return o || (t = [ e, (t = t || []).slice ? t.slice() : t ], d.push(t), r) || a(), 
                        this;
                    },
                    fire: function() {
                        return c.fireWith(this, arguments), this;
                    },
                    fired: function() {
                        return !!s;
                    }
                };
                return c;
            }, E.extend({
                Deferred: function(e) {
                    var r = [ [ "notify", "progress", E.Callbacks("memory"), E.Callbacks("memory"), 2 ], [ "resolve", "done", E.Callbacks("once memory"), E.Callbacks("once memory"), 0, "resolved" ], [ "reject", "fail", E.Callbacks("once memory"), E.Callbacks("once memory"), 1, "rejected" ] ], a = "pending", s = {
                        state: function() {
                            return a;
                        },
                        always: function() {
                            return o.done(arguments).fail(arguments), this;
                        },
                        catch: function(e) {
                            return s.then(null, e);
                        },
                        pipe: function() {
                            var a = arguments;
                            return E.Deferred((function(n) {
                                E.each(r, (function(e, t) {
                                    var i = y(a[t[4]]) && a[t[4]];
                                    o[t[1]]((function() {
                                        var e = i && i.apply(this, arguments);
                                        e && y(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[t[0] + "With"](this, i ? [ e ] : arguments);
                                    }));
                                })), a = null;
                            })).promise();
                        },
                        then: function(t, i, n) {
                            var l = 0;
                            function d(a, r, s, o) {
                                return function() {
                                    function e() {
                                        var e, t;
                                        if (!(a < l)) {
                                            if ((e = s.apply(i, n)) === r.promise()) throw new TypeError("Thenable self-resolution");
                                            t = e && ("object" == typeof e || "function" == typeof e) && e.then, y(t) ? o ? t.call(e, d(l, r, tt, o), d(l, r, it, o)) : (l++, 
                                            t.call(e, d(l, r, tt, o), d(l, r, it, o), d(l, r, tt, r.notifyWith))) : (s !== tt && (i = void 0, 
                                            n = [ e ]), (o || r.resolveWith)(i, n));
                                        }
                                    }
                                    var i = this, n = arguments, t = o ? e : function() {
                                        try {
                                            e();
                                        } catch (e) {
                                            E.Deferred.exceptionHook && E.Deferred.exceptionHook(e, t.error), l <= a + 1 && (s !== it && (i = void 0, 
                                            n = [ e ]), r.rejectWith(i, n));
                                        }
                                    };
                                    a ? t() : (E.Deferred.getErrorHook ? t.error = E.Deferred.getErrorHook() : E.Deferred.getStackHook && (t.error = E.Deferred.getStackHook()), 
                                    w.setTimeout(t));
                                };
                            }
                            return E.Deferred((function(e) {
                                r[0][3].add(d(0, e, y(n) ? n : tt, e.notifyWith)), r[1][3].add(d(0, e, y(t) ? t : tt)), 
                                r[2][3].add(d(0, e, y(i) ? i : it));
                            })).promise();
                        },
                        promise: function(e) {
                            return null != e ? E.extend(e, s) : s;
                        }
                    }, o = {};
                    return E.each(r, (function(e, t) {
                        var i = t[2], n = t[5];
                        s[t[1]] = i.add, n && i.add((function() {
                            a = n;
                        }), r[3 - e][2].disable, r[3 - e][3].disable, r[0][2].lock, r[0][3].lock), i.add(t[3].fire), 
                        o[t[0]] = function() {
                            return o[t[0] + "With"](this === o ? void 0 : this, arguments), this;
                        }, o[t[0] + "With"] = i.fireWith;
                    })), s.promise(o), e && e.call(o, o), o;
                },
                when: function(e) {
                    function t(t) {
                        return function(e) {
                            a[t] = this, r[t] = 1 < arguments.length ? o.call(arguments) : e, --i || s.resolveWith(a, r);
                        };
                    }
                    var i = arguments.length, n = i, a = Array(n), r = o.call(arguments), s = E.Deferred();
                    if (i <= 1 && (nt(e, s.done(t(n)).resolve, s.reject, !i), "pending" === s.state() || y(r[n] && r[n].then))) return s.then();
                    for (;n--; ) nt(r[n], t(n), s.reject);
                    return s.promise();
                }
            });
            var at = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/, rt = (E.Deferred.exceptionHook = function(e, t) {
                w.console && w.console.warn && e && at.test(e.name) && w.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
            }, E.readyException = function(e) {
                w.setTimeout((function() {
                    throw e;
                }));
            }, E.Deferred());
            function st() {
                T.removeEventListener("DOMContentLoaded", st), w.removeEventListener("load", st), 
                E.ready();
            }
            E.fn.ready = function(e) {
                return rt.then(e).catch((function(e) {
                    E.readyException(e);
                })), this;
            }, E.extend({
                isReady: !1,
                readyWait: 1,
                ready: function(e) {
                    (!0 === e ? --E.readyWait : E.isReady) || (E.isReady = !0) !== e && 0 < --E.readyWait || rt.resolveWith(T, [ E ]);
                }
            }), E.ready.then = rt.then, "complete" === T.readyState || "loading" !== T.readyState && !T.documentElement.doScroll ? w.setTimeout(E.ready) : (T.addEventListener("DOMContentLoaded", st), 
            w.addEventListener("load", st));
            function u(e, t, i, n, a, r, s) {
                var o = 0, l = e.length, d = null == i;
                if ("object" === _(i)) for (o in a = !0, i) u(e, t, o, i[o], !0, r, s); else if (void 0 !== n && (a = !0, 
                y(n) || (s = !0), t = d ? s ? (t.call(e, n), null) : (d = t, function(e, t, i) {
                    return d.call(E(e), i);
                }) : t)) for (;o < l; o++) t(e[o], i, s ? n : n.call(e[o], o, t(e[o], i)));
                return a ? e : d ? t.call(e) : l ? t(e[0], i) : r;
            }
            var ot = /^-ms-/, lt = /-([a-z])/g;
            function dt(e, t) {
                return t.toUpperCase();
            }
            function $(e) {
                return e.replace(ot, "ms-").replace(lt, dt);
            }
            function ut(e) {
                return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
            }
            function ct() {
                this.expando = E.expando + ct.uid++;
            }
            ct.uid = 1, ct.prototype = {
                cache: function(e) {
                    var t = e[this.expando];
                    return t || (t = {}, ut(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                        value: t,
                        configurable: !0
                    }))), t;
                },
                set: function(e, t, i) {
                    var n, a = this.cache(e);
                    if ("string" == typeof t) a[$(t)] = i; else for (n in t) a[$(n)] = t[n];
                    return a;
                },
                get: function(e, t) {
                    return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][$(t)];
                },
                access: function(e, t, i) {
                    return void 0 === t || t && "string" == typeof t && void 0 === i ? this.get(e, t) : (this.set(e, t, i), 
                    void 0 !== i ? i : t);
                },
                remove: function(e, t) {
                    var i, n = e[this.expando];
                    if (void 0 !== n) {
                        if (void 0 !== t) {
                            i = (t = Array.isArray(t) ? t.map($) : (t = $(t)) in n ? [ t ] : t.match(D) || []).length;
                            for (;i--; ) delete n[t[i]];
                        }
                        void 0 !== t && !E.isEmptyObject(n) || (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
                    }
                },
                hasData: function(e) {
                    e = e[this.expando];
                    return void 0 !== e && !E.isEmptyObject(e);
                }
            };
            var g = new ct, d = new ct, pt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, ht = /[A-Z]/g;
            function ft(e, t, i) {
                var n, a;
                if (void 0 === i && 1 === e.nodeType) if (n = "data-" + t.replace(ht, "-$&").toLowerCase(), 
                "string" == typeof (i = e.getAttribute(n))) {
                    try {
                        i = "true" === (a = i) || "false" !== a && ("null" === a ? null : a === +a + "" ? +a : pt.test(a) ? JSON.parse(a) : a);
                    } catch (e) {}
                    d.set(e, t, i);
                } else i = void 0;
                return i;
            }
            E.extend({
                hasData: function(e) {
                    return d.hasData(e) || g.hasData(e);
                },
                data: function(e, t, i) {
                    return d.access(e, t, i);
                },
                removeData: function(e, t) {
                    d.remove(e, t);
                },
                _data: function(e, t, i) {
                    return g.access(e, t, i);
                },
                _removeData: function(e, t) {
                    g.remove(e, t);
                }
            }), E.fn.extend({
                data: function(i, e) {
                    var t, n, a, r = this[0], s = r && r.attributes;
                    if (void 0 !== i) return "object" == typeof i ? this.each((function() {
                        d.set(this, i);
                    })) : u(this, (function(e) {
                        var t;
                        if (r && void 0 === e) return void 0 !== (t = d.get(r, i)) || void 0 !== (t = ft(r, i)) ? t : void 0;
                        this.each((function() {
                            d.set(this, i, e);
                        }));
                    }), null, e, 1 < arguments.length, null, !0);
                    if (this.length && (a = d.get(r), 1 === r.nodeType) && !g.get(r, "hasDataAttrs")) {
                        for (t = s.length; t--; ) s[t] && 0 === (n = s[t].name).indexOf("data-") && (n = $(n.slice(5)), 
                        ft(r, n, a[n]));
                        g.set(r, "hasDataAttrs", !0);
                    }
                    return a;
                },
                removeData: function(e) {
                    return this.each((function() {
                        d.remove(this, e);
                    }));
                }
            }), E.extend({
                queue: function(e, t, i) {
                    var n;
                    if (e) return n = g.get(e, t = (t || "fx") + "queue"), i && (!n || Array.isArray(i) ? n = g.access(e, t, E.makeArray(i)) : n.push(i)), 
                    n || [];
                },
                dequeue: function(e, t) {
                    t = t || "fx";
                    var i = E.queue(e, t), n = i.length, a = i.shift(), r = E._queueHooks(e, t);
                    "inprogress" === a && (a = i.shift(), n--), a && ("fx" === t && i.unshift("inprogress"), 
                    delete r.stop, a.call(e, (function() {
                        E.dequeue(e, t);
                    }), r)), !n && r && r.empty.fire();
                },
                _queueHooks: function(e, t) {
                    var i = t + "queueHooks";
                    return g.get(e, i) || g.access(e, i, {
                        empty: E.Callbacks("once memory").add((function() {
                            g.remove(e, [ t + "queue", i ]);
                        }))
                    });
                }
            }), E.fn.extend({
                queue: function(t, i) {
                    var e = 2;
                    return "string" != typeof t && (i = t, t = "fx", e--), arguments.length < e ? E.queue(this[0], t) : void 0 === i ? this : this.each((function() {
                        var e = E.queue(this, t, i);
                        E._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && E.dequeue(this, t);
                    }));
                },
                dequeue: function(e) {
                    return this.each((function() {
                        E.dequeue(this, e);
                    }));
                },
                clearQueue: function(e) {
                    return this.queue(e || "fx", []);
                },
                promise: function(e, t) {
                    function i() {
                        --a || r.resolveWith(s, [ s ]);
                    }
                    var n, a = 1, r = E.Deferred(), s = this, o = this.length;
                    for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; o--; ) (n = g.get(s[o], e + "queueHooks")) && n.empty && (a++, 
                    n.empty.add(i));
                    return i(), r.promise(t);
                }
            });
            function mt(e, t) {
                return "none" === (e = t || e).style.display || "" === e.style.display && bt(e) && "none" === E.css(e, "display");
            }
            e = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
            var vt = new RegExp("^(?:([+-])=|)(" + e + ")([a-z%]*)$", "i"), gt = [ "Top", "Right", "Bottom", "Left" ], yt = T.documentElement, bt = function(e) {
                return E.contains(e.ownerDocument, e);
            }, xt = {
                composed: !0
            };
            yt.getRootNode && (bt = function(e) {
                return E.contains(e.ownerDocument, e) || e.getRootNode(xt) === e.ownerDocument;
            });
            function wt(e, t, i, n) {
                var a, r, s = 20, o = n ? function() {
                    return n.cur();
                } : function() {
                    return E.css(e, t, "");
                }, l = o(), d = i && i[3] || (E.cssNumber[t] ? "" : "px"), u = e.nodeType && (E.cssNumber[t] || "px" !== d && +l) && vt.exec(E.css(e, t));
                if (u && u[3] !== d) {
                    for (d = d || u[3], u = +(l /= 2) || 1; s--; ) E.style(e, t, u + d), (1 - r) * (1 - (r = o() / l || .5)) <= 0 && (s = 0), 
                    u /= r;
                    E.style(e, t, (u *= 2) + d), i = i || [];
                }
                return i && (u = +u || +l || 0, a = i[1] ? u + (i[1] + 1) * i[2] : +i[2], n) && (n.unit = d, 
                n.start = u, n.end = a), a;
            }
            var Tt = {};
            function Et(e, t) {
                for (var i, n, a, r, s, o = [], l = 0, d = e.length; l < d; l++) (n = e[l]).style && (i = n.style.display, 
                t ? ("none" === i && (o[l] = g.get(n, "display") || null, o[l] || (n.style.display = "")), 
                "" === n.style.display && mt(n) && (o[l] = (s = r = void 0, r = (a = n).ownerDocument, 
                a = a.nodeName, (s = Tt[a]) || (r = r.body.appendChild(r.createElement(a)), s = E.css(r, "display"), 
                r.parentNode.removeChild(r), Tt[a] = s = "none" === s ? "block" : s), s))) : "none" !== i && (o[l] = "none", 
                g.set(n, "display", i)));
                for (l = 0; l < d; l++) null != o[l] && (e[l].style.display = o[l]);
                return e;
            }
            E.fn.extend({
                show: function() {
                    return Et(this, !0);
                },
                hide: function() {
                    return Et(this);
                },
                toggle: function(e) {
                    return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function() {
                        mt(this) ? E(this).show() : E(this).hide();
                    }));
                }
            });
            var Ct = /^(?:checkbox|radio)$/i, St = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, Mt = /^$|^module$|\/(?:java|ecma)script/i, f = (r = T.createDocumentFragment().appendChild(T.createElement("div")), 
            (s = T.createElement("input")).setAttribute("type", "radio"), s.setAttribute("checked", "checked"), 
            s.setAttribute("name", "t"), r.appendChild(s), m.checkClone = r.cloneNode(!0).cloneNode(!0).lastChild.checked, 
            r.innerHTML = "<textarea>x</textarea>", m.noCloneChecked = !!r.cloneNode(!0).lastChild.defaultValue, 
            r.innerHTML = "<option></option>", m.option = !!r.lastChild, {
                thead: [ 1, "<table>", "</table>" ],
                col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
                tr: [ 2, "<table><tbody>", "</tbody></table>" ],
                td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
                _default: [ 0, "", "" ]
            });
            function v(e, t) {
                var i = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
                return void 0 === t || t && x(e, t) ? E.merge([ e ], i) : i;
            }
            function kt(e, t) {
                for (var i = 0, n = e.length; i < n; i++) g.set(e[i], "globalEval", !t || g.get(t[i], "globalEval"));
            }
            f.tbody = f.tfoot = f.colgroup = f.caption = f.thead, f.th = f.td, m.option || (f.optgroup = f.option = [ 1, "<select multiple='multiple'>", "</select>" ]);
            var Pt = /<|&#?\w+;/;
            function Lt(e, t, i, n, a) {
                for (var r, s, o, l, d, u = t.createDocumentFragment(), c = [], p = 0, h = e.length; p < h; p++) if ((r = e[p]) || 0 === r) if ("object" === _(r)) E.merge(c, r.nodeType ? [ r ] : r); else if (Pt.test(r)) {
                    for (s = s || u.appendChild(t.createElement("div")), o = (St.exec(r) || [ "", "" ])[1].toLowerCase(), 
                    o = f[o] || f._default, s.innerHTML = o[1] + E.htmlPrefilter(r) + o[2], d = o[0]; d--; ) s = s.lastChild;
                    E.merge(c, s.childNodes), (s = u.firstChild).textContent = "";
                } else c.push(t.createTextNode(r));
                for (u.textContent = "", p = 0; r = c[p++]; ) if (n && -1 < E.inArray(r, n)) a && a.push(r); else if (l = bt(r), 
                s = v(u.appendChild(r), "script"), l && kt(s), i) for (d = 0; r = s[d++]; ) Mt.test(r.type || "") && i.push(r);
                return u;
            }
            var zt = /^([^.]*)(?:\.(.+)|)/;
            function Dt() {
                return !0;
            }
            function $t() {
                return !1;
            }
            function At(e, t, i, n, a, r) {
                var s, o;
                if ("object" == typeof t) {
                    for (o in "string" != typeof i && (n = n || i, i = void 0), t) At(e, o, i, n, t[o], r);
                    return e;
                }
                if (null == n && null == a ? (a = i, n = i = void 0) : null == a && ("string" == typeof i ? (a = n, 
                n = void 0) : (a = n, n = i, i = void 0)), !1 === a) a = $t; else if (!a) return e;
                return 1 === r && (s = a, (a = function(e) {
                    return E().off(e), s.apply(this, arguments);
                }).guid = s.guid || (s.guid = E.guid++)), e.each((function() {
                    E.event.add(this, t, a, n, i);
                }));
            }
            function It(e, n, t) {
                t ? (g.set(e, n, !1), E.event.add(e, n, {
                    namespace: !1,
                    handler: function(e) {
                        var t, i = g.get(this, n);
                        if (1 & e.isTrigger && this[n]) {
                            if (i) (E.event.special[n] || {}).delegateType && e.stopPropagation(); else if (i = o.call(arguments), 
                            g.set(this, n, i), this[n](), t = g.get(this, n), g.set(this, n, !1), i !== t) return e.stopImmediatePropagation(), 
                            e.preventDefault(), t;
                        } else i && (g.set(this, n, E.event.trigger(i[0], i.slice(1), this)), e.stopPropagation(), 
                        e.isImmediatePropagationStopped = Dt);
                    }
                })) : void 0 === g.get(e, n) && E.event.add(e, n, Dt);
            }
            E.event = {
                global: {},
                add: function(t, e, i, n, a) {
                    var r, s, o, l, d, u, c, p, h, f = g.get(t);
                    if (ut(t)) for (i.handler && (i = (r = i).handler, a = r.selector), a && E.find.matchesSelector(yt, a), 
                    i.guid || (i.guid = E.guid++), o = (o = f.events) || (f.events = Object.create(null)), 
                    s = (s = f.handle) || (f.handle = function(e) {
                        return void 0 !== E && E.event.triggered !== e.type ? E.event.dispatch.apply(t, arguments) : void 0;
                    }), l = (e = (e || "").match(D) || [ "" ]).length; l--; ) c = h = (p = zt.exec(e[l]) || [])[1], 
                    p = (p[2] || "").split(".").sort(), c && (d = E.event.special[c] || {}, c = (a ? d.delegateType : d.bindType) || c, 
                    d = E.event.special[c] || {}, h = E.extend({
                        type: c,
                        origType: h,
                        data: n,
                        handler: i,
                        guid: i.guid,
                        selector: a,
                        needsContext: a && E.expr.match.needsContext.test(a),
                        namespace: p.join(".")
                    }, r), (u = o[c]) || ((u = o[c] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(t, n, p, s)) || t.addEventListener && t.addEventListener(c, s), 
                    d.add && (d.add.call(t, h), h.handler.guid || (h.handler.guid = i.guid)), a ? u.splice(u.delegateCount++, 0, h) : u.push(h), 
                    E.event.global[c] = !0);
                },
                remove: function(e, t, i, n, a) {
                    var r, s, o, l, d, u, c, p, h, f, m, v = g.hasData(e) && g.get(e);
                    if (v && (l = v.events)) {
                        for (d = (t = (t || "").match(D) || [ "" ]).length; d--; ) if (h = m = (o = zt.exec(t[d]) || [])[1], 
                        f = (o[2] || "").split(".").sort(), h) {
                            for (c = E.event.special[h] || {}, p = l[h = (n ? c.delegateType : c.bindType) || h] || [], 
                            o = o[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = p.length; r--; ) u = p[r], 
                            !a && m !== u.origType || i && i.guid !== u.guid || o && !o.test(u.namespace) || n && n !== u.selector && ("**" !== n || !u.selector) || (p.splice(r, 1), 
                            u.selector && p.delegateCount--, c.remove && c.remove.call(e, u));
                            s && !p.length && (c.teardown && !1 !== c.teardown.call(e, f, v.handle) || E.removeEvent(e, h, v.handle), 
                            delete l[h]);
                        } else for (h in l) E.event.remove(e, h + t[d], i, n, !0);
                        E.isEmptyObject(l) && g.remove(e, "handle events");
                    }
                },
                dispatch: function(e) {
                    var t, i, n, a, r, s = new Array(arguments.length), o = E.event.fix(e), l = (e = (g.get(this, "events") || Object.create(null))[o.type] || [], 
                    E.event.special[o.type] || {});
                    for (s[0] = o, t = 1; t < arguments.length; t++) s[t] = arguments[t];
                    if (o.delegateTarget = this, !l.preDispatch || !1 !== l.preDispatch.call(this, o)) {
                        for (r = E.event.handlers.call(this, o, e), t = 0; (n = r[t++]) && !o.isPropagationStopped(); ) for (o.currentTarget = n.elem, 
                        i = 0; (a = n.handlers[i++]) && !o.isImmediatePropagationStopped(); ) o.rnamespace && !1 !== a.namespace && !o.rnamespace.test(a.namespace) || (o.handleObj = a, 
                        o.data = a.data, void 0 !== (a = ((E.event.special[a.origType] || {}).handle || a.handler).apply(n.elem, s)) && !1 === (o.result = a) && (o.preventDefault(), 
                        o.stopPropagation()));
                        return l.postDispatch && l.postDispatch.call(this, o), o.result;
                    }
                },
                handlers: function(e, t) {
                    var i, n, a, r, s, o = [], l = t.delegateCount, d = e.target;
                    if (l && d.nodeType && !("click" === e.type && 1 <= e.button)) for (;d !== this; d = d.parentNode || this) if (1 === d.nodeType && ("click" !== e.type || !0 !== d.disabled)) {
                        for (r = [], s = {}, i = 0; i < l; i++) void 0 === s[a = (n = t[i]).selector + " "] && (s[a] = n.needsContext ? -1 < E(a, this).index(d) : E.find(a, this, null, [ d ]).length), 
                        s[a] && r.push(n);
                        r.length && o.push({
                            elem: d,
                            handlers: r
                        });
                    }
                    return d = this, l < t.length && o.push({
                        elem: d,
                        handlers: t.slice(l)
                    }), o;
                },
                addProp: function(t, e) {
                    Object.defineProperty(E.Event.prototype, t, {
                        enumerable: !0,
                        configurable: !0,
                        get: y(e) ? function() {
                            if (this.originalEvent) return e(this.originalEvent);
                        } : function() {
                            if (this.originalEvent) return this.originalEvent[t];
                        },
                        set: function(e) {
                            Object.defineProperty(this, t, {
                                enumerable: !0,
                                configurable: !0,
                                writable: !0,
                                value: e
                            });
                        }
                    });
                },
                fix: function(e) {
                    return e[E.expando] ? e : new E.Event(e);
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    click: {
                        setup: function(e) {
                            e = this || e;
                            return Ct.test(e.type) && e.click && x(e, "input") && It(e, "click", !0), !1;
                        },
                        trigger: function(e) {
                            e = this || e;
                            return Ct.test(e.type) && e.click && x(e, "input") && It(e, "click"), !0;
                        },
                        _default: function(e) {
                            e = e.target;
                            return Ct.test(e.type) && e.click && x(e, "input") && g.get(e, "click") || x(e, "a");
                        }
                    },
                    beforeunload: {
                        postDispatch: function(e) {
                            void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                        }
                    }
                }
            }, E.removeEvent = function(e, t, i) {
                e.removeEventListener && e.removeEventListener(t, i);
            }, E.Event = function(e, t) {
                if (!(this instanceof E.Event)) return new E.Event(e, t);
                e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Dt : $t, 
                this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, 
                this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, 
                t && E.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[E.expando] = !0;
            }, E.Event.prototype = {
                constructor: E.Event,
                isDefaultPrevented: $t,
                isPropagationStopped: $t,
                isImmediatePropagationStopped: $t,
                isSimulated: !1,
                preventDefault: function() {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = Dt, e && !this.isSimulated && e.preventDefault();
                },
                stopPropagation: function() {
                    var e = this.originalEvent;
                    this.isPropagationStopped = Dt, e && !this.isSimulated && e.stopPropagation();
                },
                stopImmediatePropagation: function() {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = Dt, e && !this.isSimulated && e.stopImmediatePropagation(), 
                    this.stopPropagation();
                }
            }, E.each({
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: !0
            }, E.event.addProp), E.each({
                focus: "focusin",
                blur: "focusout"
            }, (function(n, a) {
                function r(e) {
                    var t, i;
                    T.documentMode ? (t = g.get(this, "handle"), (i = E.event.fix(e)).type = "focusin" === e.type ? "focus" : "blur", 
                    i.isSimulated = !0, t(e), i.target === i.currentTarget && t(i)) : E.event.simulate(a, e.target, E.event.fix(e));
                }
                E.event.special[n] = {
                    setup: function() {
                        var e;
                        if (It(this, n, !0), !T.documentMode) return !1;
                        (e = g.get(this, a)) || this.addEventListener(a, r), g.set(this, a, (e || 0) + 1);
                    },
                    trigger: function() {
                        return It(this, n), !0;
                    },
                    teardown: function() {
                        var e;
                        if (!T.documentMode) return !1;
                        (e = g.get(this, a) - 1) ? g.set(this, a, e) : (this.removeEventListener(a, r), 
                        g.remove(this, a));
                    },
                    _default: function(e) {
                        return g.get(e.target, n);
                    },
                    delegateType: a
                }, E.event.special[a] = {
                    setup: function() {
                        var e = this.ownerDocument || this.document || this, t = T.documentMode ? this : e, i = g.get(t, a);
                        i || (T.documentMode ? this.addEventListener(a, r) : e.addEventListener(n, r, !0)), 
                        g.set(t, a, (i || 0) + 1);
                    },
                    teardown: function() {
                        var e = this.ownerDocument || this.document || this, t = T.documentMode ? this : e, i = g.get(t, a) - 1;
                        i ? g.set(t, a, i) : (T.documentMode ? this.removeEventListener(a, r) : e.removeEventListener(n, r, !0), 
                        g.remove(t, a));
                    }
                };
            })), E.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, (function(e, a) {
                E.event.special[e] = {
                    delegateType: a,
                    bindType: a,
                    handle: function(e) {
                        var t, i = e.relatedTarget, n = e.handleObj;
                        return i && (i === this || E.contains(this, i)) || (e.type = n.origType, t = n.handler.apply(this, arguments), 
                        e.type = a), t;
                    }
                };
            })), E.fn.extend({
                on: function(e, t, i, n) {
                    return At(this, e, t, i, n);
                },
                one: function(e, t, i, n) {
                    return At(this, e, t, i, n, 1);
                },
                off: function(e, t, i) {
                    var n, a;
                    if (e && e.preventDefault && e.handleObj) n = e.handleObj, E(e.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler); else {
                        if ("object" != typeof e) return !1 !== t && "function" != typeof t || (i = t, t = void 0), 
                        !1 === i && (i = $t), this.each((function() {
                            E.event.remove(this, e, i, t);
                        }));
                        for (a in e) this.off(a, t, e[a]);
                    }
                    return this;
                }
            });
            var Ot = /<script|<style|<link/i, Nt = /checked\s*(?:[^=]|=\s*.checked.)/i, Ht = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
            function jt(e, t) {
                return x(e, "table") && x(11 !== t.nodeType ? t : t.firstChild, "tr") && E(e).children("tbody")[0] || e;
            }
            function qt(e) {
                return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
            }
            function Bt(e) {
                return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), 
                e;
            }
            function Rt(e, t) {
                var i, n, a, r;
                if (1 === t.nodeType) {
                    if (g.hasData(e) && (r = g.get(e).events)) for (a in g.remove(t, "handle events"), 
                    r) for (i = 0, n = r[a].length; i < n; i++) E.event.add(t, a, r[a][i]);
                    d.hasData(e) && (e = d.access(e), e = E.extend({}, e), d.set(t, e));
                }
            }
            function Gt(i, n, a, r) {
                n = q(n);
                var e, t, s, o, l, d, u = 0, c = i.length, p = c - 1, h = n[0], f = y(h);
                if (f || 1 < c && "string" == typeof h && !m.checkClone && Nt.test(h)) return i.each((function(e) {
                    var t = i.eq(e);
                    f && (n[0] = h.call(this, e, t.html())), Gt(t, n, a, r);
                }));
                if (c && (t = (e = Lt(n, i[0].ownerDocument, !1, i, r)).firstChild, 1 === e.childNodes.length && (e = t), 
                t || r)) {
                    for (o = (s = E.map(v(e, "script"), qt)).length; u < c; u++) l = e, u !== p && (l = E.clone(l, !0, !0), 
                    o) && E.merge(s, v(l, "script")), a.call(i[u], l, u);
                    if (o) for (d = s[s.length - 1].ownerDocument, E.map(s, Bt), u = 0; u < o; u++) l = s[u], 
                    Mt.test(l.type || "") && !g.access(l, "globalEval") && E.contains(d, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? E._evalUrl && !l.noModule && E._evalUrl(l.src, {
                        nonce: l.nonce || l.getAttribute("nonce")
                    }, d) : Y(l.textContent.replace(Ht, ""), l, d));
                }
                return i;
            }
            function Ft(e, t, i) {
                for (var n, a = t ? E.filter(t, e) : e, r = 0; null != (n = a[r]); r++) i || 1 !== n.nodeType || E.cleanData(v(n)), 
                n.parentNode && (i && bt(n) && kt(v(n, "script")), n.parentNode.removeChild(n));
                return e;
            }
            E.extend({
                htmlPrefilter: function(e) {
                    return e;
                },
                clone: function(e, t, i) {
                    var n, a, r, s, o, l, d, u = e.cloneNode(!0), c = bt(e);
                    if (!(m.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || E.isXMLDoc(e))) for (s = v(u), 
                    n = 0, a = (r = v(e)).length; n < a; n++) o = r[n], l = s[n], d = void 0, "input" === (d = l.nodeName.toLowerCase()) && Ct.test(o.type) ? l.checked = o.checked : "input" !== d && "textarea" !== d || (l.defaultValue = o.defaultValue);
                    if (t) if (i) for (r = r || v(e), s = s || v(u), n = 0, a = r.length; n < a; n++) Rt(r[n], s[n]); else Rt(e, u);
                    return 0 < (s = v(u, "script")).length && kt(s, !c && v(e, "script")), u;
                },
                cleanData: function(e) {
                    for (var t, i, n, a = E.event.special, r = 0; void 0 !== (i = e[r]); r++) if (ut(i)) {
                        if (t = i[g.expando]) {
                            if (t.events) for (n in t.events) a[n] ? E.event.remove(i, n) : E.removeEvent(i, n, t.handle);
                            i[g.expando] = void 0;
                        }
                        i[d.expando] && (i[d.expando] = void 0);
                    }
                }
            }), E.fn.extend({
                detach: function(e) {
                    return Ft(this, e, !0);
                },
                remove: function(e) {
                    return Ft(this, e);
                },
                text: function(e) {
                    return u(this, (function(e) {
                        return void 0 === e ? E.text(this) : this.empty().each((function() {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
                        }));
                    }), null, e, arguments.length);
                },
                append: function() {
                    return Gt(this, arguments, (function(e) {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || jt(this, e).appendChild(e);
                    }));
                },
                prepend: function() {
                    return Gt(this, arguments, (function(e) {
                        var t;
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (t = jt(this, e)).insertBefore(e, t.firstChild);
                    }));
                },
                before: function() {
                    return Gt(this, arguments, (function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this);
                    }));
                },
                after: function() {
                    return Gt(this, arguments, (function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
                    }));
                },
                empty: function() {
                    for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (E.cleanData(v(e, !1)), 
                    e.textContent = "");
                    return this;
                },
                clone: function(e, t) {
                    return e = null != e && e, t = null == t ? e : t, this.map((function() {
                        return E.clone(this, e, t);
                    }));
                },
                html: function(e) {
                    return u(this, (function(e) {
                        var t = this[0] || {}, i = 0, n = this.length;
                        if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                        if ("string" == typeof e && !Ot.test(e) && !f[(St.exec(e) || [ "", "" ])[1].toLowerCase()]) {
                            e = E.htmlPrefilter(e);
                            try {
                                for (;i < n; i++) 1 === (t = this[i] || {}).nodeType && (E.cleanData(v(t, !1)), 
                                t.innerHTML = e);
                                t = 0;
                            } catch (e) {}
                        }
                        t && this.empty().append(e);
                    }), null, e, arguments.length);
                },
                replaceWith: function() {
                    var i = [];
                    return Gt(this, arguments, (function(e) {
                        var t = this.parentNode;
                        E.inArray(this, i) < 0 && (E.cleanData(v(this)), t) && t.replaceChild(e, this);
                    }), i);
                }
            }), E.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, (function(e, s) {
                E.fn[e] = function(e) {
                    for (var t, i = [], n = E(e), a = n.length - 1, r = 0; r <= a; r++) t = r === a ? this : this.clone(!0), 
                    E(n[r])[s](t), B.apply(i, t.get());
                    return this.pushStack(i);
                };
            }));
            function Wt(e) {
                var t = e.ownerDocument.defaultView;
                return (t = t && t.opener ? t : w).getComputedStyle(e);
            }
            function Xt(e, t, i) {
                var n, a = {};
                for (n in t) a[n] = e.style[n], e.style[n] = t[n];
                for (n in i = i.call(e), t) e.style[n] = a[n];
                return i;
            }
            var Vt, Yt, _t, Ut, Kt, Qt, Jt, A, Zt = new RegExp("^(" + e + ")(?!px)[a-z%]+$", "i"), ei = /^--/, ti = new RegExp(gt.join("|"), "i");
            function ii() {
                var e;
                A && (Jt.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", 
                A.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", 
                yt.appendChild(Jt).appendChild(A), e = w.getComputedStyle(A), Vt = "1%" !== e.top, 
                Qt = 12 === ni(e.marginLeft), A.style.right = "60%", Ut = 36 === ni(e.right), Yt = 36 === ni(e.width), 
                A.style.position = "absolute", _t = 12 === ni(A.offsetWidth / 3), yt.removeChild(Jt), 
                A = null);
            }
            function ni(e) {
                return Math.round(parseFloat(e));
            }
            function ai(e, t, i) {
                var n, a = ei.test(t), r = e.style;
                return (i = i || Wt(e)) && (n = i.getPropertyValue(t) || i[t], "" !== (n = a ? n && (n.replace(ee, "$1") || void 0) : n) || bt(e) || (n = E.style(e, t)), 
                !m.pixelBoxStyles()) && Zt.test(n) && ti.test(t) && (a = r.width, e = r.minWidth, 
                t = r.maxWidth, r.minWidth = r.maxWidth = r.width = n, n = i.width, r.width = a, 
                r.minWidth = e, r.maxWidth = t), void 0 !== n ? n + "" : n;
            }
            function ri(e, t) {
                return {
                    get: function() {
                        if (!e()) return (this.get = t).apply(this, arguments);
                        delete this.get;
                    }
                };
            }
            Jt = T.createElement("div"), (A = T.createElement("div")).style && (A.style.backgroundClip = "content-box", 
            A.cloneNode(!0).style.backgroundClip = "", m.clearCloneStyle = "content-box" === A.style.backgroundClip, 
            E.extend(m, {
                boxSizingReliable: function() {
                    return ii(), Yt;
                },
                pixelBoxStyles: function() {
                    return ii(), Ut;
                },
                pixelPosition: function() {
                    return ii(), Vt;
                },
                reliableMarginLeft: function() {
                    return ii(), Qt;
                },
                scrollboxSize: function() {
                    return ii(), _t;
                },
                reliableTrDimensions: function() {
                    var e, t, i;
                    return null == Kt && (e = T.createElement("table"), t = T.createElement("tr"), i = T.createElement("div"), 
                    e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t.style.cssText = "box-sizing:content-box;border:1px solid", 
                    t.style.height = "1px", i.style.height = "9px", i.style.display = "block", yt.appendChild(e).appendChild(t).appendChild(i), 
                    i = w.getComputedStyle(t), Kt = parseInt(i.height, 10) + parseInt(i.borderTopWidth, 10) + parseInt(i.borderBottomWidth, 10) === t.offsetHeight, 
                    yt.removeChild(e)), Kt;
                }
            }));
            var si = [ "Webkit", "Moz", "ms" ], oi = T.createElement("div").style, li = {};
            function di(e) {
                var t = E.cssProps[e] || li[e];
                return t || (e in oi ? e : li[e] = function(e) {
                    for (var t = e[0].toUpperCase() + e.slice(1), i = si.length; i--; ) if ((e = si[i] + t) in oi) return e;
                }(e) || e);
            }
            var ui = /^(none|table(?!-c[ea]).+)/, ci = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            }, pi = {
                letterSpacing: "0",
                fontWeight: "400"
            };
            function hi(e, t, i) {
                var n = vt.exec(t);
                return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : t;
            }
            function fi(e, t, i, n, a, r) {
                var s = "width" === t ? 1 : 0, o = 0, l = 0, d = 0;
                if (i === (n ? "border" : "content")) return 0;
                for (;s < 4; s += 2) "margin" === i && (d += E.css(e, i + gt[s], !0, a)), n ? ("content" === i && (l -= E.css(e, "padding" + gt[s], !0, a)), 
                "margin" !== i && (l -= E.css(e, "border" + gt[s] + "Width", !0, a))) : (l += E.css(e, "padding" + gt[s], !0, a), 
                "padding" !== i ? l += E.css(e, "border" + gt[s] + "Width", !0, a) : o += E.css(e, "border" + gt[s] + "Width", !0, a));
                return !n && 0 <= r && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - r - l - o - .5)) || 0), 
                l + d;
            }
            function mi(e, t, i) {
                var n = Wt(e), a = (!m.boxSizingReliable() || i) && "border-box" === E.css(e, "boxSizing", !1, n), r = a, s = ai(e, t, n), o = "offset" + t[0].toUpperCase() + t.slice(1);
                if (Zt.test(s)) {
                    if (!i) return s;
                    s = "auto";
                }
                return (!m.boxSizingReliable() && a || !m.reliableTrDimensions() && x(e, "tr") || "auto" === s || !parseFloat(s) && "inline" === E.css(e, "display", !1, n)) && e.getClientRects().length && (a = "border-box" === E.css(e, "boxSizing", !1, n), 
                r = o in e) && (s = e[o]), (s = parseFloat(s) || 0) + fi(e, t, i || (a ? "border" : "content"), r, n, s) + "px";
            }
            function I(e, t, i, n, a) {
                return new I.prototype.init(e, t, i, n, a);
            }
            E.extend({
                cssHooks: {
                    opacity: {
                        get: function(e, t) {
                            if (t) return "" === (t = ai(e, "opacity")) ? "1" : t;
                        }
                    }
                },
                cssNumber: {
                    animationIterationCount: !0,
                    aspectRatio: !0,
                    borderImageSlice: !0,
                    columnCount: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    gridArea: !0,
                    gridColumn: !0,
                    gridColumnEnd: !0,
                    gridColumnStart: !0,
                    gridRow: !0,
                    gridRowEnd: !0,
                    gridRowStart: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    scale: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0,
                    fillOpacity: !0,
                    floodOpacity: !0,
                    stopOpacity: !0,
                    strokeMiterlimit: !0,
                    strokeOpacity: !0
                },
                cssProps: {},
                style: function(e, t, i, n) {
                    if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                        var a, r, s, o = $(t), l = ei.test(t), d = e.style;
                        if (l || (t = di(o)), s = E.cssHooks[t] || E.cssHooks[o], void 0 === i) return s && "get" in s && void 0 !== (a = s.get(e, !1, n)) ? a : d[t];
                        "string" === (r = typeof i) && (a = vt.exec(i)) && a[1] && (i = wt(e, t, a), r = "number"), 
                        null == i || i != i || ("number" !== r || l || (i += a && a[3] || (E.cssNumber[o] ? "" : "px")), 
                        m.clearCloneStyle || "" !== i || 0 !== t.indexOf("background") || (d[t] = "inherit"), 
                        s && "set" in s && void 0 === (i = s.set(e, i, n))) || (l ? d.setProperty(t, i) : d[t] = i);
                    }
                },
                css: function(e, t, i, n) {
                    var a, r = $(t);
                    return ei.test(t) || (t = di(r)), "normal" === (a = void 0 === (a = (r = E.cssHooks[t] || E.cssHooks[r]) && "get" in r ? r.get(e, !0, i) : a) ? ai(e, t, n) : a) && t in pi && (a = pi[t]), 
                    ("" === i || i) && (r = parseFloat(a), !0 === i || isFinite(r)) ? r || 0 : a;
                }
            }), E.each([ "height", "width" ], (function(e, s) {
                E.cssHooks[s] = {
                    get: function(e, t, i) {
                        if (t) return !ui.test(E.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? mi(e, s, i) : Xt(e, ci, (function() {
                            return mi(e, s, i);
                        }));
                    },
                    set: function(e, t, i) {
                        var n = Wt(e), a = !m.scrollboxSize() && "absolute" === n.position, r = (a || i) && "border-box" === E.css(e, "boxSizing", !1, n);
                        i = i ? fi(e, s, i, r, n) : 0;
                        return r && a && (i -= Math.ceil(e["offset" + s[0].toUpperCase() + s.slice(1)] - parseFloat(n[s]) - fi(e, s, "border", !1, n) - .5)), 
                        i && (r = vt.exec(t)) && "px" !== (r[3] || "px") && (e.style[s] = t, t = E.css(e, s)), 
                        hi(0, t, i);
                    }
                };
            })), E.cssHooks.marginLeft = ri(m.reliableMarginLeft, (function(e, t) {
                if (t) return (parseFloat(ai(e, "marginLeft")) || e.getBoundingClientRect().left - Xt(e, {
                    marginLeft: 0
                }, (function() {
                    return e.getBoundingClientRect().left;
                }))) + "px";
            })), E.each({
                margin: "",
                padding: "",
                border: "Width"
            }, (function(a, r) {
                E.cssHooks[a + r] = {
                    expand: function(e) {
                        for (var t = 0, i = {}, n = "string" == typeof e ? e.split(" ") : [ e ]; t < 4; t++) i[a + gt[t] + r] = n[t] || n[t - 2] || n[0];
                        return i;
                    }
                }, "margin" !== a && (E.cssHooks[a + r].set = hi);
            })), E.fn.extend({
                css: function(e, t) {
                    return u(this, (function(e, t, i) {
                        var n, a, r = {}, s = 0;
                        if (Array.isArray(t)) {
                            for (n = Wt(e), a = t.length; s < a; s++) r[t[s]] = E.css(e, t[s], !1, n);
                            return r;
                        }
                        return void 0 !== i ? E.style(e, t, i) : E.css(e, t);
                    }), e, t, 1 < arguments.length);
                }
            }), ((E.Tween = I).prototype = {
                constructor: I,
                init: function(e, t, i, n, a, r) {
                    this.elem = e, this.prop = i, this.easing = a || E.easing._default, this.options = t, 
                    this.start = this.now = this.cur(), this.end = n, this.unit = r || (E.cssNumber[i] ? "" : "px");
                },
                cur: function() {
                    var e = I.propHooks[this.prop];
                    return (e && e.get ? e : I.propHooks._default).get(this);
                },
                run: function(e) {
                    var t, i = I.propHooks[this.prop];
                    return this.options.duration ? this.pos = t = E.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, 
                    this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
                    (i && i.set ? i : I.propHooks._default).set(this), this;
                }
            }).init.prototype = I.prototype, (I.propHooks = {
                _default: {
                    get: function(e) {
                        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (e = E.css(e.elem, e.prop, "")) && "auto" !== e ? e : 0;
                    },
                    set: function(e) {
                        E.fx.step[e.prop] ? E.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !E.cssHooks[e.prop] && null == e.elem.style[di(e.prop)] ? e.elem[e.prop] = e.now : E.style(e.elem, e.prop, e.now + e.unit);
                    }
                }
            }).scrollTop = I.propHooks.scrollLeft = {
                set: function(e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
                }
            }, E.easing = {
                linear: function(e) {
                    return e;
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2;
                },
                _default: "swing"
            }, E.fx = I.prototype.init, E.fx.step = {};
            var vi, gi, yi = /^(?:toggle|show|hide)$/, bi = /queueHooks$/;
            function xi() {
                gi && (!1 === T.hidden && w.requestAnimationFrame ? w.requestAnimationFrame(xi) : w.setTimeout(xi, E.fx.interval), 
                E.fx.tick());
            }
            function wi() {
                return w.setTimeout((function() {
                    vi = void 0;
                })), vi = Date.now();
            }
            function Ti(e, t) {
                var i, n = 0, a = {
                    height: e
                };
                for (t = t ? 1 : 0; n < 4; n += 2 - t) a["margin" + (i = gt[n])] = a["padding" + i] = e;
                return t && (a.opacity = a.width = e), a;
            }
            function Ei(e, t, i) {
                for (var n, a = (O.tweeners[t] || []).concat(O.tweeners["*"]), r = 0, s = a.length; r < s; r++) if (n = a[r].call(i, t, e)) return n;
            }
            function O(a, e, t) {
                var i, r, n, s, o, l, d, u = 0, c = O.prefilters.length, p = E.Deferred().always((function() {
                    delete h.elem;
                })), h = function() {
                    if (!r) {
                        for (var e = vi || wi(), t = (e = Math.max(0, f.startTime + f.duration - e), 1 - (e / f.duration || 0)), i = 0, n = f.tweens.length; i < n; i++) f.tweens[i].run(t);
                        if (p.notifyWith(a, [ f, t, e ]), t < 1 && n) return e;
                        n || p.notifyWith(a, [ f, 1, 0 ]), p.resolveWith(a, [ f ]);
                    }
                    return !1;
                }, f = p.promise({
                    elem: a,
                    props: E.extend({}, e),
                    opts: E.extend(!0, {
                        specialEasing: {},
                        easing: E.easing._default
                    }, t),
                    originalProperties: e,
                    originalOptions: t,
                    startTime: vi || wi(),
                    duration: t.duration,
                    tweens: [],
                    createTween: function(e, t) {
                        t = E.Tween(a, f.opts, e, t, f.opts.specialEasing[e] || f.opts.easing);
                        return f.tweens.push(t), t;
                    },
                    stop: function(e) {
                        var t = 0, i = e ? f.tweens.length : 0;
                        if (!r) {
                            for (r = !0; t < i; t++) f.tweens[t].run(1);
                            e ? (p.notifyWith(a, [ f, 1, 0 ]), p.resolveWith(a, [ f, e ])) : p.rejectWith(a, [ f, e ]);
                        }
                        return this;
                    }
                }), m = f.props, v = m, g = f.opts.specialEasing;
                for (n in v) if (o = g[s = $(n)], l = v[n], Array.isArray(l) && (o = l[1], l = v[n] = l[0]), 
                n !== s && (v[s] = l, delete v[n]), (d = E.cssHooks[s]) && "expand" in d) for (n in l = d.expand(l), 
                delete v[s], l) n in v || (v[n] = l[n], g[n] = o); else g[s] = o;
                for (;u < c; u++) if (i = O.prefilters[u].call(f, a, m, f.opts)) return y(i.stop) && (E._queueHooks(f.elem, f.opts.queue).stop = i.stop.bind(i)), 
                i;
                return E.map(m, Ei, f), y(f.opts.start) && f.opts.start.call(a, f), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always), 
                E.fx.timer(E.extend(h, {
                    elem: a,
                    anim: f,
                    queue: f.opts.queue
                })), f;
            }
            E.Animation = E.extend(O, {
                tweeners: {
                    "*": [ function(e, t) {
                        var i = this.createTween(e, t);
                        return wt(i.elem, e, vt.exec(t), i), i;
                    } ]
                },
                tweener: function(e, t) {
                    for (var i, n = 0, a = (e = y(e) ? (t = e, [ "*" ]) : e.match(D)).length; n < a; n++) i = e[n], 
                    O.tweeners[i] = O.tweeners[i] || [], O.tweeners[i].unshift(t);
                },
                prefilters: [ function(e, t, i) {
                    var n, a, r, s, o, l, d, u = "width" in t || "height" in t, c = this, p = {}, h = e.style, f = e.nodeType && mt(e), m = g.get(e, "fxshow");
                    for (n in i.queue || (null == (s = E._queueHooks(e, "fx")).unqueued && (s.unqueued = 0, 
                    o = s.empty.fire, s.empty.fire = function() {
                        s.unqueued || o();
                    }), s.unqueued++, c.always((function() {
                        c.always((function() {
                            s.unqueued--, E.queue(e, "fx").length || s.empty.fire();
                        }));
                    }))), t) if (a = t[n], yi.test(a)) {
                        if (delete t[n], r = r || "toggle" === a, a === (f ? "hide" : "show")) {
                            if ("show" !== a || !m || void 0 === m[n]) continue;
                            f = !0;
                        }
                        p[n] = m && m[n] || E.style(e, n);
                    }
                    if ((l = !E.isEmptyObject(t)) || !E.isEmptyObject(p)) for (n in u && 1 === e.nodeType && (i.overflow = [ h.overflow, h.overflowX, h.overflowY ], 
                    null == (d = m && m.display) && (d = g.get(e, "display")), "none" === (u = E.css(e, "display")) && (d ? u = d : (Et([ e ], !0), 
                    d = e.style.display || d, u = E.css(e, "display"), Et([ e ]))), "inline" === u || "inline-block" === u && null != d) && "none" === E.css(e, "float") && (l || (c.done((function() {
                        h.display = d;
                    })), null == d && (u = h.display, d = "none" === u ? "" : u)), h.display = "inline-block"), 
                    i.overflow && (h.overflow = "hidden", c.always((function() {
                        h.overflow = i.overflow[0], h.overflowX = i.overflow[1], h.overflowY = i.overflow[2];
                    }))), l = !1, p) l || (m ? "hidden" in m && (f = m.hidden) : m = g.access(e, "fxshow", {
                        display: d
                    }), r && (m.hidden = !f), f && Et([ e ], !0), c.done((function() {
                        for (n in f || Et([ e ]), g.remove(e, "fxshow"), p) E.style(e, n, p[n]);
                    }))), l = Ei(f ? m[n] : 0, n, c), n in m || (m[n] = l.start, f && (l.end = l.start, 
                    l.start = 0));
                } ],
                prefilter: function(e, t) {
                    t ? O.prefilters.unshift(e) : O.prefilters.push(e);
                }
            }), E.speed = function(e, t, i) {
                var n = e && "object" == typeof e ? E.extend({}, e) : {
                    complete: i || !i && t || y(e) && e,
                    duration: e,
                    easing: i && t || t && !y(t) && t
                };
                return E.fx.off ? n.duration = 0 : "number" != typeof n.duration && (n.duration in E.fx.speeds ? n.duration = E.fx.speeds[n.duration] : n.duration = E.fx.speeds._default), 
                null != n.queue && !0 !== n.queue || (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                    y(n.old) && n.old.call(this), n.queue && E.dequeue(this, n.queue);
                }, n;
            }, E.fn.extend({
                fadeTo: function(e, t, i, n) {
                    return this.filter(mt).css("opacity", 0).show().end().animate({
                        opacity: t
                    }, e, i, n);
                },
                animate: function(t, e, i, n) {
                    function a() {
                        var e = O(this, E.extend({}, t), s);
                        (r || g.get(this, "finish")) && e.stop(!0);
                    }
                    var r = E.isEmptyObject(t), s = E.speed(e, i, n);
                    return a.finish = a, r || !1 === s.queue ? this.each(a) : this.queue(s.queue, a);
                },
                stop: function(a, e, r) {
                    function s(e) {
                        var t = e.stop;
                        delete e.stop, t(r);
                    }
                    return "string" != typeof a && (r = e, e = a, a = void 0), e && this.queue(a || "fx", []), 
                    this.each((function() {
                        var e = !0, t = null != a && a + "queueHooks", i = E.timers, n = g.get(this);
                        if (t) n[t] && n[t].stop && s(n[t]); else for (t in n) n[t] && n[t].stop && bi.test(t) && s(n[t]);
                        for (t = i.length; t--; ) i[t].elem !== this || null != a && i[t].queue !== a || (i[t].anim.stop(r), 
                        e = !1, i.splice(t, 1));
                        !e && r || E.dequeue(this, a);
                    }));
                },
                finish: function(s) {
                    return !1 !== s && (s = s || "fx"), this.each((function() {
                        var e, t = g.get(this), i = t[s + "queue"], n = t[s + "queueHooks"], a = E.timers, r = i ? i.length : 0;
                        for (t.finish = !0, E.queue(this, s, []), n && n.stop && n.stop.call(this, !0), 
                        e = a.length; e--; ) a[e].elem === this && a[e].queue === s && (a[e].anim.stop(!0), 
                        a.splice(e, 1));
                        for (e = 0; e < r; e++) i[e] && i[e].finish && i[e].finish.call(this);
                        delete t.finish;
                    }));
                }
            }), E.each([ "toggle", "show", "hide" ], (function(e, n) {
                var a = E.fn[n];
                E.fn[n] = function(e, t, i) {
                    return null == e || "boolean" == typeof e ? a.apply(this, arguments) : this.animate(Ti(n, !0), e, t, i);
                };
            })), E.each({
                slideDown: Ti("show"),
                slideUp: Ti("hide"),
                slideToggle: Ti("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, (function(e, n) {
                E.fn[e] = function(e, t, i) {
                    return this.animate(n, e, t, i);
                };
            })), E.timers = [], E.fx.tick = function() {
                var e, t = 0, i = E.timers;
                for (vi = Date.now(); t < i.length; t++) (e = i[t])() || i[t] !== e || i.splice(t--, 1);
                i.length || E.fx.stop(), vi = void 0;
            }, E.fx.timer = function(e) {
                E.timers.push(e), E.fx.start();
            }, E.fx.interval = 13, E.fx.start = function() {
                gi || (gi = !0, xi());
            }, E.fx.stop = function() {
                gi = null;
            }, E.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, E.fn.delay = function(n, e) {
                return n = E.fx && E.fx.speeds[n] || n, this.queue(e = e || "fx", (function(e, t) {
                    var i = w.setTimeout(e, n);
                    t.stop = function() {
                        w.clearTimeout(i);
                    };
                }));
            }, s = T.createElement("input"), r = T.createElement("select").appendChild(T.createElement("option")), 
            s.type = "checkbox", m.checkOn = "" !== s.value, m.optSelected = r.selected, (s = T.createElement("input")).value = "t", 
            s.type = "radio", m.radioValue = "t" === s.value;
            var Ci, Si = E.expr.attrHandle, Mi = (E.fn.extend({
                attr: function(e, t) {
                    return u(this, E.attr, e, t, 1 < arguments.length);
                },
                removeAttr: function(e) {
                    return this.each((function() {
                        E.removeAttr(this, e);
                    }));
                }
            }), E.extend({
                attr: function(e, t, i) {
                    var n, a, r = e.nodeType;
                    if (3 !== r && 8 !== r && 2 !== r) return void 0 === e.getAttribute ? E.prop(e, t, i) : (1 === r && E.isXMLDoc(e) || (a = E.attrHooks[t.toLowerCase()] || (E.expr.match.bool.test(t) ? Ci : void 0)), 
                    void 0 !== i ? null === i ? void E.removeAttr(e, t) : a && "set" in a && void 0 !== (n = a.set(e, i, t)) ? n : (e.setAttribute(t, i + ""), 
                    i) : !(a && "get" in a && null !== (n = a.get(e, t))) && null == (n = E.find.attr(e, t)) ? void 0 : n);
                },
                attrHooks: {
                    type: {
                        set: function(e, t) {
                            var i;
                            if (!m.radioValue && "radio" === t && x(e, "input")) return i = e.value, e.setAttribute("type", t), 
                            i && (e.value = i), t;
                        }
                    }
                },
                removeAttr: function(e, t) {
                    var i, n = 0, a = t && t.match(D);
                    if (a && 1 === e.nodeType) for (;i = a[n++]; ) e.removeAttribute(i);
                }
            }), Ci = {
                set: function(e, t, i) {
                    return !1 === t ? E.removeAttr(e, i) : e.setAttribute(i, i), i;
                }
            }, E.each(E.expr.match.bool.source.match(/\w+/g), (function(e, t) {
                var s = Si[t] || E.find.attr;
                Si[t] = function(e, t, i) {
                    var n, a, r = t.toLowerCase();
                    return i || (a = Si[r], Si[r] = n, n = null != s(e, t, i) ? r : null, Si[r] = a), 
                    n;
                };
            })), /^(?:input|select|textarea|button)$/i), ki = /^(?:a|area)$/i;
            function Pi(e) {
                return (e.match(D) || []).join(" ");
            }
            function Li(e) {
                return e.getAttribute && e.getAttribute("class") || "";
            }
            function zi(e) {
                return Array.isArray(e) ? e : "string" == typeof e && e.match(D) || [];
            }
            E.fn.extend({
                prop: function(e, t) {
                    return u(this, E.prop, e, t, 1 < arguments.length);
                },
                removeProp: function(e) {
                    return this.each((function() {
                        delete this[E.propFix[e] || e];
                    }));
                }
            }), E.extend({
                prop: function(e, t, i) {
                    var n, a, r = e.nodeType;
                    if (3 !== r && 8 !== r && 2 !== r) return 1 === r && E.isXMLDoc(e) || (t = E.propFix[t] || t, 
                    a = E.propHooks[t]), void 0 !== i ? a && "set" in a && void 0 !== (n = a.set(e, i, t)) ? n : e[t] = i : a && "get" in a && null !== (n = a.get(e, t)) ? n : e[t];
                },
                propHooks: {
                    tabIndex: {
                        get: function(e) {
                            var t = E.find.attr(e, "tabindex");
                            return t ? parseInt(t, 10) : Mi.test(e.nodeName) || ki.test(e.nodeName) && e.href ? 0 : -1;
                        }
                    }
                },
                propFix: {
                    for: "htmlFor",
                    class: "className"
                }
            }), m.optSelected || (E.propHooks.selected = {
                get: function(e) {
                    e = e.parentNode;
                    return e && e.parentNode && e.parentNode.selectedIndex, null;
                },
                set: function(e) {
                    e = e.parentNode;
                    e && (e.selectedIndex, e.parentNode) && e.parentNode.selectedIndex;
                }
            }), E.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], (function() {
                E.propFix[this.toLowerCase()] = this;
            })), E.fn.extend({
                addClass: function(t) {
                    var e, i, n, a, r, s;
                    return y(t) ? this.each((function(e) {
                        E(this).addClass(t.call(this, e, Li(this)));
                    })) : (e = zi(t)).length ? this.each((function() {
                        if (n = Li(this), i = 1 === this.nodeType && " " + Pi(n) + " ") {
                            for (r = 0; r < e.length; r++) a = e[r], i.indexOf(" " + a + " ") < 0 && (i += a + " ");
                            s = Pi(i), n !== s && this.setAttribute("class", s);
                        }
                    })) : this;
                },
                removeClass: function(t) {
                    var e, i, n, a, r, s;
                    return y(t) ? this.each((function(e) {
                        E(this).removeClass(t.call(this, e, Li(this)));
                    })) : arguments.length ? (e = zi(t)).length ? this.each((function() {
                        if (n = Li(this), i = 1 === this.nodeType && " " + Pi(n) + " ") {
                            for (r = 0; r < e.length; r++) for (a = e[r]; -1 < i.indexOf(" " + a + " "); ) i = i.replace(" " + a + " ", " ");
                            s = Pi(i), n !== s && this.setAttribute("class", s);
                        }
                    })) : this : this.attr("class", "");
                },
                toggleClass: function(t, i) {
                    var e, n, a, r, s = typeof t, o = "string" == s || Array.isArray(t);
                    return y(t) ? this.each((function(e) {
                        E(this).toggleClass(t.call(this, e, Li(this), i), i);
                    })) : "boolean" == typeof i && o ? i ? this.addClass(t) : this.removeClass(t) : (e = zi(t), 
                    this.each((function() {
                        if (o) for (r = E(this), a = 0; a < e.length; a++) n = e[a], r.hasClass(n) ? r.removeClass(n) : r.addClass(n); else void 0 !== t && "boolean" != s || ((n = Li(this)) && g.set(this, "__className__", n), 
                        this.setAttribute && this.setAttribute("class", !n && !1 !== t && g.get(this, "__className__") || ""));
                    })));
                },
                hasClass: function(e) {
                    for (var t, i = 0, n = " " + e + " "; t = this[i++]; ) if (1 === t.nodeType && -1 < (" " + Pi(Li(t)) + " ").indexOf(n)) return !0;
                    return !1;
                }
            });
            function Di(e) {
                e.stopPropagation();
            }
            var $i = /\r/g, Ai = (E.fn.extend({
                val: function(t) {
                    var i, e, n, a = this[0];
                    return arguments.length ? (n = y(t), this.each((function(e) {
                        1 !== this.nodeType || (null == (e = n ? t.call(this, e, E(this).val()) : t) ? e = "" : "number" == typeof e ? e += "" : Array.isArray(e) && (e = E.map(e, (function(e) {
                            return null == e ? "" : e + "";
                        }))), (i = E.valHooks[this.type] || E.valHooks[this.nodeName.toLowerCase()]) && "set" in i && void 0 !== i.set(this, e, "value")) || (this.value = e);
                    }))) : a ? (i = E.valHooks[a.type] || E.valHooks[a.nodeName.toLowerCase()]) && "get" in i && void 0 !== (e = i.get(a, "value")) ? e : "string" == typeof (e = a.value) ? e.replace($i, "") : null == e ? "" : e : void 0;
                }
            }), E.extend({
                valHooks: {
                    option: {
                        get: function(e) {
                            var t = E.find.attr(e, "value");
                            return null != t ? t : Pi(E.text(e));
                        }
                    },
                    select: {
                        get: function(e) {
                            for (var t, i = e.options, n = e.selectedIndex, a = "select-one" === e.type, r = a ? null : [], s = a ? n + 1 : i.length, o = n < 0 ? s : a ? n : 0; o < s; o++) if (((t = i[o]).selected || o === n) && !t.disabled && (!t.parentNode.disabled || !x(t.parentNode, "optgroup"))) {
                                if (t = E(t).val(), a) return t;
                                r.push(t);
                            }
                            return r;
                        },
                        set: function(e, t) {
                            for (var i, n, a = e.options, r = E.makeArray(t), s = a.length; s--; ) ((n = a[s]).selected = -1 < E.inArray(E.valHooks.option.get(n), r)) && (i = !0);
                            return i || (e.selectedIndex = -1), r;
                        }
                    }
                }
            }), E.each([ "radio", "checkbox" ], (function() {
                E.valHooks[this] = {
                    set: function(e, t) {
                        if (Array.isArray(t)) return e.checked = -1 < E.inArray(E(e).val(), t);
                    }
                }, m.checkOn || (E.valHooks[this].get = function(e) {
                    return null === e.getAttribute("value") ? "on" : e.value;
                });
            })), w.location), Ii = {
                guid: Date.now()
            }, Oi = /\?/, Ni = (E.parseXML = function(e) {
                var t, i;
                if (!e || "string" != typeof e) return null;
                try {
                    t = (new w.DOMParser).parseFromString(e, "text/xml");
                } catch (e) {}
                return i = t && t.getElementsByTagName("parsererror")[0], t && !i || E.error("Invalid XML: " + (i ? E.map(i.childNodes, (function(e) {
                    return e.textContent;
                })).join("\n") : e)), t;
            }, /^(?:focusinfocus|focusoutblur)$/), Hi = (E.extend(E.event, {
                trigger: function(e, t, i, n) {
                    var a, r, s, o, l, d, u, c = [ i || T ], p = F.call(e, "type") ? e.type : e, h = F.call(e, "namespace") ? e.namespace.split(".") : [], f = u = r = i = i || T;
                    if (3 !== i.nodeType && 8 !== i.nodeType && !Ni.test(p + E.event.triggered) && (-1 < p.indexOf(".") && (p = (h = p.split(".")).shift(), 
                    h.sort()), o = p.indexOf(":") < 0 && "on" + p, (e = e[E.expando] ? e : new E.Event(p, "object" == typeof e && e)).isTrigger = n ? 2 : 3, 
                    e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
                    e.result = void 0, e.target || (e.target = i), t = null == t ? [ e ] : E.makeArray(t, [ e ]), 
                    d = E.event.special[p] || {}, n || !d.trigger || !1 !== d.trigger.apply(i, t))) {
                        if (!n && !d.noBubble && !H(i)) {
                            for (s = d.delegateType || p, Ni.test(s + p) || (f = f.parentNode); f; f = f.parentNode) c.push(f), 
                            r = f;
                            r === (i.ownerDocument || T) && c.push(r.defaultView || r.parentWindow || w);
                        }
                        for (a = 0; (f = c[a++]) && !e.isPropagationStopped(); ) u = f, e.type = 1 < a ? s : d.bindType || p, 
                        (l = (g.get(f, "events") || Object.create(null))[e.type] && g.get(f, "handle")) && l.apply(f, t), 
                        (l = o && f[o]) && l.apply && ut(f) && (e.result = l.apply(f, t), !1 === e.result) && e.preventDefault();
                        return e.type = p, n || e.isDefaultPrevented() || d._default && !1 !== d._default.apply(c.pop(), t) || !ut(i) || o && y(i[p]) && !H(i) && ((r = i[o]) && (i[o] = null), 
                        E.event.triggered = p, e.isPropagationStopped() && u.addEventListener(p, Di), i[p](), 
                        e.isPropagationStopped() && u.removeEventListener(p, Di), E.event.triggered = void 0, 
                        r) && (i[o] = r), e.result;
                    }
                },
                simulate: function(e, t, i) {
                    i = E.extend(new E.Event, i, {
                        type: e,
                        isSimulated: !0
                    });
                    E.event.trigger(i, null, t);
                }
            }), E.fn.extend({
                trigger: function(e, t) {
                    return this.each((function() {
                        E.event.trigger(e, t, this);
                    }));
                },
                triggerHandler: function(e, t) {
                    var i = this[0];
                    if (i) return E.event.trigger(e, t, i, !0);
                }
            }), /\[\]$/), ji = /\r?\n/g, qi = /^(?:submit|button|image|reset|file)$/i, Bi = /^(?:input|select|textarea|keygen)/i;
            E.param = function(e, t) {
                function i(e, t) {
                    t = y(t) ? t() : t, a[a.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == t ? "" : t);
                }
                var n, a = [];
                if (null == e) return "";
                if (Array.isArray(e) || e.jquery && !E.isPlainObject(e)) E.each(e, (function() {
                    i(this.name, this.value);
                })); else for (n in e) !function i(n, e, a, r) {
                    if (Array.isArray(e)) E.each(e, (function(e, t) {
                        a || Hi.test(n) ? r(n, t) : i(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, a, r);
                    })); else if (a || "object" !== _(e)) r(n, e); else for (var t in e) i(n + "[" + t + "]", e[t], a, r);
                }(n, e[n], t, i);
                return a.join("&");
            }, E.fn.extend({
                serialize: function() {
                    return E.param(this.serializeArray());
                },
                serializeArray: function() {
                    return this.map((function() {
                        var e = E.prop(this, "elements");
                        return e ? E.makeArray(e) : this;
                    })).filter((function() {
                        var e = this.type;
                        return this.name && !E(this).is(":disabled") && Bi.test(this.nodeName) && !qi.test(e) && (this.checked || !Ct.test(e));
                    })).map((function(e, t) {
                        var i = E(this).val();
                        return null == i ? null : Array.isArray(i) ? E.map(i, (function(e) {
                            return {
                                name: t.name,
                                value: e.replace(ji, "\r\n")
                            };
                        })) : {
                            name: t.name,
                            value: i.replace(ji, "\r\n")
                        };
                    })).get();
                }
            });
            var Ri = /%20/g, Gi = /#.*$/, Fi = /([?&])_=[^&]*/, Wi = /^(.*?):[ \t]*([^\r\n]*)$/gm, Xi = /^(?:GET|HEAD)$/, Vi = /^\/\//, Yi = {}, _i = {}, Ui = "*/".concat("*"), Ki = T.createElement("a");
            function Qi(r) {
                return function(e, t) {
                    "string" != typeof e && (t = e, e = "*");
                    var i, n = 0, a = e.toLowerCase().match(D) || [];
                    if (y(t)) for (;i = a[n++]; ) "+" === i[0] ? (i = i.slice(1) || "*", (r[i] = r[i] || []).unshift(t)) : (r[i] = r[i] || []).push(t);
                };
            }
            function Ji(t, n, a, r) {
                var s = {}, o = t === _i;
                function l(e) {
                    var i;
                    return s[e] = !0, E.each(t[e] || [], (function(e, t) {
                        t = t(n, a, r);
                        return "string" != typeof t || o || s[t] ? o ? !(i = t) : void 0 : (n.dataTypes.unshift(t), 
                        l(t), !1);
                    })), i;
                }
                return l(n.dataTypes[0]) || !s["*"] && l("*");
            }
            function Zi(e, t) {
                var i, n, a = E.ajaxSettings.flatOptions || {};
                for (i in t) void 0 !== t[i] && ((a[i] ? e : n = n || {})[i] = t[i]);
                return n && E.extend(!0, e, n), e;
            }
            Ki.href = Ai.href, E.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: Ai.href,
                    type: "GET",
                    isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Ai.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": Ui,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": JSON.parse,
                        "text xml": E.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(e, t) {
                    return t ? Zi(Zi(e, E.ajaxSettings), t) : Zi(E.ajaxSettings, e);
                },
                ajaxPrefilter: Qi(Yi),
                ajaxTransport: Qi(_i),
                ajax: function(e, t) {
                    "object" == typeof e && (t = e, e = void 0);
                    var l, d, u, i, c, p, h, n, f = E.ajaxSetup({}, t = t || {}), m = f.context || f, v = f.context && (m.nodeType || m.jquery) ? E(m) : E.event, g = E.Deferred(), y = E.Callbacks("once memory"), b = f.statusCode || {}, a = {}, r = {}, s = "canceled", x = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (p) {
                                if (!i) for (i = {}; t = Wi.exec(u); ) i[t[1].toLowerCase() + " "] = (i[t[1].toLowerCase() + " "] || []).concat(t[2]);
                                t = i[e.toLowerCase() + " "];
                            }
                            return null == t ? null : t.join(", ");
                        },
                        getAllResponseHeaders: function() {
                            return p ? u : null;
                        },
                        setRequestHeader: function(e, t) {
                            return null == p && (e = r[e.toLowerCase()] = r[e.toLowerCase()] || e, a[e] = t), 
                            this;
                        },
                        overrideMimeType: function(e) {
                            return null == p && (f.mimeType = e), this;
                        },
                        statusCode: function(e) {
                            if (e) if (p) x.always(e[x.status]); else for (var t in e) b[t] = [ b[t], e[t] ];
                            return this;
                        },
                        abort: function(e) {
                            e = e || s;
                            return l && l.abort(e), o(0, e), this;
                        }
                    };
                    if (g.promise(x), f.url = ((e || f.url || Ai.href) + "").replace(Vi, Ai.protocol + "//"), 
                    f.type = t.method || t.type || f.method || f.type, f.dataTypes = (f.dataType || "*").toLowerCase().match(D) || [ "" ], 
                    null == f.crossDomain) {
                        e = T.createElement("a");
                        try {
                            e.href = f.url, e.href = e.href, f.crossDomain = Ki.protocol + "//" + Ki.host != e.protocol + "//" + e.host;
                        } catch (e) {
                            f.crossDomain = !0;
                        }
                    }
                    if (f.data && f.processData && "string" != typeof f.data && (f.data = E.param(f.data, f.traditional)), 
                    Ji(Yi, f, t, x), !p) {
                        for (n in (h = E.event && f.global) && 0 == E.active++ && E.event.trigger("ajaxStart"), 
                        f.type = f.type.toUpperCase(), f.hasContent = !Xi.test(f.type), d = f.url.replace(Gi, ""), 
                        f.hasContent ? f.data && f.processData && 0 === (f.contentType || "").indexOf("application/x-www-form-urlencoded") && (f.data = f.data.replace(Ri, "+")) : (e = f.url.slice(d.length), 
                        f.data && (f.processData || "string" == typeof f.data) && (d += (Oi.test(d) ? "&" : "?") + f.data, 
                        delete f.data), !1 === f.cache && (d = d.replace(Fi, "$1"), e = (Oi.test(d) ? "&" : "?") + "_=" + Ii.guid++ + e), 
                        f.url = d + e), f.ifModified && (E.lastModified[d] && x.setRequestHeader("If-Modified-Since", E.lastModified[d]), 
                        E.etag[d]) && x.setRequestHeader("If-None-Match", E.etag[d]), (f.data && f.hasContent && !1 !== f.contentType || t.contentType) && x.setRequestHeader("Content-Type", f.contentType), 
                        x.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Ui + "; q=0.01" : "") : f.accepts["*"]), 
                        f.headers) x.setRequestHeader(n, f.headers[n]);
                        if (f.beforeSend && (!1 === f.beforeSend.call(m, x, f) || p)) return x.abort();
                        if (s = "abort", y.add(f.complete), x.done(f.success), x.fail(f.error), l = Ji(_i, f, t, x)) {
                            if (x.readyState = 1, h && v.trigger("ajaxSend", [ x, f ]), p) return x;
                            f.async && 0 < f.timeout && (c = w.setTimeout((function() {
                                x.abort("timeout");
                            }), f.timeout));
                            try {
                                p = !1, l.send(a, o);
                            } catch (e) {
                                if (p) throw e;
                                o(-1, e);
                            }
                        } else o(-1, "No Transport");
                    }
                    return x;
                    function o(e, t, i, n) {
                        var a, r, s, o = t;
                        p || (p = !0, c && w.clearTimeout(c), l = void 0, u = n || "", x.readyState = 0 < e ? 4 : 0, 
                        n = 200 <= e && e < 300 || 304 === e, i && (s = function(e, t, i) {
                            for (var n, a, r, s, o = e.contents, l = e.dataTypes; "*" === l[0]; ) l.shift(), 
                            void 0 === n && (n = e.mimeType || t.getResponseHeader("Content-Type"));
                            if (n) for (a in o) if (o[a] && o[a].test(n)) {
                                l.unshift(a);
                                break;
                            }
                            if (l[0] in i) r = l[0]; else {
                                for (a in i) {
                                    if (!l[0] || e.converters[a + " " + l[0]]) {
                                        r = a;
                                        break;
                                    }
                                    s = s || a;
                                }
                                r = r || s;
                            }
                            if (r) return r !== l[0] && l.unshift(r), i[r];
                        }(f, x, i)), !n && -1 < E.inArray("script", f.dataTypes) && E.inArray("json", f.dataTypes) < 0 && (f.converters["text script"] = function() {}), 
                        s = function(e, t, i, n) {
                            var a, r, s, o, l, d = {}, u = e.dataTypes.slice();
                            if (u[1]) for (s in e.converters) d[s.toLowerCase()] = e.converters[s];
                            for (r = u.shift(); r; ) if (e.responseFields[r] && (i[e.responseFields[r]] = t), 
                            !l && n && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = u.shift()) if ("*" === r) r = l; else if ("*" !== l && l !== r) {
                                if (!(s = d[l + " " + r] || d["* " + r])) for (a in d) if ((o = a.split(" "))[1] === r && (s = d[l + " " + o[0]] || d["* " + o[0]])) {
                                    !0 === s ? s = d[a] : !0 !== d[a] && (r = o[0], u.unshift(o[1]));
                                    break;
                                }
                                if (!0 !== s) if (s && e.throws) t = s(t); else try {
                                    t = s(t);
                                } catch (e) {
                                    return {
                                        state: "parsererror",
                                        error: s ? e : "No conversion from " + l + " to " + r
                                    };
                                }
                            }
                            return {
                                state: "success",
                                data: t
                            };
                        }(f, s, x, n), n ? (f.ifModified && ((i = x.getResponseHeader("Last-Modified")) && (E.lastModified[d] = i), 
                        i = x.getResponseHeader("etag")) && (E.etag[d] = i), 204 === e || "HEAD" === f.type ? o = "nocontent" : 304 === e ? o = "notmodified" : (o = s.state, 
                        a = s.data, n = !(r = s.error))) : (r = o, !e && o || (o = "error", e < 0 && (e = 0))), 
                        x.status = e, x.statusText = (t || o) + "", n ? g.resolveWith(m, [ a, o, x ]) : g.rejectWith(m, [ x, o, r ]), 
                        x.statusCode(b), b = void 0, h && v.trigger(n ? "ajaxSuccess" : "ajaxError", [ x, f, n ? a : r ]), 
                        y.fireWith(m, [ x, o ]), h && (v.trigger("ajaxComplete", [ x, f ]), --E.active || E.event.trigger("ajaxStop")));
                    }
                },
                getJSON: function(e, t, i) {
                    return E.get(e, t, i, "json");
                },
                getScript: function(e, t) {
                    return E.get(e, void 0, t, "script");
                }
            }), E.each([ "get", "post" ], (function(e, a) {
                E[a] = function(e, t, i, n) {
                    return y(t) && (n = n || i, i = t, t = void 0), E.ajax(E.extend({
                        url: e,
                        type: a,
                        dataType: n,
                        data: t,
                        success: i
                    }, E.isPlainObject(e) && e));
                };
            })), E.ajaxPrefilter((function(e) {
                for (var t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "");
            })), E._evalUrl = function(e, t, i) {
                return E.ajax({
                    url: e,
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    async: !1,
                    global: !1,
                    converters: {
                        "text script": function() {}
                    },
                    dataFilter: function(e) {
                        E.globalEval(e, t, i);
                    }
                });
            }, E.fn.extend({
                wrapAll: function(e) {
                    return this[0] && (y(e) && (e = e.call(this[0])), e = E(e, this[0].ownerDocument).eq(0).clone(!0), 
                    this[0].parentNode && e.insertBefore(this[0]), e.map((function() {
                        for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
                        return e;
                    })).append(this)), this;
                },
                wrapInner: function(i) {
                    return y(i) ? this.each((function(e) {
                        E(this).wrapInner(i.call(this, e));
                    })) : this.each((function() {
                        var e = E(this), t = e.contents();
                        t.length ? t.wrapAll(i) : e.append(i);
                    }));
                },
                wrap: function(t) {
                    var i = y(t);
                    return this.each((function(e) {
                        E(this).wrapAll(i ? t.call(this, e) : t);
                    }));
                },
                unwrap: function(e) {
                    return this.parent(e).not("body").each((function() {
                        E(this).replaceWith(this.childNodes);
                    })), this;
                }
            }), E.expr.pseudos.hidden = function(e) {
                return !E.expr.pseudos.visible(e);
            }, E.expr.pseudos.visible = function(e) {
                return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
            }, E.ajaxSettings.xhr = function() {
                try {
                    return new w.XMLHttpRequest;
                } catch (e) {}
            };
            var en = {
                0: 200,
                1223: 204
            }, tn = E.ajaxSettings.xhr(), nn = (m.cors = !!tn && "withCredentials" in tn, m.ajax = tn = !!tn, 
            E.ajaxTransport((function(a) {
                var r, s;
                if (m.cors || tn && !a.crossDomain) return {
                    send: function(e, t) {
                        var i, n = a.xhr();
                        if (n.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) for (i in a.xhrFields) n[i] = a.xhrFields[i];
                        for (i in a.mimeType && n.overrideMimeType && n.overrideMimeType(a.mimeType), a.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), 
                        e) n.setRequestHeader(i, e[i]);
                        r = function(e) {
                            return function() {
                                r && (r = s = n.onload = n.onerror = n.onabort = n.ontimeout = n.onreadystatechange = null, 
                                "abort" === e ? n.abort() : "error" === e ? "number" != typeof n.status ? t(0, "error") : t(n.status, n.statusText) : t(en[n.status] || n.status, n.statusText, "text" !== (n.responseType || "text") || "string" != typeof n.responseText ? {
                                    binary: n.response
                                } : {
                                    text: n.responseText
                                }, n.getAllResponseHeaders()));
                            };
                        }, n.onload = r(), s = n.onerror = n.ontimeout = r("error"), void 0 !== n.onabort ? n.onabort = s : n.onreadystatechange = function() {
                            4 === n.readyState && w.setTimeout((function() {
                                r && s();
                            }));
                        }, r = r("abort");
                        try {
                            n.send(a.hasContent && a.data || null);
                        } catch (e) {
                            if (r) throw e;
                        }
                    },
                    abort: function() {
                        r && r();
                    }
                };
            })), E.ajaxPrefilter((function(e) {
                e.crossDomain && (e.contents.script = !1);
            })), E.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function(e) {
                        return E.globalEval(e), e;
                    }
                }
            }), E.ajaxPrefilter("script", (function(e) {
                void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
            })), E.ajaxTransport("script", (function(i) {
                var n, a;
                if (i.crossDomain || i.scriptAttrs) return {
                    send: function(e, t) {
                        n = E("<script>").attr(i.scriptAttrs || {}).prop({
                            charset: i.scriptCharset,
                            src: i.url
                        }).on("load error", a = function(e) {
                            n.remove(), a = null, e && t("error" === e.type ? 404 : 200, e.type);
                        }), T.head.appendChild(n[0]);
                    },
                    abort: function() {
                        a && a();
                    }
                };
            })), []), an = /(=)\?(?=&|$)|\?\?/, rn = (E.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var e = nn.pop() || E.expando + "_" + Ii.guid++;
                    return this[e] = !0, e;
                }
            }), E.ajaxPrefilter("json jsonp", (function(e, t, i) {
                var n, a, r, s = !1 !== e.jsonp && (an.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && an.test(e.data) && "data");
                if (s || "jsonp" === e.dataTypes[0]) return n = e.jsonpCallback = y(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, 
                s ? e[s] = e[s].replace(an, "$1" + n) : !1 !== e.jsonp && (e.url += (Oi.test(e.url) ? "&" : "?") + e.jsonp + "=" + n), 
                e.converters["script json"] = function() {
                    return r || E.error(n + " was not called"), r[0];
                }, e.dataTypes[0] = "json", a = w[n], w[n] = function() {
                    r = arguments;
                }, i.always((function() {
                    void 0 === a ? E(w).removeProp(n) : w[n] = a, e[n] && (e.jsonpCallback = t.jsonpCallback, 
                    nn.push(n)), r && y(a) && a(r[0]), r = a = void 0;
                })), "script";
            })), m.createHTMLDocument = ((e = T.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 
            2 === e.childNodes.length), E.parseHTML = function(e, t, i) {
                var n;
                return "string" != typeof e ? [] : ("boolean" == typeof t && (i = t, t = !1), t || (m.createHTMLDocument ? ((n = (t = T.implementation.createHTMLDocument("")).createElement("base")).href = T.location.href, 
                t.head.appendChild(n)) : t = T), n = !i && [], (i = _e.exec(e)) ? [ t.createElement(i[1]) ] : (i = Lt([ e ], t, n), 
                n && n.length && E(n).remove(), E.merge([], i.childNodes)));
            }, E.fn.load = function(e, t, i) {
                var n, a, r, s = this, o = e.indexOf(" ");
                return -1 < o && (n = Pi(e.slice(o)), e = e.slice(0, o)), y(t) ? (i = t, t = void 0) : t && "object" == typeof t && (a = "POST"), 
                0 < s.length && E.ajax({
                    url: e,
                    type: a || "GET",
                    dataType: "html",
                    data: t
                }).done((function(e) {
                    r = arguments, s.html(n ? E("<div>").append(E.parseHTML(e)).find(n) : e);
                })).always(i && function(e, t) {
                    s.each((function() {
                        i.apply(this, r || [ e.responseText, t, e ]);
                    }));
                }), this;
            }, E.expr.pseudos.animated = function(t) {
                return E.grep(E.timers, (function(e) {
                    return t === e.elem;
                })).length;
            }, E.offset = {
                setOffset: function(e, t, i) {
                    var n, a, r, s, o = E.css(e, "position"), l = E(e), d = {};
                    "static" === o && (e.style.position = "relative"), r = l.offset(), n = E.css(e, "top"), 
                    s = E.css(e, "left"), o = ("absolute" === o || "fixed" === o) && -1 < (n + s).indexOf("auto") ? (a = (o = l.position()).top, 
                    o.left) : (a = parseFloat(n) || 0, parseFloat(s) || 0), null != (t = y(t) ? t.call(e, i, E.extend({}, r)) : t).top && (d.top = t.top - r.top + a), 
                    null != t.left && (d.left = t.left - r.left + o), "using" in t ? t.using.call(e, d) : l.css(d);
                }
            }, E.fn.extend({
                offset: function(t) {
                    var e, i;
                    return arguments.length ? void 0 === t ? this : this.each((function(e) {
                        E.offset.setOffset(this, t, e);
                    })) : (i = this[0]) ? i.getClientRects().length ? (e = i.getBoundingClientRect(), 
                    i = i.ownerDocument.defaultView, {
                        top: e.top + i.pageYOffset,
                        left: e.left + i.pageXOffset
                    }) : {
                        top: 0,
                        left: 0
                    } : void 0;
                },
                position: function() {
                    if (this[0]) {
                        var e, t, i, n = this[0], a = {
                            top: 0,
                            left: 0
                        };
                        if ("fixed" === E.css(n, "position")) t = n.getBoundingClientRect(); else {
                            for (t = this.offset(), i = n.ownerDocument, e = n.offsetParent || i.documentElement; e && (e === i.body || e === i.documentElement) && "static" === E.css(e, "position"); ) e = e.parentNode;
                            e && e !== n && 1 === e.nodeType && ((a = E(e).offset()).top += E.css(e, "borderTopWidth", !0), 
                            a.left += E.css(e, "borderLeftWidth", !0));
                        }
                        return {
                            top: t.top - a.top - E.css(n, "marginTop", !0),
                            left: t.left - a.left - E.css(n, "marginLeft", !0)
                        };
                    }
                },
                offsetParent: function() {
                    return this.map((function() {
                        for (var e = this.offsetParent; e && "static" === E.css(e, "position"); ) e = e.offsetParent;
                        return e || yt;
                    }));
                }
            }), E.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, (function(t, a) {
                var r = "pageYOffset" === a;
                E.fn[t] = function(e) {
                    return u(this, (function(e, t, i) {
                        var n;
                        if (H(e) ? n = e : 9 === e.nodeType && (n = e.defaultView), void 0 === i) return n ? n[a] : e[t];
                        n ? n.scrollTo(r ? n.pageXOffset : i, r ? i : n.pageYOffset) : e[t] = i;
                    }), t, e, arguments.length);
                };
            })), E.each([ "top", "left" ], (function(e, i) {
                E.cssHooks[i] = ri(m.pixelPosition, (function(e, t) {
                    if (t) return t = ai(e, i), Zt.test(t) ? E(e).position()[i] + "px" : t;
                }));
            })), E.each({
                Height: "height",
                Width: "width"
            }, (function(s, o) {
                E.each({
                    padding: "inner" + s,
                    content: o,
                    "": "outer" + s
                }, (function(n, r) {
                    E.fn[r] = function(e, t) {
                        var i = arguments.length && (n || "boolean" != typeof e), a = n || (!0 === e || !0 === t ? "margin" : "border");
                        return u(this, (function(e, t, i) {
                            var n;
                            return H(e) ? 0 === r.indexOf("outer") ? e["inner" + s] : e.document.documentElement["client" + s] : 9 === e.nodeType ? (n = e.documentElement, 
                            Math.max(e.body["scroll" + s], n["scroll" + s], e.body["offset" + s], n["offset" + s], n["client" + s])) : void 0 === i ? E.css(e, t, a) : E.style(e, t, i, a);
                        }), o, i ? e : void 0, i);
                    };
                }));
            })), E.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], (function(e, t) {
                E.fn[t] = function(e) {
                    return this.on(t, e);
                };
            })), E.fn.extend({
                bind: function(e, t, i) {
                    return this.on(e, null, t, i);
                },
                unbind: function(e, t) {
                    return this.off(e, null, t);
                },
                delegate: function(e, t, i, n) {
                    return this.on(t, e, i, n);
                },
                undelegate: function(e, t, i) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i);
                },
                hover: function(e, t) {
                    return this.on("mouseenter", e).on("mouseleave", t || e);
                }
            }), E.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), (function(e, i) {
                E.fn[i] = function(e, t) {
                    return 0 < arguments.length ? this.on(i, null, e, t) : this.trigger(i);
                };
            })), /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g), sn = (E.proxy = function(e, t) {
                var i, n;
                if ("string" == typeof t && (n = e[t], t = e, e = n), y(e)) return i = o.call(arguments, 2), 
                (n = function() {
                    return e.apply(t || this, i.concat(o.call(arguments)));
                }).guid = e.guid = e.guid || E.guid++, n;
            }, E.holdReady = function(e) {
                e ? E.readyWait++ : E.ready(!0);
            }, E.isArray = Array.isArray, E.parseJSON = JSON.parse, E.nodeName = x, E.isFunction = y, 
            E.isWindow = H, E.camelCase = $, E.type = _, E.now = Date.now, E.isNumeric = function(e) {
                var t = E.type(e);
                return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
            }, E.trim = function(e) {
                return null == e ? "" : (e + "").replace(rn, "$1");
            }, "function" == typeof define && define.amd && define("jquery", [], (function() {
                return E;
            })), w.jQuery), on = w.$;
            return E.noConflict = function(e) {
                return w.$ === E && (w.$ = on), e && w.jQuery === E && (w.jQuery = sn), E;
            }, void 0 === N && (w.jQuery = w.$ = E), E;
        })), function(e, t) {
            "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t();
        }(void 0, (function() {
            "use strict";
            function l(e) {
                for (var t = 0; t < e.length; t += 1) this[t] = e[t];
                return this.length = e.length, this;
            }
            var c = "undefined" == typeof document ? {
                body: {},
                addEventListener: function() {},
                removeEventListener: function() {},
                activeElement: {
                    blur: function() {},
                    nodeName: ""
                },
                querySelector: function() {
                    return null;
                },
                querySelectorAll: function() {
                    return [];
                },
                getElementById: function() {
                    return null;
                },
                createEvent: function() {
                    return {
                        initEvent: function() {}
                    };
                },
                createElement: function() {
                    return {
                        children: [],
                        childNodes: [],
                        style: {},
                        setAttribute: function() {},
                        getElementsByTagName: function() {
                            return [];
                        }
                    };
                },
                location: {
                    hash: ""
                }
            } : document, U = "undefined" == typeof window ? {
                document: c,
                navigator: {
                    userAgent: ""
                },
                location: {},
                history: {},
                CustomEvent: function() {
                    return this;
                },
                addEventListener: function() {},
                removeEventListener: function() {},
                getComputedStyle: function() {
                    return {
                        getPropertyValue: function() {
                            return "";
                        }
                    };
                },
                Image: function() {},
                Date: function() {},
                screen: {},
                setTimeout: function() {},
                clearTimeout: function() {}
            } : window;
            function E(e, t) {
                var i = [], n = 0;
                if (e && !t && e instanceof l) return e;
                if (e) if ("string" == typeof e) {
                    var a, r, s = e.trim();
                    if (0 <= s.indexOf("<") && 0 <= s.indexOf(">")) {
                        var o = "div";
                        for (0 === s.indexOf("<li") && (o = "ul"), 0 === s.indexOf("<tr") && (o = "tbody"), 
                        0 !== s.indexOf("<td") && 0 !== s.indexOf("<th") || (o = "tr"), 0 === s.indexOf("<tbody") && (o = "table"), 
                        0 === s.indexOf("<option") && (o = "select"), (r = c.createElement(o)).innerHTML = s, 
                        n = 0; n < r.childNodes.length; n += 1) i.push(r.childNodes[n]);
                    } else for (a = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || c).querySelectorAll(e.trim()) : [ c.getElementById(e.trim().split("#")[1]) ], 
                    n = 0; n < a.length; n += 1) a[n] && i.push(a[n]);
                } else if (e.nodeType || e === U || e === c) i.push(e); else if (0 < e.length && e[0].nodeType) for (n = 0; n < e.length; n += 1) i.push(e[n]);
                return new l(i);
            }
            function r(e) {
                for (var t = [], i = 0; i < e.length; i += 1) -1 === t.indexOf(e[i]) && t.push(e[i]);
                return t;
            }
            E.fn = l.prototype, E.Class = l, E.Dom7 = l;
            function e(e) {
                var t = this;
                t.params = e = void 0 === e ? {} : e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach((function(e) {
                    t.on(e, t.params.on[e]);
                }));
            }
            var I = {
                addClass: function(e) {
                    if (void 0 !== e) for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var n = 0; n < this.length; n += 1) void 0 !== this[n] && void 0 !== this[n].classList && this[n].classList.add(t[i]);
                    return this;
                },
                removeClass: function(e) {
                    for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var n = 0; n < this.length; n += 1) void 0 !== this[n] && void 0 !== this[n].classList && this[n].classList.remove(t[i]);
                    return this;
                },
                hasClass: function(e) {
                    return !!this[0] && this[0].classList.contains(e);
                },
                toggleClass: function(e) {
                    for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var n = 0; n < this.length; n += 1) void 0 !== this[n] && void 0 !== this[n].classList && this[n].classList.toggle(t[i]);
                    return this;
                },
                attr: function(e, t) {
                    var i = arguments;
                    if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
                    for (var n = 0; n < this.length; n += 1) if (2 === i.length) this[n].setAttribute(e, t); else for (var a in e) this[n][a] = e[a], 
                    this[n].setAttribute(a, e[a]);
                    return this;
                },
                removeAttr: function(e) {
                    for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
                    return this;
                },
                data: function(e, t) {
                    var i;
                    if (void 0 === t) return (i = this[0]) ? i.dom7ElementDataStorage && e in i.dom7ElementDataStorage ? i.dom7ElementDataStorage[e] : i.getAttribute("data-" + e) || void 0 : void 0;
                    for (var n = 0; n < this.length; n += 1) (i = this[n]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), 
                    i.dom7ElementDataStorage[e] = t;
                    return this;
                },
                transform: function(e) {
                    for (var t = 0; t < this.length; t += 1) {
                        var i = this[t].style;
                        i.webkitTransform = e, i.transform = e;
                    }
                    return this;
                },
                transition: function(e) {
                    "string" != typeof e && (e += "ms");
                    for (var t = 0; t < this.length; t += 1) {
                        var i = this[t].style;
                        i.webkitTransitionDuration = e, i.transitionDuration = e;
                    }
                    return this;
                },
                on: function() {
                    for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
                    var i = e[0], r = e[1], s = e[2], n = e[3];
                    function a(e) {
                        var t = e.target;
                        if (t) {
                            var i = e.target.dom7EventData || [];
                            if (i.indexOf(e) < 0 && i.unshift(e), E(t).is(r)) s.apply(t, i); else for (var n = E(t).parents(), a = 0; a < n.length; a += 1) E(n[a]).is(r) && s.apply(n[a], i);
                        }
                    }
                    function o(e) {
                        var t = e && e.target && e.target.dom7EventData || [];
                        t.indexOf(e) < 0 && t.unshift(e), s.apply(this, t);
                    }
                    "function" == typeof e[1] && (i = e[0], s = e[1], n = e[2], r = void 0);
                    n = n || !1;
                    for (var l, d = i.split(" "), u = 0; u < this.length; u += 1) {
                        var c = this[u];
                        if (r) for (l = 0; l < d.length; l += 1) {
                            var p = d[l];
                            c.dom7LiveListeners || (c.dom7LiveListeners = {}), c.dom7LiveListeners[p] || (c.dom7LiveListeners[p] = []), 
                            c.dom7LiveListeners[p].push({
                                listener: s,
                                proxyListener: a
                            }), c.addEventListener(p, a, n);
                        } else for (l = 0; l < d.length; l += 1) {
                            var h = d[l];
                            c.dom7Listeners || (c.dom7Listeners = {}), c.dom7Listeners[h] || (c.dom7Listeners[h] = []), 
                            c.dom7Listeners[h].push({
                                listener: s,
                                proxyListener: o
                            }), c.addEventListener(h, o, n);
                        }
                    }
                    return this;
                },
                off: function() {
                    for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
                    for (var i = e[0], n = e[1], a = e[2], r = e[3], s = ("function" == typeof e[1] && (i = e[0], 
                    a = e[1], r = e[2], n = void 0), r = r || !1, i.split(" ")), o = 0; o < s.length; o += 1) for (var l = s[o], d = 0; d < this.length; d += 1) {
                        var u = this[d], c = void 0;
                        if (!n && u.dom7Listeners ? c = u.dom7Listeners[l] : n && u.dom7LiveListeners && (c = u.dom7LiveListeners[l]), 
                        c && c.length) for (var p = c.length - 1; 0 <= p; --p) {
                            var h = c[p];
                            (a && h.listener === a || a && h.listener && h.listener.dom7proxy && h.listener.dom7proxy === a || !a) && (u.removeEventListener(l, h.proxyListener, r), 
                            c.splice(p, 1));
                        }
                    }
                    return this;
                },
                trigger: function() {
                    for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
                    for (var i = e[0].split(" "), n = e[1], a = 0; a < i.length; a += 1) for (var r = i[a], s = 0; s < this.length; s += 1) {
                        var o = this[s], l = void 0;
                        try {
                            l = new U.CustomEvent(r, {
                                detail: n,
                                bubbles: !0,
                                cancelable: !0
                            });
                        } catch (e) {
                            (l = c.createEvent("Event")).initEvent(r, !0, !0), l.detail = n;
                        }
                        o.dom7EventData = e.filter((function(e, t) {
                            return 0 < t;
                        })), o.dispatchEvent(l), o.dom7EventData = [], delete o.dom7EventData;
                    }
                    return this;
                },
                transitionEnd: function(t) {
                    var i, n = [ "webkitTransitionEnd", "transitionend" ], a = this;
                    function r(e) {
                        if (e.target === this) for (t.call(this, e), i = 0; i < n.length; i += 1) a.off(n[i], r);
                    }
                    if (t) for (i = 0; i < n.length; i += 1) a.on(n[i], r);
                    return this;
                },
                outerWidth: function(e) {
                    return 0 < this.length ? e ? (e = this.styles(), this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"))) : this[0].offsetWidth : null;
                },
                outerHeight: function(e) {
                    return 0 < this.length ? e ? (e = this.styles(), this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"))) : this[0].offsetHeight : null;
                },
                offset: function() {
                    var e, t, i, n, a;
                    return 0 < this.length ? (e = (a = this[0]).getBoundingClientRect(), i = c.body, 
                    t = a.clientTop || i.clientTop || 0, i = a.clientLeft || i.clientLeft || 0, n = a === U ? U.scrollY : a.scrollTop, 
                    a = a === U ? U.scrollX : a.scrollLeft, {
                        top: e.top + n - t,
                        left: e.left + a - i
                    }) : null;
                },
                css: function(e, t) {
                    var i;
                    if (1 === arguments.length) {
                        if ("string" != typeof e) {
                            for (i = 0; i < this.length; i += 1) for (var n in e) this[i].style[n] = e[n];
                            return this;
                        }
                        if (this[0]) return U.getComputedStyle(this[0], null).getPropertyValue(e);
                    }
                    if (2 === arguments.length && "string" == typeof e) for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
                    return this;
                },
                each: function(e) {
                    if (e) for (var t = 0; t < this.length; t += 1) if (!1 === e.call(this[t], t, this[t])) return this;
                    return this;
                },
                html: function(e) {
                    if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
                    for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
                    return this;
                },
                text: function(e) {
                    if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
                    for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
                    return this;
                },
                is: function(e) {
                    var t, i, n = this[0];
                    if (n && void 0 !== e) if ("string" == typeof e) {
                        if (n.matches) return n.matches(e);
                        if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
                        if (n.msMatchesSelector) return n.msMatchesSelector(e);
                        for (t = E(e), i = 0; i < t.length; i += 1) if (t[i] === n) return !0;
                    } else {
                        if (e === c) return n === c;
                        if (e === U) return n === U;
                        if (e.nodeType || e instanceof l) for (t = e.nodeType ? [ e ] : e, i = 0; i < t.length; i += 1) if (t[i] === n) return !0;
                    }
                    return !1;
                },
                index: function() {
                    var e, t = this[0];
                    if (t) {
                        for (e = 0; null !== (t = t.previousSibling); ) 1 === t.nodeType && (e += 1);
                        return e;
                    }
                },
                eq: function(e) {
                    var t;
                    return void 0 === e ? this : (t = this.length) - 1 < e ? new l([]) : e < 0 ? (t += e) < 0 ? new l([]) : new l([ this[t] ]) : new l([ this[e] ]);
                },
                append: function() {
                    for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
                    for (var i = 0; i < e.length; i += 1) for (var n = e[i], a = 0; a < this.length; a += 1) if ("string" == typeof n) {
                        var r = c.createElement("div");
                        for (r.innerHTML = n; r.firstChild; ) this[a].appendChild(r.firstChild);
                    } else if (n instanceof l) for (var s = 0; s < n.length; s += 1) this[a].appendChild(n[s]); else this[a].appendChild(n);
                    return this;
                },
                prepend: function(e) {
                    for (var t, i = 0; i < this.length; i += 1) if ("string" == typeof e) {
                        var n = c.createElement("div");
                        for (n.innerHTML = e, t = n.childNodes.length - 1; 0 <= t; --t) this[i].insertBefore(n.childNodes[t], this[i].childNodes[0]);
                    } else if (e instanceof l) for (t = 0; t < e.length; t += 1) this[i].insertBefore(e[t], this[i].childNodes[0]); else this[i].insertBefore(e, this[i].childNodes[0]);
                    return this;
                },
                next: function(e) {
                    return 0 < this.length ? e ? this[0].nextElementSibling && E(this[0].nextElementSibling).is(e) ? new l([ this[0].nextElementSibling ]) : new l([]) : this[0].nextElementSibling ? new l([ this[0].nextElementSibling ]) : new l([]) : new l([]);
                },
                nextAll: function(e) {
                    var t = [], i = this[0];
                    if (!i) return new l([]);
                    for (;i.nextElementSibling; ) {
                        var n = i.nextElementSibling;
                        (!e || E(n).is(e)) && t.push(n), i = n;
                    }
                    return new l(t);
                },
                prev: function(e) {
                    var t;
                    return 0 < this.length ? (t = this[0], e ? t.previousElementSibling && E(t.previousElementSibling).is(e) ? new l([ t.previousElementSibling ]) : new l([]) : t.previousElementSibling ? new l([ t.previousElementSibling ]) : new l([])) : new l([]);
                },
                prevAll: function(e) {
                    var t = [], i = this[0];
                    if (!i) return new l([]);
                    for (;i.previousElementSibling; ) {
                        var n = i.previousElementSibling;
                        (!e || E(n).is(e)) && t.push(n), i = n;
                    }
                    return new l(t);
                },
                parent: function(e) {
                    for (var t = [], i = 0; i < this.length; i += 1) null === this[i].parentNode || e && !E(this[i].parentNode).is(e) || t.push(this[i].parentNode);
                    return E(r(t));
                },
                parents: function(e) {
                    for (var t = [], i = 0; i < this.length; i += 1) for (var n = this[i].parentNode; n; ) e && !E(n).is(e) || t.push(n), 
                    n = n.parentNode;
                    return E(r(t));
                },
                closest: function(e) {
                    var t = this;
                    return void 0 === e ? new l([]) : t.is(e) ? t : t.parents(e).eq(0);
                },
                find: function(e) {
                    for (var t = [], i = 0; i < this.length; i += 1) for (var n = this[i].querySelectorAll(e), a = 0; a < n.length; a += 1) t.push(n[a]);
                    return new l(t);
                },
                children: function(e) {
                    for (var t = [], i = 0; i < this.length; i += 1) for (var n = this[i].childNodes, a = 0; a < n.length; a += 1) e ? 1 === n[a].nodeType && E(n[a]).is(e) && t.push(n[a]) : 1 === n[a].nodeType && t.push(n[a]);
                    return new l(r(t));
                },
                filter: function(e) {
                    for (var t = [], i = 0; i < this.length; i += 1) e.call(this[i], i, this[i]) && t.push(this[i]);
                    return new l(t);
                },
                remove: function() {
                    for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                    return this;
                },
                add: function() {
                    for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
                    for (var i = 0; i < e.length; i += 1) for (var n = E(e[i]), a = 0; a < n.length; a += 1) this[this.length] = n[a], 
                    this.length += 1;
                    return this;
                },
                styles: function() {
                    return this[0] ? U.getComputedStyle(this[0], null) : {};
                }
            }, K = (Object.keys(I).forEach((function(e) {
                E.fn[e] = E.fn[e] || I[e];
            })), {
                deleteProps: function(e) {
                    var t = e;
                    Object.keys(t).forEach((function(e) {
                        try {
                            t[e] = null;
                        } catch (e) {}
                        try {
                            delete t[e];
                        } catch (e) {}
                    }));
                },
                nextTick: function(e, t) {
                    return void 0 === t && (t = 0), setTimeout(e, t);
                },
                now: function() {
                    return Date.now();
                },
                getTranslate: function(e, t) {
                    void 0 === t && (t = "x");
                    var i, n, a;
                    e = U.getComputedStyle(e, null);
                    return U.WebKitCSSMatrix ? (6 < (n = e.transform || e.webkitTransform).split(",").length && (n = n.split(", ").map((function(e) {
                        return e.replace(",", ".");
                    })).join(", ")), a = new U.WebKitCSSMatrix("none" === n ? "" : n)) : i = (a = e.MozTransform || e.OTransform || e.MsTransform || e.msTransform || e.transform || e.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), 
                    "x" === t && (n = U.WebKitCSSMatrix ? a.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), 
                    (n = "y" === t ? U.WebKitCSSMatrix ? a.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5]) : n) || 0;
                },
                parseUrlQuery: function(e) {
                    var t, i, n, a, r = {};
                    e = e || U.location.href;
                    if ("string" == typeof e && e.length) for (a = (i = (e = -1 < e.indexOf("?") ? e.replace(/\S*\?/, "") : "").split("&").filter((function(e) {
                        return "" !== e;
                    }))).length, t = 0; t < a; t += 1) n = i[t].replace(/#\S+/g, "").split("="), r[decodeURIComponent(n[0])] = void 0 === n[1] ? void 0 : decodeURIComponent(n[1]) || "";
                    return r;
                },
                isObject: function(e) {
                    return "object" == typeof e && null !== e && e.constructor && e.constructor === Object;
                },
                extend: function() {
                    for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
                    for (var i = Object(e[0]), n = 1; n < e.length; n += 1) {
                        var a = e[n];
                        if (null != a) for (var r = Object.keys(Object(a)), s = 0, o = r.length; s < o; s += 1) {
                            var l = r[s], d = Object.getOwnPropertyDescriptor(a, l);
                            void 0 !== d && d.enumerable && (K.isObject(i[l]) && K.isObject(a[l]) ? K.extend(i[l], a[l]) : !K.isObject(i[l]) && K.isObject(a[l]) ? (i[l] = {}, 
                            K.extend(i[l], a[l])) : i[l] = a[l]);
                        }
                    }
                    return i;
                }
            }), x = {
                touch: U.Modernizr && !0 === U.Modernizr.touch || !!(0 < U.navigator.maxTouchPoints || "ontouchstart" in U || U.DocumentTouch && c instanceof U.DocumentTouch),
                pointerEvents: !!U.PointerEvent && "maxTouchPoints" in U.navigator && 0 < U.navigator.maxTouchPoints,
                observer: "MutationObserver" in U || "WebkitMutationObserver" in U,
                passiveListener: function() {
                    var e = !1;
                    try {
                        var t = Object.defineProperty({}, "passive", {
                            get: function() {
                                e = !0;
                            }
                        });
                        U.addEventListener("testPassiveListener", null, t);
                    } catch (e) {}
                    return e;
                }(),
                gestures: "ongesturestart" in U
            }, t = {
                components: {
                    configurable: !0
                }
            };
            e.prototype.on = function(e, t, i) {
                var n, a = this;
                return "function" == typeof t && (n = i ? "unshift" : "push", e.split(" ").forEach((function(e) {
                    a.eventsListeners[e] || (a.eventsListeners[e] = []), a.eventsListeners[e][n](t);
                }))), a;
            }, e.prototype.once = function(i, n, e) {
                var a = this;
                return "function" != typeof n ? a : (r.f7proxy = n, a.on(i, r, e));
                function r() {
                    for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
                    a.off(i, r), r.f7proxy && delete r.f7proxy, n.apply(a, e);
                }
            }, e.prototype.off = function(e, n) {
                var a = this;
                return a.eventsListeners && e.split(" ").forEach((function(i) {
                    void 0 === n ? a.eventsListeners[i] = [] : a.eventsListeners[i] && a.eventsListeners[i].length && a.eventsListeners[i].forEach((function(e, t) {
                        (e === n || e.f7proxy && e.f7proxy === n) && a.eventsListeners[i].splice(t, 1);
                    }));
                })), a;
            }, e.prototype.emit = function() {
                for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
                var i, n, a, r = this;
                return r.eventsListeners && (a = "string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0], 
                n = e.slice(1, e.length), r) : (i = e[0].events, n = e[0].data, e[0].context || r), 
                (Array.isArray(i) ? i : i.split(" ")).forEach((function(e) {
                    var t;
                    r.eventsListeners && r.eventsListeners[e] && (t = [], r.eventsListeners[e].forEach((function(e) {
                        t.push(e);
                    })), t.forEach((function(e) {
                        e.apply(a, n);
                    })));
                }))), r;
            }, e.prototype.useModulesParams = function(t) {
                var i = this;
                i.modules && Object.keys(i.modules).forEach((function(e) {
                    e = i.modules[e];
                    e.params && K.extend(t, e.params);
                }));
            }, e.prototype.useModules = function(t) {
                void 0 === t && (t = {});
                var n = this;
                n.modules && Object.keys(n.modules).forEach((function(e) {
                    var i = n.modules[e];
                    e = t[e] || {};
                    i.instance && Object.keys(i.instance).forEach((function(e) {
                        var t = i.instance[e];
                        n[e] = "function" == typeof t ? t.bind(n) : t;
                    })), i.on && n.on && Object.keys(i.on).forEach((function(e) {
                        n.on(e, i.on[e]);
                    })), i.create && i.create.bind(n)(e);
                }));
            }, t.components.set = function(e) {
                this.use && this.use(e);
            }, e.installModule = function(t) {
                for (var e = [], i = arguments.length - 1; 0 < i--; ) e[i] = arguments[i + 1];
                var n = this, a = (n.prototype.modules || (n.prototype.modules = {}), t.name || Object.keys(n.prototype.modules).length + "_" + K.now());
                return (n.prototype.modules[a] = t).proto && Object.keys(t.proto).forEach((function(e) {
                    n.prototype[e] = t.proto[e];
                })), t.static && Object.keys(t.static).forEach((function(e) {
                    n[e] = t.static[e];
                })), t.install && t.install.apply(n, e), n;
            }, e.use = function(e) {
                for (var t = [], i = arguments.length - 1; 0 < i--; ) t[i] = arguments[i + 1];
                var n = this;
                return Array.isArray(e) ? (e.forEach((function(e) {
                    return n.installModule(e);
                })), n) : n.installModule.apply(n, [ e ].concat(t));
            }, Object.defineProperties(e, t);
            t = {
                updateSize: function() {
                    var e = this, t = e.$el, i = void 0 !== e.params.width ? e.params.width : t[0].clientWidth, n = void 0 !== e.params.height ? e.params.height : t[0].clientHeight;
                    0 === i && e.isHorizontal() || 0 === n && e.isVertical() || (i = i - parseInt(t.css("padding-left"), 10) - parseInt(t.css("padding-right"), 10), 
                    n = n - parseInt(t.css("padding-top"), 10) - parseInt(t.css("padding-bottom"), 10), 
                    K.extend(e, {
                        width: i,
                        height: n,
                        size: e.isHorizontal() ? i : n
                    }));
                },
                updateSlides: function() {
                    var e = this, t = e.params, i = e.$wrapperEl, n = e.size, a = e.rtlTranslate, N = e.wrongRTL, H = ((h = e.virtual && t.virtual.enabled) ? e.virtual : e).slides.length, r = i.children("." + e.params.slideClass), s = (h ? e.virtual.slides : r).length, o = [], l = [], d = [];
                    function u(e) {
                        return !t.cssMode || e !== r.length - 1;
                    }
                    var c = t.slidesOffsetBefore, p = ("function" == typeof c && (c = t.slidesOffsetBefore.call(e)), 
                    t.slidesOffsetAfter), h = ("function" == typeof p && (p = t.slidesOffsetAfter.call(e)), 
                    e.snapGrid.length), j = e.snapGrid.length, f = t.spaceBetween, m = -c, v = 0, g = 0;
                    if (void 0 !== n) {
                        "string" == typeof f && 0 <= f.indexOf("%") && (f = parseFloat(f.replace("%", "")) / 100 * n), 
                        e.virtualSize = -f, a ? r.css({
                            marginLeft: "",
                            marginTop: ""
                        }) : r.css({
                            marginRight: "",
                            marginBottom: ""
                        }), 1 < t.slidesPerColumn && (y = Math.floor(s / t.slidesPerColumn) === s / e.params.slidesPerColumn ? s : Math.ceil(s / t.slidesPerColumn) * t.slidesPerColumn, 
                        "auto" !== t.slidesPerView) && "row" === t.slidesPerColumnFill && (y = Math.max(y, t.slidesPerView * t.slidesPerColumn));
                        for (var y, q, B, b, R, x = t.slidesPerColumn, G = y / x, F = Math.floor(s / t.slidesPerColumn), w = 0; w < s; w += 1) {
                            P = 0;
                            var T, E, C, S, M, k, P, L, z, D, W, X, V, $ = r.eq(w);
                            1 < t.slidesPerColumn && (k = M = S = void 0, "row" === t.slidesPerColumnFill && 1 < t.slidesPerGroup ? (C = Math.floor(w / (t.slidesPerGroup * t.slidesPerColumn)), 
                            T = w - t.slidesPerColumn * t.slidesPerGroup * C, E = 0 === C ? t.slidesPerGroup : Math.min(Math.ceil((s - C * x * t.slidesPerGroup) / x), t.slidesPerGroup), 
                            M = T - (k = Math.floor(T / E)) * E + C * t.slidesPerGroup, $.css({
                                "-webkit-box-ordinal-group": S = M + k * y / x,
                                "-moz-box-ordinal-group": S,
                                "-ms-flex-order": S,
                                "-webkit-order": S,
                                order: S
                            })) : "column" === t.slidesPerColumnFill ? (k = w - (M = Math.floor(w / x)) * x, 
                            (F < M || M === F && k === x - 1) && x <= (k += 1) && (k = 0, M += 1)) : M = w - (k = Math.floor(w / G)) * G, 
                            $.css("margin-" + (e.isHorizontal() ? "top" : "left"), 0 !== k && t.spaceBetween && t.spaceBetween + "px")), 
                            "none" !== $.css("display") && ("auto" === t.slidesPerView ? (T = U.getComputedStyle($[0], null), 
                            E = $[0].style.transform, C = $[0].style.webkitTransform, E && ($[0].style.transform = "none"), 
                            C && ($[0].style.webkitTransform = "none"), P = t.roundLengths ? e.isHorizontal() ? $.outerWidth(!0) : $.outerHeight(!0) : e.isHorizontal() ? (S = parseFloat(T.getPropertyValue("width")), 
                            M = parseFloat(T.getPropertyValue("padding-left")), k = parseFloat(T.getPropertyValue("padding-right")), 
                            z = parseFloat(T.getPropertyValue("margin-left")), D = parseFloat(T.getPropertyValue("margin-right")), 
                            (L = T.getPropertyValue("box-sizing")) && "border-box" === L ? S + z + D : S + M + k + z + D) : (L = parseFloat(T.getPropertyValue("height")), 
                            z = parseFloat(T.getPropertyValue("padding-top")), D = parseFloat(T.getPropertyValue("padding-bottom")), 
                            W = parseFloat(T.getPropertyValue("margin-top")), X = parseFloat(T.getPropertyValue("margin-bottom")), 
                            (V = T.getPropertyValue("box-sizing")) && "border-box" === V ? L + W + X : L + z + D + W + X), 
                            E && ($[0].style.transform = E), C && ($[0].style.webkitTransform = C), t.roundLengths && (P = Math.floor(P))) : (P = (n - (t.slidesPerView - 1) * f) / t.slidesPerView, 
                            t.roundLengths && (P = Math.floor(P)), r[w] && (e.isHorizontal() ? r[w].style.width = P + "px" : r[w].style.height = P + "px")), 
                            r[w] && (r[w].swiperSlideSize = P), d.push(P), t.centeredSlides ? (m = m + P / 2 + v / 2 + f, 
                            0 === v && 0 !== w && (m = m - n / 2 - f), 0 === w && (m = m - n / 2 - f), Math.abs(m) < .001 && (m = 0), 
                            t.roundLengths && (m = Math.floor(m)), g % t.slidesPerGroup == 0 && o.push(m), l.push(m)) : (t.roundLengths && (m = Math.floor(m)), 
                            (g - Math.min(e.params.slidesPerGroupSkip, g)) % e.params.slidesPerGroup == 0 && o.push(m), 
                            l.push(m), m = m + P + f), e.virtualSize += P + f, v = P, g += 1);
                        }
                        if (e.virtualSize = Math.max(e.virtualSize, n) + p, a && N && ("slide" === t.effect || "coverflow" === t.effect) && i.css({
                            width: e.virtualSize + t.spaceBetween + "px"
                        }), t.setWrapperSize && (e.isHorizontal() ? i.css({
                            width: e.virtualSize + t.spaceBetween + "px"
                        }) : i.css({
                            height: e.virtualSize + t.spaceBetween + "px"
                        })), 1 < t.slidesPerColumn && (e.virtualSize = (P + t.spaceBetween) * y, e.virtualSize = Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween, 
                        e.isHorizontal() ? i.css({
                            width: e.virtualSize + t.spaceBetween + "px"
                        }) : i.css({
                            height: e.virtualSize + t.spaceBetween + "px"
                        }), t.centeredSlides)) {
                            for (var A = [], I = 0; I < o.length; I += 1) {
                                var Y = o[I];
                                t.roundLengths && (Y = Math.floor(Y)), o[I] < e.virtualSize + o[0] && A.push(Y);
                            }
                            o = A;
                        }
                        if (!t.centeredSlides) {
                            A = [];
                            for (var O = 0; O < o.length; O += 1) {
                                var _ = o[O];
                                t.roundLengths && (_ = Math.floor(_)), o[O] <= e.virtualSize - n && A.push(_);
                            }
                            o = A, 1 < Math.floor(e.virtualSize - n) - Math.floor(o[o.length - 1]) && o.push(e.virtualSize - n);
                        }
                        0 === o.length && (o = [ 0 ]), 0 !== t.spaceBetween && (e.isHorizontal() ? a ? r.filter(u).css({
                            marginLeft: f + "px"
                        }) : r.filter(u).css({
                            marginRight: f + "px"
                        }) : r.filter(u).css({
                            marginBottom: f + "px"
                        })), t.centeredSlides && t.centeredSlidesBounds && (q = 0, d.forEach((function(e) {
                            q += e + (t.spaceBetween || 0);
                        })), B = (q -= t.spaceBetween) - n, o = o.map((function(e) {
                            return e < 0 ? -c : B < e ? B + p : e;
                        }))), t.centerInsufficientSlides && (b = 0, d.forEach((function(e) {
                            b += e + (t.spaceBetween || 0);
                        })), (b -= t.spaceBetween) < n) && (R = (n - b) / 2, o.forEach((function(e, t) {
                            o[t] = e - R;
                        })), l.forEach((function(e, t) {
                            l[t] = e + R;
                        }))), K.extend(e, {
                            slides: r,
                            snapGrid: o,
                            slidesGrid: l,
                            slidesSizesGrid: d
                        }), s !== H && e.emit("slidesLengthChange"), o.length !== h && (e.params.watchOverflow && e.checkOverflow(), 
                        e.emit("snapGridLengthChange")), l.length !== j && e.emit("slidesGridLengthChange"), 
                        (t.watchSlidesProgress || t.watchSlidesVisibility) && e.updateSlidesOffset();
                    }
                },
                updateAutoHeight: function(e) {
                    var t, i, n = this, a = [], r = 0;
                    if ("number" == typeof e ? n.setTransition(e) : !0 === e && n.setTransition(n.params.speed), 
                    "auto" !== n.params.slidesPerView && 1 < n.params.slidesPerView) if (n.params.centeredSlides) n.visibleSlides.each((function(e, t) {
                        a.push(t);
                    })); else for (t = 0; t < Math.ceil(n.params.slidesPerView); t += 1) {
                        var s = n.activeIndex + t;
                        if (s > n.slides.length) break;
                        a.push(n.slides.eq(s)[0]);
                    } else a.push(n.slides.eq(n.activeIndex)[0]);
                    for (t = 0; t < a.length; t += 1) void 0 !== a[t] && (r = r < (i = a[t].offsetHeight) ? i : r);
                    r && n.$wrapperEl.css("height", r + "px");
                },
                updateSlidesOffset: function() {
                    for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop;
                },
                updateSlidesProgress: function(e) {
                    void 0 === e && (e = this && this.translate || 0);
                    var t = this, i = t.params, n = t.slides, a = t.rtlTranslate;
                    if (0 !== n.length) {
                        void 0 === n[0].swiperSlideOffset && t.updateSlidesOffset();
                        var r = a ? e : -e;
                        n.removeClass(i.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
                        for (var s = 0; s < n.length; s += 1) {
                            var o, l, d = n[s], u = (r + (i.centeredSlides ? t.minTranslate() : 0) - d.swiperSlideOffset) / (d.swiperSlideSize + i.spaceBetween);
                            (i.watchSlidesVisibility || i.centeredSlides && i.autoHeight) && (l = (o = -(r - d.swiperSlideOffset)) + t.slidesSizesGrid[s], 
                            0 <= o && o < t.size - 1 || 1 < l && l <= t.size || o <= 0 && l >= t.size) && (t.visibleSlides.push(d), 
                            t.visibleSlidesIndexes.push(s), n.eq(s).addClass(i.slideVisibleClass)), d.progress = a ? -u : u;
                        }
                        t.visibleSlides = E(t.visibleSlides);
                    }
                },
                updateProgress: function(e) {
                    var t = this, i = (void 0 === e && (i = t.rtlTranslate ? -1 : 1, e = t && t.translate && t.translate * i || 0), 
                    t.params), n = t.maxTranslate() - t.minTranslate(), a = t.progress, r = t.isBeginning, s = r, o = l = t.isEnd, l = 0 == n ? r = !(a = 0) : (r = (a = (e - t.minTranslate()) / n) <= 0, 
                    1 <= a);
                    K.extend(t, {
                        progress: a,
                        isBeginning: r,
                        isEnd: l
                    }), (i.watchSlidesProgress || i.watchSlidesVisibility || i.centeredSlides && i.autoHeight) && t.updateSlidesProgress(e), 
                    r && !s && t.emit("reachBeginning toEdge"), l && !o && t.emit("reachEnd toEdge"), 
                    (s && !r || o && !l) && t.emit("fromEdge"), t.emit("progress", a);
                },
                updateSlidesClasses: function() {
                    var e = (s = this).slides, t = s.params, i = s.$wrapperEl, n = s.activeIndex, a = s.realIndex, r = s.virtual && t.virtual.enabled, s = (e.removeClass(t.slideActiveClass + " " + t.slideNextClass + " " + t.slidePrevClass + " " + t.slideDuplicateActiveClass + " " + t.slideDuplicateNextClass + " " + t.slideDuplicatePrevClass), 
                    (r = r ? s.$wrapperEl.find("." + t.slideClass + '[data-swiper-slide-index="' + n + '"]') : e.eq(n)).addClass(t.slideActiveClass), 
                    t.loop && (r.hasClass(t.slideDuplicateClass) ? i.children("." + t.slideClass + ":not(." + t.slideDuplicateClass + ')[data-swiper-slide-index="' + a + '"]') : i.children("." + t.slideClass + "." + t.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]')).addClass(t.slideDuplicateActiveClass), 
                    r.nextAll("." + t.slideClass).eq(0).addClass(t.slideNextClass));
                    n = (t.loop && 0 === s.length && (s = e.eq(0)).addClass(t.slideNextClass), r.prevAll("." + t.slideClass).eq(0).addClass(t.slidePrevClass));
                    t.loop && 0 === n.length && (n = e.eq(-1)).addClass(t.slidePrevClass), t.loop && ((s.hasClass(t.slideDuplicateClass) ? i.children("." + t.slideClass + ":not(." + t.slideDuplicateClass + ')[data-swiper-slide-index="' + s.attr("data-swiper-slide-index") + '"]') : i.children("." + t.slideClass + "." + t.slideDuplicateClass + '[data-swiper-slide-index="' + s.attr("data-swiper-slide-index") + '"]')).addClass(t.slideDuplicateNextClass), 
                    (n.hasClass(t.slideDuplicateClass) ? i.children("." + t.slideClass + ":not(." + t.slideDuplicateClass + ')[data-swiper-slide-index="' + n.attr("data-swiper-slide-index") + '"]') : i.children("." + t.slideClass + "." + t.slideDuplicateClass + '[data-swiper-slide-index="' + n.attr("data-swiper-slide-index") + '"]')).addClass(t.slideDuplicatePrevClass));
                },
                updateActiveIndex: function(e) {
                    var t = this, i = t.rtlTranslate ? t.translate : -t.translate, n = t.slidesGrid, a = t.snapGrid, r = t.params, s = t.activeIndex, o = t.realIndex, l = t.snapIndex, d = e;
                    if (void 0 === d) {
                        for (var u = 0; u < n.length; u += 1) void 0 !== n[u + 1] ? i >= n[u] && i < n[u + 1] - (n[u + 1] - n[u]) / 2 ? d = u : i >= n[u] && i < n[u + 1] && (d = u + 1) : i >= n[u] && (d = u);
                        r.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0);
                    }
                    (e = 0 <= a.indexOf(i) ? a.indexOf(i) : (e = Math.min(r.slidesPerGroupSkip, d)) + Math.floor((d - e) / r.slidesPerGroup)) >= a.length && (e = a.length - 1), 
                    d === s ? e !== l && (t.snapIndex = e, t.emit("snapIndexChange")) : (r = parseInt(t.slides.eq(d).attr("data-swiper-slide-index") || d, 10), 
                    K.extend(t, {
                        snapIndex: e,
                        realIndex: r,
                        previousIndex: s,
                        activeIndex: d
                    }), t.emit("activeIndexChange"), t.emit("snapIndexChange"), o !== r && t.emit("realIndexChange"), 
                    (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange"));
                },
                updateClickedSlide: function(e) {
                    var t = this, i = t.params, n = E(e.target).closest("." + i.slideClass)[0], a = !1;
                    if (n) for (var r = 0; r < t.slides.length; r += 1) t.slides[r] === n && (a = !0);
                    n && a ? (t.clickedSlide = n, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(E(n).attr("data-swiper-slide-index"), 10) : t.clickedIndex = E(n).index(), 
                    i.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()) : (t.clickedSlide = void 0, 
                    t.clickedIndex = void 0);
                }
            };
            var O = {
                getTranslate: function(e) {
                    void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                    var t = this.params, i = this.rtlTranslate, n = this.translate, a = this.$wrapperEl;
                    return t.virtualTranslate ? i ? -n : n : t.cssMode ? n : (t = K.getTranslate(a[0], e), 
                    (t = i ? -t : t) || 0);
                },
                setTranslate: function(e, t) {
                    var i = this, n = i.rtlTranslate, a = i.params, r = i.$wrapperEl, s = i.wrapperEl, o = i.progress, l = 0, d = 0;
                    i.isHorizontal() ? l = n ? -e : e : d = e, a.roundLengths && (l = Math.floor(l), 
                    d = Math.floor(d)), a.cssMode ? s[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal() ? -l : -d : a.virtualTranslate || r.transform("translate3d(" + l + "px, " + d + "px, 0px)"), 
                    i.previousTranslate = i.translate, i.translate = i.isHorizontal() ? l : d, (s = 0 == (n = i.maxTranslate() - i.minTranslate()) ? 0 : (e - i.minTranslate()) / n) !== o && i.updateProgress(e), 
                    i.emit("setTranslate", i.translate, t);
                },
                minTranslate: function() {
                    return -this.snapGrid[0];
                },
                maxTranslate: function() {
                    return -this.snapGrid[this.snapGrid.length - 1];
                },
                translateTo: function(e, t, i, n, a) {
                    void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), 
                    void 0 === n && (n = !0);
                    var r, s, o = this, l = o.params, d = o.wrapperEl;
                    return !(o.animating && l.preventInteractionOnTransition || (s = o.minTranslate(), 
                    r = o.maxTranslate(), o.updateProgress(s = n && s < e ? s : n && e < r ? r : e), 
                    l.cssMode ? (n = o.isHorizontal(), 0 !== t && d.scrollTo ? d.scrollTo(((r = {})[n ? "left" : "top"] = -s, 
                    r.behavior = "smooth", r)) : d[n ? "scrollLeft" : "scrollTop"] = -s) : 0 === t ? (o.setTransition(0), 
                    o.setTranslate(s), i && (o.emit("beforeTransitionStart", t, a), o.emit("transitionEnd"))) : (o.setTransition(t), 
                    o.setTranslate(s), i && (o.emit("beforeTransitionStart", t, a), o.emit("transitionStart")), 
                    o.animating || (o.animating = !0, o.onTranslateToWrapperTransitionEnd || (o.onTranslateToWrapperTransitionEnd = function(e) {
                        o && !o.destroyed && e.target === this && (o.$wrapperEl[0].removeEventListener("transitionend", o.onTranslateToWrapperTransitionEnd), 
                        o.$wrapperEl[0].removeEventListener("webkitTransitionEnd", o.onTranslateToWrapperTransitionEnd), 
                        o.onTranslateToWrapperTransitionEnd = null, delete o.onTranslateToWrapperTransitionEnd, 
                        i) && o.emit("transitionEnd");
                    }), o.$wrapperEl[0].addEventListener("transitionend", o.onTranslateToWrapperTransitionEnd), 
                    o.$wrapperEl[0].addEventListener("webkitTransitionEnd", o.onTranslateToWrapperTransitionEnd))), 
                    0));
                }
            };
            var N = {
                setTransition: function(e, t) {
                    this.params.cssMode || this.$wrapperEl.transition(e), this.emit("setTransition", e, t);
                },
                transitionStart: function(e, t) {
                    void 0 === e && (e = !0);
                    var i = this, n = i.activeIndex, a = i.params, r = i.previousIndex;
                    a.cssMode || (a.autoHeight && i.updateAutoHeight(), a = (a = t) || (r < n ? "next" : n < r ? "prev" : "reset"), 
                    i.emit("transitionStart"), e && n !== r && ("reset" === a ? i.emit("slideResetTransitionStart") : (i.emit("slideChangeTransitionStart"), 
                    "next" === a ? i.emit("slideNextTransitionStart") : i.emit("slidePrevTransitionStart"))));
                },
                transitionEnd: function(e, t) {
                    void 0 === e && (e = !0);
                    var i = this, n = i.activeIndex, a = i.previousIndex, r = i.params;
                    i.animating = !1, r.cssMode || (i.setTransition(0), r = (r = t) || (a < n ? "next" : n < a ? "prev" : "reset"), 
                    i.emit("transitionEnd"), e && n !== a && ("reset" === r ? i.emit("slideResetTransitionEnd") : (i.emit("slideChangeTransitionEnd"), 
                    "next" === r ? i.emit("slideNextTransitionEnd") : i.emit("slidePrevTransitionEnd"))));
                }
            };
            var H = {
                slideTo: function(e, t, i, n) {
                    void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
                    var a = this, r = e = void 0 === e ? 0 : e, s = (e = (r < 0 && (r = 0), a.params), 
                    a.snapGrid), o = a.slidesGrid, l = a.previousIndex, d = a.activeIndex, u = a.rtlTranslate, c = a.wrapperEl;
                    if (a.animating && e.preventInteractionOnTransition) return !1;
                    var p, h = Math.min(a.params.slidesPerGroupSkip, r), f = ((h += Math.floor((r - h) / a.params.slidesPerGroup)) >= s.length && (h = s.length - 1), 
                    (d || e.initialSlide || 0) === (l || 0) && i && a.emit("beforeSlideChangeStart"), 
                    -s[h]);
                    if (a.updateProgress(f), e.normalizeSlideIndex) for (var m = 0; m < o.length; m += 1) -Math.floor(100 * f) >= Math.floor(100 * o[m]) && (r = m);
                    if (a.initialized && r !== d) {
                        if (!a.allowSlideNext && f < a.translate && f < a.minTranslate()) return !1;
                        if (!a.allowSlidePrev && f > a.translate && f > a.maxTranslate() && (d || 0) !== r) return !1;
                    }
                    return p = d < r ? "next" : r < d ? "prev" : "reset", u && -f === a.translate || !u && f === a.translate ? (a.updateActiveIndex(r), 
                    e.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), "slide" !== e.effect && a.setTranslate(f), 
                    "reset" !== p && (a.transitionStart(i, p), a.transitionEnd(i, p)), !1) : (e.cssMode ? (l = a.isHorizontal(), 
                    s = -f, u && (s = c.scrollWidth - c.offsetWidth - s), 0 !== t && c.scrollTo ? c.scrollTo(((h = {})[l ? "left" : "top"] = s, 
                    h.behavior = "smooth", h)) : c[l ? "scrollLeft" : "scrollTop"] = s) : 0 === t ? (a.setTransition(0), 
                    a.setTranslate(f), a.updateActiveIndex(r), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, n), 
                    a.transitionStart(i, p), a.transitionEnd(i, p)) : (a.setTransition(t), a.setTranslate(f), 
                    a.updateActiveIndex(r), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, n), 
                    a.transitionStart(i, p), a.animating || (a.animating = !0, a.onSlideToWrapperTransitionEnd || (a.onSlideToWrapperTransitionEnd = function(e) {
                        a && !a.destroyed && e.target === this && (a.$wrapperEl[0].removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd), 
                        a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd), 
                        a.onSlideToWrapperTransitionEnd = null, delete a.onSlideToWrapperTransitionEnd, 
                        a.transitionEnd(i, p));
                    }), a.$wrapperEl[0].addEventListener("transitionend", a.onSlideToWrapperTransitionEnd), 
                    a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd))), 
                    !0);
                },
                slideToLoop: function(e, t, i, n) {
                    return void 0 === t && (t = this.params.speed), e = void 0 === e ? 0 : e, this.params.loop && (e += this.loopedSlides), 
                    this.slideTo(e, t, i = void 0 === i ? !0 : i, n);
                },
                slideNext: function(e, t, i) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                    var n = this, a = n.params, r = n.animating, s = n.activeIndex < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup;
                    if (a.loop) {
                        if (r) return !1;
                        n.loopFix(), n._clientLeft = n.$wrapperEl[0].clientLeft;
                    }
                    return n.slideTo(n.activeIndex + s, e, t, i);
                },
                slidePrev: function(e, t, i) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                    var n = this, a = n.params, r = n.animating, s = n.snapGrid, o = n.slidesGrid, l = n.rtlTranslate;
                    if (a.loop) {
                        if (r) return !1;
                        n.loopFix(), n._clientLeft = n.$wrapperEl[0].clientLeft;
                    }
                    function d(e) {
                        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
                    }
                    var u, c = d(l ? n.translate : -n.translate), p = (r = s.map(d), o.map(d), s[r.indexOf(c)], 
                    s[r.indexOf(c) - 1]);
                    return void 0 === p && a.cssMode && s.forEach((function(e) {
                        !p && e <= c && (p = e);
                    })), void 0 !== p && (u = o.indexOf(p)) < 0 && (u = n.activeIndex - 1), n.slideTo(u, e, t, i);
                },
                slideReset: function(e, t, i) {
                    return void 0 === e && (e = this.params.speed), this.slideTo(this.activeIndex, e, t = void 0 === t ? !0 : t, i);
                },
                slideToClosest: function(e, t, i, n) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === n && (n = .5);
                    var a, r = this, s = r.activeIndex, o = (o = Math.min(r.params.slidesPerGroupSkip, s)) + Math.floor((s - o) / r.params.slidesPerGroup), l = r.rtlTranslate ? r.translate : -r.translate;
                    return l >= r.snapGrid[o] ? (a = r.snapGrid[o], (r.snapGrid[o + 1] - a) * n < l - a && (s += r.params.slidesPerGroup)) : l - (a = r.snapGrid[o - 1]) <= (r.snapGrid[o] - a) * n && (s -= r.params.slidesPerGroup), 
                    s = Math.max(s, 0), s = Math.min(s, r.slidesGrid.length - 1), r.slideTo(s, e, t, i);
                },
                slideToClickedSlide: function() {
                    var e, t = this, i = t.params, n = t.$wrapperEl, a = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView, r = t.clickedIndex;
                    i.loop ? t.animating || (e = parseInt(E(t.clickedSlide).attr("data-swiper-slide-index"), 10), 
                    i.centeredSlides ? r < t.loopedSlides - a / 2 || r > t.slides.length - t.loopedSlides + a / 2 ? (t.loopFix(), 
                    r = n.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), 
                    K.nextTick((function() {
                        t.slideTo(r);
                    }))) : t.slideTo(r) : r > t.slides.length - a ? (t.loopFix(), r = n.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), 
                    K.nextTick((function() {
                        t.slideTo(r);
                    }))) : t.slideTo(r)) : t.slideTo(r);
                }
            };
            var j = {
                loopCreate: function() {
                    var n = this, e = n.params, t = n.$wrapperEl, a = (t.children("." + e.slideClass + "." + e.slideDuplicateClass).remove(), 
                    t.children("." + e.slideClass));
                    if (e.loopFillGroupWithBlank) {
                        var i = e.slidesPerGroup - a.length % e.slidesPerGroup;
                        if (i !== e.slidesPerGroup) {
                            for (var r = 0; r < i; r += 1) {
                                var s = E(c.createElement("div")).addClass(e.slideClass + " " + e.slideBlankClass);
                                t.append(s);
                            }
                            a = t.children("." + e.slideClass);
                        }
                    }
                    "auto" !== e.slidesPerView || e.loopedSlides || (e.loopedSlides = a.length), n.loopedSlides = Math.ceil(parseFloat(e.loopedSlides || e.slidesPerView, 10)), 
                    n.loopedSlides += e.loopAdditionalSlides, n.loopedSlides > a.length && (n.loopedSlides = a.length);
                    var o = [], l = [];
                    a.each((function(e, t) {
                        var i = E(t);
                        e < n.loopedSlides && l.push(t), e < a.length && e >= a.length - n.loopedSlides && o.push(t), 
                        i.attr("data-swiper-slide-index", e);
                    }));
                    for (var d = 0; d < l.length; d += 1) t.append(E(l[d].cloneNode(!0)).addClass(e.slideDuplicateClass));
                    for (var u = o.length - 1; 0 <= u; --u) t.prepend(E(o[u].cloneNode(!0)).addClass(e.slideDuplicateClass));
                },
                loopFix: function() {
                    var e = this, t = (e.emit("beforeLoopFix"), e.activeIndex), i = e.slides, n = e.loopedSlides, a = e.allowSlidePrev, r = e.allowSlideNext, s = e.snapGrid, o = e.rtlTranslate;
                    e.allowSlidePrev = !0, e.allowSlideNext = !0;
                    var l;
                    s = -s[t] - e.getTranslate();
                    t < n ? (l = i.length - 3 * n + t, e.slideTo(l += n, 0, !1, !0) && 0 != s && e.setTranslate((o ? -e.translate : e.translate) - s)) : t >= i.length - n && (l = -i.length + t + n, 
                    e.slideTo(l += n, 0, !1, !0)) && 0 != s && e.setTranslate((o ? -e.translate : e.translate) - s), 
                    e.allowSlidePrev = a, e.allowSlideNext = r, e.emit("loopFix");
                },
                loopDestroy: function() {
                    var e = this.$wrapperEl, t = this.params, i = this.slides;
                    e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(), 
                    i.removeAttr("data-swiper-slide-index");
                }
            };
            var q = {
                setGrabCursor: function(e) {
                    var t = this;
                    x.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode || ((t = t.el).style.cursor = "move", 
                    t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", 
                    t.style.cursor = e ? "grabbing" : "grab");
                },
                unsetGrabCursor: function() {
                    x.touch || this.params.watchOverflow && this.isLocked || this.params.cssMode || (this.el.style.cursor = "");
                }
            };
            var i, n, a, s, o, B = {
                appendSlide: function(e) {
                    var t = this, i = t.$wrapperEl, n = t.params;
                    if (n.loop && t.loopDestroy(), "object" == typeof e && "length" in e) for (var a = 0; a < e.length; a += 1) e[a] && i.append(e[a]); else i.append(e);
                    n.loop && t.loopCreate(), n.observer && x.observer || t.update();
                },
                prependSlide: function(e) {
                    var t = this, i = t.params, n = t.$wrapperEl, a = t.activeIndex, r = (i.loop && t.loopDestroy(), 
                    a + 1);
                    if ("object" == typeof e && "length" in e) {
                        for (var s = 0; s < e.length; s += 1) e[s] && n.prepend(e[s]);
                        r = a + e.length;
                    } else n.prepend(e);
                    i.loop && t.loopCreate(), i.observer && x.observer || t.update(), t.slideTo(r, 0, !1);
                },
                addSlide: function(e, t) {
                    var i = this, n = i.$wrapperEl, a = i.params, r = i.activeIndex, s = (a.loop && (r -= i.loopedSlides, 
                    i.loopDestroy(), i.slides = n.children("." + a.slideClass)), i.slides.length);
                    if (e <= 0) i.prependSlide(t); else if (s <= e) i.appendSlide(t); else {
                        for (var o = e < r ? r + 1 : r, l = [], d = s - 1; e <= d; --d) {
                            var u = i.slides.eq(d);
                            u.remove(), l.unshift(u);
                        }
                        if ("object" == typeof t && "length" in t) {
                            for (var c = 0; c < t.length; c += 1) t[c] && n.append(t[c]);
                            o = e < r ? r + t.length : r;
                        } else n.append(t);
                        for (var p = 0; p < l.length; p += 1) n.append(l[p]);
                        a.loop && i.loopCreate(), a.observer && x.observer || i.update(), a.loop ? i.slideTo(o + i.loopedSlides, 0, !1) : i.slideTo(o, 0, !1);
                    }
                },
                removeSlide: function(e) {
                    var t, i = this, n = i.params, a = i.$wrapperEl, r = i.activeIndex, s = (n.loop && (r -= i.loopedSlides, 
                    i.loopDestroy(), i.slides = a.children("." + n.slideClass)), r);
                    if ("object" == typeof e && "length" in e) for (var o = 0; o < e.length; o += 1) t = e[o], 
                    i.slides[t] && i.slides.eq(t).remove(), t < s && --s; else i.slides[t = e] && i.slides.eq(t).remove(), 
                    t < s && --s;
                    s = Math.max(s, 0), n.loop && i.loopCreate(), n.observer && x.observer || i.update(), 
                    n.loop ? i.slideTo(s + i.loopedSlides, 0, !1) : i.slideTo(s, 0, !1);
                },
                removeAllSlides: function() {
                    for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
                    this.removeSlide(e);
                }
            }, d = (i = U.navigator.platform, n = U.navigator.userAgent, a = {
                ios: !1,
                android: !1,
                androidChrome: !1,
                desktop: !1,
                iphone: !1,
                ipod: !1,
                ipad: !1,
                edge: !1,
                ie: !1,
                firefox: !1,
                macos: !1,
                windows: !1,
                cordova: !(!U.cordova && !U.phonegap),
                phonegap: !(!U.cordova && !U.phonegap),
                electron: !1
            }, m = U.screen.width, v = U.screen.height, y = n.match(/(Android);?[\s\/]+([\d.]+)?/), 
            T = n.match(/(iPad).*OS\s([\d_]+)/), A = n.match(/(iPod)(.*OS\s([\d_]+))?/), w = !T && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/), 
            p = 0 <= n.indexOf("MSIE ") || 0 <= n.indexOf("Trident/"), X = 0 <= n.indexOf("Edge/"), 
            V = 0 <= n.indexOf("Gecko/") && 0 <= n.indexOf("Firefox/"), s = "Win32" === i, o = 0 <= n.toLowerCase().indexOf("electron"), 
            i = "MacIntel" === i, !T && i && x.touch && (1024 === m && 1366 === v || 834 === m && 1194 === v || 834 === m && 1112 === v || 768 === m && 1024 === v) && (T = n.match(/(Version)\/([\d.]+)/), 
            i = !1), a.ie = p, a.edge = X, a.firefox = V, y && !s && (a.os = "android", a.osVersion = y[2], 
            a.android = !0, a.androidChrome = 0 <= n.toLowerCase().indexOf("chrome")), (T || w || A) && (a.os = "ios", 
            a.ios = !0), w && !A && (a.osVersion = w[2].replace(/_/g, "."), a.iphone = !0), 
            T && (a.osVersion = T[2].replace(/_/g, "."), a.ipad = !0), A && (a.osVersion = A[3] ? A[3].replace(/_/g, ".") : null, 
            a.ipod = !0), a.ios && a.osVersion && 0 <= n.indexOf("Version/") && "10" === a.osVersion.split(".")[0] && (a.osVersion = n.toLowerCase().split("version/")[1].split(" ")[0]), 
            a.webView = !(!(w || T || A) || !n.match(/.*AppleWebKit(?!.*Safari)/i) && !U.navigator.standalone) || U.matchMedia && U.matchMedia("(display-mode: standalone)").matches, 
            a.webview = a.webView, a.standalone = a.webView, a.desktop = !(a.ios || a.android) || o, 
            a.desktop && (a.electron = o, a.macos = i, a.windows = s, a.macos && (a.os = "macos"), 
            a.windows) && (a.os = "windows"), a.pixelRatio = U.devicePixelRatio || 1, a);
            function u() {
                var e, t, i = this, n = i.params, a = i.el;
                a && 0 === a.offsetWidth || (n.breakpoints && i.setBreakpoint(), a = i.allowSlideNext, 
                e = i.allowSlidePrev, t = i.snapGrid, i.allowSlideNext = !0, i.allowSlidePrev = !0, 
                i.updateSize(), i.updateSlides(), i.updateSlidesClasses(), ("auto" === n.slidesPerView || 1 < n.slidesPerView) && i.isEnd && !i.params.centeredSlides ? i.slideTo(i.slides.length - 1, 0, !1, !0) : i.slideTo(i.activeIndex, 0, !1, !0), 
                i.autoplay && i.autoplay.running && i.autoplay.paused && i.autoplay.run(), i.allowSlidePrev = e, 
                i.allowSlideNext = a, i.params.watchOverflow && t !== i.snapGrid && i.checkOverflow());
            }
            var R = !1;
            function G() {}
            var p, F = {
                init: !0,
                direction: "horizontal",
                touchEventsTarget: "container",
                initialSlide: 0,
                speed: 300,
                cssMode: !1,
                updateOnWindowResize: !0,
                preventInteractionOnTransition: !1,
                edgeSwipeDetection: !1,
                edgeSwipeThreshold: 20,
                freeMode: !1,
                freeModeMomentum: !0,
                freeModeMomentumRatio: 1,
                freeModeMomentumBounce: !0,
                freeModeMomentumBounceRatio: 1,
                freeModeMomentumVelocityRatio: 1,
                freeModeSticky: !1,
                freeModeMinimumVelocity: .02,
                autoHeight: !1,
                setWrapperSize: !1,
                virtualTranslate: !1,
                effect: "slide",
                breakpoints: void 0,
                spaceBetween: 0,
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerColumnFill: "column",
                slidesPerGroup: 1,
                slidesPerGroupSkip: 0,
                centeredSlides: !1,
                centeredSlidesBounds: !1,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                normalizeSlideIndex: !0,
                centerInsufficientSlides: !1,
                watchOverflow: !1,
                roundLengths: !1,
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: !0,
                shortSwipes: !0,
                longSwipes: !0,
                longSwipesRatio: .5,
                longSwipesMs: 300,
                followFinger: !0,
                allowTouchMove: !0,
                threshold: 0,
                touchMoveStopPropagation: !1,
                touchStartPreventDefault: !0,
                touchStartForcePreventDefault: !1,
                touchReleaseOnEdges: !1,
                uniqueNavElements: !0,
                resistance: !0,
                resistanceRatio: .85,
                watchSlidesProgress: !1,
                watchSlidesVisibility: !1,
                grabCursor: !1,
                preventClicks: !0,
                preventClicksPropagation: !0,
                slideToClickedSlide: !1,
                preloadImages: !0,
                updateOnImagesReady: !0,
                loop: !1,
                loopAdditionalSlides: 0,
                loopedSlides: null,
                loopFillGroupWithBlank: !1,
                allowSlidePrev: !0,
                allowSlideNext: !0,
                swipeHandler: null,
                noSwiping: !0,
                noSwipingClass: "swiper-no-swiping",
                noSwipingSelector: null,
                passiveListeners: !0,
                containerModifierClass: "swiper-container-",
                slideClass: "swiper-slide",
                slideBlankClass: "swiper-slide-invisible-blank",
                slideActiveClass: "swiper-slide-active",
                slideDuplicateActiveClass: "swiper-slide-duplicate-active",
                slideVisibleClass: "swiper-slide-visible",
                slideDuplicateClass: "swiper-slide-duplicate",
                slideNextClass: "swiper-slide-next",
                slideDuplicateNextClass: "swiper-slide-duplicate-next",
                slidePrevClass: "swiper-slide-prev",
                slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
                wrapperClass: "swiper-wrapper",
                runCallbacksOnInit: !0
            }, h = {
                update: t,
                translate: O,
                transition: N,
                slide: H,
                loop: j,
                grabCursor: q,
                manipulation: B,
                events: {
                    attachEvents: function() {
                        var e, t = this, i = t.params, n = t.touchEvents, a = t.el, r = t.wrapperEl, s = (t.onTouchStart = function(e) {
                            var t, i, n, a, r, s = this, o = s.touchEventsData, l = s.params, d = s.touches;
                            s.animating && l.preventInteractionOnTransition || (t = E((e = e.originalEvent ? e.originalEvent : e).target), 
                            "wrapper" === l.touchEventsTarget && !t.closest(s.wrapperEl).length) || (o.isTouchEvent = "touchstart" === e.type, 
                            !o.isTouchEvent && "which" in e && 3 === e.which) || !o.isTouchEvent && "button" in e && 0 < e.button || o.isTouched && o.isMoved || (l.noSwiping && t.closest(l.noSwipingSelector || "." + l.noSwipingClass)[0] ? s.allowClick = !0 : l.swipeHandler && !t.closest(l.swipeHandler)[0] || (d.currentX = ("touchstart" === e.type ? e.targetTouches[0] : e).pageX, 
                            d.currentY = ("touchstart" === e.type ? e.targetTouches[0] : e).pageY, i = d.currentX, 
                            n = d.currentY, a = l.edgeSwipeDetection || l.iOSEdgeSwipeDetection, r = l.edgeSwipeThreshold || l.iOSEdgeSwipeThreshold, 
                            a && (i <= r || i >= U.screen.width - r)) || (K.extend(o, {
                                isTouched: !0,
                                isMoved: !1,
                                allowTouchCallbacks: !0,
                                isScrolling: void 0,
                                startMoving: void 0
                            }), d.startX = i, d.startY = n, o.touchStartTime = K.now(), s.allowClick = !0, s.updateSize(), 
                            s.swipeDirection = void 0, 0 < l.threshold && (o.allowThresholdMove = !1), "touchstart" !== e.type && (a = !0, 
                            t.is(o.formElements) && (a = !1), c.activeElement && E(c.activeElement).is(o.formElements) && c.activeElement !== t[0] && c.activeElement.blur(), 
                            r = a && s.allowTouchMove && l.touchStartPreventDefault, l.touchStartForcePreventDefault || r) && e.preventDefault(), 
                            s.emit("touchStart", e)));
                        }.bind(t), t.onTouchMove = function(e) {
                            var t = this, i = t.touchEventsData, n = t.params, a = t.touches, r = t.rtlTranslate;
                            if (e.originalEvent && (e = e.originalEvent), i.isTouched) {
                                if (!i.isTouchEvent || "mousemove" !== e.type) {
                                    var s = "touchmove" === e.type && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]), o = ("touchmove" === e.type ? s : e).pageX;
                                    s = ("touchmove" === e.type ? s : e).pageY;
                                    if (e.preventedByNestedSwiper) a.startX = o, a.startY = s; else if (t.allowTouchMove) {
                                        if (i.isTouchEvent && n.touchReleaseOnEdges && !n.loop) if (t.isVertical()) {
                                            if (s < a.startY && t.translate <= t.maxTranslate() || s > a.startY && t.translate >= t.minTranslate()) return i.isTouched = !1, 
                                            void (i.isMoved = !1);
                                        } else if (o < a.startX && t.translate <= t.maxTranslate() || o > a.startX && t.translate >= t.minTranslate()) return;
                                        if (i.isTouchEvent && c.activeElement && e.target === c.activeElement && E(e.target).is(i.formElements)) i.isMoved = !0, 
                                        t.allowClick = !1; else if (i.allowTouchCallbacks && t.emit("touchMove", e), !(e.targetTouches && 1 < e.targetTouches.length)) {
                                            a.currentX = o, a.currentY = s;
                                            var l = a.currentX - a.startX, d = a.currentY - a.startY;
                                            if (!(t.params.threshold && Math.sqrt(Math.pow(l, 2) + Math.pow(d, 2)) < t.params.threshold)) if (void 0 === i.isScrolling && (t.isHorizontal() && a.currentY === a.startY || t.isVertical() && a.currentX === a.startX ? i.isScrolling = !1 : 25 <= l * l + d * d && (u = 180 * Math.atan2(Math.abs(d), Math.abs(l)) / Math.PI, 
                                            i.isScrolling = t.isHorizontal() ? u > n.touchAngle : 90 - u > n.touchAngle)), i.isScrolling && t.emit("touchMoveOpposite", e), 
                                            void 0 !== i.startMoving || a.currentX === a.startX && a.currentY === a.startY || (i.startMoving = !0), 
                                            i.isScrolling) i.isTouched = !1; else if (i.startMoving) {
                                                t.allowClick = !1, n.cssMode || e.preventDefault(), n.touchMoveStopPropagation && !n.nested && e.stopPropagation(), 
                                                i.isMoved || (n.loop && t.loopFix(), i.startTranslate = t.getTranslate(), t.setTransition(0), 
                                                t.animating && t.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, 
                                                !n.grabCursor || !0 !== t.allowSlideNext && !0 !== t.allowSlidePrev || t.setGrabCursor(!0), 
                                                t.emit("sliderFirstMove", e)), t.emit("sliderMove", e), i.isMoved = !0;
                                                var u = t.isHorizontal() ? l : d;
                                                l = (a.diff = u, u *= n.touchRatio, t.swipeDirection = 0 < (u = r ? -u : u) ? "prev" : "next", 
                                                i.currentTranslate = u + i.startTranslate, !0), d = n.resistanceRatio;
                                                if (n.touchReleaseOnEdges && (d = 0), 0 < u && i.currentTranslate > t.minTranslate() ? (l = !1, 
                                                n.resistance && (i.currentTranslate = t.minTranslate() - 1 + Math.pow(-t.minTranslate() + i.startTranslate + u, d))) : u < 0 && i.currentTranslate < t.maxTranslate() && (l = !1, 
                                                n.resistance) && (i.currentTranslate = t.maxTranslate() + 1 - Math.pow(t.maxTranslate() - i.startTranslate - u, d)), 
                                                l && (e.preventedByNestedSwiper = !0), !t.allowSlideNext && "next" === t.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), 
                                                !t.allowSlidePrev && "prev" === t.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), 
                                                0 < n.threshold) {
                                                    if (!(Math.abs(u) > n.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate);
                                                    if (!i.allowThresholdMove) return i.allowThresholdMove = !0, a.startX = a.currentX, 
                                                    a.startY = a.currentY, i.currentTranslate = i.startTranslate, void (a.diff = t.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY);
                                                }
                                                n.followFinger && !n.cssMode && ((n.freeMode || n.watchSlidesProgress || n.watchSlidesVisibility) && (t.updateActiveIndex(), 
                                                t.updateSlidesClasses()), n.freeMode && (0 === i.velocities.length && i.velocities.push({
                                                    position: a[t.isHorizontal() ? "startX" : "startY"],
                                                    time: i.touchStartTime
                                                }), i.velocities.push({
                                                    position: a[t.isHorizontal() ? "currentX" : "currentY"],
                                                    time: K.now()
                                                })), t.updateProgress(i.currentTranslate), t.setTranslate(i.currentTranslate));
                                            }
                                        }
                                    } else t.allowClick = !1, i.isTouched && (K.extend(a, {
                                        startX: o,
                                        startY: s,
                                        currentX: o,
                                        currentY: s
                                    }), i.touchStartTime = K.now());
                                }
                            } else i.startMoving && i.isScrolling && t.emit("touchMoveOpposite", e);
                        }.bind(t), t.onTouchEnd = function(e) {
                            var t = this, i = t.touchEventsData, n = t.params, a = t.touches, r = t.rtlTranslate, s = t.$wrapperEl, o = t.slidesGrid, l = t.snapGrid;
                            if (e.originalEvent && (e = e.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", e), 
                            i.allowTouchCallbacks = !1, i.isTouched) {
                                n.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                                var d, u = K.now(), c = u - i.touchStartTime;
                                if (t.allowClick && (t.updateClickedSlide(e), t.emit("tap click", e), c < 300) && u - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", e), 
                                i.lastClickTime = K.now(), K.nextTick((function() {
                                    t.destroyed || (t.allowClick = !0);
                                })), i.isTouched && i.isMoved && t.swipeDirection && 0 !== a.diff && i.currentTranslate !== i.startTranslate) {
                                    if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, d = n.followFinger ? r ? t.translate : -t.translate : -i.currentTranslate, 
                                    !n.cssMode) if (n.freeMode) if (d < -t.minTranslate()) t.slideTo(t.activeIndex); else if (d > -t.maxTranslate()) t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1); else {
                                        if (n.freeModeMomentum) {
                                            (!(1 < i.velocities.length) || (u = i.velocities.pop(), a = i.velocities.pop(), 
                                            f = u.position - a.position, a = u.time - a.time, t.velocity = f / a, t.velocity /= 2, 
                                            Math.abs(t.velocity) < n.freeModeMinimumVelocity && (t.velocity = 0), 150 < a) || 300 < K.now() - u.time) && (t.velocity = 0), 
                                            t.velocity *= n.freeModeMomentumVelocityRatio, i.velocities.length = 0;
                                            var p, h, f = 1e3 * n.freeModeMomentumRatio, m = (a = t.velocity * f, t.translate + a);
                                            u = (r && (m = -m), !1), a = 20 * Math.abs(t.velocity) * n.freeModeMomentumBounceRatio;
                                            if (m < t.maxTranslate()) n.freeModeMomentumBounce ? (m + t.maxTranslate() < -a && (m = t.maxTranslate() - a), 
                                            p = t.maxTranslate(), i.allowMomentumBounce = u = !0) : m = t.maxTranslate(), n.loop && n.centeredSlides && (h = !0); else if (m > t.minTranslate()) n.freeModeMomentumBounce ? (m - t.minTranslate() > a && (m = t.minTranslate() + a), 
                                            p = t.minTranslate(), i.allowMomentumBounce = u = !0) : m = t.minTranslate(), n.loop && n.centeredSlides && (h = !0); else if (n.freeModeSticky) {
                                                for (var v, g = 0; g < l.length; g += 1) if (l[g] > -m) {
                                                    v = g;
                                                    break;
                                                }
                                                m = -(m = Math.abs(l[v] - m) < Math.abs(l[v - 1] - m) || "next" === t.swipeDirection ? l[v] : l[v - 1]);
                                            }
                                            if (h && t.once("transitionEnd", (function() {
                                                t.loopFix();
                                            })), 0 !== t.velocity) f = r ? Math.abs((-m - t.translate) / t.velocity) : Math.abs((m - t.translate) / t.velocity), 
                                            n.freeModeSticky && (f = (a = Math.abs((r ? -m : m) - t.translate)) < (h = t.slidesSizesGrid[t.activeIndex]) ? n.speed : a < 2 * h ? 1.5 * n.speed : 2.5 * n.speed); else if (n.freeModeSticky) return void t.slideToClosest();
                                            n.freeModeMomentumBounce && u ? (t.updateProgress(p), t.setTransition(f), t.setTranslate(m), 
                                            t.transitionStart(!0, t.swipeDirection), t.animating = !0, s.transitionEnd((function() {
                                                t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(n.speed), 
                                                t.setTranslate(p), s.transitionEnd((function() {
                                                    t && !t.destroyed && t.transitionEnd();
                                                })));
                                            }))) : t.velocity ? (t.updateProgress(m), t.setTransition(f), t.setTranslate(m), 
                                            t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, s.transitionEnd((function() {
                                                t && !t.destroyed && t.transitionEnd();
                                            })))) : t.updateProgress(m), t.updateActiveIndex(), t.updateSlidesClasses();
                                        } else if (n.freeModeSticky) return void t.slideToClosest();
                                        (!n.freeModeMomentum || c >= n.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), 
                                        t.updateSlidesClasses());
                                    } else {
                                        for (var y = 0, b = t.slidesSizesGrid[0], x = 0; x < o.length; x += x < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup) {
                                            var w = x < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
                                            void 0 !== o[x + w] ? d >= o[x] && d < o[x + w] && (b = o[(y = x) + w] - o[x]) : d >= o[x] && (y = x, 
                                            b = o[o.length - 1] - o[o.length - 2]);
                                        }
                                        r = (d - o[y]) / b, a = y < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
                                        c > n.longSwipesMs ? n.longSwipes ? ("next" === t.swipeDirection && (r >= n.longSwipesRatio ? t.slideTo(y + a) : t.slideTo(y)), 
                                        "prev" === t.swipeDirection && (r > 1 - n.longSwipesRatio ? t.slideTo(y + a) : t.slideTo(y))) : t.slideTo(t.activeIndex) : n.shortSwipes ? t.navigation && (e.target === t.navigation.nextEl || e.target === t.navigation.prevEl) ? e.target === t.navigation.nextEl ? t.slideTo(y + a) : t.slideTo(y) : ("next" === t.swipeDirection && t.slideTo(y + a), 
                                        "prev" === t.swipeDirection && t.slideTo(y)) : t.slideTo(t.activeIndex);
                                    }
                                } else i.isTouched = !1, i.isMoved = !1, i.startMoving = !1;
                            } else i.isMoved && n.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, i.startMoving = !1;
                        }.bind(t), i.cssMode && (t.onScroll = function() {
                            var e = this, t = e.wrapperEl, i = e.rtlTranslate;
                            e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = i ? t.scrollWidth - t.offsetWidth - t.scrollLeft : -t.scrollLeft : e.translate = -t.scrollTop, 
                            -0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses(), 
                            (t = 0 == (t = e.maxTranslate() - e.minTranslate()) ? 0 : (e.translate - e.minTranslate()) / t) !== e.progress && e.updateProgress(i ? -e.translate : e.translate), 
                            e.emit("setTranslate", e.translate, !1);
                        }.bind(t)), t.onClick = function(e) {
                            this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), 
                            e.stopImmediatePropagation()));
                        }.bind(t), !!i.nested);
                        !x.touch && x.pointerEvents ? (a.addEventListener(n.start, t.onTouchStart, !1), 
                        c.addEventListener(n.move, t.onTouchMove, s), c.addEventListener(n.end, t.onTouchEnd, !1)) : (x.touch && (e = !("touchstart" !== n.start || !x.passiveListener || !i.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        }, a.addEventListener(n.start, t.onTouchStart, e), a.addEventListener(n.move, t.onTouchMove, x.passiveListener ? {
                            passive: !1,
                            capture: s
                        } : s), a.addEventListener(n.end, t.onTouchEnd, e), n.cancel && a.addEventListener(n.cancel, t.onTouchEnd, e), 
                        R || (c.addEventListener("touchstart", G), R = !0)), (i.simulateTouch && !d.ios && !d.android || i.simulateTouch && !x.touch && d.ios) && (a.addEventListener("mousedown", t.onTouchStart, !1), 
                        c.addEventListener("mousemove", t.onTouchMove, s), c.addEventListener("mouseup", t.onTouchEnd, !1))), 
                        (i.preventClicks || i.preventClicksPropagation) && a.addEventListener("click", t.onClick, !0), 
                        i.cssMode && r.addEventListener("scroll", t.onScroll), i.updateOnWindowResize ? t.on(d.ios || d.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", u, !0) : t.on("observerUpdate", u, !0);
                    },
                    detachEvents: function() {
                        var e, t = this, i = t.params, n = t.touchEvents, a = t.el, r = t.wrapperEl, s = !!i.nested;
                        !x.touch && x.pointerEvents ? (a.removeEventListener(n.start, t.onTouchStart, !1), 
                        c.removeEventListener(n.move, t.onTouchMove, s), c.removeEventListener(n.end, t.onTouchEnd, !1)) : (x.touch && (e = !("onTouchStart" !== n.start || !x.passiveListener || !i.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        }, a.removeEventListener(n.start, t.onTouchStart, e), a.removeEventListener(n.move, t.onTouchMove, s), 
                        a.removeEventListener(n.end, t.onTouchEnd, e), n.cancel) && a.removeEventListener(n.cancel, t.onTouchEnd, e), 
                        (i.simulateTouch && !d.ios && !d.android || i.simulateTouch && !x.touch && d.ios) && (a.removeEventListener("mousedown", t.onTouchStart, !1), 
                        c.removeEventListener("mousemove", t.onTouchMove, s), c.removeEventListener("mouseup", t.onTouchEnd, !1))), 
                        (i.preventClicks || i.preventClicksPropagation) && a.removeEventListener("click", t.onClick, !0), 
                        i.cssMode && r.removeEventListener("scroll", t.onScroll), t.off(d.ios || d.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", u);
                    }
                },
                breakpoints: {
                    setBreakpoint: function() {
                        var e, i, t, n, a = this, r = a.activeIndex, s = a.initialized, o = a.loopedSlides, l = (void 0 === o && (o = 0), 
                        a.params), d = a.$el, u = l.breakpoints;
                        u && 0 !== Object.keys(u).length && (e = a.getBreakpoint(u)) && a.currentBreakpoint !== e && ((i = e in u ? u[e] : void 0) && [ "slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerGroupSkip", "slidesPerColumn" ].forEach((function(e) {
                            var t = i[e];
                            void 0 !== t && (i[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto");
                        })), u = i || a.originalParams, t = 1 < l.slidesPerColumn, n = 1 < u.slidesPerColumn, 
                        t && !n ? d.removeClass(l.containerModifierClass + "multirow " + l.containerModifierClass + "multirow-column") : !t && n && (d.addClass(l.containerModifierClass + "multirow"), 
                        "column" === u.slidesPerColumnFill) && d.addClass(l.containerModifierClass + "multirow-column"), 
                        t = u.direction && u.direction !== l.direction, n = l.loop && (u.slidesPerView !== l.slidesPerView || t), 
                        t && s && a.changeDirection(), K.extend(a.params, u), K.extend(a, {
                            allowTouchMove: a.params.allowTouchMove,
                            allowSlideNext: a.params.allowSlideNext,
                            allowSlidePrev: a.params.allowSlidePrev
                        }), a.currentBreakpoint = e, n && s && (a.loopDestroy(), a.loopCreate(), a.updateSlides(), 
                        a.slideTo(r - o + a.loopedSlides, 0, !1)), a.emit("breakpoint", u));
                    },
                    getBreakpoint: function(e) {
                        if (e) {
                            var t = !1, i = Object.keys(e).map((function(e) {
                                var t;
                                return "string" == typeof e && 0 === e.indexOf("@") ? (t = parseFloat(e.substr(1)), 
                                {
                                    value: U.innerHeight * t,
                                    point: e
                                }) : {
                                    value: e,
                                    point: e
                                };
                            }));
                            i.sort((function(e, t) {
                                return parseInt(e.value, 10) - parseInt(t.value, 10);
                            }));
                            for (var n = 0; n < i.length; n += 1) {
                                var a = i[n], r = a.point;
                                a.value <= U.innerWidth && (t = r);
                            }
                            return t || "max";
                        }
                    }
                },
                checkOverflow: {
                    checkOverflow: function() {
                        var e = this, t = e.params, i = e.isLocked, n = 0 < e.slides.length && t.slidesOffsetBefore + t.spaceBetween * (e.slides.length - 1) + e.slides[0].offsetWidth * e.slides.length;
                        t.slidesOffsetBefore && t.slidesOffsetAfter && n ? e.isLocked = n <= e.size : e.isLocked = 1 === e.snapGrid.length, 
                        e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, i !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), 
                        i && i !== e.isLocked && (e.isEnd = !1, e.navigation.update());
                    }
                },
                classes: {
                    addClasses: function() {
                        var t = this.classNames, i = this.params, e = this.rtl, n = this.$el, a = [];
                        a.push("initialized"), a.push(i.direction), i.freeMode && a.push("free-mode"), i.autoHeight && a.push("autoheight"), 
                        e && a.push("rtl"), 1 < i.slidesPerColumn && (a.push("multirow"), "column" === i.slidesPerColumnFill) && a.push("multirow-column"), 
                        d.android && a.push("android"), d.ios && a.push("ios"), i.cssMode && a.push("css-mode"), 
                        a.forEach((function(e) {
                            t.push(i.containerModifierClass + e);
                        })), n.addClass(t.join(" "));
                    },
                    removeClasses: function() {
                        var e = this.$el, t = this.classNames;
                        e.removeClass(t.join(" "));
                    }
                },
                images: {
                    loadImage: function(e, t, i, n, a, r) {
                        function s() {
                            r && r();
                        }
                        (!e.complete || !a) && t ? ((e = new U.Image).onload = s, e.onerror = s, n && (e.sizes = n), 
                        i && (e.srcset = i), t && (e.src = t)) : s();
                    },
                    preloadImages: function() {
                        var e = this;
                        function t() {
                            null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), 
                            e.imagesLoaded === e.imagesToLoad.length) && (e.params.updateOnImagesReady && e.update(), 
                            e.emit("imagesReady"));
                        }
                        e.imagesToLoad = e.$el.find("img");
                        for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                            var n = e.imagesToLoad[i];
                            e.loadImage(n, n.currentSrc || n.getAttribute("src"), n.srcset || n.getAttribute("srcset"), n.sizes || n.getAttribute("sizes"), !0, t);
                        }
                    }
                }
            }, W = {}, f = function(d) {
                function u() {
                    for (var i, e = [], t = arguments.length; t--; ) e[t] = arguments[t];
                    i = (i = 1 === e.length && e[0].constructor && e[0].constructor === Object ? e[0] : (r = e[0], 
                    e[1])) || {}, i = K.extend({}, i), r && !i.el && (i.el = r), d.call(this, i), Object.keys(h).forEach((function(t) {
                        Object.keys(h[t]).forEach((function(e) {
                            u.prototype[e] || (u.prototype[e] = h[t][e]);
                        }));
                    }));
                    var n, a, r, s = this, o = (void 0 === s.modules && (s.modules = {}), Object.keys(s.modules).forEach((function(e) {
                        var t;
                        e = s.modules[e];
                        e.params && (t = Object.keys(e.params)[0], "object" == typeof (e = e.params[t])) && null !== e && t in i && "enabled" in e && (!0 === i[t] && (i[t] = {
                            enabled: !0
                        }), "object" != typeof i[t] || "enabled" in i[t] || (i[t].enabled = !0), i[t] || (i[t] = {
                            enabled: !1
                        }));
                    })), K.extend({}, F)), l = (s.useModulesParams(o), s.params = K.extend({}, o, W, i), 
                    s.originalParams = K.extend({}, s.params), s.passedParams = K.extend({}, i), (s.$ = E)(s.params.el));
                    if (r = l[0]) return 1 < l.length ? (n = [], l.each((function(e, t) {
                        t = K.extend({}, i, {
                            el: t
                        });
                        n.push(new u(t));
                    })), n) : (r.swiper = s, l.data("swiper", s), r && r.shadowRoot && r.shadowRoot.querySelector ? (a = E(r.shadowRoot.querySelector("." + s.params.wrapperClass))).children = function(e) {
                        return l.children(e);
                    } : a = l.children("." + s.params.wrapperClass), K.extend(s, {
                        $el: l,
                        el: r,
                        $wrapperEl: a,
                        wrapperEl: a[0],
                        classNames: [],
                        slides: E(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function() {
                            return "horizontal" === s.params.direction;
                        },
                        isVertical: function() {
                            return "vertical" === s.params.direction;
                        },
                        rtl: "rtl" === r.dir.toLowerCase() || "rtl" === l.css("direction"),
                        rtlTranslate: "horizontal" === s.params.direction && ("rtl" === r.dir.toLowerCase() || "rtl" === l.css("direction")),
                        wrongRTL: "-webkit-box" === a.css("display"),
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: s.params.allowSlideNext,
                        allowSlidePrev: s.params.allowSlidePrev,
                        touchEvents: (o = [ "touchstart", "touchmove", "touchend", "touchcancel" ], r = x.pointerEvents ? [ "pointerdown", "pointermove", "pointerup" ] : [ "mousedown", "mousemove", "mouseup" ], 
                        s.touchEventsTouch = {
                            start: o[0],
                            move: o[1],
                            end: o[2],
                            cancel: o[3]
                        }, s.touchEventsDesktop = {
                            start: r[0],
                            move: r[1],
                            end: r[2]
                        }, x.touch || !s.params.simulateTouch ? s.touchEventsTouch : s.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements: "input, select, option, textarea, button, video, label",
                            lastClickTime: K.now(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: s.params.allowTouchMove,
                        touches: {
                            startX: 0,
                            startY: 0,
                            currentX: 0,
                            currentY: 0,
                            diff: 0
                        },
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }), s.useModules(), s.params.init && s.init(), s);
                }
                d && (u.__proto__ = d);
                var e = {
                    extendedDefaults: {
                        configurable: !0
                    },
                    defaults: {
                        configurable: !0
                    },
                    Class: {
                        configurable: !0
                    },
                    $: {
                        configurable: !0
                    }
                };
                return ((u.prototype = Object.create(d && d.prototype)).constructor = u).prototype.slidesPerViewDynamic = function() {
                    var e = this, t = e.params, i = e.slides, n = e.slidesGrid, a = e.size, r = e.activeIndex, s = 1;
                    if (t.centeredSlides) {
                        for (var o, l = i[r].swiperSlideSize, d = r + 1; d < i.length; d += 1) i[d] && !o && (s += 1, 
                        a < (l += i[d].swiperSlideSize)) && (o = !0);
                        for (var u = r - 1; 0 <= u; --u) i[u] && !o && (s += 1, a < (l += i[u].swiperSlideSize)) && (o = !0);
                    } else for (var c = r + 1; c < i.length; c += 1) n[c] - n[r] < a && (s += 1);
                    return s;
                }, u.prototype.update = function() {
                    var e, t, i = this;
                    function n() {
                        var e = i.rtlTranslate ? -1 * i.translate : i.translate;
                        e = Math.min(Math.max(e, i.maxTranslate()), i.minTranslate());
                        i.setTranslate(e), i.updateActiveIndex(), i.updateSlidesClasses();
                    }
                    i && !i.destroyed && (e = i.snapGrid, (t = i.params).breakpoints && i.setBreakpoint(), 
                    i.updateSize(), i.updateSlides(), i.updateProgress(), i.updateSlidesClasses(), i.params.freeMode ? (n(), 
                    i.params.autoHeight && i.updateAutoHeight()) : (("auto" === i.params.slidesPerView || 1 < i.params.slidesPerView) && i.isEnd && !i.params.centeredSlides ? i.slideTo(i.slides.length - 1, 0, !1, !0) : i.slideTo(i.activeIndex, 0, !1, !0)) || n(), 
                    t.watchOverflow && e !== i.snapGrid && i.checkOverflow(), i.emit("update"));
                }, u.prototype.changeDirection = function(i, e) {
                    void 0 === e && (e = !0);
                    var t = this, n = t.params.direction;
                    return (i = i || ("horizontal" === n ? "vertical" : "horizontal")) === n || "horizontal" !== i && "vertical" !== i || (t.$el.removeClass("" + t.params.containerModifierClass + n).addClass("" + t.params.containerModifierClass + i), 
                    t.params.direction = i, t.slides.each((function(e, t) {
                        "vertical" === i ? t.style.width = "" : t.style.height = "";
                    })), t.emit("changeDirection"), e && t.update()), t;
                }, u.prototype.init = function() {
                    var e = this;
                    e.initialized || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), 
                    e.addClasses(), e.params.loop && e.loopCreate(), e.updateSize(), e.updateSlides(), 
                    e.params.watchOverflow && e.checkOverflow(), e.params.grabCursor && e.setGrabCursor(), 
                    e.params.preloadImages && e.preloadImages(), e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit), 
                    e.attachEvents(), e.initialized = !0, e.emit("init"));
                }, u.prototype.destroy = function(e, t) {
                    void 0 === e && (e = !0), void 0 === t && (t = !0);
                    var i = this, n = i.params, a = i.$el, r = i.$wrapperEl, s = i.slides;
                    return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, 
                    i.detachEvents(), n.loop && i.loopDestroy(), t && (i.removeClasses(), a.removeAttr("style"), 
                    r.removeAttr("style"), s) && s.length && s.removeClass([ n.slideVisibleClass, n.slideActiveClass, n.slideNextClass, n.slidePrevClass ].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index"), 
                    i.emit("destroy"), Object.keys(i.eventsListeners).forEach((function(e) {
                        i.off(e);
                    })), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), K.deleteProps(i)), 
                    i.destroyed = !0), null;
                }, u.extendDefaults = function(e) {
                    K.extend(W, e);
                }, e.extendedDefaults.get = function() {
                    return W;
                }, e.defaults.get = function() {
                    return F;
                }, e.Class.get = function() {
                    return d;
                }, e.$.get = function() {
                    return E;
                }, Object.defineProperties(u, e), u;
            }(e), m = {
                name: "device",
                proto: {
                    device: d
                },
                static: {
                    device: d
                }
            }, v = {
                name: "support",
                proto: {
                    support: x
                },
                static: {
                    support: x
                }
            }, C = {
                isEdge: !!U.navigator.userAgent.match(/Edge/g),
                isSafari: 0 <= (p = U.navigator.userAgent.toLowerCase()).indexOf("safari") && p.indexOf("chrome") < 0 && p.indexOf("android") < 0,
                isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(U.navigator.userAgent)
            }, X = {
                name: "browser",
                proto: {
                    browser: C
                },
                static: {
                    browser: C
                }
            }, V = {
                name: "resize",
                create: function() {
                    var e = this;
                    K.extend(e, {
                        resize: {
                            resizeHandler: function() {
                                e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"));
                            },
                            orientationChangeHandler: function() {
                                e && !e.destroyed && e.initialized && e.emit("orientationchange");
                            }
                        }
                    });
                },
                on: {
                    init: function() {
                        U.addEventListener("resize", this.resize.resizeHandler), U.addEventListener("orientationchange", this.resize.orientationChangeHandler);
                    },
                    destroy: function() {
                        U.removeEventListener("resize", this.resize.resizeHandler), U.removeEventListener("orientationchange", this.resize.orientationChangeHandler);
                    }
                }
            }, g = {
                func: U.MutationObserver || U.WebkitMutationObserver,
                attach: function(e, t) {
                    void 0 === t && (t = {});
                    var i = this, n = new g.func((function(e) {
                        var t;
                        1 === e.length ? i.emit("observerUpdate", e[0]) : (t = function() {
                            i.emit("observerUpdate", e[0]);
                        }, U.requestAnimationFrame ? U.requestAnimationFrame(t) : U.setTimeout(t, 0));
                    }));
                    n.observe(e, {
                        attributes: void 0 === t.attributes || t.attributes,
                        childList: void 0 === t.childList || t.childList,
                        characterData: void 0 === t.characterData || t.characterData
                    }), i.observer.observers.push(n);
                },
                init: function() {
                    var e = this;
                    if (x.observer && e.params.observer) {
                        if (e.params.observeParents) for (var t = e.$el.parents(), i = 0; i < t.length; i += 1) e.observer.attach(t[i]);
                        e.observer.attach(e.$el[0], {
                            childList: e.params.observeSlideChildren
                        }), e.observer.attach(e.$wrapperEl[0], {
                            attributes: !1
                        });
                    }
                },
                destroy: function() {
                    this.observer.observers.forEach((function(e) {
                        e.disconnect();
                    })), this.observer.observers = [];
                }
            }, y = {
                name: "observer",
                params: {
                    observer: !1,
                    observeParents: !1,
                    observeSlideChildren: !1
                },
                create: function() {
                    K.extend(this, {
                        observer: {
                            init: g.init.bind(this),
                            attach: g.attach.bind(this),
                            destroy: g.destroy.bind(this),
                            observers: []
                        }
                    });
                },
                on: {
                    init: function() {
                        this.observer.init();
                    },
                    destroy: function() {
                        this.observer.destroy();
                    }
                }
            }, b = {
                update: function(e) {
                    var t, i = this, n = i.params, a = n.slidesPerView, r = n.slidesPerGroup, s = (n = n.centeredSlides, 
                    i.params.virtual), o = s.addSlidesBefore, l = (s = s.addSlidesAfter, i.virtual), d = l.from, u = l.to, c = l.slides, p = l.slidesGrid, h = l.renderSlide, f = (l = l.offset, 
                    i.updateActiveIndex(), i.activeIndex || 0), m = i.rtlTranslate ? "right" : i.isHorizontal() ? "left" : "top", v = (n = n ? (t = Math.floor(a / 2) + r + o, 
                    Math.floor(a / 2) + r + s) : (t = a + (r - 1) + o, r + s), Math.max((f || 0) - n, 0)), g = Math.min((f || 0) + t, c.length - 1);
                    a = (i.slidesGrid[v] || 0) - (i.slidesGrid[0] || 0);
                    function y() {
                        i.updateSlides(), i.updateProgress(), i.updateSlidesClasses(), i.lazy && i.params.lazy.enabled && i.lazy.load();
                    }
                    if (K.extend(i.virtual, {
                        from: v,
                        to: g,
                        offset: a,
                        slidesGrid: i.slidesGrid
                    }), d !== v || u !== g || e) {
                        if (i.params.virtual.renderExternal) i.params.virtual.renderExternal.call(i, {
                            offset: a,
                            from: v,
                            to: g,
                            slides: function() {
                                for (var e = [], t = v; t <= g; t += 1) e.push(c[t]);
                                return e;
                            }()
                        }); else {
                            var b = [], x = [];
                            if (e) i.$wrapperEl.find("." + i.params.slideClass).remove(); else for (var w = d; w <= u; w += 1) (w < v || g < w) && i.$wrapperEl.find("." + i.params.slideClass + '[data-swiper-slide-index="' + w + '"]').remove();
                            for (var T = 0; T < c.length; T += 1) v <= T && T <= g && (void 0 === u || e ? x.push(T) : (u < T && x.push(T), 
                            T < d && b.push(T)));
                            x.forEach((function(e) {
                                i.$wrapperEl.append(h(c[e], e));
                            })), b.sort((function(e, t) {
                                return t - e;
                            })).forEach((function(e) {
                                i.$wrapperEl.prepend(h(c[e], e));
                            })), i.$wrapperEl.children(".swiper-slide").css(m, a + "px");
                        }
                        y();
                    } else i.slidesGrid !== p && a !== l && i.slides.css(m, a + "px"), i.updateProgress();
                },
                renderSlide: function(e, t) {
                    var i = this, n = i.params.virtual;
                    return n.cache && i.virtual.cache[t] ? i.virtual.cache[t] : ((e = n.renderSlide ? E(n.renderSlide.call(i, e, t)) : E('<div class="' + i.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>")).attr("data-swiper-slide-index") || e.attr("data-swiper-slide-index", t), 
                    n.cache && (i.virtual.cache[t] = e), e);
                },
                appendSlide: function(e) {
                    if ("object" == typeof e && "length" in e) for (var t = 0; t < e.length; t += 1) e[t] && this.virtual.slides.push(e[t]); else this.virtual.slides.push(e);
                    this.virtual.update(!0);
                },
                prependSlide: function(e) {
                    var n, a, t = this, i = t.activeIndex, r = i + 1, s = 1;
                    if (Array.isArray(e)) {
                        for (var o = 0; o < e.length; o += 1) e[o] && t.virtual.slides.unshift(e[o]);
                        r = i + e.length, s = e.length;
                    } else t.virtual.slides.unshift(e);
                    t.params.virtual.cache && (n = t.virtual.cache, a = {}, Object.keys(n).forEach((function(e) {
                        var t = n[e], i = t.attr("data-swiper-slide-index");
                        i && t.attr("data-swiper-slide-index", parseInt(i, 10) + 1), a[parseInt(e, 10) + s] = t;
                    })), t.virtual.cache = a), t.virtual.update(!0), t.slideTo(r, 0);
                },
                removeSlide: function(e) {
                    var t = this;
                    if (null != e) {
                        var i = t.activeIndex;
                        if (Array.isArray(e)) for (var n = e.length - 1; 0 <= n; --n) t.virtual.slides.splice(e[n], 1), 
                        t.params.virtual.cache && delete t.virtual.cache[e[n]], e[n] < i && --i, i = Math.max(i, 0); else t.virtual.slides.splice(e, 1), 
                        t.params.virtual.cache && delete t.virtual.cache[e], e < i && --i, i = Math.max(i, 0);
                        t.virtual.update(!0), t.slideTo(i, 0);
                    }
                },
                removeAllSlides: function() {
                    var e = this;
                    e.virtual.slides = [], e.params.virtual.cache && (e.virtual.cache = {}), e.virtual.update(!0), 
                    e.slideTo(0, 0);
                }
            }, w = {
                name: "virtual",
                params: {
                    virtual: {
                        enabled: !1,
                        slides: [],
                        cache: !0,
                        renderSlide: null,
                        renderExternal: null,
                        addSlidesBefore: 0,
                        addSlidesAfter: 0
                    }
                },
                create: function() {
                    var e = this;
                    K.extend(e, {
                        virtual: {
                            update: b.update.bind(e),
                            appendSlide: b.appendSlide.bind(e),
                            prependSlide: b.prependSlide.bind(e),
                            removeSlide: b.removeSlide.bind(e),
                            removeAllSlides: b.removeAllSlides.bind(e),
                            renderSlide: b.renderSlide.bind(e),
                            slides: e.params.virtual.slides,
                            cache: {}
                        }
                    });
                },
                on: {
                    beforeInit: function() {
                        var e, t = this;
                        t.params.virtual.enabled && (t.classNames.push(t.params.containerModifierClass + "virtual"), 
                        K.extend(t.params, e = {
                            watchSlidesProgress: !0
                        }), K.extend(t.originalParams, e), t.params.initialSlide || t.virtual.update());
                    },
                    setTranslate: function() {
                        this.params.virtual.enabled && this.virtual.update();
                    }
                }
            }, Y = {
                handle: function(e) {
                    var t = this, i = t.rtlTranslate, n = (e = e.originalEvent ? e.originalEvent : e).keyCode || e.charCode;
                    if (!t.allowSlideNext && (t.isHorizontal() && 39 === n || t.isVertical() && 40 === n || 34 === n)) return !1;
                    if (!t.allowSlidePrev && (t.isHorizontal() && 37 === n || t.isVertical() && 38 === n || 33 === n)) return !1;
                    if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || c.activeElement && c.activeElement.nodeName && ("input" === c.activeElement.nodeName.toLowerCase() || "textarea" === c.activeElement.nodeName.toLowerCase()))) {
                        if (t.params.keyboard.onlyInViewport && (33 === n || 34 === n || 37 === n || 39 === n || 38 === n || 40 === n)) {
                            var a = !1;
                            if (0 < t.$el.parents("." + t.params.slideClass).length && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
                            for (var r = U.innerWidth, s = U.innerHeight, o = t.$el.offset(), l = (i && (o.left -= t.$el[0].scrollLeft), 
                            [ [ o.left, o.top ], [ o.left + t.width, o.top ], [ o.left, o.top + t.height ], [ o.left + t.width, o.top + t.height ] ]), d = 0; d < l.length; d += 1) {
                                var u = l[d];
                                0 <= u[0] && u[0] <= r && 0 <= u[1] && u[1] <= s && (a = !0);
                            }
                            if (!a) return;
                        }
                        t.isHorizontal() ? (33 !== n && 34 !== n && 37 !== n && 39 !== n || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 
                        (34 !== n && 39 !== n || i) && (33 !== n && 37 !== n || !i) || t.slideNext(), (33 !== n && 37 !== n || i) && (34 !== n && 39 !== n || !i) || t.slidePrev()) : (33 !== n && 34 !== n && 38 !== n && 40 !== n || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 
                        34 !== n && 40 !== n || t.slideNext(), 33 !== n && 38 !== n || t.slidePrev()), t.emit("keyPress", n);
                    }
                },
                enable: function() {
                    this.keyboard.enabled || (E(c).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0);
                },
                disable: function() {
                    this.keyboard.enabled && (E(c).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1);
                }
            }, T = {
                name: "keyboard",
                params: {
                    keyboard: {
                        enabled: !1,
                        onlyInViewport: !0
                    }
                },
                create: function() {
                    K.extend(this, {
                        keyboard: {
                            enabled: !1,
                            enable: Y.enable.bind(this),
                            disable: Y.disable.bind(this),
                            handle: Y.handle.bind(this)
                        }
                    });
                },
                on: {
                    init: function() {
                        this.params.keyboard.enabled && this.keyboard.enable();
                    },
                    destroy: function() {
                        this.keyboard.enabled && this.keyboard.disable();
                    }
                }
            };
            var S = {
                lastScrollTime: K.now(),
                lastEventBeforeSnap: void 0,
                recentWheelEvents: [],
                event: function() {
                    return -1 < U.navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : ((i = (t = "onwheel") in c) || ((e = c.createElement("div")).setAttribute(t, "return;"), 
                    i = "function" == typeof e[t]), (i = !i && c.implementation && c.implementation.hasFeature && !0 !== c.implementation.hasFeature("", "") ? c.implementation.hasFeature("Events.wheel", "3.0") : i) ? "wheel" : "mousewheel");
                    var e, t, i;
                },
                normalize: function(e) {
                    var t = 0, i = 0, n = 0, a = 0;
                    return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), 
                    "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), 
                    "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), n = 10 * t, a = 10 * i, 
                    "deltaY" in e && (a = e.deltaY), "deltaX" in e && (n = e.deltaX), e.shiftKey && !n && (n = a, 
                    a = 0), (n || a) && e.deltaMode && (1 === e.deltaMode ? (n *= 40, a *= 40) : (n *= 800, 
                    a *= 800)), {
                        spinX: t = n && !t ? n < 1 ? -1 : 1 : t,
                        spinY: i = a && !i ? a < 1 ? -1 : 1 : i,
                        pixelX: n,
                        pixelY: a
                    };
                },
                handleMouseEnter: function() {
                    this.mouseEntered = !0;
                },
                handleMouseLeave: function() {
                    this.mouseEntered = !1;
                },
                handle: function(e) {
                    var t = e, i = this, n = i.params.mousewheel, a = (i.params.cssMode && t.preventDefault(), 
                    i.$el);
                    if ("container" !== i.params.mousewheel.eventsTarged && (a = E(i.params.mousewheel.eventsTarged)), 
                    !i.mouseEntered && !a[0].contains(t.target) && !n.releaseOnEdges) return !0;
                    t.originalEvent && (t = t.originalEvent);
                    a = 0;
                    var r = i.rtlTranslate ? -1 : 1, s = S.normalize(t);
                    if (n.forceToAxis) if (i.isHorizontal()) {
                        if (!(Math.abs(s.pixelX) > Math.abs(s.pixelY))) return !0;
                        a = s.pixelX * r;
                    } else {
                        if (!(Math.abs(s.pixelY) > Math.abs(s.pixelX))) return !0;
                        a = s.pixelY;
                    } else a = Math.abs(s.pixelX) > Math.abs(s.pixelY) ? -s.pixelX * r : -s.pixelY;
                    if (0 === a) return !0;
                    if (n.invert && (a = -a), i.params.freeMode) {
                        var o = {
                            time: K.now(),
                            delta: Math.abs(a),
                            direction: Math.sign(a)
                        };
                        r = i.mousewheel.lastEventBeforeSnap, s = r && o.time < r.time + 500 && o.delta <= r.delta && o.direction === r.direction;
                        if (!s) {
                            i.mousewheel.lastEventBeforeSnap = void 0, i.params.loop && i.loopFix();
                            r = i.getTranslate() + a * n.sensitivity, n = i.isBeginning;
                            var l, d, u = i.isEnd;
                            if ((r = r >= i.minTranslate() ? i.minTranslate() : r) <= i.maxTranslate() && (r = i.maxTranslate()), 
                            i.setTransition(0), i.setTranslate(r), i.updateProgress(), i.updateActiveIndex(), 
                            i.updateSlidesClasses(), (!n && i.isBeginning || !u && i.isEnd) && i.updateSlidesClasses(), 
                            i.params.freeModeSticky && (clearTimeout(i.mousewheel.timeout), i.mousewheel.timeout = void 0, 
                            15 <= (l = i.mousewheel.recentWheelEvents).length && l.shift(), n = l.length ? l[l.length - 1] : void 0, 
                            u = l[0], l.push(o), n && (o.delta > n.delta || o.direction !== n.direction) ? l.splice(0) : 15 <= l.length && o.time - u.time < 500 && 1 <= u.delta - o.delta && o.delta <= 6 && (d = 0 < a ? .8 : .2, 
                            i.mousewheel.lastEventBeforeSnap = o, l.splice(0), i.mousewheel.timeout = K.nextTick((function() {
                                i.slideToClosest(i.params.speed, !0, void 0, d);
                            }), 0)), i.mousewheel.timeout || (i.mousewheel.timeout = K.nextTick((function() {
                                i.mousewheel.lastEventBeforeSnap = o, l.splice(0), i.slideToClosest(i.params.speed, !0, void 0, .5);
                            }), 500))), s || i.emit("scroll", t), i.params.autoplay && i.params.autoplayDisableOnInteraction && i.autoplay.stop(), 
                            r === i.minTranslate() || r === i.maxTranslate()) return !0;
                        }
                    } else {
                        n = {
                            time: K.now(),
                            delta: Math.abs(a),
                            direction: Math.sign(a),
                            raw: e
                        }, u = i.mousewheel.recentWheelEvents, s = (2 <= u.length && u.shift(), u.length ? u[u.length - 1] : void 0);
                        if (u.push(n), (!s || n.direction !== s.direction || n.delta > s.delta) && i.mousewheel.animateSlider(n), 
                        i.mousewheel.releaseScroll(n)) return !0;
                    }
                    return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1;
                },
                animateSlider: function(e) {
                    var t = this;
                    return 6 <= e.delta && K.now() - t.mousewheel.lastScrollTime < 60 || (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(), 
                    t.emit("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(), 
                    t.emit("scroll", e.raw)), t.mousewheel.lastScrollTime = (new U.Date).getTime(), 
                    !1);
                },
                releaseScroll: function(e) {
                    var t = this, i = t.params.mousewheel;
                    if (e.direction < 0) {
                        if (t.isEnd && !t.params.loop && i.releaseOnEdges) return !0;
                    } else if (t.isBeginning && !t.params.loop && i.releaseOnEdges) return !0;
                    return !1;
                },
                enable: function() {
                    var e = this, t = S.event();
                    if (e.params.cssMode) e.wrapperEl.removeEventListener(t, e.mousewheel.handle); else {
                        if (!t) return !1;
                        if (e.mousewheel.enabled) return !1;
                        var i = e.$el;
                        (i = "container" !== e.params.mousewheel.eventsTarged ? E(e.params.mousewheel.eventsTarged) : i).on("mouseenter", e.mousewheel.handleMouseEnter), 
                        i.on("mouseleave", e.mousewheel.handleMouseLeave), i.on(t, e.mousewheel.handle), 
                        e.mousewheel.enabled = !0;
                    }
                    return !0;
                },
                disable: function() {
                    var e = this, t = S.event();
                    if (e.params.cssMode) e.wrapperEl.addEventListener(t, e.mousewheel.handle); else {
                        if (!t) return !1;
                        if (!e.mousewheel.enabled) return !1;
                        var i = e.$el;
                        (i = "container" !== e.params.mousewheel.eventsTarged ? E(e.params.mousewheel.eventsTarged) : i).off(t, e.mousewheel.handle), 
                        e.mousewheel.enabled = !1;
                    }
                    return !0;
                }
            }, M = {
                update: function() {
                    var e, t, i = this, n = i.params.navigation;
                    i.params.loop || (e = (t = i.navigation).$nextEl, (t = t.$prevEl) && 0 < t.length && (i.isBeginning ? t.addClass(n.disabledClass) : t.removeClass(n.disabledClass), 
                    t[i.params.watchOverflow && i.isLocked ? "addClass" : "removeClass"](n.lockClass)), 
                    e && 0 < e.length && (i.isEnd ? e.addClass(n.disabledClass) : e.removeClass(n.disabledClass), 
                    e[i.params.watchOverflow && i.isLocked ? "addClass" : "removeClass"](n.lockClass)));
                },
                onPrevClick: function(e) {
                    e.preventDefault(), this.isBeginning && !this.params.loop || this.slidePrev();
                },
                onNextClick: function(e) {
                    e.preventDefault(), this.isEnd && !this.params.loop || this.slideNext();
                },
                init: function() {
                    var e, t, i = this, n = i.params.navigation;
                    (n.nextEl || n.prevEl) && (n.nextEl && (e = E(n.nextEl), i.params.uniqueNavElements) && "string" == typeof n.nextEl && 1 < e.length && 1 === i.$el.find(n.nextEl).length && (e = i.$el.find(n.nextEl)), 
                    n.prevEl && (t = E(n.prevEl), i.params.uniqueNavElements) && "string" == typeof n.prevEl && 1 < t.length && 1 === i.$el.find(n.prevEl).length && (t = i.$el.find(n.prevEl)), 
                    e && 0 < e.length && e.on("click", i.navigation.onNextClick), t && 0 < t.length && t.on("click", i.navigation.onPrevClick), 
                    K.extend(i.navigation, {
                        $nextEl: e,
                        nextEl: e && e[0],
                        $prevEl: t,
                        prevEl: t && t[0]
                    }));
                },
                destroy: function() {
                    var e = this, t = e.navigation, i = t.$nextEl;
                    t = t.$prevEl;
                    i && i.length && (i.off("click", e.navigation.onNextClick), i.removeClass(e.params.navigation.disabledClass)), 
                    t && t.length && (t.off("click", e.navigation.onPrevClick), t.removeClass(e.params.navigation.disabledClass));
                }
            }, k = {
                update: function() {
                    var e = this, t = e.rtl, n = e.params.pagination;
                    if (n.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                        var a, i = (e.virtual && e.params.virtual.enabled ? e.virtual : e).slides.length, r = e.pagination.$el, s = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                        if (e.params.loop ? ((a = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > i - 1 - 2 * e.loopedSlides && (a -= i - 2 * e.loopedSlides), 
                        s - 1 < a && (a -= s), a < 0 && "bullets" !== e.params.paginationType && (a = s + a)) : a = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, 
                        "bullets" === n.type && e.pagination.bullets && 0 < e.pagination.bullets.length) {
                            var o, l, d, u = e.pagination.bullets;
                            if (n.dynamicBullets && (e.pagination.bulletSize = u.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), 
                            r.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (n.dynamicMainBullets + 4) + "px"), 
                            1 < n.dynamicMainBullets && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += a - e.previousIndex, 
                            e.pagination.dynamicBulletIndex > n.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = n.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), 
                            o = a - e.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(u.length, n.dynamicMainBullets) - 1)) + o) / 2), 
                            u.removeClass(n.bulletActiveClass + " " + n.bulletActiveClass + "-next " + n.bulletActiveClass + "-next-next " + n.bulletActiveClass + "-prev " + n.bulletActiveClass + "-prev-prev " + n.bulletActiveClass + "-main"), 
                            1 < r.length) u.each((function(e, t) {
                                t = E(t);
                                var i = t.index();
                                i === a && t.addClass(n.bulletActiveClass), n.dynamicBullets && (o <= i && i <= l && t.addClass(n.bulletActiveClass + "-main"), 
                                i === o && t.prev().addClass(n.bulletActiveClass + "-prev").prev().addClass(n.bulletActiveClass + "-prev-prev"), 
                                i === l) && t.next().addClass(n.bulletActiveClass + "-next").next().addClass(n.bulletActiveClass + "-next-next");
                            })); else {
                                i = u.eq(a);
                                var c = i.index();
                                if (i.addClass(n.bulletActiveClass), n.dynamicBullets) {
                                    i = u.eq(o);
                                    for (var p = u.eq(l), h = o; h <= l; h += 1) u.eq(h).addClass(n.bulletActiveClass + "-main");
                                    if (e.params.loop) if (c >= u.length - n.dynamicMainBullets) {
                                        for (var f = n.dynamicMainBullets; 0 <= f; --f) u.eq(u.length - f).addClass(n.bulletActiveClass + "-main");
                                        u.eq(u.length - n.dynamicMainBullets - 1).addClass(n.bulletActiveClass + "-prev");
                                    } else i.prev().addClass(n.bulletActiveClass + "-prev").prev().addClass(n.bulletActiveClass + "-prev-prev"), 
                                    p.next().addClass(n.bulletActiveClass + "-next").next().addClass(n.bulletActiveClass + "-next-next"); else i.prev().addClass(n.bulletActiveClass + "-prev").prev().addClass(n.bulletActiveClass + "-prev-prev"), 
                                    p.next().addClass(n.bulletActiveClass + "-next").next().addClass(n.bulletActiveClass + "-next-next");
                                }
                            }
                            n.dynamicBullets && (c = Math.min(u.length, n.dynamicMainBullets + 4), i = (e.pagination.bulletSize * c - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize, 
                            p = t ? "right" : "left", u.css(e.isHorizontal() ? p : "top", i + "px"));
                        }
                        "fraction" === n.type && (r.find("." + n.currentClass).text(n.formatFractionCurrent(a + 1)), 
                        r.find("." + n.totalClass).text(n.formatFractionTotal(s))), "progressbar" === n.type && (c = n.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical", 
                        d = (a + 1) / s, p = t = 1, "horizontal" === c ? t = d : p = d, r.find("." + n.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + t + ") scaleY(" + p + ")").transition(e.params.speed)), 
                        "custom" === n.type && n.renderCustom ? (r.html(n.renderCustom(e, a + 1, s)), e.emit("paginationRender", e, r[0])) : e.emit("paginationUpdate", e, r[0]), 
                        r[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](n.lockClass);
                    }
                },
                render: function() {
                    var e = this, t = e.params.pagination;
                    if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                        var i = (e.virtual && e.params.virtual.enabled ? e.virtual : e).slides.length, n = e.pagination.$el, a = "";
                        if ("bullets" === t.type) {
                            for (var r = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, s = 0; s < r; s += 1) t.renderBullet ? a += t.renderBullet.call(e, s, t.bulletClass) : a += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                            n.html(a), e.pagination.bullets = n.find("." + t.bulletClass);
                        }
                        "fraction" === t.type && (a = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', 
                        n.html(a)), "progressbar" === t.type && (a = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', 
                        n.html(a)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0]);
                    }
                },
                init: function() {
                    var e, t = this, i = t.params.pagination;
                    i.el && 0 !== (e = E(i.el)).length && (t.params.uniqueNavElements && "string" == typeof i.el && 1 < e.length && 1 === t.$el.find(i.el).length && (e = t.$el.find(i.el)), 
                    "bullets" === i.type && i.clickable && e.addClass(i.clickableClass), e.addClass(i.modifierClass + i.type), 
                    "bullets" === i.type && i.dynamicBullets && (e.addClass("" + i.modifierClass + i.type + "-dynamic"), 
                    t.pagination.dynamicBulletIndex = 0, i.dynamicMainBullets < 1) && (i.dynamicMainBullets = 1), 
                    "progressbar" === i.type && i.progressbarOpposite && e.addClass(i.progressbarOppositeClass), 
                    i.clickable && e.on("click", "." + i.bulletClass, (function(e) {
                        e.preventDefault();
                        e = E(this).index() * t.params.slidesPerGroup;
                        t.params.loop && (e += t.loopedSlides), t.slideTo(e);
                    })), K.extend(t.pagination, {
                        $el: e,
                        el: e[0]
                    }));
                },
                destroy: function() {
                    var e, t = this, i = t.params.pagination;
                    i.el && t.pagination.el && t.pagination.$el && 0 !== t.pagination.$el.length && ((e = t.pagination.$el).removeClass(i.hiddenClass), 
                    e.removeClass(i.modifierClass + i.type), t.pagination.bullets && t.pagination.bullets.removeClass(i.bulletActiveClass), 
                    i.clickable) && e.off("click", "." + i.bulletClass);
                }
            }, P = {
                setTranslate: function() {
                    var e, t, i, n, a, r, s, o, l = this;
                    l.params.scrollbar.el && l.scrollbar.el && (r = l.scrollbar, e = l.rtlTranslate, 
                    o = l.progress, t = r.dragSize, i = r.trackSize, n = r.$dragEl, a = r.$el, r = l.params.scrollbar, 
                    o = (i - (s = t)) * o, e ? 0 < (o = -o) ? (s = t - o, o = 0) : i < -o + t && (s = i + o) : o < 0 ? (s = t + o, 
                    o = 0) : i < o + t && (s = i - o), l.isHorizontal() ? (n.transform("translate3d(" + o + "px, 0, 0)"), 
                    n[0].style.width = s + "px") : (n.transform("translate3d(0px, " + o + "px, 0)"), 
                    n[0].style.height = s + "px"), r.hide) && (clearTimeout(l.scrollbar.timeout), a[0].style.opacity = 1, 
                    l.scrollbar.timeout = setTimeout((function() {
                        a[0].style.opacity = 0, a.transition(400);
                    }), 1e3));
                },
                setTransition: function(e) {
                    this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e);
                },
                updateSize: function() {
                    var e, t, i, n, a, r, s, o = this;
                    o.params.scrollbar.el && o.scrollbar.el && (t = (e = o.scrollbar).$dragEl, i = e.$el, 
                    t[0].style.width = "", t[0].style.height = "", n = o.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, 
                    r = (a = o.size / o.virtualSize) * (n / o.size), s = "auto" === o.params.scrollbar.dragSize ? n * a : parseInt(o.params.scrollbar.dragSize, 10), 
                    o.isHorizontal() ? t[0].style.width = s + "px" : t[0].style.height = s + "px", i[0].style.display = 1 <= a ? "none" : "", 
                    o.params.scrollbar.hide && (i[0].style.opacity = 0), K.extend(e, {
                        trackSize: n,
                        divider: a,
                        moveDivider: r,
                        dragSize: s
                    }), e.$el[o.params.watchOverflow && o.isLocked ? "addClass" : "removeClass"](o.params.scrollbar.lockClass));
                },
                getPointerPosition: function(e) {
                    return this.isHorizontal() ? ("touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0] : e).clientX : ("touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0] : e).clientY;
                },
                setDragPosition: function(e) {
                    var t = this, i = t.scrollbar, n = t.rtlTranslate, a = i.$el, r = i.dragSize, s = i.trackSize, o = i.dragStartPos;
                    i = (i.getPointerPosition(e) - a.offset()[t.isHorizontal() ? "left" : "top"] - (null !== o ? o : r / 2)) / (s - r), 
                    e = (i = Math.max(Math.min(i, 1), 0), n && (i = 1 - i), t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * i);
                    t.updateProgress(e), t.setTranslate(e), t.updateActiveIndex(), t.updateSlidesClasses();
                },
                onDragStart: function(e) {
                    var t = this, i = t.params.scrollbar, n = t.scrollbar, a = t.$wrapperEl, r = n.$el, s = n.$dragEl;
                    t.scrollbar.isTouched = !0, t.scrollbar.dragStartPos = e.target === s[0] || e.target === s ? n.getPointerPosition(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null, 
                    e.preventDefault(), e.stopPropagation(), a.transition(100), s.transition(100), n.setDragPosition(e), 
                    clearTimeout(t.scrollbar.dragTimeout), r.transition(0), i.hide && r.css("opacity", 1), 
                    t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"), t.emit("scrollbarDragStart", e);
                },
                onDragMove: function(e) {
                    var t = this.scrollbar, i = this.$wrapperEl, n = t.$el, a = t.$dragEl;
                    this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, 
                    t.setDragPosition(e), i.transition(0), n.transition(0), a.transition(0), this.emit("scrollbarDragMove", e));
                },
                onDragEnd: function(e) {
                    var t = this, i = t.params.scrollbar, n = t.scrollbar, a = t.$wrapperEl, r = n.$el;
                    t.scrollbar.isTouched && (t.scrollbar.isTouched = !1, t.params.cssMode && (t.$wrapperEl.css("scroll-snap-type", ""), 
                    a.transition("")), i.hide && (clearTimeout(t.scrollbar.dragTimeout), t.scrollbar.dragTimeout = K.nextTick((function() {
                        r.css("opacity", 0), r.transition(400);
                    }), 1e3)), t.emit("scrollbarDragEnd", e), i.snapOnRelease) && t.slideToClosest();
                },
                enableDraggable: function() {
                    var e, t, i, n, a, r = this;
                    r.params.scrollbar.el && (i = r.scrollbar, e = r.touchEventsTouch, t = r.touchEventsDesktop, 
                    a = r.params, i = i.$el[0], n = !(!x.passiveListener || !a.passiveListeners) && {
                        passive: !1,
                        capture: !1
                    }, a = !(!x.passiveListener || !a.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    }, x.touch ? (i.addEventListener(e.start, r.scrollbar.onDragStart, n), i.addEventListener(e.move, r.scrollbar.onDragMove, n), 
                    i.addEventListener(e.end, r.scrollbar.onDragEnd, a)) : (i.addEventListener(t.start, r.scrollbar.onDragStart, n), 
                    c.addEventListener(t.move, r.scrollbar.onDragMove, n), c.addEventListener(t.end, r.scrollbar.onDragEnd, a)));
                },
                disableDraggable: function() {
                    var e, t, i, n, a, r = this;
                    r.params.scrollbar.el && (i = r.scrollbar, e = r.touchEventsTouch, t = r.touchEventsDesktop, 
                    a = r.params, i = i.$el[0], n = !(!x.passiveListener || !a.passiveListeners) && {
                        passive: !1,
                        capture: !1
                    }, a = !(!x.passiveListener || !a.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    }, x.touch ? (i.removeEventListener(e.start, r.scrollbar.onDragStart, n), i.removeEventListener(e.move, r.scrollbar.onDragMove, n), 
                    i.removeEventListener(e.end, r.scrollbar.onDragEnd, a)) : (i.removeEventListener(t.start, r.scrollbar.onDragStart, n), 
                    c.removeEventListener(t.move, r.scrollbar.onDragMove, n), c.removeEventListener(t.end, r.scrollbar.onDragEnd, a)));
                },
                init: function() {
                    var e, t, i, n, a = this;
                    a.params.scrollbar.el && (e = a.scrollbar, n = a.$el, i = E((t = a.params.scrollbar).el), 
                    0 === (n = (i = a.params.uniqueNavElements && "string" == typeof t.el && 1 < i.length && 1 === n.find(t.el).length ? n.find(t.el) : i).find("." + a.params.scrollbar.dragClass)).length && (n = E('<div class="' + a.params.scrollbar.dragClass + '"></div>'), 
                    i.append(n)), K.extend(e, {
                        $el: i,
                        el: i[0],
                        $dragEl: n,
                        dragEl: n[0]
                    }), t.draggable) && e.enableDraggable();
                },
                destroy: function() {
                    this.scrollbar.disableDraggable();
                }
            }, _ = {
                setTransform: function(e, t) {
                    var i = this.rtl, n = (e = E(e), i = i ? -1 : 1, e.attr("data-swiper-parallax") || "0"), a = e.attr("data-swiper-parallax-x"), r = e.attr("data-swiper-parallax-y"), s = e.attr("data-swiper-parallax-scale"), o = e.attr("data-swiper-parallax-opacity");
                    a || r ? (a = a || "0", r = r || "0") : this.isHorizontal() ? (a = n, r = "0") : (r = n, 
                    a = "0"), a = 0 <= a.indexOf("%") ? parseInt(a, 10) * t * i + "%" : a * t * i + "px", 
                    r = 0 <= r.indexOf("%") ? parseInt(r, 10) * t + "%" : r * t + "px", null != o && (n = o - (o - 1) * (1 - Math.abs(t)), 
                    e[0].style.opacity = n), null == s ? e.transform("translate3d(" + a + ", " + r + ", 0px)") : (i = s - (s - 1) * (1 - Math.abs(t)), 
                    e.transform("translate3d(" + a + ", " + r + ", 0px) scale(" + i + ")"));
                },
                setTranslate: function() {
                    var n = this, e = n.$el, t = n.slides, a = n.progress, r = n.snapGrid;
                    e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(e, t) {
                        n.parallax.setTransform(t, a);
                    })), t.each((function(e, t) {
                        var i = t.progress;
                        1 < n.params.slidesPerGroup && "auto" !== n.params.slidesPerView && (i += Math.ceil(e / 2) - a * (r.length - 1)), 
                        i = Math.min(Math.max(i, -1), 1), E(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(e, t) {
                            n.parallax.setTransform(t, i);
                        }));
                    }));
                },
                setTransition: function(n) {
                    void 0 === n && (n = this.params.speed);
                    this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(e, t) {
                        t = E(t);
                        var i = parseInt(t.attr("data-swiper-parallax-duration"), 10) || n;
                        0 === n && (i = 0), t.transition(i);
                    }));
                }
            }, Q = {
                getDistanceBetweenTouches: function(e) {
                    var t, i, n;
                    return e.targetTouches.length < 2 ? 1 : (t = e.targetTouches[0].pageX, i = e.targetTouches[0].pageY, 
                    n = e.targetTouches[1].pageX, e = e.targetTouches[1].pageY, Math.sqrt(Math.pow(n - t, 2) + Math.pow(e - i, 2)));
                },
                onGestureStart: function(e) {
                    var t = this, i = t.params.zoom, n = t.zoom, a = n.gesture;
                    if (n.fakeGestureTouched = !1, n.fakeGestureMoved = !1, !x.gestures) {
                        if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                        n.fakeGestureTouched = !0, a.scaleStart = Q.getDistanceBetweenTouches(e);
                    }
                    a.$slideEl && a.$slideEl.length || (a.$slideEl = E(e.target).closest("." + t.params.slideClass), 
                    0 === a.$slideEl.length && (a.$slideEl = t.slides.eq(t.activeIndex)), a.$imageEl = a.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), 
                    a.$imageWrapEl = a.$imageEl.parent("." + i.containerClass), a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, 
                    0 !== a.$imageWrapEl.length) ? (a.$imageEl && a.$imageEl.transition(0), t.zoom.isScaling = !0) : a.$imageEl = void 0;
                },
                onGestureChange: function(e) {
                    var t = this.params.zoom, i = this.zoom, n = i.gesture;
                    if (!x.gestures) {
                        if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                        i.fakeGestureMoved = !0, n.scaleMove = Q.getDistanceBetweenTouches(e);
                    }
                    n.$imageEl && 0 !== n.$imageEl.length && (i.scale = x.gestures ? e.scale * i.currentScale : n.scaleMove / n.scaleStart * i.currentScale, 
                    i.scale > n.maxRatio && (i.scale = n.maxRatio - 1 + Math.pow(i.scale - n.maxRatio + 1, .5)), 
                    i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)), 
                    n.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"));
                },
                onGestureEnd: function(e) {
                    var t = this.params.zoom, i = this.zoom, n = i.gesture;
                    if (!x.gestures) {
                        if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
                        if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !d.android) return;
                        i.fakeGestureTouched = !1, i.fakeGestureMoved = !1;
                    }
                    n.$imageEl && 0 !== n.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, n.maxRatio), t.minRatio), 
                    n.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"), 
                    i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale) && (n.$slideEl = void 0);
                },
                onTouchStart: function(e) {
                    var t = this.zoom, i = t.gesture;
                    t = t.image;
                    i.$imageEl && 0 !== i.$imageEl.length && !t.isTouched && (d.android && e.preventDefault(), 
                    t.isTouched = !0, t.touchesStart.x = ("touchstart" === e.type ? e.targetTouches[0] : e).pageX, 
                    t.touchesStart.y = ("touchstart" === e.type ? e.targetTouches[0] : e).pageY);
                },
                onTouchMove: function(e) {
                    var t = this, i = t.zoom, n = i.gesture, a = i.image, r = i.velocity;
                    if (n.$imageEl && 0 !== n.$imageEl.length && (t.allowClick = !1, a.isTouched) && n.$slideEl) {
                        a.isMoved || (a.width = n.$imageEl[0].offsetWidth, a.height = n.$imageEl[0].offsetHeight, 
                        a.startX = K.getTranslate(n.$imageWrapEl[0], "x") || 0, a.startY = K.getTranslate(n.$imageWrapEl[0], "y") || 0, 
                        n.slideWidth = n.$slideEl[0].offsetWidth, n.slideHeight = n.$slideEl[0].offsetHeight, 
                        n.$imageWrapEl.transition(0), t.rtl && (a.startX = -a.startX, a.startY = -a.startY));
                        var s = a.width * i.scale, o = a.height * i.scale;
                        if (!(s < n.slideWidth && o < n.slideHeight)) {
                            if (a.minX = Math.min(n.slideWidth / 2 - s / 2, 0), a.maxX = -a.minX, a.minY = Math.min(n.slideHeight / 2 - o / 2, 0), 
                            a.maxY = -a.minY, a.touchesCurrent.x = ("touchmove" === e.type ? e.targetTouches[0] : e).pageX, 
                            a.touchesCurrent.y = ("touchmove" === e.type ? e.targetTouches[0] : e).pageY, !a.isMoved && !i.isScaling) {
                                if (t.isHorizontal() && (Math.floor(a.minX) === Math.floor(a.startX) && a.touchesCurrent.x < a.touchesStart.x || Math.floor(a.maxX) === Math.floor(a.startX) && a.touchesCurrent.x > a.touchesStart.x)) return void (a.isTouched = !1);
                                if (!t.isHorizontal() && (Math.floor(a.minY) === Math.floor(a.startY) && a.touchesCurrent.y < a.touchesStart.y || Math.floor(a.maxY) === Math.floor(a.startY) && a.touchesCurrent.y > a.touchesStart.y)) return void (a.isTouched = !1);
                            }
                            e.preventDefault(), e.stopPropagation(), a.isMoved = !0, a.currentX = a.touchesCurrent.x - a.touchesStart.x + a.startX, 
                            a.currentY = a.touchesCurrent.y - a.touchesStart.y + a.startY, a.currentX < a.minX && (a.currentX = a.minX + 1 - Math.pow(a.minX - a.currentX + 1, .8)), 
                            a.currentX > a.maxX && (a.currentX = a.maxX - 1 + Math.pow(a.currentX - a.maxX + 1, .8)), 
                            a.currentY < a.minY && (a.currentY = a.minY + 1 - Math.pow(a.minY - a.currentY + 1, .8)), 
                            a.currentY > a.maxY && (a.currentY = a.maxY - 1 + Math.pow(a.currentY - a.maxY + 1, .8)), 
                            r.prevPositionX || (r.prevPositionX = a.touchesCurrent.x), r.prevPositionY || (r.prevPositionY = a.touchesCurrent.y), 
                            r.prevTime || (r.prevTime = Date.now()), r.x = (a.touchesCurrent.x - r.prevPositionX) / (Date.now() - r.prevTime) / 2, 
                            r.y = (a.touchesCurrent.y - r.prevPositionY) / (Date.now() - r.prevTime) / 2, Math.abs(a.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0), 
                            Math.abs(a.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0), r.prevPositionX = a.touchesCurrent.x, 
                            r.prevPositionY = a.touchesCurrent.y, r.prevTime = Date.now(), n.$imageWrapEl.transform("translate3d(" + a.currentX + "px, " + a.currentY + "px,0)");
                        }
                    }
                },
                onTouchEnd: function() {
                    var e, t, i, n, a = this.zoom, r = a.gesture, s = a.image, o = a.velocity;
                    r.$imageEl && 0 !== r.$imageEl.length && (s.isTouched && s.isMoved ? (s.isTouched = !1, 
                    s.isMoved = !1, e = o.x * (i = 300), e = s.currentX + e, t = o.y * (n = 300), t = s.currentY + t, 
                    0 !== o.x && (i = Math.abs((e - s.currentX) / o.x)), 0 !== o.y && (n = Math.abs((t - s.currentY) / o.y)), 
                    o = Math.max(i, n), s.currentX = e, s.currentY = t, i = s.width * a.scale, n = s.height * a.scale, 
                    s.minX = Math.min(r.slideWidth / 2 - i / 2, 0), s.maxX = -s.minX, s.minY = Math.min(r.slideHeight / 2 - n / 2, 0), 
                    s.maxY = -s.minY, s.currentX = Math.max(Math.min(s.currentX, s.maxX), s.minX), s.currentY = Math.max(Math.min(s.currentY, s.maxY), s.minY), 
                    r.$imageWrapEl.transition(o).transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")) : (s.isTouched = !1, 
                    s.isMoved = !1));
                },
                onTransitionEnd: function() {
                    var e = this.zoom, t = e.gesture;
                    t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl && t.$imageEl.transform("translate3d(0,0,0) scale(1)"), 
                    t.$imageWrapEl && t.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, e.currentScale = 1, 
                    t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0);
                },
                toggle: function(e) {
                    var t = this.zoom;
                    t.scale && 1 !== t.scale ? t.out() : t.in(e);
                },
                in: function(e) {
                    var t, i, n, a = this, r = a.zoom, s = a.params.zoom, o = r.gesture, l = r.image;
                    o.$slideEl || (a.params.virtual && a.params.virtual.enabled && a.virtual ? o.$slideEl = a.$wrapperEl.children("." + a.params.slideActiveClass) : o.$slideEl = a.slides.eq(a.activeIndex), 
                    o.$imageEl = o.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), 
                    o.$imageWrapEl = o.$imageEl.parent("." + s.containerClass)), o.$imageEl && 0 !== o.$imageEl.length && (o.$slideEl.addClass("" + s.zoomedSlideClass), 
                    a = void 0 === l.touchesStart.x && e ? (t = ("touchend" === e.type ? e.changedTouches[0] : e).pageX, 
                    ("touchend" === e.type ? e.changedTouches[0] : e).pageY) : (t = l.touchesStart.x, 
                    l.touchesStart.y), r.scale = o.$imageWrapEl.attr("data-swiper-zoom") || s.maxRatio, 
                    r.currentScale = o.$imageWrapEl.attr("data-swiper-zoom") || s.maxRatio, e ? (l = o.$slideEl[0].offsetWidth, 
                    s = o.$slideEl[0].offsetHeight, e = o.$slideEl.offset().left + l / 2 - t, t = o.$slideEl.offset().top + s / 2 - a, 
                    a = o.$imageEl[0].offsetWidth, n = o.$imageEl[0].offsetHeight, a *= r.scale, n *= r.scale, 
                    l = Math.min(l / 2 - a / 2, 0), a = Math.min(s / 2 - n / 2, 0), (s = -l) < (n = (n = e * r.scale) < l ? l : n) && (n = s), 
                    (e = -a) < (i = (i = t * r.scale) < a ? a : i) && (i = e)) : i = n = 0, o.$imageWrapEl.transition(300).transform("translate3d(" + n + "px, " + i + "px,0)"), 
                    o.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + r.scale + ")"));
                },
                out: function() {
                    var e = this, t = e.zoom, i = e.params.zoom, n = t.gesture;
                    n.$slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? n.$slideEl = e.$wrapperEl.children("." + e.params.slideActiveClass) : n.$slideEl = e.slides.eq(e.activeIndex), 
                    n.$imageEl = n.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), 
                    n.$imageWrapEl = n.$imageEl.parent("." + i.containerClass)), n.$imageEl && 0 !== n.$imageEl.length && (t.scale = 1, 
                    t.currentScale = 1, n.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), 
                    n.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), n.$slideEl.removeClass("" + i.zoomedSlideClass), 
                    n.$slideEl = void 0);
                },
                enable: function() {
                    var e, t, i, n = this, a = n.zoom;
                    a.enabled || (a.enabled = !0, e = !("touchstart" !== n.touchEvents.start || !x.passiveListener || !n.params.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    }, t = !x.passiveListener || {
                        passive: !1,
                        capture: !0
                    }, i = "." + n.params.slideClass, x.gestures ? (n.$wrapperEl.on("gesturestart", i, a.onGestureStart, e), 
                    n.$wrapperEl.on("gesturechange", i, a.onGestureChange, e), n.$wrapperEl.on("gestureend", i, a.onGestureEnd, e)) : "touchstart" === n.touchEvents.start && (n.$wrapperEl.on(n.touchEvents.start, i, a.onGestureStart, e), 
                    n.$wrapperEl.on(n.touchEvents.move, i, a.onGestureChange, t), n.$wrapperEl.on(n.touchEvents.end, i, a.onGestureEnd, e), 
                    n.touchEvents.cancel) && n.$wrapperEl.on(n.touchEvents.cancel, i, a.onGestureEnd, e), 
                    n.$wrapperEl.on(n.touchEvents.move, "." + n.params.zoom.containerClass, a.onTouchMove, t));
                },
                disable: function() {
                    var e, t, i, n = this, a = n.zoom;
                    a.enabled && (n.zoom.enabled = !1, e = !("touchstart" !== n.touchEvents.start || !x.passiveListener || !n.params.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    }, t = !x.passiveListener || {
                        passive: !1,
                        capture: !0
                    }, i = "." + n.params.slideClass, x.gestures ? (n.$wrapperEl.off("gesturestart", i, a.onGestureStart, e), 
                    n.$wrapperEl.off("gesturechange", i, a.onGestureChange, e), n.$wrapperEl.off("gestureend", i, a.onGestureEnd, e)) : "touchstart" === n.touchEvents.start && (n.$wrapperEl.off(n.touchEvents.start, i, a.onGestureStart, e), 
                    n.$wrapperEl.off(n.touchEvents.move, i, a.onGestureChange, t), n.$wrapperEl.off(n.touchEvents.end, i, a.onGestureEnd, e), 
                    n.touchEvents.cancel) && n.$wrapperEl.off(n.touchEvents.cancel, i, a.onGestureEnd, e), 
                    n.$wrapperEl.off(n.touchEvents.move, "." + n.params.zoom.containerClass, a.onTouchMove, t));
                }
            }, J = {
                loadInSlide: function(e, o) {
                    void 0 === o && (o = !0);
                    var l, d = this, u = d.params.lazy;
                    void 0 !== e && 0 !== d.slides.length && (e = (l = d.virtual && d.params.virtual.enabled ? d.$wrapperEl.children("." + d.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : d.slides.eq(e)).find("." + u.elementClass + ":not(." + u.loadedClass + "):not(." + u.loadingClass + ")"), 
                    0 !== (e = !l.hasClass(u.elementClass) || l.hasClass(u.loadedClass) || l.hasClass(u.loadingClass) ? e : e.add(l[0])).length) && e.each((function(e, t) {
                        var i = E(t), n = (i.addClass(u.loadingClass), i.attr("data-background")), a = i.attr("data-src"), r = i.attr("data-srcset"), s = i.attr("data-sizes");
                        d.loadImage(i[0], a || n, r, s, !1, (function() {
                            var e, t;
                            null == d || !d || d && !d.params || d.destroyed || (n ? (i.css("background-image", 'url("' + n + '")'), 
                            i.removeAttr("data-background")) : (r && (i.attr("srcset", r), i.removeAttr("data-srcset")), 
                            s && (i.attr("sizes", s), i.removeAttr("data-sizes")), a && (i.attr("src", a), i.removeAttr("data-src"))), 
                            i.addClass(u.loadedClass).removeClass(u.loadingClass), l.find("." + u.preloaderClass).remove(), 
                            d.params.loop && o && (e = l.attr("data-swiper-slide-index"), l.hasClass(d.params.slideDuplicateClass) ? (t = d.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + d.params.slideDuplicateClass + ")"), 
                            d.lazy.loadInSlide(t.index(), !1)) : (t = d.$wrapperEl.children("." + d.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]'), 
                            d.lazy.loadInSlide(t.index(), !1))), d.emit("lazyImageReady", l[0], i[0]), d.params.autoHeight && d.updateAutoHeight());
                        })), d.emit("lazyImageLoad", l[0], i[0]);
                    }));
                },
                load: function() {
                    var i = this, t = i.$wrapperEl, n = i.params, a = i.slides, e = i.activeIndex, r = i.virtual && n.virtual.enabled, s = n.lazy, o = n.slidesPerView;
                    function l(e) {
                        if (r) {
                            if (t.children("." + n.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return 1;
                        } else if (a[e]) return 1;
                    }
                    function d(e) {
                        return r ? E(e).attr("data-swiper-slide-index") : E(e).index();
                    }
                    if ("auto" === o && (o = 0), i.lazy.initialImageLoaded || (i.lazy.initialImageLoaded = !0), 
                    i.params.watchSlidesVisibility) t.children("." + n.slideVisibleClass).each((function(e, t) {
                        t = r ? E(t).attr("data-swiper-slide-index") : E(t).index();
                        i.lazy.loadInSlide(t);
                    })); else if (1 < o) for (var u = e; u < e + o; u += 1) l(u) && i.lazy.loadInSlide(u); else i.lazy.loadInSlide(e);
                    if (s.loadPrevNext) if (1 < o || s.loadPrevNextAmount && 1 < s.loadPrevNextAmount) {
                        s = s.loadPrevNextAmount;
                        for (var c = o, p = Math.min(e + c + Math.max(s, c), a.length), h = (c = Math.max(e - Math.max(c, s), 0), 
                        e + o); h < p; h += 1) l(h) && i.lazy.loadInSlide(h);
                        for (var f = c; f < e; f += 1) l(f) && i.lazy.loadInSlide(f);
                    } else {
                        s = t.children("." + n.slideNextClass), c = (0 < s.length && i.lazy.loadInSlide(d(s)), 
                        t.children("." + n.slidePrevClass));
                        0 < c.length && i.lazy.loadInSlide(d(c));
                    }
                }
            }, L = {
                LinearSpline: function(e, t) {
                    var i, n, a, r, s, o = function(e, t) {
                        for (n = -1, i = e.length; 1 < i - n; ) e[a = i + n >> 1] <= t ? n = a : i = a;
                        return i;
                    };
                    return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) {
                        return e ? (s = o(this.x, e), r = s - 1, (e - this.x[r]) * (this.y[s] - this.y[r]) / (this.x[s] - this.x[r]) + this.y[r]) : 0;
                    }, this;
                },
                getInterpolateFunction: function(e) {
                    this.controller.spline || (this.controller.spline = this.params.loop ? new L.LinearSpline(this.slidesGrid, e.slidesGrid) : new L.LinearSpline(this.snapGrid, e.snapGrid));
                },
                setTranslate: function(e, t) {
                    var i, n, a = this, r = a.controller.control;
                    function s(e) {
                        var t = a.rtlTranslate ? -a.translate : a.translate;
                        "slide" === a.params.controller.by && (a.controller.getInterpolateFunction(e), n = -a.controller.spline.interpolate(-t)), 
                        n && "container" !== a.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (a.maxTranslate() - a.minTranslate()), 
                        n = (t - a.minTranslate()) * i + e.minTranslate()), a.params.controller.inverse && (n = e.maxTranslate() - n), 
                        e.updateProgress(n), e.setTranslate(n, a), e.updateActiveIndex(), e.updateSlidesClasses();
                    }
                    if (Array.isArray(r)) for (var o = 0; o < r.length; o += 1) r[o] !== t && r[o] instanceof f && s(r[o]); else r instanceof f && t !== r && s(r);
                },
                setTransition: function(t, e) {
                    var i, n = this, a = n.controller.control;
                    function r(e) {
                        e.setTransition(t, n), 0 !== t && (e.transitionStart(), e.params.autoHeight && K.nextTick((function() {
                            e.updateAutoHeight();
                        })), e.$wrapperEl.transitionEnd((function() {
                            a && (e.params.loop && "slide" === n.params.controller.by && e.loopFix(), e.transitionEnd());
                        })));
                    }
                    if (Array.isArray(a)) for (i = 0; i < a.length; i += 1) a[i] !== e && a[i] instanceof f && r(a[i]); else a instanceof f && e !== a && r(a);
                }
            }, Z = {
                makeElFocusable: function(e) {
                    return e.attr("tabIndex", "0"), e;
                },
                addElRole: function(e, t) {
                    return e.attr("role", t), e;
                },
                addElLabel: function(e, t) {
                    return e.attr("aria-label", t), e;
                },
                disableEl: function(e) {
                    return e.attr("aria-disabled", !0), e;
                },
                enableEl: function(e) {
                    return e.attr("aria-disabled", !1), e;
                },
                onEnterKey: function(e) {
                    var t = this, i = t.params.a11y;
                    13 === e.keyCode && (e = E(e.target), t.navigation && t.navigation.$nextEl && e.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), 
                    t.isEnd ? t.a11y.notify(i.lastSlideMessage) : t.a11y.notify(i.nextSlideMessage)), 
                    t.navigation && t.navigation.$prevEl && e.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), 
                    t.isBeginning ? t.a11y.notify(i.firstSlideMessage) : t.a11y.notify(i.prevSlideMessage)), 
                    t.pagination) && e.is("." + t.params.pagination.bulletClass) && e[0].click();
                },
                notify: function(e) {
                    var t = this.a11y.liveRegion;
                    0 !== t.length && (t.html(""), t.html(e));
                },
                updateNavigation: function() {
                    var e, t;
                    !this.params.loop && this.navigation && (e = (t = this.navigation).$nextEl, (t = t.$prevEl) && 0 < t.length && (this.isBeginning ? this.a11y.disableEl(t) : this.a11y.enableEl(t)), 
                    e) && 0 < e.length && (this.isEnd ? this.a11y.disableEl(e) : this.a11y.enableEl(e));
                },
                updatePagination: function() {
                    var i = this, n = i.params.a11y;
                    i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.bullets.each((function(e, t) {
                        t = E(t);
                        i.a11y.makeElFocusable(t), i.a11y.addElRole(t, "button"), i.a11y.addElLabel(t, n.paginationBulletMessage.replace(/{{index}}/, t.index() + 1));
                    }));
                },
                init: function() {
                    var e, t, i = this, n = (i.$el.append(i.a11y.liveRegion), i.params.a11y);
                    i.navigation && i.navigation.$nextEl && (e = i.navigation.$nextEl), i.navigation && i.navigation.$prevEl && (t = i.navigation.$prevEl), 
                    e && (i.a11y.makeElFocusable(e), i.a11y.addElRole(e, "button"), i.a11y.addElLabel(e, n.nextSlideMessage), 
                    e.on("keydown", i.a11y.onEnterKey)), t && (i.a11y.makeElFocusable(t), i.a11y.addElRole(t, "button"), 
                    i.a11y.addElLabel(t, n.prevSlideMessage), t.on("keydown", i.a11y.onEnterKey)), i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.$el.on("keydown", "." + i.params.pagination.bulletClass, i.a11y.onEnterKey);
                },
                destroy: function() {
                    var e, t, i = this;
                    i.a11y.liveRegion && 0 < i.a11y.liveRegion.length && i.a11y.liveRegion.remove(), 
                    i.navigation && i.navigation.$nextEl && (e = i.navigation.$nextEl), i.navigation && i.navigation.$prevEl && (t = i.navigation.$prevEl), 
                    e && e.off("keydown", i.a11y.onEnterKey), t && t.off("keydown", i.a11y.onEnterKey), 
                    i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.$el.off("keydown", "." + i.params.pagination.bulletClass, i.a11y.onEnterKey);
                }
            }, z = {
                init: function() {
                    var e;
                    this.params.history && (U.history && U.history.pushState ? ((e = this.history).initialized = !0, 
                    e.paths = z.getPathValues(), (e.paths.key || e.paths.value) && (e.scrollToSlide(0, e.paths.value, this.params.runCallbacksOnInit), 
                    this.params.history.replaceState || U.addEventListener("popstate", this.history.setHistoryPopState))) : (this.params.history.enabled = !1, 
                    this.params.hashNavigation.enabled = !0));
                },
                destroy: function() {
                    this.params.history.replaceState || U.removeEventListener("popstate", this.history.setHistoryPopState);
                },
                setHistoryPopState: function() {
                    this.history.paths = z.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1);
                },
                getPathValues: function() {
                    var e = U.location.pathname.slice(1).split("/").filter((function(e) {
                        return "" !== e;
                    })), t = e.length;
                    return {
                        key: e[t - 2],
                        value: e[t - 1]
                    };
                },
                setHistory: function(e, t) {
                    this.history.initialized && this.params.history.enabled && (t = this.slides.eq(t), 
                    t = z.slugify(t.attr("data-history")), U.location.pathname.includes(e) || (t = e + "/" + t), 
                    (e = U.history.state) && e.value === t || (this.params.history.replaceState ? U.history.replaceState({
                        value: t
                    }, null, t) : U.history.pushState({
                        value: t
                    }, null, t)));
                },
                slugify: function(e) {
                    return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
                },
                scrollToSlide: function(e, t, i) {
                    if (t) for (var n = 0, a = this.slides.length; n < a; n += 1) {
                        var r = this.slides.eq(n);
                        z.slugify(r.attr("data-history")) !== t || r.hasClass(this.params.slideDuplicateClass) || (r = r.index(), 
                        this.slideTo(r, e, i));
                    } else this.slideTo(0, e, i);
                }
            }, D = {
                onHashCange: function() {
                    var e = c.location.hash.replace("#", "");
                    e !== this.slides.eq(this.activeIndex).attr("data-hash") && void 0 !== (e = this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + e + '"]').index()) && this.slideTo(e);
                },
                setHash: function() {
                    var e;
                    this.hashNavigation.initialized && this.params.hashNavigation.enabled && (this.params.hashNavigation.replaceState && U.history && U.history.replaceState ? U.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || 0) : (e = (e = this.slides.eq(this.activeIndex)).attr("data-hash") || e.attr("data-history"), 
                    c.location.hash = e || ""));
                },
                init: function() {
                    var e = this;
                    if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) {
                        e.hashNavigation.initialized = !0;
                        var t = c.location.hash.replace("#", "");
                        if (t) for (var i = 0, n = e.slides.length; i < n; i += 1) {
                            var a = e.slides.eq(i);
                            (a.attr("data-hash") || a.attr("data-history")) !== t || a.hasClass(e.params.slideDuplicateClass) || (a = a.index(), 
                            e.slideTo(a, 0, e.params.runCallbacksOnInit, !0));
                        }
                        e.params.hashNavigation.watchState && E(U).on("hashchange", e.hashNavigation.onHashCange);
                    }
                },
                destroy: function() {
                    this.params.hashNavigation.watchState && E(U).off("hashchange", this.hashNavigation.onHashCange);
                }
            }, $ = {
                run: function() {
                    var e = this, t = e.slides.eq(e.activeIndex), i = e.params.autoplay.delay;
                    t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), 
                    clearTimeout(e.autoplay.timeout), e.autoplay.timeout = K.nextTick((function() {
                        e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), 
                        e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), 
                        e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), 
                        e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), 
                        e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")), 
                        e.params.cssMode && e.autoplay.running && e.autoplay.run();
                    }), i);
                },
                start: function() {
                    return void 0 === this.autoplay.timeout && !this.autoplay.running && (this.autoplay.running = !0, 
                    this.emit("autoplayStart"), this.autoplay.run(), !0);
                },
                stop: function() {
                    return !!this.autoplay.running && void 0 !== this.autoplay.timeout && (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout), 
                    this.autoplay.timeout = void 0), this.autoplay.running = !1, this.emit("autoplayStop"), 
                    !0);
                },
                pause: function(e) {
                    var t = this;
                    t.autoplay.running && !t.autoplay.paused && (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), 
                    t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), 
                    t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, 
                    t.autoplay.run()));
                }
            }, ee = {
                setTranslate: function() {
                    for (var e = this.slides, t = 0; t < e.length; t += 1) {
                        var i = this.slides.eq(t), n = -i[0].swiperSlideOffset, a = (this.params.virtualTranslate || (n -= this.translate), 
                        0), r = (this.isHorizontal() || (a = n, n = 0), this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0));
                        i.css({
                            opacity: r
                        }).transform("translate3d(" + n + "px, " + a + "px, 0px)");
                    }
                },
                setTransition: function(e) {
                    var i, n = this, t = n.slides, a = n.$wrapperEl;
                    t.transition(e), n.params.virtualTranslate && 0 !== e && (i = !1, t.transitionEnd((function() {
                        if (!i && n && !n.destroyed) {
                            i = !0, n.animating = !1;
                            for (var e = [ "webkitTransitionEnd", "transitionend" ], t = 0; t < e.length; t += 1) a.trigger(e[t]);
                        }
                    })));
                }
            }, te = {
                setTranslate: function() {
                    var e, t = this, i = t.$el, n = t.$wrapperEl, a = t.slides, r = t.width, s = t.height, o = t.rtlTranslate, l = t.size, d = t.params.cubeEffect, u = t.isHorizontal(), c = t.virtual && t.params.virtual.enabled, p = 0;
                    d.shadow && (u ? (0 === (e = n.find(".swiper-cube-shadow")).length && (e = E('<div class="swiper-cube-shadow"></div>'), 
                    n.append(e)), e.css({
                        height: r + "px"
                    })) : 0 === (e = i.find(".swiper-cube-shadow")).length && (e = E('<div class="swiper-cube-shadow"></div>'), 
                    i.append(e)));
                    for (var h, f = 0; f < a.length; f += 1) {
                        var m = a.eq(f), v = f, g = 90 * (v = c ? parseInt(m.attr("data-swiper-slide-index"), 10) : v), y = Math.floor(g / 360), b = (o && (g = -g, 
                        y = Math.floor(-g / 360)), Math.max(Math.min(m[0].progress, 1), -1)), x = 0, w = 0, T = 0;
                        y = (v % 4 == 0 ? (x = 4 * -y * l, T = 0) : (v - 1) % 4 == 0 ? (x = 0, T = 4 * -y * l) : (v - 2) % 4 == 0 ? (x = l + 4 * y * l, 
                        T = l) : (v - 3) % 4 == 0 && (x = -l, T = 3 * l + 4 * l * y), o && (x = -x), u || (w = x, 
                        x = 0), "rotateX(" + (u ? 0 : -g) + "deg) rotateY(" + (u ? g : 0) + "deg) translate3d(" + x + "px, " + w + "px, " + T + "px)");
                        b <= 1 && -1 < b && (p = 90 * v + 90 * b, o) && (p = 90 * -v - 90 * b), m.transform(y), 
                        d.slideShadows && (g = u ? m.find(".swiper-slide-shadow-left") : m.find(".swiper-slide-shadow-top"), 
                        x = u ? m.find(".swiper-slide-shadow-right") : m.find(".swiper-slide-shadow-bottom"), 
                        0 === g.length && (g = E('<div class="swiper-slide-shadow-' + (u ? "left" : "top") + '"></div>'), 
                        m.append(g)), 0 === x.length && (x = E('<div class="swiper-slide-shadow-' + (u ? "right" : "bottom") + '"></div>'), 
                        m.append(x)), g.length && (g[0].style.opacity = Math.max(-b, 0)), x.length) && (x[0].style.opacity = Math.max(b, 0));
                    }
                    n.css({
                        "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                        "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                        "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                        "transform-origin": "50% 50% -" + l / 2 + "px"
                    }), d.shadow && (u ? e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")") : (i = Math.abs(p) - 90 * Math.floor(Math.abs(p) / 90), 
                    r = 1.5 - (Math.sin(2 * i * Math.PI / 360) / 2 + Math.cos(2 * i * Math.PI / 360) / 2), 
                    i = d.shadowScale, r = d.shadowScale / r, h = d.shadowOffset, e.transform("scale3d(" + i + ", 1, " + r + ") translate3d(0px, " + (s / 2 + h) + "px, " + -s / 2 / r + "px) rotateX(-90deg)"))), 
                    n.transform("translate3d(0px,0," + (C.isSafari || C.isUiWebView ? -l / 2 : 0) + "px) rotateX(" + (t.isHorizontal() ? 0 : p) + "deg) rotateY(" + (t.isHorizontal() ? -p : 0) + "deg)");
                },
                setTransition: function(e) {
                    var t = this.$el;
                    this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), 
                    this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e);
                }
            }, ie = {
                setTranslate: function() {
                    for (var e = this.slides, t = this.rtlTranslate, i = 0; i < e.length; i += 1) {
                        var n, a, r = e.eq(i), s = r[0].progress, o = (this.params.flipEffect.limitRotation && (s = Math.max(Math.min(r[0].progress, 1), -1)), 
                        r[0].swiperSlideOffset), l = -180 * s, d = 0, u = (o = -o, 0);
                        this.isHorizontal() ? t && (l = -l) : (u = o, d = -l, l = o = 0), r[0].style.zIndex = -Math.abs(Math.round(s)) + e.length, 
                        this.params.flipEffect.slideShadows && (n = this.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"), 
                        a = this.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom"), 
                        0 === n.length && (n = E('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>'), 
                        r.append(n)), 0 === a.length && (a = E('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>'), 
                        r.append(a)), n.length && (n[0].style.opacity = Math.max(-s, 0)), a.length) && (a[0].style.opacity = Math.max(s, 0)), 
                        r.transform("translate3d(" + o + "px, " + u + "px, 0px) rotateX(" + d + "deg) rotateY(" + l + "deg)");
                    }
                },
                setTransition: function(e) {
                    var i, n = this, t = n.slides, a = n.activeIndex, r = n.$wrapperEl;
                    t.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), 
                    n.params.virtualTranslate && 0 !== e && (i = !1, t.eq(a).transitionEnd((function() {
                        if (!i && n && !n.destroyed) {
                            i = !0, n.animating = !1;
                            for (var e = [ "webkitTransitionEnd", "transitionend" ], t = 0; t < e.length; t += 1) r.trigger(e[t]);
                        }
                    })));
                }
            }, ne = {
                setTranslate: function() {
                    for (var e = this.width, t = this.height, i = this.slides, n = this.$wrapperEl, a = this.slidesSizesGrid, r = this.params.coverflowEffect, s = this.isHorizontal(), o = this.translate, l = s ? e / 2 - o : t / 2 - o, d = s ? r.rotate : -r.rotate, u = r.depth, c = 0, p = i.length; c < p; c += 1) {
                        var h = i.eq(c), f = a[c], m = (l - h[0].swiperSlideOffset - f / 2) / f * r.modifier, v = s ? d * m : 0, g = s ? 0 : d * m, y = -u * Math.abs(m), b = r.stretch;
                        f = ("string" == typeof b && -1 !== b.indexOf("%") && (b = parseFloat(r.stretch) / 100 * f), 
                        s ? 0 : b * m), b = s ? b * m : 0, b = (Math.abs(b) < .001 && (b = 0), Math.abs(f) < .001 && (f = 0), 
                        Math.abs(y) < .001 && (y = 0), Math.abs(v) < .001 && (v = 0), "translate3d(" + b + "px," + f + "px," + y + "px)  rotateX(" + (g = Math.abs(g) < .001 ? 0 : g) + "deg) rotateY(" + v + "deg)");
                        h.transform(b), h[0].style.zIndex = 1 - Math.abs(Math.round(m)), r.slideShadows && (f = s ? h.find(".swiper-slide-shadow-left") : h.find(".swiper-slide-shadow-top"), 
                        y = s ? h.find(".swiper-slide-shadow-right") : h.find(".swiper-slide-shadow-bottom"), 
                        0 === f.length && (f = E('<div class="swiper-slide-shadow-' + (s ? "left" : "top") + '"></div>'), 
                        h.append(f)), 0 === y.length && (y = E('<div class="swiper-slide-shadow-' + (s ? "right" : "bottom") + '"></div>'), 
                        h.append(y)), f.length && (f[0].style.opacity = 0 < m ? m : 0), y.length) && (y[0].style.opacity = 0 < -m ? -m : 0);
                    }
                    (x.pointerEvents || x.prefixedPointerEvents) && (n[0].style.perspectiveOrigin = l + "px 50%");
                },
                setTransition: function(e) {
                    this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
                }
            }, ae = {
                init: function() {
                    var e = this, t = e.params.thumbs, i = e.constructor;
                    t.swiper instanceof i ? (e.thumbs.swiper = t.swiper, K.extend(e.thumbs.swiper.originalParams, {
                        watchSlidesProgress: !0,
                        slideToClickedSlide: !1
                    }), K.extend(e.thumbs.swiper.params, {
                        watchSlidesProgress: !0,
                        slideToClickedSlide: !1
                    })) : K.isObject(t.swiper) && (e.thumbs.swiper = new i(K.extend({}, t.swiper, {
                        watchSlidesVisibility: !0,
                        watchSlidesProgress: !0,
                        slideToClickedSlide: !1
                    })), e.thumbs.swiperCreated = !0), e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), 
                    e.thumbs.swiper.on("tap", e.thumbs.onThumbClick);
                },
                onThumbClick: function() {
                    var e, t, i, n = this, a = n.thumbs.swiper;
                    a && (e = a.clickedIndex, (i = a.clickedSlide) && E(i).hasClass(n.params.thumbs.slideThumbActiveClass) || null != e && (i = a.params.loop ? parseInt(E(a.clickedSlide).attr("data-swiper-slide-index"), 10) : e, 
                    n.params.loop && (a = n.activeIndex, n.slides.eq(a).hasClass(n.params.slideDuplicateClass) && (n.loopFix(), 
                    n._clientLeft = n.$wrapperEl[0].clientLeft, a = n.activeIndex), e = n.slides.eq(a).prevAll('[data-swiper-slide-index="' + i + '"]').eq(0).index(), 
                    t = n.slides.eq(a).nextAll('[data-swiper-slide-index="' + i + '"]').eq(0).index(), 
                    i = void 0 === e || void 0 !== t && t - a < a - e ? t : e), n.slideTo(i)));
                },
                update: function(e) {
                    var t = this, i = t.thumbs.swiper;
                    if (i) {
                        var n, a, r, s = "auto" === i.params.slidesPerView ? i.slidesPerViewDynamic() : i.params.slidesPerView, o = (t.realIndex !== i.realIndex && (n = i.activeIndex, 
                        r = i.params.loop ? (i.slides.eq(n).hasClass(i.params.slideDuplicateClass) && (i.loopFix(), 
                        i._clientLeft = i.$wrapperEl[0].clientLeft, n = i.activeIndex), a = i.slides.eq(n).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index(), 
                        r = i.slides.eq(n).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index(), 
                        void 0 === a ? r : void 0 === r ? a : r - n == n - a ? n : r - n < n - a ? r : a) : t.realIndex, 
                        i.visibleSlidesIndexes) && i.visibleSlidesIndexes.indexOf(r) < 0 && (i.params.centeredSlides ? r = n < r ? r - Math.floor(s / 2) + 1 : r + Math.floor(s / 2) - 1 : n < r && (r = r - s + 1), 
                        i.slideTo(r, e ? 0 : void 0)), 1), l = t.params.thumbs.slideThumbActiveClass;
                        if (1 < t.params.slidesPerView && !t.params.centeredSlides && (o = t.params.slidesPerView), 
                        t.params.thumbs.multipleActiveThumbs || (o = 1), o = Math.floor(o), i.slides.removeClass(l), 
                        i.params.loop || i.params.virtual && i.params.virtual.enabled) for (var d = 0; d < o; d += 1) i.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + d) + '"]').addClass(l); else for (var u = 0; u < o; u += 1) i.slides.eq(t.realIndex + u).addClass(l);
                    }
                }
            }, A = [ m, v, X, V, y, w, T, {
                name: "mousewheel",
                params: {
                    mousewheel: {
                        enabled: !1,
                        releaseOnEdges: !1,
                        invert: !1,
                        forceToAxis: !1,
                        sensitivity: 1,
                        eventsTarged: "container"
                    }
                },
                create: function() {
                    var e = this;
                    K.extend(e, {
                        mousewheel: {
                            enabled: !1,
                            enable: S.enable.bind(e),
                            disable: S.disable.bind(e),
                            handle: S.handle.bind(e),
                            handleMouseEnter: S.handleMouseEnter.bind(e),
                            handleMouseLeave: S.handleMouseLeave.bind(e),
                            animateSlider: S.animateSlider.bind(e),
                            releaseScroll: S.releaseScroll.bind(e),
                            lastScrollTime: K.now(),
                            lastEventBeforeSnap: void 0,
                            recentWheelEvents: []
                        }
                    });
                },
                on: {
                    init: function() {
                        var e = this;
                        !e.params.mousewheel.enabled && e.params.cssMode && e.mousewheel.disable(), e.params.mousewheel.enabled && e.mousewheel.enable();
                    },
                    destroy: function() {
                        this.params.cssMode && this.mousewheel.enable(), this.mousewheel.enabled && this.mousewheel.disable();
                    }
                }
            }, {
                name: "navigation",
                params: {
                    navigation: {
                        nextEl: null,
                        prevEl: null,
                        hideOnClick: !1,
                        disabledClass: "swiper-button-disabled",
                        hiddenClass: "swiper-button-hidden",
                        lockClass: "swiper-button-lock"
                    }
                },
                create: function() {
                    var e = this;
                    K.extend(e, {
                        navigation: {
                            init: M.init.bind(e),
                            update: M.update.bind(e),
                            destroy: M.destroy.bind(e),
                            onNextClick: M.onNextClick.bind(e),
                            onPrevClick: M.onPrevClick.bind(e)
                        }
                    });
                },
                on: {
                    init: function() {
                        this.navigation.init(), this.navigation.update();
                    },
                    toEdge: function() {
                        this.navigation.update();
                    },
                    fromEdge: function() {
                        this.navigation.update();
                    },
                    destroy: function() {
                        this.navigation.destroy();
                    },
                    click: function(e) {
                        var t, i = this, n = i.navigation, a = n.$nextEl;
                        n = n.$prevEl;
                        !i.params.navigation.hideOnClick || E(e.target).is(n) || E(e.target).is(a) || (a ? t = a.hasClass(i.params.navigation.hiddenClass) : n && (t = n.hasClass(i.params.navigation.hiddenClass)), 
                        !0 === t ? i.emit("navigationShow", i) : i.emit("navigationHide", i), a && a.toggleClass(i.params.navigation.hiddenClass), 
                        n && n.toggleClass(i.params.navigation.hiddenClass));
                    }
                }
            }, {
                name: "pagination",
                params: {
                    pagination: {
                        el: null,
                        bulletElement: "span",
                        clickable: !1,
                        hideOnClick: !1,
                        renderBullet: null,
                        renderProgressbar: null,
                        renderFraction: null,
                        renderCustom: null,
                        progressbarOpposite: !1,
                        type: "bullets",
                        dynamicBullets: !1,
                        dynamicMainBullets: 1,
                        formatFractionCurrent: function(e) {
                            return e;
                        },
                        formatFractionTotal: function(e) {
                            return e;
                        },
                        bulletClass: "swiper-pagination-bullet",
                        bulletActiveClass: "swiper-pagination-bullet-active",
                        modifierClass: "swiper-pagination-",
                        currentClass: "swiper-pagination-current",
                        totalClass: "swiper-pagination-total",
                        hiddenClass: "swiper-pagination-hidden",
                        progressbarFillClass: "swiper-pagination-progressbar-fill",
                        progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                        clickableClass: "swiper-pagination-clickable",
                        lockClass: "swiper-pagination-lock"
                    }
                },
                create: function() {
                    var e = this;
                    K.extend(e, {
                        pagination: {
                            init: k.init.bind(e),
                            render: k.render.bind(e),
                            update: k.update.bind(e),
                            destroy: k.destroy.bind(e),
                            dynamicBulletIndex: 0
                        }
                    });
                },
                on: {
                    init: function() {
                        this.pagination.init(), this.pagination.render(), this.pagination.update();
                    },
                    activeIndexChange: function() {
                        !this.params.loop && void 0 !== this.snapIndex || this.pagination.update();
                    },
                    snapIndexChange: function() {
                        this.params.loop || this.pagination.update();
                    },
                    slidesLengthChange: function() {
                        this.params.loop && (this.pagination.render(), this.pagination.update());
                    },
                    snapGridLengthChange: function() {
                        this.params.loop || (this.pagination.render(), this.pagination.update());
                    },
                    destroy: function() {
                        this.pagination.destroy();
                    },
                    click: function(e) {
                        var t = this;
                        t.params.pagination.el && t.params.pagination.hideOnClick && 0 < t.pagination.$el.length && !E(e.target).hasClass(t.params.pagination.bulletClass) && (!0 === t.pagination.$el.hasClass(t.params.pagination.hiddenClass) ? t.emit("paginationShow", t) : t.emit("paginationHide", t), 
                        t.pagination.$el.toggleClass(t.params.pagination.hiddenClass));
                    }
                }
            }, {
                name: "scrollbar",
                params: {
                    scrollbar: {
                        el: null,
                        dragSize: "auto",
                        hide: !1,
                        draggable: !1,
                        snapOnRelease: !0,
                        lockClass: "swiper-scrollbar-lock",
                        dragClass: "swiper-scrollbar-drag"
                    }
                },
                create: function() {
                    var e = this;
                    K.extend(e, {
                        scrollbar: {
                            init: P.init.bind(e),
                            destroy: P.destroy.bind(e),
                            updateSize: P.updateSize.bind(e),
                            setTranslate: P.setTranslate.bind(e),
                            setTransition: P.setTransition.bind(e),
                            enableDraggable: P.enableDraggable.bind(e),
                            disableDraggable: P.disableDraggable.bind(e),
                            setDragPosition: P.setDragPosition.bind(e),
                            getPointerPosition: P.getPointerPosition.bind(e),
                            onDragStart: P.onDragStart.bind(e),
                            onDragMove: P.onDragMove.bind(e),
                            onDragEnd: P.onDragEnd.bind(e),
                            isTouched: !1,
                            timeout: null,
                            dragTimeout: null
                        }
                    });
                },
                on: {
                    init: function() {
                        this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate();
                    },
                    update: function() {
                        this.scrollbar.updateSize();
                    },
                    resize: function() {
                        this.scrollbar.updateSize();
                    },
                    observerUpdate: function() {
                        this.scrollbar.updateSize();
                    },
                    setTranslate: function() {
                        this.scrollbar.setTranslate();
                    },
                    setTransition: function(e) {
                        this.scrollbar.setTransition(e);
                    },
                    destroy: function() {
                        this.scrollbar.destroy();
                    }
                }
            }, {
                name: "parallax",
                params: {
                    parallax: {
                        enabled: !1
                    }
                },
                create: function() {
                    K.extend(this, {
                        parallax: {
                            setTransform: _.setTransform.bind(this),
                            setTranslate: _.setTranslate.bind(this),
                            setTransition: _.setTransition.bind(this)
                        }
                    });
                },
                on: {
                    beforeInit: function() {
                        this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0);
                    },
                    init: function() {
                        this.params.parallax.enabled && this.parallax.setTranslate();
                    },
                    setTranslate: function() {
                        this.params.parallax.enabled && this.parallax.setTranslate();
                    },
                    setTransition: function(e) {
                        this.params.parallax.enabled && this.parallax.setTransition(e);
                    }
                }
            }, {
                name: "zoom",
                params: {
                    zoom: {
                        enabled: !1,
                        maxRatio: 3,
                        minRatio: 1,
                        toggle: !0,
                        containerClass: "swiper-zoom-container",
                        zoomedSlideClass: "swiper-slide-zoomed"
                    }
                },
                create: function() {
                    var n = this, t = {
                        enabled: !1,
                        scale: 1,
                        currentScale: 1,
                        isScaling: !1,
                        gesture: {
                            $slideEl: void 0,
                            slideWidth: void 0,
                            slideHeight: void 0,
                            $imageEl: void 0,
                            $imageWrapEl: void 0,
                            maxRatio: 3
                        },
                        image: {
                            isTouched: void 0,
                            isMoved: void 0,
                            currentX: void 0,
                            currentY: void 0,
                            minX: void 0,
                            minY: void 0,
                            maxX: void 0,
                            maxY: void 0,
                            width: void 0,
                            height: void 0,
                            startX: void 0,
                            startY: void 0,
                            touchesStart: {},
                            touchesCurrent: {}
                        },
                        velocity: {
                            x: void 0,
                            y: void 0,
                            prevPositionX: void 0,
                            prevPositionY: void 0,
                            prevTime: void 0
                        }
                    }, a = ("onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach((function(e) {
                        t[e] = Q[e].bind(n);
                    })), K.extend(n, {
                        zoom: t
                    }), 1);
                    Object.defineProperty(n.zoom, "scale", {
                        get: function() {
                            return a;
                        },
                        set: function(e) {
                            var t, i;
                            a !== e && (t = n.zoom.gesture.$imageEl ? n.zoom.gesture.$imageEl[0] : void 0, i = n.zoom.gesture.$slideEl ? n.zoom.gesture.$slideEl[0] : void 0, 
                            n.emit("zoomChange", e, t, i)), a = e;
                        }
                    });
                },
                on: {
                    init: function() {
                        this.params.zoom.enabled && this.zoom.enable();
                    },
                    destroy: function() {
                        this.zoom.disable();
                    },
                    touchStart: function(e) {
                        this.zoom.enabled && this.zoom.onTouchStart(e);
                    },
                    touchEnd: function(e) {
                        this.zoom.enabled && this.zoom.onTouchEnd(e);
                    },
                    doubleTap: function(e) {
                        this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e);
                    },
                    transitionEnd: function() {
                        this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd();
                    },
                    slideChange: function() {
                        this.zoom.enabled && this.params.zoom.enabled && this.params.cssMode && this.zoom.onTransitionEnd();
                    }
                }
            }, {
                name: "lazy",
                params: {
                    lazy: {
                        enabled: !1,
                        loadPrevNext: !1,
                        loadPrevNextAmount: 1,
                        loadOnTransitionStart: !1,
                        elementClass: "swiper-lazy",
                        loadingClass: "swiper-lazy-loading",
                        loadedClass: "swiper-lazy-loaded",
                        preloaderClass: "swiper-lazy-preloader"
                    }
                },
                create: function() {
                    K.extend(this, {
                        lazy: {
                            initialImageLoaded: !1,
                            load: J.load.bind(this),
                            loadInSlide: J.loadInSlide.bind(this)
                        }
                    });
                },
                on: {
                    beforeInit: function() {
                        this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1);
                    },
                    init: function() {
                        this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load();
                    },
                    scroll: function() {
                        this.params.freeMode && !this.params.freeModeSticky && this.lazy.load();
                    },
                    resize: function() {
                        this.params.lazy.enabled && this.lazy.load();
                    },
                    scrollbarDragMove: function() {
                        this.params.lazy.enabled && this.lazy.load();
                    },
                    transitionStart: function() {
                        this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || !this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded) && this.lazy.load();
                    },
                    transitionEnd: function() {
                        this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load();
                    },
                    slideChange: function() {
                        this.params.lazy.enabled && this.params.cssMode && this.lazy.load();
                    }
                }
            }, {
                name: "controller",
                params: {
                    controller: {
                        control: void 0,
                        inverse: !1,
                        by: "slide"
                    }
                },
                create: function() {
                    K.extend(this, {
                        controller: {
                            control: this.params.controller.control,
                            getInterpolateFunction: L.getInterpolateFunction.bind(this),
                            setTranslate: L.setTranslate.bind(this),
                            setTransition: L.setTransition.bind(this)
                        }
                    });
                },
                on: {
                    update: function() {
                        this.controller.control && this.controller.spline && (this.controller.spline = void 0, 
                        delete this.controller.spline);
                    },
                    resize: function() {
                        this.controller.control && this.controller.spline && (this.controller.spline = void 0, 
                        delete this.controller.spline);
                    },
                    observerUpdate: function() {
                        this.controller.control && this.controller.spline && (this.controller.spline = void 0, 
                        delete this.controller.spline);
                    },
                    setTranslate: function(e, t) {
                        this.controller.control && this.controller.setTranslate(e, t);
                    },
                    setTransition: function(e, t) {
                        this.controller.control && this.controller.setTransition(e, t);
                    }
                }
            }, {
                name: "a11y",
                params: {
                    a11y: {
                        enabled: !0,
                        notificationClass: "swiper-notification",
                        prevSlideMessage: "Previous slide",
                        nextSlideMessage: "Next slide",
                        firstSlideMessage: "This is the first slide",
                        lastSlideMessage: "This is the last slide",
                        paginationBulletMessage: "Go to slide {{index}}"
                    }
                },
                create: function() {
                    var t = this;
                    K.extend(t, {
                        a11y: {
                            liveRegion: E('<span class="' + t.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                        }
                    }), Object.keys(Z).forEach((function(e) {
                        t.a11y[e] = Z[e].bind(t);
                    }));
                },
                on: {
                    init: function() {
                        this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation());
                    },
                    toEdge: function() {
                        this.params.a11y.enabled && this.a11y.updateNavigation();
                    },
                    fromEdge: function() {
                        this.params.a11y.enabled && this.a11y.updateNavigation();
                    },
                    paginationUpdate: function() {
                        this.params.a11y.enabled && this.a11y.updatePagination();
                    },
                    destroy: function() {
                        this.params.a11y.enabled && this.a11y.destroy();
                    }
                }
            }, {
                name: "history",
                params: {
                    history: {
                        enabled: !1,
                        replaceState: !1,
                        key: "slides"
                    }
                },
                create: function() {
                    K.extend(this, {
                        history: {
                            init: z.init.bind(this),
                            setHistory: z.setHistory.bind(this),
                            setHistoryPopState: z.setHistoryPopState.bind(this),
                            scrollToSlide: z.scrollToSlide.bind(this),
                            destroy: z.destroy.bind(this)
                        }
                    });
                },
                on: {
                    init: function() {
                        this.params.history.enabled && this.history.init();
                    },
                    destroy: function() {
                        this.params.history.enabled && this.history.destroy();
                    },
                    transitionEnd: function() {
                        this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex);
                    },
                    slideChange: function() {
                        this.history.initialized && this.params.cssMode && this.history.setHistory(this.params.history.key, this.activeIndex);
                    }
                }
            }, {
                name: "hash-navigation",
                params: {
                    hashNavigation: {
                        enabled: !1,
                        replaceState: !1,
                        watchState: !1
                    }
                },
                create: function() {
                    K.extend(this, {
                        hashNavigation: {
                            initialized: !1,
                            init: D.init.bind(this),
                            destroy: D.destroy.bind(this),
                            setHash: D.setHash.bind(this),
                            onHashCange: D.onHashCange.bind(this)
                        }
                    });
                },
                on: {
                    init: function() {
                        this.params.hashNavigation.enabled && this.hashNavigation.init();
                    },
                    destroy: function() {
                        this.params.hashNavigation.enabled && this.hashNavigation.destroy();
                    },
                    transitionEnd: function() {
                        this.hashNavigation.initialized && this.hashNavigation.setHash();
                    },
                    slideChange: function() {
                        this.hashNavigation.initialized && this.params.cssMode && this.hashNavigation.setHash();
                    }
                }
            }, {
                name: "autoplay",
                params: {
                    autoplay: {
                        enabled: !1,
                        delay: 3e3,
                        waitForTransition: !0,
                        disableOnInteraction: !0,
                        stopOnLastSlide: !1,
                        reverseDirection: !1
                    }
                },
                create: function() {
                    var t = this;
                    K.extend(t, {
                        autoplay: {
                            running: !1,
                            paused: !1,
                            run: $.run.bind(t),
                            start: $.start.bind(t),
                            stop: $.stop.bind(t),
                            pause: $.pause.bind(t),
                            onVisibilityChange: function() {
                                "hidden" === document.visibilityState && t.autoplay.running && t.autoplay.pause(), 
                                "visible" === document.visibilityState && t.autoplay.paused && (t.autoplay.run(), 
                                t.autoplay.paused = !1);
                            },
                            onTransitionEnd: function(e) {
                                t && !t.destroyed && t.$wrapperEl && e.target === this && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd), 
                                t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd), 
                                t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop());
                            }
                        }
                    });
                },
                on: {
                    init: function() {
                        this.params.autoplay.enabled && (this.autoplay.start(), document.addEventListener("visibilitychange", this.autoplay.onVisibilityChange));
                    },
                    beforeTransitionStart: function(e, t) {
                        this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop());
                    },
                    sliderFirstMove: function() {
                        this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause());
                    },
                    touchEnd: function() {
                        this.params.cssMode && this.autoplay.paused && !this.params.autoplay.disableOnInteraction && this.autoplay.run();
                    },
                    destroy: function() {
                        this.autoplay.running && this.autoplay.stop(), document.removeEventListener("visibilitychange", this.autoplay.onVisibilityChange);
                    }
                }
            }, {
                name: "effect-fade",
                params: {
                    fadeEffect: {
                        crossFade: !1
                    }
                },
                create: function() {
                    K.extend(this, {
                        fadeEffect: {
                            setTranslate: ee.setTranslate.bind(this),
                            setTransition: ee.setTransition.bind(this)
                        }
                    });
                },
                on: {
                    beforeInit: function() {
                        var e;
                        "fade" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "fade"), 
                        K.extend(this.params, e = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        }), K.extend(this.originalParams, e));
                    },
                    setTranslate: function() {
                        "fade" === this.params.effect && this.fadeEffect.setTranslate();
                    },
                    setTransition: function(e) {
                        "fade" === this.params.effect && this.fadeEffect.setTransition(e);
                    }
                }
            }, {
                name: "effect-cube",
                params: {
                    cubeEffect: {
                        slideShadows: !0,
                        shadow: !0,
                        shadowOffset: 20,
                        shadowScale: .94
                    }
                },
                create: function() {
                    K.extend(this, {
                        cubeEffect: {
                            setTranslate: te.setTranslate.bind(this),
                            setTransition: te.setTransition.bind(this)
                        }
                    });
                },
                on: {
                    beforeInit: function() {
                        var e;
                        "cube" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "cube"), 
                        this.classNames.push(this.params.containerModifierClass + "3d"), K.extend(this.params, e = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            resistanceRatio: 0,
                            spaceBetween: 0,
                            centeredSlides: !1,
                            virtualTranslate: !0
                        }), K.extend(this.originalParams, e));
                    },
                    setTranslate: function() {
                        "cube" === this.params.effect && this.cubeEffect.setTranslate();
                    },
                    setTransition: function(e) {
                        "cube" === this.params.effect && this.cubeEffect.setTransition(e);
                    }
                }
            }, {
                name: "effect-flip",
                params: {
                    flipEffect: {
                        slideShadows: !0,
                        limitRotation: !0
                    }
                },
                create: function() {
                    K.extend(this, {
                        flipEffect: {
                            setTranslate: ie.setTranslate.bind(this),
                            setTransition: ie.setTransition.bind(this)
                        }
                    });
                },
                on: {
                    beforeInit: function() {
                        var e;
                        "flip" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "flip"), 
                        this.classNames.push(this.params.containerModifierClass + "3d"), K.extend(this.params, e = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        }), K.extend(this.originalParams, e));
                    },
                    setTranslate: function() {
                        "flip" === this.params.effect && this.flipEffect.setTranslate();
                    },
                    setTransition: function(e) {
                        "flip" === this.params.effect && this.flipEffect.setTransition(e);
                    }
                }
            }, {
                name: "effect-coverflow",
                params: {
                    coverflowEffect: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: !0
                    }
                },
                create: function() {
                    K.extend(this, {
                        coverflowEffect: {
                            setTranslate: ne.setTranslate.bind(this),
                            setTransition: ne.setTransition.bind(this)
                        }
                    });
                },
                on: {
                    beforeInit: function() {
                        "coverflow" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "coverflow"), 
                        this.classNames.push(this.params.containerModifierClass + "3d"), this.params.watchSlidesProgress = !0, 
                        this.originalParams.watchSlidesProgress = !0);
                    },
                    setTranslate: function() {
                        "coverflow" === this.params.effect && this.coverflowEffect.setTranslate();
                    },
                    setTransition: function(e) {
                        "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e);
                    }
                }
            }, {
                name: "thumbs",
                params: {
                    thumbs: {
                        multipleActiveThumbs: !0,
                        swiper: null,
                        slideThumbActiveClass: "swiper-slide-thumb-active",
                        thumbsContainerClass: "swiper-container-thumbs"
                    }
                },
                create: function() {
                    K.extend(this, {
                        thumbs: {
                            swiper: null,
                            init: ae.init.bind(this),
                            update: ae.update.bind(this),
                            onThumbClick: ae.onThumbClick.bind(this)
                        }
                    });
                },
                on: {
                    beforeInit: function() {
                        var e = this.params.thumbs;
                        e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0));
                    },
                    slideChange: function() {
                        this.thumbs.swiper && this.thumbs.update();
                    },
                    update: function() {
                        this.thumbs.swiper && this.thumbs.update();
                    },
                    resize: function() {
                        this.thumbs.swiper && this.thumbs.update();
                    },
                    observerUpdate: function() {
                        this.thumbs.swiper && this.thumbs.update();
                    },
                    setTransition: function(e) {
                        var t = this.thumbs.swiper;
                        t && t.setTransition(e);
                    },
                    beforeDestroy: function() {
                        var e = this.thumbs.swiper;
                        e && this.thumbs.swiperCreated && e && e.destroy();
                    }
                }
            } ];
            return void 0 === f.use && (f.use = f.Class.use, f.installModule = f.Class.installModule), 
            f.use(A), f;
        })), function(e) {
            "function" == typeof define && define.amd ? define([ "jquery" ], e) : e("object" == typeof exports ? require("jquery") : jQuery);
        }((function(E) {
            var n, e = navigator.userAgent, C = /iphone/i.test(e), S = /chrome/i.test(e), M = /android/i.test(e);
            E.mask = {
                definitions: {
                    9: "[0-9]",
                    a: "[A-Za-z]",
                    "*": "[A-Za-z0-9]"
                },
                autoclear: !0,
                dataName: "rawMaskFn",
                placeholder: "_"
            }, E.fn.extend({
                caret: function(e, t) {
                    var i;
                    if (0 !== this.length && !this.is(":hidden")) return "number" == typeof e ? (t = "number" == typeof t ? t : e, 
                    this.each((function() {
                        this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && ((i = this.createTextRange()).collapse(!0), 
                        i.moveEnd("character", t), i.moveStart("character", e), i.select());
                    }))) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (i = document.selection.createRange(), 
                    e = 0 - i.duplicate().moveStart("character", -1e5), t = e + i.text.length), {
                        begin: e,
                        end: t
                    });
                },
                unmask: function() {
                    return this.trigger("unmask");
                },
                mask: function(t, l) {
                    var i, y, d, b, x, w, T, e;
                    return !t && 0 < this.length ? (e = E(this[0]).data(E.mask.dataName)) ? e() : void 0 : (l = E.extend({
                        autoclear: E.mask.autoclear,
                        placeholder: E.mask.placeholder,
                        completed: null
                    }, l), i = E.mask.definitions, y = [], d = w = t.length, b = null, E.each(t.split(""), (function(e, t) {
                        "?" == t ? (w--, d = e) : i[t] ? (y.push(new RegExp(i[t])), null === b && (b = y.length - 1), 
                        e < d && (x = y.length - 1)) : y.push(null);
                    })), this.trigger("unmask").each((function() {
                        function u() {
                            if (l.completed) {
                                for (var e = b; e <= x; e++) if (y[e] && g[e] === c(e)) return;
                                l.completed.call(v);
                            }
                        }
                        function c(e) {
                            return l.placeholder.charAt(e < l.placeholder.length ? e : 0);
                        }
                        function p(e) {
                            for (;++e < w && !y[e]; ) ;
                            return e;
                        }
                        function h(e, t) {
                            var i, n;
                            if (!(e < 0)) {
                                for (i = e, n = p(t); i < w; i++) if (y[i]) {
                                    if (!(n < w && y[i].test(g[n]))) break;
                                    g[i] = g[n], g[n] = c(n), n = p(n);
                                }
                                m(), v.caret(Math.max(b, e));
                            }
                        }
                        function a() {
                            r(), v.val() != o && v.change();
                        }
                        function f(e, t) {
                            for (var i = e; i < t && i < w; i++) y[i] && (g[i] = c(i));
                        }
                        function m() {
                            v.val(g.join(""));
                        }
                        function r(e) {
                            for (var t, i = v.val(), n = -1, a = 0, r = 0; a < w; a++) if (y[a]) {
                                for (g[a] = c(a); r++ < i.length; ) if (t = i.charAt(r - 1), y[a].test(t)) {
                                    g[a] = t, n = a;
                                    break;
                                }
                                if (r > i.length) {
                                    f(a + 1, w);
                                    break;
                                }
                            } else g[a] === i.charAt(r) && r++, a < d && (n = a);
                            return e ? m() : n + 1 < d ? l.autoclear || g.join("") === s ? (v.val() && v.val(""), 
                            f(0, w)) : m() : (m(), v.val(v.val().substring(0, n + 1))), d ? a : b;
                        }
                        var v = E(this), g = E.map(t.split(""), (function(e, t) {
                            return "?" != e ? i[e] ? c(t) : e : void 0;
                        })), s = g.join(""), o = v.val();
                        v.data(E.mask.dataName, (function() {
                            return E.map(g, (function(e, t) {
                                return y[t] && e != c(t) ? e : null;
                            })).join("");
                        })), v.one("unmask", (function() {
                            v.off(".mask").removeData(E.mask.dataName);
                        })).on("focus.mask", (function() {
                            var e;
                            v.prop("readonly") || (clearTimeout(n), o = v.val(), e = r(), n = setTimeout((function() {
                                v.get(0) === document.activeElement && (m(), e == t.replace("?", "").length ? v.caret(0, e) : v.caret(e));
                            }), 10));
                        })).on("blur.mask", a).on("keydown.mask", (function(e) {
                            var t, i, n;
                            v.prop("readonly") || (n = e.which || e.keyCode, T = v.val(), 8 === n || 46 === n || C && 127 === n ? (t = (i = v.caret()).begin, 
                            (i = i.end) - t == 0 && (t = 46 !== n ? function(e) {
                                for (;0 <= --e && !y[e]; ) ;
                                return e;
                            }(t) : i = p(t - 1), i = 46 === n ? p(i) : i), f(t, i), h(t, i - 1), e.preventDefault()) : 13 === n ? a.call(this, e) : 27 === n && (v.val(o), 
                            v.caret(0, r()), e.preventDefault()));
                        })).on("keypress.mask", (function(e) {
                            if (!v.prop("readonly")) {
                                var t, i, n, a = e.which || e.keyCode, r = v.caret();
                                if (!(e.ctrlKey || e.altKey || e.metaKey || a < 32) && a && 13 !== a) {
                                    if (r.end - r.begin != 0 && (f(r.begin, r.end), h(r.begin, r.end - 1)), (t = p(r.begin - 1)) < w && (i = String.fromCharCode(a), 
                                    y[t].test(i))) {
                                        for (var s, o, l = t, d = c(t); l < w; l++) if (y[l]) {
                                            if (s = p(l), o = g[l], g[l] = d, !(s < w && y[s].test(o))) break;
                                            d = o;
                                        }
                                        g[t] = i, m(), n = p(t), M ? setTimeout((function() {
                                            E.proxy(E.fn.caret, v, n)();
                                        }), 0) : v.caret(n), r.begin <= x && u();
                                    }
                                    e.preventDefault();
                                }
                            }
                        })).on("input.mask paste.mask", (function() {
                            v.prop("readonly") || setTimeout((function() {
                                var e = r(!0);
                                v.caret(e), u();
                            }), 0);
                        })), S && M && v.off("input.mask").on("input.mask", (function() {
                            var e = v.val(), t = v.caret();
                            if (T && T.length && T.length > e.length) {
                                for (r(!0); 0 < t.begin && !y[t.begin - 1]; ) t.begin--;
                                if (0 === t.begin) for (;t.begin < b && !y[t.begin]; ) t.begin++;
                            } else for (r(!0); t.begin < w && !y[t.begin]; ) t.begin++;
                            v.caret(t.begin, t.begin), u();
                        })), r();
                    })));
                }
            });
        }));
        $((function() {
            let header = $("#header"), scrollPrev = 0;
            $(window).on("scroll", (function() {
                let scrolled = $(window).scrollTop();
                if (scrolled > 150) header.addClass("active"); else header.removeClass("active");
                if (scrolled > 50 && scrolled > scrollPrev) header.addClass("out"); else header.removeClass("out");
                scrollPrev = scrolled;
                if (scrolled > 50) $(".scroll-top").addClass("active"); else $(".scroll-top").removeClass("active");
            }));
            $("#header-burger").on("click", (function(e) {
                e.preventDefault();
                let navigation = $("#header-navigation");
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    navigation.fadeOut(400);
                    $("body").css("overflow", "auto");
                } else {
                    $(this).addClass("active");
                    navigation.fadeIn(400);
                    $("body").css("overflow", "hidden");
                }
            }));
            let removeMenuElements = function() {
                if ($(document).width() < 577) {
                    $(".header__menu").append($(".header__eye"));
                    $(".header__menu").append($(".header__actions-wrap"));
                    $(".header__menu").append($(".header__languages"));
                } else {
                    $(".header").prepend($(".header__eye"));
                    $(".header__inner").append($(".header__actions-wrap"));
                    $(".header").append($(".header__languages"));
                }
            };
            removeMenuElements();
            $(window).on("resize", (function() {
                removeMenuElements();
                if (0 != $("#scrolled-section").length) scrolledSidebar();
                if ($(window).width() > 992) {
                    $("#header-burger").removeClass("active");
                    $("#header-navigation").fadeOut(400);
                    $(".submenu").removeClass("open");
                    $(".submenu__back").removeClass("active");
                    $("body").css("overflow", "auto");
                }
            }));
            $(".header li.subitem").on("click", (function() {
                if ($(window).width() < 993) {
                    $(this).find(".submenu").addClass("open");
                    $(".submenu__back").addClass("active");
                }
            }));
            $(".submenu__back").on("click", (function(e) {
                e.preventDefault();
                $(this).removeClass("active");
                $(".submenu.open").removeClass("open");
            }));
            if (0 != $(".animated-block").length) $(".animated-block").each((function() {
                let topOffset = $(this).offset().top;
                $(window).on("scroll", (function() {
                    if ($(this).scrollTop() + $(this).height() - 100 > topOffset) {
                        let i = 0;
                        if (0 === i) {
                            $(".animated-counter span").each((function() {
                                $(this).prop("Counter", 0).animate({
                                    Counter: $(this).data("counter")
                                }, {
                                    duration: 3e3,
                                    easing: "swing",
                                    step: function(now) {
                                        $(this).text(Math.ceil(now));
                                    }
                                });
                            }));
                            i++;
                        }
                    }
                }));
            }));
            $(".scroll-link").on("click", (function(e) {
                e.preventDefault();
                let id = $(this).attr("href"), top = $("#" + id).offset().top;
                $("html, body").animate({
                    scrollTop: top - 80
                }, 700);
            }));
            $(".categories__item").on("mouseenter", (function() {
                if ($(window).width() > 768) {
                    let src = $(this).data("src");
                    $(this).siblings(".categories__block-bg").css("background-image", src);
                }
            }));
            $(".categories__item").on("mouseleave", (function() {
                if ($(window).width() > 768) {
                    let oldSrc = $(this).siblings(".categories__block-bg").data("src");
                    $(this).siblings(".categories__block-bg").css("background-image", oldSrc);
                }
            }));
            $(".filters__link").on("click", (function(e) {
                e.preventDefault();
                if (!$(this).hasClass("active")) {
                    let filterKey = $(this).data("filter-key"), filterBlock = $(this).parent().data("filter-block"), list = $("#" + filterBlock).find("[data-filter-element]");
                    $(this).siblings(".active").removeClass("active");
                    $(this).addClass("active");
                    if ("all" === filterKey) list.each((function(index, element) {
                        $(this).fadeIn(200);
                    })); else list.each((function(index, element) {
                        if ($(this).data("filter-element") === filterKey) $(this).fadeIn(200); else $(this).fadeOut(0);
                    }));
                }
            }));
            let scrolledSidebar = function() {
                if ($(window).width() > 768) {
                    let scrollWrapper = $("#scrolled-section"), scrollWrapperHeight = scrollWrapper.outerHeight(), scrollWrapperOffsetTop = scrollWrapper.offset().top, scrollWrapperOffsetBottom = scrollWrapperOffsetTop + scrollWrapperHeight, scrollContent = $("#scrolled-sidebar"), scrollContentHeight = scrollContent.outerHeight();
                    scrollContent.offset().top;
                    $(window).on("scroll", (function() {
                        let scrolled = $(this).scrollTop();
                        if (scrolled >= scrollWrapperOffsetTop) scrollWrapper.addClass("fixed"); else if (scrolled < scrollWrapperOffsetTop) scrollWrapper.removeClass("fixed");
                        let fixedBottomPoint = scrollWrapperOffsetBottom - scrollContentHeight;
                        if (scrolled >= fixedBottomPoint) {
                            scrollWrapper.removeClass("fixed").addClass("absolute");
                            scrollContent.css({
                                top: fixedBottomPoint - scrollWrapperOffsetTop
                            });
                        } else if (scrolled < fixedBottomPoint && scrollWrapper.hasClass("absolute")) scrollWrapper.removeClass("absolute").addClass("fixed");
                    }));
                } else {
                    $("#scrolled-section").removeClass("absolute fixed");
                    return false;
                }
            };
            if (0 != $("#scrolled-section").length) {
                scrolledSidebar();
                $(window).on("scroll", (function() {
                    if ($(this).scrollTop() > 0) {
                        let scrollElements = $('[data-indicator="scroll-element"]');
                        scrollElements.each((function(index, element) {
                            let top = $(element).offset().top, scroll = $(window).scrollTop(), windowHeight = $(window).height(), id = $(element).attr("id");
                            if (scroll > top - .7 * windowHeight) {
                                $(".scroll-section__list-link.active").removeClass("active");
                                $('.scroll-section__list-link[href="' + id + '"]').addClass("active");
                            }
                        }));
                    }
                }));
            }
            $(".scroll-section__list-link").on("click", (function(e) {
                $(".scroll-section__list-link.active").removeClass("active");
                $(this).addClass("active");
            }));
            $(".fade-button").on("click", (function(e) {
                e.preventDefault();
                $(this).toggleClass("active").next().slideToggle(400);
            }));
        }));
        const buttons = document.querySelectorAll(".f-button");
        function handleButtonClick(event) {
            buttons.forEach((button => {
                button.classList.remove("active");
            }));
            event.target.classList.add("active");
        }
        if (buttons.length > 0) buttons.forEach((button => {
            button.addEventListener("click", handleButtonClick);
        }));
        const infoTypeButtons = document.querySelectorAll(".info-type__button");
        function handleInfoTypeButtons(event) {
            infoTypeButtons.forEach((infoTypeButton => {
                infoTypeButton.classList.remove("active");
            }));
            event.preventDefault();
            event.target.classList.add("active");
        }
        if (infoTypeButtons.length > 0) infoTypeButtons.forEach((infoTypeButton => {
            infoTypeButton.addEventListener("click", handleInfoTypeButtons);
        }));
        window["FLS"] = false;
        isWebp();
        spollers();
    })();
})();