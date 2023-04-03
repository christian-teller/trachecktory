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
      // navbar={
      //   <Navbar
      //     sx={{
      //       backgroundColor: '#2C3333 !important',
      //     }}
      //     p="md"
      //     hiddenBreakpoint="sm"
      //     hidden={!opened}
      //     width={{ sm: 200, lg: 300 }}
      //   >
      //     <LeftNav />
      //   </Navbar>
      // }
      //= ===================================================
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       <Text>Application sidebar</Text>
      //     </Aside>
      //   </MediaQuery>
      // }
      // footer={
      //   <Footer height={60} p="md">
      //     Application footer
      //   </Footer>
      // }
      header={
        <TopBar/>
      }
    >
      <ConfigForm />
    </AppShell>
  );
}
