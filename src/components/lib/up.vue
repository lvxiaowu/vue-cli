<template>
    <div>
        
    </div>
</template>
<script>
    export
    default {
        name: "image-post",
        data() {
            return {
                Signature: null
            }
        },
        props: {
            uploadlist: { //一次最多可以上传多少张照片
                type: Array,
                default: []
            }
        },
        methods: {
            start(p) {
                var vm = this;
                this.getSignature(p,function() {
                    for (let i = 0; i < vm.uploadlist.length; i++) {
                        vm.upload(vm.uploadlist[i],p)
                    };
                })
            },
            getSignature(p,c) {
                var vm = this,
                    now = Date.parse(new Date()) / 1000;
                if (!vm.Signature || (parseInt(vm.Signature.expire) < now + 3)) {
                    vm.ajax({
                        url: "http://m.hezon.info/upload/get.php",
                        type:"POST",
                        data:{
                            type:p.type||1
                        },
                        success: function(r) {
                            vm.Signature = r;
                            if (c) c()
                        }
                    })
                } else {
                    if (c) c()
                }
            },
            upload(res,option) {
                let vm = this;
                if(res.status){
                    return true;
                }
                var form = document.forms[0];
                var formData = new FormData(form);
                var data = vm.Signature;
                formData.append('name', res.filename);
                formData.append('key', data['dir']+"${filename}");
                formData.append('policy', data['policy']);
                formData.append('OSSAccessKeyId', data['accessid']);
                formData.append('success_action_status', '200');
                formData.append('signature', data['signature']);
                formData.append("file", res.file, res.filename);
                $.ajax({
                    url: data['host'],
                    type: "POST",
                    data: formData,
                    dataType: "json",
                    processData: false,
                    contentType: false,
                    success: function(data) {
                        let url=vm.Signature['static_host']+res.filename;
                        if (res.callback) res.callback(url)
                        if (option.callback) option.callback();
                    },
                    error: function() {
                        if (res.fail) res.fail(vm.Signature['static_host']+res.filename)
                        console.log("上传失败，请重试!")
                    }
                });
            },
        }
    }
</script>