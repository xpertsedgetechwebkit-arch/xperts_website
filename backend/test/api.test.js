import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createApp } from '../src/app.js';

const payload = () => ({
  leadId: randomUUID(), formType: 'free_demo', name: 'Test Student',
  email: 'student@example.com', phone: '+919876543210',
  course: 'Playwright Automation', message: 'Call me back', attribution: { utm_source: 'google' },
});
async function withServer(options, fn) {
  const received = [];
  const app = createApp({
    insertLead: async value => { received.push(value); return { created: true }; },
    checkDatabase: async () => {},
    allowedOrigins: ['http://localhost:3000'],
    rateLimitMax: 30,
    ...options,
  });
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  try { await fn(url, received); }
  finally { await new Promise((resolve, reject) => server.close(err => err ? reject(err) : resolve())); }
}
const post = (url, data, origin = 'http://localhost:3000') => fetch(`${url}/api/leads`, {
  method: 'POST', headers: { 'content-type': 'application/json', Origin: origin },
  body: JSON.stringify(data),
});

test('creates valid lead once and keeps expected fields', async () => {
  await withServer({}, async (url, received) => {
    const data = payload();
    const response = await post(url, data);
    assert.equal(response.status, 201);
    assert.equal((await response.json()).leadId, data.leadId);
    assert.equal(received.length, 1);
    assert.equal(received[0].formType, 'free_demo');
    assert.equal(received[0].attribution.utm_source, 'google');
  });
});

test('rejects invalid email and unexpected payload properties', async () => {
  await withServer({}, async (url, received) => {
    assert.equal((await post(url, { ...payload(), email: 'wrong' })).status, 400);
    assert.equal((await post(url, { ...payload(), lead_status: 'converted' })).status, 400);
    assert.equal(received.length, 0);
  });
});

test('rejects requests from unapproved browser origins', async () => {
  await withServer({}, async (url, received) => {
    assert.equal((await post(url, payload(), 'https://malicious.example')).status, 403);
    assert.equal(received.length, 0);
  });
});

test('honeypot submissions do not hit database', async () => {
  await withServer({}, async (url, received) => {
    assert.equal((await post(url, { ...payload(), website: 'buy-now.com' })).status, 202);
    assert.equal(received.length, 0);
  });
});

test('database outage produces a generic 503 without secret details', async () => {
  await withServer({ insertLead: async () => { throw new Error('postgres secret!'); } }, async url => {
    const response = await post(url, payload());
    assert.equal(response.status, 503);
    assert.doesNotMatch(await response.text(), /postgres secret/);
  });
});

test('health endpoint available; private data is not enumerable', async () => {
  await withServer({}, async url => {
    assert.equal((await fetch(`${url}/api/health`)).status, 200);
    assert.equal((await fetch(`${url}/api/leads`)).status, 404);
  });
});
