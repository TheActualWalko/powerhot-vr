function ensureLogin () {
  return new Promise((resolve) => {
    FB.getLoginStatus((response) => {
      if (response.status === "connected") {
        resolve(response.authResponse.accessToken);
      } else {
        FB.login((response) => {
          resolve(response.authResponse.accessToken);
        }, {scope: "publish_actions"});
      }
    });
  });
}

function base_uploadImageToFB(blob, token) {
  const formData = new FormData();
  formData.append("access_token", token);
  formData.append("source", blob);
  formData.append("no_story", true);

  return axios({
    url: 'https://graph.facebook.com/me/photos',
    method: 'post',
    data: formData,
    params: {
      token
    },
    paramSerializer: (params) => {
      return qs.stringify(params)
    },
    headers: {
      processData: false,
      contentType: false,
      cache: false,
    },
  })
}
const uploadImageToFB = _.curry(base_uploadImageToFB)

function getFacebookImageUrl ({id: imageId}) {
  return new Promise((resolve, reject) => {
    FB.api(
      `/${imageId}?fields=images`,
      (response) => {
        if(response && response.error) {
          return reject(response.error);
        } else {
          return resolve(response.images[0].source);
        }
      }
    )
  })
}

function base_createFacebookPost (message, image) {
  return new Promise((resolve, reject) => {
    FB.api(
      "/me/feed",
      "POST",
      {
        "message": "",
        "picture": image,
        "link": window.location.href,
        "name": 'Look at the cute panda!',
        "description": message,
        "privacy": {
            value: 'SELF'
        }
      },
      (response) => {
        if(response && response.error) {
          reject(response.error);
        } else {
          resolve(response)
        }
      }
    );
  });
}
const createFacebookPost = _.curry(base_createFacebookPost)

function base_shareImage(message, blob, token) {
  return uploadImageToFB(blob, token)
    .then(getFacebookImageUrl)
    .then(createFacebookPost(message))
}
const shareImage = _.curry(base_shareImage)


