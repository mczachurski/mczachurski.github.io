function prepareGallery() {
    jQuery('#nanogallery2').nanogallery2({

        // GALLERY AND THUMBNAIL LAYOUT
        thumbnailHeight: '400', thumbnailWidth: 'auto',
        thumbnailAlignment: 'fillWidth',
        thumbnailL1GutterWidth: 20,
        thumbnailL1GutterHeight: 20,
        thumbnailBorderHorizontal: 1,
        thumbnailBorderVertical: 1,

        // THUMBNAIL TOOLS & LABEL
        thumbnailL1Label: {
            display: true,
            position:'overImageOnTop',
            hideIcons: true,
            titleFontSize: '1em',
            align: 'left'
        },
        thumbnailToolbarImage :  {
            topLeft: 'select',
            bottomRight : 'featured,display,download,cart' 
        },

        // DISPLAY ANIMATION
        thumbnailDisplayTransition: 'flipUp',       // thumbnail display animation
        thumbnailDisplayTransitionDuration: 400,
        thumbnailDisplayInterval: 200,
        thumbnailDisplayOrder: 'rowByRow',

        // THUMBNAIL'S HOVER ANIMATION
        thumbnailHoverEffect2: 'toolsSlideUp|labelSlideDown',
        touchAnimation: true,
        touchAutoOpenDelay: -1,

        // GALLERY THEME
        galleryTheme : { 
            thumbnail: {
                titleColor: '#fff',
                borderColor: '#fff'
            },
        },

        // DEEP LINKING
        locationHash: false
    });
}