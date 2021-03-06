import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Alert, Button, Icon, Input, Row } from 'antd';
import { Redirect } from 'react-router-dom';
import { displaySimpleNotification } from '../utility/services';
import { API_ENDPOINT } from '../constants';
import { joinTeam, retrieveTeams, leaveTeam } from '../utility/restCalls';
import { Container, TeamCard, Subcontainer } from './TeamPageStyles';
import TeamCreationModal from '../components/Team/TeamCreationModal';
import TeamsJoined from '../components/Team/TeamsJoined';
import { ThemeContext } from '../colors/theme';

// Seperate this JS file into seperate components later
export default function Team() {
  let teamsObject = JSON.parse(localStorage.getItem('teams'));

  const [theme] = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [toDashboard, setToDashboard] = useState(false);
  const [teamCreation, setTeamCreation] = useState(false);
  const [teams, setTeams] = useState(teamsObject == null ? [] : teamsObject);
  const [teamJoinError, setTeamJoinError] = useState(false);
  const joinTeamData = useRef({});

  useEffect(() => {
    (async () => {
      const res = await retrieveTeams();
      setTeams(res.data);
      localStorage.setItem('teams', JSON.stringify(res.data));
      setLoading(false);
    })().catch((err) => {
      displaySimpleNotification('Error', 4, 'bottomRight', `Unable to retrieve teams. (${err})`, 'warning', 'red');
    });
  }, []);

  const handleLeaveTeam = async (teamId) => {
    try {
      await leaveTeam(teamId);
      let cachedTeams = JSON.parse(localStorage.getItem('teams'));
      cachedTeams = cachedTeams.filter((item) => {
        return item.id !== teamId;
      });
      localStorage.setItem('teams', JSON.stringify(cachedTeams));
      setTeams(
        teams.filter((item) => {
          return item.id !== teamId;
        })
      );
      displaySimpleNotification('Success', 4, 'bottomRight', 'You have left the team.', 'smile', '#108ee9');
    } catch (err) {
      displaySimpleNotification(
        'Error',
        4,
        'bottomRight',
        `Unable to leave team. If you are the owner, please delete the team through settings. (${err})`,
        'warning',
        'red'
      );
    }
  };

  const handleJoin = async () => {
    const data = {
      roomId: joinTeamData.current.id,
      roomPassword: joinTeamData.current.password,
    };

    if (!data.roomId || !data.roomPassword) {
      setTeamJoinError(true);
      return;
    }

    if (teamJoinError) {
      setTeamJoinError(false);
    }

    try {
      await joinTeam(data);
      localStorage.setItem('currentTeam', JSON.stringify({ id: data.roomId }));
      const res = await retrieveTeams();
      localStorage.setItem('teams', JSON.stringify(res.data));
      setToDashboard(true);
    } catch (err) {
      displaySimpleNotification(
        'Unable to join team',
        4,
        'bottomRight',
        `The team may be private, at max capacity, or your credentials may be invalid (ie. banned from the team, incorrect...). ${err}`,
        'warning',
        '#108ee9'
      );
    }
  };

  const handleTeamCreation = (e) => {
    e.preventDefault();
    setTeamCreation(true);
  };

  const handleEnterTeam = async (e, team) => {
    e.preventDefault();
    localStorage.setItem('currentTeam', JSON.stringify({ id: team.id }));
    try {
      await axios.post(`${API_ENDPOINT}/room/session`, { id: team.id });
    } catch (err) {
      console.log(err);
    }

    setToDashboard(true);
  };

  return toDashboard ? (
    <Redirect push to='/dashboard' />
  ) : (
    <>
      {teamCreation && <TeamCreationModal setTeams={setTeams} setTeamCreation={setTeamCreation} teams={teams} />}
      <Container theme={theme}>
        <Subcontainer>
          <TeamCard
            title='Make a team'
            theme={theme}
            bordered={!theme.isLightMode}
            headStyle={theme.isLightMode ? {} : { border: 'none', color: theme.team.card.titleColor }}
          >
            <p>
              <a href='/' onClick={(e) => handleTeamCreation(e)}>
                Create
              </a>{' '}
              a new team in order to begin managing your project!
            </p>
            <p>In total, you can only be a part of three maximum teams.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Icon
                type='plus-circle'
                style={{ fontSize: '2.5rem', paddingTop: '4rem', color: 'rgb(144, 181, 208)', cursor: 'pointer' }}
                onClick={(e) => handleTeamCreation(e)}
              />
            </div>
          </TeamCard>
          <TeamCard
            title='Join a team'
            theme={theme}
            bordered={!theme.isLightMode}
            headStyle={theme.isLightMode ? {} : { border: 'none', color: theme.team.card.titleColor }}
          >
            <Input
              placeholder='Team ID'
              style={{ marginBottom: '2rem' }}
              allowClear={true}
              onChange={(e) => {
                if (teamJoinError) setTeamJoinError(false);
                joinTeamData.current.id = e.currentTarget.value;
              }}
            />
            <Input.Password
              placeholder='Team Password'
              autoComplete='new-password'
              allowClear={true}
              onChange={(e) => {
                if (teamJoinError) setTeamJoinError(false);
                joinTeamData.current.password = e.currentTarget.value;
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
              {teamJoinError && (
                <Alert
                  message='All fields must be filled in.'
                  type='error'
                  showIcon
                  style={{ margin: '-0.5rem auto 0 0' }}
                />
              )}
              <Button type='primary' onClick={() => handleJoin()}>
                Join
              </Button>
            </div>
          </TeamCard>
        </Subcontainer>
        <div style={{ display: 'flex', width: '100%', flex: '2' }}>
          <TeamCard
            title={
              <Row type='flex'>
                Teams joined
                <Icon
                  type='loading'
                  spin
                  style={{
                    display: loading ? 'block' : 'none',
                    color: '#6ca1d8',
                    fontSize: '1.4rem',
                    marginLeft: '0.7rem',
                  }}
                />
              </Row>
            }
            theme={theme}
            bordered={!theme.isLightMode}
            headStyle={theme.isLightMode ? {} : { border: 'none', color: theme.team.card.titleColor }}
            extra={<p style={{ color: teams.length === 3 ? '#d45f5f' : '#6f6b6b' }}>{teams.length}/3</p>}
          >
            <TeamsJoined teams={teams} handleEnterTeam={handleEnterTeam} handleLeaveTeam={handleLeaveTeam} />
          </TeamCard>
        </div>
      </Container>
    </>
  );
}
