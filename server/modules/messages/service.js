const Joi = require('@hapi/joi');
const uuid = require('uuid/v1');
const messages = {
    'luiz': [
        {
            id: uuid(),
            from: 'juan',
            to: 'luiz',
            timestamp: 1580768153159,
            subject: 'Urgent!',
            detail: `What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'`,
            check: false
        }, {
            id: uuid(),
            from: 'maria',
            to: 'luiz',
            timestamp: 1580768193595,
            subject: 'Hi!',
            detail: `What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
            check: false
        }, {
            id: uuid(),
            from: 'carlos',
            to: 'luiz',
            timestamp: 1580769054969,
            subject: 'Invitation: Luiz',
            detail: 'Hi tomorrow is a good day to do a job interview',
            check: false
        }, {
            id: uuid(),
            from: 'carlos',
            to: 'luiz',
            timestamp: 1580781442582,
            subject: 'This is a huge subject to test if the subject works with big subjects without breaking',
            detail: `What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'`,
            check: false
        }
    ]
};

const sortMessagesByMostRecent = (messages) => {
    return messages.sort((a,b) => a.timestamp <= a.timestamp ? 1 : -1);
}

class MessageService {
    constructor(user) {
        this.user = user;
        this.messages = messages[this.user] || (messages[this.user] = []);
    }

    static on (...args) {
        return new MessageService(...args);
    }

    list () {
        return sortMessagesByMostRecent(this.messages);
    }

    checkById (id) {
        const message = this.messages.find(m => m.id === id);
        
        if (!message) throw new Error('Message not found!');
        message.check = true;

        return message;
    }

    create ({ to, subject, detail }) {
        console.log(to, subject, detail);
        const schema = Joi.object({
            to: Joi.string().required(),
            subject: Joi.string().required(),
            detail: Joi.string().required()
        });
        const validation = schema.validate({ to, subject, detail });

        if (validation.error) throw validation.error;

        const message = {
            id: uuid(),
            to,
            from: this.user,
            subject,
            detail,
            timestamp: Date.now()
        };

        messages[to] = [].concat(message, messages[to] || []);

        return message;
    }
}

module.exports = MessageService;