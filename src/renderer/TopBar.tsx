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
  return (
    <>
      <Header className="title-bar drag" height={{ base: 60, md: 60 }}>
        {/* <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
        />
      </MediaQuery> */}
        <Container
          className="contain"
          sx={{
            width: '100%',
          }}
        >
          <Grid align="center">
            <Grid.Col span={6}>
              <Group>
                <Title className="nonselectable" order={3}>
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
                <ActionIcon className="btn-top no-drag" variant="transparent">
                  <Minus />
                </ActionIcon>
                <ActionIcon className="btn-top no-drag" variant="transparent">
                  <Maximize />
                </ActionIcon>
                <ActionIcon
                  id="closeBtn"
                  className="btn-top no-drag"
                  variant="transparent"
                >
                  <X />
                </ActionIcon>
              </Group>
            </Grid.Col>
          </Grid>
        </Container>
      </Header>
    </>
  );
}
