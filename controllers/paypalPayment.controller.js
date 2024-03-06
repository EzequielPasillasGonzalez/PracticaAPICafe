const {response} = require('express');
const axios = require('axios');

const createToken = async () => {
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')

    const {data} = await axios.post(`${process.env.PAYPAL_URL}/v1/oauth2/token`, params, {
        auth: {
            username: process.env.PAYPAL_CLIENT_ID,
            password: process.env.PAYPAL_SECRET_KEY
        }
    })        

    return data.access_token
}

const createOrder = async (req, res = response) => {
    try {

        const orderList = req.body

        let totalPagar = 0
        
        orderList.forEach(element => {
                totalPagar += element.precio                
        });        


        const order = {

            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'MXN',
                        value: totalPagar
                    }
                }
            ],            
        }

        const access_token = await createToken()   

        const resp = await axios.post(`${process.env.PAYPAL_URL}/v2/checkout/orders`, order, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })            
    

        console.log(access_token);

        return res.json({
            ok: true,
            body: resp.data
        })
    } catch(error) {        
        console.log(error);
        return res.status(400).json({
            ok: false,
            body: `No fue posible realizar el pago ${error}`
        })
}
}

const getOrder = async ( req, res = response) => {

    try {
        const {id} = req.params

        const access_token = await createToken()        

        const resp = await axios.get(`${process.env.PAYPAL_URL}/v2/checkout/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        console.log(access_token);

        console.log(resp);

        return res.json({
            ok: true,
            body: resp.data
        })
    } catch(error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            body: `No fue posible buscar el pedido ${error}`
        })
    }

}

const captureOrder = async ( req, res = response) => {

    try {
        const {id} = req.params

        const access_token = await createToken()       
        
        console.log(access_token);

        const resp = await axios.post(`${process.env.PAYPAL_URL}/v2/checkout/orders/${id}/capture`, {},{
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        console.log(resp.data);

        return res.json({
            ok: true,
            body: resp.data
        })
    } catch(error) {
        console.log(error.response.data);
        return res.status(400).json({
            ok: false,
            body: `No fue posible buscar el pedido ${error}`
        })
    }

}


const notifyOrder = async ( req, res) => {

    try {
        // Hacer una solicitud HTTP al frontend
        await axios.post('http://localhost:8081/?#/products', notificationData);
        
        return res.json({
            ok: true,
            body: req.body
        })
    } catch(error) {
        return res.status(400).json({
            ok: false,
            body: `No fue posible buscar el pedido ${error}`
        })
    }
    
}

module.exports = {
    createOrder,
    captureOrder,
    getOrder,
    notifyOrder
}