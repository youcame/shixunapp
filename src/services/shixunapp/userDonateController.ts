// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addUserDonate POST /api/userDonate/add */
export async function addUserDonateUsingPOST(
  body: API.UserDonateVO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/userDonate/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUserDonate POST /api/userDonate/delete */
export async function deleteUserDonateUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/userDonate/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserReceiveById GET /api/userDonate/get/children */
export async function getUserReceiveByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserReceiveByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListUserDonateVO_>('/api/userDonate/get/children', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getUserDonateById GET /api/userDonate/get/donate */
export async function getUserDonateByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserDonateByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListUserDonateVO_>('/api/userDonate/get/donate', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateUserDonate POST /api/userDonate/update */
export async function updateUserDonateUsingPOST(
  body: API.UserDonateVO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/userDonate/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
