const Slack = require("slack-node"); // 슬랙 모듈 사용

/*
const webhookUri =
  "https://hooks.slack.com/services/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"; // Webhook URL
*/

exports.send = async (message, webhookUri) => {
  const slack = new Slack();
  slack.setWebhook(webhookUri);
  slack.webhook(
    {
      text: message,
    },
    function (err, response) {
      console.log(response);
    }
  );
};
