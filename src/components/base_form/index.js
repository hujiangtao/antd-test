import React from 'react';
import { Form, Select, Button, DatePicker, Input, Checkbox } from 'antd';
import utils from '../../utils/utils';
import './baseform.less';

const FormItem = Form.Item;
// const Option = Select.Option;

class BaseFilterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];

        if (formList && formList.length > 0) {
            formList.forEach((item, i) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;

                switch (item.type) {
                    case '时间查询':
                        const begin_time = <FormItem label="时间查询" key={`${field}-start`}>
                            {
                                getFieldDecorator('begin_time')(
                                    <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                                )
                            }
                        </FormItem>;
                        formItemList.push(begin_time);

                        const end_time = <FormItem label="~" colon={false} key={`${field}-end`}>
                            {
                                getFieldDecorator('end_time')(
                                    <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                                )
                            }
                        </FormItem>;
                        formItemList.push(end_time);
                        break;

                    case 'INPUT':
                        const INPUT = <FormItem label={label} key={field}>
                            {
                                getFieldDecorator(field, { initialValue: initialValue })(
                                    <Input type="text" placeholder={placeholder} />
                                )
                            }
                        </FormItem>;
                        formItemList.push(INPUT);
                        break;

                    case 'SELECT':
                        const SELECT = <FormItem label={label} key={field}>
                            {
                                getFieldDecorator(field, { initialValue: initialValue })(
                                    <Select placeholder={placeholder} key={`${field}-select`}>
                                        {utils.getOptionList(item.list)}
                                    </Select>
                                )
                            }
                        </FormItem>;
                        formItemList.push(SELECT);
                        break;

                        case 'CHECKBOX':
                            const CHECKBOX = <FormItem  label={label} key={field}>
                                {
                                    getFieldDecorator(field, { valuePropName: 'checked', initialValue: initialValue })(
                                        <Checkbox>{label}</Checkbox>
                                    )
                                }
                            </FormItem>;
                            formItemList.push(CHECKBOX);
                            break;

                    default:
                        break;
                }
            });
        }

        return formItemList;
    }

    handleFilterSubmit = () => {
        let fieldsValues = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValues);
    }

    reset = () => {
        this.props.form.resetFields();
    }

    render() {
        return (
            <Form layout="inline" className="base_form">
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" onClick={this.handleFilterSubmit} className="btn_search">查询</Button>
                    <Button onClick={this.reset} className="btn_reset">重置</Button>
                </FormItem>
            </Form>
        );
    }
}

BaseFilterForm = Form.create({})(BaseFilterForm);

export { BaseFilterForm };