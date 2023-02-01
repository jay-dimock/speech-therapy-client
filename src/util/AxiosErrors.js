const AxiosErrors = (err) => {
  if (!err.response) {
    if (err.isAxiosError) {
      console.log(err.toJSON());
      let msg = `${err.name}: ${err.message}`;
      if (err.description) msg += "description: " + err.description;
      return { error: msg };
    } else {
      console.log("err:", err);
      //console.log(JSON.stringify(err));
      return { error: "Unknown Error" };
    }
  }
  if (!err.response.data) {
    console.log("err:", err.response);
    return { error: err.response };
  } else if (!err.response.data.errors) {
    console.log(err.response.data);
    return { error: err.response.data };
  } else {
    const errResponse = err.response.data.errors;
    const errDict = {};
    for (const key of Object.keys(errResponse)) {
      console.log(`${key}: ${errResponse[key].message}`);
      errDict[key] = errResponse[key].message;
    }
    return errDict;
  }
};

export default AxiosErrors;
