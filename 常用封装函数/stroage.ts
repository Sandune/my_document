/**
 * 2019 2-14
 * author sandune
 */

type ErrorHandler = (err: Error) => void;
type SuccessHandler = (res: any) => any;

interface Callback {
  success?: SuccessHandler | undefined ;
  fail?: ErrorHandler | undefined ;
  expired?: ErrorHandler | undefined;
}

/**
 *
 * @param storageName key name
 * @param storageValue value
 * @param resolve callback
 * @param storageHoldTime Hold time : day --- number; if none Permanent storage
 */
// manage storaxge
export function setStorage(storageName: any, storageValue: any, resolve?: Callback, storageHoldTime?: number) {

      if (window.localStorage) {
          if (typeof storageValue !== 'string') {
              storageValue = JSON.stringify(storageValue);
          }
          localStorage.setItem(storageName, storageValue);
          if (storageHoldTime) {
            const holdTime: any = Math.floor(Date.now() / 1000) + (storageHoldTime * 24 * 3600);
            localStorage.setItem(storageName + '_HT', holdTime);
          }
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

      // Determine whether it has expired
      const holdTime: any = localStorage.getItem(storageName + '_HT');

      if ((holdTime && holdTime < Math.floor(Date.now() / 1000)) || holdTime > 10000000000) {
        localStorage.removeItem(storageName);
        localStorage.removeItem(storageName + '_HT');
        if (resolve && resolve.expired) {
          resolve.expired(Error('date is expired!'));
        }
        return '';
      }

      if (result) {
        if (resolve && resolve.success) { resolve.success(result); }
        return result;
      } else {
        if (resolve && resolve.fail) { resolve.fail(Error('not found key')); }
        return '';
      }
  }
