import * as functions from 'firebase-functions';
import { createSlackAttachment } from './createSlackAttachment'
const { WebClient } = require('@slack/web-api');
const token ='xoxb-330894282468-674056438866-bPq7JuTLuFFHvloymXFuqAUG'

const web = new WebClient(token);
//const Airtable = require('airtable');
//const request = require('request-promise-native');


exports.airtableRequest = functions.https.onRequest(async(req, res) => {  
    let payload = req.body;
    console.log(payload)
    if (payload.type === 'url_verification') {
        return res.status(200).json({ 'challenge': payload.challenge });
    }
     if (payload.event && payload.event.type === 'app_mention') {
        const option = {
            attachments:[createSlackAttachment('Event情報の入力')],
            channel: payload.event.channel,
            icon_emoji: ':question:',
            username: 'Event Infomation Manager'
          }
          web.chat.postMessage(option)
          .then((response:any) => {
             console.log('メッセージを送信しました: ', response.ts)
          }).catch(console.error)     
    　 }
    if (typeof payload.payload === 'string') {
        payload = JSON.parse(payload.payload)
    }
    
    switch (payload.type) {
        case 'interactive_message':
        web.dialog.open({
            dialog: {
              callback_id: "dialog",
              title: "イベント情報",
              submit_label: "送信する",
              notify_on_cancel: true,
              elements: [
                {
                  type: "text",
                  label: "event name",
                  name: "name",
                  placeholder: 'foo'
                },
                {
                  type: "text",
                  label: "event url",
                  name: "url",
                  placeholder: "https://google.com",
                },
                {
                  label: "Tech category",
                  type: "select",
                  name: "review",
                  options: [
                    {
                      label: "AI",
                      value: "AI"
                    },
                    {
                      label: "Tool",
                      value: "Tool"
                    },
                    {
                      label: "Method",
                      value: "Method"
                    },
                    {
                      label: "Other",
                      value: "Other"
                    },
                  ]
                },
              ]
            },
            trigger_id: payload.trigger_id
          })
            .then(() => {
              console.log('ダイアログを送信しました')
            })
            .catch(console.error)
          
            break
        case 'dialog_submission':
                console.log('ダイアログの結果を受信しました')
            break
    }
     return res.status(200).send('')
});


