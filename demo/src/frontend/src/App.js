import './App.css';
import PropertyDrawerForm from "./PropertyDrawerForm";
import {getAllProperties,deleteProperty} from "./client";
import {useState, useEffect} from 'react';
import {
    Layout,
    Menu,
    Breadcrumb,
    Table,
    Spin,
    Empty,
    Button,
    Badge,
    Tag,
    Avatar,
    Radio, Popconfirm
} from 'antd';

import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';
import {successNotification, errorNotification} from "./notification";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const TheAvatar = ({name}) => {
    let trim = name.trim();
    if (trim.length === 0) {
        return <Avatar icon={UserOutlined}/>
    }
    const split = trim.split(" ");
    if (split.length === 1){
        return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar>{`${name.charAt(0)}${name.charAt(name.length-1)}`}</Avatar>
}

const removeProperty =(propertyId, callback) => {
    deleteProperty(propertyId).then(() => {
        successNotification("Property deleted", `Property ${propertyId} was deleted`)
        callback();
    }).catch(err => {
        err.response.json().then(res => {
            console.log(res);
            errorNotification(
                "There was an issue",
                `${res.message} [${res.status}] [${res.error}]`
            )
        });
        })
}


const columns = fetchProperties => [
    {
        title:'',
        dataIndex: 'avatar',
        key:'avatar',
        render:(text, property)=>
            <TheAvatar name={property.host}/>
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Host',
        dataIndex: 'host',
        key: 'host',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Actions',
        key: 'action',
        render:(text, property) =>
            <Radio.Group>
                <Popconfirm
                    placemet='topRight'
                    title={`Are you sure to delete ${property.address}`}
                    onConfirm={() => removeProperty(property.id, fetchProperties)}
                    okText = 'Yes'
                    cancelText = 'No'>
                    <Radio.Button value="delete">Delete</Radio.Button>
                </Popconfirm>
                <Radio.Button value="edit">Edit</Radio.Button>
            </Radio.Group>
    }
];

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;


function App() {
  const [properties, setProperties] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);


  const fetchProperties = () =>
      getAllProperties()
          .then(res=>res.json())
          .then(data => {
            console.log(data);
            setProperties(data);

          }).catch(err => {
              console.log(err.response)
              err.response.json().then(res => {
                  console.log(res);
                  errorNotification(
                      "There was an issue",
                      `${res.message} [statusCode:${res.status}] [${res.error}]`
                  )
          });
      }).finally(() => setFetching(false))

  useEffect(() => {
    console.log("component is mounted");
    fetchProperties();
  }, []);

  const renderProperties = () => {
      if (fetching){
          return <Spin indicator={antIcon} />
      }
      if (properties.length <= 0){
          return <>
              <Button
                  onClick={() => setShowDrawer(!showDrawer)}
                  type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                  Add New Student
              </Button>
              <PropertyDrawerForm
                  showDrawer={showDrawer}
                  setShowDrawer={setShowDrawer}
                  fetchStudents={fetchProperties()}
              />
              <Empty/>
          </>
      }
      return<>
          <PropertyDrawerForm
              showDrawer={showDrawer}
              setShowDrawer={setShowDrawer}
              fetchProperties={fetchProperties}
          />
        <Table
          dataSource={properties}
          columns={columns(fetchProperties)}
          bordered
          title={()=>
              <>
              <Button
                  onClick={() => setShowDrawer(!showDrawer)}
                  type="primary" shape="round" icon={<PlusOutlined/>} size="small">
              Add New Property
              </Button>
                  <Tag style={{marginLeft:"10px"}}>Number of Properties</Tag>
                  <Badge count={properties.length} className="site-badge-count-4"/>
              </>}
          pagination={{pageSize:50}}
          scroll={{y:240}}
          rowKey={(property) => property.id}
      />
      </>
  }

    return <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined/>}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined/>}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined/>}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}/>
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {renderProperties()}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>By Vivienfay</Footer>
        </Layout>
    </Layout>
}

export default App;