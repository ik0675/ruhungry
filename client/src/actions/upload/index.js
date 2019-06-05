import * as types from "../types";

export const dispatchResetUpload = _ => dispatch => {
  return dispatch({ type: types.UPLOAD_RESET });
};

export const dispatchToggleUpload = _ => dispatch => {
  return dispatch({ type: types.TOGGLE_UPLOAD });
};

export const dispatchUploadRestaurant = (
  restaurant,
  image,
  loaded
) => async dispatch => {
  let file = image[0];
  const fileName = file.name;
  const fileType = file.type;

  try {
    // Check if the restaurant already exists by the same name.
    const isRestaurantExists = await fetch(
      `/api/checkIfRestaurantExists/${restaurant}`
    );
    const restaurantCheck = await isRestaurantExists.json();
    if (restaurantCheck.status) {
      return dispatchUploadError(dispatch, restaurantCheck.msg, loaded);
    }

    // get s3 pre-signed url
    const getS3Url = await fetch(
      `/api/getS3Url?fileName=${fileName}&fileType=${fileType}`
    );
    const getS3UrlResponse = await getS3Url.json();
    if (!getS3UrlResponse.status) {
      return dispatchUploadError(
        dispatch,
        "Internal Err... Please try again",
        loaded
      );
    }

    // upload to s3 bucket
    const { signedRequest, getUrl } = getS3UrlResponse.data;
    const uploadToS3 = await fetch(signedRequest, {
      method: "PUT",
      headers: { "content-type": fileType },
      body: file
    });
    if (!uploadToS3.ok) {
      dispatchUploadError(
        dispatch,
        "Internal Err while saving images... Please try again",
        loaded
      );
      return loaded();
    }

    // save the image path from s3 to the database
    const addRestaurant = await fetch("/api/addRestaurant", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ restaurant, imgPath: getUrl })
    });
    const addRestaurantResponse = await addRestaurant.json();
    if (addRestaurantResponse.status) {
      dispatch({ type: types.UPLOAD_SUCCESS, data: "Upload successful" });
    } else {
      dispatchUploadError(
        dispatch,
        "Could not save the image... Please try again",
        loaded
      );
    }
    loaded();
  } catch (err) {
    console.log(err);
    return dispatchUploadError(
      dispatch,
      "Internal Err while saving images... Please try again",
      loaded
    );
  }
};

const dispatchUploadError = (dispatch, msg, loaded) => {
  dispatch({ type: types.UPLOAD_FAIL, data: msg });
  loaded();
};
