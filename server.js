const app = require('./src/config/express');

app.listen(3025, () => {
    console.log("servidor rodando na porta 3025");
});