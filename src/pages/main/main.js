/**
 * 首页模块
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function (require, exports, module, global) {

    // 页面跳转的全屏轮播图
    const uiSlideStep = bui.slide({
        id: "#uiSlide",
        autopage: false,
        fullscreen: true,
        swipe: false,
        loop: false
    })
    // 初始化数据行为存储
    const bs = bui.store({
        el: `#${module.id}`,
        scope: "cartoons",
        data: {
            // 衣服裤子的关系, 部分衣服关联裤子, 裤子关联衣服
            conection: [{
                body: "images/cartoon/body/body02.png",
                foot: "images/cartoon/foot/foot01.png"
            }, {
                body: "images/cartoon/body/body03.png",
                foot: "images/cartoon/foot/foot05.png"
            }, {
                body: "images/cartoon/body/body12.png",
                foot: "images/cartoon/foot/foot08.png"
            }, {
                body: "images/cartoon/body/body13.png",
                foot: "images/cartoon/foot/foot07.png"
            }, {
                body: "images/cartoon/body/body14.png",
                foot: "images/cartoon/foot/foot06.png"
            }],
            distances: [], // 存储滑动的实例
            active: {
                0: "active-block",
                1: "",
                2: "",
            },
            profile: {
                // 个人形象的存储
                head: {
                    image: "images/cartoon/head/head01.png",
                    index: 0,
                },
                body: {
                    image: "images/cartoon/body/body01.png",
                    index: 0,
                },
                foot: {
                    image: "images/cartoon/foot/foot01.png",
                    index: 0,
                },
                deco: {
                    image: "images/cartoon/deco/deco01.png",
                    index: 0,
                }
            },
            cartoon: {
                active: 0, // 激活的slide, 默认头部
                head: [{
                    image: "images/cartoon/head/head01.png",
                }, {
                    image: "images/cartoon/head/head02.png",
                }, {
                    image: "images/cartoon/head/head03.png",
                }, {
                    image: "images/cartoon/head/head04.png",
                }, {
                    image: "images/cartoon/head/head05.png",
                }, {
                    image: "images/cartoon/head/head06.png",
                }, {
                    image: "images/cartoon/head/head07.png",
                }, {
                    image: "images/cartoon/head/head08.png",
                }, {
                    image: "images/cartoon/head/head09.png",
                }, {
                    image: "images/cartoon/head/head10.png",
                }, {
                    image: "images/cartoon/head/head11.png",
                }, {
                    image: "images/cartoon/head/head12.png",
                }],
                body: [{
                    image: "images/cartoon/body/body01.png",
                }, {
                    image: "images/cartoon/body/body02.png",
                }, {
                    image: "images/cartoon/body/body03.png",
                }, {
                    image: "images/cartoon/body/body04.png",
                }, {
                    image: "images/cartoon/body/body05.png",
                }, {
                    image: "images/cartoon/body/body06.png",
                }, {
                    image: "images/cartoon/body/body07.png",
                }, {
                    image: "images/cartoon/body/body08.png",
                }, {
                    image: "images/cartoon/body/body09.png",
                }, {
                    image: "images/cartoon/body/body10.png",
                }, {
                    image: "images/cartoon/body/body11.png",
                }, {
                    image: "images/cartoon/body/body12.png",
                }, {
                    image: "images/cartoon/body/body13.png",
                }, {
                    image: "images/cartoon/body/body14.png",
                }],
                foot: [{
                    image: "images/cartoon/foot/foot01.png",
                }, {
                    image: "images/cartoon/foot/foot02.png",
                }, {
                    image: "images/cartoon/foot/foot03.png",
                }, {
                    image: "images/cartoon/foot/foot04.png",
                }, {
                    image: "images/cartoon/foot/foot05.png",
                }, {
                    image: "images/cartoon/foot/foot06.png",
                }, {
                    image: "images/cartoon/foot/foot07.png",
                }, {
                    image: "images/cartoon/foot/foot08.png",
                }, {
                    image: "images/cartoon/foot/foot09.png",
                }],
                deco: [{
                    image: "images/cartoon/deco/deco01.png",
                }, {
                    image: "images/cartoon/deco/deco02.png",
                }, {
                    image: "images/cartoon/deco/deco03.png",
                }, {
                    image: "images/cartoon/deco/deco04.png",
                }, {
                    image: "images/cartoon/deco/deco05.png",
                }, {
                    image: "images/cartoon/deco/deco06.png",
                }],
            },
        },
        methods: {
            activeBlock(index) {
                for (let i = 0; i < Object.keys(this.$data.active).length; i++) {
                    this.active[i] = "";
                    this.$data.distances[i].lock();
                }
                // 给激活的滑动图加上样式,区别其它两个
                this.active[index] = "active-block";
                this.$data.distances[index].unlock();
            },
            next() {
                uiSlideStep.next();
            },
            prev() {
                uiSlideStep.prev();
            }
        },
        mounted: function () {
            // 焦点图 js 初始化:
            let that = this;
            const cartoonHead = bui.slide({
                id: "#cartoonHead",
                height: 320,
                autopage: false,
                stopPropagation: false,
                cross: true,
                loop: true,
                data: this.$data.cartoon.head
            }).on("to", function () {
                let index = this.index();
                // bui.store 读取的时候需要使用 this.$data.xxx ,如果使用 this.xxx 读取会导致最终的值不能设置正确.
                let img = that.$data.cartoon.head[index].image;
                // 设置
                that.profile.head.index = index;
                that.profile.head.image = img;

            })

            const cartoonBody = bui.slide({
                id: "#cartoonBody",
                height: 320,
                stopPropagation: false,
                autopage: false,
                cross: true,
                loop: true,
                data: this.$data.cartoon.body
            }).on("to", function () {
                let index = this.index();
                // bui.store 读取的时候需要使用 this.$data.xxx ,如果使用 this.xxx 读取会导致最终的值不能设置正确.
                let img = that.$data.cartoon.body[index].image;
                // 设置
                that.profile.body.image = img;
                that.profile.body.index = index;

                // 检测衣服跟裤子的关系索引
                let item = bui.array.get(that.$data.conection, img, "body");
                let footindex = bui.array.index(that.$data.cartoon.foot, item.foot, "image");

                if (footindex >= 0 && that.$data.active[1] == "active-block") {
                    // 操作裤子的实例, 跳转的时候, 由于loop:true, 这里的索引需要在真实的索引下+1 
                    that.$data.distances[2].to(footindex + 1, "none")
                }

            }).lock();

            const cartoonFoot = bui.slide({
                id: "#cartoonFoot",
                height: 320,
                stopPropagation: false,
                autopage: false,
                cross: true,
                loop: true,
                data: this.$data.cartoon.foot
            }).on("to", function () {
                let index = this.index();
                let img = that.$data.cartoon.foot[index].image;
                that.profile.foot.image = img;
                that.profile.foot.index = index;

                // 检测衣服跟裤子的关系索引
                let item = bui.array.get(that.$data.conection, img, "foot");
                let bodyindex = bui.array.index(that.$data.cartoon.body, item.body, "image");
                if (bodyindex >= 0 && that.$data.active[2] == "active-block") {
                    // 操作衣服的实例, 跳转的时候, 由于loop:true, 这里的索引需要在真实的索引下+1 
                    that.$data.distances[1].to(bodyindex + 1, "none")
                }
            }).lock();

            // const cartoonDeco = bui.slide({
            //     id: "#cartoonDeco",
            //     height: 320,
            //     stopPropagation: false,
            //     autopage: false,
            //     cross: true,
            //     loop: true,
            //     data: this.$data.cartoon.deco
            // }).on("to", function () {
            //     let index = this.index();

            //     that.profile.deco.image = that.$data.cartoon.deco[index].image
            //     that.profile.deco.index = index;
            // }).to(0, "none").lock();

            // 添加实例,跟cartoon.active 的数值对应.
            this.distances.push(cartoonHead, cartoonBody, cartoonFoot);

        }
    })
})