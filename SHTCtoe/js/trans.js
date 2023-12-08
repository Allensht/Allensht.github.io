let transFrom;
let transTo;
let doneText;
transFrom = "en";
transTo = "zh";
function teach() {
   const driver = window.driver.js.driver;
   const steps = [
       {
           popover: {
               title: '欢迎使用SHTCtoe',
               description: '本站仅用于中英文互译',
           }
       },
       {
           popover: {
               title: '按钮一',
               description: '切换',
           }
       },
       {
           popover: {
               title: '按钮二',
               description: '复制',
           }
       },
       {
           popover: {
               title: '按钮三',
               description: '朗读',
           }
       },
       {
           popover: {
               title: '按钮四',
               description: '翻译',
           }
       }
   ];
   const driverObj = driver({
       showProgress: true,
       allowClose: false,
       overlayColor: 'white',
       nextBtnText: '下一步',
       prevBtnText: '上一步',
       doneBtnText: '完成',
       steps
   });
   driverObj.drive();
}
function trans() {
    const transWords = document.getElementById("transWords").value;
    /* console.log(transWords); */
    const url = "https://v2.alapi.cn/api/fanyi?q="+ transWords + "&from=" + transFrom + "&to=" + transTo + "&token=LwExDtUWhF3rH5ib";
    /* console.log(url); */
    document.getElementById("transTo").innerHTML = ` 
            <textarea class="doneWords" id="transWords" cols="25" rows="7" placeholder="..." style="font-size: 30px;"></textarea>
            `;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (response) {
            if (response.code !== 200) {
                alert(response.msg);
            } else {
                doneTime(response);
            }
        },
        error: function (error) {
            /* console.log(error); */
            alert("翻译失败!");
        }
    })
}
function doneTime(response) {
    const doneWords = response.data.dst;
    /* console.log(doneWords); */
    document.getElementById("transTo").innerHTML = ` 
    <textarea class="doneWords" id="doneWords" cols="25" rows="7" placeholder="${doneWords}" maxlength="1000" style="font-size: 30px;"></textarea>
    `;
    const done = document.getElementById("doneWords");
    doneText = done.placeholder;
    /* console.log(doneText); */
}
function copy() {
    var text = `原文：${transWords.value}
译文：${doneText}
感谢使用SHTCtoe!!!`;
    /* console.log(text); */
    navigator.clipboard.writeText(text);
    alert("复制成功！");
}
function changeEn() {
    transFrom = "zh";
    transTo = "en";
    document.getElementById("transFrom").innerHTML = ` 
            <textarea class="transWords" id="transWords" cols="25" rows="7" placeholder="请输入一些文字..." maxlength="1000" style="font-size: 30px;"></textarea>
            `;
    document.getElementById("transTo").innerHTML = ` 
            <textarea class="doneWords" id="doneWords" cols="25" rows="7" placeholder="" maxlength="1000" style="font-size: 30px;"></textarea>
            `;
    document.getElementById("change").innerHTML = ` 
            <button onclick="changeZh()"><svg t="1698551052658" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5244" width="20" height="20"><path d="M810.752 205.397333a213.333333 213.333333 0 0 1 213.333333 213.333334v128h-85.333333v-128a128 128 0 0 0-128-128h-768a42.666667 42.666667 0 0 1-24.746667-77.397334L316.586667 0l49.493333 69.461333-190.293333 135.936h634.88z m-597.333333 597.333334a213.333333 213.333333 0 0 1-213.333334-213.333334v-128h85.333334v128a128 128 0 0 0 128 128h768a42.666667 42.666667 0 0 1 24.746666 77.397334l-298.666666 213.333333-49.493334-69.461333 190.293334-135.936H213.333333z" fill="#333333" p-id="5245"></path></svg></button>
            `;
}
function changeZh() {
    transFrom = "en";
    transTo = "zh";
    document.getElementById("transFrom").innerHTML = ` 
            <textarea class="transWords"  id="transWords" cols="25" rows="7" placeholder="Please enter some words..." maxlength="1000" style="font-size: 30px;"></textarea>
            `;
    document.getElementById("transTo").innerHTML = ` 
            <textarea class="doneWords" id="doneWords" cols="25" rows="7" placeholder="" maxlength="1000" style="font-size: 30px;"></textarea>
            `;
    document.getElementById("change").innerHTML = ` 
            <button onclick="changeEn()"><svg t="1698551052658" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5244" width="20" height="20"><path d="M810.752 205.397333a213.333333 213.333333 0 0 1 213.333333 213.333334v128h-85.333333v-128a128 128 0 0 0-128-128h-768a42.666667 42.666667 0 0 1-24.746667-77.397334L316.586667 0l49.493333 69.461333-190.293333 135.936h634.88z m-597.333333 597.333334a213.333333 213.333333 0 0 1-213.333334-213.333334v-128h85.333334v128a128 128 0 0 0 128 128h768a42.666667 42.666667 0 0 1 24.746666 77.397334l-298.666666 213.333333-49.493334-69.461333 190.293334-135.936H213.333333z" fill="#333333" p-id="5245"></path></svg></button>
            `;
}
function listen() {
    var speech = new SpeechSynthesisUtterance();
    var mes = `${transWords.value}${doneText}`;
    speech.text = mes;
    speech.volume = 1;
    speech.rate = 0.5;
    speech.pitch = 2;
    window.speechSynthesis.speak(speech);
}