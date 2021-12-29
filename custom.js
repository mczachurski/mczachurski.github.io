const colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)');

const setColorScheme = e => {
    if (e.matches) {
        $('nav').removeClass('navbar-light');
        $('nav').addClass('navbar-dark');
    } else {
        $('nav').removeClass('navbar-dark');
        $('nav').addClass('navbar-light');
    }
}

function initTheme() {
    setColorScheme(colorSchemeQueryList);
    colorSchemeQueryList.addEventListener("change", setColorScheme);
}

function initGallery() {
    jQuery('#nanogallery2').nanogallery2({

        // GALLERY AND THUMBNAIL LAYOUT
        thumbnailHeight: '400',
        thumbnailWidth: 'auto',
        thumbnailAlignment: 'fillWidth',
        thumbnailL1GutterWidth: 20,
        thumbnailL1GutterHeight: 20,
        thumbnailBorderHorizontal: 1,
        thumbnailBorderVertical: 1,

        // THUMBNAIL TOOLS & LABEL
        thumbnailL1Label: {
            display: true,
            position: 'overImageOnTop',
            hideIcons: true,
            titleFontSize: '1em',
            align: 'left'
        },
        thumbnailToolbarImage: {
            topLeft: 'select',
            bottomRight: 'featured,display,download,cart'
        },

        // DISPLAY ANIMATION
        thumbnailDisplayTransition: 'flipUp', // thumbnail display animation
        thumbnailDisplayTransitionDuration: 400,
        thumbnailDisplayInterval: 200,
        thumbnailDisplayOrder: 'rowByRow',

        // THUMBNAIL'S HOVER ANIMATION
        thumbnailHoverEffect2: 'toolsSlideUp|labelSlideDown',
        touchAnimation: true,
        touchAutoOpenDelay: -1,

        // GALLERY THEME
        galleryTheme: {
            thumbnail: {
                titleColor: '#fff',
                borderColor: '#fff'
            },
        },

        // DEEP LINKING
        locationHash: false
    });
}


