import { useState } from 'react';
import {
  AppShell,
  Flex,
  Title,
  Header,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import ConfigForm from './ConfigForm';
import TopBar from './TopBar';
import './Shell.css';

export default function Shell() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={
        <TopBar/>
      }
    >
      <ConfigForm />
    </AppShell>
  );
}
