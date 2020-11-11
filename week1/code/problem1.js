let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("hello");
  }, 10);
});
promise
  .then(a =>
    setTimeout(() => {
      return a + "lagou";
    }, 10)
  )
  .then(
    b =>
      setTimeout(() => {
        return b + "I Love U";
      }),
    10
  )
  .then(c =>
    setTimeout(() => {
      console.log(c);
    }, 10)
  );


  const obj2 = {
    foo: function() {
      const bar =
    }
  }