/**
 * Created by changlifeng on 17/5/27.
 */
function ClibWebGriphics2D(canvasId) {
    return {
        ctx : document.getElementById(canvasId).getContext("2d"),
        nowX : 0,
        nowY : 0,
        /**
         * 移动当前焦点
         * @param x
         * @param y
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
        }

    }
}