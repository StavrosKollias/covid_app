function addClassToElement(element, className) {
  element.classList.add(className);
}

function removeClassFromElement(element, className) {
  element.classList.remove(className);
}

function getClassListLengthFromElement(element) {
  return element.classList.length;
}

async function getDataCallApi(type, url) {
  const result = $.ajax({
    url: url,
    type: type,
    success: function (data) {
      var data1 = data;
    },
  });

  return result;
}

function addChildToElement(element, child) {
  element.appendChild(child);
}
