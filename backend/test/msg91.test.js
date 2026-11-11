import test from 'node:test';
import assert from 'node:assert/strict';
import { createMsg91Verifier, normalizeIndiaMobile } from '../src/msg91.js';

const token = 'a'.repeat(50);
test('normalizes Indian phone numbers', () => {
  assert.equal(normalizeIndiaMobile('9876543210'), '919876543210');
  assert.equal(normalizeIndiaMobile('+91 9876543210'), '919876543210');
  assert.equal(normalizeIndiaMobile('442012345678'), null);
});
test('valid verified phone matches the lead, using the server AuthKey only', async () => {
  const verifier = createMsg91Verifier({
    authKey: 'secret',
    fetchImpl: async (url, options) => {
      assert.equal(url, 'https://control.msg91.com/api/v5/widget/verifyAccessToken');
      assert.equal(options.headers.authkey, 'secret');
      assert.deepEqual(JSON.parse(options.body), { 'access-token': token });
      return { ok: true, json: async () => ({ type: 'success', message: '919876543210' }) };
    },
  });
  assert.equal(await verifier(token, '+91 9876543210'), true);
  assert.equal(await verifier(token, '+919999999999'), false);
});
test('MSG91 failure body and missing identifier fail closed', async () => {
  const verifier = createMsg91Verifier({ authKey: 'secret', fetchImpl: async () => ({ ok: true, json: async () => ({ type: 'error', message: '919876543210' }) }) });
  assert.equal(await verifier(token, '9876543210'), false);
  assert.equal(await verifier('short', '9876543210'), false);
});
