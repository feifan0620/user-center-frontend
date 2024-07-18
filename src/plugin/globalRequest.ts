/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message } from 'antd';

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie

  prefix: process.env.NODE_ENV === 'production' ? 'http://user-backend.feifan.ltd' : undefined,
  // requestType: 'form',
});

/**
 * 全局请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  console.log(`do request url = ${url}`);
  // return {
  //   url,
  //   options: {
  //     ...options,
  //     headers: {},
  //   },
  // };
});

/**
 * 全局响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {
  const res = await response.clone().json();
  if (res.code === 0) {
    console.log(res.data);
    return res.data;
  }
  if (res.code === 40100 && location.pathname !== '/') {
    message.error('请先登录');
    // history.replace({
    //   pathname: '/user/login',
    //   search: stringify({
    //     redirect: location.pathname,
    //   }),
    // });
  } else {
    throw new Error(res.description);
  }
  return res.data;
});

export default request;
