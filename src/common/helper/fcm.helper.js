// import Helper from "./helper";
import admin from "firebase-admin";
import fcmConfig from "../config/fcm.config";
import serverKey from "../../../pc-api-7260691470752753621-857-firebase-adminsdk-jjj1u-4042a219ed.json";

class FcmHelper {
  /**
   * send push notification
   * @param {array} tokens
   * @param {object} payload
   */
  static async sendNotification(tokens, payload) {
    // admin.initializeApp({
    //   credential: admin.credential.cert(serverKey),
    //   // databaseURL: "https://xxxxxxxxxxxx.firebaseio.com",
    // });

    // const payload = {
    //   notification: {
    //     title: "Notification Title",
    //     body: "This is an example notification",
    //   },
    //   data: {
    //     name: "dhruv",
    //   },
    // };

    // const options = {
    //   priority: "high",
    //   timeToLive: 60 * 60 * 24, // 1 day
    // };

    // fcmConfig
    //   .messaging()
    //   .sendToDevice(tokens, payload, options)
    //   .then((res) => {
    //     console.log("success", res);
    //   })
    //   .catch((err) => {
    //     console.log("error", err);
    //   });

    if (tokens.length > 0) {
      const messaging = admin.messaging();
      const fcmMessages = [];

      tokens.map((token) => {
        fcmMessages.push({
          token: token,
          apns: {
            payload: {
              aps: {
                alert: payload.notification,
              },
            },
          },
          data: payload.data,
          notification: payload.notification,
        });
      });

      messaging.sendAll(fcmMessages).then((result) => {
        console.log(result.responses);
      });
    }

    // const message = {
    //   notification: {
    //     title: "hello test",
    //     body: "test body",
    //   },
    //   token:
    //     "dGVXzjGjTQGAUCT5DaCJvg:APA91bE2Gx6sAEuW8sQntuwVyszEGqxv6co9Pfjx4bPq_qqTg7ZUyVUGWu_0YnnosJzcogjzeKp94HhnFJjCmGkupqRcIouphPrD9OwExzVrIbCTodXTmqlMxf8A76ovdjpar7mb3dbA",
    // };

    // admin
    //   .messaging()
    //   .send(message)
    // .then((res) => {
    //   console.log("success", res);
    // })
    // .catch((err) => {
    //   console.log("error", err);
    // });

    // admin.initializeApp({
    //   credential: admin.credential.cert(serverKey),
    //   databaseURL: "https://xxxxxxxxxxxx.firebaseio.com",
    // });

    // const messaging = admin.messaging();
    // const fcmMessages = [];

    // [
    //   "feGAWuvaTVyfkUUbHYtcNS:APA91bELmWD_P1yze7fcNyYUsYWMiUXj5t93rGab_4WSdtEpzqsqoWrVV_NNn2JJxrUTy00gO9an02538v_fPWVQa7MU3eyhPOqlRKDa-LZk7Ajl7b0vLv0mX8L1QzY3qW_CtmB5MqgW",
    //   "dWp7vhgCRGOtuFY01GVUcy:APA91bGh-g9FgcObgN_LboK9sEtrp0WznSVo9jfPv34F3uYZlbplGVBevbmJc_7IAMmUVXiz8LbFqcmud4nWJOSppnehLYLxvmyGBua4g_nz_CDuG4YLZ8YJs5wV1DEfuSnHXbUBORGq",
    //   "cFbBM4q0mEpokj0r6r-bqg:APA91bFlkzLFskQ7xQnpVrKp8nODDSAHKYs6sz8_1JRMM0Ulm9mMSWBe1eOrXFPu9KhA_xcvMQdFjCHWVx0ffFeRqpVb6cS2MkJzbBa4RtjT1L1rxa40I9aDOWDTcYqKePTSAQIV2JeE",
    //   "et9H5EaImENUlLSftrNBTs:APA91bGaaMg1xI9TxlcvGmSlNLVJNzYJSoBhf6vBYu9x3Bfu3l6R_Oag6XeYtt0F7Y1N3noBV06BGaWRmR_I1xq5GB_VKu2KeJjedz4maL3XYKMV8STU0fZ1CG5ISY8IDi54sKpKILqV",
    // ];

    // fcmMessages.push({
    //   token:
    //     "feGAWuvaTVyfkUUbHYtcNS:APA91bELmWD_P1yze7fcNyYUsYWMiUXj5t93rGab_4WSdtEpzqsqoWrVV_NNn2JJxrUTy00gO9an02538v_fPWVQa7MU3eyhPOqlRKDa-LZk7Ajl7b0vLv0mX8L1QzY3qW_CtmB5MqgW",
    //   apns: {
    //     payload: {
    //       aps: {
    //         alert: {
    //           title: "test",
    //           body: "testing notification ignore it",
    //         },
    //       },
    //     },
    //   },
    //   data: {
    //     title: "test",
    //     body: "testing notification ignore it",
    //   },
    //   notification: {
    //     title: "test",
    //     body: "testing notification ignore it",
    //   },
    // });

    // admin
    //   .messaging()
    //   .sendToDevice(
    //     [
    //       "feGAWuvaTVyfkUUbHYtcNS:APA91bELmWD_P1yze7fcNyYUsYWMiUXj5t93rGab_4WSdtEpzqsqoWrVV_NNn2JJxrUTy00gO9an02538v_fPWVQa7MU3eyhPOqlRKDa-LZk7Ajl7b0vLv0mX8L1QzY3qW_CtmB5MqgW",
    //     ],
    //     {
    //       data: {
    //         title: "test",
    //         body: "testing notification ignore it",
    //       },
    //       notification: {
    //         title: "test",
    //         body: "testing notification ignore it",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log("+++++", response.results[0].error);
    //   })
    //   .catch((error) => {
    //     console.log("++++++", error);
    //   });

    // messaging.sendAll(fcmMessages).then((result) => {
    //   console.log(result.responses);
    // });

    // const notificationPayload = {
    //   title,
    //   body,
    // };

    // var admin = require("firebase-admin");
    // var FCM = require("fcm-node");

    // var fcm = new FCM(
    //   "AAAAlDnFd4o:APA91bEQYIQpwj2qs0yN9vcycV3AWylAfwebTVQx533iwqxe2NEtOWxopX0JBsB2yIZztWL8dOxE7HsS3yOT7R5LLJyTPCDOOqWYtKpZ2dPqUtnbZwK8ALcZKA9-Qd7M0cfA0vV9x425"
    // );
    // var serviceAccount = require("../../../firebase-adminsdk.json");

    // var message = {
    //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    // to: tokens,
    // collapse_key: "your_collapse_key",

    // notification: {
    //   title: "Title of your push notification",
    //   body: "Body of your push notification",
    // },

    // data: {
    //   //you can send only notification or only data(or include both)
    //   my_key: "my value",
    //   my_another_key: "my another value",
    // },
  }

  // fcm.send(message, function (err, response) {
  //   if (err) {
  //     console.log("Something has gone wrong!", err);
  //   } else {
  //     console.log("Successfully sent with response: ", response);
  //   }
  // });
  // const notification_options = {
  //   priority: "high",
  //   timeToLive: 60 * 60 * 24,
  // };

  // // Divide array of tokens to 900 bunch
  // let tokenChunks = await Helper.chunk(tokens, 999);

  // tokenChunks.forEach(function (tokenChunk) {
  //   fcmConfig
  //     .messaging()
  //     .sendToDevice(tokenChunk, payload, notification_options)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });
  // }
}

export default FcmHelper;
