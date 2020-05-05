import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, Col, Divider, Drawer, Form, Icon, Input, Row, Select, Tooltip } from 'antd';
import { API_ENDPOINT } from '../../../constants';
import { ThemeContext } from '../../../colors/theme';

const { Option } = Select;

const UserSettings2 = ({ displayUserModal, form }) => {
  const { location } = useHistory();
  const [theme, setTheme] = useContext(ThemeContext);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [visible, setVisible] = useState(true);

  const [email, setEmail] = useState('Please enter email');
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || '1');
  const [role, setRole] = useState(null);
  const { getFieldDecorator } = form;

  useEffect(() => {
    (async function () {
      // Retrieving independent user information
      let { data } = await axios.get(`${API_ENDPOINT}/userInfo`);
      let avatarIndex = data.avatar.toString();
      setEmail(data.email);
      setAvatar(avatarIndex);
      localStorage.setItem('avatar', avatarIndex);

      // Retrieving user information linked to room
      setLoadingData(false);
      let {
        data: { role },
      } = await axios.get(`${API_ENDPOINT}/userRoomInfo`);
      setRole(role);
    })().catch((err) => {
      console.log(err);
    });
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      displayUserModal(false);
    }, 300);
  };

  const handleSave = async () => {
    setLoadingSave(true);
    await axios.post(`${API_ENDPOINT}/userInfo`, { avatar, role });
    localStorage.setItem('avatar', avatar);
    setTimeout(() => {
      setLoadingSave(false);
      handleClose();
    }, 1000);
  };

  const handleAvatar = (e) => {
    setAvatar(e);
  };

  return (
    <Drawer
      title={
        <Row type='flex'>
          Settings{' '}
          <Icon
            type='loading'
            spin
            style={{
              display: loadingData ? 'block' : 'none',
              color: '#6ca1d8',
              fontSize: '1.4rem',
              marginLeft: '0.7rem',
            }}
          />
        </Row>
      }
      width={360}
      onClose={handleClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80, opacity: loadingData ? 0.5 : 1, pointerEvents: loadingData ? 'none' : 'auto' }}
    >
      <Form layout='vertical' hideRequiredMark>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label='Change Password'>
              {getFieldDecorator('pass', {
                rules: [{ required: true, message: 'Password' }],
              })(<Input placeholder='Please enter password' type='password' disabled />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label='Change Email'>
              <Input placeholder={email} type='password' disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={
                <div>
                  Avatar
                  <Tooltip title='Displays only for comments or chat'>
                    <Icon type='question-circle-o' style={{ padding: '0 0.3rem' }} />
                  </Tooltip>
                </div>
              }
            >
              <Select
                placeholder='Please choose the type'
                optionLabelProp='label'
                defaultValue={avatar || '1'}
                onChange={(e) => handleAvatar(e)}
              >
                <Option value='1' label='Avatar 1'>
                  <img src='/images/avatars/monster1.svg' alt='avatar 1' />
                </Option>
                <Option value='2' label='Avatar 2'>
                  <img src='/images/avatars/monster2.svg' alt='avatar 2' />
                </Option>
                <Option value='3' label='Avatar 3'>
                  <img src='/images/avatars/monster3.svg' alt='avatar 3' />
                </Option>
                <Option value='4' label='Avatar 4'>
                  <img src='/images/avatars/monster4.svg' alt='avatar 4' />
                </Option>
                <Option value='5' label='Avatar 5'>
                  <img src='/images/avatars/monster5.svg' alt='avatar 5' />
                </Option>
                <Option value='6' label='Avatar 6'>
                  <img src='/images/avatars/monster6.svg' alt='avatar 6' />
                </Option>
                <Option value='7' label='Avatar 7'>
                  <img src='/images/avatars/monster7.svg' alt='avatar 7' />
                </Option>
                <Option value='8' label='Avatar 8'>
                  <img src='/images/avatars/monster8.svg' alt='avatar 8' />
                </Option>
                <Option value='9' label='Avatar 9'>
                  <img src='/images/avatars/monster9.svg' alt='avatar 9' />
                </Option>
                <Option value='10' label='Avatar 10'>
                  <img src='/images/avatars/monster10.svg' alt='avatar 10' />
                </Option>
                <Option value='11' label='Avatar 11'>
                  <img src='/images/avatars/monster11.svg' alt='avatar 11' />
                </Option>
                <Option value='12' label='Avatar 12'>
                  <img src='/images/avatars/monster12.svg' alt='avatar 12' />
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Theme'>
              <Select placeholder='Please choose the type' defaultValue={theme.isLightMode ? 'light' : 'dark'}>
                <Option
                  value='light'
                  onClick={() => {
                    localStorage.setItem('theme', 'light');
                    setTheme({ isLightMode: true });
                  }}
                >
                  Light Theme
                </Option>
                <Option
                  value='dark'
                  onClick={() => {
                    localStorage.setItem('theme', 'dark');
                    setTheme({ isLightMode: false });
                  }}
                >
                  Dark Theme
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} style={{ marginBottom: '1rem' }}>
            <Divider>
              Team Specific Settings{' '}
              <Tooltip title='Configure by entering a team'>
                <Icon type='question-circle-o' style={{ padding: '0 0.3rem' }} />
              </Tooltip>
            </Divider>
          </Col>
          <Col span={12}>
            <Form.Item label='Email Alerts'>
              <Select placeholder='All' defaultValue='All' disabled>
                <Option value='all'>All</Option>
                <Option value='some'>Assignments Only</Option>
                <Option value='none'>Off</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Notifications'>
              <Select placeholder='All' defaultValue='All' disabled>
                <Option value='all'>All</Option>
                <Option value='some'>Assignments Only</Option>
                <Option value='none'>Off</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label='Role'>
              <Input
                type='text'
                maxLength={50}
                onChange={(e) => setRole(e.target.value)}
                value={location.pathname === '/team' ? '' : role}
                disabled={location.pathname === '/team'}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={
                <div>
                  Activity Overview
                  <Tooltip title='User logs for currently joined team'>
                    <Icon type='question-circle-o' style={{ padding: '0 0.3rem' }} />
                  </Tooltip>
                </div>
              }
            >
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ],
              })(<Input.TextArea rows={4} disabled />)}
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }}
      >
        <Button onClick={handleClose} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button type='primary' loading={loadingSave} onClick={handleSave}>
          Save
        </Button>
      </div>
    </Drawer>
  );
};

export default Form.create()(UserSettings2);
