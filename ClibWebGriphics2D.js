/**
 * Created by changlifeng on 17/5/27.
 */
function ClibPainter(canvasId) {
    return {
        ctx : document.getElementById(canvasId).getContext("2d"),
        nowX : 0,
        nowY : 0,
        moveTo : function(x, y) {
            this.ctx.moveTo(x, y);
            this.nowX = x;
            this.nowY = y;
        },
        drawLine : function(x, y) {
            this.ctx.lineTo(x, y);
            this.nowX = x;
            this.nowY = y;
        },
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
        },

        drawCircile : function(x, y, r, start, stop, counterclockwise, fill, color, borderColor) {
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, start, stop, counterclockwise);
            if (fill) {
                this.ctx.strokeStyle = borderColor;
                this.ctx.fillStyle = color;
                this.ctx.fill();
            }
            this.ctx.closePath();
            this.styleInit();
        },

        drawStrokeRect : function(x, y, width, height, style) {
            this.ctx.strokeRect(x, y, width, height);
            this.styleInit();
        },

        drawFillRect : function(x, y, width, height, style) {
            this.ctx.fillRect(x, y, width, height);
            this.styleInit();
        },

        stroke : function () {
            this.ctx.stroke();
        },

        styleInit : function() {
            this.ctx.strokeStyle = "#000";
            this.ctx.fillStyle = "#000";
        }

    }
}