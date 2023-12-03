import { createForm } from "../../static/utils.js"

export function createEditForm(title, description, imgUrl){
    const editMovie = {
        elementName: 'section',
        id: 'edit-movie',
        classes: ['view-section'],
        children: [{
            elementName: 'form',
            id: 'edit-movie-form',
            classes: ['view-section', 'border', 'border-light', 'p-5'],
            children:[{
                elementName: 'h1',
                textContent: 'Edit Movie'
            },
            {
                elementName: 'div',
                classes: ['form-group'],
                children:[{
                    elementName: 'label',
                    textContent: 'Movie',
                    attributes: [{name: 'for', value: 'title'}]
                },
                {
                    elementName: 'input',
                    id: 'title',
                    classes: ['form-control'],
                    attributes: [{name: 'type', value: 'text'}, {name: 'placeholder', value: 'Title'}, {name: 'name', value: 'title'}, {name: 'value', value: title}]
                }]
            },
            {
                elementName: 'div',
                classes: ['form-group'],
                children:[{
                    elementName: 'label',
                    textContent: 'Description',
                    attributes: [{name: 'for', value: 'description'}]
                },
                {
                    elementName: 'textarea',
                    id: 'description',
                    classes: ['form-control'],
                    textContent: description,
                    attributes: [{name: 'type', value: 'text'}, {name: 'placeholder', value: 'Description'}, {name: 'name', value: 'description'}]
                }]
            },        
            {
                elementName: 'div',
                classes: ['form-group'],
                children:[{
                    elementName: 'label',
                    textContent: 'Image',
                    attributes: [{name: 'for', value: 'image'}]
                },
                {
                    elementName: 'input',
                    id: 'image',
                    classes: ['form-control'],
                    attributes: [{name: 'type', value: 'text'}, {name: 'placeholder', value: 'https://image.jpeg'}, {name: 'name', value: 'image'}, {name: 'value', value: imgUrl}]
                }]
            },
            {
                elementName: 'button',
                classes: ['btn', 'btn-warning'],
                textContent: 'Edit',
                attributes: [{name: 'type', value: 'submit'}]
            },
            {   
                elementName: 'button',
                id: 'backBtn',
                classes: ['btn', 'btn-primary'],
                textContent: 'Back',
                attributes: [{name: 'type', value: 'button'}]
            }]
        }]
    }
    
    return createForm(editMovie)
}
