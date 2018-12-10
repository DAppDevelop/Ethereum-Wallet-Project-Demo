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
    $("input[name=unlocktype]").change(()=>{
        if(this.value == 1) {
            $("#unlock-account-keystore").show()
            $("#unlock-account-privatekey").hide()
        } else {
            $("#unlock-account-keystore").hide()
            $("#unlock-account-privatekey").show()
        }
    })
})