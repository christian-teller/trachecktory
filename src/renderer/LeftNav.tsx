import { Box, NavLink } from '@mantine/core';
import { IconGauge, IconFingerprint } from '@tabler/icons';
import './LeftNav.css';

export default function LeftNav() {
  return (
    <Box sx={{ width: '100%' }}>
      <NavLink
        label="First parent link"
        icon={<IconGauge size={16} stroke={1.5} />}
        childrenOffset={28}
      >
        <NavLink label="First child link" />
        <NavLink label="Second child link" />
        <NavLink label="Nested parent link" childrenOffset={28}>
          <NavLink label="First child link" />
          <NavLink label="Second child link" />
          <NavLink label="Third child link" />
        </NavLink>
      </NavLink>

      <NavLink
        sx={{
          backgroundColor: 'red !important',
        }}
        active
        variant="filled"
        label="Second parent link"
        icon={<IconFingerprint size={16} stroke={1.5} />}
        childrenOffset={40}
        defaultOpened
      >
        <NavLink label="First child link" />
        <NavLink label="Second child link" />
        <NavLink label="Third child link" />
      </NavLink>
    </Box>
  );
}
