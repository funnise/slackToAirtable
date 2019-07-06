export const createSlackAttachment=(message:string)=> {

    return {
        text: message,
        fallback: message,
        attachment_type: 'default',
        callback_id: 'env_selection',
        actions: [{
           name: 'choices',
            text: 'start!',
            type: 'button',
    
        }],
    }
}
