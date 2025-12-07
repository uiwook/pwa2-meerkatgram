/**
 * @file app/middlewares/auth/configs/role.permissions.js
 * @description 요청 별 접근 권한 설정
 * 251126 v1.0.0 wook init
 */
// role.permissions에 추가하지 않고, 인증절차를 거쳐 사용하려고 하면, ID가 undifined라고 나온다.

import ROLE from "./role.enum.js";
const { ADMIN, NORMAL, SUPER } = ROLE

// 인증 및 인가가 필요한 요청만 정의
const ROLE_PERMISSIONS = {
  GET: [
    // { path: 정규식, roles: [권한 확인] }
    // /api/posts/:id 를 검증하는 정규식
    { path: /^\/api\/posts\/[0-9]+$/, roles: [NORMAL, SUPER] },
    { path: /^\/api\/comments\/[0-9]+\/[0-9]+$/, roles: [NORMAL, SUPER] },
  ],
  POST: [
    { path: /^\/api\/auth\/logout$/, roles: [NORMAL, SUPER] },
    { path: /^\/api\/auth\/reissue$/, roles: [NORMAL, SUPER] },
    { path: /^\/api\/posts$/, roles: [NORMAL, SUPER] },
    { path: /^\/api\/comments$/, roles: [NORMAL, SUPER] },
    { path: /^\/api\/files\/posts$/, roles: [NORMAL, SUPER] },
  ],
  PUT: [
    { path: /^\/api\/users$/, roles: [NORMAL, SUPER] },
    { path: /^\/api\/posts\/[0-9]+$/, roles: [NORMAL, SUPER] },
  ],
  DELETE: [
    { path: /^\/api\/posts\/[0-9]+$/, roles: [NORMAL, SUPER] },
    
  ]
}
Object.freeze(ROLE_PERMISSIONS);

export default ROLE_PERMISSIONS;