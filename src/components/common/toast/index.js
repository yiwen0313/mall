import Toast from "./Toast";

const obj = {}

obj.install = function (Vue) {
  // 1.常见组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 2.new的方式，根据组件构造器，创建出一个组件对象
  const toast = new toastConstructor()

  // 3.将组件对象手动挂载到某一元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
