import * as functions from 'firebase-functions';
import { createSlackAttachment } from './createSlackAttachment'
import { slackToken } from './config'
import {callAirtable} from './callAirtable'
import { elements } from './elements'
const { WebClient } = require('@slack/web-api');
const web = new WebClient(slackToken);

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
            icon_emoji: ':jouhouhassinn:',
            username: 'Event Infomation Manager'
          }
          web.chat.postMessage(option)
          .then((response:any) => {
             console.log('メッセージを送信しました: ', response.ts)
          }).catch((err:any)=>{
              console.log(err)
              console.log('エラー発生')
          })     
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
              elements: elements
            },
            trigger_id: payload.trigger_id
          })
            .then(() => {
              console.log('ダイアログを送信しました')
            }).catch(console.error)
            break
        case 'dialog_submission':
              console.log('ダイアログの結果を受信しました')
              console.log(payload.submission)
              callAirtable(payload.submission)
            break
    }
     return res.status(200).send('')
});


