const fp = require("lodash/fp");
const { Container, Maybe } = require("./support.js");

////1
let maybe = Maybe.of([5, 6, 1]);
console.log(maybe);
let ex1 = value => {
  return fp.map(fp.add(1), value);
};
console.log(maybe.map(ex1));

/////2
let xs = Container.of(["do", "ray"]);
let ex2 = value => {
  return fp.first(value);
};
console.log(xs.map(ex2));

//3
let safeProp = fp.curry(function(x, o) {
  return Maybe.of(o[x]);
});
let user = { id: 2, name: "ABC" };
let ex3 = () => {
  return fp.first(safeProp("name")(user));
};
console.log(ex3());

//4
let ex4 = function(n) {
  return Maybe.of(n).map(parseInt);
};
console.log(ex4("3"));
