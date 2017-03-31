// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetch } from 'redux/reducers/student';
import { Table, Icon } from 'antd';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        isFetching: state.getIn(['student', 'isFetching']),
        clazzList: state.getIn(['clazz', 'list']),
        list: state.getIn(['student', 'list'])
    }),
    dispatch => bindActionCreators({fetch}, dispatch)
)
export default class Student extends Component {
    static propTypes = {
        list: PropTypes.object,
        clazzList: PropTypes.object,
        isFetching: PropTypes.object,
        fetch: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            hhh: 1
        };
    }
    componentDidMount() {
        this.props.fetch();
    }
    _renderLoading() {
        if (this.props.isFetching) {
            return (
                <p>fetching...</p>
            );
        }
    }
    _renderStudentList() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="#">{text}</a>,
            },
            {
                title: '班级',
                dataIndex: 'clazz',
                key: 'clazz',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, s) => (
                    <span>
                        <a href="#">详情</a>
                        <span className="ant-divider" />
                        <a href="#">删除</a>
                        <span className="ant-divider" />
                        <a href="#" className="ant-dropdown-link">
                        更多 <Icon type="down" />
                        </a>
                    </span>
                )
            }
        ];
        let dataList = [];
        let studentList = this.props.list.toArray();
        let clazzList = this.props.clazzList.toArray();
        studentList.map((t, i) => {
            let clazz = clazzList.find(c => {
                return t.get('clazz') === c.get('_id');
            });
            console.log('====>', clazz);
            let tmp = {
                _id: t.get('_id'),
                name: t.get('name'),
                key: t.get('_id'),
                clazz: clazz ? clazz.get('name') : '未知'
            };
            dataList.push(tmp);
        })
        console.log('dataList xxxx=>', dataList);
        return (
            <Table columns={columns} defaultPageSize={20} pagination={{defaultCurrent: 1, total: 50}} dataSource={dataList} />
        );
    }
    render() {
        return (
            <div id={style.home}>
                <div>
                    <h1>student</h1>
                    <Link to="/student/add">
                        <Icon type="user-add" />
                        <span>添加学生</span>
                    </Link>
                </div>
                { this._renderLoading() }
                { this._renderStudentList() }
            </div>
        );
    }
}