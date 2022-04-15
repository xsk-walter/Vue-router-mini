
// 类图
/**
 * 类名：VueRouter
 * 属性：+options、+data、+routeMap
 * 方法：constructor（options）:VueRouter
 * _install(Vue):void
 * init():void initEvent():void 
 */

var _Vue = null
export default class VueRouter {

    static install(Vue) {
        // 1. 判断当前组件是否被注册
        if (VueRouter.install.installed) return
        VueRouter.install.installed = true
        // 2. 把Vue构造函数记录到全局变量
        _Vue = Vue
        // 3. 把创建Vue实例时候传入的router对象注入到Vue实例上
        // 混入
        _Vue.mixin({
            beforeCreate() {
                if (this.$options.router) {
                    _Vue.prototype.$router = this.$options.router
                    // TODO: this.$options.router: (vue实例化时 传入的router对象) 同上 3
                    this.$options.router.init()
                }
            }
        })
    }

    constructor(options) {
        this.options = options
        this.routeMap = {}
        this.data = _Vue.observable({
            current: '/'
        })
    }

    init() {
        this.createRoutMap()
        this.initComponents(_Vue)
        this.initEvent()
    }

    // 遍历所有的路由规则，以键值对的方式存储到routeMap中
    createRoutMap() {
        this.options.routes.map(route => {
            this.routeMap[route.path] = route.component
        })
    }

    // 注册 router-link \ router-view组件
    initComponents(Vue) {
        Vue.component('router-link', {
            props: {
                to: String
            },
            render(h) {
                return h('a', {
                    attrs: {
                        href: this.to
                    },

                    on: {
                        click: (e) => {
                            // 改变地址栏的地址 参数：数据、 网页标题、 当前网页路径
                            history.pushState({}, '', this.to)
                            // 新的超链接地址 赋值给 当前的路由地址
                            this.$router.data.current = this.to
                            // 阻止
                            e.preventDefault()
                            // this.$router.push(this.to)
                        }
                    }
                }, [this.$slots.default])
            }
            // template: '<a href="to"><slot></slot></a>'
        })

        const self = this
        Vue.component('router-view', {
            
            render(h) {
                // 获取当前组件
                const component = self.routeMap[self.data.current]
                return h(component)
            }
        })
    }

    initEvent() {
        window.addEventListener('popstate', () => {
            this.data.current = location.pathname
        })
    }
}

// export default VueRouter
// compilot 这个插件是真TM的NB