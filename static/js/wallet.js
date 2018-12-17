function saveKeystoreNext() {
    $("#save-keystore").hide()
    $("#save-privatekey").show()
}

//通过私钥解锁账户
function unlockAccountWithPrivatekey() {
    let privatekey = $("#input-privatekey").val()
    console.log(privatekey)
    $.post("/privateunlock", `privatekey=${privatekey}`, function (res, status) {
        console.log(status + JSON.stringify(res))
        if (res.code == 0) {
            //将服务端返回的账户信息显示到页面
            configAccountInfo(res.data)
        } 
    })
}

function unlockAccountWithKeystore() {
    let filedata = $("#unlock-accoutn-file").val()
    if (filedata.length <= 0) {
        alert("请选择文件!")
        return
    }

    //文件上传通过Formdata去储存文件的数据
    var data = new FormData()
    data.append("file", $("#unlock-accoutn-file")[0].files[0])
    data.append("password", $("#unlock-account-password").val())
    // alert(data)
    var urlStr = "/keystoreunlock"

    //ajax 上传文件
    $.ajax({
        url: urlStr,
        type: "post",
        dataType: "json",
        contentType: false,
        data: data,
        processData: false,
        success: function (res, status) {
            // alert(JSON.stringify(res)+status)
            if (res.code == 0) {
                //将服务端返回的账户信息显示到页面
                configAccountInfo(res.data)
            } 
        },
        error: function (res, status) {
            alert(JSON.stringify(res)+status)
        }
    })
}



//解锁成功会给账户设置数据
function configAccountInfo(data) {
    $("#account-address").text(data.address)
    $("#account-balance").text(data.balance + " ETH")

    $("#transaction-first").hide()
    $("#transaction-second").show()

    $("input[name=fromaddress]").val(data.address)
    $("input[name=privatekey]").val(data.privatekey)

    $("#account-token-info").text(data.tokenbalance + " " + data.symbol)
    $("#send-transaction-token-symbol").text(data.symbol)
}

function checkTransaciton() {
    let transactionHash = $("#transaction-info-hash").val()
    // console.log(transactionHash)
    $.post("/checktransaction", `transactionHash=${transactionHash}`, function (res, status) {
        console.log(status + JSON.stringify(res))
        if (res.code == 0) {
            $("#transaction-info").text(JSON.stringify(res.data, null, 4))
        } 
    })
}

$(document).ready(function(){
    $("input[name=unlocktype]").change(function(){
        if(this.value == 1) {
            $("#unlock-account-keystore").show()
            $("#unlock-account-privatekey").hide()
        } else {
            $("#unlock-account-keystore").hide()
            $("#unlock-account-privatekey").show()
        }
    })

    $("#send-transaction-form").validate({
        rules:{
            toaddress:{
                required: true,
            },
            number:{
                required:true,
            },
        },
        messages:{
            toaddress:{
                required:"请输入对方地址",
            },
            number:{
                required:"请输入转账数额"
            },
        },
        submitHandler: function(form)
        {
            var urlStr
            let tokenType = $("#send-transaction-token-type").val()
            if (tokenType == 1) {
                urlStr = "/sendtransaction"
            } else {
                urlStr = "/sendtoken"
            }
             
            alert("urlStr:"+urlStr)
            $(form).ajaxSubmit({
                url:urlStr,
                type:"post",
                dataType:"json",
                success:function (res, status) {
                    console.log(status + JSON.stringify(res))
                    if (res.code == 0) {
                        $("#transaction-complate-hash").text(res.data.transactionHash)
                        $("#transaction-complate-blockhash").text(res.data.blockHash)
                        $("#transaction-complate").show()
                    }
                },
                error:function (res, status) {
                    console.log(status + JSON.stringify(res))
                }
            });
        }
    })
})