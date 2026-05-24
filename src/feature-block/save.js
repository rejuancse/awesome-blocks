/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Dashicon } from '@wordpress/components';

/**
 * Save Component
 */
export default function Save({ attributes }) {
    const {
        icon = 'star-filled',
        title = 'Feature Title',
        description = 'Add a compelling description for your feature or service here.',
        link = '',
        openInNewTab = false,
        iconColor = '#667eea',
        iconBgColor = '#f0f4ff',
        alignment = 'left',
        showIcon = true,
        showLink = false,
    } = attributes;

    const blockProps = useBlockProps.save();

    const Wrapper = link && !showLink ? 'a' : 'div';
    const wrapperProps = link && !showLink ? {
        href: link,
        target: openInNewTab ? '_blank' : undefined,
        rel: openInNewTab ? 'noopener noreferrer' : undefined,
        className: 'fb-feature fb-linked'
    } : {
        className: `fb-feature fb-align-${alignment}`
    };

    return (
        <div {...blockProps}>
            <Wrapper {...wrapperProps}>
                <div className="fb-feature-inner">
                    {showIcon && (
                        <div
                            className="fb-icon-wrapper"
                            style={{ backgroundColor: iconBgColor }}
                        >
                            <Dashicon icon={icon} size={40} style={{ color: iconColor }} />
                        </div>
                    )}
                    <div className="fb-content">
                        <h3 className="fb-title">{title}</h3>
                        <p className="fb-description">{description}</p>
                        {showLink && link && (
                            <a
                                href={link}
                                className="fb-link"
                                target={openInNewTab ? '_blank' : undefined}
                                rel={openInNewTab ? 'noopener noreferrer' : undefined}
                            >
                                {__('Learn More →', 'theme-blocks' )}
                            </a>
                        )}
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}
