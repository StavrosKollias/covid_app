async function getDataCallApi(type, url) {
  let result;

  try {
    result = await $.ajax({
      url: url,
      type: type,
      success: function (data) {
        var data1 = data;
      },
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}
