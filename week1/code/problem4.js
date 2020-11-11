const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  status = PENDING;
  value = undefined;
  reason = undefined;
  successCallback = [];
  failCallback = [];

  resolvePromise = (newPromise, x, resolve, reject) => {
    if (newPromise === x) {
      return reject(new TypeError("chain promise"));
    }
    if (x instanceof MyPromise) {
      // promise对象
      x.then(resolve, reject);
    } else {
      // 普通值
    }
  };
  resolve = value => {
    if (this.status !== PENDING) return;
    this.status = FULFILLED;
    this.value = value;
    while (this.successCallback.length) this.successCallback.shift()();
  };
  reject = reason => {
    if (this.status !== PENDING) return;
    this.state = REJECTED;
    this.reason = reason;
    while (this.failCallback.length) this.failCallback.shift()();
  };
  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : value => value;
    failCallback = failCallback
      ? failCallback
      : reason => {
          throw reason;
        };
    let nextPromise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value);
            this.resolvePromise(nextPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason);
            this.resolvePromise(nextPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else {
        this.successCallback.push(() =>
          setTimeout(() => {
            try {
              let x = failCallback(this.reason);
              this.resolvePromise(nextPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        );
        this.failCallback.push(() =>
          setTimeout(() => {
            try {
              let x = failCallback(this.reason);
              this.resolvePromise(nextPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        );
      }
    });
    return nextPromise;
  }
  static all(array) {
    let result = [];
    let index = 0;

    return new MyPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value;
        index++;
        if (index === array.length) {
          resolve(result);
        }
      }
      for (let i = 0; i < array.length; i++) {
        let current = array[i];
        if (current instanceof MyPromise) {
          //promise
          current.then(
            value => addData(i, value),
            reason => {
              reject(reason);
            }
          );
        } else {
          //normal value
          addData(i, array[i]);
        }
      }
    });
  }
}

function p1() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve("p1");
    }, 2000);
  });
}
function p2() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve("p2");
    }, 2000);
  });
}

MyPromise.all(["1", "2", p1(), p2()]);
