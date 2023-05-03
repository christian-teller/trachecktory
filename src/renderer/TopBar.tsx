import React from 'react';
import {
  Header,
  Title,
  Group,
  ActionIcon,
  Container,
  Grid,
} from '@mantine/core';
import { Maximize, Minus, X } from 'tabler-icons-react';
import './App.css';
import './Shell.css';

export default function TopBar() {

  const closeApp = () => {
    window.prompt('test');
  };

  return (
    <>
      <Header className="title-bar drag" height={{ base: 60, md: 60 }}>
        <Container
          className="contain"
          sx={{
            width: '100%',
          }}
        >
          <Grid align="center">
            <Grid.Col span={6}>
              <Group>
                <Title className="nonselectable logo" order={3}>
                  TRACHECKTORY
                </Title>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group
                align="center"
                position="right"
                className="btn-top-grp"
              >
                <ActionIcon
                  id="closeBtn"
                  className="btn-top no-drag"
                  variant="transparent"
                >
                  <X onClick={closeApp}/>
                </ActionIcon>
              </Group>
            </Grid.Col>
          </Grid>
        </Container>
      </Header>
    </>
  );
}
