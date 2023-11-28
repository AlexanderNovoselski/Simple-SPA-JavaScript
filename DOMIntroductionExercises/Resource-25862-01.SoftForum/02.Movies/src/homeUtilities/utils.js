import { currentYear } from "../../static/utils.js";

export function createMovieSection(
    movieId,
    title,
    description,
    image,
    ownerId,
) {
    const section = {
        elementName: 'li',
        classes: ['col-md-6', 'mb-4'],
        children: [
            {
                elementName: 'section',
                classes: ['view-section'],
                children: [
                    {
                        elementName: 'div',
                        classes: ['container'],
                        children: [
                            {
                                elementName: 'div',
                                classes: ['row', 'bg-light', 'text-dark'],
                                children: [
                                    {
                                        elementName: 'h1',
                                        textContent: `Movie title: ${title}`,
                                    },
                                    {
                                        elementName: 'div',
                                        classes: ['col-md-8'],
                                        children: [
                                            {
                                                elementName: 'img',
                                                classes: ['img-thumbnail'],
                                                attributes: [
                                                    { name: 'src', value: image },
                                                    { name: 'alt', value: 'Movie' },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        elementName: 'div',
                                        id: 'movieDescriptionData',
                                        classes: ['col-md-4', 'text-center'],
                                        children: [
                                            {
                                                elementName: 'h3',
                                                classes: ['my-3'],
                                                textContent: 'Movie Description',
                                            },
                                            {
                                                elementName: 'p',
                                                textContent: description,
                                            },
                                            {
                                                elementName: 'a',
                                                id: 'deleteBtn',
                                                classes: ['btn', 'btn-danger'],
                                                attributes: [{ name: 'href', value: '#' }],
                                                textContent: 'Delete',
                                            },
                                            {
                                                elementName: 'a',
                                                id: 'editBtn',
                                                classes: ['btn', 'btn-warning'],
                                                attributes: [{ name: 'href', value: '#' }],
                                                textContent: 'Edit',
                                            },
                                            {
                                                elementName: 'a',
                                                id: 'likeBtn',
                                                classes: ['btn', 'btn-primary'],
                                                attributes: [{ name: 'href', value: '#' }],
                                                textContent: 'Like',
                                            },
                                            {
                                                elementName: 'span',
                                                id: 'likesCount',
                                                classes: ['enrolled-span'],
                                                textContent: 'Liked 1',
                                            }
                                        ],
                                    },
                                    {
                                        elementName: 'input',
                                        id: 'movieId',
                                        attributes: [
                                            { name: 'type', value: 'hidden' },
                                            { name: 'name', value: 'movieId' },
                                            { name: 'value', value: movieId }
                                        ]
                                    },
                                    {
                                        elementName: 'input',
                                        id: 'movieOwnerId',
                                        attributes: [
                                            { name: 'type', value: 'hidden' },
                                            { name: 'name', value: 'ownerId' },
                                            { name: 'value', value: ownerId }
                                        ]
                                    }
                                ],
                            },
                        ],
                    },
                ],
            }
        ]
    };

    return section;
}

export const detailsBtn = {
    elementName: 'a',
    id: 'detailsBtn',
    classes: ['btn', 'btn-primary'],
    attributes: [{ name: 'href', value: '#' }],
    textContent: 'Details',
}

export const homeSectionView = {
    elementName: 'div',
    id: 'container',
    children: [
        {
            elementName: 'nav',
            classes: ['navbar', 'navbar-expand-lg', 'navbar-dark', 'bg-dark'],
            children: [
                {
                    elementName: 'a',
                    id: 'homePageBtnNav',
                    classes: ['navbar-brand', 'text-light'],
                    attributes: [{ name: 'href', value: '#' }],
                    textContent: 'Movies'
                },
                {
                    elementName: 'ul',
                    classes: ['navbar-nav', 'ml-auto'],
                    children: [
                        {
                            elementName: 'li',
                            classes: ['nav-item', 'user'],
                            children: [
                                {
                                    elementName: 'a',
                                    id: 'welcome-msg',
                                    classes: ['nav-link'],
                                    textContent: 'Welcome, guest'
                                }
                            ]
                        },
                        {
                            elementName: 'li',
                            id: 'logoutBtnLi',
                            classes: ['nav-item', 'user'],
                            children: [
                                {
                                    elementName: 'a',
                                    id: 'logoutBtnNav',
                                    classes: ['nav-link'],
                                    attributes: [{ name: 'href', value: '#' }],
                                    textContent: 'Logout'
                                }
                            ]
                        },
                        {
                            elementName: 'li',
                            id: 'loginBtnLi',
                            classes: ['nav-item', 'user'],
                            children: [
                                {
                                    elementName: 'a',
                                    id: 'loginBtnNav',
                                    classes: ['nav-link'],
                                    attributes: [{ name: 'href', value: '#' }],
                                    textContent: 'Login'
                                }
                            ]
                        },
                        {
                            elementName: 'li',
                            id: 'registerBtnLi',
                            classes: ['nav-item', 'user'],
                            children: [
                                {
                                    elementName: 'a',
                                    id: 'registerBtnNav',
                                    classes: ['nav-link'],
                                    attributes: [{ name: 'href', value: '#' }],
                                    textContent: 'Register'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            elementName: 'section',
            id: 'home-page',
            classes: ['view-section'],
            children: [
                {
                    elementName: 'div',
                    classes: ['jumbotron', 'jumbotron-fluid', 'text-light'],
                    style: { backgroundColor: '#343a40' },
                    children: [
                        {
                            elementName: 'img',
                            classes: ['img-fluid'],
                            attributes: [
                                { name: 'src', value: 'https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg' },
                                { name: 'alt', value: 'Responsive image' },
                                { name: 'style', value: 'width: 150%; height: 200px' }
                            ]
                        },
                        {
                            elementName: 'h1',
                            classes: ['display-4'],
                            textContent: 'Movies'
                        },
                        {
                            elementName: 'p',
                            classes: ['lead'],
                            textContent: 'Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.'
                        }
                    ]
                },
                {
                    elementName: 'h1',
                    classes: ['text-center'],
                    textContent: 'Movies'
                },
                {
                    elementName: 'section',
                    id: 'add-movie-button',
                    classes: ['user'],
                    children: [
                        {
                            elementName: 'a',
                            classes: ['btn', 'btn-warning'],
                            attributes: [
                                { name: 'href', value: '#' }
                            ],
                            textContent: 'Add Movie'
                        }
                    ]
                },
                {
                    elementName: 'section',
                    id: 'movie',
                    children: [
                        {
                            elementName: 'div',
                            children: [
                                {
                                    elementName: 'div',
                                    classes: ['row', 'd-flex', 'justify-content-center'],
                                    children: [
                                        {
                                            elementName: 'ul',
                                            id: 'movies-list',
                                            classes: ['card-deck'],
                                            style: { listStyleType: 'none', padding: '0' }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            elementName: 'footer',
            classes: ['page-footer', 'font-small'],

            children: [
                {
                    elementName: 'div',
                    classes: ['footer-copyright', 'text-center', 'py-3'],
                    attributes: [{ name: 'type', value: 'submit' }],
                    textContent: `\u00A9  ${currentYear} `,
                    children: [
                        {
                            elementName: 'a',
                            classes: ['text-dark'],
                            attributes: [{ name: 'href', value: '#' },],
                            textContent: 'Movies Application'
                        }
                    ]
                }
            ]
        }
    ]
};