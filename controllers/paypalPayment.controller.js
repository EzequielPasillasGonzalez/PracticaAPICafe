const {response} = require('express');
const axios = require('axios');

const createOrder = async (req, res = response) => {
    try {

        const order = {
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: "105.70",
                },
              },
            ],
            application_context: {
              brand_name: "mycompany.com",
              landing_page: "NO_PREFERENCE",
              user_action: "PAY_NOW",
              return_url: `capture-order`,
              cancel_url: `cancel-payment`,
            },
        } 

        const params = new URLSearchParams()
        params.append('grant_type', 'client_credentials')

        const {data: {access_token}} =  await axios.post(`${process.env.PAYPAL_URL}/v1/oauth2/token`, params, {
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_SECRET_KEY
            }
        })                           

        const config = {
            headers: {
                'Authorization': `Bearer ${access_token}` // Reemplaza 'tuToken' con el token real
            }
        };


        const resp = await axios.post(`${process.env.PAYPAL_URL}/v2/checkout/orders`, order, config)        

        

        return res.json({
            ok: true,
            body: `${resp}`
        })
    } catch(error) {
        return res.status(400).json({
            ok: false,
            body: `No fue posible realizar el pago ${error}`
        })
}
}

module.exports = {
    createOrder
}