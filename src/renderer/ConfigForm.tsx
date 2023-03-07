/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  List,
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
import { CubeSend } from 'tabler-icons-react';
import qs from 'qs';
import './App.css';

const axiosApiInstance = axios.create();

export default function ConfigForm() {
  // Request Config Hooks:
  const form = useForm({
    initialValues: {
      client_id: '',
      client_secret: '',
      server_url: '',
      serverEndpoint: '/token',
      requestMethod: '',
      grant_type: 'client_credentials',
      token: '',
    },
  });
  const [headers, setHeaders] = useState<Object>({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const api = axios.create({
    baseURL: form.values.server_url,
    headers: { headers },
  });

  const handleSubmit = () => {
    console.log('idk lol');
  };

  const grabToken = (e: any) => {
    e.preventDefault();
    console.log(form.values);
    console.log(e);
    //GET TOKEN
    axios
      .post(
        form.values.server_url + form.values.serverEndpoint,
        qs.stringify({
          client_id: form.values.client_id.toString(),
          client_secret: form.values.client_secret.toString(),
        }),
        { headers }
      )
      .then(function (response: any) {
        console.log(response.status);
        console.log(response.data.access_token);
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
          </Grid.Col>
          <Grid.Col p={20} sm={7}>
            <Title align="center" order={4}>
              Headers
            </Title>
            <Divider size="md" my="xs" labelPosition="center" />
            <Box className="headers">
              <Group grow align="flex-end" position="center">
                <TextInput
                  label="KEY"
                  placeholder="KEY"
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                />
                <TextInput
                  label="VALUE"
                  placeholder="VALUE"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <Button
                  onClick={() => {
                    const newHeaders = { ...headers };
                    newHeaders[key] = value;
                    setHeaders(newHeaders);
                    setKey('');
                    setValue('');
                    console.log(headers);
                    console.log(newHeaders);
                  }}
                >
                  Add Header
                </Button>
              </Group>
              <Box py={20}>
                <Divider
                  my="xs"
                  size="md"
                  label="Added Headers"
                  labelPosition="center"
                />
                <List className="header-list" size="sm" withPadding>
                  {Object.entries(headers).map(([key, value]) => (
                    <List.Item key={key}>
                      {key} : {value}
                    </List.Item>
                  ))}
                </List>
              </Box>
            </Box>
          </Grid.Col>
          <Grid.Col sm={12}>
            <Box py={25}>
              <Group grow>
                <ActionIcon p={20} type="submit" className="send-btn">
                  <Title order={3}>SEND</Title>
                  <CubeSend size={60} strokeWidth={1} color="black" />
                </ActionIcon>
              </Group>
            </Box>
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  );
}
