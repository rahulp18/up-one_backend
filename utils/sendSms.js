import axios from "axios";
import request from "request";
export const sendSMS = async (number, code, otp) => {
  try {
    const sms = await axios.get(
      `https://api.authkey.io/request?authkey=${process.env.AUTH_KEY}&mobile=${number}&country_code=${code}&sid=6737&name=UPONE&otp=${otp}`
    );
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
};
export const sendConfirmSms = async (number, code, message) => {
  // var options = {
  //   method: "GET",
  //   url: "https://api.authkey.io/request",
  //   qs: {
  //     authkey: `${process.env.AUTH_KEY}`,
  //     sms: message,
  //     mobile: number,
  //     country_code: code,
  //     sender: `${process.env.AUTH_KEY}`,
  //   },
  // };
  // request(options, function (error, response, body) {
  //   if (error) throw new Error(error);
  //   console.log(body);
  // });
};
