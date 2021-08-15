import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {addNewProperty} from "./client";
import {useState} from "react";
import {LoadingOutlined} from "@ant-design/icons";
import {successNotification, errorNotification} from "./notification";


const {Option} = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function PropertyDrawerForm({showDrawer, setShowDrawer, fetchProperties}) {
    const onCLose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);

    const onFinish = property => {
        setSubmitting(true)
        console.log(JSON.stringify(property, null, 2))
        addNewProperty(property)
            .then(() => {
                console.log("Property added")
                onCLose();
                successNotification("Property successfully Added"
                `${property.name} was successfully added`)
                fetchProperties();
            }).catch(err => {
                console.log(err.response)
                err.response.json().then(res => {
                    console.log(res);
                    errorNotification(
                        "There was an issue",
                        `${res.message} [statusCode:${res.status}] [${res.error}]`,
                        "bottomLeft"
                    )
                });
        }).finally(()=>{
            setSubmitting(false);
        })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Create new property"
        width={720}
        onClose={onCLose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{required: true, message: 'Please enter property price'}]}
                    >
                        <Input placeholder="Please enter property price"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[{required: true, message: 'Please enter property address'}]}
                    >
                        <Input placeholder="Please enter property address"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="host"
                        label="Host"
                        rules={[{required: true, message: 'Please enter property host'}]}
                    >
                        <Input placeholder="Please enter property host"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="type"
                        label="Property Type"
                        rules={[{required: true, message: 'Please select a property type'}]}
                    >
                        <Select placeholder="Please select a property type">
                            <Option value="apartment">Apartment</Option>
                            <Option value="townhouse">Townhouse</Option>
                            <Option value="singlefamilyhouse">Single Family House</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting &&  <Spin indicator = {antIcon} />}
            </Row>
        </Form>
    </Drawer>
}

export default PropertyDrawerForm;