/**
 * @file app/repositories/pushSubscription.repository.js
 * @description pushSubscription Repository
 * 251208 v1.0.0 wook init
 */

import db from '../models/index.js';
const { PushSubscription } = db;

async function upsert(t = null, data) {
  return await PushSubscription.upsert(data, {transaction: t});
}

async function findByUserId(t = null, userId) {
  // 평문 SELECT * FROM push_subscription WHERE userId= ? AND deleted_at IS NULL
  return await PushSubscription.findAll(
    {
      where: {
        userId: userId
      }
    },
    {
      transaction: t
    }
  )
}

async function hardDestroy(t = null, id) {
  return await PushSubscription.destroy({
    where: {id: id},
    force: true,
    transaction: t,
  });
}

export default {
  upsert,
  findByUserId,
  hardDestroy,
}