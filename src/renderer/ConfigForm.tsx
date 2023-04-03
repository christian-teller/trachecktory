/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  Paper,
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
  ActionIcon,
  Text,
  Divider,
  Flex,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { CubeSend, TrashX } from 'tabler-icons-react';
import qs from 'qs';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
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
  const [client_id, setClientId] = useState('EKS upgrade');
  const [client_secret, setClientSecret] = useState(
    '300dad74-5367-4365-af4f-46b5a71628df'
  );
  const [preparer_id, setPreparerId] = useState('');
  const [token, setToken] = useState('');

  //headers hook
  const [headers, setHeaders] = useState<Object>({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  //key value pair setter hooks
  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('');
  //url hook
  const [apiUrl, setApiUrl] = useState<string>(
    'https://qa-gimli.ci.apexpickup.com'
  );
  const [endpoint, setEndpoint] = useState<string>('');

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
    {
      value: 'get-order-site-id',
      label: 'Get Order  By Site',
      group: 'Orders',
    },
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
    } else if (name === 'preparerId') {
      setPreparerId(value);
      console.log(preparer_id);
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
    grabToken;
    console.log(token);
  };

  // axios passthrough
  const api = axios.create({
    baseURL: form.values.server_url,
    headers: { headers },
  });

  const grabToken = (e: any) => {
    e.preventDefault();
    console.log(form.values);
    console.log(e);
    //GET TOKEN
    axios
      .post(
        apiUrl + '/token',
        qs.stringify({
          client_id: client_id.toString(),
          client_secret: client_secret.toString(),
        }),
        { headers }
      )
      .then(function (response: any) {
        console.log(response);
        console.log(response.status);
        console.log(response.data.access_token);
        setToken(response.data.access_token);
        return response;
      })
      .catch(function (error: any) {
        console.log(error.message);
      });
  };

  const makeRequest = (e: any) => {
    e.preventDefault();
    // grabToken();
  };

  return (
    <Container className="contain">
      <form className="auth" onSubmit={handleSubmit}>
        <Grid>
          <Grid.Col className="user-creds" sm={5}>
            <Space h="md" />
            <Box className="section-bg">
              <Group pb="12px" grow align="flex-end" position="center">
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
                  label="Action: "
                  placeholder="Select action"
                  data={conditionalParams}
                  onChange={handleActionChange}
                  value={actionSelector}
                />
              </Group>
              <Divider />
              {actionSelector === '' && (
                <>
                  <Box className="dynamic-fields">
                    <Text
                      sx={{
                        paddingTop: '28px',
                        fontStyle: 'italic',
                      }}
                      align="center"
                    >
                      Please select action.
                    </Text>
                  </Box>
                </>
              )}
              {actionSelector === 'get-orders' && (
                <>
                  <Paper
                    sx={{
                      backgroundColor: 'rgba(0, 217, 255, 0.048)',
                    }}
                    shadow="md"
                    p="xs"
                    className="headers"
                    withBorder
                  >
                    <TextInput
                      label="Preparer ID: "
                      radius="sm"
                      name="preparerId"
                      size="xs"
                      placeholder="Preparer ID"
                      value={preparer_id}
                      onChange={handleChange}
                    />
                  </Paper>
                </>
              )}
              {actionSelector === 'create-order' && (
                <>
                  <Paper
                    sx={{
                      backgroundColor: 'rgba(0, 217, 255, 0.0)',
                    }}
                    p="xs"
                  >
                    <TextInput
                      label="Preparer ID:"
                      radius="sm"
                      name="preparerId"
                      size="xs"
                      placeholder="Preparer ID"
                      value={preparer_id}
                      onChange={handleChange}
                    />
                    <Group pt="20px" pr="20px" position="right">
                      <Button color="cyan" size="lg" compact>
                        SEND
                      </Button>
                    </Group>
                  </Paper>
                </>
              )}
              {actionSelector === 'get-order-site-id' && (
                <>
                  <Paper
                    sx={{
                      backgroundColor: 'rgba(0, 217, 255, 0.048)',
                    }}
                    shadow="md"
                    p="xs"
                    className="headers"
                    withBorder
                  >
                    <TextInput
                      label="Preparer ID:"
                      radius="sm"
                      name="preparerId"
                      size="xs"
                      placeholder="Preparer ID"
                      value={preparer_id}
                      onChange={handleChange}
                    />{' '}
                    <Space h="md" />
                    <Group grow position="center">
                      <Button
                        variant="gradient"
                        gradient={{ from: 'teal', to: 'blue', deg: 45 }}
                        size="xs"
                        onClick={handleSubmit}
                      >
                        Send
                      </Button>
                    </Group>
                  </Paper>
                </>
              )}
              {actionSelector === 'get-order-schedule-id' && (
                <>
                  <Paper
                    sx={{
                      backgroundColor: 'rgba(0, 217, 255, 0.048)',
                    }}
                    shadow="md"
                    p="xs"
                    className="headers"
                    withBorder
                  >
                    <TextInput
                      label="Preparer ID:"
                      radius="sm"
                      name="preparerId"
                      size="xs"
                      placeholder="Preparer ID"
                      value={preparer_id}
                      onChange={handleChange}
                    />
                    <ActionIcon>
                      <CubeSend onClick={handleSubmit} />
                    </ActionIcon>
                  </Paper>
                </>
              )}
              {actionSelector === 'get-clients' && (
                <>
                  <Paper
                    sx={{
                      backgroundColor: 'rgba(0, 217, 255, 0.048)',
                    }}
                    shadow="md"
                    p="xs"
                    className="headers"
                    withBorder
                  >
                    <TextInput
                      label="Preparer ID:"
                      radius="sm"
                      name="preparerId"
                      size="xs"
                      placeholder="Preparer ID"
                      value={preparer_id}
                      onChange={handleChange}
                    />
                    <ActionIcon>
                      <CubeSend onClick={handleSubmit} />
                    </ActionIcon>
                  </Paper>
                </>
              )}
            </Box>
          </Grid.Col>
          <Grid.Col md={7} sm={7}>
            <Paper
              sx={{
                backgroundColor: 'rgba(0, 217, 255, 0.048)',
              }}
              p="xs"
              className="headers"
              withBorder
            >
              <Title align="center" order={4}>
                Authentication
              </Title>
              <Space h="md" />
              <Box>
                <Group grow>
                  <TextInput
                    radius="sm"
                    name="clientId"
                    size="xs"
                    placeholder="Client ID"
                    // {...form.getInputProps('client_id')}
                    value={client_id}
                    onChange={handleChange}
                  />
                  <TextInput
                    radius="sm"
                    name="clientSecret"
                    size="xs"
                    placeholder="Client Secret"
                    value={client_secret}
                    onChange={handleChange}
                  />
                </Group>
              </Box>
            </Paper>
            <Space h="md" />
            <Grid grow>
              <Grid.Col>
                <Paper
                  sx={{
                    backgroundColor: 'rgba(0, 217, 255, 0.048)',
                  }}
                  p="lg"
                  className="headers"
                  withBorder
                >
                  <Title align="center" order={4}>
                    Headers
                  </Title>
                  <Space h="md" />
                  <Group grow>
                    <TextInput
                      size="xs"
                      radius="sm"
                      placeholder="KEY"
                      type="text"
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                    />
                    <TextInput
                      radius="sm"
                      placeholder="VALUE"
                      type="text"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      size="xs"
                      rightSection={
                        <Button
                          className="btn-blue"
                          compact
                          size="xs"
                          radius="sm"
                          onClick={() => {
                            console.log(`{${key}:${value}}`);
                            if (key !== '' && value !== '') {
                              const newHeaders = { ...headers };
                              newHeaders[key] = value;
                              setHeaders(newHeaders);
                              setKey('');
                              setValue('');
                              setHeaders(newHeaders);
                              console.log(apiUrl);
                            } else {
                            }
                          }}
                        >
                          +
                        </Button>
                      }
                    />
                  </Group>
                  <Space h="md" />
                  <Box
                    sx={{
                      overflowX: 'hidden',
                      border: '1px solid #00000025',
                      borderRadius: '6px',
                      backgroundColor: 'white',
                    }}
                    p={6}
                  >
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
                          {`{ ${key}: ${value} }  `}
                          <Button
                            ml="4px"
                            compact
                            variant="transparent"
                            color="red"
                            onClick={() => {
                              handleRemoveHeader(key);
                            }}
                            size="xs"
                          >
                            X
                          </Button>
                        </List.Item>
                      ))}
                    </List>
                  </Box>
                </Paper>
              </Grid.Col>
            </Grid>

            <Space h="md" />
          </Grid.Col>
          <Grid.Col sm={12}>
            <Box py={25}>
              <Group position="center" grow>
                <ActionIcon
                  display="none"
                  variant="gradient"
                  gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                  p={20}
                  type="submit"
                  className="send-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(
                      'Client ID: ' + client_id,
                      'PREPARER ID: ' + preparer_id
                    );
                  }}
                >
                  <Title order={3}>SEND</Title>
                  <CubeSend size={60} strokeWidth={1} color="black" />
                </ActionIcon>
                <Button className="btn-blue" color="cyan" onClick={grabToken}>
                  <Title order={4}>TOKEN</Title>
                </Button>
              </Group>
              <Space h="md" />
              <SimpleBar forceVisible="y">
                <Paper
                  sx={{
                    backgroundColor: 'rgba(0, 217, 255, 0.048)',
                    padding: '16px',
                    border: '1px solid rgba(0, 0, 0, 0.178)'

                  }}
                  shadow="md"
                >
                  server url: {apiUrl}
                  <br />
                  client id and secret: {client_id} | {client_secret} <br />
                  <Box>token: {token}</Box>
                </Paper>
              </SimpleBar>
            </Box>
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  );
}
