# InquiryXpress

The web application allows users to send message to make inquiries

## Features of the app:

- Built using React-hook-form
- Axios to post the form data to the API
- The name, email, select and message fields are validated
- Message is displayed at the top of the form indicating submission status

**The data to post to the API endpoint is in this format:**

```
{
    "id": 3,
    "name": "Tun Oje",
    "email": "test2@test.com",
    "subject": "test2 subject",
    "message": "test2 message"
}

```