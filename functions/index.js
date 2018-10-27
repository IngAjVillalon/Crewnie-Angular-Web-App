const functions = require("firebase-functions");
const os = require("os");
const path = require("path");
// const spwan = require("child-process-promise").spwan;
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const fs = require('fs');

// const gcsconfig = {
//   projectId: 'crewnie-test',
//   keyFilename: "crewnie-test-firebase-adminsdk-tppi2-d04d4ff27a.json"
// }
// const gcs = require("@google-cloud/storage")(gcsconfig);

const {Storage} = require('@google-cloud/storage');
const gcs = new Storage({
  projectId: 'crewnie-test',
  keyFilename: "crewnie-test-firebase-adminsdk-tppi2-d04d4ff27a.json"
});

const UUID = require("uuid/v4");


exports.uploadImageFile = functions.https.onRequest((request, response) => {

  // cors(request, response, (request, response) => {

    let downloadURL = null;

    // if (request.method !== "POST") {
    //   return response.status(500).json({
    //     message: "Not Allowed"
    //   });
    // }

    const busboy = new Busboy({ headers: request.headers });
    let uploadDate = null;
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const filePath = path.join(os.tmpdir(), filename);
      uploadDate = { file: filePath, type: mimetype };
      file.pipe(fs.createWriteStream(filePath));
    });

    busboy.on("finish", () => {
      const bucket = gcs.bucket("crewnie-test.appspot.com");
      let uuid = UUID();
      bucket
        .upload(uploadDate.file, {
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadDate.type
            }
          }
        })
        .then((data) => {
          let file = data[0];

          downloadURL =  Promise.resolve("https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid);

          return response.status(200).json({
            message: "It worked",
            downloadUrl: downloadURL
          });
        })
        .catch(err => {
          return response.status(500).json({
            error: err
          });
        });
    });

    busboy.end(request.rawBody);

  // });
});
