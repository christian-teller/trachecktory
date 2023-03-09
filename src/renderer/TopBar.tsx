import React from 'react';
import { Header, Title, Group, ActionIcon } from '@mantine/core';
import { Maximize, Minus, X } from 'tabler-icons-react';
import './App.css';
import './Shell.css';

export default function TopBar() {
  return (
    <>
      <Header className="title-bar drag" height={{ base: 50, md: 70 }}>
        {/* <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
        />
      </MediaQuery> */}
          <Title ml={14} className="nonselectable no-drag" order={3}>
            TRACHECKTORY
          </Title>
          <Group mr={14} className="no-drag btn-top-grp">
            <ActionIcon className='btn-top' variant="transparent">
              <Minus />
            </ActionIcon>
            <ActionIcon className='btn-top' variant="transparent">
              <Maximize/>
            </ActionIcon>
            <ActionIcon id='closeBtn' className='btn-top' variant="transparent">
              <X />
            </ActionIcon>
          </Group>
      </Header>
    </>
  );
}
