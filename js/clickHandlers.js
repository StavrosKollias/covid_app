function handleClickSideBarBtn(element) {
  const elementClassListChild = getClassListLengthFromElement(
    element.children[0]
  );
  const sideBar = element.parentElement;

  if (elementClassListChild < 2) {
    addClassToElement(sideBar, "active-side-bar");
    addClassToElement(element.children[0], "btn-item-active");
    activateSideBarItems();
  } else {
    removeClassFromElement(sideBar, "active-side-bar");
    removeClassFromElement(element.children[0], "btn-item-active");
    deActivateSideBarItems();
  }
}

function activateSideBarItems() {
  const sidebarItems = document.querySelectorAll(".side-bar-item");
  forEachInNodeListClass(sidebarItems, addClassToElement, "active-item");
}

function deActivateSideBarItems() {
  const sidebarItems = document.querySelectorAll(".side-bar-item");
  forEachInNodeListClass(sidebarItems, removeClassFromElement, "active-item");
}

function forEachInNodeListClass(list, operationFunction, className) {
  list.forEach((e, i) => {
    operationFunction(e, className);
  });
}
