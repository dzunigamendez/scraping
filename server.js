const express = require('express');
const Nightmare = require('nightmare');

var app = express();

app.get('/primera-etapa', async (req, res) => {
  const url =
    'https://www.compraspublicas.gob.ec/ProcesoContratacion/compras/PC/informacionProcesoContratacion2.cpe?idSoliCompra=uYuSQi3mPovxfSw2-Jll2DqlI37q7ijNKe4qX49pM28';
  const selector =
    '#one-column-emphasis > tbody > tr:nth-child(14) > td > strong';

  try {
    const nightmare = Nightmare({ show: true });
    const estado = await nightmare
      .goto(url)
      .wait('#cuadro')
      .evaluate(
        () =>
          document.querySelector(
            '#one-column-emphasis > tbody > tr:nth-child(14) > td > strong'
          ).innerHTML
      );

    const entidadContratante = await nightmare.evaluate(
      () =>
        document.querySelector(
          '#one-column-emphasis > tbody > tr:nth-child(1) > td'
        ).innerHTML
    );

    const objetoProceso = await nightmare.evaluate(
      () =>
        document.querySelector(
          '#one-column-emphasis > tbody > tr:nth-child(2) > td'
        ).innerHTML
    );

    const presupuesto = await nightmare.evaluate(
      () =>
        document.querySelector(
          '#one-column-emphasis > tbody > tr:nth-child(5) > td'
        ).innerHTML
    );

    const plazo = await nightmare.evaluate(
      () =>
        document.querySelector(
          '#one-column-emphasis > tbody > tr:nth-child(11) > td'
        ).innerHTML
    );

    await nightmare.end();
    res.json({ estado, entidadContratante, objetoProceso, presupuesto, plazo });
  } catch (error) {
    res.json({ error });
  }
});

app.listen('8080', () => {
  console.log('http://localhost:8080');
});
