
function openPages(params){
  try{
    window.openPages(JSON.stringify(params));
  }catch (e) {
    console.error('调用客户端方法openPages失败,参数：',params)
  }
}

export {openPages}
