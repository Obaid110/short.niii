const express = require('express');
const app = express()
const port = 3000;

// EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
})

app.post('/submit-form', async (req, res) => {
  try {
    const { name, email, short_name, message } = req.body;

    await axios.post(MAILTREE_API, {
      smtp_host: "smtp.hostinger.com",
      smtp_port: 465,
      secure: true,
      smtp_user: "info@niii.xyz",
      smtp_pass: "YOUR_EMAIL_PASSWORD",

      from: "NIII Labs <info@niii.xyz>",
      to: "info@niii.xyz",
      subject: `New Short Name Request - ${short_name}`,
      text: `Name: ${name}\nEmail: ${email}\nShort Name: ${short_name}\nMessage: ${message}`,
      html: `
        <h2>New Short Name Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Short Name:</b> ${short_name}.niii.xyz</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    res.redirect('/?success=1');

  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).send("Email send failed");
  }
});

app.use((req, res) => {
  res.status(404).send('404 Not Found <a href="/">Go back to home</a>');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})