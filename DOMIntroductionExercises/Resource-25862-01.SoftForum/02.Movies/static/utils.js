export function createForm({
    elementName = 'section',
    id,
    classes = [],
    attributes = [],
    textContent,
    children = []
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
  
    children.forEach(child => {
      const childElement = createForm(child);
      element.appendChild(childElement);
    });
  
    return element;
  }