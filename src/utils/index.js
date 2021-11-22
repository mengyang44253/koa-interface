const CryptoJS = require("crypto-js");
const { SECRETKEY } = require("../config/secret");

/**
 * 加密函数，加密同一个字符串生成的都不一样
 * @param value
 * @returns {*}
 */
function encrypt(value) {
  return CryptoJS.AES.encrypt(JSON.stringify(value), SECRETKEY).toString();
}

/**
 * 解密函数
 * @param value
 * @returns {any}
 */
function decrypt(value) {
  const data = CryptoJS.AES.decrypt(value, SECRETKEY);
  return JSON.parse(data.toString(CryptoJS.enc.Utf8));
}

/**
 * 一维数组转化为树结构
 * @param arr
 * @returns {*}
 */
function tree(arr) {
  let parents = arr.filter((item) => item.parent_id === null);
  let children = arr.filter((item) => item.parent_id !== null);
  function translator(parents, children) {
    parents.forEach((parent, vv) => {
      children.forEach((child, vvv) => {
        if (child.parent_id === parent.id) {
          let temp = JSON.parse(JSON.stringify(children));
          temp.splice(vvv, 1);
          parent.children
            ? parent.children.push(child)
            : (parent.children = [child]);
          translator([child], temp);
        }
      });
    });
  }
  translator(parents, children);
  return parents;
}

function clearParams(data) {
  let obj = Object.assign({}, data);
  for (let key in obj) {
    if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
}


module.exports = {
  encrypt,
  decrypt,
  tree,
  clearParams,
};
