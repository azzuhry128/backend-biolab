const crypto = require("crypto");

const milisecond = new Date().getTime();
const stringmilisecond = milisecond.toString();
const companycode = "PP"


const privatekey = "wr4l7-sYX74-6wtMr-p73M3-T0jx4"
const merchant_code = "T36666"
const merchant_ref = companycode + stringmilisecond
const amount = 10000

const signature = crypto.createHmac('sha256', privatekey).update(merchant_code + merchant_ref + amount).digest('hex');