export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";
import Product from "../../models/product";

// const { app } = firebase.storage();

// const selectImage = (imageUri) => {
//   const options = {
//     maxWidth: 2000,
//     maxHeight: 2000,
//     storageOptions: {
//       skipBackup: true,
//       path: 'images'
//     }
//   };
//   ImagePicker.showImagePicker(options, response => {
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.error) {
//       console.log('ImagePicker Error: ', response.error);
//     } else if (response.customButton) {
//       console.log('User tapped custom button: ', response.customButton);
//     } else {
//       const source = { uri: response.uri };
//       console.log(source);
//       setImage(source);
//     }
//   });
// };

// const uploadImage = async () => {
//   const { uri } = image;
//   const filename = uri.substring(uri.lastIndexOf('/') + 1);
//   const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
//   setUploading(true);
//   setTransferred(0);
//   const task = storage()
//     .ref(filename)
//     .putFile(uploadUri);
//   // set progress state
//   task.on('state_changed', snapshot => {
//     setTransferred(
//       Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
//     );
//   });
//   try {
//     await task;
//   } catch (e) {
//     console.error(e);
//   }
//   setUploading(false);
//   Alert.alert(
//     'Photo uploaded!',
//     'Your photo has been uploaded to Firebase Cloud Storage!'
//   );
//   setImage(null);
// };

// const uploadImage = (imageUri) => {
//   const ext = imageUri.split('.').pop(); // Extract image extension
//   const filename = `${uuid.v1()}.${ext}`; // Generate unique name
//   let imageURL = '';
//   // this.setState({ uploading: true });
//   firebase.storage()
//     .ref(`laptops/images/${filename}`)
//     .putFile(imageUri)
//     .on(
//       firebase.storage.TaskEvent.STATE_CHANGED,
//       snapshot => {
//         // let state = {};
//         // state = {
//         //   ...state,
//         //   progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
//         // };
//         if (firebase.storage.TaskState.SUCCESS) {
//           console.log('snapshot: ', snapshot);
//           console.log('url: ', snapshot.downloadURL);
//           imageURL = snapshot.downloadURL;
//           // const allImages = this.state.images;
//           // state = {
//           //   ...state,
//           //   uploading: false,
//           //   imgSource: '',
//           //   imageUri: '',
//           //   progress: 0,
//           //   images: allImages
//           // };
//           // AsyncStorage.setItem('images', JSON.stringify(allImages));
//         }
//       },
//       error => {
//         unsubscribe();
//         alert('Sorry, Try again.');
//         console.log('error: ', error);
//       }
//     );
//     return imageURL;
// };

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://laptopsrnproject.firebaseio.com/products.json"
    );

    const resData = await response.json();
    console.log("resData: ", resData);
    const loadedProducts = [];

    for (const key in resData) {
      loadedProducts.push(
        new Product(
          key,
          "u1",
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )
      );
    }
    console.log("loaded products: ", loadedProducts);
    dispatch({ type: SET_PRODUCTS, products: loadedProducts });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {

    console.log('imageUrl: ', imageUrl);
    const token = getState().auth.token;
    const response = await fetch(
      `https://laptopsrnproject.firebaseio.com/products.json?auth=${token}`,
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );
    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
