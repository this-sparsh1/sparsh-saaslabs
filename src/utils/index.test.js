import { isValidObject, isValidArray } from './index';

describe('Utility Functions', () => {
  describe('isValidObject', () => {
    it('should return true for valid objects', () => {
      expect(isValidObject({})).toBe(true);
      expect(isValidObject({ key: 'value' })).toBe(true);
    });

    it('should return false for non-objects', () => {
      expect(isValidObject(null)).toBe(false);
      expect(isValidObject([])).toBe(false);
      expect(isValidObject('string')).toBe(false);
      expect(isValidObject(123)).toBe(false);
      expect(isValidObject(undefined)).toBe(false);
    });
  });

  describe('isValidArray', () => {
    it('should return true for valid arrays', () => {
      expect(isValidArray([1, 2, 3])).toBe(true);
      expect(isValidArray(['a', 'b', 'c'])).toBe(true);
    });

    it('should return false for non-arrays or empty arrays', () => {
      expect(isValidArray([])).toBe(false);
      expect(isValidArray({})).toBe(false);
      expect(isValidArray('string')).toBe(false);
      expect(isValidArray(123)).toBe(false);
      expect(isValidArray(null)).toBe(false);
      expect(isValidArray(undefined)).toBe(false);
    });
  });
});