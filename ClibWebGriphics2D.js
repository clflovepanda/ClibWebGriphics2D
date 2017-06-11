/**
 * Created by changlifeng on 17/5/27.
 */

function ClibBaseGraph (name) {
    this.name = "base graph" || name;
    this.baseX = 0;
    this.baseY = 0;
    this.vector = function(){};
}
//
//ClibBaseGraph.prototype.get = function() {
//};

function ClibLine(){
    ClibBaseGraph.call("line");
    this.name = "line";
}
(function(){
    var Temp = function(){};
    Temp.prototype = ClibBaseGraph.prototype;
    ClibLine.prototype = new Temp();
})();

function ClibArrow(beginX, beginY, endX, endY, style){
    ClibBaseGraph.call("arrow");
    this.name = "arrow";
    this.vector = function() {
        var defaultABC = 45;
        var A = Math.atan2(Math.abs(endY - beginY), Math.abs(endX - beginX)) / Math.PI * 180;
        var CBK = 90 - A - defaultABC;
        var DBL = 180 - 2 * defaultABC - CBK;
        var lenX = 20 * Math.sin(CBK * Math.PI / 180);
        var lenY = 20 * Math.cos(CBK * Math.PI / 180);
        var CX = endX - lenX;
        var CY = endY - lenY;
        var lenDL = 20 * Math.sin(DBL * Math.PI / 180);
        var lenBL = 20 * Math.cos(DBL * Math.PI / 180);
        var DX = endX - lenDL;
        var DY = endY + lenBL;
        return [
            {BX:beginX, BY:beginY, EX:endX, EY:endY, type:"line"},
            {BX:endX, BY:endY, EX:CX, EY:CY, type:"line"},
            {BX:endX, BY:endY, EX:DX, EY:DY, type:"line"}];
    }
}
(function(){
    var Temp = function(){};
    Temp.prototype = ClibBaseGraph.prototype;
    ClibLine.prototype = new Temp();
})();






function ClibGriphics (obj) {
    return {
        X : obj.X,
        Y : obj.Y,
        griphics : obj.griphics,
        overflow : obj.overflow
    }
}

function ClibWebGriphics2DRenderingEngine (canvasId) {
    return {
        painter : new ClibWebPainter(canvasId),
    }
}

function ClibWebPainter(canvasId) {
    return {
        ctx : document.getElementById(canvasId).getContext("2d"),
        nowX : 0,
        nowY : 0,
        /**
         * 移动当前焦点
         */
        moveTo : function(x, y) {
            this.ctx.moveTo(x, y);
            this.nowX = x;
            this.nowY = y;
        },
        /**
         * 画线，从当前焦点画到传入点
         */
        drawLine : function(x, y) {
            this.ctx.lineTo(x, y);
            this.nowX = x;
            this.nowY = y;
            this.ctx.stroke();
        },
        /**
         * 画虚线，从当前点到传入点
         */
        drawDashLine : function(x, y, dashLength) {
            var dashLen = dashLength === undefined ? 5 : dashLength,
                xpos = x - this.nowX, //得到横向的宽度;
                ypos = y - this.nowY, //得到纵向的高度;
                numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen);
            //利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
            for(var i = 0 ; i < numDashes ; i++){
                if(i % 2 === 0) {
                    this.ctx.moveTo(this.nowX + (xpos / numDashes) * i, this.nowY + (ypos / numDashes) * i);
                    //有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
                }else{
                    this.ctx.lineTo(this.nowX + (xpos / numDashes) * i, this.nowY + (ypos / numDashes) * i);
                }
            }
            this.ctx.stroke();
        },
        /**
         * 画圆，传入圆心
         */
        drawCircile : function(x, y, r, start, stop, counterclockwise, style) {
            this.analysisStyle(style);
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, start, stop, counterclockwise);
            this.ctx.closePath();
            this.ctx.stroke();
            this.styleInit();
        },
        /**
         * 画填充圆
         */
        drawFillCircle : function(x, y, r, start, stop, counterclockwise, style) {
            this.analysisStyle(style);
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, start, stop, counterclockwise);
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.stroke();
            this.styleInit();
        },
        /**
         * 画矩形
         */
        drawStrokeRect : function(x, y, width, height, style) {
            this.analysisStyle(style);
            this.ctx.strokeRect(x, y, width, height);
            this.ctx.stroke();
            this.styleInit();
        },
        /**
         * 画填充矩形
         */
        drawFillRect : function(x, y, width, height, style) {
            this.analysisStyle(style);
            this.ctx.fillRect(x, y, width, height);
            this.ctx.stroke();
            this.styleInit();
        },
        /**
         * 内容渲染
         */
        stroke : function () {
            this.ctx.stroke();
        },
        /**
         * 设置样式
         */
        analysisStyle : function(style) {
            if (style) {
                if (style.borderColor) {
                    this.ctx.strokeStyle = style.borderColor;
                }
                if (style.fillStyle) {
                    this.ctx.fillStyle = style.fillStyle;
                }
            }
        },
        /**
         * 初始化样式
         */
        styleInit : function() {
            var style = new Object();
            style.borderColor = "#000";
            style.fillStyle = "#000";
            this.analysisStyle(style);
        },

        paintGraph : function (graph) {
            var temp = graph.vector();
            for (var i = 0 ; i < temp.length ; i ++) {
                if (temp[i].type == "line") {
                    this.moveTo(temp[i].BX, temp[i].BY);
                    this.drawLine(temp[i].EX, temp[i].EY);
                }
            }
        }

    }
}