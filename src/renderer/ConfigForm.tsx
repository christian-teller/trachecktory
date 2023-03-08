/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  List,
  MultiSelect,
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
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { CubeSend, LetterX } from 'tabler-icons-react';
import qs from 'qs';
import './App.css';

const axiosApiInstance = axios.create();

export default function ConfigForm() {
  // Request Config Hooks:
  const form = useForm({
    initialValues: {
      serverEndpoint: '/token',
      requestMethod: '',
      grant_type: 'client_credentials',
      token: '',
    },
  });

  // user authentication hooks
  const [client_id, setClientId] = useState('');
  const [client_secret, setClientSecret] = useState('');

  //headers hook
  const [headers, setHeaders] = useState<Object>({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  //key value pair setter hooks
  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('');
  //url hook
  const [apiUrl, setApiUrl] = useState<string>('');
  const [endpoint, setEndpoint] = useState<string>('');

  const api = axios.create({
    baseURL: form.values.server_url,
    headers: { headers },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'clientId') {
      setClientId(value);
      console.log(client_id);
    } else if (name === 'clientSecret') {
      setClientSecret(value);
      console.log(client_secret);
    }
  };

  const handleUrlChange = (e: string) => setApiUrl(e);
  const handleEndpointChange = (e: string) => setEndpoint(e);

  const handleRemoveHeader = (key: string) => {
    const updatedHeaders = { ...headers };
    delete updatedHeaders[key];
    setHeaders(updatedHeaders);
    console.log(headers);
  };

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
                name="clientId"
                size="xs"
                label="Client ID:"
                placeholder="Client ID"
                // {...form.getInputProps('client_id')}
                value={client_id}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <TextInput
                name="clientSecret"
                size="xs"
                label="Client Secret:"
                placeholder="Client Secret"
                value={client_secret}
                onChange={handleChange}
              />
              <Space h="md" />
              <Group grow align="flex-end" position="center">
                <Select
                  label="Server URL:"
                  defaultValue={'https://qa-gimli.ci.apexpickup.com'}
                  data={[
                    {
                      name: 'QA',
                      value: 'https://qa-gimli.ci.apexpickup.com',
                      label: 'qa-gimli.ci.apexpickup.com',
                    },
                    {
                      name: 'UAT',
                      value: 'https://uat-gimli.stg.apexpickup.com',
                      label: 'uat-gimli.stg.apexpickup.com',
                    },
                  ]}
                  onChange={handleUrlChange}
                />
                <MultiSelect
                  label="Action:"
                  placeholder="such as /devices for example"
                  data={[
                    { value: 'rick', label: 'Get Orders', group: 'Orders' },
                    { value: 'morty', label: 'Morty', group: 'Never was a pickle' },
                    { value: 'beth', label: 'Beth', group: 'Never was a pickle' },
                    { value: 'summer', label: 'Summer', group: 'Never was a pickle' },
                  ]}
                />
              </Group>
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
                  variant="gradient"
                  gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                  onClick={() => {
                    const newHeaders = { ...headers };
                    newHeaders[key] = value;
                    setHeaders(newHeaders);
                    setKey('');
                    setValue('');
                    console.log(apiUrl);
                  }}
                >
                  Add Header
                </Button>
              </Group>
              <Box py={20}>
                <Divider
                  my="xs"
                  size="md"
                  label="Applied Headers"
                  labelPosition="center"
                />
                <List className="header-list" size="sm" withPadding>
                  {Object.entries(headers).map(([key, value]) => (
                    <List.Item
                      key={key}
                      sx={{
                        overflowX: 'hidden',
                        wordWrap: 'break-word !improtant',
                        fontSize: '.8em',
                      }}
                    >
                      {`${key}: ${value}`}{' '}
                      <Button
                        variant="gradient"
                        gradient={{ from: 'red', to: 'darkred', deg: 60 }}
                        compact
                        onClick={() => {
                          handleRemoveHeader(key);
                        }}
                        size="xs"
                      >
                        x
                      </Button>
                    </List.Item>
                  ))}
                </List>
              </Box>
            </Box>
          </Grid.Col>
          <Grid.Col sm={12}>
            <Box py={25}>
              <Group grow>
                <ActionIcon
                  variant="gradient"
                  gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                  p={20}
                  type="submit"
                  className="send-btn"
                >
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
