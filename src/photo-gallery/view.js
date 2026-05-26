/**
 * Photo Gallery - Frontend Interactivity (Lightbox)
 */

class PhotoGalleryLightbox {
    constructor(galleryElement) {
        this.gallery = galleryElement;
        this.items = Array.from(galleryElement.querySelectorAll('.pg-item'));
        this.currentIndex = 0;
        this.isOpen = false;

        this.init();
    }

    init() {
        // Don't initialize if no images or lightbox is disabled
        if (this.items.length === 0) {
            return;
        }

        const enableLightbox = this.gallery.dataset.enableLightbox === 'true';

        if (!enableLightbox) {
            return;
        }

        // Create lightbox structure
        this.createLightbox();

        // Add click handlers to images
        this.items.forEach((item, index) => {
            const img = item.querySelector('.pg-image');
            if (img) {
                img.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.open(index);
                });
            }
        });

        // Add keyboard navigation
        this.bindKeyboardEvents();
    }

    createLightbox() {
        // Create lightbox container
        this.lightbox = document.createElement('div');
        this.lightbox.className = 'pg-lightbox';

        // Create content wrapper
        const content = document.createElement('div');
        content.className = 'pg-lightbox-content';

        // Create image element
        this.image = document.createElement('img');
        this.image.className = 'pg-lightbox-image';
        this.image.alt = '';

        // Create caption element
        this.caption = document.createElement('div');
        this.caption.className = 'pg-lightbox-caption';

        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'pg-lightbox-close';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('aria-label', 'Close lightbox');
        closeBtn.addEventListener('click', () => this.close());

        // Create navigation buttons
        this.prevBtn = document.createElement('button');
        this.prevBtn.className = 'pg-lightbox-nav pg-lightbox-prev';
        this.prevBtn.innerHTML = '‹';
        this.prevBtn.setAttribute('aria-label', 'Previous image');
        this.prevBtn.addEventListener('click', () => this.prev());

        this.nextBtn = document.createElement('button');
        this.nextBtn.className = 'pg-lightbox-nav pg-lightbox-next';
        this.nextBtn.innerHTML = '›';
        this.nextBtn.setAttribute('aria-label', 'Next image');
        this.nextBtn.addEventListener('click', () => this.next());

        // Create keyboard hint
        const hint = document.createElement('div');
        hint.className = 'pg-lightbox-hint';
        hint.textContent = 'Use arrow keys to navigate, ESC to close';

        // Assemble lightbox
        content.appendChild(this.image);
        content.appendChild(this.caption);
        this.lightbox.appendChild(content);
        this.lightbox.appendChild(closeBtn);
        this.lightbox.appendChild(this.prevBtn);
        this.lightbox.appendChild(this.nextBtn);
        this.lightbox.appendChild(hint);

        // Close on background click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.close();
            }
        });

        // Add to document
        document.body.appendChild(this.lightbox);
    }

    open(index) {
        this.currentIndex = index;
        this.showImage(index);
        this.lightbox.classList.add('pg-active');
        this.isOpen = true;

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.lightbox.classList.remove('pg-active');
        this.isOpen = false;

        // Restore body scroll
        document.body.style.overflow = '';
    }

    showImage(index) {
        if (index < 0 || index >= this.items.length) {
            return;
        }

        const item = this.items[index];
        const img = item.querySelector('.pg-image');

        if (img) {
            const src = img.dataset.src || img.src;
            const alt = img.dataset.alt || img.alt || '';
            const caption = img.dataset.caption || '';

            // Add loading state
            this.image.style.opacity = '0.5';

            // Load image
            const tempImg = new Image();
            tempImg.onload = () => {
                this.image.src = src;
                this.image.alt = alt;
                this.caption.textContent = caption;
                this.image.style.opacity = '1';
            };
            tempImg.src = src;

            // Update navigation buttons
            this.prevBtn.disabled = index === 0;
            this.nextBtn.disabled = index === this.items.length - 1;
        }
    }

    next() {
        if (this.currentIndex < this.items.length - 1) {
            this.currentIndex++;
            this.showImage(this.currentIndex);
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.showImage(this.currentIndex);
        }
    }

    bindKeyboardEvents() {
        this.handleKeydown = (e) => {
            if (!this.isOpen) {
                return;
            }

            switch (e.key) {
                case 'Escape':
                    e.preventDefault();
                    this.close();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prev();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.next();
                    break;
            }
        };

        document.addEventListener('keydown', this.handleKeydown);
    }

    destroy() {
        if (this.lightbox && this.lightbox.parentNode) {
            this.lightbox.parentNode.removeChild(this.lightbox);
        }

        if (this.handleKeydown) {
            document.removeEventListener('keydown', this.handleKeydown);
        }

        document.body.style.overflow = '';
    }
}

// Initialize all galleries on the page
function initPhotoGalleries() {
    const galleries = document.querySelectorAll('.wp-block-zepblock-photo-gallery');

    galleries.forEach((gallery) => {
        // Store instance on the element for later reference
        if (!gallery.pgLightboxInstance) {
            gallery.pgLightboxInstance = new PhotoGalleryLightbox(gallery);
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhotoGalleries);
} else {
    initPhotoGalleries();
}

// Re-initialize when block is updated (for WordPress editor preview)
if (window.wp) {
    window.wp.hooks.addAction('wp.block.library.updateBlock', 'zepblock/photo-gallery', initPhotoGalleries);
}
