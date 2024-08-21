// 加载, 开始, 结束
const loadingElt = document.querySelector(".loading");
const btnEnterElt = document.querySelector(".btn-enter");
const btnReEnterElt = document.querySelector(".btn-re-enter");
const btnExitElt = document.querySelector(".btn-exit");
const headerElt = document.querySelector(".header");
// 操作区
const wrapperElt = document.querySelector(".wrapper");
const actionElt = document.querySelector(".action-wrapper");
const audioActionElt = document.querySelector(".audio-action-wrapper");
const keyboardActionElt = document.querySelector(".keyboard-action-wrapper");
const btnStopCreateElt = document.querySelector(".btn-stop-create");
const btnRecreateElt = document.querySelector(".btn-recreate");
const btnAudioElt = document.querySelector(".btn-audio");
const btnKeyboardElt = document.querySelector(".btn-keyboard");
const btnMicElt = document.querySelector(".btn-mic");
const btnSendElt = document.querySelector(".btn-send");
const textInputElt = document.querySelector(".text-input");
// 气泡相关
const chatUserElt = document.querySelector(".chat-user");
const chatAiTextElt = document.querySelector(".chat-ai-text");
const chatAiOptionElt = document.querySelector(".chat-ai-option");
const chatAiOptionListElt = chatAiOptionElt.querySelector(".list");
const chatAiImageElt = document.querySelector(".chat-ai-image");
const chatAiImageClickElt = chatAiImageElt.querySelector(".image");
const chatAiVideoElt = document.querySelector(".chat-ai-video");
const chatAiVideoClickElt = chatAiVideoElt.querySelector(".video");
const chatAiPopupElt = document.querySelector(".chat-ai-popup");
const chatAiPopupClickElt = chatAiPopupElt.querySelector(".button");
// 弹窗
const chatPopElt = document.querySelector(".chat-popup");
// 跑马灯
const chatMarqueeElt = document.querySelector(".chat-marquee");
const marqueeElt = chatMarqueeElt.querySelector(".list");
// asr pop
const asrPopElt = document.querySelector(".asr-pop");
const asrTextElt = asrPopElt.querySelector(".asr-text");
// 异常
const maskElt = document.querySelector(".mask");
const warnElt = document.querySelector(".warn");
const videoArea = document.querySelector(".video-area");
const headerBgElt = document.querySelector(".header-bg");
// const symbolRegex = /[^~!@#$%^&*()_+`\-={}|\[\]\\:";'<>?,.、。，；：“”‘’！？【】（）《》\/—～｜]/g;
const isIOS = /iphone|ipad/i.test(navigator.userAgent);
const baseModelPath = './model/meta.json';
let resultSessionId = '';

// 全局状态
const globalStatus = {
    isInitAnalyser: false,
    // 状态标识
    status: "end",
    // 跑马灯相关
    marqueeRAFID: null,
    // ASR音波相关
    audioStream: null,
    audioCtx: null,
    // ASR
    isRecording: false,
    // 输入方式 audio/text
    inputActionType: "text",
};
// 开场白,跑马灯等指令
let command = {};
// ASR
const asrConfig = {
    secretId: "",
    secretKey: "",
    appId: 0,
};
// ASR对象
let webAudioSpeechRecognizer;
// ASR识别结果
let recordingStr = "";
// 回复气泡滚动高度
let aiTextScrollTop = 0;
// 文本高亮延迟
const textHighlightDelay = 1000;

// 提取纯文本
function extractText(txt) {
    if (txt) {
        return txt.replace(/<([^>]+)>/gi, () => {
            return "";
        });
    }
    return "";
}

function mobileAndTabletCheck() {
    let check = false;
    (function (a) {
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                a.substr(0, 4)
            )
        )
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

// 异常状态
function showWarnInfo(txt) {
    hide(1 | 2 | 4 | 8 | 16 | 32 | 64 | 128);
    warnElt.querySelector(".info").textContent = txt;
    warnElt.querySelector(".info").title = txt;
    maskElt.style.display = "block";
    warnElt.style.display = "block";
}

// 整体汇总一些关闭操作
function hide(type) {
    // 关闭语音操作界面
    if (type & 1) {
        audioActionElt.style.display = "none";
    }
    // 关闭ASR界面
    if (type & 2) {
        closeAudioAnalyser();
    }
    // 关闭文本操作界面
    if (type & 4) {
        textInputElt.innerText = "";
        keyboardActionElt.style.display = "none";
    }
    // 关闭跑马灯
    if (type & 8) {
        stopMarquee();
    }
    // 各种chat气泡
    if (type & 16) {
        chatUserElt.style.display = "none";
        chatAiTextElt.style.display = "none";
        chatAiTextElt.classList.remove("stop");
        chatAiOptionElt.style.display = "none";
        chatAiImageElt.style.display = "none";
        chatAiVideoElt.style.display = "none";
        chatAiPopupElt.style.display = "none";
    }
    // 停止回答,重新回答按钮
    if (type & 32) {
        btnStopCreateElt.style.display = "none";
        btnRecreateElt.style.display = "none";
    }
    // 结束服务按钮
    if (type & 64) {
        headerElt.style.display = "none";
        headerBgElt.style.display = 'none';
        wrapperElt.classList.remove('chat');
        videoArea.classList.remove('bg');
    }
    // 关闭弹窗
    if (type & 128) {
        chatPopElt.querySelector("div").innerHTML = "";
        chatPopElt.style.display = "none";
        maskElt.style.display = "none";
    }
}

// 气泡上屏
function showChat(type, opt) {
    switch (type) {
        // 正常文字气泡
        case "Text": {
            if (opt.type === "user") {
                chatUserElt.querySelector("div").textContent = opt.text;
                chatUserElt.style.display = "block";
            } else if (opt.type === "ai" && !globalStatus.marqueeRAFID && opt.text) {
                if (opt.isHTML) {
                    chatAiTextElt.querySelector("div pre").innerHTML = opt.text;
                } else {
                    chatAiTextElt.querySelector("div pre").textContent = extractText(
                        opt.text
                    );
                }
                chatAiTextElt.style.display = "block";
                // 自动滚动
                const elt = chatAiTextElt.querySelector("#highlight");
                if (elt) {
                    const rect = elt.getBoundingClientRect();
                    const eltRoot = chatAiTextElt.querySelector("div");
                    const rectRoot = eltRoot.getBoundingClientRect();
                    const sTop = rect.top + eltRoot.scrollTop - rectRoot.top;
                    // console.log(eltRoot.scrollHeight, sTop)
                    if (sTop > aiTextScrollTop) {
                        aiTextScrollTop = sTop;
                    }
                    chatAiTextElt.querySelector("div").scrollTo(0, aiTextScrollTop);
                }
            }
            break;
        }
        // 跑马灯
        case "Welcome": {
            hide(16);
            startMarquee(opt.title, opt.content);
            break;
        }
        // 图片
        case "Image": {
            const { title, url } = opt;
            if (title) {
                chatAiImageElt.querySelector(".title").textContent = title;
            }
            chatAiImageClickElt.style.backgroundImage = `url('${url}')`;
            chatAiImageClickElt.setAttribute("data-url", url);
            chatAiImageElt.style.display = "block";
            break;
        }
        // 视频
        case "Video": {
            const { title, url } = opt;
            if (title) {
                chatAiVideoElt.querySelector(".title").textContent = title;
            }
            chatAiVideoClickElt.setAttribute("data-url", url);
            chatAiVideoElt.querySelector("video").src = url;
            chatAiVideoElt.style.display = "block";
            break;
        }
        // 选择题
        case "OptionInfo": {
            const { title, style, optionArr } = opt;
            chatAiOptionElt.querySelector(".title").textContent = title;
            chatAiOptionListElt.classList.add(`style${style}`);
            chatAiOptionListElt.innerHTML = optionArr
                .map((n) => {
                    return `<button>${n}</button>`;
                })
                .join("");
            chatAiOptionElt.style.display = "block";
            break;
        }
        // 图片选择题
        case "ImageOption": {
            const { title, url, style, optionArr } = opt;
            chatAiOptionElt.querySelector(
                ".title"
            ).innerHTML = `${title}<img src="${url}">`;
            chatAiOptionListElt.classList.add(`style${style}`);
            chatAiOptionListElt.innerHTML = optionArr
                .map((n) => {
                    return `<button>${n}</button>`;
                })
                .join("");
            chatAiOptionElt.style.display = "block";
            break;
        }
        // 弹窗
        case "Popup": {
            const { title, content, button } = opt;
            chatAiPopupElt.querySelector(".title").textContent = title;
            chatAiPopupClickElt.setAttribute("data-title", title);
            chatAiPopupClickElt.setAttribute("data-content", content);
            chatAiPopupElt.style.display = "block";
        }
    }
}

// 启动跑马灯
function startMarquee(title, marqueeArr) {
    if (!Array.isArray(marqueeArr) || !marqueeArr.length) {
        return;
    }
    // 不足3个, 自动补齐
    while (marqueeArr.length < 3) {
        marqueeArr.push(marqueeArr[0]);
    }
    chatMarqueeElt.style.display = "block";
    const titleElt = chatMarqueeElt.querySelector(".title");
    titleElt.textContent = title;
    const rootW = Math.ceil(marqueeElt.getBoundingClientRect().width);
    const mEltArr = marqueeElt.querySelectorAll(".marquee");
    const num = Math.floor(marqueeArr.length / 3);
    const arr = [
        marqueeArr.slice(0, num),
        marqueeArr.slice(num, 2 * num),
        marqueeArr.slice(2 * num),
    ];
    const lenMap = {
        maxL: 0,
    };
    arr.forEach((m, i) => {
        let str = "";
        let w = 0;
        lenMap[i] = {
            unitL: 0, // 单位长度
            sumL: 0, // 总长度
        };
        while (w < rootW + lenMap[i].unitL) {
            str += "<p>";
            // NOCA:no-loop-func(误判, 这是语法糖)
            m.forEach((n) => {
                str += `<button>${n}</button>`;
            });
            str += "</p>";
            mEltArr[i].innerHTML = str;
            w = Math.floor(mEltArr[i].getBoundingClientRect().width);
            // 第一次算单位长度
            if (lenMap[i].unitL == 0) {
                lenMap[i].unitL = w;
            }
        }
        lenMap[i].sumL = w;
        if (lenMap[i].sumL > lenMap.maxL) {
            lenMap.maxL = lenMap[i].sumL;
        }
    });

    const xArr = [0, 0, 0];
    // 间距
    const pad = Math.ceil((document.documentElement.clientHeight * 1.25) / 100);
    let timeStart = 0;
    // 每次移动的距离
    const px = 1;
    function marqueeRAF(ts) {
        if (timeStart === 0) {
            timeStart = ts;
        }
        globalStatus.marqueeRAFID = requestAnimationFrame(marqueeRAF);
        // if (ts - timeStart >= 15) {
        for (let i = 0; i < 3; i++) {
            const xVal = Math.abs(xArr[i]);
            if (xVal >= lenMap[i].unitL - pad) {
                xArr[i] = lenMap[i].unitL - pad - xVal - px;
            } else {
                xArr[i] -= px;
            }
            mEltArr[i].style.transform = `translateX(${xArr[i]}px) translateZ(0)`;
        }
        timeStart = ts;
        // }
    }
    requestAnimationFrame(marqueeRAF);
}

// 停止跑马灯
function stopMarquee() {
    globalStatus.marqueeRAFID = window.cancelAnimationFrame(
        globalStatus.marqueeRAFID
    );
    chatMarqueeElt.style.display = "none";
    const mEltArr = marqueeElt.querySelectorAll(".marquee");
    for (let i = 0; i < 3; i++) {
        mEltArr[i].style.transform = `translateX(0px)`;
    }
}

// init音频
function initAudio() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: false,
                // @ts-ignore
                audioTrackSet: {
                    deviceId: "",
                    groupId: "",
                    echoCancellation: false,
                    noiseSuppression: false,
                },
            })
            .then((stream) => {
                globalStatus.audioStream = stream;
                globalStatus.audioCtx = new (window.AudioContext ||
                    window.webkitAudioContext)();
            })
        ["catch"](function (e) {
            alert("没有获得麦克风权限!请允许使用麦克风权限后刷新页面重试!");
            console.error("media error:", e);
        });
    } else {
        if (
            navigator.userAgent.toLowerCase().match(/chrome/) &&
            location.origin.indexOf("https://") < 0
        ) {
            alert(
                "chrome下获取浏览器录音功能，因为安全性问题，需要在localhost或127.0.0.1或https下才能获取权限"
            );
        } else {
            alert("无法获取浏览器录音功能，请升级浏览器或使用chrome");
        }
    }
}

// 音频分析
function analyser(canvasElt, isLeftToRight = true) {
    const audioCtx = globalStatus.audioCtx;
    const audioStream = globalStatus.audioStream;

    const rect = canvasElt.getBoundingClientRect();
    const canvasH = rect.height;
    const canvasW = 1.8 * canvasH;

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;
    const source = audioCtx.createMediaStreamSource(audioStream);

    source.connect(analyser);
    // 不连接输出设备, 防止有杂音
    // analyser.connect(audioCtx.destination)

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    canvasElt.width = canvasW;
    canvasElt.height = canvasH;
    canvasElt.style.width = `${canvasW}px`;
    canvasElt.style.height = `${canvasH}px`;
    const ctx = canvasElt.getContext("2d");
    // ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    const len = 8;
    const gapW = Math.floor(canvasW / (2 * len));
    const barW = Math.floor(gapW);
    let barH;

    const colorArr = [
        "rgba(69, 123, 255, 1)",
        "rgba(76, 138, 243, 1)",
        "rgba(79, 145, 237, 1)",
        "rgba(81, 150, 231, 1)",
        "rgba(86, 158, 223, 1)",
        "rgba(117, 171, 223, 1)",
        "rgba(123, 177, 217, 1)",
        "rgba(145, 198, 238, 1)",
    ];

    function renderFrame() {
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvasW, canvasH);

        const sign = isLeftToRight ? 1 : -1;
        let x;
        if (isLeftToRight) {
            x = gapW;
        } else {
            x = canvasW - gapW;
        }
        for (let i = 0; i < len; i++) {
            const idx = Math.floor(bufferLength / len) * i;
            barH = Math.floor((canvasH * dataArray[idx]) / 255);
            if (barH >= canvasH / 2 - barW / 2) {
                barH = Math.floor(
                    canvasH / 2 - barW / 2 - (Math.random() * canvasH) / 10
                );
            }
            ctx.fillStyle = colorArr[i];
            ctx.strokeStyle = colorArr[i];
            // 矩形
            ctx.fillRect(x, canvasH / 2 - barH, sign * barW, barH * 2);
            // 下半圆
            ctx.beginPath();
            ctx.arc(
                x + (sign * barW) / 2,
                canvasH / 2 + barH,
                barW / 2,
                0,
                Math.PI,
                false
            );
            ctx.moveTo(x, canvasH / 2 + barH);
            ctx.lineTo(x + sign * barW, canvasH / 2 + barH);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            // 上半圆
            ctx.beginPath();
            ctx.arc(
                x + (sign * barW) / 2,
                canvasH / 2 - barH,
                barW / 2,
                0,
                Math.PI,
                true
            );
            ctx.moveTo(x, canvasH / 2 - barH);
            ctx.lineTo(x + sign * barW, canvasH / 2 - barH);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            x += (barW + gapW) * sign;
        }

        requestAnimationFrame(renderFrame);
    }

    renderFrame();
}

// 显示音波
function openAudioAnalyser() {
    asrPopElt.style.display = "block";
    if (!globalStatus.isInitAnalyser) {
        analyser(asrPopElt.querySelector(".wave-left"), false);
        analyser(asrPopElt.querySelector(".wave-right"));
        globalStatus.isInitAnalyser = true;
    }
}

// 关闭音波
function closeAudioAnalyser() {
    asrPopElt.style.display = "none";
    asrTextElt.textContent = "";
}

// ASR鉴权函数
function signCallback(signStr) {
    function toUint8Array(wordArray) {
        // Shortcuts
        const words = wordArray.words;
        const sigBytes = wordArray.sigBytes;

        // Convert
        const u8 = new Uint8Array(sigBytes);
        for (let i = 0; i < sigBytes; i++) {
            u8[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        }
        return u8;
    }

    function Uint8ArrayToString(fileData) {
        let dataString = "";
        for (let i = 0; i < fileData.length; i++) {
            dataString += String.fromCharCode(fileData[i]);
        }
        return dataString;
    }

    const secretKey = asrConfig.secretKey;
    const hash = window.CryptoJSTest.HmacSHA1(signStr, secretKey);
    const bytes = Uint8ArrayToString(toUint8Array(hash));
    return window.btoa(bytes);
}

let asrParams = {};
// 初始化ASR
async function initASR(callback) {
    asrParams = {
        signCallback: signCallback, // 鉴权函数
        // 用户参数
        secretid: asrConfig.secretId,
        secretkey: asrConfig.secretKey,
        appid: asrConfig.appId,
        // 实时识别接口参数
        engine_model_type: "16k_zh", // 因为内置WebRecorder采样16k的数据，所以参数 engineModelType 需要选择16k的引擎，为 '16k_zh'
        // 以下为非必填参数，可跟据业务自行修改
        voice_format: 1,
        hotword_id: "", // 热词key
        customization_id: "", // 自学习模型key
        needvad: 1,
        filter_dirty: 1,
        filter_modal: 2,
        filter_punc: 0,
        convert_num_mode: 1,
        word_info: 2,
    };
    // 开始ASR识别事件
    btnAudioElt.addEventListener("click", (e) => {
        if (!globalStatus.audioCtx) {
            return initAudio();
        }
        if (!globalStatus.isRecording) {
            hide(1);
            btnExitElt.style.display = "none";
            startRecord(callback);
        }
    });
}

// 开始ASR识别
function startRecord(callback) {
    webAudioSpeechRecognizer = new WebAudioSpeechRecognizer(asrParams);
    // 开始识别
    webAudioSpeechRecognizer.OnRecognitionStart = (res) => {
        console.log("开始识别", res);
        hide(1 | 32);
        openAudioAnalyser();
        globalStatus.isRecording = true;
        recordingStr = "";
    };
    // 一句话开始
    webAudioSpeechRecognizer.OnSentenceBegin = (res) => {
        console.log("一句话开始", res);
    };
    // 识别变化时
    webAudioSpeechRecognizer.OnRecognitionResultChange = (res) => {
        asrTextElt.textContent = recordingStr + res.result.voice_text_str;
        console.log(recordingStr + res.result.voice_text_str);
    };
    // 一句话结束
    webAudioSpeechRecognizer.OnSentenceEnd = (res) => {
        console.log("一句话结束", res);
        recordingStr += res.result.voice_text_str;
        if (recordingStr) {
            webAudioSpeechRecognizer.stop();
            globalStatus.isRecording = false;
            hide(2);
            audioActionElt.style.display = "block";
            btnExitElt.style.display = "block";
            callback(recordingStr);
        }
    };
    // 识别结束
    webAudioSpeechRecognizer.OnRecognitionComplete = (res) => {
        console.log("识别结束", res);
    };
    // 识别错误
    webAudioSpeechRecognizer.OnError = (res) => {
        if (typeof res === 'string') {
            showWarnInfo(res);
        }
        console.log("识别失败", res);
    };

    webAudioSpeechRecognizer.start();
}

// 发送文本
function sendTextCLient(text, textDrive = false, loop = 0) {
    if (text && text.length) {
        // if (!symbolRegex.test(text)) {
        //     alert('请输入正确的文本内容哦～')
        //     return
        // }
        if (globalStatus.status === "end") {
            hide(1 | 4 | 8 | 16 | 128);
            if (
                !textDrive &&
                command["跑马灯"] &&
                command["跑马灯话术"].includes(text)
            ) {
                IVH.initAudio();
                globalStatus.status = "texting";
                isIOS && IVH.setVolume(50);
                IVH.play(text, {
                    isChat: true,
                    isNew: false,
                });
                showChat("Welcome", command["跑马灯"]);
            } else {
                globalStatus.status = textDrive ? "texting" : "sending";
                !textDrive &&
                    showChat("Text", {
                        text,
                        type: "user",
                        isHTML: true,
                    });
                IVH.initAudio();
                isIOS && IVH.setVolume(50);
                IVH.play(text, {
                    isChat: true,
                    isNew: false,
                });
            }
        } else if (loop > 0) {
            loop--;
            setTimeout(() => {
                sendTextCLient(text, textDrive, loop);
            }, 100);
        }
    }
}

function getClientMarkdownHtml(txtArr, highlightSeqNo = -1) {
    if (!txtArr || !txtArr.length) return;
    let htmlStr = txtArr
        .map((n) => {
            const { replyDisplay, seqNo, contentType, isHighLight } = n;
            if (seqNo == highlightSeqNo && isHighLight) {
                switch (contentType) {
                    // 有序列表
                    case 2: {
                        return replyDisplay.replace(
                            /^(\s*\d+\.\s)([^\n]+)(\n*)/,
                            (str, $1, $2, $3) => {
                                return `${$1}<b id="highlight" style="display: inline; color: rgba(62, 110, 229, 1); font-weight: 500;">${$2}</b>${$3}`;
                            }
                        );
                    }
                    // 无序列表
                    case 3: {
                        return replyDisplay.replace(
                            /^(\s*[-*]\s)([^\n]+)(\n*)/,
                            (str, $1, $2, $3) => {
                                return `${$1}<b id="highlight" style="display: inline; color: rgba(62, 110, 229, 1); font-weight: 500;">${$2}</b>${$3}`;
                            }
                        );
                    }
                    // 图片、链接
                    case 5:
                    case 4: {
                        return replyDisplay.replace(/\[(.+?)\]/, (str, $1) => {
                            if ($1) {
                                return `[<b id="highlight" style="display: inline; color: rgba(62, 110, 229, 1); font-weight: 500;">${$1}</b>]`;
                            }
                            return str;
                        });
                    }
                    // 表格
                    case 6: {
                        return replyDisplay.replace(/[^|\s]+/g, (str) => {
                            return `<b id="highlight" style="display: inline; color: rgba(62, 110, 229, 1); font-weight: 500;">${str}</b>`;
                        });
                    }
                    // 标题
                    case 8: {
                        return replyDisplay.replace(/^(#+\s+)(.*?)(\n*)$/m, (str, $1, $2, $3) => {
                            return `${$1}<b id="highlight" style="display: inline; color: rgba(62, 110, 229, 1); font-weight: 500;">${$2}</b>${$3}`;
                        });
                    }
                    default: {
                        return replyDisplay.replace(/(.*?)(\n*)$/m, (str, $1, $2) => {
                            return `<b id="highlight" style="display: inline; color: rgba(62, 110, 229, 1); font-weight: 500;">${$1}</b>${$2}`;
                        });
                    }
                }
            }
            return replyDisplay;
        })
        .join("");
    // 给a标签加上target
    const renderer = new marked.Renderer();
    renderer.link = function (href, title, text) {
        const link = marked.Renderer.prototype.link.call(this, href, title, text);
        return link.replace("<a", "<a target='_blank' ");
    };
    // 设置marked.js的选项
    marked.setOptions({
        renderer,
    });
    // 破坏掉www.转链接的bug
    htmlStr = htmlStr.replace(/www\./g, "www\\.");
    // 已经换html了, pre下要去掉多余的\n
    htmlStr = marked.parse(htmlStr).replace(/\n/g, "");
    return htmlStr;
}

async function init() {
    const url = new URL(window.location.href);
    const searchParams = url.search.slice(1).split('&');
    const params = {};

    for (const param of searchParams) {
        const [key, value] = param.split('=');
        params[key] = value;
    }

    let urlParams = new URLSearchParams(window.location.search);
    let sign = params.sign;
    let virtualmanKey = urlParams.get("virtualmanKey");
    let secretId = urlParams.get("secretId");
    let secretKey = urlParams.get("secretKey");
    let appId = urlParams.get("appId");
    let modelPath = '';
    let actionPaths = [];
    let configPath = '';
    let textArr = [];
    let currentSeq = -1;

    // 是否开启ASR能力
    const asrAbility = secretId && secretKey && appId
    if (!asrAbility) {
        btnMicElt.style.display = 'none';
        textInputElt.style.marginLeft = '12px';
    } else {
        asrConfig.secretId = secretId || '';
        asrConfig.secretKey = secretKey || '';
        asrConfig.appId = appId || '';
    }

    if (!mobileAndTabletCheck()) {
        document.body.classList.add("pc");
    }

    if (virtualmanKey && sign) {
        const response = await fetch(baseModelPath);
        if (response.ok) {
            const modelConfig = await response.json();
            modelPath = modelConfig.modelPath && baseModelPath.replace(/meta\.json/, modelConfig.modelPath)
            actionPaths = modelConfig.actionPaths && modelConfig.actionPaths.map(item => baseModelPath.replace(/meta\.json/, item))
            configPath = modelConfig.configPath && baseModelPath.replace(/meta\.json/, modelConfig.configPath)
        } else {
            return alert("模型数据获取失败");
        }

        videoArea.style.width = '100%'
        videoArea.style.height = '100%'

        const listeningIndex = actionPaths.findIndex(i => i.includes('listening'));

        IVH.init({
            sign,
            element: videoArea,
            virtualmanKey,
            modelPath,
            actionPath: actionPaths,
            confPath: configPath,
            defaultActionIdx: listeningIndex >= 0 ? listeningIndex : 0
        });

        IVH.on('error', async e => {
            showWarnInfo(e.message);
        })

        IVH.on('play', async e => {
            btnStopCreateElt.style.display = "none";
            btnRecreateElt.style.display = "block";
            if (globalStatus.inputActionType == "audio") {
                audioActionElt.style.display = "block";
            } else {
                keyboardActionElt.style.display = "block";
            }
            globalStatus.status = "end"
        })

        IVH.on('init', e => {
            loadingElt.style.display = "none";
            btnEnterElt.style.display = "block";
            videoArea.style.background = 'white'
            videoArea.style.display = 'none'
        });

        IVH.on('nlp', e => {
            if (e.code === 0) {
                const { interactionType, replyDisplay, interactionContent } = e.data
                switch (interactionType) {
                    case 'OptionInfo': {
                        showChat(interactionType, {
                            title: extractText(replyDisplay),
                            style: JSON.parse(interactionContent).style,
                            optionArr: JSON.parse(interactionContent).options,
                        });
                        break;
                    }
                    case 'Video':
                    case 'Image': {
                        showChat(interactionType, {
                            title: extractText(replyDisplay),
                            url: JSON.parse(interactionContent).url,
                        });
                        break;
                    }
                    case 'Popup': {
                        showChat(interactionType, {
                            title: JSON.parse(interactionContent).title,
                            content: JSON.parse(interactionContent).content,
                            button: JSON.parse(interactionContent).button,
                        });
                        break;
                    }
                    case 'ImageOption': {
                        showChat(interactionType, {
                            title: extractText(replyDisplay),
                            url: JSON.parse(interactionContent).url,
                            style: JSON.parse(interactionContent).style,
                            optionArr: JSON.parse(interactionContent).options,
                        });
                        break;
                    }
                    default: {
                        textArr.push(e.data);
                        showChat("Text", {
                            text: getClientMarkdownHtml(textArr, currentSeq),
                            type: "ai",
                            isHTML: true,
                        });
                    }
                }
            }
        });

        IVH.on('sentence', e => {
            if (e.code === 0) {
                const { seqNo, status } = e.data
                if (status === 'start') {
                    btnStopCreateElt.style.display = "block";
                    btnRecreateElt.style.display = "none";
                    setTimeout(() => {
                        currentSeq = seqNo;
                        showChat("Text", {
                            text: getClientMarkdownHtml(textArr, currentSeq),
                            type: "ai",
                            isHTML: true,
                        });
                    }, textHighlightDelay);
                }
                if (status === 'over') {
                    setTimeout(() => {
                        currentSeq = -1;
                        showChat("Text", {
                            text: getClientMarkdownHtml(textArr, currentSeq),
                            type: "ai",
                            isHTML: true,
                        });
                    }, textHighlightDelay);
                }
            }
        })

        btnEnterElt.addEventListener("click", async () => {
            videoArea.style.display = 'block'
            btnEnterElt.style.display = "none";
            headerElt.style.display = "block";
            keyboardActionElt.style.display = "block";

            initAudio();
            initASR(() => {
                textArr = [];
                sendTextCLient(recordingStr)
                btnStopCreateElt.style.display = "block";
                btnRecreateElt.style.display = "none";
            });
        });

        // 弹窗关闭
        chatPopElt.querySelector(".close").addEventListener("click", (e) => {
            hide(128);
        });

        // 图片弹窗
        chatAiImageClickElt.addEventListener("click", (e) => {
            const elt = e.target;
            chatPopElt.querySelector("div").innerHTML = `
          <img src="${elt.getAttribute("data-url")}"/>
        `;
            chatPopElt.style.display = "block";
            maskElt.style.display = "block";
        });

        // 视频弹窗
        chatAiVideoClickElt.addEventListener("click", (e) => {
            const elt = e.target;
            let url;
            if (elt.nodeName === "VIDEO") {
                url = elt.src;
            } else {
                url = elt.getAttribute("data-url");
            }
            chatPopElt.querySelector("div").innerHTML = `
      <video src="${url}" controls controlsList="nodownload nofullscreen noremoteplayback"></video>
    `;
            chatPopElt.style.display = "block";
            maskElt.style.display = "block";
        });

        // 文本弹窗
        chatAiPopupClickElt.addEventListener("click", (e) => {
            const elt = e.target;
            chatPopElt.querySelector("div").innerHTML = `
      <h4>${elt.getAttribute("data-title")}</h4>
      <p>${elt.getAttribute("data-content")}</p>
    `;
            chatPopElt.style.display = "block";
            maskElt.style.display = "block";
        });

        // 选择题
        chatAiOptionListElt.addEventListener("click", (e) => {
            const elt = e.target;
            if (elt.nodeName === "BUTTON") {
                sendTextCLient(elt.textContent);
            }
        });

        // 结束服务按钮事件
        btnExitElt.addEventListener("click", async () => {
            webAudioSpeechRecognizer && webAudioSpeechRecognizer.stop();
            hide(1 | 2 | 4 | 8 | 16 | 32 | 64 | 128);
            btnReEnterElt.style.display = "block";
            videoArea.style.background = 'initial'
            videoArea.style.display = 'none'
        });

        // 再次服务按钮事件
        btnReEnterElt.addEventListener("click", async () => {
            location.reload();
        });

        // 切换文本输入按钮事件
        btnKeyboardElt.addEventListener("click", () => {
            globalStatus.inputActionType = "text";
            hide(1);
            keyboardActionElt.style.display = "block";
            actionElt.classList.remove("audio");
        });

        // 切换语音输入按钮事件
        btnMicElt.addEventListener("click", () => {
            globalStatus.inputActionType = "audio";
            hide(4);
            audioActionElt.style.display = "block";
            actionElt.classList.add("audio");
        });

        // 发送文本按钮事件
        btnSendElt.addEventListener("click", () => {
            var text = textInputElt.innerText.trim();
            if (text.length > 4000) {
                return alert("超出最长提问字数限制, 请控制在4000字以内!");
            }
            if (text && text.length) {
                textArr = [];
                sendTextCLient(text);
                textInputElt.innerText = "";
                btnStopCreateElt.style.display = "none";
                btnRecreateElt.style.display = "none";
            }
        });

        // 回车按钮事件
        textInputElt.addEventListener("keydown", (e) => {
            const elt = e.target;
            if (e.keyCode == 13 && elt.innerText.trim()) {
                if (elt.innerText.length > 4000) {
                    return alert("超出最长提问字数限制, 请控制在4000字以内!");
                }
                textArr = [];
                sendTextCLient(elt.innerText.trim());
                elt.innerText = "";
                btnStopCreateElt.style.display = "none";
                btnRecreateElt.style.display = "none";
                e.preventDefault();
            } else if (e.keyCode !== 8 && elt.innerText.length >= 4000) {
                e.preventDefault();
            }
        });

        // 停止回答按钮事件
        btnStopCreateElt.addEventListener("click", () => {
            textArr = [];
            IVH.stop();
            chatAiTextElt.classList.add("stop");
            btnStopCreateElt.style.display = "none";
            btnRecreateElt.style.display = "block";
            if (globalStatus.inputActionType == "audio") {
                audioActionElt.style.display = "block";
            } else {
                keyboardActionElt.style.display = "block";
            }
            globalStatus.status = "end"
        });

        // 重新生成按钮事件
        btnRecreateElt.addEventListener("click", () => {
            var text = chatUserElt.querySelector("div").textContent;
            if (text && text.length) {
                textArr = [];
                sendTextCLient(text);
                btnStopCreateElt.style.display = "none";
                btnRecreateElt.style.display = "none";
            }
        });

        // 异常弹窗按钮事件
        warnElt.querySelector("button").addEventListener("click", () => {
            location.reload();
        });
    } else {
        return alert("请输入正确的url");
    }
}

init();