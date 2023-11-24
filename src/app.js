import Express, { response } from "express";
import bodyParser from "body-parser";
import { SENDBIRD_APP_ID } from "./env.js";
import fetcher from "./fetcher.js";

const app = Express();
app.use(bodyParser.json());

const BASE_URL = `https://api-${SENDBIRD_APP_ID}.sendbird.com/v3`;

app.get("/health_check", (req, res) => {
  res.send({ status: "OK" });
});

app.post("/health_check", (req, res) => {
  const requestData = req.body;
  res.send(requestData);
});

app.post("/users", async (req, res) => {
  const requestData = req.body;
  const url = BASE_URL + '/users';
  const responseData = await fetcher(url, 'POST', requestData);
  console.log(responseData);
  res.send(responseData);
});

app.post('/group_channels', async (req, res) => {
  const requestData = req.body;
  const url = BASE_URL + '/group_channels';
  const responseData = await fetcher(url, 'POST', requestData);
  console.log(responseData);
  res.send(responseData);
});

app.post('/:channel_url/messages', async (req, res) => {
  const channelUrl = req.params.channel_url;
  const url = BASE_URL + `/group_channels/${channelUrl}/messages`;
  const requestData = req.body;

  const responseData = await fetcher(url, 'POST', requestData);
  res.send(responseData);
});

app.get('/:channel_url/messages', async (req, res) => {
  const channelUrl = req.params.channel_url;
  const currentTimestamp = new Date().getTime();
  const queryParams = `?message_ts=${currentTimestamp}&reverse=true`;
  const url = BASE_URL + `/group_channels/${channelUrl}/messages` + queryParams;

  const responseData = await fetcher(url, 'GET');
  res.send(responseData);
})
export default app;
