import { store } from './Store'

import getData from './getData'

// 该模块的方法只读state

// 从卡炉内取出一张炼好的卡：
// 1. 检查取出的卡片与换卡箱、保险箱的卡片加起来是否集齐了一套主题
//    1.1 如是，更新集卡册，并把已集成的套卡卡片从换卡箱、保险箱移除
//    1.2 如否，将卡片更新到换卡箱卡片列表
// 2. 更新炼炉槽位，如有排队中的卡牌，选择排在最前的开始炼制
// 3. 根据1的不同情况，增加不同的金币
// 4. 根据1的不同情况，增加不同的经验值，如果经验值够了人物会升级
//    4.1 如升级，根据不同的等级给予不同的（解锁炉子、换卡（保险）箱卡位上限、魔力）奖励
export function getCardFromStoveSlot(stoveSlotIndex) {
    // const state = store.getState()
    // store.dispatch({
    //     type: 'setUserName',
    //     name: 'Lynn'
    // })
}

export function setName() {
    // const state = store.getState()
    store.dispatch({
        type: 'setUserName',
        name: 'Lynn'
    })
}

export function addExp() {
    // const state = store.getState()
    store.dispatch({
        type: 'addExp',
        exp: 100
    })
}

export function updateBagListWithATheme() {
    // const state = store.getState()
    // let cards = getData.getCardsByThemeId()
    let cardList = []
    for (let i = 29; i <= 49; i++){
        if (i === 34) continue;
        cardList.push(i.toString())
    }
    store.dispatch({
        type: 'bag_list/updateCard',
        cardList
    })
}

// function _checkThemeCol(toAddCardIds) {
// }