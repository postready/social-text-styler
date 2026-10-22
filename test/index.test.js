import test from 'node:test';
import assert from 'node:assert/strict';
import { styleText, AVAILABLE_STYLES, STYLES } from '../src/index.js';

test('AVAILABLE_STYLES includes standard styles', () => {
  assert.ok(AVAILABLE_STYLES.includes('bold'));
  assert.ok(AVAILABLE_STYLES.includes('italic'));
  assert.ok(AVAILABLE_STYLES.includes('monospace'));
  assert.ok(AVAILABLE_STYLES.includes('bubble'));
  assert.ok(AVAILABLE_STYLES.includes('strikethrough'));
  assert.ok(AVAILABLE_STYLES.includes('underline'));
});

test('styleText converts alphanumeric to unicode bold', () => {
  const result = styleText('Hello 123', 'bold');
  assert.notEqual(result, 'Hello 123');
  assert.equal(result.includes('123'), false);
});

test('styleText converts to italic and monospace', () => {
  const italic = styleText('Test', 'italic');
  const mono = styleText('Code 42', 'monospace');
  assert.ok(italic.length > 0);
  assert.ok(mono.length > 0);
});

test('styleText preserves URLs when preserveUrls=true', () => {
  const input = 'Check out https://postready.org now!';
  const styled = styleText(input, 'bold', { preserveUrls: true });
  assert.ok(styled.includes('https://postready.org'));
  assert.ok(!styled.includes('Check out'));
});

test('styleText throws on unknown style', () => {
  assert.throws(() => {
    styleText('Hello', 'nonexistent_style');
  }, /Unknown style/);
});

test('styleText handles empty string', () => {
  assert.equal(styleText('', 'bold'), '');
});
