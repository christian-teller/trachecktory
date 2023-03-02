/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import axios from 'axios';
import {
  TextInput,
  Button,
  Space,
  Box,
  Grid,
  Container,
  Title,
  Group,
  Divider,
  ActionIcon,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import qs from 'qs';

export default function ConfigForm() {
  const form = useForm({
    initialValues: {
      client_id: '',
      client_secret: '',
      serverUrl: 'https://qa-gimli.ci.apexpickup.com',
      serverEndpoint: '/token',
      requestMethod: '',
      grant_type: 'client_credentials',
      token: '',
      headers: {},
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form.values);
    console.log(e);
    axios
      .post(
        form.values.serverUrl + form.values.serverEndpoint,
        qs.stringify({
          client_id: form.values.client_id.toString(),
          client_secret: form.values.client_secret.toString(),
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then(function (response: any) {
        console.log(response.status);
        console.log('======================|TOKEN|=====================');
        console.log(response.data.access_token);
        console.log('==================================================');
        response.data.access_token = form.getInputProps('token');
        return response;
      })
      .catch(function (error: any) {
        console.log(error.message);
      });
  };

  return (
    <Container className="contain">
      <form className="auth" onSubmit={handleSubmit}>
        <Grid>
          <Grid.Col className="user-creds" p={20} sm={4}>
            <Title align="center" order={4}>
              Authentication
            </Title>
            <Divider size="md" my="xs" labelPosition="center" />
            <Box>
              <TextInput
                size="xs"
                label="Client ID:"
                placeholder="Client ID"
                {...form.getInputProps('client_id')}
              />
            </Box>
            <Box>
              <TextInput
                size="xs"
                label="Client Secret:"
                placeholder="Client Secret"
                {...form.getInputProps('client_secret')}
              />
            </Box>
            <Space h="lg" />
            <Button type="submit">SET</Button>
          </Grid.Col>
          <Grid.Col p={20} sm={8}>
            <Title align="center" order={4}>
              Headers
            </Title>
            <Divider size="md" my="xs" labelPosition="center" />
            <Box className="headers">
              <Group grow align="flex-end" position="center">
                <TextInput mx={0} label="KEY" placeholder="KEY" size="xs" />
                <TextInput mx={0} label="VALUE" placeholder="VALUE" size="xs" />
                <ActionIcon
                  sx={{
                    '&[data-disabled]': { opacity: 0.4 },
                    '&[data-loading]': { backgroundColor: 'red' },
                    maxWidth: '20px',
                  }}
                  size={30}
                  variant="filled"
                >
                  +
                </ActionIcon>
              </Group>
            </Box>
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  );
}
