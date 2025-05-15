const welcome = {
  sayHello: function () {
    console.log("Welcome to Red and White Skill Education.");
  },
  currTime: new Date().toLocaleDateString(),
  companyName: "Red and White Group Institiues",
  name: "Jinkal Kalathiya",
  age: function () {
    let n = 10;
    if (n >= 18) {
      console.log("You can Vote");
    } else {
      console.log("You can not do Vote");
    }
  },
};
module.exports = welcome;
