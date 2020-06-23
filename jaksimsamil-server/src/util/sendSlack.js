const Slack = require("slack-node"); // 슬랙 모듈 사용

const webhookUri =
  "https://hooks.slack.com/services/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"; // Webhook URL

const slack = new Slack();
slack.setWebhook(webhookUri);

const send = async (message) => {
  slack.webhook(
    {
      text: message,
    },
    function (err, response) {
      console.log(response);
    }
  );
};

send("hello");
