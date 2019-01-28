<template>
<div>
  <label :for='mid' ><slot /></label>
<input type="file" :id="mid" :accept="accept" @change="selectFileImage($event)" :capture="capture">  
</div>

</template>
<script>
import EXIF from "@/lib/exif";
import JPEGEncoder from "@/lib/jpeg_encoder";
export default {
  name: "mediaUploader",
  data() {
    return {
      mid:`Uploader_${(new Date().getTime())}`
    };
  },
  props: {
    accept: {
      type: String,
      default: "image/*"
    },
    capture: {
      type: String,
      default: "camera"
    }
  },
  methods: {
    rotateImg: function(img, direction, canvas) {
      //图片旋转
      var min_step = 0;
      var max_step = 3;
      if (img == null) return;
      var height = img.height;
      var width = img.width;
      var step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == "right") {
        step++;
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      var degree = (step * 90 * Math.PI) / 180;
      var ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },
    selectFileImage: function(e) {
      let vm = this;
      let file = e.target.files[0],
        _c = 0.8; //压缩比率
      let Orientation = null;
      if (file) {
        let imgType = "image/" + file.name.split(".")[1];
        EXIF.getData(file, function() {
          EXIF.getAllTags(this);
          Orientation = EXIF.getTag(this, "Orientation");
        });
        var oReader = new FileReader();
        oReader.readAsDataURL(file);
        oReader.onload = function(e) {
          var image = new Image();
          var imgUrl = e.target.result;
          imgUrl = imgUrl.replace(
            "data:base64,",
            "data:" + imgType + ";base64,"
          );
          image.src = imgUrl;
          vm.imgReady = false;
          image.onload = function() {
            var isDirection = true;
            if (Orientation == 6 || Orientation == 8) {
              isDirection = false;
            }
            var _Nw = this.naturalWidth,
              _Nh = this.naturalHeight;
            var expectWidth = _Nw;
            var expectHeight = _Nh;
            if (_Nw > _Nh && _Nw > 1800) {
              expectWidth = 1800;
              expectHeight = (expectWidth * _Nh) / _Nw;
            } else if (_Nh > _Nw && _Nh > 1800) {
              expectHeight = 1800;
              expectWidth = (expectHeight * _Nw) / _Nh;
            }
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = expectWidth;
            canvas.height = expectHeight;
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, expectWidth, expectHeight);
            ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
            ctx.save();
            var base64 = null;
            if (!isDirection) {
              if (APP.isAndroid) {
                var encoder = new JPEGEncoder();
                var imgData = ctx.getImageData(0, 0, expectWidth, expectHeight);
                base64 = encoder.encode(imgData, 100);
                image.src = base64;
              } else {
                image.src = canvas.toDataURL("image/jpeg", 1);
              }
              image.onload = function() {
                ctx.clearRect(0, 0, expectWidth, expectHeight);
                ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                ctx.save();
                if (Orientation != "" && Orientation != 1) {
                  switch (Orientation) {
                    case 6:
                      vm.rotateImg(this, "left", canvas);
                      break;
                    case 8:
                      vm.rotateImg(this, "right", canvas);
                      break;
                    case 3:
                      vm.rotateImg(this, "right", canvas); //转两次
                      vm.rotateImg(this, "right", canvas);
                      break;
                  }
                }
                let ctx2 = canvas.getContext("2d");
                if (APP.isAndroid) {
                  var encoder2 = new JPEGEncoder();
                  base64 = encoder2.encode(
                    ctx2.getImageData(0, 0, expectHeight, expectWidth),
                    _c * 100
                  );
                } else {
                  base64 = canvas.toDataURL("image/jpeg", _c);
                }
                vm.beforeUpload({ file, src: base64 });
              };
            } else {
              if (APP.isAndroid) {
                var encoder = new JPEGEncoder();
                var imgData = ctx.getImageData(0, 0, expectWidth, expectHeight);
                base64 = encoder.encode(imgData, _c * 100);
              } else {
                base64 = canvas.toDataURL("image/jpeg", _c);
              }
              vm.beforeUpload({ file, src: base64 });
            }
          };
        };
      }
    },
    beforeUpload(fileList) {
      this.$emit("onRead", fileList);
      if (this._events.beforeUpload) {
        this.$emit("beforeUpload", fileList, f => {
          this.startUpload(f)
        });
      } else {
        this.startUpload(fileList)
      }
    },
    startUpload(f){
      console.log(f)
    }
  }
};
</script>
<style scoped lang='less'>
input{
  display: none
}
</style>
