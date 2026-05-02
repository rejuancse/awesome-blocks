/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Save Component
 */
export default function Save({ attributes }) {
    const {
        imageUrl = '',
        imageAlt = '',
        tag = '',
        date = '',
        title = '',
        excerpt = '',
        authorName = '',
        authorAvatar = '',
        buttonText = 'Read More →',
        buttonLink = '#',
        openInNewTab = false,
        cardAlignment = 'left',
        showTag = true,
        showDate = true,
        showAuthor = true,
        showExcerpt = true,
        showButton = true,
    } = attributes;

    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <div className={`cb-wrap cb-align-${cardAlignment}`}>
                <div className="cb-card">
                    {imageUrl && (
                        <div className="cb-img-wrap">
                            <img src={imageUrl} alt={imageAlt || title} />
                        </div>
                    )}
                    <div className="cb-body">
                        {(showTag || showDate) && (tag || date) && (
                            <div className="cb-meta">
                                {showTag && tag && <span className="cb-tag">{tag}</span>}
                                {showDate && date && <span className="cb-date">{date}</span>}
                            </div>
                        )}
                        {title && <h3 className="cb-title">{title}</h3>}
                        {showExcerpt && excerpt && (
                            <p className="cb-excerpt">{excerpt}</p>
                        )}
                        <div className="cb-footer">
                            {showAuthor && (authorName || authorAvatar) && (
                                <div className="cb-author">
                                    {authorAvatar && (
                                        <img className="cb-avatar" src={authorAvatar} alt={authorName} />
                                    )}
                                    {authorName && <span className="cb-author-name">{authorName}</span>}
                                </div>
                            )}
                            {showButton && buttonText && (
                                <a
                                    className="cb-btn"
                                    href={buttonLink}
                                    target={openInNewTab ? '_blank' : undefined}
                                    rel={openInNewTab ? 'noopener noreferrer' : undefined}
                                >
                                    {buttonText}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
