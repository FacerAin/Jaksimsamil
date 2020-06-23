const webhookUri =
  'https://hooks.slack.com/services/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';

const slack = new Slack();
slack.setWebhook(webhookUri);
const send = async (message) => {
  slack.webhook(
    {
      channel: '#general', // 전송될 슬랙 채널
      username: 'webhookbot', //슬랙에 표시될 이름
      text: message,
    },
    function (err, response) {
      console.log(response);
    },
  );
};

send('안녕');
