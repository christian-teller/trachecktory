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
  // -----------------------------   HOOKS   --------------------->
  // Request Config Hooks:
  const form = useForm({
    initialValues: {
      serverEndpoint: '/token',
      requestMethod: '',
      grant_type: 'client_credentials',
      token: '',
    },
  });
  // Action type selector hook
  const [actionSelector, setActionSelector] = useState('');

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
  // -------------------------------------------------------------->

  // axios passthrough
  const api = axios.create({
    baseURL: form.values.server_url,
    headers: { headers },
  });

  // -----------------------   HANDLERS   ------------------------->
  // action selected handler and conditional input content
  const handleActionChange = (e: any) => {
    setActionSelector(e);
    console.log(actionSelector);
    console.log(e);
  };

  const conditionalParams = [
    { value: 'create-order', label: 'Create Order', group: 'Orders' },
    { value: 'get-orders', label: 'Get Orders', group: 'Orders' },
    { value: 'get-order-site-id', label: 'Get Order By Site', group: 'Orders' },
    {
      value: 'get-order-schedule-id',
      label: 'Get Order By Schedule',
      group: 'Orders',
    },
    { value: 'get-clients', label: 'Get All Clients', group: 'Clients' },
  ];

  // authentication handler
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'clientId') {
      setClientId(value);
      console.log(client_id);
    } else if (name === 'clientSecret') {
      setClientSecret(value);
      console.log(client_secret);
    }
  };

  // server and endpoint handler
  const handleUrlChange = (e: string) => setApiUrl(e);
  const handleEndpointChange = (e: string) => setEndpoint(e);

  // removing header btn click handler
  const handleRemoveHeader = (key: string) => {
    const updatedHeaders = { ...headers };
    delete updatedHeaders[key];
    setHeaders(updatedHeaders);
    console.log(headers);
  };

  // big submit button click
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
            <Group grow align="flex-end" position="center">
              <Select
                size="xs"
                label="Server URL:"
                defaultValue={'https://qa-gimli.ci.apexpickup.com'}
                data={[
                  {
                    name: 'QA',
                    value: 'https://qa-gimli.ci.apexpickup.com',
                    label: 'QA ',
                  },
                  {
                    name: 'UAT',
                    value: 'https://uat-gimli.stg.apexpickup.com',
                    label: 'UAT',
                  },
                ]}
                onChange={handleUrlChange}
              />
              <Select
                size="xs"
                label="Action:"
                placeholder="Select action"
                data={conditionalParams}
                onChange={handleActionChange}
                value={actionSelector}
              />
            </Group>
            <Space h="xs" />
            <Box>
              {actionSelector === '' && (
                <>
                  <Box>
                <Space h="lg" />
                <Space h="lg" />
                <Space h="lg" />
                  </Box>
                </>
              )}
              {actionSelector === 'get-orders' && (
                <>
                  <h3>get orders</h3>
                  <p>hey hey hey hey</p>
                </>
              )}
            </Box>
            <Space h="xl" />
            <Title align="center" order={4}>
              Authentication
            </Title>
            <Divider size="md" my="xs" labelPosition="center" />
            <Box>
              <TextInput
                radius="lg"
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
                radius="lg"
                name="clientSecret"
                size="xs"
                label="Client Secret:"
                placeholder="Client Secret"
                value={client_secret}
                onChange={handleChange}
              />
              <Space h="md" />
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
                  radius="lg"
                  size="xs"
                  label="KEY"
                  placeholder="KEY"
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                />
                <TextInput
                  radius="lg"
                  size="xs"
                  label="VALUE"
                  placeholder="VALUE"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <Button
                  className="send-btn"
                  size="xs"
                  radius="lg"
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
              <Space h="xl" />
              <Box>
                <p>{apiUrl}</p>
              </Box>
            </Box>
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  );
}
