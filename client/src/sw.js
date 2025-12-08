import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

const PREFIX = import.meta.env.VITE_APP_NAME;

// --------------------------
// 정적 파일 캐싱
// --------------------------
// vite.config.js의 manifest 가져와서 읽는 처리(이미지 캐싱)
precacheAndRoute(self.__WB_MANIFEST);

// --------------------------
// HTML 오프라인 대응
// --------------------------
// 첫 번째 파라미터: 검증용 파라미터(콜백), 두 번쨰 파라미터: 성공했을 떄 실행시킬 콜백(객체)
// 추가 처리를 위해서는 request.mode가 get,post인지 등 등록하면 된다.
// post, put, delete는 따로 제거해두는게 좋다. (DB를 직접적으로 수정하는 작업이기 때문)
registerRoute(
  ({request}) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: `${PREFIX}-html-cache`,
    // 통신이 끊기면(3초 후) 캐싱된걸 보여줌, 유저입장에선 느리다고 생각될 수도 있음
    networkTimeoutSeconds: 3
  })
);

// --------------------------
// 이미지 캐싱
// --------------------------
registerRoute(
  // destination: 해당 파일이 어떤 파일인지 알아내는 속성값
  ({request}) => request.destination === 'image',
  // 현업에서 사진 한장의 크기 크게 어림잡아 0.5MB -> 너무 클거같으면 caching이용X
  new CacheFirst({
    cacheName: `${PREFIX}-image-cache`,
    // 3초까지 못받아오면 네트워크와 통신하여 보여줌
    networkTimeoutSeconds: 3
  })
);

// --------------------------
// API 요청 캐싱(최소 동작 보장, GET을 제외한 나머지는 제외)
// --------------------------
registerRoute(
  // origin: 요청이 왔을 때, 도메인만 확인하는 속성값
  ({request, url}) => url.origin === import.meta.env.VITE_SERVER_URL && request.method === 'GET',
  new StaleWhileRevalidate({
    cacheName: `${PREFIX}-api-cache`,
    networkTimeoutSeconds: 3
  })
);