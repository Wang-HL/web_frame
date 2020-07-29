/**
 * 默认post请求
 * 
 * 1参数 = url
 * 
 * 2参数 = url + body 或 url + method
 * 
 * 3参数 = url + method + body
 * 
 * 4参数 = url + method + headers + body
 * 
 * @param {String} url 字符串
 * @param {String} method 请求方法
 * @param {Object} headers headers头部参数
 * @param {Object} body 提交的内容
 */
export function Fetch(...params) {
  let url, method = 'POST', headers = {
    'Content-Type': 'application/json; chartset=utf-8',
    Authorization: window.localStorage.getItem('token') ? window.localStorage.getItem('token') : ''
  }, body = {};

  switch (params.length) {
    case 1: [url] = params; break;
    case 2: typeof params[1] === 'string' ? ([url, method] = params) : ([url, body] = params); break;
    case 3: [url, method, body] = params; break;
    case 4: [url, method, headers, body] = params; break;
    default:
      throw new Error('参数错误');
  }

  let reqMod = { method, headers };
  if (method !== 'GET' && method !== 'get') {
    reqMod = { ...reqMod, body: JSON.stringify(body) };
  }

  return fetch(url, reqMod)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText
        })
      }
    })
    .then(data => {
      return data
    })
    .catch(error => {
      if (error.status === 401) {
        window.location.href = '/sys/login';
        throw new Error('权限错误');
      }
      if (error.status === 404) {
        console.log(404);
      }
      if (error.status === 405) {
        throw new Error('接口访问方式出错！');
      }
      if (error.status === 500) {
        throw new Error('服务请求出错！')
      }
    });;
}