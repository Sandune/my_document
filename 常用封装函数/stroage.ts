/**
 * 2019 2-14
 * author sandune
 *
 * @param storageName key
 * @param storageValue value
 */

type ErrorHandler = (err: Error) => void;
type SuccessHandler = (res: any) => any;

interface Callback {success?: SuccessHandler | undefined ; fail?: ErrorHandler | undefined ; }

// manage storaxge
export function setStorage(storageName: string, storageValue, resolve?: Callback) {

      if (window.localStorage) {
          if (typeof storageValue !== 'string') {
              storageValue = JSON.stringify(storageValue);
          }
          localStorage.setItem(storageName, storageValue);
          if (resolve && resolve.success) { resolve.success('success'); }
      } else {
        if (resolve && resolve.fail ) { resolve.fail(Error('This browser does NOT support localStorage')); }
        alert('This browser does NOT support localStorage');
      }
  }

  /**
   *
   * @param storageName key
   */

export function getStorage(storageName: string, resolve?: Callback) {
      const result = localStorage.getItem(storageName);
      if (result) {
        if (resolve && resolve.success) { resolve.success(result); }
        return result;
      } else {
        if (resolve && resolve.fail) { resolve.fail(Error('not found key')); }
        return '';
      }
  }
