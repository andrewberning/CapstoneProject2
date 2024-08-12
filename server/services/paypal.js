const axios = require('axios');
const { PAYPAL_BASE_URL, PAYPAL_CLIENT_ID, PAYPAL_SECRET } = process.env; 

async function handleResponse(response) {
  try {
    return {
      jsonResponse: response.data,
      httpStatusCode: response.status,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

async function generateAccessToken() {
  const response = await axios({
    url: PAYPAL_BASE_URL + '/v1/oauth2/token',
    method: 'post',
    data: 'grant_type=client_credentials',
    auth: {
      username: PAYPAL_CLIENT_ID,
      password: PAYPAL_SECRET
    }
  })

  return response.data.access_token
}

const createPaypalOrder = async (data) => {
  const accessToken = await generateAccessToken();
  const { totalAmount } = data;

  const response = await axios({
    url: PAYPAL_BASE_URL + '/v2/checkout/orders',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    data: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value:totalAmount,
          }
        }
      ]
    })
  })

  return handleResponse(response);
}

const capturePaypalOrder = async (orderID) => {
  const accessToken = await generateAccessToken();

  const response = await axios({
    url: `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
}

module.exports = { createPaypalOrder, capturePaypalOrder };