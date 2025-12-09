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
  new StaleWhileRevalidate({
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

// --------------------------
// 웹푸시 핸들러
// --------------------------
self.addEventListener('push', e => {
  const data = e.data.json();
  
  self.registration.showNotification(
    data.title,
    {
      body: data.message,
      icon: '/icons/meerkat_32.png',
      data: {
        targetUrl: data.data.targetUrl
      }
    }
  );
});

// --------------------------
// 웹푸시 클릭 이벤트
// --------------------------
self.addEventListener('notificationclick', e => {
  e.notification.close(); // 푸시 알림 창 닫기

  // payload에서 백앤드가 전달해 준 전체 URL 추출(위 addEvent 'push'의 값 모두 가져옴)
  const openUrl = e.notification.data.targetUrl;
  // Origin 획득
  const origin = self.location.origin; // 현재 우리 도메인 주소 획득
  
  e.waitUntil(
    // clients의 구조
    // [
    //  WindowClient: 브라우저에 열려있는 탭 하나의 정보가 담겨있다.
    //  우리 사이트가 맞는지 확인하기 위해 루프 돌리는 처리
    //   WindowClient = {
    //     focused: false,
    //     frameType: "top-level",
    //     id: "f6e4c645-16ba-4ebe-9600-443b91141742",
    //     type: "window",
    //     url: "http://localhost:3000/posts",
    //     visibilityState: "visible"
    //   },
    //   // ...
    // ]
    // 현재 선택되지 않은 탭이더라도 모두 가져오는 처리
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
    .then(clients => {
      // 앱에서 루트 도메인 탭이 있는지 확인    // client: 위 client의 구조 참조
      const myClient = clients.find(client => client.url.startsWith(origin));

      // 재활용할 탭이 있다면 포커스 및 네비게이트처리
      if(myClient) {
        myClient.focus();
        return myClient.navigate(openUrl);
      }

      // 재활용할 탭이 없다면 새창으로 열기
      if(self.clients.openWindow) {
        return self.clients.openWindow(openUrl);
      }
    })
  );

});