// @ts-check
// BEGIN (write your solution here)
let id = 0; 
function Post(title,body) {
    id++;
    this.id = id,
    this.title = title,
    this.body = body
};

module.exports = Post;
// END