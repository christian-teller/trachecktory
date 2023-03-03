/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import axios from 'axios';
import {
  Select,
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
      server_url: '',
      serverEndpoint: '/token',
      requestMethod: '',
      grant_type: 'client_credentials',
      token: '',
      headers: {},
    },
  });

  let keyValuePairs = {
    key: '',
    value: '',
  };

  let customHeaders = `${keyValuePairs.key} : ${keyValuePairs.value}`;

  const handleKeyValueChange = (e: any) => {
    if (e.target.id === 'new_key') {
      keyValuePairs.key = e.target.value;
      console.log(`new key is currently: ${e.target.value}`);
    }
    if (e.target.id === 'new_value') {
      keyValuePairs.value = e.target.value;
      console.log(`new value is currently: ${e.target.value}`);
    }
  };

  function handleAddHeader() {
    console.log(customHeaders);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form.values);
    console.log(e);
    axios
      .post(
        form.values.server_url + form.values.serverEndpoint,
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
          <Grid.Col className="user-creds" p={20} sm={5}>
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
              <Space h="md" />
              <Select
                label="URL"
                data={[
                  {
                    value: 'https://qa-gimli.ci.apexpickup.com',
                    label: 'qa-gimli.ci.apexpickup.com',
                  },
                  {
                    value: 'https://uat-gimli.stg.apexpickup.com',
                    label: 'uat-gimli.stg.apexpickup.com',
                  },
                ]}
                {...form.getInputProps('server_url')}
              />
            </Box>
            <Space h="lg" />
            <Button type="submit">SET</Button>
          </Grid.Col>
          <Grid.Col p={20} sm={7}>
            <Title align="center" order={4}>
              Headers
            </Title>
            <Divider size="md" my="xs" labelPosition="center" />
            <Box className="headers">
              <Group grow align="flex-end" position="center">
                <TextInput
                  onChange={handleKeyValueChange}
                  id="new_key"
                  name="KEY"
                  mx={0}
                  label="KEY"
                  placeholder="KEY"
                  size="xs"
                />
                <TextInput
                  onChange={handleKeyValueChange}
                  id="new_value"
                  name="VALUE"
                  mx={0}
                  label="VALUE"
                  placeholder="VALUE"
                  size="xs"
                />
                <ActionIcon
                  sx={{
                    maxWidth: '40px',
                  }}
                  size={30}
                  variant="filled"
                  onClick={handleAddHeader}
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
