module.exports = class Store {
  get(name) {
    return localStorage.getItem(name)
  }
  set(name, val) {
    localStorage.setItem(name, val)
  }
}