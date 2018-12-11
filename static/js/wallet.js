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
})