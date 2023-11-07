// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addResource POST /api/resource/add */
export async function addResourceUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addResourceUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/resource/add', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getResource GET /api/resource/get */
export async function getResourceUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListResourceVO_>('/api/resource/get', {
    method: 'GET',
    ...(options || {}),
  });
}
