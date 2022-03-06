// 注意，script标签不受同源策略影响，所以可以用来进行跨域请求，优点是兼容性好，但是只能用于GET请求

// jsonp的知识好好研究研究...
const script = document.createElement('script')
script.type = 'text/javascript'

script.src = 'xxx.com/login?user=xxx&password=123&callback=onBack'
document.head.appendChild(script)

function onBack(res) {
    console.log(res)
}

//server
onBack(data)

