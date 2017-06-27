function ensureLogin (scope=[]) {
  // return new Promise((resolve) => {
  //   FB.getLoginStatus((response1) => {
  //     if (response1.status === "connected") {
  //       resolve(response1.authResponse.accessToken);
  //     } else {
  //       FB.login((responseHalf) =>{
  //         console.log(responseHalf)
  //         FB.login((response2) => {
  //           console.log('login response2: ', response2)
  //           resolve(response2.authResponse.accessToken);
  //         }, {
  //           scope,
  //           return_scopes: true,
  //         });
  //       })
  //       // FB.login((response2) => {
  //       //   console.log('login response2: ', response2)
  //       //   resolve(response2.authResponse.accessToken);
  //       // }, {
  //       //   scope,
  //       //   return_scopes: true,
  //       // });
  //     // }
  //   });
  // });
  return getLoginStatus()
    .then((statusResponse) => {
      const {status} = statusResponse;
      const {token, userId} = authResponseToCredential(statusResponse.authResponse);
      if(status === "connected") {
        return checkPermissions(userId, token)
          .then(({data: permArr}) => {
            const permissionsOwned = permArr.filter(({status}) => status === 'granted').map(({permission}) => permission);
            if(requiredPermissionsAreOwned(permissionsOwned, scope)) {
              return authResponseToCredential(authResponse);
            } else {
              console.log('GONNA LOG IN')
              return login(scope).then(({authResponse}) => authResponseToCredential(authResponse));
            }
          })
      } else {
        return login(scope).then(({authResponse}) => authResponseToCredential(authResponse));
      }
    })
}

function authResponseToCredential ({userID, accessToken}) {
  return {userId: userID, token: accessToken};
}

function getLoginStatus () {
  return new Promise((resolve, reject) => {
    FB.getLoginStatus((response) => {
      if(response && !response.error) {
        resolve(response);
      } else {
        reject(response)
      }
    });
  });
}

function login (scope=[]) {
  return new Promise((resolve, reject) => {
    FB.login((response) => {
      console.log('login Response: ', response)
      if(response && !response.error) {
        resolve(response)
      } else {
        reject(response)
      }
    }, {scope: scope.join(','), auth_type: 'rerequest'});
  })
}

function permissionsArrToObj (permArr) {
  return permArr.reduce((obj, permission) => {
    obj[permission] = true;
    return obj
  }, {});
}

function requiredPermissionsAreOwned(ownedPermissions, requiredPermissions) {
  const ownedObj = permissionsArrToObj(ownedPermissions)
  const requiredObj = permissionsArrToObj(requiredPermissions)
  return requiredPermissions.reduce((prevPermissionsPassed, permission) => {
    return prevPermissionsPassed && ownedObj[permission];
  }, true);
}

function checkPermissions (userId, token) {
  return new Promise((resolve, reject) => {
    FB.api(
      `/${userId}/permissions`,
      function (response) {
        if (response && !response.error) {
          resolve(response);
        } else {
          reject(response);
        }
      }
    );
  });
}

function base_uploadImageToFB(blob, is360, userId, token) {
  console.log('base_uploadImageToFB: ', arguments)
  return new Promise((resolve, reject) => {
  //   FB.api(
  //     `/${userId}/photos`,
  //     "POST",
  //     {
  //         source: blob,
  //         allow_spherical_photo: is360,
  //         spherical_metadata: {
  //           ProjectionType: 'equirectangular'
  //         }
  //     },
  //     function (response) {
  //       if (response && !response.error) {
  //         resolve(response)
  //       } else {
  //         reject(response)
  //       }
  //     }
  //   );
    var formData = new FormData()
    formData.append('access_token', token)
    formData.append('source', blob)

    var xhr = new XMLHttpRequest();
    xhr.open( 'POST', 'https://graph.facebook.com/me/photos', true )
    xhr.onload = xhr.onerror = function() {
      console.log( xhr.responseText )
    };

    xhr.send( formData )
  })

  // const formData = new FormData();
  // formData.append("access_token", token);
  // formData.append("source", blob);
  // formData.append("no_story", true);
  // formData.append("allow_spherical_photo", is360);
  // formData.append("spherical_metadata", {ProjectionType: 'equirectangular'});
  // return axios({
  //   url: `https://graph.facebook.com/v2.9/${userId}/photos`,
  //   method: 'post',
  //   data: formData,
  //   // params: {
  //   //   access_token: token
  //   // },
  //   paramSerializer: (params) => {
  //     return qs.stringify(params)
  //   },
  //   headers: {
  //     processData: false,
  //     contentType: 'multipart/form-data',
  //     cache: false,
  //   },
  // })
}
const uploadImageToFB = _.curry(base_uploadImageToFB)

function getFacebookImageUrl ({id: imageId}) {
  console.log('getFacebookImageUrl: ', arguments)
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

function base_createFacebookPost (message, image, userId) {
  console.log('base_createFacebookPost: ', arguments)
  return new Promise((resolve, reject) => {
    FB.api(
      `/${userId}/feed`,
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

function base_shareImage(message, blob, is360, {userId, token}) {
  console.log('base_shareImage: ', arguments)
  // const return1 = uploadImageToFB(blob, is360, userId);
  // const return2 = return1.then(getFacebookImageUrl);
  // const return3 = return2.then(createFacebookPost(message))
  // return return3;
  return uploadImageToFB(blob, is360, userId, token)
    .then(getFacebookImageUrl)
    .then(createFacebookPost(message))
}
const shareImage = _.curry(base_shareImage)


