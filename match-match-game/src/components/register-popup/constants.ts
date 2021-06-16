export const FIELDS = [
  {
    title: 'First Name',
    type: 'text',
    name: 'first-name',
    pattern: /(?=\d*\D+)^[^~!@#$%*()_—+=|:;"'`<>,.?/^]+$/,
    error:
      "First name can't be empty, contain only numbers, contain service characters (~ ! @ # $ % * () _ — + = | : ; \" ' ` < > , . ? / ^).",
  },
  {
    title: 'Last Name',
    type: 'text',
    name: 'last-name',
    pattern: /(?=\d*\D+)^[^~!@#$%*()_—+=|:;"'`<>,.?/^]+$/,
    error:
      "Last name can't be empty, contain only numbers, contain service characters (~ ! @ # $ % * () _ — + = | : ; \" ' ` < > , . ? / ^).",
  },
  {
    title: 'E-mail',
    type: 'email',
    name: 'email',

    // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
    pattern:
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[x01-x08x0bx0cx0e-x1fx21x23-x5bx5d-x7f]|\\[x01-x09x0bx0cx0e-x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[x01-x08x0bx0cx0e-x1fx21-x5ax53-x7f]|\\[x01-x09x0bx0cx0e-x7f])+)\])/,
    error:
      "Email can't be empty, must comply with the standard email generation rule [RFC](https://en.wikipedia.org/wiki/Email_address#Standards_documents)",
  },
];

export const BUTTONS = [
  {
    type: 'submit',
    text: 'add user',
  },
  {
    type: 'reset',
    text: 'cancel',
  },
];
