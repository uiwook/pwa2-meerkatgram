import webpush from 'web-push';

// key값 생성(한번 생성 후 다시 생성할 필요 X)
const keys = webpush.generateVAPIDKeys();

console.log(JSON.stringify(keys, null, 2));