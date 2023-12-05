export const currentYear = new Date().getUTCFullYear();
export const getAccessToken = sessionStorage.getItem('accessToken') ? sessionStorage.getItem('accessToken') : undefined;

export function isUserLogged() {
  if (sessionStorage.getItem('accessToken')) {
    return true;
  }
}

export function createForm({
  elementName = 'section',
  id,
  classes = [],
  attributes = [],
  textContent,
  children = [],
  style = {}
}) {
  const element = document.createElement(elementName);

  if (id) {
    element.id = id;
  }

  classes.forEach(className => {
    element.classList.add(className);
  });

  attributes.forEach(attribute => {
    element.setAttribute(attribute.name, attribute.value);
  });

  if (textContent) {
    element.textContent = textContent;
  }

  Object.assign(element.style, style);

  children.forEach(child => {
    const childElement = createForm(child);
    element.appendChild(childElement);
  });



  return element;
}

