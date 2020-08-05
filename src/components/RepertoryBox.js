import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Button, Tooltip, Modal } from 'antd';
import { SearchOutlined, MoneyCollectOutlined, LoginOutlined, LogoutOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Card from './Card'
import BagCtrl from './BagCtrl'
import BagList from './BagList'
import ChestList from './ChestList'

import getData from '../getData'

import './RepertoryBox.css'

const { TabPane } = Tabs;
const { confirm } = Modal;

function RepertoryBox(props) {

    // 换卡箱内卡片鼠标移入时添加
    function onBagHoverRet(bagCardIndex) {
        return (
            <ul className="repertory_baglist_btn_w">
                <li>
                    <Tooltip title="卖出">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<MoneyCollectOutlined />}
                            onClick={toSellACardFromBag.bind(this, bagCardIndex)}
                        />
                    </Tooltip>
                </li>
                <li>
                    <Tooltip title="查看主题">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<SearchOutlined />}
                        />
                    </Tooltip>
                </li>
                <li>
                    <Tooltip title="移入保险箱">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<LoginOutlined />}
                            onClick={toMoveACardFromBagToChest.bind(this, bagCardIndex)}
                        />
                    </Tooltip>
                </li>
            </ul>
        )
    }

    // 保险内卡片鼠标移入时添加
    function onChestHoverRet(chestCardIndex) {
        return (
            <ul className="repertory_baglist_btn_w">
                <li>
                    <Tooltip title="查看主题">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<SearchOutlined />}
                        />
                    </Tooltip>
                </li>
                <li>
                    <Tooltip title="移入换卡箱">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<LogoutOutlined />}
                            onClick={toMoveACardFromChestToBag.bind(this, chestCardIndex)}
                        />
                    </Tooltip>
                </li>
            </ul>
        )
    }

    // 从换卡箱卖一张卡
    function toSellACardFromBag(bagCardIndex) {
        let cardId = props.bagList[bagCardIndex]
        let cardInfo = getData.getCardById(cardId)
        let themeInfo = getData.getThemeById(cardInfo.theme_id)
        if (cardInfo.price === '10' && themeInfo.type === '0') {
            props.sellACardFromBag(bagCardIndex, cardInfo)
        } else {
            confirm({
                title: '确认要卖出？',
                icon: <ExclamationCircleOutlined />,
                content: <Card
                    showPrice={true}
                    showNameInBigCard={true}
                    id={props.bagList[bagCardIndex]} />,
                onOk() {
                    props.sellACardFromBag(bagCardIndex, cardInfo)
                },
                onCancel() {
                    console.log('已取消');
                },
                okText: '确认',
                cancelText: '取消'
            });
        }
    }

    // 从换卡箱移到保险箱
    function toMoveACardFromBagToChest(bagCardIndex) {
        if (props.chestList.length < props.repStat.chestSlotNum) {
            let cardId = props.bagList[bagCardIndex]
            let cardInfo = getData.getCardById(cardId)
            props.moveACardFromBagToChest(bagCardIndex, cardInfo)
        } else {
            Modal.info({
                title: '保险箱已满',
                content: null,
                onOk() { },
            });
        }
    }

    // 从保险箱移到换卡箱
    function toMoveACardFromChestToBag(chestCardIndex) {
        if (props.bagList.length < props.repStat.bagSlotNum) {
            let cardId = props.chestList[chestCardIndex]
            let cardInfo = getData.getCardById(cardId)
            props.moveACardFromChestToBag(chestCardIndex, cardInfo)
        } else {
            Modal.info({
                title: '换卡箱已满',
                content: null,
                onOk() { },
            });
        }
    }

    return (
        <>
            <div className="repertory_box_w">
                <span className="repertory_box_close_btn" onClick={props.handleClickClose}>关闭</span>
                {/* <Tabs defaultActiveKey="1" onChange={callback}> */}
                <Tabs
                    defaultActiveKey="bag"
                    tabBarStyle={{ marginLeft: '20px', marginBottom: '0', fontWeight: 'bolder' }}>
                    <TabPane tab="换卡箱" key="bag">
                        <div className="repertory_bag_ctrl">
                            <span className="repertory_bag_state">卡位：{props.bagList.length}/{props.repStat.bagSlotNum}</span>
                            <BagCtrl />
                        </div>
                        <div className="repertory_bag_w">
                            <BagList onHoverRet={onBagHoverRet}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="保险箱" key="chest">
                        <div className="repertory_chest_ctrl">
                            <span className="repertory_chest_state">卡位：{props.chestList.length}/{props.repStat.chestSlotNum}</span>
                            <span className="repertory_chest_info">这里是安全区，其他玩家无法换走您存放在此处的卡片</span>
                        </div>
                        <div className="repertory_chest_w">
                            <ChestList onHoverRet={onChestHoverRet}></ChestList>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

RepertoryBox.defaultProps = {
    handleClickClose: () => { },
}

const mapStateToProps = (state) => {
    return {
        exp: state.exp,
        gold: state.gold,
        power: state.power,
        repStat: state.repStat,
        bagList: state.bagList,
        chestList: state.chestList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addACardToBag: () => {
            let cardId = getData.getCardsRandomFromCanGet(1)[0]
            let action = {
                type: 'bag_list/addOneCard',
                cardId
            }
            dispatch(action);
        },
        sellACardFromBag: (bagCardIndex, toSellCardInfo) => {
            // 增加金币
            dispatch({
                type: 'addGold',
                gold: toSellCardInfo.price
            });
            // 从换卡箱移除卡片
            dispatch({
                type: 'bag_list/removeCard',
                index: bagCardIndex
            });
        },
        addGold: (goldToAdd) => {
            // 增加金币
            dispatch({
                type: 'addGold',
                gold: goldToAdd
            });
        },
        updateBagList: (cardList) => {
            // 更新换卡箱列表
            dispatch({
                type: 'bag_list/updateCard',
                cardList
            });
        },
        moveACardFromBagToChest: (bagCardIndex, toMoveCardInfo) => {
            // 从换卡箱移除卡片
            dispatch({
                type: 'bag_list/removeOneCard',
                index: bagCardIndex
            });
            // 往保险箱放入卡片
            dispatch({
                type: 'chest_list/addOneCard',
                cardId: toMoveCardInfo.id
            });
        },
        moveACardFromChestToBag: (chestCardIndex, toMoveCardInfo) => {
            // 从保险箱移除卡片
            dispatch({
                type: 'chest_list/removeOneCard',
                index: chestCardIndex
            });
            // 往换卡箱放入卡片
            dispatch({
                type: 'bag_list/addOneCard',
                cardId: toMoveCardInfo.id
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepertoryBox)