import Vue from 'vue';
// // 设置默认溢出显示数量
// var spillDataNum = 20;

// // 设置隐藏函数
// var timeout = false;
// let setRowDisableNone = function (topNum, showRowNum, binding) {
//   if (timeout) {
//     clearTimeout(timeout);
//   }
//   timeout = setTimeout(() => {
//     binding.value.call(null, topNum, topNum + showRowNum + spillDataNum);
//   });
// };
let flag;
Vue.directive('loadmore', {
    componentUpdated: function (el, binding, vnode, oldVnode) {
        setTimeout(() => {
            // 设置默认溢出显示数量
            const spillDataNum = 5;

            // 设置隐藏函数
            let timeout = false;
            const setRowDisableNone = function (topNum, showRowNum, binding) {
                if (timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(() => {
                    binding.value.call(null, topNum, topNum + showRowNum + spillDataNum);
                });
            };

            function listenScroll() {
                let topPx = this.scrollTop - spillDataNum * rowHeight;
                let topNum = Math.round(topPx / rowHeight);
                const minTopNum = dataSize - spillDataNum - showRowNum;
                if (topNum > minTopNum) {
                    topNum = minTopNum;
                }
                if (topNum < 0) {
                    topNum = 0;
                    topPx = 0;
                }
                if (flag) {
                    selectTbody.setAttribute('style', `transform: translateY(${topPx}px)`);
                    if (fixedTbody) {
                        fixedTbody.setAttribute('style', `transform: translateY(${topPx}px)`);
                    }
                    if (fixedTbodyRight) {
                        fixedTbodyRight.setAttribute('style', `transform: translateY(${topPx}px)`);
                    }
                } else {
                    selectTbody.setAttribute('style', `transform: none`);
                    if (fixedTbody) {
                        fixedTbody.setAttribute('style', `transform: none`);
                    }
                    if (fixedTbodyRight) {
                        fixedTbodyRight.setAttribute('style', `transform: none`);
                    }
                }
                createElementTR.setAttribute('style', `height: ${createElementTRHeight - topPx > 0 ? createElementTRHeight - topPx : 0}px;`);
                createElementTR1.setAttribute('style', `height: ${createElementTRHeight - topPx > 0 ? createElementTRHeight - topPx : 0}px;`);
                setRowDisableNone(topNum, showRowNum, binding);
            };
            const dataSize = vnode.data.attrs['data-size'];
            const oldDataSize = oldVnode.data.attrs['data-size'];
            console.log(dataSize, oldDataSize)
            if (dataSize === oldDataSize) {
                return;
            }
            const selectWrap = el.querySelector('.el-table__body-wrapper');
            const selectTbody = selectWrap.querySelector('table tbody');
            const selectRow = selectWrap.querySelector('table tr');
            let fixedRight = null;
            let fixedWrap = null;
            let fixedTbody = null;
            let fixedTbodyRight = null;
            if (el.querySelector('.el-table__fixed-right')) {
                fixedRight = el.querySelector('.el-table__fixed-right');
                fixedWrap = fixedRight.querySelector('.el-table__fixed-body-wrapper');
                fixedTbody = fixedWrap.querySelector('table tbody');
            }
            if (el.querySelector('.el-table__fixed')) {
                const fixedRight = el.querySelector('.el-table__fixed');
                const fixedWrap = fixedRight.querySelector('.el-table__fixed-body-wrapper');
                fixedTbodyRight = fixedWrap.querySelector('table tbody');
            }
            console.log('selectWrap', selectWrap)
            console.log('selectTbody', selectTbody)
            console.log('selectRow', selectRow)
            if (!selectRow) {
                return;
            }
            const rowHeight = selectRow.clientHeight;
            const showRowNum = Math.round(selectWrap.clientHeight / rowHeight);
            const createElementTR = document.createElement('tr');
            const createElementTR1 = document.createElement('tr');
            const createElementTR2 = document.createElement('tr');
            console.log(showRowNum,  spillDataNum, rowHeight)
            const createElementTRHeight = (dataSize - showRowNum - spillDataNum) * rowHeight;
            createElementTR.setAttribute('style', `height: ${createElementTRHeight}px;`);
            createElementTR.setAttribute('id', `selectWrap`);
            createElementTR1.setAttribute('style', `height: ${createElementTRHeight}px;`);
            createElementTR1.setAttribute('id', `fixedWrap`);
            createElementTR2.setAttribute('style', `height: ${createElementTRHeight}px;`);
            createElementTR2.setAttribute('id', `fixedWrap2`);
            selectWrap.scrollTop = 0; // 滚动条重置回顶部
            if (fixedWrap) {
                fixedWrap.scrollTop = 0; // 滚动条重置回顶部
            }
            if (+dataSize >= 200) {
                flag = true;
                selectTbody.append(createElementTR);
                if (fixedTbody) {
                    fixedTbody.append(createElementTR1);
                }
                if (fixedTbodyRight) {
                    fixedTbodyRight.append(createElementTR2);
                }
                selectWrap.addEventListener('scroll', listenScroll);
            } else {
                flag = false;
                if (el.querySelector('#selectWrap')) {
                    el.querySelector('#selectWrap').parentNode.removeChild(el.querySelector('#selectWrap'));
                }
                if (el.querySelector('#fixedWrap')) {
                    el.querySelector('#fixedWrap').parentNode.removeChild(el.querySelector('#fixedWrap'));
                }
                if (el.querySelector('#fixedWrap2')) {
                    el.querySelector('#fixedWrap2').parentNode.removeChild(el.querySelector('#fixedWrap2'));
                }
                selectWrap.removeEventListener('scroll', listenScroll);
            }
        });
        // setTimeout(() => {
        //   const dataSize = vnode.data.attrs['data-size'];
        //   const oldDataSize = oldVnode.data.attrs['data-size'];
        //   if(dataSize === oldDataSize){
        //     return;
        //   }
        //   const selectWrap = el.querySelector('.el-table__body-wrapper');
        //   const selectTbody = selectWrap.querySelector('table tbody');
        //   const selectRow = selectWrap.querySelector('table tr');
        //   if (!selectRow) {
        //     return;
        //   }
        //   const rowHeight = selectRow.clientHeight;
        //   let showRowNum = Math.round(selectWrap.clientHeight / rowHeight);
    
        //   const createElementTR = document.createElement('tr');
        //   let createElementTRHeight = (dataSize - showRowNum - spillDataNum) * rowHeight;
        //   createElementTR.setAttribute('style', `height: ${createElementTRHeight}px;`);
        //   selectTbody.append(createElementTR);
    
        //   // 监听滚动后事件
        //   selectWrap.addEventListener('scroll', function () {
        //     let topPx = this.scrollTop - spillDataNum * rowHeight;
        //     let topNum = Math.round(topPx / rowHeight);
        //     let minTopNum = dataSize - spillDataNum - showRowNum;
        //     if (topNum > minTopNum) {
        //       topNum = minTopNum;
        //     }
        //     if (topNum < 0) {
        //       topNum = 0;
        //       topPx = 0;
        //     }
        //     selectTbody.setAttribute('style', `transform: translateY(${topPx}px)`);
        //     createElementTR.setAttribute('style', `height: ${createElementTRHeight-topPx > 0 ? createElementTRHeight-topPx : 0}px;`);
        //     setRowDisableNone(topNum, showRowNum, binding);
        //   })
        // });
    }
})