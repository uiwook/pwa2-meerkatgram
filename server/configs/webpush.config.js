/**
 * @file configs/webpush.config.type.js
 * @description webpush 초기설정값 설정
 * 251208 v1.0.0 wook init
 */

import webpush from 'web-push';

// '순서대로' 셋팅하는것이 중요!
webpush.setVapidDetails(
  `mailto:${process.env.JWT_ISSUER}`,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);

export default webpush;
