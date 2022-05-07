const Position = {
    Horizontal: 0,
    Vertical: 1
};

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

    try {
        // Chrome & Firefox & Safar >= 14
        colorSchemeQueryList.addEventListener("change", setColorScheme);
    } catch (error1) {
        console.error(error1);
        try {
            // Safari < 14
            colorSchemeQueryList.addListener(setColorScheme);
        } catch (error2) {
            console.error(error2);
        }
    }
}

function initGallery(images) {

    let items = [];
    images.forEach(element => {
        items.push({
            downloadURL:    'https://mczphotography.blob.core.windows.net/photography/' + element.file + '.jpg',
            src:            'https://mczphotography.blob.core.windows.net/photography/' + element.file + 'm.jpg',
            srct:           './images/' + element.file + 's.jpg',
            imgtWidth:      element.position === Position.Horizontal ? 800 : 533,
            imgtHeight:     element.position === Position.Horizontal ? 533 : 800,
            title:          element.title,
            imageDominantColor: element.color,
            tags:           element.tags
        });
    });

    jQuery('#nanogallery2').nanogallery2({

        // ITEMS DISPLAYED
        items: items,

        // galleryDisplayMode: 'rows',
        // galleryMaxRows: 10,

        // KEYWORD FILTERING
        galleryFilterTags: true,
        galleryFilterTagsMode: 'single',

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
        thumbnailDisplayTransition: 'slideUp', // thumbnail display animation
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
            navigationBreadcrumb: { background : '#3C4B5B' },
            navigationFilter: { background : '#ee375f', backgroundSelected: '#ee375f', color: '#fff' }
        },

        // DEEP LINKING
        locationHash: false
    });
}


