// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addTask POST /api/task/add */
export async function addTaskUsingPOST(body: API.TaskVO, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/task/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteTask POST /api/task/delete */
export async function deleteTaskUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/task/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** finishTaskById GET /api/task/finish */
export async function finishTaskByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.finishTaskByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/task/finish', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getTaskById GET /api/task/get/task */
export async function getTaskByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTaskByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListTaskVO_>('/api/task/get/task', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getAllTasks GET /api/task/getAllTask */
export async function getAllTasksUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListTaskVO_>('/api/task/getAllTask', {
    method: 'GET',
    ...(options || {}),
  });
}

/** updateTask POST /api/task/update */
export async function updateTaskUsingPOST(body: API.TaskVO, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/task/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
