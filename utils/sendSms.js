import axios from "axios";

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
  try {
    const sms = await axios.get(
      `https://api.authkey.io/request?authkey=${process.env.AUTH_KEY}&mobile=${number}&country_code=${code}&sid=6869&name=UPONE&&sms=${message}`
    );
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
};
