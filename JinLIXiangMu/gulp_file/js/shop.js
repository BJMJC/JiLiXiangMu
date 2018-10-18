var index_js = (function () {
    // 展示数据的盒子
    var $ul = $('.tbox');

    var shopList = localStorage.shopList || '[]';
    shopList = JSON.parse(shopList);

    return {
        // 初始化函数
        init() {
            this.events();
            this.insertData(shopList);
        },
        insertData(data) {
            var str = ''
            for (var i = 0; i < data.length; i++) {
                var li = `<tr id="${data[i].id}">
                            <td class="box_p1">${data[i].name}</td>
                            <td class="box_p2">${data[i].price}</td>
                            <td><input class="box_input" type='number' value='${data[i].count}' /></td>
                            <td><button class='btn btn-danger del-btn'>删除</button></td>
                            </tr>`
                str += li;
            }
            $ul.html(str);
        },
        addShop(obj) {
            var add = true;
            // 没有商品的时候，获取的是undifinde
            var shopList = localStorage.shopList || '[]';
            shopList = JSON.parse(shopList);
            for (var i = 0; i < shopList.length; i++) {
                if (obj.id == shopList[i].id) {
                    add = false
                    shopList[i].count += obj.count;
                    break;
                }
            }
            if (add) {
                shopList.push(obj);
            }
            localStorage.shopList = JSON.stringify(shopList);
            console.log(localStorage.shopList)
        },
        //  事件函数
        events() {
            var _this = this;
            $ul.on('change', 'input', function () {
                // 获取此tr
                var tr = $(this).closest('tr');
                // 获取文本值(商品更新后的数据)
                var val = $(this).val();
                // 修改对应数据
                shopList[tr.index()].count = val;
                // 存入本地数据库
                localStorage.shopList = JSON.stringify(shopList);

            })
            $ul.on('click', '.del-btn', function () {
                var tr = $(this).closest('tr');
                // 删除数组中对应的数据
                shopList.splice(tr.index(), 1);
                // 存入到本地数据库
                localStorage.shopList = JSON.stringify(shopList);
                // 移出dom元素
                tr.remove()
            })
        }
    }
})()
index_js.init()