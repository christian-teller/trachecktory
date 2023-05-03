import React from 'react';
import PropTypes from 'prop-types';
import { Header, Container, Group, Box, Paper, Title, Divider } from '@mantine/core';

function Results(props:any) {
  return (
    <>
      <Group position="left">
        <p>
          <b>Status: </b>{props.responseStatus} <br />
          {props.token}
        </p>
      </Group>
    </>
  );
}

Results.propTypes = {};

export default Results;
