function addClassToElement(element, className) {
  element.classList.add(className);
}

function removeClassFromElement(element, className) {
  element.classList.remove(className);
}

function getClassListLengthFromElement(element) {
  return element.classList.length;
}

function addChildToElement(element, child) {
  element.appendChild(child);
}

function removeChildFromElement(element, child) {
  element.removeChild(child);
}

function changeTextToElement(element, txt) {
  element.innerText = txt;
}
